import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const DiscoverSolutionSection = () => {
  const t = useTranslations("discoverSolution");
  const locale = useLocale();

  const buttonClass =
    "bg-[#FF4500] text-white font-bold py-3 px-8 rounded-full text-sm flex items-center gap-2 hover:bg-[#ff5722] transition-colors";
  const fontClass = locale === "km" ? "font-hanuman" : "";

  return (
    <section className="w-full bg-[#F5F5F5] md:bg-[url('/images/about-grid/Mainposter.png')] md:bg-cover md:bg-center md:bg-no-repeat py-12 sm:py-16 lg:py-20 flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for desktop */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-8 sm:gap-12 lg:gap-16">
            {/* Title */}
            <h2 className={`text-[#FF4500] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight  lg:text-left ${fontClass}`}>
              {locale === "en" ? (
                <>
                  DISCOVER THE <br /> PERFECT
                  <br />
                  SOLUTION FOR <br />YOUR NEEDS.
                </>
              ) : (
                t("title")
              )}
            </h2>

            {/* Cards */}
            <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
              {/* Card 1: Active Lifestyles */}
              <div className="bg-[#00B4D8] text-white w-full max-w-2xl flex flex-col min-h-[280px] sm:h-56 rounded-xl p-4 sm:p-6">
                <div className="flex-1 pr-4 pl-4 flex flex-col h-full">
                  <h3 className={`font-extrabold text-2xl sm:text-3xl mb-3 ${fontClass}`}>
                    {t("activeLifestyles.title")}
                  </h3>
                  <p className={`text-base mb-4 leading-relaxed ${fontClass}`}>
                    {locale === "en" ? (
                      <>
                        Perform, recover, and stay in motion.
                        <br />
                        Whether you're an athlete, fitness enthusiast, or someone who loves staying active.
                      </>
                    ) : (
                      t("activeLifestyles.subtitle")
                    )}
                  </p>
                  <div className="mt-auto">
                    <Link href={`/${locale}/products`}>
                      <button className={`${buttonClass} ${fontClass}`}>
                        {t("exploreProducts")} <span className="text-xl">→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 2: Everyday Relief */}
              <div className="bg-[#00A67E] text-white w-full max-w-2xl flex flex-col min-h-[280px] sm:h-56 rounded-xl p-4 sm:p-6">
                <div className="flex-1 pr-4 pl-4 flex flex-col h-full">
                  <h3 className={`font-extrabold text-2xl sm:text-3xl mb-3 ${fontClass}`}>
                    {t("everydayRelief.title")}
                  </h3>
                  <p className={`text-base mb-4 leading-relaxed ${fontClass}`}>
                    {locale === "en" ? (
                      <>
                        Perform, recover, and stay in motion.
                        <br />
                        Whether you're managing daily discomfort or supporting long-term wellness.
                      </>
                    ) : (
                      t("everydayRelief.subtitle")
                    )}
                  </p>
                  <div className="mt-auto">
                    <Link href={`/${locale}/products`}>
                      <button className={`${buttonClass} ${fontClass}`}>
                        {t("exploreProducts")} <span className="text-xl">→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only image */}
        <div className="lg:hidden mt-10 flex justify-center min-h-[300px]">
          <div className="relative w-full max-w-[500px]">
            <Image
              src="/images/about-grid/Mainposter.png"
              alt="Discover the perfect solution"
              width={500}
              height={320}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSolutionSection;
