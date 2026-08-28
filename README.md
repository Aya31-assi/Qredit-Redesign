## Recommended file order

1. `index.html`
   Contains the page content and sections. Start here.

2. `css/custom.css`
   Contains the main design, including colors, spacing, layouts, and responsive styles.

3. `css/animations.css`
   Contains the CSS animations.

4. `js/translations.js`
   Contains the English text and Arabic/English language-switching logic.

5. `js/animations.js`
   Contains the menu, scrolling, FAQ, pricing, and other interactions.

6. `tailwind.config.js`
   Contains the shared colors, fonts, and text sizes.

7. `assets/`
   Contains the website images and logos.


## Responsive design

* Desktop: Uses sticky sections and stacked cards.
* Tablet: Multi-column sections become smaller layouts.
* Mobile: Sections become single-column and the navigation becomes a menu.

## Moving the design to _.js

When adding this prototype to the main Qredit _.js project:

1. Convert each HTML section into a React component.
2. Add the design settings from `tailwind.config.js` to the main project.
3. Move shared CSS to the global stylesheet.
4. Move JavaScript interactions into React client components or hooks.
5. Move the assets to the project’s public folder.
6. Test the final website on desktop, tablet, and mobile.

