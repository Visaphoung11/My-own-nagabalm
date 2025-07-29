import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';

const DiscoverSolutionSection = () => {
  const t = useTranslations('discoverSolution');
  const locale = useLocale();

  return (
    <section
      className="w-full bg-[#F5F5F5] py-12 sm:py-16 lg:py-20 flex flex-col items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/about-grid/Mainposter.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-start justify-between px-4 sm:px-6 lg:px-8 gap-8 sm:gap-12">
          <div className="flex-1 flex flex-col gap-6 sm:gap-8">
            <h2 className={`text-[#FF4500] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center lg:text-left ${locale === 'km' ? 'font-hanuman' : ''}`}>
              {locale === 'en' ? (
                <>DISCOVER THE PERFECT<br />SOLUTION FOR YOUR NEEDS.</>
              ) : (
                t('title')
              )}
            </h2>
            <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
              {/* Active Lifestyles Card */}
              <div className="bg-[#00B4D8] card p-4 sm:p-6 text-white w-full max-w-2xl flex flex-col sm:flex-row items-center relative min-h-[280px] sm:h-56 overflow-visible rounded-xl">
                <div className="flex-1 pr-32 pl-4">
                  <h3 className={`font-extrabold text-3xl mb-3 ${locale === 'km' ? 'font-hanuman' : ''}`}>
                    {t('activeLifestyles.title')}
                  </h3>
                  <p className={`text-xl mb-3 ${locale === 'km' ? 'font-hanuman' : ''}`}>
                    {locale === 'en' ? (
                      <>Push harder. Recover faster.<br />Stay in motion.</>
                    ) : (
                      t('activeLifestyles.subtitle')
                    )}
                  </p>
                  <p className={`text-base mb-4 opacity-90 ${locale === 'km' ? 'font-hanuman' : ''}`}>
                    {locale === 'en' ? (
                      <>Whether you're an athlete or just<br /> always on the move find relief that keeps up.</>
                    ) : (
                      t('activeLifestyles.description')
                    )}
                  </p>
                  <div className="absolute bottom-6 right-10 z-10">
                    <Link href={`/${locale}/products`}>
                      <button className={`bg-[#FF4500] text-white font-bold py-3 px-8 rounded-full text-sm flex items-center gap-2 hover:bg-[#ff5722] transition-colors ${locale === 'km' ? 'font-hanuman' : ''}`}>
                        {t('exploreProducts')}
                        <span className="text-xl">→</span>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="absolute right-[-10px] bottom-0 top-auto">
                  <Image 
                    src="/images/History of CoCo Khmer 3/ActiveLifeStyle@4x.png"
                    alt="Active Lifestyle"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Everyday Relief Card */}
              <div className="bg-[#00A67E] card p-4 sm:p-6 text-white w-full max-w-2xl flex flex-col sm:flex-row items-center relative min-h-[280px] sm:h-56 overflow-visible rounded-xl">
                <div className="flex-1 pr-32 pl-4">
                  <h3 className={`font-extrabold text-3xl mb-3 ${locale === 'km' ? 'font-hanuman' : ''}`}>
                    {t('everydayRelief.title')}
                  </h3>
                  <p className={`text-xl mb-3 ${locale === 'km' ? 'font-hanuman' : ''}`}>
                    {locale === 'en' ? (
                      <>Soothe tension. Ease the day.<br /> Feel good again.</>
                    ) : (
                      t('everydayRelief.subtitle')
                    )}
                  </p>
                  <p className={`text-base mb-4 opacity-90 ${locale === 'km' ? 'font-hanuman' : ''}`}>
                    {locale === 'en' ? (
                      <>From desk strain to daily discomfort,<br /> choose relief made for life's routines.</>
                    ) : (
                      t('everydayRelief.description')
                    )}
                  </p>
                  <div className="absolute bottom-6 right-10 z-10">
                    <Link href={`/${locale}/products`}>
                      <button className={`bg-[#FF4500] text-white font-bold py-3 px-8 rounded-full text-sm flex items-center gap-2 hover:bg-[#ff5722] transition-colors ${locale === 'km' ? 'font-hanuman' : ''}`}>
                        {t('exploreProducts')}
                        <span className="text-xl">→</span>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="absolute right-[-10px] bottom-0 top-auto">
                  <Image 
                    src="/images/History of CoCo Khmer 3/DailyLifeStyle@4x.png"
                    alt="Daily Lifestyle"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSolutionSection; 