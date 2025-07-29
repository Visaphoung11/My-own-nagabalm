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
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      fontSize: {
        // Responsive font sizes with clamp for fluid typography
        // General / Home page
        nav: ["clamp(1rem, 2.5vw, 1.125rem)", { lineHeight: "1.4" }], // 16px-18px
        hero: ["clamp(2.5rem, 8vw, 5.625rem)", { lineHeight: "1.1" }], // 40px-90px
        h2: ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.2" }], // 32px-48px
        h3: ["clamp(1.5rem, 4vw, 2.25rem)", { lineHeight: "1.3" }], // 24px-36px
        h4: ["clamp(1.125rem, 2.5vw, 1.25rem)", { lineHeight: "1.4" }], // 18px-20px
        p: ["clamp(1rem, 2.5vw, 1.25rem)", { lineHeight: "1.6" }], // 16px-20px
        // Cards
        "card-h3": ["clamp(1.125rem, 2.5vw, 1.25rem)", { lineHeight: "1.3" }], // 18px-20px
        "card-sub": ["clamp(0.75rem, 2vw, 0.875rem)", { lineHeight: "1.4" }], // 12px-14px
        "card-text": ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 14px-16px
        // Product Card
        "product-card-h3": ["clamp(1.5rem, 4vw, 2.25rem)", { lineHeight: "1.2" }], // 24px-36px
        "product-card-text": ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 14px-16px
        // Footer
        "footer-title": ["clamp(1.125rem, 2.5vw, 1.25rem)", { lineHeight: "1.4" }], // 18px-20px
        "footer-text": ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 14px-16px
        // FAQs
        "faq-h1": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.2" }], // 32px-48px
        "faq-subtitle": ["clamp(1.5rem, 4vw, 2.25rem)", { lineHeight: "1.3" }], // 24px-36px
        "faq-text": ["clamp(1rem, 2.5vw, 1.25rem)", { lineHeight: "1.5" }], // 16px-20px
        "faq-acc-title": ["clamp(1rem, 2.5vw, 1.125rem)", { lineHeight: "1.4" }], // 16px-18px
        "faq-acc-text": ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 14px-16px
        // Product details page
        "product-title": ["clamp(1.25rem, 3vw, 1.625rem)", { lineHeight: "1.3" }], // 20px-26px
        "product-sub": ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.4" }], // 14px-16px
        "product-text": ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 14px-16px
        // About page
        "about-hero": ["clamp(2.5rem, 7vw, 4.5rem)", { lineHeight: "1.1" }], // 40px-72px
        "about-h2": ["clamp(2.25rem, 6vw, 4rem)", { lineHeight: "1.2" }], // 36px-64px
        "about-card-h3": ["clamp(1.5rem, 4vw, 3rem)", { lineHeight: "1.2" }], // 24px-48px
        "about-card-text": ["clamp(0.75rem, 1.5vw, 0.75rem)", { lineHeight: "1.4" }], // 12px
        // History card
        "history-card-title": ["clamp(1.125rem, 3vw, 1.4375rem)", { lineHeight: "1.3" }], // 18px-23px
        "history-card-text": ["clamp(0.875rem, 2vw, 1rem)", { lineHeight: "1.5" }], // 14px-16px
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      colors: {
        primary: "#00B0D7", // Light blue
        "brand-orange": "#F04923", // Bright orange
        "beige-light": "#FFF7E9", // Very light beige
        "beige-medium": "#FFE2A9", // Medium beige
        "yellow-dark": "#F1A91E", // Dark yellow
        "mint-light": "#CEEDD7", // Light mint green
        "mint-blue": "#CFE8EE", // Light blue-mint
        "green-brand": "#34AD8B", // Teal green
      },
      maxWidth: {
        bloc: "1280px",
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
};

export default config; 