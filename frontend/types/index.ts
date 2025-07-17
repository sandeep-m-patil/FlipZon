export interface User {
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
  price: number ;
  image: string;
  createdAt: string;
  updatedAt: string;
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
