# Website Deployment Guide

This website has two modes: **Development** (with admin panel) and **Production** (public website only).

## 🔧 Development Mode (Local Editing)

### Start Development Server
```bash
npm run dev
```

### Access Admin Panel
- **URL**: http://localhost:8888/#/admin
- **No password required**
- Edit all pages with real-time preview
- Changes saved locally on your computer

### Features Available Locally:
- ✅ Universal admin panel with visual editor
- ✅ Real-time preview with navigation sync
- ✅ Blog post creation and editing
- ✅ Image uploads and management
- ✅ Home page customization

## 🌐 Production Mode (Public Website)

### Build for Production
```bash
npm run publish-website
```

This command will:
1. **Remove admin panel** from the build (for security)
2. **Create production files** in `dist/` folder
3. **Keep only public pages**: home, blog, blog posts
4. **Exclude all admin functionality**

### Deploy to Web Hosting
1. Upload contents of `dist/` folder to your web host
2. Your website will be live **without admin access**
3. Visitors can browse but cannot edit content

## 🔒 Security

### Local (Development)
- Admin panel works at `localhost:8888/#/admin`
- Full editing capabilities
- Content stored on your computer

### Online (Production)
- **No admin panel accessible**
- No `/admin` routes exist
- Visitors cannot edit content
- Secure public website only

## 📝 Content Update Workflow

1. **Edit Locally**: Use admin panel at `localhost:8888/#/admin`
2. **Make Changes**: Edit blog posts, home page, upload images
3. **Build Production**: Run `npm run publish-website`
4. **Deploy**: Upload `dist/` folder contents to web host
5. **Repeat**: Make more changes locally, rebuild, redeploy

## 🚀 Hosting Options

Deploy the `dist/` folder to any static hosting service:
- **Netlify** (drag & drop the dist folder)
- **Vercel** (connect to GitHub repository)
- **GitHub Pages** (upload dist contents)
- **Traditional Web Hosting** (upload via FTP)

## ⚡ Quick Commands

```bash
# Development with admin panel
npm run dev

# Build public website (no admin)
npm run publish-website

# Regular build (includes admin - for local use)
npm run build
```

---

**Remember**: Always use `npm run publish-website` for production to ensure the admin panel is excluded for security!