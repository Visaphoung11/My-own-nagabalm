
"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { useTranslations, useLocale } from "next-intl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetProducts, type ApiProduct } from "@/lib/api";
import { subscribeAppEvents } from "@/lib/events";

// Types
interface DisplayProduct {
  id: string;
  name: string;
  desc: string;
  img: string;
  weight?: string;
  badge?: string | null;
  label?: string | null;
}

// Helper to get background class based on product name
const getProductBgClass = (name: string): string => {
  const upper = name.toUpperCase();
  if (upper.includes("ORIGINAL")) return "bg-yellow-100";
  if (upper.includes("ICE")) return "bg-blue-100";
  if (upper.includes("FIRE")) return "bg-red-100";
  if (upper.includes("GO")) return "bg-green-100";
  if (upper.includes("ENERGIZING")) return "bg-teal-100";
  return "bg-gray-100";
};

// Components
const LoadingSpinner: React.FC = () => {
  const t = useTranslations("products.grid.states");
  return (
    <div className="w-full py-12 flex justify-center items-center">
      <div className="animate-pulse text-[#F9461C] text-xl">
        {t("loadingProducts")}
      </div>
    </div>
  );
};

const EmptyState: React.FC = () => {
  const t = useTranslations("products.grid.states");
  return (
    <div className="col-span-full text-center py-12">
      <div className="text-gray-400 text-lg mb-2">{t("noProductsFound")}</div>
      <div className="text-gray-500 text-sm">{t("tryAdjusting")}</div>
    </div>
  );
};

const ProductCard: React.FC<{
  product: DisplayProduct;
  onLearnMore: (productId: string) => void;
}> = React.memo(({ product, onLearnMore }) => {
  const t = useTranslations("products.grid.actions");
  const handleLearnMore = useCallback(
    () => onLearnMore(product.id),
    [product.id, onLearnMore]
  );
  const bgClass = getProductBgClass(product.name);
  return (
    <article className="bg-white card shadow-lg rounded-lg p-4 sm:p-6 flex flex-col h-auto min-h-[450px] sm:min-h-[500px] lg:h-[520px] hover:shadow-xl transition-shadow duration-300">
      <div
        className={`relative w-full aspect-square mb-3 sm:mb-4 overflow-hidden rounded-lg ${bgClass}`}
      >
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={false}
        />
        {product.label && (
          <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full z-10 bg-[#B2E3D7] text-[#009688]">
            {product.label}
          </span>
        )}
        {product.badge && (
          <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full z-10 bg-[#FFE6B0] text-[#F9461C]">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-[#F9461C] font-extrabold text-sm sm:text-base mb-2 sm:mb-3 min-h-[40px] sm:min-h-[48px] leading-tight">
          {product.name}
        </h3>
        <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-4 flex-grow">
          {product.desc}
        </p>
        <div className="mt-auto space-y-3 sm:space-y-4">
          {product.weight && (
            <div className="text-xs text-gray-500 font-medium">
              {product.weight}
            </div>
          )}
          <button
            className="w-full border-2 border-[#F9461C] text-[#F9461C] font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-full text-xs sm:text-sm transition-all duration-300 hover:bg-[#F9461C] hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F9461C] focus:ring-opacity-50"
            onClick={handleLearnMore}
            aria-label={`Learn more about ${product.name}`}
          >
            {t("learnMore")}
          </button>
        </div>
      </div>
    </article>
  );
});
ProductCard.displayName = "ProductCard";

// Main component
const ProductsGridSection: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale() as "en" | "km";
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Reset image index when product changes
  useEffect(() => {
    if (selectedProductId) {
      setCurrentImageIndex(0);
    }
  }, [selectedProductId]);

  // Preserve possible category from URL for future use if needed
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory && urlCategory !== "all") {
      setActiveCategoryId(urlCategory);
    }
  }, [searchParams]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["public-products"],
    queryFn: apiGetProducts,
    staleTime: 0,
  });

  useEffect(() => {
    const unsubscribe = subscribeAppEvents((evt) => {
      if (evt.type === "products/changed") {
        queryClient.invalidateQueries({ queryKey: ["public-products"] });
        refetch();
      }
    });
    return unsubscribe;
  }, [queryClient, refetch]);

  const allProducts = data?.data ?? [];

  const mapToDisplayProduct = useCallback(
    (p: ApiProduct): DisplayProduct => {
      const tr = p.translations[locale];
      return {
        id: p.id,
        name: tr.name || p.slug,
        desc: tr.description || "",
        img: p.images[0] || "/placeholder-logo.png",
        weight: tr.size,
        label: p.isTopSell ? (locale === "km" ? "លក់ដាច់" : "TOP") : null,
        badge: null,
      };
    },
    [locale]
  );

  const handleLearnMore = useCallback((productId: string) => {
    setSelectedProductId(productId);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const clearSearch = useCallback(() => setSearchQuery(""), []);

  // Fetch categories for filter bar
  type CategoryItem = {
    id: string;
    name?: string;
    translations?: Record<string, { name?: string }>;
  };

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery<{
    success: boolean;
    data: CategoryItem[];
  }>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`/api/categories`);
      if (!res.ok) throw new Error("Failed to load categories");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const categories: CategoryItem[] = categoriesData?.data ?? [];

  // Apply category filtering if product has categoryId
  const productsAfterCategory = useMemo(() => {
    if (activeCategoryId === "all") return allProducts;
    return allProducts.filter((p: any) => p.categoryId === activeCategoryId);
  }, [allProducts, activeCategoryId]);

  const displayProducts = useMemo(() => {
    let result = [...productsAfterCategory];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p: any) =>
          p.slug?.toLowerCase().includes(q) ||
          p.translations?.en?.name?.toLowerCase().includes(q) ||
          p.translations?.km?.name?.toLowerCase().includes(q)
      );
    }
    return result.map(mapToDisplayProduct);
  }, [productsAfterCategory, searchQuery, mapToDisplayProduct]);

  return (
    <section className="py-6 sm:py-10">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl text-center sm:text-3xl font-extrabold text-[#F9461C] mb-4">
            {t("products.grid.title")}
          </h2>
          {/* Search Bar */}
<div className="flex justify-center mb-4">
  <div className="relative w-80 sm:w-96">
    <input
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder={t("products.grid.searchPlaceholder")}
      className="w-full px-4 py-2 bg-white rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F9461C] text-gray-700"
    />
    {searchQuery && (
      <button
        onClick={clearSearch}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
    )}
  </div>
</div>

{/* Categories Filter Bar */}
  <div className="flex justify-center border-2 border-solid bg-gray-100 rounded-4xl mb-6 overflow-x-auto w-[60%] max-w-2xl mx-auto">
  <div className="flex gap-2 mt-2 mb-2">
    <button
      type="button"
      onClick={() => setActiveCategoryId("all")}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
        activeCategoryId === "all"
          ? "bg-[#F9461C] text-white"
          : "bg-white text-gray-700 shadow-sm"
      }`}
    >
      {locale === "km" ? "ផលិតផលទាំងអស់" : "ALL PRODUCTS"}
    </button>

    {isLoadingCategories ? (
      <span className="px-4 py-2 text-sm text-gray-500">
        {locale === "km" ? "កំពុងផ្ទុក..." : "Loading..."}
      </span>
    ) : (
      categories.map((c) => {
        const label =
          (c.translations?.[locale]?.name || c.name || "").toUpperCase();
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveCategoryId(c.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeCategoryId === c.id
                ? "bg-[#F9461C] text-white"
                : "bg-white text-gray-700 shadow-sm"
            }`}
            title={label}
          >
            {label}
          </button>
        );
      })
    )}
  </div>
</div>

          {/* <div className="relative w-60 mb-4">
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t("products.grid.searchPlaceholder")}
              className="w-full px-4 py-2 bg-white rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F9461C] text-gray-700"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div> */}
          {/* Categories Filter Bar */}
          {/* <div className="mb-6 overflow-x-auto">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveCategoryId("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategoryId === "all"
                    ? "bg-[#F9461C] text-white"
                    : "bg-white text-gray-700 shadow-sm"
                }`}
              >
                {locale === "km" ? "ផលិតផលទាំងអស់" : "ALL PRODUCTS"}
              </button>
              {isLoadingCategories ? (
                <span className="px-4 py-2 text-sm text-gray-500">
                  {locale === "km" ? "កំពុងផ្ទុក..." : "Loading..."}
                </span>
              ) : (
                categories.map((c) => {
                  const label = (
                    c.translations?.[locale]?.name ||
                    c.name ||
                    ""
                  ).toUpperCase();
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveCategoryId(c.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                        activeCategoryId === c.id
                          ? "bg-[#F9461C] text-white"
                          : "bg-white text-gray-700 shadow-sm"
                      }`}
                      title={label}
                    >
                      {label}
                    </button>
                  );
                })
              )}
            </div>
          </div> */}
        </div>

        {/* Showing count */}
        {!isLoading && (
          <div className="text-gray-500 text-center mb-4 text-sm">
            Showing {displayProducts.length} products
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : displayProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onLearnMore={handleLearnMore}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedProductId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            {(() => {
              const product = allProducts.find(
                (p) => p.id === selectedProductId
              );
              if (!product) return null;
              const tr = product.translations[locale];
              const bgClass = getProductBgClass(tr.name || product.slug);
              const images = product.images || [
                product.images[0] || "/placeholder-logo.png",
              ]; // Ensure images array exists
              return (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 w-full md:w-1/2">
                    {images.length > 0 && (
                      <div className="mb-4 sm:mb-0">
                        {/* Main image with arrows */}
                        <div
                          className={`relative w-full h-64 sm:h-80 md:h-[400px] rounded-lg overflow-hidden ${bgClass}`}
                        >
                          <Image
                            src={
                              images[
                                Math.min(currentImageIndex, images.length - 1)
                              ]
                            }
                            alt={`${tr.name} image ${currentImageIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                          {images.length > 1 && (
                            <>
                              <button
                                type="button"
                                aria-label="Previous image"
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full px-2 py-1 text-sm shadow"
                                onClick={() =>
                                  setCurrentImageIndex(
                                    (i) =>
                                      (i - 1 + images.length) % images.length
                                  )
                                }
                              >
                                ‹
                              </button>
                              <button
                                type="button"
                                aria-label="Next image"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full px-2 py-1 text-sm shadow"
                                onClick={() =>
                                  setCurrentImageIndex(
                                    (i) => (i + 1) % images.length
                                  )
                                }
                              >
                                ›
                              </button>
                            </>
                          )}
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                          <div className="mt-3 flex gap-2 overflow-x-auto">
                            {images.map((src, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`relative flex-none w-16 h-16 rounded-md border ${
                                  currentImageIndex === idx
                                    ? "ring-2 ring-[#F9461C] border-[#F9461C]"
                                    : "border-gray-200"
                                }`}
                                aria-label={`Thumbnail ${idx + 1}`}
                              >
                                <Image
                                  src={src}
                                  alt={`${tr.name} thumbnail ${idx + 1}`}
                                  fill
                                  className="object-cover rounded-md"
                                  sizes="64px"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col w-full md:w-1/2 overflow-y-auto max-h-[calc(90vh-2rem)]">
                    <h3
                      id="product-modal-title"
                      className="text-2xl font-extrabold text-[#F9461C] mb-2 uppercase"
                    >
                      {tr.name}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 whitespace-pre-line">
                      {tr.description}
                    </p>

                    {tr.activeIngredient && (
                      <div className="bg-teal-100 rounded p-4 mb-4">
                        <h4 className="font-bold mb-2 uppercase">
                          {t("products.grid.modal.activeIngredient")}
                        </h4>
                        <p className="text-sm">{tr.activeIngredient}</p>
                      </div>
                    )}

                    {Array.isArray(tr.usage) && tr.usage.length > 0 && (
                      <div className="bg-yellow-100 rounded p-4 mb-4">
                        <h4 className="font-bold mb-2 uppercase">
                          {t("products.grid.modal.usage")}
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {tr.usage.map((u, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              {u}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {tr.size && (
                      <div className="text-xs text-gray-500 mb-4">
                        {tr.size}
                      </div>
                    )}

                    {Array.isArray(tr.bestForTags) &&
                      tr.bestForTags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tr.bestForTags.map((tag, i) => (
                            <span
                              key={i}
                              className="inline-block px-3 py-1 text-xs rounded-full bg-teal-100 text-teal-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              );
            })()}
            <button
              aria-label="Close"
              className="absolute top-3 right-3 rounded-full p-2 hover:bg-gray-100 text-gray-500"
              onClick={() => setSelectedProductId(null)}
            >
              <span className="sr-only">Close</span>✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsGridSection;
