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