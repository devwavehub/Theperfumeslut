/*
  # Add Admin Write Policies for Products & Categories

  This migration adds the necessary Row Level Security (RLS) policies to allow authenticated users (admins) to create, update, and delete records in the `products` and `categories` tables.

  1. Table: `products`
    - Adds `INSERT`, `UPDATE`, and `DELETE` policies for the `authenticated` role.

  2. Table: `categories`
    - Adds `INSERT`, `UPDATE`, and `DELETE` policies for the `authenticated` role.

  This resolves the "new row violates row level security policy" error encountered when trying to save new products or categories from the admin panel.
*/

-- Policies for the 'products' table
CREATE POLICY "Allow authenticated users to insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (true);

-- Policies for the 'categories' table
CREATE POLICY "Allow authenticated users to insert categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (true);
