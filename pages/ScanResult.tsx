import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../utils/apiConfig';

interface ScanData {
    name: string;
    category: string;
    image: string;
    status: string;
    score: number;
    dates: {
        expiry?: string;
        bestBefore?: string;
        manufactured: string;
        daysLeft: number;
    };
    tags: Array<{ label: string; icon: string }>;
    ingredients: {
        safe: string[];
        additives: Array<{ name: string; purpose: string }>;
    };
    analysis: {
        summary: string;
        verification: string;
    };

}

// Helper to create a small thumbnail for localStorage
const createThumbnail = (base64Image: string): Promise<string> => {
    return new Promise((resolve) => {
        if (!base64Image) {
            resolve('');
            return;
        }
        const img = new Image();
        img.src = base64Image;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxWidth = 300; // Small width for thumbnails
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                // Use JPEG with 0.6 quality for maximum compression
                resolve(canvas.toDataURL('image/jpeg', 0.6));
            } else {
                resolve(base64Image);
            }
        };
        img.onerror = () => resolve(base64Image); // Fallback
    });
};

const ScanResult: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { frontImage, backImage, scanData: apiScanData } = location.state || {};
    const [activeView, setActiveView] = useState<'front' | 'back'>('front');
    const [scanData, setScanData] = useState<ScanData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<ScanData | null>(null);
    const [scanId, setScanId] = useState<string | null>(null);
    const [isAdded, setIsAdded] = useState(false);

    const calculateExpiryDate = (manufacturedDate: string, bestBefore: string): string => {
        try {
            const mDate = new Date(manufacturedDate);
            const match = bestBefore.match(/(\d+)\s+(year|month|day|week)s?/i);

            if (match && !isNaN(mDate.getTime())) {
                const amount = parseInt(match[1]);
                const unit = match[2].toLowerCase();

                const expDate = new Date(mDate);
                if (unit === 'year') expDate.setFullYear(expDate.getFullYear() + amount);
                else if (unit === 'month') expDate.setMonth(expDate.getMonth() + amount);
                else if (unit === 'week') expDate.setDate(expDate.getDate() + (amount * 7));
                else if (unit === 'day') expDate.setDate(expDate.getDate() + amount);

                return expDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            }
        } catch (e) {
            console.error("Date calculation error", e);
        }
        return "Unknown";
    };

    useEffect(() => {
        const processScanResult = () => {
            try {
                if (!apiScanData) {
                    console.error('No scan data received from API');
                    setLoading(false);
                    return;
                }

                // Use the API response data directly
                const data = apiScanData;

                // Logic to handle missing expiry date
                if ((!data.dates.expiry || data.dates.expiry === "Unknown") && data.dates.manufactured && data.dates.bestBefore) {
                    data.dates.expiry = calculateExpiryDate(data.dates.manufactured, data.dates.bestBefore);

                    // Recalculate days left
                    const expDate = new Date(data.dates.expiry);
                    const today = new Date();
                    const diffTime = expDate.getTime() - today.getTime();
                    data.dates.daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                }

                if ((data as any)._id) {
                    setScanId((data as any)._id);
                    setIsAdded(true);
                }

                setScanData(data);
            } catch (error) {
                console.error('Error processing scan result:', error);
            } finally {
                setLoading(false);
            }
        };

        processScanResult();
    }, [apiScanData, frontImage, backImage]);

    // Auto-save effect for new scans
    useEffect(() => {
        const autoSaveToPantry = async () => {
            if (!scanData || scanId || isAdded) return;

            try {
                const userEmail = localStorage.getItem('userEmail');
                if (!userEmail) return;

                console.log("Auto-saving new scan to pantry...");
                setIsAdded(true); // Optimistic

                const thumbFront = await createThumbnail(frontImage || scanData.image);

                const payload = {
                    email: userEmail,
                    name: scanData.name,
                    category: scanData.category,
                    image: thumbFront,
                    status: scanData.status,
                    score: scanData.score,
                    dates: scanData.dates,
                    tags: scanData.tags,
                    ingredients: scanData.ingredients,
                    analysis: scanData.analysis
                };

                const response = await fetch(`${API_BASE_URL}/api/product`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (result.success && result.data && result.data._id) {
                    console.log("Auto-save successful, assigned ID:", result.data._id);
                    setScanId(result.data._id);
                } else if (result.success) {
                    // Fallback if ID not in standard location, though it should be
                    console.warn("Saved but ID missing in response");
                }
            } catch (error) {
                console.error("Auto-save failed:", error);
        
            }
        };

        if (scanData && !scanId && !isAdded) {
            autoSaveToPantry();
        }
    }, [scanData, scanId, isAdded, frontImage]);

    const handleEditClick = () => {
        setEditedData(JSON.parse(JSON.stringify(scanData))); // Deep copy
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setEditedData(null);
        setIsEditing(false);
    };

    const handleSaveEdit = async () => {
        if (!editedData) return;

        // If this is an existing item, update via API
        // If this is an existing item
        if (scanId) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/product/id/${scanId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editedData)
                });

                if (response.ok) {
                    setScanData(editedData);
                    setIsEditing(false);
                    alert("Product updated successfully!");
                } else {
                    throw new Error("Failed to update product");
                }
            } catch (error) {
                console.error("Update error:", error);
                alert("Failed to update product. Please check your connection and try again.");
            }
        } else {
            // Just update local state for new items
            setScanData(editedData);
            setIsEditing(false);
        }
    };

    const handleDelete = async () => {
        if (!scanId) return;

        if (!window.confirm("Are you sure you want to remove this item from your pantry?")) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/product/id/${scanId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Product removed successfully!");
                navigate('/inventory');
            } else {
                const data = await response.json();
                throw new Error(data.message || "Failed to delete product");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete product. Please check your connection and try again.");
        }
    };


    const handleFieldChange = (field: string, value: any) => {
        if (!editedData) return;

        setEditedData(prev => {
            if (!prev) return prev;

            // Handle nested fields
            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                return {
                    ...prev,
                    [parent]: {
                        ...(prev as any)[parent],
                        [child]: value
                    }
                };
            }

            return {
                ...prev,
                [field]: value
            };
        });
    };

    const displayData = isEditing ? editedData : scanData;

    // Determine the image to show. Prioritize captured images, then API image.
    const displayImage = activeView === 'front'
        ? (frontImage || scanData?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBNFXHO5f6c8EtrXHfQPE0BQszR5UlL0HQEcqQdZtxAs-bW6Ikwr2DIR9uynLlpznJ0TKjOPF8XEroQK0GBEyZmCSOFZGZvzAjZSZ6WaRdXYZYgBjCbcPqb7Q5ub_8SvU2ovEL4jz_MqZWz8S1RjYI8eplc8eWTtRXd5Chf89cBYLyeoOWJLi3r18T-swZLAkLaUdsMxVXq_eAa6MJl8_kvqVPFzB_3P0hgRHRUGxWZyPvKtH0TMdzH2KGVSbNKWIEHZ8dI3T_sh3s")
        : (backImage || frontImage || scanData?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuBNFXHO5f6c8EtrXHfQPE0BQszR5UlL0HQEcqQdZtxAs-bW6Ikwr2DIR9uynLlpznJ0TKjOPF8XEroQK0GBEyZmCSOFZGZvzAjZSZ6WaRdXYZYgBjCbcPqb7Q5ub_8SvU2ovEL4jz_MqZWz8S1RjYI8eplc8eWTtRXd5Chf89cBYLyeoOWJLi3r18T-swZLAkLaUdsMxVXq_eAa6MJl8_kvqVPFzB_3P0hgRHRUGxWZyPvKtH0TMdzH2KGVSbNKWIEHZ8dI3T_sh3s");

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-slate-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium animate-pulse">Analyzing product...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-light relative overflow-y-auto">
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/10 rounded-full blur-[120px]"></div>
            </div>

            <main className="flex-grow flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="w-full max-w-[1200px] flex flex-col gap-6">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="glass-panel rounded-2xl overflow-hidden shadow-glow border border-slate-200 group relative transition-transform duration-500 hover:scale-[1.01]">
                                <div className="aspect-square w-full bg-cover bg-center relative" style={{ backgroundImage: `url("${displayImage}")` }}>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>

                                    {/* Image Toggle Controls */}
                                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setActiveView('front'); }}
                                            className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md transition-all ${activeView === 'front' ? 'bg-primary text-white shadow-lg' : 'bg-white/20 text-white/80 hover:bg-white/30'}`}
                                        >
                                            Front
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setActiveView('back'); }}
                                            className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md transition-all ${activeView === 'back' ? 'bg-primary text-white shadow-lg' : 'bg-white/20 text-white/80 hover:bg-white/30'}`}
                                        >
                                            Back
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 p-6 w-full">
                                        {isEditing ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedData?.category || ''}
                                                    onChange={(e) => handleFieldChange('category', e.target.value)}
                                                    className="text-accent-purple text-xs font-bold uppercase tracking-wider mb-2 bg-black/30 backdrop-blur-md border border-white/20 rounded px-2 py-1 w-full text-white"
                                                    placeholder="Category"
                                                />
                                                <input
                                                    type="text"
                                                    value={editedData?.name || ''}
                                                    onChange={(e) => handleFieldChange('name', e.target.value)}
                                                    className="text-white text-3xl font-display font-bold leading-tight mb-1 drop-shadow-lg bg-black/30 backdrop-blur-md border border-white/20 rounded px-3 py-2 w-full"
                                                    placeholder="Product Name"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-accent-purple text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
                                                    <span className="size-1.5 bg-accent-purple rounded-full animate-pulse"></span>
                                                    {displayData?.category}
                                                </p>
                                                <h1 className="text-white text-3xl font-display font-bold leading-tight mb-1 drop-shadow-lg">{displayData?.name}</h1>
                                                <p className="text-white/80 text-sm font-medium">Nature's Best</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel rounded-2xl p-6 border border-slate-200 shadow-card bg-white">
                                <h3 className="text-text-main-light text-lg font-display font-bold mb-5 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                                    Key Dates
                                </h3>
                                <div className="flex flex-col gap-5">
                                    <div className="flex justify-between items-center p-4 bg-background-light rounded-xl border border-slate-200 hover:border-primary/30 transition-colors">
                                        <div className="flex flex-col gap-1 flex-1">
                                            <span className="text-text-secondary-light text-[11px] uppercase tracking-wider font-semibold">Expiry Date</span>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={editedData?.dates.expiry || ''}
                                                    onChange={(e) => handleFieldChange('dates.expiry', e.target.value)}
                                                    className="text-text-main-light font-mono font-medium text-xl tracking-tight border border-slate-300 rounded px-2 py-1"
                                                    placeholder="MMM DD, YYYY"
                                                />
                                            ) : (
                                                <span className="text-text-main-light font-mono font-medium text-xl tracking-tight">{displayData?.dates.expiry}</span>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full border shadow-[0_0_10px_rgba(0,0,0,0.1)] ${displayData?.dates.daysLeft && displayData.dates.daysLeft <= 2 ? "text-red-600 bg-red-100 border-red-200" : "text-accent-purple bg-purple-100/50 border-purple-200"}`}>
                                                {displayData?.dates.daysLeft} Days Left
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-text-secondary-light text-sm font-medium">Manufactured</span>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedData?.dates.manufactured || ''}
                                                onChange={(e) => handleFieldChange('dates.manufactured', e.target.value)}
                                                className="text-text-main-light text-sm font-mono opacity-90 border border-slate-300 rounded px-2 py-1"
                                                placeholder="MMM DD, YYYY"
                                            />
                                        ) : (
                                            <span className="text-text-main-light text-sm font-mono opacity-90">{displayData?.dates.manufactured}</span>
                                        )}
                                    </div>
                                    <hr className="border-slate-200" />
                                    <button className="w-full flex items-center justify-center gap-2 bg-text-main-light hover:bg-slate-800 border border-transparent text-white py-3 rounded-xl transition-all duration-300 text-sm font-medium group shadow-md hover:shadow-lg">
                                        <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">notifications_active</span>
                                        Set Expiry Reminder
                                    </button>
                                    <div className="grid grid-cols-2 gap-3">
                                        {isEditing ? (
                                            <>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-100 text-text-secondary-light hover:text-text-main-light py-2.5 rounded-xl transition-all text-sm font-medium group"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleSaveEdit}
                                                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl transition-all text-sm font-medium group shadow-md"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">save</span>
                                                    Save Changes
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={handleEditClick}
                                                    className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-background-light text-text-secondary-light hover:text-text-main-light py-2.5 rounded-xl transition-all text-sm font-medium group"
                                                >
                                                    <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">edit</span>
                                                    Edit Details
                                                </button>
                                                <button onClick={() => navigate('/scan')} className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-background-light text-text-secondary-light hover:text-text-main-light py-2.5 rounded-xl transition-all text-sm font-medium group">
                                                    <span className="material-symbols-outlined text-[18px] group-hover:text-primary transition-colors">qr_code_scanner</span>
                                                    Rescan
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-primary/20 shadow-glow relative overflow-hidden group bg-white">
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-primary/10 to-accent-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:opacity-70 transition-opacity duration-700"></div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                                            </span>
                                            <span className="text-primary text-xs font-bold tracking-widest uppercase">Analysis Complete</span>
                                        </div>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedData?.status || ''}
                                                onChange={(e) => handleFieldChange('status', e.target.value)}
                                                className="text-4xl md:text-5xl font-display font-bold text-text-main-light tracking-tight drop-shadow-sm border border-slate-300 rounded px-3 py-2 w-full"
                                                placeholder="Product Status"
                                            />
                                        ) : (
                                            <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main-light tracking-tight drop-shadow-sm">{displayData?.status}</h2>
                                        )}
                                        {isEditing ? (
                                            <textarea
                                                value={editedData?.analysis.summary || ''}
                                                onChange={(e) => handleFieldChange('analysis.summary', e.target.value)}
                                                className="text-text-secondary-light text-base leading-relaxed max-w-lg border border-slate-300 rounded px-3 py-2 w-full"
                                                placeholder="Analysis summary"
                                                rows={3}
                                            />
                                        ) : (
                                            <p className="text-text-secondary-light text-base leading-relaxed max-w-lg">
                                                {displayData?.analysis.summary}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="relative size-32 flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_4px_8px_rgba(99,102,241,0.2)]">
                                                <circle cx="50%" cy="50%" fill="transparent" r="42%" stroke="#e2e8f0" strokeWidth="6"></circle>
                                                <circle cx="50%" cy="50%" fill="transparent" r="42%" stroke="#6366f1" strokeDasharray="264" strokeDashoffset="10" strokeLinecap="round" strokeWidth="6"></circle>
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                {isEditing ? (
                                                    <input
                                                        type="number"
                                                        value={editedData?.score || 0}
                                                        onChange={(e) => handleFieldChange('score', parseInt(e.target.value) || 0)}
                                                        className="text-4xl font-display font-bold text-text-main-light tracking-tight text-center w-16 border border-slate-300 rounded"
                                                        min="0"
                                                        max="100"
                                                    />
                                                ) : (
                                                    <span className="text-4xl font-display font-bold text-text-main-light tracking-tight">{displayData?.score}</span>
                                                )}
                                                <span className="text-[10px] text-primary uppercase font-bold tracking-widest mt-1">Score</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-4 items-center justify-between">
                                    <div className="flex gap-3">
                                        {scanData?.tags.map((tag, index) => (
                                            <span key={index} className="px-4 py-1.5 rounded-full bg-white text-text-secondary-light text-xs border border-slate-200 flex items-center gap-2 transition-colors hover:border-primary/30 hover:text-text-main-light cursor-default font-medium">
                                                <span className="material-symbols-outlined text-[16px] text-primary">{tag.icon}</span> {tag.label}
                                            </span>
                                        ))}
                                    </div>
                                   
                                </div>
                            </div>

                            <div className="glass-panel rounded-2xl border border-slate-200 overflow-hidden flex flex-col bg-white">
                                <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/80 backdrop-blur-sm">
                                    <h3 className="text-text-main-light text-lg font-display font-bold flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-accent-purple">science</span>
                                        Ingredient Analysis
                                    </h3>
                                </div>
                                <div className="divide-y divide-slate-200">
                                    <div className="p-6 hover:bg-slate-50/50 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2.5 bg-primary/10 rounded-xl text-primary mt-1 shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                                                <span className="material-symbols-outlined">health_and_safety</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-text-main-light font-medium text-lg mb-1">Safe Ingredients</h4>
                                                <p className="text-text-secondary-light text-sm mb-4">Core components verified as safe and nutritious.</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {scanData?.ingredients.safe.map((ing, i) => (
                                                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 font-medium">
                                                            {ing} <span className="size-1.5 rounded-full bg-primary shadow-[0_0_5px_#818cf8]"></span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-slate-50 hover:bg-slate-100/80 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500 mt-1 shadow-[0_0_10px_rgba(251,191,36,0.1)]">
                                                <span className="material-symbols-outlined">info</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className="text-text-main-light font-medium text-lg">Additives & Stabilizers</h4>
                                                    <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded tracking-wide">Review</span>
                                                </div>
                                                <p className="text-text-secondary-light text-sm mb-4">Generally safe, but may cause sensitivity in large quantities.</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {scanData?.ingredients.additives.map((additive, i) => (
                                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-amber-500/30 transition-colors">
                                                            <span className="text-sm text-slate-700 font-medium">{additive.name}</span>
                                                            <span className="material-symbols-outlined text-text-secondary-light text-[18px] cursor-help hover:text-text-main-light" title={additive.purpose}>help</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 bg-gradient-to-r from-primary/5 to-transparent flex items-center justify-center">
                                    <div className="flex items-center gap-3 opacity-90">
                                        <span className="material-symbols-outlined text-primary">verified_user</span>
                                        <p className="text-sm text-primary-dark font-medium">{scanData?.analysis.verification}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-slate-200 bg-white/90 backdrop-blur-sm py-8 mt-auto z-10">
                <div className="px-10 text-center flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-text-secondary-light opacity-80">
                        <span className="size-1.5 rounded-full bg-primary"></span>
                        <span className="text-xs font-medium uppercase tracking-widest">System Operational</span>
                    </div>
                    <p className="text-text-secondary-light text-sm">© 2025 ValidityVision Hackathon Project</p>
                </div>
            </footer>
        </div>
    );
};

export default ScanResult;