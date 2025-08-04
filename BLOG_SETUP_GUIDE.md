# Blog Setup & Deployment Guide

This guide will help you deploy your blog to Netlify. The blog system is built entirely within your existing website folder and requires no external database.

## Blog Features

- **Simple JSON-based storage** - No database needed
- **Easy admin interface** - Edit articles through a user-friendly UI at `/admin`
- **Responsive design** - Works perfectly on all devices
- **SEO optimized** - Each article has proper meta tags
- **Categories & tags** - Organize your content
- **Search functionality** - Find articles quickly

## Deployment Steps

### 1. Prepare Your Repository

First, make sure all files are committed to GitHub:

```bash
git add .
git commit -m "Add blog functionality"
git push origin main
```

### 2. Deploy to Netlify

1. **Login to Netlify**: Go to [https://app.netlify.com](https://app.netlify.com)

2. **Import from Git**: 
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your repository

3. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - Click "Deploy site"

### 3. Configure Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow the instructions to point your domain to Netlify

## Managing Blog Content

### Accessing the Admin Panel

1. Go to `https://yourdomain.com/admin` (or `https://yoursite.netlify.app/admin`)
2. You'll see a simple interface to manage articles

### Creating/Editing Articles

1. **Create New Article**:
   - Click "New Article" button
   - Fill in the title, excerpt, and content
   - Content supports HTML tags for formatting
   - Select category and add tags
   - Choose "Published" to make it live

2. **Edit Existing Articles**:
   - Click on any article in the list
   - Make your changes
   - Click "Update Article"

3. **Save Your Changes**:
   - After making changes, click "Copy Data" or "Export Data"
   - Copy the JSON data
   - Update `src/data/articles.json` with the new data
   - Commit and push to GitHub
   - Netlify will automatically rebuild your site

### Content Formatting

Use HTML tags in the content field:
- `<h2>Heading</h2>` - Section headings
- `<p>Paragraph text</p>` - Regular paragraphs
- `<ul><li>Item</li></ul>` - Bullet lists
- `<ol><li>Item</li></ol>` - Numbered lists
- `<strong>Bold text</strong>` - Bold emphasis
- `<em>Italic text</em>` - Italic emphasis

### Example Article Content

```html
<h2>Introduction</h2>
<p>This is the introduction paragraph of your article.</p>

<h2>Main Points</h2>
<ul>
  <li>First important point</li>
  <li>Second important point</li>
  <li>Third important point</li>
</ul>

<h2>Conclusion</h2>
<p>Your concluding thoughts go here.</p>
```

## Updating Articles in Production

Since we're using a JSON file for storage, updating articles requires:

1. Make changes in the admin panel at `/admin`
2. Click "Copy Data" button
3. Open `src/data/articles.json` in your code editor
4. Replace the content with the copied data
5. Commit and push to GitHub:
   ```bash
   git add src/data/articles.json
   git commit -m "Update blog articles"
   git push origin main
   ```
6. Netlify will automatically rebuild and deploy

## Adding Images

1. **Using existing images**: Reference images already in `public/lovable-uploads/`
   - Example: `/lovable-uploads/78edbdfc-906b-4b3f-b44f-5bcedbf2144c.png`

2. **Adding new images**:
   - Add images to `public/uploads/` folder
   - Reference them as `/uploads/your-image.jpg`
   - Commit and push the images with your updates

## Future Enhancements

If you want a more advanced system later, you can:

1. **Add Netlify CMS**: For a more sophisticated content management system
2. **Use Supabase**: For a real database with authentication
3. **Add Comments**: Using services like Disqus or Utterances
4. **Add Newsletter**: Integration with ConvertKit or Mailchimp

## Troubleshooting

### Site not updating after changes
- Make sure you committed and pushed all changes to GitHub
- Check Netlify dashboard for build errors
- Clear your browser cache

### Images not showing
- Verify image paths start with `/`
- Check that images are in the `public` folder
- Ensure images are committed to GitHub

### Admin panel not saving
- Remember to copy the data and update `src/data/articles.json`
- The admin panel only prepares the data - you need to manually update the JSON file

## Support

For issues or questions:
1. Check the Netlify build logs
2. Verify all files are properly committed
3. Test locally with `npm run dev` before deploying

## Security Note

Since this is a simple JSON-based system, there's no authentication on the admin panel. For production use, consider:
1. Not linking to `/admin` publicly
2. Using a more obscure admin URL
3. Implementing proper authentication with Netlify Identity or Auth0