tailwind.config = {
      theme: {
        extend: {
          /* Brand colors */
          colors: {
            qnavy: '#0C1531',
            qmint: '#16C99B',
            qblue: '#3B6FE0',
            qslate: '#434B61',
            qmist: '#98A0B2',
            qcloud: '#E1E4EA',
            qpaper: '#F4F4F1',
            qamber: '#F0B43E',
            qcoral: '#E2553D'
          },
          /* Arabic and Latin font  */
          fontFamily: {
            arabic: ['IBM Plex Sans Arabic', 'sans-serif'],
            display: ['Space Grotesk', 'sans-serif'],
            manrope: ['Manrope', 'sans-serif']
          },
          /* Responsive typography presets  */
          fontSize: {
            display: ['clamp(64px, 7vw, 92px)', { lineHeight: '.94', fontWeight: '700' }],
            h1: ['clamp(44px, 4.6vw, 56px)', { lineHeight: '1.16', fontWeight: '700' }],
            h2: ['clamp(30px, 3vw, 32px)', { lineHeight: '1.28', fontWeight: '700' }],
            h3: ['clamp(20px, 2vw, 22px)', { lineHeight: '1.38', fontWeight: '700' }],
            body: ['clamp(16.5px, 1.15vw, 18px)', { lineHeight: '1.85', fontWeight: '400' }],
            caption: ['13px', { lineHeight: '1.6', fontWeight: '600' }]
          }
        }
      }
    };
