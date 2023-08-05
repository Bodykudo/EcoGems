module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      margin: {
        320: '32rem',
      },
      width: {
        190: '19rem',
        275: '275px',
        300: '30rem',
        340: '34rem',
        350: '35rem',
        656: '656px',
        880: '88rem',
        508: '508px',
      },
      height: {
        80: '8rem',
        340: '34rem',
        370: '37rem',
        420: '42rem',
        510: '51rem',
        600: '60rem',
        685: '685px',
        800: '80rem',
        '90vh': '90vh',
      },
      flex: {
        0.7: '0.7 1 0%',
      },
      maxHeight: {
        370: '37rem',
      },
      minWidth: {
        210: '21rem',
        350: '35rem',
        620: '62rem',
      },
      textColor: {
        lightGray: '#F1EFEE',
        primary: '#FAFAFA',
        secColor: '#efefef',
        navColor: '#BEBEBE',
      },
      backgroundColor: {
        mainColor: '#FBF8F9',
        secondaryColor: '#F0F0F0',
        darkGreen: '#1F7042',
        lightBlack: 'rgba(0, 0, 0, 0.85)',
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
      },
      backgroundImage: {
        banner: 'url(https://source.unsplash.com/random/1600x900/?nature)',
      },
      keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(-20rem)',
            transform: 'translateX(-20rem)',
          },
          '100%': {
            '-webkit-transform': 'translateX(0px)',
            transform: 'translateX(0px)',
          },
        },

        'slide-fwd': {
          '0%': {
            '-webkit-transform': 'translateZ(0px)',
            transform: 'translateZ(0px)',
          },
          '100%': {
            '-webkit-transform': 'translateZ(16rem)',
            transform: 'translateZ(16rem)',
          },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-fwd':
          ' slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  variants: {
    // backgroundColor: ['active'],
    extend: {},
  },
  plugins: [],
};
