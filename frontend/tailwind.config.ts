import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";
import colors from './colors';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/progress.js"
  ],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [nextui()],
} satisfies Config;
