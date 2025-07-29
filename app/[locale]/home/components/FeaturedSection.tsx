"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';

const FeaturedSection = () => {
  const t = useTranslations('featured');
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const featuredProducts = [
    {
      key: 'nagabalmGo',
      img: "/images/Images for NB/Naga-Balm-Go.jpg",
      bgColor: "bg-[#E8F5F0]",
      badgeColors: "bg-[#B2E3D7] text-[#009688]",
    },
    {
      key: 'inhalerRollOn',
      img: "/images/Images for NB/Inhaler&RollOn.jpg",
      bgColor: "bg-[#FFE6B0]",
      badgeColors: "bg-[#E8F5F0] text-[#009688]",
    },
    {
      key: 'mosquitoRepellent',
      img: "/images/Images for NB/NagaBalm-MosquitoRepellent.jpg",
      bgColor: "bg-[#FFF8E1]",
    },
    {
      key: 'nagabalmFire',
      img: "/images/Images for NB/Naga-Balm-Fire.jpg",
      bgColor: "bg-[#FFE0D6]",
    },
    {
      key: 'extremeLiniment',
      img: "/images/Images for NB/Leniment-Oil-Extreme.jpg",
      bgColor: "bg-[#F9461C]",
      textColor: "text-white",
      isLastCard: true,
    },
  ];

  // Check scroll position and update button states
  const checkScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0]?.clientWidth || 300;
      containerRef.current.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0]?.clientWidth || 300;
      containerRef.current.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
    }
  };

  // Check scroll on mount and scroll events
  useEffect(() => {
    checkScrollButtons();
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  return (
    <section className="bg-white w-full py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
          <h2 className={`text-[#F9461C] text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${locale === 'km' ? 'font-hanuman' : ''}`}>
            {t('title')}
          </h2>
          <Link 
            href={`/${locale}/products`}
            className={`bg-[#F9461C] text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base transition-all duration-300 hover:bg-[#d13a17] flex items-center gap-2 group ${locale === 'km' ? 'font-hanuman' : ''}`}
          >
            {t('viewAll')}
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#F9461C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#F9461C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Product Carousel */}
          <div 
            ref={containerRef}
            className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onScroll={checkScrollButtons}
          >
            {featuredProducts.map((product, idx) => (
              <div key={idx} className="flex flex-col flex-shrink-0 w-64 sm:w-72 lg:w-80 snap-start">
                {/* Image Container */}
                <div className={`card relative aspect-square mb-4 sm:mb-6 bg-white overflow-hidden`}>
                  {/* Product Image */}
                  <div className="absolute inset-0 w-full h-full rounded-[10px] overflow-hidden">
                    <Image
                      src={product.img}
                      alt={t(`products.${product.key}.name`)}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                    />
                  </div>
                  {/* Badge */}
                  {t.has(`products.${product.key}.label`) && (
                    <span className={`absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 rounded-full text-xs font-bold z-10 ${product.badgeColors} ${locale === 'km' ? 'font-hanuman' : ''}`}>
                      {t(`products.${product.key}.label`)}
                    </span>
                  )}
                </div>
                {/* Product Info */}
                <div className={`flex flex-col flex-grow text-[#F9461C]`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold text-lg sm:text-xl ${locale === 'km' ? 'font-hanuman' : ''}`}>
                      {t(`products.${product.key}.name`)}
                    </h3>
                    <span className={`text-xs sm:text-sm font-bold opacity-75 ${locale === 'km' ? 'font-hanuman' : ''}`}>
                      {t(`products.${product.key}.weight`)}
                    </span>
                  </div>
                  <p className={`text-sm text-black mb-3 sm:mb-4 min-h-[40px] sm:min-h-[48px] ${locale === 'km' ? 'font-hanuman' : ''}`}>
                    {t(`products.${product.key}.description`)}
                  </p>
                  {/* Learn More Button */}
                  <Link 
                    href={`/${locale}/products`}
                    className={`mt-auto w-full py-2.5 sm:py-3 px-6 sm:px-8 rounded-full font-bold text-sm transition-colors duration-300 border border-current hover:bg-[#F9461C] hover:text-white text-center ${locale === 'km' ? 'font-hanuman' : ''}`}
                  >
                    {t('learnMore')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex justify-center mt-4 sm:hidden">
          <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Swipe to see more
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;