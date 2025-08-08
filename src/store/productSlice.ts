import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from './../utils/AxiosInstance';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface Categories {
  slug: string;
  name: string;
  url: string;
}

interface ProductState {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
  categories: Categories[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed' | '';
}

const initialState: ProductState = {
  products: [],
  total: 0,
  skip: 0,
  limit: 0,
  status: '',
  categories: [],
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    try {
      const response = await instance.get(`/products`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    try {
      const response = await instance.get(`/products/categories`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  'products/getProductsByCategory',
  async ({ category }: { category: string }) => {
    try {
      const response = await instance.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetState: (
      state,
      action: { payload: { key: keyof typeof initialState } }
    ) => {
      const { key } = action.payload;
      (state[key] as any) = initialState[key];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload?.products;
        state.total = action.payload?.total;
        state.skip = action.payload?.skip;
        state.limit = action.payload?.limit;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
      })

      .addCase(getCategories.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = 'failed';
      })

      .addCase(getProductsByCategory.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload?.products;
        state.total = action.payload?.total;
        state.skip = action.payload?.skip;
        state.limit = action.payload?.limit;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const { resetState } = slice.actions;

export default slice.reducer;
