export interface User {
  first_name?: string;
  last_name?: string;
  userId?: string;
  email?: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
  featured_image?: string; // TODO: make new interface of type DirectusImage
  full_name: string;
  author: string;
}

export interface BlogErrors {
  title?: string;
  content?: string;
  imageUrl?: string;
  featured_image?: string;
  full_name?: string;
  unknown_error?: string;
}

export interface AuthErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  invalidCredentials?: string;
}
