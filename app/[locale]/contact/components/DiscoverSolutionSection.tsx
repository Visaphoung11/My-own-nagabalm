
"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { useTranslations } from 'next-intl';

const DiscoverSolutionSection = () => {
  const router = useRouter();
  const t = useTranslations('contact.discoverSolution');

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${category}`);
  };

  return (
    <section className="w-full bg-[#D6F2F2] flex flex-col items-center py-12 sm:py-16 px-4 sm:px-6">
      <h2 className="text-[#F9461C] text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 sm:mb-10 leading-tight">
        {t('title').split('\\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index === 0 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16 w-full max-w-7xl justify-center items-stretch">
        <div className="flex flex-col lg:flex-row gap-6 w-full px-4 sm:px-6 max-w-6xl mx-auto">
  {/* Card 1: Active Lifestyles */}
  <div className="bg-[#00C3E3] text-white p-6 rounded-xl flex flex-col justify-between h-full">
    <div>
      <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
        {t('activeLifestyles.title')}
      </h3>
      <p className="text-sm sm:text-base opacity-90 mb-4">
        {t('activeLifestyles.description')
          .split('\\n')
          .map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </p>
    </div>
    <button
      onClick={() => handleCategoryClick('active')}
      className="bg-[#FFE6B0] text-[#F9461C] font-bold py-2 px-6 rounded-full text-sm sm:text-base w-fit self-start hover:bg-[#ffd580] transition-colors"
    >
      {t('activeLifestyles.button')} →
    </button>
  </div>

  {/* Card 2: Everyday Relief */}
  <div className="bg-[#00B888] text-white p-6 rounded-xl flex flex-col justify-between h-full">
    <div>
      <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
        {t('everydayRelief.title')}
      </h3>
      <p className="text-sm sm:text-base opacity-90 mb-4">
        {t('everydayRelief.description')
          .split('\\n')
          .map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </p>
    </div>
    <button
      onClick={() => handleCategoryClick('relief')}
      className="bg-[#FFE6B0] text-[#F9461C] font-bold py-2 px-6 rounded-full text-sm sm:text-base w-fit self-start hover:bg-[#ffd580] transition-colors"
    >
      {t('everydayRelief.button')} →
    </button>
  </div>
</div>
      </div>
    </section>
  );
};

export default DiscoverSolutionSection; 