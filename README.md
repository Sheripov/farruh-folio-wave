# Farruh Sheripov - Portfolio Website

A modern, responsive portfolio website built with Vue 3, TypeScript, and Tailwind CSS, showcasing my experience as a Senior Python Developer and Cloud Architect.

## 🚀 Features

- **Modern Dark Theme**: Elegant dark design with soft color accents
- **Responsive Design**: Optimized for all devices and screen sizes
- **Interactive Elements**: Smooth animations, hover effects, and tilt interactions
- **Performance Optimized**: Fast loading with optimized assets and smooth scrolling
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **Frontend**: Vue 3, TypeScript, Composition API
- **Styling**: Tailwind CSS, HeadlessUI Vue components
- **Build Tool**: Vite
- **Icons**: Lucide Vue Next
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Data Fetching**: TanStack Vue Query
- **Animations**: CSS animations with hardware acceleration

## 📱 Sections

- **Hero**: Professional introduction with call-to-action buttons
- **About**: Personal information, languages, and interests
- **Experience**: Professional work history with detailed descriptions
- **Projects**: Showcase of key projects with technologies used
- **Skills**: Technical skills organized by categories
- **Strengths**: Core professional strengths and values
- **Education**: Academic background and key subjects
- **Contact**: Contact form and professional contact information

## 🎨 Design Features

- **Gradient Backgrounds**: Soft, multi-layered gradients throughout
- **Glass Morphism**: Backdrop blur effects for modern aesthetics
- **Interactive Cards**: Tilt effects and hover animations
- **Color-Coded Sections**: Each section has its unique color scheme
- **Smooth Scrolling**: Custom smooth scroll implementation
- **Professional Typography**: Clean, readable fonts with proper hierarchy

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/farruh-sheripov/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📄 Resume

The portfolio includes a downloadable resume. Replace the placeholder PDF in `public/farruh-sheripov-cv.pdf` with your actual resume.

## 📧 Contact Form

The contact form uses a mailto link to open the user's default email client with pre-filled information. For a production deployment, consider integrating with services like:

- Formspree
- Netlify Forms
- EmailJS
- Custom backend API

## 🌐 Deployment

This project can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder (includes `_headers` for CSP)
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload the `dist` folder to an S3 bucket

### Security Headers

The project includes security headers in `public/_headers` for Netlify/Vercel:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

## 📝 Customization

To customize this portfolio for your own use:

1. Update personal information in all components
2. Replace the resume PDF file
3. Update project information in Vue components
4. Modify the color scheme in Tailwind classes
5. Update meta tags in `index.html`
6. Add your own project images

## 🔧 Performance & Security

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: Optimized with code splitting
- **Images**: Optimized formats and lazy loading
- **CSS**: Purged unused styles in production
- **JavaScript**: Minified and compressed with esbuild
- **Content Security Policy**: Strict CSP headers for security
- **No eval()**: Production build avoids unsafe JavaScript evaluation

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

---

**Built with ❤️ by Farruh Sheripov**
