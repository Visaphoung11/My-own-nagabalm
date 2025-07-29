"use client";

import React, { useState, useEffect, Suspense, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from 'next-intl';
import { products as allProducts, type Product } from "../products";

// Types
interface ProductDetail {
  id: string;
  name: string;
  desc: string;
  weight: string;
  label?: string;
  badge?: string;
}

interface DisplayProduct {
  id: string;
  name: string;
  desc: string;
  img: string;
  weight: string;
  badge: string | null;
  label: string | null;
}

type CategoryType = "all" | "active" | "everyday";

// Constants
const IMAGE_MAP: Record<string, string> = {
  'naga-balm-original': '/images/Images for NB/Naga-Balm-Original.jpg',
  'naga-balm-ice': '/images/Images for NB/Naga-Balm-Ice.jpg',
  'naga-balm-fire': '/images/Images for NB/Naga-Balm-Fire.jpg',
  'naga-balm-go': '/images/Images for NB/Naga-Balm-Go.jpg',
  'naga-balm-energizing-liniment': '/images/Images for NB/Leniment-Oil-Energizing.jpg',
  'extreme-liniment-oil': '/images/Images for NB/Leniment-Oil-Extreme.jpg',
  'pain-relief-spray': '/images/Images for NB/Energizing-Spray.jpg',
  'inhaler-roll-on': '/images/Images for NB/Inhaler&RollOn.jpg',
  'liniment-roll-on': '/images/Images for NB/RollOn.jpg',
  'mosquito-repellent': '/images/Images for NB/NagaBalm-MosquitoRepellent.jpg',
  'medicated-oil': '/images/Images for NB/Leniment-Oil-Energizing.jpg',
} as const;

// Product detail key mapping
const PRODUCT_DETAIL_KEYS: Record<string, string> = {
  'naga-balm-original': 'nagaBalmOriginal',
  'naga-balm-ice': 'nagaBalmIce',
  'naga-balm-fire': 'nagaBalmFire',
  'naga-balm-go': 'nagaBalmGo',
  'naga-balm-energizing-liniment': 'nagaBalmEnergizingLiniment',
  'extreme-liniment-oil': 'extremeLinimentOil',
  'pain-relief-spray': 'painReliefSpray',
  'inhaler-roll-on': 'inhalerRollOn',
  'liniment-roll-on': 'linimentRollOn',
  'mosquito-repellent': 'mosquitoRepellent',
  'medicated-oil': 'medicatedOil',
} as const;

const SORT_ORDERS = {
  active: [
    'naga-balm-fire',
    'naga-balm-go',
    'naga-balm-energizing-liniment',
    'extreme-liniment-oil',
    'liniment-roll-on',
    'pain-relief-spray',
  ],
  everyday: [
    'naga-balm-original',
    'naga-balm-ice',
    'naga-balm-go',
    'naga-balm-energizing-liniment',
    'extreme-liniment-oil',
    'liniment-roll-on',
    'inhaler-roll-on',
    'medicated-oil',
    'mosquito-repellent',
  ],
} as const;

// Utility functions
const normalizeText = (text: string): string => text.toLowerCase().trim();

const sortProductsByCategory = (products: Product[], category: CategoryType): Product[] => {
  if (category === "all") return products;
  
  const sortOrder = SORT_ORDERS[category];
  return [...products].sort((a, b) => {
    const indexA = sortOrder.indexOf(a.id as any);
    const indexB = sortOrder.indexOf(b.id as any);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
};

// Components
const LoadingSpinner: React.FC = () => {
  const t = useTranslations('products.grid.states');
  
  return (
    <div className="w-full py-12 flex justify-center items-center">
      <div className="animate-pulse text-[#F9461C] text-xl">{t('loadingProducts')}</div>
    </div>
  );
};

const EmptyState: React.FC = () => {
  const t = useTranslations('products.grid.states');
  
  return (
    <div className="col-span-full text-center py-12">
      <div className="text-gray-400 text-lg mb-2">{t('noProductsFound')}</div>
      <div className="text-gray-500 text-sm">{t('tryAdjusting')}</div>
    </div>
  );
};

const ProductBadge: React.FC<{ badge: string; position: 'left' | 'right' }> = ({ badge, position }) => {
  const t = useTranslations('products.grid');
  
  const baseClasses = "absolute top-4 text-xs font-bold px-3 py-1 rounded-full z-10";
  const positionClasses = position === 'left' ? 'left-4' : 'right-4';
  const colorClasses = badge === 'NEW' || badge === 'ថ្មី'
    ? 'bg-[#FFE6B0] text-[#F9461C]' 
    : 'bg-[#B2E3D7] text-[#009688]';
  
  return (
    <span className={`${baseClasses} ${positionClasses} ${colorClasses}`}>
      {badge}
    </span>
  );
};

const ProductCard: React.FC<{ 
  product: DisplayProduct; 
  onLearnMore: (productId: string) => void;
}> = React.memo(({ product, onLearnMore }) => {
  const t = useTranslations('products.grid.actions');
  
  const handleLearnMore = useCallback(() => {
    onLearnMore(product.id);
  }, [product.id, onLearnMore]);

  return (
    <article className="bg-white card shadow-lg rounded-lg p-4 sm:p-6 flex flex-col h-auto min-h-[450px] sm:min-h-[500px] lg:h-[520px] hover:shadow-xl transition-shadow duration-300">
      {/* Product Image Area */}
      <div className="relative w-full aspect-square mb-3 sm:mb-4 overflow-hidden rounded-lg bg-gray-50">
        <Image 
          src={product.img} 
          alt={product.name}
          fill 
          className="object-contain transition-transform duration-300 hover:scale-105" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={false}
        />
        {product.label && <ProductBadge badge={product.label} position="left" />}
        {product.badge && <ProductBadge badge={product.badge} position="right" />}
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-[#F9461C] font-extrabold text-sm sm:text-base mb-2 sm:mb-3 text-center min-h-[40px] sm:min-h-[48px] flex items-center justify-center leading-tight px-2">
          {product.name}
        </h3>
        
        <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 text-center line-clamp-3 sm:line-clamp-4 flex-grow px-2">
          {product.desc}
        </p>
        
        <div className="mt-auto space-y-3 sm:space-y-4">
          <div className="text-xs text-right text-gray-500 font-medium px-2">
            {product.weight}
          </div>
          
          <button
            className="w-full border-2 border-[#F9461C] text-[#F9461C] font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-xs sm:text-sm transition-all duration-300 hover:bg-[#F9461C] hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F9461C] focus:ring-opacity-50"
            onClick={handleLearnMore}
            aria-label={`Learn more about ${product.name}`}
          >
            {t('learnMore')}
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';

const ProductModal: React.FC<{ 
  product: Product; 
  onClose: () => void;
}> = React.memo(({ product, onClose }) => {
  const t = useTranslations('products.grid');
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white max-w-xs sm:max-w-2xl lg:max-w-4xl w-full rounded-xl overflow-hidden max-h-[90vh] relative shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-[#F9461C] text-3xl font-bold hover:scale-110 transition-transform z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
          onClick={onClose}
          aria-label={t('actions.closeModal')}
        >
          ×
        </button>

        <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 lg:gap-8 overflow-y-auto max-h-[90vh]">
          {/* Image */}
          <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-xl p-4 sm:p-6">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
              <Image
                src={IMAGE_MAP[product.id] || product.image}
                alt={product.name.en}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-6">
            <h2 id="modal-title" className="text-[#F9461C] text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight">
              {product.name.en.toUpperCase()}
            </h2>
            
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm sm:text-base">
              {product.description.en}
            </p>

            {/* Key Ingredient */}
            <div className="bg-[#B2E3D7] p-4 sm:p-6 rounded-xl">
              <h3 className="font-bold mb-2 text-[#009688] text-sm sm:text-base">{t('modal.activeIngredient')}</h3>
              <p className="text-gray-800 text-sm sm:text-base">{product.keyIngredient.benefits}</p>
            </div>

            {/* Usage */}
            <div className="bg-[#FFE6B0] p-4 sm:p-6 rounded-xl">
              <h3 className="font-bold mb-2 text-[#F9461C] text-sm sm:text-base">{t('modal.usage')}</h3>
              <p className="whitespace-pre-line text-gray-800 text-sm sm:text-base">{product.recommendedFor}</p>
            </div>

            {/* Benefits tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {product.useCase.benefits.map((benefit, i) => (
                <span
                  key={i}
                  className="bg-[#B2E3D7] text-[#009688] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductModal.displayName = 'ProductModal';

// Main component
const ProductsGrid: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);
  const t = useTranslations();
  
  // State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType>(() => {
    const urlCategory = searchParams.get('category');
    return (urlCategory === 'active' || urlCategory === 'everyday') ? urlCategory : "all";
  });

  // Function to get translated product details
  const getTranslatedProductDetails = useCallback((productId: string): ProductDetail => {
    const detailKey = PRODUCT_DETAIL_KEYS[productId];
    if (detailKey) {
      const productDetails = t.raw(`products.grid.productDetails.${detailKey}`);
      return {
        id: productId,
        name: productDetails.name || productId.toUpperCase(),
        desc: productDetails.description || '',
        weight: productDetails.weight || '',
        label: productDetails.label || undefined,
        badge: productDetails.badge || undefined,
      };
    }
    
    // Fallback for products not in translation
    const product = allProducts.find(p => p.id === productId);
    return {
      id: productId,
      name: product?.name.en.toUpperCase() || productId.toUpperCase(),
      desc: product?.description.en || '',
      weight: '',
    };
  }, [t]);

  const mapToDisplayProduct = useCallback((product: Product): DisplayProduct => {
    const details = getTranslatedProductDetails(product.id);
    return {
      id: product.id,
      name: details.name,
      desc: details.desc,
      img: IMAGE_MAP[product.id] || product.image,
      weight: details.weight,
      badge: details.badge || null,
      label: details.label || null,
    };
  }, [getTranslatedProductDetails]);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Apply search filter
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeText(searchQuery);
      result = result.filter(product => 
        normalizeText(product.name.en).includes(normalizedQuery) ||
        normalizeText(product.description.en).includes(normalizedQuery)
      );
    }
    
    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter(product => {
        return activeCategory === "active" 
          ? product.useCase.type.includes("active")
          : product.useCase.type.includes("everyday");
      });
    }

    // Sort products
    result = sortProductsByCategory(result, activeCategory);
    
    // Map to display format
    return result.map(mapToDisplayProduct);
  }, [searchQuery, activeCategory, mapToDisplayProduct]);

  // Handlers
  const handleCategoryChange = useCallback((category: CategoryType) => {
    setActiveCategory(category);
  }, []);

  const handleLearnMore = useCallback((productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Effects
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory === 'active' || urlCategory === 'everyday') {
      setActiveCategory(urlCategory);
    }
  }, [searchParams]);

  // Smooth scroll to grid after category changes
  useEffect(() => {
    if (didMount.current && gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      const headerOffset = 100;
      const fullyVisible = rect.top >= headerOffset && rect.bottom <= window.innerHeight;

      if (!fullyVisible) {
        const y = rect.top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      didMount.current = true;
    }
  }, [activeCategory]);

  return (
    <section 
      id="products-section" 
      className="w-full py-8 sm:py-12 flex flex-col items-center bg-white" 
      ref={gridRef}
    >
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={handleCloseModal} 
        />
      )}

      <div className="w-full max-w-7xl flex flex-col items-center mb-6 sm:mb-8 px-4 sm:px-6 lg:px-8">
        {/* Filter and Search Section */}
        <div className="w-full mb-8 sm:mb-12 space-y-4 sm:space-y-6">
          {/* Search Bar */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={t('products.grid.search.placeholder')}
                className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border-2 border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#F9461C] focus:ring-2 focus:ring-[#F9461C] focus:ring-opacity-20 transition-all duration-300 text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#F9461C] transition-colors duration-200"
                  aria-label={t('products.grid.search.clear')}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex justify-center">
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 bg-gray-50 p-2 rounded-2xl sm:rounded-full border border-gray-200">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap text-center ${
                  activeCategory === "all"
                    ? "bg-[#F9461C] text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-[#F9461C] shadow-sm hover:shadow-md"
                }`}
              >
                {t('products.grid.filters.allProducts')}
              </button>
              <button
                onClick={() => handleCategoryChange("active")}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap text-center ${
                  activeCategory === "active"
                    ? "bg-[#F9461C] text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-[#F9461C] shadow-sm hover:shadow-md"
                }`}
              >
                {t('products.grid.filters.activeLifestyle')}
              </button>
              <button
                onClick={() => handleCategoryChange("everyday")}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap text-center ${
                  activeCategory === "everyday"
                    ? "bg-[#F9461C] text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-[#F9461C] shadow-sm hover:shadow-md"
                }`}
              >
                {t('products.grid.filters.everyday')}
              </button>
            </div>
          </div>

          {/* Results Count and Search Query Display */}
          <div className="flex justify-center">
            <div className="text-gray-600 text-sm">
              {searchQuery ? (
                <span>
                  {t('products.grid.results.showing')} <span className="font-bold text-[#F9461C]">{filteredProducts.length}</span> {t('products.grid.results.resultsFor')} "
                  <span className="font-medium text-gray-800">{searchQuery}</span>"
                  {activeCategory !== "all" && (
                    <span> {t('products.grid.results.in')} <span className="font-medium text-[#F9461C]">{activeCategory === "active" ? t('products.grid.filters.activeLifestyle') : t('products.grid.filters.everyday')}</span></span>
                  )}
                </span>
              ) : (
                <span>
                  {t('products.grid.results.showing')} <span className="font-bold text-[#F9461C]">{filteredProducts.length}</span> {t('products.grid.results.products')}
                  {activeCategory !== "all" && (
                    <span> {t('products.grid.results.in')} <span className="font-medium text-[#F9461C]">{activeCategory === "active" ? t('products.grid.filters.activeLifestyle') : t('products.grid.filters.everyday')}</span></span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 w-full">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onLearnMore={handleLearnMore}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </section>
  );
};

// Main exported component with Suspense
const ProductsGridSection: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsGrid />
    </Suspense>
  );
};

export default ProductsGridSection;