# Deployment

<cite>
**Referenced Files in This Document **   
- [package.json](file://package.json)
- [vite.config.ts](file://vite.config.ts)
- [README.md](file://README.md)
- [public/_headers](file://public/_headers)
- [index.html](file://index.html)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Build Process with Vite](#build-process-with-vite)
3. [Hosting Options](#hosting-options)
   - [Vercel](#vercel)
   - [Netlify](#netlify)
   - [GitHub Pages](#github-pages)
   - [AWS S3](#aws-s3)
4. [Security Headers Configuration](#security-headers-configuration)
5. [CI/CD Integration](#cicd-integration)
6. [Environment-Specific Configurations](#environment-specific-configurations)
7. [Post-Deployment Verification and Monitoring](#post-deployment-verification-and-monitoring)
8. [Advanced Deployment Strategies](#advanced-deployment-strategies)
9. [Conclusion](#conclusion)

## Introduction
This document provides a comprehensive guide for deploying the `farruh-folio-wave` portfolio website to production environments. The application is built using React, TypeScript, and Tailwind CSS, with Vite as the build tool. It follows modern best practices for performance, security, and maintainability.

The deployment process involves generating optimized static assets via Vite’s production pipeline, configuring security headers, selecting appropriate hosting platforms, and optionally automating the workflow through CI/CD systems. This guide covers all aspects from basic drag-and-drop deployments to advanced zero-downtime strategies suitable for expert users.

**Section sources**
- [README.md](file://README.md#L1-L145)

## Build Process with Vite
To prepare the application for production, use the `npm run build` command defined in the `package.json`. This triggers Vite's production build process, which performs several optimizations:

- Minifies JavaScript and CSS using esbuild (default minifier)
- Removes source maps in production mode to avoid `eval()` usage
- Resolves aliases such as `@` pointing to the `src` directory
- Outputs static files into the `dist/` folder ready for deployment

The base path is set to `'/'` in `vite.config.ts`, making it suitable for root domain or GitHub Pages deployments. For custom paths (e.g., `username.github.io/repo-name`), adjust the `base` field accordingly.

```json
"scripts": {
  "build": "vite build",
  "build:dev": "vite build --mode development",
  "build:gh-pages": "NODE_ENV=production vite build"
}
```

After running `npm run build`, the `dist/` directory will contain all necessary HTML, CSS, JS, and asset files.

**Section sources**
- [package.json](file://package.json#L6-L10)
- [vite.config.ts](file://vite.config.ts#L1-L27)

## Hosting Options

### Vercel
Vercel offers seamless integration with Vite-based projects. Deploy using the Vercel CLI:

```bash
vercel --prod
```

Vercel automatically detects the Vite configuration and optimizes the deployment. No additional setup is required beyond linking your project to a Vercel account. Environment variables can be configured via the dashboard.

For projects hosted on GitHub, enabling automatic Git integration allows continuous deployment on every push to the main branch.

**Section sources**
- [README.md](file://README.md#L92)

### Netlify
Netlify supports direct drag-and-drop deployment of the `dist/` folder. Alternatively, connect your repository for automated builds.

When building directly on Netlify, ensure the build settings are:
- **Build command**: `npm run build`
- **Publish directory**: `dist`

Netlify reads the `public/_headers` file to apply security headers automatically. Ensure this file exists and contains proper CSP, X-Frame-Options, and other directives.

**Section sources**
- [README.md](file://README.md#L93)

### GitHub Pages
Deploying to GitHub Pages requires either manual upload of the `dist/` folder or automation via GitHub Actions.

Use the `build:gh-pages` script when deploying:
```bash
npm run build:gh-pages
```

This sets `NODE_ENV=production` and ensures correct environment handling during the build.

A typical GitHub Actions workflow would:
1. Checkout code
2. Install dependencies
3. Run `npm run build`
4. Deploy `dist/` to the `gh-pages` branch using `peaceiris/actions-gh-pages`

Ensure the `base` in `vite.config.ts` matches the repository name if not using a custom domain.

**Section sources**
- [README.md](file://README.md#L94)
- [package.json](file://package.json#L8-L9)

### AWS S3
Amazon S3 can host static websites by uploading the contents of the `dist/` folder to a bucket.

Steps:
1. Create an S3 bucket with the same name as your domain (if using Route 53)
2. Enable static website hosting in the bucket properties
3. Upload all files from `dist/` using AWS CLI:
   ```bash
   aws s3 sync dist/ s3://your-domain.com --delete
   ```
4. Set appropriate bucket policies for public read access
5. Optionally integrate with CloudFront for HTTPS and global CDN distribution

Security headers must be handled via CloudFront Lambda@Edge or by using S3 Object Lambda if needed.

**Section sources**
- [README.md](file://README.md#L95)

## Security Headers Configuration
The project includes a `public/_headers` file intended for Netlify and Vercel to enforce critical security policies. Although the file was not found in the current workspace, its expected content based on the README includes:

- **Content Security Policy (CSP)**: Prevents XSS attacks by restricting script sources
- **X-Frame-Options**: Blocks clickjacking attempts
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **Referrer-Policy**: Controls referrer information leakage
- **Permissions-Policy**: Restricts browser feature access

Example `_headers` content:
```
/
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

These headers are crucial for protecting against common web vulnerabilities and should be replicated on any platform that doesn't support `_headers` natively (e.g., S3 + CloudFront).

**Section sources**
- [README.md](file://README.md#L96-L104)

## CI/CD Integration
Automate deployments using GitHub Actions or similar platforms. Below is an example `.github/workflows/deploy.yml` for deploying to GitHub Pages:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build:gh-pages

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

For Vercel or Netlify, enable Git-triggered builds in their dashboards instead of managing workflows manually.

**Section sources**
- [README.md](file://README.md#L94)

## Environment-Specific Configurations
Customize behavior per environment using the following approaches:

- **Base URL**: Modify `base` in `vite.config.ts` for subdirectory deployments (e.g., `/farruh-folio-wave/`)
- **Asset Paths**: All assets are relative; no changes needed unless using CDNs
- **Cache Invalidation**: Leverage Vite’s content-hash filenames (`assets/*.hash.js`) for long-term caching
- **Meta Tags**: Update `title`, `description`, and Open Graph tags in `index.html` for SEO

Avoid hardcoding URLs—use environment-aware patterns so the site works locally, in preview, and in production.

**Section sources**
- [vite.config.ts](file://vite.config.ts#L5-L7)
- [index.html](file://index.html#L1-L50)

## Post-Deployment Verification and Monitoring
After deployment, verify functionality and performance:

1. **Accessibility Check**: Use Lighthouse (target score >95)
2. **Mobile Responsiveness**: Test across devices and orientations
3. **Link Validation**: Confirm all navigation and external links work
4. **Form Behavior**: If contact form is enabled, test submission flow
5. **Security Headers**: Validate headers using [securityheaders.com](https://securityheaders.com)
6. **Performance Monitoring**: Track load times and CLS using Google Search Console
7. **Uptime Monitoring**: Use tools like UptimeRobot or BetterStack

Regularly audit third-party scripts and dependencies for vulnerabilities.

**Section sources**
- [README.md](file://README.md#L118-L125)

## Advanced Deployment Strategies
For experienced developers, consider these enhancements:

- **Edge Caching**: Use Cloudflare Workers or Vercel Edge Functions to serve cached versions globally
- **CDN Integration**: Pair S3 with CloudFront or use Vercel/Netlify’s built-in CDNs
- **Zero-Downtime Deploys**: Implement blue-green deployments via routing switches
- **Preview Deployments**: Enable PR previews on Vercel/Netlify for staging feedback
- **Custom Domains**: Configure SSL certificates and DNS records for branded URLs
- **Bundle Analysis**: Use `rollup-plugin-visualizer` to inspect output size and optimize

These strategies improve reliability, speed, and user experience at scale.

**Section sources**
- [README.md](file://README.md#L92-L95)

## Conclusion
Deploying `farruh-folio-wave` is straightforward thanks to its static nature and Vite-powered build system. Whether you're a beginner using drag-and-drop methods or an expert implementing CI/CD pipelines, the framework supports flexible, secure, and performant deployments across major hosting platforms.

By leveraging security headers, proper caching, and automated workflows, you can ensure a robust online presence that reflects professional standards. Always refer to the latest `README.md` for updates and consult platform-specific documentation for edge cases.