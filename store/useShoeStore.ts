// store/useShoeStore.ts
import { create } from 'zustand';
import shoesData from '../data/shoe.json'; // Path to your JSON file

// Define types
interface Review {
  userName: string;
  title: string;
  comment: string;
  image: string | null;
}

interface Shoe {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: number[];
  primaryUse: string[];
  smallImage: string;
  reviews: Review[];
}

interface ShoeStore {
  // State
  shoes: Shoe[];
  isLoading: boolean;
  error: string | null;
  
  // Action
  getShoes: () => void;
}

const useShoeStore = create<ShoeStore>((set) => ({
  // Initial state
  shoes: [],
  isLoading: false,
  error: null,
  
  // Action
  getShoes: () => {
    set({ isLoading: true });
    try {
      // Load shoes from your JSON file
      set({ 
        shoes: shoesData.shoes,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error loading shoes:', error);
      set({ 
        error: 'Failed to load shoes data',
        isLoading: false 
      });
    }
  }
}));

export default useShoeStore;