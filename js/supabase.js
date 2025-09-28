import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Supabase configuration
const SUPABASE_URL = 'https://opgufswmhxmjedtcrdda.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wZ3Vmc3dtaHhtamVkdGNyZGRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5ODI3ODYsImV4cCI6MjA3NDU1ODc4Nn0.SeEVnP-i6SgiUGh2OsgM1-F7flvTksuPdxF1mbA5klo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Admin authentication using Supabase Auth
export class AdminAuth {
  static async login(password) {
    // Use a hardcoded email for the dedicated admin user.
    // This keeps the login UI simple (password-only) while using
    // Supabase's real authentication to satisfy RLS policies.
    const adminEmail = 'admin@example.com';
    const { error } = await supabase.auth.signInWithPassword({ 
      email: adminEmail, 
      password 
    });
    
    if (error) {
      // Provide a more user-friendly error message
      if (error.message.includes('Invalid login credentials')) {
        return { success: false, error: 'Invalid password. Please try again.' };
      }
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  static async logout() {
    await supabase.auth.signOut();
    window.location.href = 'admin-login.html';
  }

  static async requireAuth() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      window.location.href = 'admin-login.html';
    }
  }
}

// Categories API
export class CategoriesAPI {
  static async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  }

  static async create(name) {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name }])
      .select();
    
    if (error) throw error;
    return data[0];
  }

  static async update(id, name) {
    const { data, error } = await supabase
      .from('categories')
      .update({ name })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }

  static async delete(id) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}

// Products API
export class ProductsAPI {
  static async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async getById(id) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async create(product) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
    
    if (error) throw error;
    return data[0];
  }

  static async update(id, product) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }

  static async delete(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  static async uploadImage(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
}

// Dashboard stats
export class DashboardAPI {
  static async getStats() {
    const [categoriesResult, productsResult, outOfStockResult] = await Promise.all([
      supabase.from('categories').select('id', { count: 'exact' }),
      supabase.from('products').select('id', { count: 'exact' }),
      supabase.from('products').select('id', { count: 'exact' }).eq('in_stock', false)
    ]);

    if (categoriesResult.error || productsResult.error || outOfStockResult.error) {
        console.error("Error fetching stats:", categoriesResult.error || productsResult.error || outOfStockResult.error);
        return { totalCategories: 0, totalProducts: 0, outOfStockProducts: 0 };
    }

    return {
      totalCategories: categoriesResult.count || 0,
      totalProducts: productsResult.count || 0,
      outOfStockProducts: outOfStockResult.count || 0
    };
  }
}
