# 🚢 Aurora Reveal - Deployment Guide

Complete deployment instructions for hosting your premium $200k+ winner reveal experience.

---

## 🌐 Deployment Platforms

### ✅ Vercel (Recommended)

Vercel is the recommended platform for Next.js applications - created by the Next.js team.

**Benefits:**
- Zero-config deployment
- Automatic HTTPS
- CDN distribution
- Instant previews for PRs
- Free hobby tier

**Deploy Steps:**

```bash
# Method 1: Deploy via CLI
npm i -g vercel
vercel login
vercel --prod

# Method 2: Deploy via GitHub
# 1. Push code to GitHub
git push origin main

# 2. Visit https://vercel.com/new
# 3. Import your repository
# 4. Click "Deploy"
```

**Environment Variables:**
```bash
# Optional: Add via Vercel dashboard
# Settings → Environment Variables
NEXT_PUBLIC_SPLINE_SCENE_URL=https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode
```

---

### ✅ Netlify

**Benefits:**
- Great CDN
- Easy rollbacks
- Split testing
- Form handling
- Free tier available

**Deploy Steps:**

```bash
# Method 1: Deploy via CLI
npm i -g netlify-cli
netlify login
netlify init

# Build the app
npm run build

# Deploy
netlify deploy --prod

# Method 2: Deploy via Git
# 1. Push to GitHub
git push origin main

# 2. Visit https://app.netlify.com/start
# 3. Connect repository
# 4. Configure build settings:
#    - Build command: npm run build
#    - Publish directory: .next
# 5. Deploy
```

**netlify.toml Configuration:**

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

### ✅ AWS Amplify

**Deploy Steps:**

1. Push code to GitHub
2. Visit AWS Amplify Console
3. Connect repository
4. Configure build:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
5. Deploy

---

## 🔧 Pre-Deployment Checklist

### Required Steps

- [ ] **Test Production Build Locally**
  ```bash
  npm run build
  npm start
  # Visit http://localhost:3000 and test all features
  ```

- [ ] **Optimize Assets**
  - [ ] Compress images (use WebP/AVIF)
  - [ ] Add sound files to `public/sounds/` (or remove sound hooks)
  - [ ] Test with Lighthouse (aim for 90+ scores)

- [ ] **Configure Spline Scene**
  - [ ] Create and publish Spline scene
  - [ ] Update `SPLINE_SCENE_URL` in `src/components/SplineHero.jsx`
  - [ ] Test scene loads correctly

- [ ] **Update Prize Data**
  - [ ] Edit `src/data/prizes.json` with real prizes
  - [ ] Verify all emojis display correctly
  - [ ] Test deterministic winner selection

- [ ] **Test Accessibility**
  - [ ] Keyboard navigation works
  - [ ] Reduced motion mode works
  - [ ] ARIA labels are correct
  - [ ] Focus trap works in modal

- [ ] **Performance Check**
  - [ ] Test on slow 3G network
  - [ ] Test on mobile devices
  - [ ] Verify lazy loading works
  - [ ] Check memory leaks (Chrome DevTools → Performance Monitor)

### Optional Enhancements

- [ ] **Custom Domain**
  - Configure in platform settings
  - Add DNS records

- [ ] **Analytics**
  - Add Google Analytics or Plausible
  - Track reveal completions

- [ ] **SEO Optimization**
  - Update meta tags in `src/app/layout.tsx`
  - Add Open Graph images
  - Create sitemap

---

## 🔒 Security Best Practices

```javascript
// next.config.ts - Add security headers
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  }
};
```

---

## 📊 Monitoring & Analytics

### Vercel Analytics

```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to layout
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking (Sentry)

```bash
# Install Sentry
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard -i nextjs

# Configure in sentry.client.config.js
```

---

## 🔄 Continuous Deployment

### GitHub Actions (for other platforms)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🐛 Common Deployment Issues

### Build Fails

```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### 404 on Page Refresh

**Vercel/Netlify**: Should work automatically

**Other platforms**: Configure rewrites:
```javascript
// next.config.ts
module.exports = {
  trailingSlash: true,
};
```

### Sound Files Not Loading

Ensure files are in `public/sounds/` and paths are correct:
```javascript
// Correct
const audio = new Howl({ src: ['/sounds/whoosh.mp3'] });

// Incorrect
const audio = new Howl({ src: ['sounds/whoosh.mp3'] });
```

### Spline Scene Not Loading

1. Verify scene URL is public
2. Check CORS settings
3. Test scene URL directly in browser
4. Fallback will show automatically if scene fails

---

## 📈 Performance Monitoring

### Key Metrics to Track

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### Tools

- Google Lighthouse
- WebPageTest
- Vercel Analytics
- Chrome DevTools Performance tab

---

## 🎯 Post-Deployment Testing

```bash
# Test checklist after deployment

✓ Home page loads
✓ Reveal page works
✓ Assembly animation plays
✓ Winner modal opens
✓ Sound toggle works
✓ Mobile responsive
✓ Keyboard navigation works
✓ Reduced motion mode works
✓ Different browsers (Chrome, Firefox, Safari, Edge)
✓ Different devices (Desktop, Tablet, Mobile)
```

---

## 🔄 Rollback Procedure

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback <deployment-url>
```

### Netlify
1. Go to Netlify dashboard
2. Click "Deploys"
3. Find previous successful deploy
4. Click "Publish deploy"

---

## 📞 Support

If you encounter issues during deployment:

1. Check build logs for errors
2. Verify all dependencies are installed
3. Test production build locally first
4. Check platform-specific documentation
5. Open an issue in the repository

---

**Deployment Ready! 🚀**

Your premium Aurora Reveal experience is now live and accessible worldwide.