import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        karla: ["var(--font-karla)"],
        kh: ["var(--font-hanuman)"],
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      fontSize: {
        // Home Page / General
        nav: ["clamp(0.875rem, 2.5vw, 1.125rem)", { lineHeight: "1.4" }], // 14–18px
        hero: ["clamp(2.25rem, 8vw, 5.625rem)", { lineHeight: "1.1" }], // 36–90px
        h2: ["clamp(1.75rem, 5vw, 3rem)", { lineHeight: "1.2" }], // 28–48px
        h3: ["clamp(1.25rem, 4vw, 2.25rem)", { lineHeight: "1.3" }], // 20–36px
        h4: ["clamp(1rem, 3vw, 1.25rem)", { lineHeight: "1.4" }], // 16–20px
        p: ["clamp(0.875rem, 2.5vw, 1.25rem)", { lineHeight: "1.6" }], // 14–20px
        btn: ["clamp(1rem, 2.5vw, 1rem)", { lineHeight: "1.4" }], // 16px fixed

        // Card
        "card-h3": ["clamp(1.25rem, 4vw, 2rem)", { lineHeight: "1.3" }], // 20–32px
        "card-sub": ["clamp(0.875rem, 2vw, 0.875rem)", { lineHeight: "1.4" }], // 14px fixed
        "card-text": ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 14–16px

        // Product Card
        "product-card-h3": ["clamp(1.25rem, 4vw, 2.25rem)", { lineHeight: "1.2" }], // 20–36px
        "product-card-text": ["clamp(0.75rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 12–16px

        // Footer
        "footer-title": ["clamp(1rem, 2.5vw, 1.25rem)", { lineHeight: "1.4" }], // 16–20px
        "footer-text": ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 14–16px
        "footer-nav": ["clamp(0.9375rem, 2vw, 0.9375rem)", { lineHeight: "1.4" }], // 15px fixed

        // FAQs
        "faq-h1": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.2" }], // 32–48px
        "faq-subtitle": ["clamp(1.75rem, 4vw, 2.25rem)", { lineHeight: "1.3" }], // 28–36px
        "faq-text": ["clamp(0.875rem, 2.5vw, 1.25rem)", { lineHeight: "1.5" }], // 14–20px
        "faq-acc-title": ["clamp(1rem, 2.5vw, 1.125rem)", { lineHeight: "1.4" }], // 16–18px
        "faq-acc-text": ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 14–16px

        // Product Page
        "product-title": ["clamp(1.25rem, 3vw, 1.625rem)", { lineHeight: "1.3" }], // 20–26px
        "product-sub": ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.4", fontWeight: "bold" }], // 14–16px bold
        "product-text": ["clamp(0.75rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 12–16px

        // About Page
        "about-hero": ["clamp(2rem, 7vw, 4.5rem)", { lineHeight: "1.1" }], // 32–72px
        "about-h2": ["clamp(1.75rem, 6vw, 4rem)", { lineHeight: "1.2" }], // 28–64px
        "about-card-h3": ["clamp(1.25rem, 4vw, 3rem)", { lineHeight: "1.2" }], // 20–48px
        "about-card-text": ["clamp(0.75rem, 2vw, 0.75rem)", { lineHeight: "1.4" }], // 12px fixed

        // History Card
        "history-card-title": ["clamp(1.4375rem, 3vw, 1.4375rem)", { lineHeight: "1.3" }], // 23px fixed
        "history-card-text": ["clamp(1rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 16px fixed
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        34: "8.5rem",
        38: "9.5rem",
      },
      colors: {
        primary: "#00B0D7",
        "brand-orange": "#F04923",
        "beige-light": "#FFF7E9",
        "beige-medium": "#FFE2A9",
        "yellow-dark": "#F1A91E",
        "mint-light": "#CEEDD7",
        "mint-blue": "#CFE8EE",
        "green-brand": "#34AD8B",
      },
      maxWidth: {
        bloc: "1280px", // desktop
        mobilebloc: "330px", // mobile
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          xs: "1.875rem", // 30px for mobile
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;
