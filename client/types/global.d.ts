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
    id?: string;
    _id?: string;
    email: string;
    firstName: string;
    lastName: string;
    country?: string;
    phoneNumber?: string;
    avatar?: string;
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    isWoltPlus?: boolean;
    woltPlusExpiresAt?: string;
    credit?: number;
}

export interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password?: string) => Promise<void>;
    loginWithSocial: (data: any) => Promise<void>;
    loginWithToken: (token: string, user: any) => void;
    signup: (userData: any) => Promise<any>;
    verifyEmail: (email: string, code: string) => Promise<void>;
    resendCode: (email: string) => Promise<void>;
    changeEmail: (oldEmail: string, newEmail: string) => Promise<any>;
    forgotPassword: (email: string) => Promise<any>;
    resetPassword: (data: any) => Promise<any>;
    updateProfile: (data: any) => Promise<any>;
    requestProfileVerification: (method: 'email' | 'phone') => Promise<any>;
    verifyProfileMethod: (method: 'email' | 'phone', code: string) => Promise<any>;
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
    description?: string;
    latitude?: number;
    longitude?: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
    storeId: string;
    storeName: string;
    storeImage?: string;
    deliveryAddress?: string;
    status: 'received' | 'seen' | 'preparing' | 'ready' | 'delivered';
    storeLocation?: { lat: number, lng: number };
    deliveryLocation?: { lat: number, lng: number };
    paymentMethod?: string;
}

export interface SelectedAddress {
    details: string;
    lat: number;
    lng: number;
    name?: string;
    id?: string;
}

export interface CartContextType {
    items: CartItem[];
    orders: Order[];
    currentAddress: SelectedAddress | null;
    setCurrentAddress: (address: SelectedAddress) => void;
    addToCart: (product: any, store: any) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    placeOrder: (
        router?: any, 
        venueComment?: string, 
        paymentMethod?: string,
        metadata?: {
            tip?: number;
            deliveryMode?: string;
            deliveryTimeType?: string;
            isGift?: boolean;
            courierNote?: string;
            deliveryAddress?: string;
        }
    ) => Promise<void>;
    updateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
    totalAmount: number;
    itemCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartViewMode: 'basket' | 'order';
    setCartViewMode: (mode: 'basket' | 'order') => void;
    venueComment: string;
    setVenueComment: (comment: string) => void;
}