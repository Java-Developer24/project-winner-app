# 🎨 Spline 3D Scene Integration Guide

Complete guide for creating and integrating a premium Spline 3D scene into Aurora Reveal.

## 🎯 Overview

Spline is a 3D design tool that allows you to create interactive 3D experiences directly in the browser. Aurora Reveal uses Spline for the hero section on the home page.

## 🚀 Quick Setup

1. **Create Scene** at [spline.design](https://spline.design/)
2. **Design** following Aurora aesthetic guidelines below
3. **Export** as public scene
4. **Integrate** into `src/components/SplineHero.jsx`

---

## 📐 Design Guidelines

### Aurora Aesthetic Requirements

Your Spline scene should match the Aurora brand identity:

**Color Palette:**
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Deep Purple)
- Accent: `#f093fb` (Pink)
- Gold: `#FFD700`
- Rose: `#FF6B9D`

**Required Elements:**
1. **Floating Neon Particles** - Small glowing orbs
2. **Glass Portal or Orb** - Central focus element
3. **Soft Camera Drift** - Subtle movement
4. **Aurora Lighting** - Purple → Pink → Magenta gradient
5. **Subtle Fog** - Atmospheric depth

---

## 🎬 Step-by-Step Tutorial

### Step 1: Create New Spline Project

1. Go to [spline.design](https://spline.design/)
2. Sign up or log in
3. Click "Create New File"
4. Choose blank canvas

### Step 2: Set Up Scene

**Background:**
```
1. Select "Scene" in right panel
2. Background Color: #0a0a14 (dark space)
3. Enable Gradient: Yes
4. Gradient Direction: Vertical
5. Bottom Color: #1a0a2e (dark purple)
```

**Lighting:**
```
1. Delete default light
2. Add Directional Light
   - Color: #667eea
   - Intensity: 0.8
   - Position: (5, 10, 5)
3. Add Point Light
   - Color: #f093fb
   - Intensity: 1.5
   - Position: (-5, 5, 3)
4. Add Ambient Light
   - Color: #764ba2
   - Intensity: 0.3
```

### Step 3: Create Glass Portal

**Main Portal:**
```
1. Add Torus shape
2. Scale: (3, 3, 0.5)
3. Material:
   - Type: Glass
   - Color: #667eea
   - Transmission: 0.9
   - Roughness: 0.1
   - Metalness: 0.8
   - Emissive: #764ba2
   - Emissive Intensity: 0.5
4. Position: Center (0, 0, 0)
```

**Inner Glow:**
```
1. Add Sphere
2. Scale: (2, 2, 2)
3. Material:
   - Type: Basic
   - Color: #f093fb
   - Opacity: 0.3
   - Emissive: #f093fb
   - Emissive Intensity: 1.5
4. Add Bloom effect
5. Position: Inside portal
```

### Step 4: Add Floating Particles

**Create Particle System:**
```
1. Add Sphere (small)
2. Scale: (0.1, 0.1, 0.1)
3. Material:
   - Type: Basic
   - Color: #FFD700
   - Emissive: #FFD700
   - Emissive Intensity: 2.0
4. Duplicate 20-30 times
5. Distribute randomly around portal
6. Vary sizes (0.05 - 0.15)
7. Mix colors: #667eea, #f093fb, #FFD700
```

**Animate Particles:**
```
For each particle:
1. Select particle
2. Add State: "Floating"
3. Animate Position Y: +/- 1 unit
4. Duration: 3-5 seconds (vary per particle)
5. Easing: Ease In Out
6. Loop: Yes
7. Add slight rotation (optional)
```

### Step 5: Add Holographic Rings

**Outer Ring:**
```
1. Add Torus
2. Scale: (4, 4, 0.1)
3. Material:
   - Type: Glass
   - Color: #667eea
   - Transmission: 0.7
   - Emissive: #667eea
   - Emissive Intensity: 0.8
4. Rotate: 15° on X axis
5. Add continuous rotation animation
```

**Middle Ring:**
```
1. Duplicate outer ring
2. Scale: (3.2, 3.2, 0.1)
3. Change color to #764ba2
4. Rotate opposite direction
5. Offset animation timing
```

### Step 6: Camera Setup

**Camera Settings:**
```
1. Select Camera
2. Position: (0, 2, 8)
3. Look At: (0, 0, 0)
4. FOV: 45-50
5. Add subtle orbit animation:
   - Rotate around Y axis
   - 360° in 60 seconds
   - Easing: Linear
   - Loop: Yes
```

**Camera Drift:**
```
1. Add second animation state
2. Animate Position Y: +/- 0.5
3. Duration: 8 seconds
4. Easing: Ease In Out Sine
5. Loop: Yes
```

### Step 7: Add Fog/Atmosphere

**Fog:**
```
1. Scene Settings → Environment
2. Enable Fog: Yes
3. Fog Color: #1a0a2e
4. Fog Density: 0.15
5. Fog Near: 5
6. Fog Far: 20
```

**Volumetric Rays:**
```
1. Add Cylinder (thin, tall)
2. Scale: (0.05, 10, 0.05)
3. Material:
   - Type: Basic
   - Color: #ffffff
   - Opacity: 0.1
   - Add glow
4. Duplicate 8 times radially from center
5. Animate subtle pulsing opacity
```

### Step 8: Final Polish

**Bloom Effect:**
```
1. Scene Settings → Post Processing
2. Enable Bloom: Yes
3. Intensity: 0.5
4. Threshold: 0.7
5. Radius: 0.8
```

**Color Grading:**
```
1. Add slight purple tint
2. Increase contrast: +10%
3. Saturation: +15%
```

---

## 📤 Exporting Your Scene

### Step 1: Prepare for Export

1. **Test Animation**
   - Play scene to ensure all animations loop
   - Check no elements clipping
   - Verify camera movement smooth

2. **Optimize Performance**
   - Reduce polygon count if needed
   - Combine similar materials
   - Remove hidden objects
   - Check scene is < 5MB

### Step 2: Export Process

1. Click **File** → **Export** → **For Web**

2. **Export Settings:**
   ```
   - Format: Spline Scene (.splinecode)
   - Quality: High
   - Compression: Enabled
   - Include Animations: Yes
   ```

3. Click **"Make Public"** or **"Get Link"**

4. Copy the **Scene URL** (looks like):
   ```
   https://prod.spline.design/XXXXX-XXXXX/scene.splinecode
   ```

### Step 3: Integration

Open `src/components/SplineHero.jsx` and update:

```javascript
// Replace this line:
const SPLINE_SCENE_URL = 'https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode';

// With your actual URL:
const SPLINE_SCENE_URL = 'https://prod.spline.design/Abc123Xyz456/scene.splinecode';
```

Save file and refresh your browser!

---

## 🎨 Advanced Customization

### Interactive Elements

Add click interactions:
```
1. Select object
2. Add Event: "Mouse Click"
3. Trigger: Scale animation or color change
4. Duration: 0.3s
5. Return to original state
```

### Particle Effects

Create particle emitter:
```
1. Add small sphere
2. Set as invisible
3. Add "Clone" behavior
4. Emit rate: 5 per second
5. Lifetime: 3 seconds
6. Random velocity
7. Fade out over lifetime
```

### Dynamic Lighting

Animate light colors:
```
1. Select Point Light
2. Animate Color property
3. Keyframe: #667eea → #f093fb → #667eea
4. Duration: 10 seconds
5. Loop: Yes
```

---

## 🔧 Troubleshooting

### Scene Not Loading

**Problem:** Blank space where scene should be
**Solutions:**
- Verify URL is correct and public
- Check browser console for errors
- Ensure internet connection active
- Try different browser

### Performance Issues

**Problem:** Scene lags or stutters
**Solutions:**
- Reduce particle count
- Simplify geometry
- Lower material quality
- Disable bloom/post-processing
- Use fallback (automatic)

### Scene Too Large

**Problem:** Long load time
**Solutions:**
- Compress textures
- Reduce polygon count
- Remove unused materials
- Combine meshes
- Target < 5MB scene size

---

## 💡 Pro Tips

1. **Keep It Simple**: Less is more for web performance
2. **Test on Mobile**: Ensure scene works on lower-end devices
3. **Subtle Animations**: Avoid fast movements that distract
4. **Use Fallback**: Aurora includes CSS fallback automatically
5. **Match Brand**: Stick to Aurora color palette
6. **Optimize Early**: Start with low-poly models
7. **Preview Often**: Test in actual website frequently

---

## 📋 Checklist

Before finalizing your scene:

- [ ] All colors match Aurora palette
- [ ] Animations loop smoothly
- [ ] Camera movement is subtle (not distracting)
- [ ] Scene loads in < 3 seconds
- [ ] Works on mobile devices
- [ ] No elements extend beyond viewport
- [ ] All materials have correct properties
- [ ] Lighting creates proper mood
- [ ] Particles float naturally
- [ ] Glass/transparency effects work
- [ ] Scene is public/shared
- [ ] URL copied correctly
- [ ] Tested in Aurora Reveal app
- [ ] Performance acceptable (60fps target)
- [ ] Fallback works if 3D fails

---

## 🎓 Resources

**Spline Learning:**
- [Spline Documentation](https://docs.spline.design/)
- [Spline YouTube Channel](https://www.youtube.com/@spline3d)
- [Spline Community](https://community.spline.design/)

**Inspiration:**
- Search "aurora borealis 3D"
- Look for "glass morphism effects"
- Browse "holographic interfaces"

**Aurora Reveal Examples:**
- See fallback animation in `SplineHero.jsx`
- Check `ParallaxBackground.jsx` for color references
- Review `globals.css` for design tokens

---

## 🆘 Need Help?

1. **Spline Issues**: Contact [Spline Support](https://spline.design/support)
2. **Integration Issues**: Check `src/components/SplineHero.jsx` comments
3. **Performance Issues**: Enable reduced motion or use fallback
4. **General Questions**: Open GitHub issue

---

**Happy Designing! ✨**

The Aurora team looks forward to seeing your creative Spline scenes!
