# Deployment Guide for Smaran Foundation Website

## Building for Production

1. **Clean previous build:**

   ```bash
   npm run clean
   ```

2. **Build the application:**

   ```bash
   npm run build:prod
   ```

3. **Preview the build locally:**
   ```bash
   npm run preview
   ```

## Deploying to Hostinger

### Step 1: Build the Application

Run the build command to generate the `dist` folder:

```bash
npm run build:prod
```

### Step 2: Upload to Hostinger

1. Compress the entire `dist` folder contents (not the folder itself)
2. Upload all files from the `dist` folder to your domain's public_html directory
3. Ensure the following structure on your server:
   ```
   public_html/
   ├── index.html
   ├── assets/
   │   ├── logo.png
   │   ├── logo-with-name-at-bottom.png
   │   ├── [other asset files]
   │   └── [compiled CSS/JS files]
   ├── .htaccess
   └── _redirects
   ```

### Step 3: Configure Server (if needed)

The `.htaccess` file is included for Apache servers (most shared hosting) and handles:

- Single Page Application (SPA) routing
- Asset caching
- Gzip compression

### Step 4: Verify Deployment

1. Visit your domain
2. Test navigation between pages
3. Check that all images and assets load correctly
4. Verify the favicon appears in the browser tab

## Important Notes

- **Base Path**: The app is configured with `base: "./"` for relative paths
- **Assets**: All assets are properly bundled and will be available in the `assets/` directory
- **Routing**: Client-side routing is handled by the `.htaccess` file
- **Caching**: Static assets are cached for 1 year for better performance

## Troubleshooting

### If images don't load:

- Check that the `assets/` folder was uploaded correctly
- Verify file permissions (755 for directories, 644 for files)

### If routing doesn't work:

- Ensure `.htaccess` file is uploaded and mod_rewrite is enabled
- Check that the server supports URL rewriting

### If the site doesn't load:

- Verify `index.html` is in the root directory
- Check browser console for any errors
- Ensure all files were uploaded correctly

## File Structure After Build

````
dist/
├── index.html              # Main HTML file
├── assets/                 # All static assets
│   ├── logo.png           # Favicon and logo
│   ├── logo-with-name-at-bottom.png
│   ├── [other images]     # All images from public/assets
│   ├── index-[hash].css   # Compiled CSS
│   └── index-[hash].js    # Compiled JavaScript
├── .htaccess              # Apache configuration
└── _redirects             # Netlify redirects (backup)
```it
````
