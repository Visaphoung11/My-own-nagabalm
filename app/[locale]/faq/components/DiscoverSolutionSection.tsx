"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';

const DiscoverSolutionSection = () => {
  const router = useRouter();
  const t = useTranslations('faq.discoverSolution');

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${category}`);
  };

  return (
    <section className="w-full bg-[#D6F2F2] flex flex-col items-center py-12 sm:py-16 px-4 sm:px-6">
      <h2 className="text-[#F9461C] text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-10 leading-tight">
        {t('title').split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index === 0 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16 w-full max-w-7xl justify-center items-stretch">
        {/* Active Lifestyles Card */}
        <div className="bg-[#F9461C] text-white w-full max-w-2xl p-6 flex relative rounded-xl overflow-visible min-h-[14rem] sm:min-h-[12rem]">
          <div className="flex-1 pr-24 sm:pr-32 pl-2 sm:pl-4">
            <h2 className="text-[32px] sm:text-2xl font-extrabold mb-2 leading-tight">
              {t('activeLifestyles.title')}<br />
            </h2>
            <p className="text-sm sm:text-base mb-3 sm:mb-4 opacity-90 leading-relaxed">
              {t('activeLifestyles.subtitle').split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index === 0 && <br />}
                </React.Fragment>
              ))}
              {/* {t('activeLifestyles.description').split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index === 0 && <br />}
                </React.Fragment>
              ))} */}
            </p>
            <div className="absolute bottom-4 right-4 z-10">
              <button 
                onClick={() => handleCategoryClick('active')}
                className="bg-[#CFE8EE] text-[#F9461C] font-bold py-2 px-6 rounded-full text-base hover:bg-[#ffd580] transition-colors"
              >
                {t('activeLifestyles.viewProducts')}
              </button>
            </div>
          </div>
          <div className="absolute right-[-40px] bottom-[-0px]">
            <Image 
              src="/images/History of CoCo Khmer 3/ActiveLifeStyle@4x.png"
              alt="Active Lifestyle"
              width={350}
              height={350}
              className="object-contain w-full max-w-[200px] sm:max-w-[250px]"
            />
          </div>
        </div>
         {/* Everyday Relief Card */}
    <div className="bg-[#00B388] text-white w-full max-w-2xl p-6 flex relative rounded-xl overflow-visible min-h-[14rem] sm:min-h-[12rem]">
      <div className="flex-1 pr-24 sm:pr-36">
        <h2 className="text-[32px] sm:text-2xl font-extrabold mb-2 leading-tight">
          {t('everydayRelief.title')}
        </h2>
        <p className="text-sm sm:text-base opacity-90 leading-relaxed mb-4">
          {[t('everydayRelief.subtitle'),].map(text =>
            text.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx === 0 && <br />}
              </React.Fragment>
            ))
          )}
        </p>
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={() => handleCategoryClick('everyday')}
            className="bg-[#CFE8EE] text-[#F9461C] font-bold py-2 px-6 rounded-full text-base hover:bg-[#ffd580] transition-colors"
          >
            {t('everydayRelief.viewProducts')}
          </button>
        </div>
      </div>
      <div className="absolute right-[-20px] bottom-[-0px]">
        <Image
          src="/images/History of CoCo Khmer 3/DailyLifeStyle@4x.png"
          alt="Daily Lifestyle"
          width={350}
          height={350}
          className="object-contain w-full max-w-[200px] sm:max-w-[250px]"
        />
      </div>
    </div>
      </div>
    </section>
  );
};

export default DiscoverSolutionSection; 