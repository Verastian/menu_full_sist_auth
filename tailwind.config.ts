import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'sea1': 'url("/imgs/banners/back/woman-3377839_1920.jpg")',
      },
      keyframes: {
        "swing-in-bottom-fwd": {
          "0%": {
            transform: "rotateX(100deg)",
            transformOrigin: "bottom",
            opacity: "0",
          },
          "100%": {
            transform: "rotateX(0)",
            transformOrigin: "bottom",
            opacity: "1",
          },
        },
        "swing-out-bottom-fwd": {
          "0%": {
            transform: "rotateX(0);",
            transformOrigin: "bottom",
            opacity: "1",
          },
          "100%": {
            transform: "rotateX(-70deg)",
            transformOrigin: "bottom",
            opacity: "0",
          }
        },
        "fade-in-left": {
          "0%": {
            transform: "translateX(-500px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0);",
            opacity: "1",
          }
        },
        "fade-out-left": {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(-500px);",
            opacity: "0",
            display: "none",
          }
        },
        "slide-in-right": {
          "0%": {
            transform: "translateX(500px)",
            // opacity: "0",
          },
          "100%": {
            transform: "translateX(0);",
            // opacity: "1",
          }
        },
        "slide-out-right": {
          "0%": {
            transform: "translateX(0)",
            // opacity: "1",
          },
          "100%": {
            transform: "translateX(500px);",
            // opacity: "0",
            // display: "none",
          }
        },
        "slide-in-blurred-top": {
          "0%": {
            transform: "translateY(-1000px) scaleY(2.5) scaleX(0.2)",
            transformOrigin: " 50% 0%",
            filter: "blur(40px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0) scaleY(1) scaleX(1)",
            transformOrigin: "50% 50%",
            filter: "blur(0)",
            opacity: "1"
          }
        },
        "slide-in-left": {
          "0%": {
            transform: "translateX(-1000px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1"
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          }
        },
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          }
        },
        "swing-in-top-bck": {
          "0%": {
            transform: "rotateX(70deg)",
            transformOrigin: "top",
            opacity: "0",
          },
          "100%": {
            transform: "rotateX(0deg)",
            transformOrigin: "top",
            opacity: "1",
          }
        },
        "swing-out-top-bck": {
          "0%": {
            transform: "rotateX(0deg)",
            transformOrigin: "top",
            opacity: "1",
          },
          "100%": {
            transform: "rotateX(-100deg)",
            transformOrigin: "top",
            opacity: "0",
          }
        },
        "swing-in-top-fwd": {
          "0%": {
            transform: "rotateX(-100deg)",
            transformOrigin: "top",
            opacity: "0"
          },
          "100%": {
            transform: "rotateX(0deg)",
            transformOrigin: "top",
            opacity: "1",
          }
        },
        "swing-in-left-bck": {
          "0%": {
            transform: "rotateY(-70deg)",
            transformOrigin: "left",
            opacity: "0",
          },
          "100%": {
            transform: "rotateY(0)",
            transformOrigin: "left",
            opacity: "1",
          }
        },
        "swing-in-right-fwd": {
          "0%": {
            transform: "rotateY(-100deg)",
            transformOrigin: "right",
            opacity: "0",
          },
          "100%": {
            transform: "rotateY(0)",
            transformOrigin: "right",
            opacity: "1",
          }
        },
        "swing-out-right-fwd": {
          "0%": {
            transform: " rotateY(0)",
            transformOrigin: "right",
            opacity: "1"
          },
          "100%": {
            transform: "rotateY(70deg)",
            transformOrigin: "right",
            opacity: "0"
          }
        },
        "rotate-in-center": {
          "0%": {
            transform: "rotate(-360deg)",
            opacity: "0"
          },
          "100%": {
            transform: "rotate(0)",
            opacity: "1"
          }
        },
        "flip-diagonal-1-bl": {
          "0%": {
            transform: "rotate3d(1, 1, 0, 0deg)",
          },
          "100%": {
            transform: "rotate3d(1, 1, 0, -180deg)",
          }
        },
        "flip-diagonal-1-tr": {
          "0%": {
            transform: "rotate3d(1, 1, 0, 0deg)",
          },
          "100%": {
            transform: "rotate3d(1, 1, 0, 180deg))",
          }
        },
        'flip-in': {
          '0%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        'flip-out': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(-90deg)' },
        },

      },
      animation: {
        'flip-in': 'flip-in 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
        'flip-out': 'flip-out 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
        "flip-diagonal-1-tr": "flip-diagonal-1-tr 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;",
        "flip-diagonal-1-bl": "flip-diagonal-1-bl 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;",
        "rotate-in-center": "rotate-in-center 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "swing-in-right-fwd": "swing-in-right-fwd 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275)both",
        "swing-out-right-fwd": "swing-out-right-fwd 0.55s cubic-bezier(0.600, -0.280, 0.735, 0.045) both",
        "swing-in-left-bck": "swing-in-left-bck 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
        "swing-in-top-fwd": "swing-in-top-fwd 0.3s cubic-bezier(0.175, 0.885, 0.320, 1.275) both",
        "swing-out-top-bck": "swing-out-top-bck 0.3s cubic-bezier(0.600, -0.280, 0.735, 0.045) both",
        "swing-in-top-bck": "swing-in-top-bck 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
        "fade-in": "fade-in 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both",
        "fade-out": "fade-out 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both",
        "slide-in-blurred-top": "slide-in-blurred-top 0.4s cubic-bezier(0.23, 1, 0.32, 1) both",
        "slide-in-right": "slide-in-right 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both",
        "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-out-right": "slide-out-right 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both",
        "fade-in-left": "fade-in-left 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both",
        "fade-out-left": "fade-out-left 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both",
        "swing-out-bottom-fwd": "swing-out-bottom-fwd 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
        "swing-in-bottom-fwd": "swing-in-bottom-fwd 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both",
      },
    },
  },
  plugins: [],
}
export default config
