import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/apiConfig';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  image: string;
  daysLeft?: number;
  expiryDate?: string;
  status: 'fresh' | 'expiring' | 'expired' | 'consumed';
  originalData?: any;
}

import { SidebarContext } from '../App';

const Inventory: React.FC = () => {
  const navigate = useNavigate();
  const { toggleMobileMenu } = React.useContext(SidebarContext);
  const [activeTab, setActiveTab] = useState<'all' | 'expiring' | 'expired' | 'consumed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const itemsPerPage = 8;

  // Load scan history from localStorage
  // Load inventory function - made reusable
  const loadInventory = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        console.warn("No user email found, skipping API fetch.");
        setInventoryItems([]);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/product/${userEmail}`);
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        const items: InventoryItem[] = data.data.map((product: any) => {
          // Calculate days left if not provided directly
          let daysLeft = product.dates?.daysLeft;
          if (daysLeft === undefined && product.dates?.expiry) {
            const expiry = new Date(product.dates.expiry);
            const today = new Date();
            const diffTime = expiry.getTime() - today.getTime();
            daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          }

          // Ensure days left is never negative - show 0 instead
          if (daysLeft !== undefined && daysLeft < 0) {
            daysLeft = 0;
          }

          // Determine status - check consumed field from API
          let status: 'fresh' | 'expiring' | 'expired' | 'consumed' = 'fresh';
          if (product.consumed === true) {
            status = 'consumed';
          } else if (daysLeft !== undefined) {
            if (daysLeft === 0) status = 'expired';
            else if (daysLeft <= 3) status = 'expiring';
            else status = 'fresh';
          }

          return {
            id: product._id,
            name: product.name,
            category: product.category,
            image: product.image,
            daysLeft: daysLeft,
            expiryDate: product.dates?.expiry,
            status: status,
            originalData: product
          };
        });
        setInventoryItems(items);
      } else {
        console.error("Failed to fetch product or invalid data format");
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error('Failed to load inventory:', error);
      setInventoryItems([]);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  // Reset to first page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  // Function to mark item as consumed
  const handleConsume = async (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event

    // Find the item to get its full data
    const item = inventoryItems.find(i => i.id === itemId);
    if (!item || !item.originalData) {
      alert('Item data not found. Please refresh the page.');
      return;
    }

    try {
      // Prepare the full product data with consumed flag
      const updatedProduct = {
        ...item.originalData,
        consumed: true  // Add consumed boolean field instead of changing status
      };

      // Update in backend
      const response = await fetch(`${API_BASE_URL}/api/product/id/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });

      if (response.ok) {
        // Update local state only - no backend reload needed
        setInventoryItems(prevItems =>
          prevItems.map(item =>
            item.id === itemId ? { ...item, status: 'consumed' as const, originalData: { ...item.originalData, consumed: true } } : item
          )
        );
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to update item status:', errorData);
        alert('Failed to mark item as consumed. Please try again.');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to mark item as consumed. Please try again.');
    }
  };

  // Pagination Logic
  const filteredItems = inventoryItems.filter(item => {
    let matchesTab = false;

    if (activeTab === 'all') {
      matchesTab = true;
    } else if (activeTab === 'expiring') {
      // Safe tab: fresh and expiring items (days left > 0)
      matchesTab = item.status === 'fresh' || item.status === 'expiring';
    } else if (activeTab === 'expired') {
      // Unsafe tab: expired items
      matchesTab = item.status === 'expired';
    } else if (activeTab === 'consumed') {
      // Consumed tab: consumed items
      matchesTab = item.status === 'consumed';
    }

    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate statistics from actual data
  const totalItems = inventoryItems.length;
  const expiringItems = inventoryItems.filter(item => item.status === 'expiring').length;
  const safetyScore = inventoryItems.length > 0
    ? Math.round((inventoryItems.filter(item => item.status === 'fresh' || item.status === 'expiring').length / inventoryItems.length) * 100)
    : 100;

  return (
    <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 via-primary/5 to-transparent pointer-events-none z-0"></div>

      <header className="w-full px-4 md:px-8 py-6 md:py-8 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center shrink-0 z-10 relative">
        <div className="w-full md:w-auto pr-12 md:pr-0">
          <h2 className="text-text-main-light dark:text-text-main-dark text-3xl font-black leading-tight tracking-[-0.033em]">Pantry</h2>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none flex items-center gap-2 bg-white dark:bg-surface-card-dark p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm w-full md:w-auto">
            <input
              className="bg-transparent border-none text-sm text-text-main-light dark:text-text-main-dark placeholder-slate-400 focus:ring-0 w-full md:w-64 pl-3"
              placeholder="Search pantry..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors shrink-0">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="bg-white dark:bg-surface-card-dark hover:bg-slate-50 dark:hover:bg-slate-700 text-text-main-light dark:text-text-main-dark border border-slate-200 dark:border-slate-700 shadow-sm rounded-full p-2.5 relative transition-colors shrink-0 md:hidden flex items-center justify-center"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 custom-scrollbar z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Items', value: totalItems.toString(), icon: 'inventory_2', color: 'text-accent-orange', bg: 'bg-orange-50 dark:bg-orange-900/20', sub: `${inventoryItems.filter((_, i) => i < 3).length} recent scans`, ring: 'ring-accent-orange/10' },
            { label: 'Expiring Soon', value: expiringItems.toString(), icon: 'warning', color: 'text-accent-yellow', bg: 'bg-amber-50 dark:bg-amber-900/20', sub: expiringItems > 0 ? 'Action Needed' : 'All Good', ring: 'ring-accent-yellow/10', isAlert: expiringItems > 0 },
            { label: 'Safety Score', value: `${safetyScore}%`, icon: 'verified_user', color: 'text-primary', bg: 'bg-purple-50 dark:bg-purple-900/20', sub: safetyScore >= 80 ? 'Pantry is healthy' : 'Needs attention', ring: 'ring-primary/10', isProgress: true, progressWidth: safetyScore }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-2xl p-6 bg-surface-card-light dark:bg-surface-card-dark border border-slate-100 dark:border-slate-800 shadow-card dark:shadow-none relative overflow-hidden group hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
              <div className="absolute right-0 top-0 p-4 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-500 rotate-12">
                <span className={`material-symbols-outlined text-9xl ${stat.isProgress ? 'text-primary' : 'text-text-main-light dark:text-white'}`}>{stat.icon}</span>
              </div>
              <div className="flex items-center gap-3 mb-1">
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} ring-1 ${stat.ring}`}>
                  <span className="material-symbols-outlined text-xl">{stat.icon}</span>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
              <div className={`flex ${stat.isAlert ? 'items-baseline gap-3' : 'items-center gap-4'} mt-2`}>
                <p className="text-text-main-light dark:text-text-main-dark text-4xl font-extrabold leading-tight">{stat.value}</p>
                {stat.isAlert && <span className="text-amber-700 dark:text-amber-400 text-[10px] uppercase font-bold bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded-full border border-amber-200 dark:border-amber-800/50">{stat.sub}</span>}
                {stat.isProgress && (
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-dark shadow-[0_0_15px_rgba(139,92,246,0.5)]" style={{ width: `${stat.progressWidth}%` }}></div>
                  </div>
                )}
              </div>
              {!stat.isAlert && !stat.isProgress && (
                <div className="mt-auto pt-2">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{stat.sub}</p>
                </div>
              )}
              {stat.isProgress && (
                <div className="mt-auto pt-2">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{stat.sub}</p>
                </div>
              )}
              {stat.isAlert && (
                <div className="mt-auto pt-2">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{expiringItems > 0 ? 'Review to reduce waste' : 'Keep up the good work'}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex gap-2 p-1.5 bg-white dark:bg-surface-card-dark rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All', icon: null, color: null },
              { id: 'expiring', label: 'Safe', color: 'bg-green-500' },
              { id: 'expired', label: 'Unsafe', color: 'bg-danger' },
              { id: 'consumed', label: 'Consumed', color: 'bg-primary-dark' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-xl pl-4 pr-4 transition-all active:scale-95 ${activeTab === tab.id
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-700 group'
                  }`}
              >
                {tab.color && <span className={`w-2 h-2 rounded-full ${tab.color} shadow-sm`}></span>}
                <p className={`text-sm font-bold ${activeTab === tab.id ? 'text-white' : 'text-text-secondary-light dark:text-text-secondary-dark group-hover:text-text-main-light dark:group-hover:text-white'}`}>
                  {tab.label}
                </p>
              </button>
            ))}
          </div>
          <button onClick={() => navigate('/scan')} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 border border-primary/20">
            <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
            Scan Product
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {currentItems.map(item => {
            return (
              <div key={item.id} className={`group relative flex flex-col rounded-2xl bg-surface-card-light dark:bg-surface-card-dark border shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden ${item.status === 'expired'
                ? 'border-red-100 dark:border-red-900/50 hover:shadow-red-100/50 dark:hover:shadow-none grayscale hover:grayscale-0'
                : 'border-slate-200 dark:border-slate-800'
                }`}
                onClick={() => {
                  if (item.originalData) {
                    navigate('/scan-result', {
                      state: {
                        frontImage: item.image,
                        backImage: item.image, // API might not have back image separate
                        scanData: item.originalData
                      }
                    });
                  }
                }}
              >
                <div className="w-full aspect-[4/3] bg-cover bg-center relative" style={{ backgroundImage: `url("${item.image}")` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
                  <div className={`absolute top-3 right-3 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-white/10 ${item.status === 'expired' ? 'bg-black/40' : 'bg-black/40'
                    }`}>
                    {item.status === 'expiring' && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Safe</span>
                      </>
                    )}
                    {item.status === 'fresh' && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Safe</span>
                      </>
                    )}
                    {item.status === 'expired' && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-danger shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Unsafe</span>
                      </>
                    )}
                    {item.status === 'consumed' && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Consumed</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className={`text-text-main-light dark:text-text-main-dark text-lg font-bold leading-tight ${item.status === 'expired' ? 'decoration-red-300 line-through decoration-2 text-text-main-light/80 dark:text-text-main-dark/80' : ''}`}>
                      {item.name}
                    </h3>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium">{item.category}</p>
                  </div>
                  <div className="mt-auto">
                    {/* Render different footer content based on status */}
                    {(item.status === 'expiring' || item.status === 'fresh') && (
                      <>
                        <div className="flex justify-between items-center mb-5">
                          <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">Expires in</span>
                          <span className={`text-sm font-bold px-2 py-0.5 rounded ${item.status === 'expiring'
                            ? 'text-accent-yellow bg-amber-50 dark:bg-amber-900/30'
                            : 'text-green-600 bg-green-50 dark:bg-green-900/30'
                            }`}>
                            {item.daysLeft} {item.daysLeft === 1 ? 'day' : 'days'} left
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-5">
                          <div
                            className={`h-full rounded-full ${item.status === 'expiring' ? 'bg-accent-yellow' : 'bg-green-500'}`}
                            style={{ width: `${Math.min((item.daysLeft || 0) * 10, 100)}%` }} // Adjusted scale for fresh items
                          ></div>
                        </div>
                        <button
                          onClick={(e) => handleConsume(item.id, e)}
                          className="flex-1 w-full py-2.5 rounded-xl bg-primary dark:bg-primary-dark text-white text-sm font-bold hover:bg-primary-dark dark:hover:bg-primary shadow-lg shadow-primary/20 transition-all"
                        >
                          Consume
                        </button>
                      </>
                    )}

                    {item.status === 'expired' && (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">Days left</span>
                          <span className="text-danger text-sm font-bold bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded">0 days left</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-5">
                          <div className="h-full bg-danger w-full rounded-full"></div>
                        </div>
                        <button className="w-full py-2.5 rounded-xl bg-white dark:bg-surface-card-dark border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 text-danger text-sm font-medium transition-colors flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-base">delete</span>
                          Discard
                        </button>
                      </>
                    )}

                    {item.status === 'consumed' && (
                      <>
                        <div className="flex justify-between items-center mb-5">
                          <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium">Status</span>
                          <span className="text-primary-dark dark:text-primary-soft text-sm font-bold bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded">All Gone</span>
                        </div>
                        <button className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-text-main-light dark:text-white text-sm font-semibold transition-colors border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500">
                          Consumed
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {
          totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 mb-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-xl transition-colors ${currentPage === 1
                  ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary'
                  }`}
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${currentPage === number
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-xl transition-colors ${currentPage === totalPages
                  ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary'
                  }`}
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )
        }

        <footer className="mt-8 mb-8 flex flex-col items-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium gap-2">
          <div className="h-px w-12 bg-slate-300 dark:bg-slate-700"></div>
          <p>© 2025 ValidityVision Hackathon Project</p>
        </footer>
      </div>
    </div>
  );
};

export default Inventory;