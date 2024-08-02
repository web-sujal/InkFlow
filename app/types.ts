export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  imageUrl?: string;
  featured_image?: string; // TODO: make new interface of type DirectusImage
  author: User;
}

export interface BlogErrors {
  title?: string;
  content?: string;
  imageUrl?: string;
  featured_image?: string;
}

export interface AuthErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  invalidCredentials?: string;
}
