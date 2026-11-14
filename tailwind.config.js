/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lens Theme Tokens
        canvas: '#FAFAFA',
        card: '#FFFFFF',
        tinted: '#F2F5F0',
        summary: '#E3EDDA',
        inkPrimary: '#1A1B1E',
        inkSecondary: '#5F6368',
        fresh: '#78A738',
        freshHover: '#689230',
        actionPrimary: '#121316',
        actionPrimaryHover: '#27272A',
        borderHairline: 'rgba(0,0,0,0.07)',
        borderControl: 'rgba(0,0,0,0.12)',
        progressTrack: '#E2E8DE',
        warningDark: '#B45309',
        dangerDark: '#B91C1C',
      },
      borderRadius: {
        'control': '12px',
        'goal': '20px',
        'summary': '24px',
        'sheet': '28px',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
        normal: '-0.01em',
      }
    },
  },
  plugins: [],
};
