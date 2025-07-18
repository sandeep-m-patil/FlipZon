export interface User {
  _id:string,
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface Product {
  _id: string;
  title: string; 
  description: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  _id: string;
  quantity: number;
  product: {
    _id:string;
    description:string;
    title: string;
    price: number;
    image:string;

  };
}
export interface AddProductDialogProps {
  onAdd: (product: {
    title: string;
    description: string;
    price:  number; // if you're using string from input
    image: string;
  }) => void;
}


export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
