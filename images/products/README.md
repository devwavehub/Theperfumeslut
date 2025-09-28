# Product Images Folder

This folder is created for local image storage if needed, but the admin panel uses Supabase Storage for image management.

## How Images Work

1. **Upload through Admin Panel**: Images are uploaded directly through the admin interface
2. **Stored in Supabase**: Images are securely stored in Supabase Storage
3. **Automatic URLs**: Each image gets a public URL that's saved with the product
4. **CDN Delivery**: Images are served through Supabase's CDN for fast loading

## Image Requirements

- **Formats**: JPG, PNG, WebP
- **Size**: Maximum 5MB per image
- **Dimensions**: Recommended 400x400px or larger
- **Quality**: High resolution for best display

## Backup

While images are stored in Supabase, you can also keep local copies in this folder for backup purposes if desired.
