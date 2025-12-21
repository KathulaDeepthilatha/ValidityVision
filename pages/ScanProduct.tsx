import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { API_BASE_URL } from '../utils/apiConfig';

// Helper: Convert Base64 to File
const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const match = arr[0].match(/:(.*?);/);
    const mime = match ? match[1] : 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

// Helper: Convert File to Base64
const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const ScanProduct: React.FC = () => {
    const navigate = useNavigate();
    const [scanStep, setScanStep] = useState<'front-scan' | 'front-review' | 'back-scan' | 'back-review' | 'completed'>('front-scan');
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);

    // UI State
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null); // Acts as tempImage
    const [error, setError] = useState<string | null>(null);
    const [showRetakeModal, setShowRetakeModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [recentScans, setRecentScans] = useState<any[]>([]);

    useEffect(() => {
        const loadRecentScans = async () => {
            try {
                const userEmail = localStorage.getItem('userEmail');
                if (!userEmail) {
                    setRecentScans([]);
                    return;
                }

                const response = await fetch(`${API_BASE_URL}/api/product/${userEmail}`);
                const data = await response.json();

                if (data.success && Array.isArray(data.data)) {
                    // Get the 3 most recent items
                    const recent = data.data.slice(0, 3).map((product: any) => ({
                        frontImage: product.image,
                        backImage: null,
                        data: product
                    }));
                    setRecentScans(recent);
                } else {
                    setRecentScans([]);
                }
            } catch (e) {
                console.error("Failed to load recent scans", e);
                setRecentScans([]);
            }
        };

        loadRecentScans();
    }, []);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraActive(true);
                setError(null);
                setCapturedImage(null);
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            setError("Could not access camera. Please check permissions.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraActive(false);
        }
    };

    const handleScan = () => {
        if (!isCameraActive && !capturedImage) {
            startCamera();
        } else if (isCameraActive) {
            captureImage();
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageDataUrl = canvas.toDataURL('image/png');
                setCapturedImage(imageDataUrl);
                stopCamera();

                if (scanStep === 'front-scan') {
                    setScanStep('front-review');
                } else if (scanStep === 'back-scan') {
                    setScanStep('back-review');
                }
            }
        }
    };

    const processImages = async (front: string, back: string) => {
        setIsProcessing(true);
        try {
            // --- Image Compression Step ---
            const options = {
                maxSizeMB: 0.9, // Target under 1MB as requested
                maxWidthOrHeight: 1920, // Good balance for OCR/AI
                useWebWorker: true,
                fileType: 'image/jpeg'
            };

            const frontFile = dataURLtoFile(front, 'front-scan.jpg');
            const backFile = dataURLtoFile(back, 'back-scan.jpg');

            console.log(`Original Sizes - Front: ${(frontFile.size / 1024 / 1024).toFixed(2)}MB, Back: ${(backFile.size / 1024 / 1024).toFixed(2)}MB`);

            const [compressedFrontFile, compressedBackFile] = await Promise.all([
                imageCompression(frontFile, options),
                imageCompression(backFile, options)
            ]);

            console.log(`Compressed Sizes - Front: ${(compressedFrontFile.size / 1024 / 1024).toFixed(2)}MB, Back: ${(compressedBackFile.size / 1024 / 1024).toFixed(2)}MB`);

            const compressedFrontBase64 = await fileToDataURL(compressedFrontFile);
            const compressedBackBase64 = await fileToDataURL(compressedBackFile);
            // -----------------------------

            // Actual API endpoint
            const API_URL = 'https://vision-1039670019942.asia-south1.run.app/api/scan';

            // Get user email from localStorage (set during onboarding/registration)
            const userEmail = localStorage.getItem('userEmail') || 'test@example.com';

            const payload = {
                email: userEmail,
                frontImage: compressedFrontBase64,
                backImage: compressedBackBase64
            };

            console.log("Sending scan request to:", API_URL);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error('API returned unsuccessful response');
            }

            // Navigate to result page with the response data
            navigate('/scan-result', {
                state: {
                    frontImage: front,
                    backImage: back,
                    scanData: data.data,
                    apiResponse: data
                }
            });

        } catch (err) {
            console.error("Error processing images:", err);
            setError("Failed to process images. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleConfirm = () => {
        if (scanStep === 'front-review' && capturedImage) {
            setFrontImage(capturedImage);
            setCapturedImage(null);
            setScanStep('back-scan');
            startCamera();
        } else if (scanStep === 'back-review' && capturedImage) {
            // Instead of just setting state and navigating, we trigger processing
            // The back image is 'capturedImage', front is 'frontImage'
            if (frontImage) {
                setBackImage(capturedImage);
                setScanStep('completed');
                processImages(frontImage, capturedImage);
            } else {
                setError("Missing front image. Please restart.");
                setScanStep('front-scan');
            }
        }
    };

    const handleRetakeRequest = () => {
        setShowRetakeModal(true);
    };

    const confirmRetake = () => {
        setShowRetakeModal(false);
        setCapturedImage(null);
        if (scanStep === 'front-review') {
            setScanStep('front-scan');
        } else if (scanStep === 'back-review') {
            setScanStep('back-scan');
        }
        startCamera();
    };

    const cancelRetake = () => {
        setShowRetakeModal(false);
    };

    const getInstructionText = () => {
        switch (scanStep) {
            case 'front-scan': return "Position the front of the product in the frame.";
            case 'front-review': return "Review the front image. Ensure text is readable.";
            case 'back-scan': return "Now flip it over and scan the back/ingredients.";
            case 'back-review': return "Review the back image. Ensure ingredients are clear.";
            default: return "Processing...";
        }
    };

    const getPageTitle = () => {
        if (scanStep.includes('front')) return "Scan Front Side";
        if (scanStep.includes('back')) return "Scan Back Side";
        return "Scan Product";
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result as string;
                setCapturedImage(imageDataUrl);
                stopCamera();

                if (scanStep === 'front-scan') {
                    setScanStep('front-review');
                } else if (scanStep === 'back-scan') {
                    setScanStep('back-review');
                }
            };
            reader.readAsDataURL(file);
        }
        // Reset input value to allow selecting same file again
        if (event.target) {
            event.target.value = '';
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden relative">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <header className="w-full px-4 md:px-10 py-6 md:py-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0 shrink-0 z-20 relative animate-fade-in">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-xl text-primary relative">
                            <span className="material-symbols-outlined">center_focus_strong</span>
                        </div>
                        <h2 className="text-text-main-light dark:text-text-main-dark text-3xl font-black leading-tight tracking-[-0.03em]">{getPageTitle()}</h2>
                    </div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal">
                        {getInstructionText()}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-card-dark rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                        <span className={`w-2 h-2 rounded-full ${isCameraActive ? 'bg-red-500 animate-pulse' : 'bg-success'} shadow-[0_0_8px_rgba(16,185,129,0.6)]`}></span>
                        <span className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">{isCameraActive ? 'Scanning...' : 'System Ready'}</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 md:px-10 pb-10 custom-scrollbar z-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full max-h-[800px]">
                    <div className="lg:col-span-2 flex flex-col gap-6 animate-fade-in" style={{ animationDelay: '200ms' }}>

                        <div className="grid grid-cols-1 gap-4 flex-1">
                            {/* Front Picture Scanner */}
                            <div className="relative bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 group cursor-pointer flex flex-col aspect-[4/5] md:aspect-auto" onClick={handleScan}>

                                {!isCameraActive && !capturedImage && (
                                    <>
                                        <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1z3S20VnCZNSwqt57IEiCZu3bOtkrHSfL82zsE4w_26K5yQZF_ImoJsVSrJvdz2eStVpX45tLV4YoGAh71J6IXkQHWWseS1QUPuPrY5U02cKKjqCFYZLo1ZFdZceWiEqPKw2qAU4jRfhCvrOudjktNdzfGWa4FyEhnoVeCB3YetCcRKpZaoouQHxK3NvT7fxhY0EQy34Ft2DNc_zZns5u9dEeYaABF3-KRztZi9a7Yg4DvnJB8cSpERgMRQmgJejFUGYTx2fLqK4")', filter: 'blur(4px)', transform: 'scale(1.1)' }}></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
                                    </>
                                )}

                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className={`absolute inset-0 w-full h-full object-cover ${isCameraActive ? 'opacity-100' : 'opacity-0'}`}
                                />
                                <canvas ref={canvasRef} className="hidden" />

                                {capturedImage && (
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${capturedImage})` }}></div>
                                )}

                                <div className="absolute inset-8 scanner-overlay opacity-50 z-10 pointer-events-none transition-all duration-500 group-hover:opacity-80 group-hover:inset-6"></div>
                                {isCameraActive && <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(99,102,241,1)] z-20 animate-scan pointer-events-none"></div>}

                                {/* <div className="absolute top-6 left-6 z-30">
                                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                        <span className="material-symbols-outlined text-white text-sm">photo_camera_front</span>
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">Front Picture</span>
                                    </div>
                                </div> */}

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/30 rounded-2xl flex items-center justify-center z-10 pointer-events-none">
                                    <div className="w-full h-full relative">
                                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary"></div>
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary"></div>
                                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary"></div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary"></div>
                                    </div>
                                    <span className="absolute -bottom-6 text-white/70 text-[10px] font-medium tracking-wide whitespace-nowrap">
                                        {isProcessing ? 'Analyzing...' : isCameraActive ? 'Tap to Capture' : capturedImage ? 'Processing...' : 'Tap to Capture'}
                                    </span>
                                </div>
                                {error && (
                                    <div className="absolute bottom-10 left-0 right-0 text-center text-red-500 bg-black/50 p-2">
                                        {error}
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Controls / Actions */}
                        <div className="flex flex-col sm:flex-row justify-center mt-2 gap-4 w-full">
                            {(scanStep === 'front-review' || scanStep === 'back-review') ? (
                                <>
                                    <button
                                        onClick={handleRetakeRequest}
                                        className="flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-white dark:bg-surface-card-dark border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all text-text-main-light dark:text-text-main-dark font-bold w-full sm:w-auto min-w-[150px]"
                                    >
                                        <span className="material-symbols-outlined">replay</span>
                                        Retake
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        disabled={isProcessing}
                                        className={`flex items-center justify-center gap-2 py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all font-bold w-full sm:w-auto min-w-[150px] ${isProcessing
                                            ? 'bg-slate-400 cursor-not-allowed'
                                            : 'bg-primary hover:bg-primary-dark text-white'
                                            }`}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin">sync</span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined">check</span>
                                                Confirm
                                            </>
                                        )}
                                    </button>
                                </>
                            ) : (
                                <button onClick={handleUploadClick} className="group relative flex items-center justify-center gap-3 py-4 px-12 rounded-full bg-white dark:bg-surface-card-dark border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden w-full sm:w-auto min-w-[280px]">
                                    <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                                    <span className="material-symbols-outlined text-2xl text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">add_photo_alternate</span>
                                    <div className="flex flex-col items-start">
                                        <span className="text-text-main-light dark:text-text-main-dark font-bold text-base">
                                            {scanStep === 'back-scan' ? 'Upload Back' : 'Upload Front'}
                                        </span>
                                        <span className="text-text-secondary-light dark:text-text-secondary-dark text-[10px] uppercase tracking-wider">From Gallery</span>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 animate-slide-in" style={{ animationDelay: '400ms' }}>
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-primary/20">
                            <div className="absolute -right-10 -bottom-10 opacity-20">
                                <span className="material-symbols-outlined text-[150px]">auto_awesome</span>
                            </div>
                            <h3 className="font-bold text-lg mb-1 relative z-10">AI Recognition</h3>
                            <p className="text-indigo-100 text-sm mb-4 relative z-10">Our enhanced model now detects wider ranges of products instantly.</p>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold border border-white/10 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">nutrition</span> Food
                                </span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold border border-white/10 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">face</span> Cosmetics
                                </span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-semibold border border-white/10 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">medication</span> Meds
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 bg-surface-card-light dark:bg-surface-card-dark rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-soft flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-text-main-light dark:text-text-main-dark">Recent Scans</h3>
                                {recentScans.length > 0 && (
                                    <button onClick={() => navigate('/inventory')} className="text-xs text-primary font-semibold hover:underline">View All</button>
                                )}
                            </div>

                            <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2 -mr-2 flex-1">
                                {recentScans.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full py-8 text-center opacity-70">
                                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3 animate-pulse">
                                            <span className="material-symbols-outlined text-3xl text-slate-400">qr_code_scanner</span>
                                        </div>
                                        <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark mb-1">No scans yet</p>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark max-w-[200px]">
                                            Start scanning products to build your digital pantry!
                                        </p>
                                    </div>
                                ) : (
                                    recentScans.map((scan, index) => (
                                        <div
                                            key={index}
                                            onClick={() => navigate('/scan-result', {
                                                state: {
                                                    frontImage: scan.frontImage,
                                                    backImage: scan.backImage,
                                                    scanData: scan.data
                                                }
                                            })}
                                            className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-xl bg-cover bg-center shrink-0 shadow-sm group-hover:scale-105 transition-transform bg-slate-200 dark:bg-slate-700"
                                                style={{ backgroundImage: `url("${scan.frontImage || scan.data?.image || 'https://via.placeholder.com/150'}")` }}
                                            ></div>
                                            <div className="flex flex-col min-w-0">
                                                <p className="text-sm font-bold text-text-main-light dark:text-text-main-dark truncate group-hover:text-primary transition-colors">
                                                    {scan.data?.name || "Unknown Product"}
                                                </p>
                                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                                                    {scan.timestamp ? new Date(scan.timestamp).toLocaleDateString() : 'Recently'}
                                                </p>
                                            </div>
                                            <div className="ml-auto w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-8 flex flex-col items-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium gap-3 animate-fade-in" style={{ animationDelay: '500ms' }}>
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
                    <p className="opacity-70 hover:opacity-100 transition-opacity">© 2025 ValidityVision Hackathon Project</p>
                </footer>
            </div>

            {/* Retake Confirmation Modal */}
            {showRetakeModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-surface-card-dark rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 border border-slate-200 dark:border-slate-700 scale-95 animate-scale-in">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-500">
                                <span className="material-symbols-outlined text-3xl">warning</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-2">Retake Photo?</h3>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                                    This will discard your current status. Are you sure you want to try again?
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 w-full mt-2">
                                <button
                                    onClick={cancelRetake}
                                    className="py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-text-secondary-light dark:text-text-secondary-dark hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmRetake}
                                    className="py-3 px-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Processing Overlay */}
            {isProcessing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in">
                    <div className="bg-white dark:bg-surface-card-dark rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 border border-slate-200 dark:border-slate-700 animate-scale-in">
                        <div className="flex flex-col items-center text-center gap-6">
                            <div className="relative">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-5xl text-primary animate-spin">sync</span>
                                </div>
                                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-2">
                                    Analyzing Product...
                                </h3>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                                    Our AI is reading the labels and identifying ingredients. This may take a few moments.
                                </p>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-primary to-accent-purple rounded-full animate-pulse" style={{ width: '70%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScanProduct;