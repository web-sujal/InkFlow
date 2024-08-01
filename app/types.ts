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
  imageUrl: string;
  author: User;
}
