/*
  # Create Storage Bucket for Product Images

  This migration sets up the necessary Supabase Storage bucket for handling product image uploads.

  1. New Storage Bucket
    - Creates a new public bucket named `product-images`.

  2. Security Policies
    - **Public Read Access**: Adds a policy to allow anyone (`anon` and `authenticated` roles) to view/read images from the `product-images` bucket. This is essential for displaying product images on the storefront.
    - **Admin Write Access**: Adds policies to allow only authenticated users to upload, update, and delete images. This secures the bucket so only logged-in admins can manage product images.
*/

-- 1. Create the storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Create policy for public read access
CREATE POLICY "Allow public read access to product images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');

-- 3. Create policies for authenticated users to manage images
CREATE POLICY "Allow authenticated users to insert product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow authenticated users to update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

CREATE POLICY "Allow authenticated users to delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');
