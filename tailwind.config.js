module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      typography(theme) {
        return {
          DEFAULT: {
            css: {
              a: {
                color: 'inherit'
              },
              img: {
                marginInline: 'auto'
              }
            }
          }
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
