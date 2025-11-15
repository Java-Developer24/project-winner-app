# 🎭 Aurora Reveal - Premium $200k+ Winner Reveal Experience

A **Hollywood-grade**, cinematic 3D winner reveal web application built with Next.js 15, React Three Fiber, Spline, and cutting-edge web technologies. Features shader-driven effects, GPU-accelerated particles, deterministic seeded RNG, and full accessibility support.

![Aurora Reveal](https://img.shields.io/badge/Premium-$200k+-purple?style=for-the-badge)
![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React Three Fiber](https://img.shields.io/badge/R3F-Enabled-blue?style=for-the-badge)
![Accessibility](https://img.shields.io/badge/a11y-AAA-green?style=for-the-badge)

---

## ✨ Premium Features

### 🎬 Cinematic Visuals
- **5-Layer Parallax Background**: Deep space stars, floating dust, fog noise, aurora waves, volumetric light streaks
- **Spline 3D Integration**: Floating neon particles, glass portals, soft camera drift, aurora lighting
- **Shader-Driven Effects**: Custom GLSL dissolve shader with noise threshold and edge glow
- **Holographic Assembly**: 12 shards flying in from different angles with spring physics
- **GPU-Accelerated Confetti**: 100+ particles with realistic physics simulation

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Backdrop blur, frosted glass effects throughout
- **Micro-Interactions**: Neon glow, light sweeps, spring scales, particle bursts on every button
- **3D Tilt Effects**: Mouse-tracked perspective transforms on modal
- **Animated Gradient Borders**: Multi-color flowing borders with background animation
- **Floating Particles**: Internal ambient particles for depth

### 🎯 Technical Excellence
- **Deterministic Seeded RNG**: Reproducible winner selection using mulberry32 algorithm
- **Sound Design**: Howler.js integration with ambient hum, whoosh, pop, reveal, confetti layers
- **Lottie Animations**: Smooth vector animations for loading states
- **Performance Optimized**: Lazy loading, DRACO compression, pixelRatio capping, proper disposal
- **Accessibility First**: Focus trap, ARIA labels, keyboard navigation, reduced-motion support

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd aurora-reveal

# Install dependencies (recommended: use bun for faster installs)
bun install
# or
npm install

# Run development server
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
aurora-reveal/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home page
│   │   ├── reveal/
│   │   │   └── page.tsx                # Reveal page
│   │   ├── layout.tsx                  # Root layout
│   │   └── globals.css                 # Global styles with design tokens
│   ├── components/
│   │   ├── HomeHero.jsx                # Landing page hero
│   │   ├── RevealExperience.jsx        # Reveal wrapper
│   │   ├── RevealShell.jsx             # Main reveal orchestrator
│   │   ├── __define-ocg__ RevealStarter.jsx  # Premium reveal entry point
│   │   ├── WinnerModal.jsx             # Accessible winner modal
│   │   ├── PremiumButton.jsx           # Button with micro-interactions
│   │   ├── ParallaxBackground.jsx      # 5-layer parallax system
│   │   ├── SplineHero.jsx              # Spline 3D scene integration
│   │   ├── LoaderLottie.jsx            # Lottie loading animation
│   │   ├── MuteToggle.jsx              # Sound control
│   │   ├── 3d/
│   │   │   ├── TicketAssembler.jsx     # Shard assembly with shaders
│   │   │   ├── PrizePedestal.jsx       # Rotating prize display
│   │   │   ├── ConfettiGPU.jsx         # GPU particle system
│   │   │   └── CameraRig.jsx           # Cinematic camera choreography
│   │   └── shaders/
│   │       └── DissolveShader.js       # Custom GLSL dissolve effect
│   ├── hooks/
│   │   ├── useSeededPick.js            # Deterministic winner selection
│   │   ├── useSound.js                 # Howler sound management
│   │   ├── useReducedMotion.js         # Accessibility hook
│   │   ├── useFocusTrap.js             # Modal focus management
│   │   └── useGLTFLazy.js              # Lazy 3D asset loading
│   ├── lib/
│   │   └── utils/
│   │       └── seededRng.js            # Mulberry32 RNG implementation
│   └── data/
│       ├── prizes.json                 # Prize pool configuration
│       └── colors.json                 # Color palette
├── public/
│   └── sounds/                         # Audio files (see Sound Setup below)
├── DEPLOYMENT.md                       # Deployment instructions
├── SPLINE_GUIDE.md                     # Spline scene integration guide
├── TESTING_CHECKLIST.md                # QA testing guide
└── README.md                           # This file
```

---

## 🎵 Sound Setup

To enable premium sound design, add these audio files to `public/sounds/`:

```
public/sounds/
├── ambient-hum.mp3       # Soft background atmosphere
├── whoosh.mp3            # Transition swoosh
├── assemble.mp3          # Shard assembly sound
├── pop.mp3               # Lock/snap sound
├── reveal.mp3            # Prize reveal fanfare
└── confetti.mp3          # Celebration burst
```

**Recommended sources for royalty-free sounds:**
- [Freesound.org](https://freesound.org/)
- [Mixkit](https://mixkit.co/free-sound-effects/)
- [Zapsplat](https://www.zapsplat.com/)

The app works without sound files - they're gracefully handled as optional enhancements.

---

## 🎨 Spline 3D Scene Integration

### Creating Your Spline Scene

1. Visit [spline.design](https://spline.design/) and create a free account
2. Create a new project
3. Build your scene with:
   - Floating neon particles (use emitters)
   - Glass portal or glowing orb (use glass material with bloom)
   - Soft camera drift (animate camera with slow ease)
   - Purple → Pink → Magenta gradient lighting

4. Export your scene:
   - Click "Export" → "Code Export"
   - Select "Public" option
   - Copy the generated URL (format: `https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode`)

5. Update the scene URL in your code:

```jsx
// src/components/SplineHero.jsx
const SPLINE_SCENE_URL = 'https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode';
```

**See [SPLINE_GUIDE.md](./SPLINE_GUIDE.md) for detailed instructions and examples.**

---

## 🎯 Deterministic Winner Selection

The app uses a **seeded pseudorandom number generator (mulberry32)** for reproducible winner selection:

```javascript
// Generate seed from date + event ID
const seed = `aurora-${new Date().toDateString()}`;

// Same seed = same winner every time
const { winner, prize } = useSeededPick(seed);
```

**To customize the seed:**
```jsx
// src/components/RevealExperience.jsx
const seed = `your-event-id-${new Date().toDateString()}`;
```

This ensures:
- ✅ Same winner for same day
- ✅ Verifiable fairness
- ✅ No backend required
- ✅ Reproducible results for auditing

---

## ♿ Accessibility Features

- **Keyboard Navigation**: Full tab support, Enter/Escape to interact
- **Focus Trap**: Modal captures focus until closed
- **ARIA Labels**: Proper roles, labels, and descriptions
- **Reduced Motion**: Respects `prefers-reduced-motion` - shows simplified CSS-only experience
- **Screen Reader Support**: Semantic HTML, descriptive text
- **High Contrast**: Color combinations meet WCAG AAA standards

**Test with:**
```bash
# Enable reduced motion in browser DevTools
# Chrome: DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion
```

---

## 🚀 Performance Optimizations

- **Lazy Loading**: 3D assets load on-demand
- **DRACO Compression**: GLB files compressed for faster loading (simulated with procedural geometry)
- **PixelRatio Capping**: `Math.min(devicePixelRatio, 1.5)` prevents over-rendering
- **Material Disposal**: Proper cleanup on unmount to prevent memory leaks
- **Code Splitting**: Route-based splitting with Next.js
- **GPU Acceleration**: InstancedMesh for confetti, CSS transforms for animations

---

## 🎨 Customization

### Update Prizes

Edit `src/data/prizes.json`:

```json
{
  "prizes": [
    {
      "id": "your-prize-id",
      "name": "Prize Name",
      "description": "Prize description",
      "value": "$1,000",
      "emoji": "🎁",
      "rarity": "legendary",
      "color": "#FFD700"
    }
  ]
}
```

### Update Colors

Edit `src/data/colors.json` and `src/app/globals.css`:

```css
:root {
  --aurora-gradient-start: #667eea;
  --aurora-gradient-mid: #764ba2;
  --aurora-gradient-end: #f093fb;
}
```

### Customize Animations

Adjust timing in `src/components/RevealShell.jsx`:

```javascript
// Change assembly duration
const interval = setInterval(() => {
  progress += 0.015; // Lower = slower
  // ...
}, 16);

// Change stage delays
setTimeout(() => setStage('reveal'), 2000); // milliseconds
```

---

## 🧪 Testing

**See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for comprehensive QA guide.**

Quick tests:
```bash
# Run in different browsers
npm run dev

# Test accessibility
# Use Lighthouse in Chrome DevTools

# Test reduced motion
# Enable in browser settings and reload

# Test sound
# Click mute toggle in top-right
```

---

## 📦 Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm start

# Production bundle will be in .next/ directory
```

---

## 🚢 Deployment

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.**

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4 + Custom CSS
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Three.js + Drei
- **3D Scenes**: Spline (optional)
- **Postprocessing**: @react-three/postprocessing (Bloom, DOF)
- **Sound**: Howler.js
- **Vector Animations**: Lottie Web
- **RNG**: Custom mulberry32 implementation
- **Icons**: Lucide React
- **Package Manager**: Bun (or npm/yarn)

---

## 📝 License

MIT License - feel free to use for personal or commercial projects.

---

## 🙏 Credits

- **Design System**: Aurora gradient design with glassmorphism
- **3D Integration**: Spline for cinematic scenes
- **Sound Design**: Community sound effects (see Sound Setup)
- **Fonts**: Google Fonts (Inter + Space Grotesk)

---

## 🐛 Troubleshooting

### Spline Scene Not Loading
- Verify scene URL is correct and public
- Check browser console for errors
- Fallback animation will show automatically

### Sounds Not Playing
- Ensure files exist in `public/sounds/`
- Check file names match exactly
- Verify browser autoplay policies (user interaction required)

### Performance Issues
- Reduce particle count in `ConfettiGPU.jsx`
- Disable postprocessing effects
- Enable reduced motion mode

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

---

## 📞 Support

For issues, questions, or feature requests, please open an issue in the repository.

---

**Built with 💜 by the Aurora Team**

*Experience the future of winner reveals.*