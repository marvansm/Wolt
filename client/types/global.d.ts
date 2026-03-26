export type ImageCardProps = {
  imageSrc?: string;
  alt?: string;
  title?: string;
  description?: string;
  bottomElement?: ReactNode;
  className?: string;
  imagePriority?: boolean;
  children?: ReactNode;
};
export type HeroCardProps = {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  bottomElement?: ReactNode;
  className?: string;
  imagePriority?: boolean;
};
export type HeadingProps = {
  title: string;
};


export interface Category {
    id?: string;
    _id?: string;
    name: string;
    image: string;
    bgColor?: string;
}

export interface Restaurant {
    id?: string;
    _id?: string;
    name: string;
    description: string;
    image: string;
    deliveryTime: string;
    rating: number;
    priceRange: string;
    deliveryFee: string;
    address?: string;
    menu?: any[];
    tags?: string[];
    promo?: string;
}

export interface Store {
    id?: string;
    _id?: string;
    name: string;
    image: string;
    bgColor?: string;
    isSponsored?: boolean;
    hasWoltPlus?: boolean;
}

export interface StoreSidebarProps {
    categories: string[];
    activeCategory?: string;
    onCategoryChange?: (category: string) => void;
}

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    country?: string;
    phoneNumber?: string;
}

export interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string) => Promise<void>;
    signup: (userData: any) => Promise<void>;
    logout: () => void;
}

export interface ProductCardProps {
  product: {
    _id?: string;
    name: string;
    price: number;
    originalPrice?: number;
    description?: string;
    image?: string;
    weight?: string;
    unitPrice?: string;
    badge?: string;
  };
  onClick?: () => void;
}


export interface ProductListProps {
  categoryName: string;
  categoryId?: string;
  products: any[];
  onProductClick?: (product: any) => void;
}


export interface ProductModalProps {
  product: any;
  onClose: () => void;
  restaurant?: any;
}


export interface StoreBannerProps {
  restaurant: {
    name: string;
    description: string;
    image?: string;
    banner?: string;
    avatar?: string;
    deliveryTime: string;
    rating: number;
    priceRange: string;
    deliveryFee: string;
    minOrderAmount?: number;
  }
}


export interface CartItem {
    _id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    storeId: string;
    storeName: string;
    storeImage?: string;
    deliveryTime?: string;
    storeType?: 'restaurant' | 'store';
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
    storeId: string;
}

export interface CartContextType {
    items: CartItem[];
    orders: Order[];
    addToCart: (product: any, store: any) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    placeOrder: () => void;
    totalAmount: number;
    itemCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartViewMode: 'basket' | 'order';
    setCartViewMode: (mode: 'basket' | 'order') => void;
}