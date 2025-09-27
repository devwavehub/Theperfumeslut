// Supabase configuration
const SUPABASE_URL = 'https://opgufswmhxmjedtcrdda.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wZ3Vmc3dtaHhtamVkdGNyZGRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5ODI3ODYsImV4cCI6MjA3NDU1ODc4Nn0.SeEVnP-i6SgiUGh2OsgM1-F7flvTksuPdxF1mbA5klo';

const supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Admin authentication
class AdminAuth {
  static async login(password) {
    try {
      // Simple password check - in production, use proper hashing
      if (password === 'admin123') {
        localStorage.setItem('adminLoggedIn', 'true');
        return { success: true };
      }
      return { success: false, error: 'Invalid password' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin-login.html';
  }

  static isLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
  }

  static requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'admin-login.html';
    }
  }
}

// Categories API
class CategoriesAPI {
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
class ProductsAPI {
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
    const fileName = `${Math.random()}.${fileExt}`;
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
class DashboardAPI {
  static async getStats() {
    const [categoriesResult, productsResult, outOfStockResult] = await Promise.all([
      supabase.from('categories').select('id', { count: 'exact' }),
      supabase.from('products').select('id', { count: 'exact' }),
      supabase.from('products').select('id', { count: 'exact' }).eq('in_stock', false)
    ]);

    return {
      totalCategories: categoriesResult.count || 0,
      totalProducts: productsResult.count || 0,
      outOfStockProducts: outOfStockResult.count || 0
    };
  }
}
