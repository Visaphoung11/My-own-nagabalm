"use client";

import { useRouter, useParams } from "next/navigation";
import { useTranslations } from 'next-intl';
import { products as allProducts, type Product } from "../../products";
import Image from "next/image";
import React, { useState, useCallback } from "react";

const categoryStyles: Record<string, { bg: string; text: string }> = {
  active: { bg: "bg-[#F9461C]", text: "text-white" },
  everyday: { bg: "bg-[#00B388]", text: "text-white" },
};

const categoryTitles: Record<string, string> = {
  active: "Active Lifestyles",
  everyday: "Everyday Relief",
};

// Map product id to image in "Images for NB" folder
const imageMap: Record<string, string> = {
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
};

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

// ProductModal component
type ProductModalProps = { product: Product; onClose: () => void };
const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const t = useTranslations('products.preview.modal');
  const tProductDetails = useTranslations('products.grid.productDetails');
  
  if (!product) return null;
  
  // Get translated product details for modal
  const getModalProductDetails = useCallback(() => {
    const detailKey = PRODUCT_DETAIL_KEYS[product.id];
    if (detailKey) {
      try {
        const productDetails = tProductDetails.raw(detailKey);
        return {
          name: productDetails.name || product.name.en.toUpperCase(),
          description: productDetails.description || product.description.en,
        };
      } catch (error) {
        // Fallback to English
        return {
          name: product.name.en.toUpperCase(),
          description: product.description.en,
        };
      }
    }
    
    // Fallback to English
    return {
      name: product.name.en.toUpperCase(),
      description: product.description.en,
    };
  }, [product.id, tProductDetails]);

  const modalDetails = getModalProductDetails();
  
  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
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
    >
      <div
        className="bg-white max-w-4xl w-full rounded-xl overflow-hidden max-h-[90vh] relative shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-[#F9461C] text-3xl font-bold hover:scale-110 transition-transform z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
          onClick={onClose}
        >
          ×
        </button>
        <div className="flex flex-col lg:flex-row p-8 gap-8 overflow-y-auto max-h-[90vh]">
          <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-xl p-6">
            <div className="relative w-80 h-80">
              <Image
                src={imageMap[product.id] || product.image}
                alt={modalDetails.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-[#F9461C] text-3xl font-extrabold leading-tight">
              {modalDetails.name}
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {modalDetails.description}
            </p>
            <div className="bg-[#B2E3D7] p-6 rounded-xl">
              <h3 className="font-bold mb-2 text-[#009688]">{t('activeIngredient')}</h3>
              <p className="text-gray-800">{product.keyIngredient.benefits}</p>
            </div>
            <div className="bg-[#FFE6B0] p-6 rounded-xl">
              <h3 className="font-bold mb-2 text-[#F9461C]">{t('usage')}</h3>
              <p className="whitespace-pre-line text-gray-800">{product.recommendedFor}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.useCase.benefits.map((benefit, i) => (
                <span
                  key={i}
                  className="bg-[#B2E3D7] text-[#009688] px-4 py-2 rounded-full text-sm font-semibold"
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
};

export default function CategoryPreviewPage() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('products.preview');
  const tCategories = useTranslations('products.preview.categories');
  const tProductDetails = useTranslations('products.grid.productDetails');
  
  const category = params.category as 'active' | 'everyday';
  const style = categoryStyles[category] || { bg: "bg-gray-200", text: "text-black" };
  const title = tCategories(category);

  const products = allProducts.filter((p) => p.useCase.type.includes(category));

  const categories = ["active", "everyday"];
  const currentIndex = categories.indexOf(category);
  const prevCategory = categories[(currentIndex - 1 + categories.length) % categories.length] as 'active' | 'everyday';
  const nextCategory = categories[(currentIndex + 1) % categories.length] as 'active' | 'everyday';

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Function to get translated product details
  const getTranslatedProductDetails = useCallback((productId: string) => {
    const detailKey = PRODUCT_DETAIL_KEYS[productId];
    if (detailKey) {
      try {
        const productDetails = tProductDetails.raw(detailKey);
        return {
          name: productDetails.name || productId.toUpperCase(),
          desc: productDetails.description || '',
          weight: productDetails.weight || '',
        };
      } catch (error) {
        console.warn(`Missing translation for product ${detailKey}:`, error);
        // Fallback to English data
        const product = allProducts.find(p => p.id === productId);
        return {
          name: product?.name.en.toUpperCase() || productId.toUpperCase(),
          desc: product?.description.en || '',
          weight: '',
        };
      }
    }
    
    // Fallback for products not in translation mapping
    const product = allProducts.find(p => p.id === productId);
    return {
      name: product?.name.en.toUpperCase() || productId.toUpperCase(),
      desc: product?.description.en || '',
      weight: '',
    };
  }, [tProductDetails]);

  return (
    <div className={`min-h-screen w-full ${style.bg} ${style.text} flex flex-col items-center justify-center pb-16 px-0 relative`}>
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#F9461C]/30 via-[#00B388]/20 to-white/80 pointer-events-none" />
      
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center pt-16 pb-8 relative z-10">
        <Image 
          src="/images/Logo/Naga Balm__Brandmark_White.png" 
          alt="Naga Balm Logo" 
          width={90} 
          height={90} 
          className="drop-shadow-lg mb-4" 
        />
        <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-center tracking-tight drop-shadow-lg text-white" 
            style={{textShadow: '0 2px 16px #F9461C55'}}>
          {t('hero.productsTitle', { category: title })}
        </h1>
        <div className="h-2 w-24 bg-gradient-to-r from-[#F9461C] to-[#00B388] rounded-full mb-4" />
        <p className="text-lg text-white/90 max-w-2xl text-center mb-2">
          {t('hero.subtitle', { category: title.toLowerCase() })}
        </p>
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={() => router.push(`/products/preview/${prevCategory}`)}
        className="fixed left-4 top-1/2 -translate-y-1/2 bg-white/80 text-[#F9461C] rounded-full p-3 shadow hover:bg-white z-50 border-2 border-[#F9461C] hover:scale-110 transition-transform"
        aria-label={t('navigation.goToPrevious', { category: tCategories(prevCategory) })}
      >
        <span className="text-3xl">&#8592;</span>
      </button>
      <button
        onClick={() => router.push(`/products/preview/${nextCategory}`)}
        className="fixed right-4 top-1/2 -translate-y-1/2 bg-white/80 text-[#F9461C] rounded-full p-3 shadow hover:bg-white z-50 border-2 border-[#F9461C] hover:scale-110 transition-transform"
        aria-label={t('navigation.goToNext', { category: tCategories(nextCategory) })}
      >
        <span className="text-3xl">&#8594;</span>
      </button>
      <button
        onClick={() => router.push("/products")}
        className="absolute top-8 left-8 bg-white text-[#F9461C] font-bold py-2 px-6 rounded-full shadow hover:bg-gray-100 transition-colors z-20 border border-[#F9461C]"
      >
        {t('navigation.backToProducts')}
      </button>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full max-w-7xl px-4 z-10">
        {products.map((product) => {
          const details = getTranslatedProductDetails(product.id);
          return (
            <div key={product.id} className="bg-white/90 card shadow-xl p-4 flex flex-col h-[500px] rounded-2xl border border-[#F9461C]/10 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 relative overflow-hidden group">
              {/* Decorative background blob */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#F9461C]/10 to-[#00B388]/10 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform duration-300" />
              
              {/* Product Image Area */}
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl z-10 flex items-center justify-center bg-white/60">
                <Image 
                  src={imageMap[product.id] || product.image} 
                  alt={details.name} 
                  fill 
                  className="object-contain" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" 
                />
              </div>
              
              <div className="flex flex-col flex-grow z-10">
                <div className="text-[#F9461C] font-extrabold text-base mb-1 text-center min-h-[48px] flex items-center justify-center">
                  {details.name}
                </div>
                <div className="text-black text-xs mb-2 text-center overflow-hidden h-16">
                  {details.desc}
                </div>
                <div className="mt-auto">
                  <div className="text-xs text-right w-full text-gray-500 mb-4">{details.weight}</div>
                  <button
                    className="border-2 border-[#F9461C] text-[#F9461C] font-bold py-2 px-6 rounded-full text-sm transition-colors hover:bg-[#F9461C] hover:text-white w-full"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {t('modal.learnMore')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
} 