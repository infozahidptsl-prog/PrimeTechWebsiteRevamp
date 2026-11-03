export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: '#16181f',
        brand: '#1d3fd6',
        muted: '#5d6170',
        line: '#dfe1e7',
        soft: '#eef0f5',
        guide: '#6c66f2',
        canvas: '#f5f6fa',
        panel: '#0f1117',
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
}
