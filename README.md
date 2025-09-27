# Luxury Perfumes Admin Panel

A comprehensive admin panel for managing your luxury perfume e-commerce website with Supabase integration.

## 🚀 Features

- **Simple Password Authentication** - Single password access to admin panel
- **Dashboard Overview** - Quick stats and insights
- **Category Management** - Add, edit, and delete product categories
- **Product Management** - Full CRUD operations for products
- **Image Upload** - Secure image storage with Supabase
- **Real-time Updates** - Changes reflect immediately on the website
- **Responsive Design** - Works perfectly on all devices

## 📋 Prerequisites

Before setting up the admin panel, you'll need:

1. A Supabase account (free tier available)
2. Basic understanding of web hosting
3. Access to your website files

## 🔧 Setup Instructions

### Step 1: Supabase Setup

1. **Create a Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account
   - Create a new project

2. **Get Your Credentials**
   - In your Supabase dashboard, go to Settings → API
   - Copy your `Project URL` and `anon public` key
   - You'll need these for the next step

3. **Run Database Migration**
   - In your Supabase dashboard, go to SQL Editor
   - Copy the contents of `supabase/migrations/create_admin_tables.sql`
   - Paste and run the SQL to create your database tables

4. **Set Up Storage**
   - Go to Storage in your Supabase dashboard
   - Create a new bucket called `product-images`
   - Make it public by going to bucket settings
   - Set the following policies:
     ```sql
     -- Allow public read access
     CREATE POLICY "Public read access" ON storage.objects
     FOR SELECT TO public
     USING (bucket_id = 'product-images');
     
     -- Allow authenticated uploads
     CREATE POLICY "Authenticated upload access" ON storage.objects
     FOR INSERT TO authenticated
     WITH CHECK (bucket_id = 'product-images');
     ```

### Step 2: Configure Your Website

1. **Update Supabase Configuration**
   - Open `js/supabase.js`
   - Replace `YOUR_SUPABASE_URL` with your Project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your anon public key

2. **Upload Files**
   - Upload all the new files to your web server
   - Ensure the folder structure is maintained

### Step 3: Test the Setup

1. **Access Admin Panel**
   - Go to `your-website.com/admin-login.html`
   - Use password: `admin123`
   - You should see the dashboard

2. **Test Functionality**
   - Add a test category
   - Add a test product with an image
   - Check that it appears on your main website

## 🎯 How to Use the Admin Panel

### Login
- Navigate to `/admin-login.html`
- Enter password: `admin123`
- Click Login

### Dashboard
- View quick statistics
- Access all admin functions
- Monitor your store's performance

### Managing Categories
1. Click "Categories" in the sidebar
2. Click "Add Category" to create new categories
3. Use Edit/Delete buttons to modify existing categories
4. Categories will appear in your website's navigation

### Managing Products
1. Click "Products" in the sidebar
2. Click "Add Product" to create new products
3. Fill in all product details:
   - **Name**: Product title
   - **Description**: Product description
   - **Price**: Price in Naira (₦)
   - **Category**: Select from your categories
   - **Stock Status**: In Stock or Sold Out
   - **Image**: Upload product image

4. Click "Save Product"
5. Products appear immediately on your website

### Image Management
- Images are automatically uploaded to Supabase Storage
- Images are optimized and served from a CDN
- Old images are kept for backup purposes
- Supported formats: JPG, PNG, WebP

## 🔐 Security Features

- **Password Protection**: Admin panel requires authentication
- **Row Level Security**: Database access is properly secured
- **Secure Image Upload**: Images are stored securely in Supabase
- **Input Validation**: All forms validate data before submission

## 📱 Mobile Friendly

The admin panel is fully responsive and works perfectly on:
- Desktop computers
- Tablets
- Mobile phones

## 🛠️ Customization

### Changing the Admin Password
1. Go to Settings in the admin panel
2. Enter your new password
3. Click "Update Password"

### Adding New Categories
Categories you create will automatically appear in:
- The website navigation dropdown
- Product creation forms
- Product filtering

### Product Display
Products are automatically organized by category on your website. Each category gets its own section with all products displayed in an attractive grid layout.

## 🚨 Troubleshooting

### Can't Login
- Check that you're using the correct password (`admin123`)
- Ensure Supabase credentials are correctly configured
- Check browser console for error messages

### Images Not Uploading
- Verify Supabase Storage bucket is created and public
- Check storage policies are correctly set
- Ensure image file size is under 5MB

### Products Not Showing
- Check Supabase connection in browser console
- Verify database migration was run successfully
- Ensure products have valid category assignments

### Website Not Updating
- Clear browser cache
- Check that `js/shop.js` is properly loaded
- Verify Supabase credentials in `js/supabase.js`

## 📞 Support

If you encounter any issues:

1. **Check the Browser Console**
   - Press F12 to open developer tools
   - Look for error messages in the Console tab

2. **Verify Supabase Setup**
   - Ensure all tables were created
   - Check that storage bucket exists
   - Verify API credentials are correct

3. **Test Step by Step**
   - Try logging into admin panel
   - Test adding a category first
   - Then test adding a product

## 🎉 You're All Set!

Your luxury perfume website now has a powerful, easy-to-use admin panel. You can:

- ✅ Manage all your products from one place
- ✅ Upload beautiful product images
- ✅ Organize products by categories
- ✅ Update stock status instantly
- ✅ View your store statistics
- ✅ Access everything from any device

The admin panel maintains your website's elegant gold and black theme, making it feel like a natural extension of your brand.

**Happy selling! 🌟**