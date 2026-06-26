# Richi Rich Restaurant Website

A premium, modern website for Richi Rich Restaurant, showcasing authentic North Indian cuisine in Lucknow's Aliganj area.

## Features

- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Modern UI**: Clean, warm design with emotional storytelling
- **Interactive Elements**: Smooth scrolling, hover animations, and scroll-triggered reveals
- **Performance Optimized**: Lazy loading images, compressed assets, and fast loading
- **SEO Friendly**: Optimized meta tags, semantic HTML, and local SEO elements
- **Trust Building**: Customer ratings, testimonials, and social proof

## Color Palette

- Primary: Deep Maroon (#7B1E1E)
- Secondary: Warm Beige (#F5E6D3)
- Accent: Mustard Gold (#D4A017)
- Neutral: Charcoal (#2E2E2E)
- Background: Soft Cream (#FFF9F2)

## Typography

- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)
- Buttons: Bold sans-serif

## File Structure

```
restaurant/
├── index.html          # Main HTML file
├── styles.css          # CSS stylesheets
├── script.js           # JavaScript for interactivity
└── README.md           # This file
```

## Usage

1. **Local Development**: Open `index.html` in any modern web browser
2. **Web Server**: For full functionality, serve the files through a web server (Apache, Nginx, etc.)
3. **Customization**: Edit the HTML, CSS, and JS files to customize content and styling

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Performance Notes

- Images are loaded from Unsplash for demonstration (replace with local images for production)
- CSS is optimized for fast rendering
- JavaScript is minified and efficient

## Customization Guide

### Changing Colors
Update the color variables in `styles.css`:

```css
:root {
    --primary-color: #7B1E1E;
    --secondary-color: #F5E6D3;
    --accent-color: #D4A017;
    --neutral-color: #2E2E2E;
    --background-color: #FFF9F2;
}
```

### Adding Menu Items
Add new menu items in the `#menu` section of `index.html`:

```html
<div class="menu-item">
    <img src="path/to/image.jpg" alt="Dish Name">
    <h4>Dish Name</h4>
    <p>Description of the dish</p>
</div>
```

### Updating Contact Information
Modify the contact details in the `#contact` section:

```html
<div class="contact-item">
    <h3>📞 Phone</h3>
    <p><a href="tel:YOUR_PHONE">YOUR_PHONE</a></p>
</div>
```

## SEO Optimization

- Meta tags are included for search engines
- Semantic HTML structure
- Alt text for all images
- Local business schema markup ready

## Troubleshooting

### Images Not Loading
- Check internet connection (images load from external sources)
- For production, replace with local image paths

### Navigation Not Working
- Ensure all section IDs match the navigation href attributes
- Check for JavaScript errors in browser console

### Mobile Responsiveness Issues
- Test on actual mobile devices
- Use browser dev tools to simulate mobile viewports

### Performance Issues
- Enable gzip compression on your web server
- Optimize images before uploading
- Minimize CSS and JavaScript files

## Deployment

1. Upload all files to your web hosting service
2. Ensure the server supports HTML, CSS, and JavaScript
3. Test all links and functionality
4. Update contact information and images as needed

## License

This website template is provided as-is for Richi Rich Restaurant. Commercial use requires permission.

## Contact

For customization requests or support:
- Restaurant: 080900 12545
- Address: B 2/18, Sector K, near IGNOU, Purania Chauraha, Aliganj, Lucknow, Uttar Pradesh 226024
