import { Blog, User } from "./types";

const mockUsers: User[] = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
  },
  {
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
  },
  {
    first_name: "Bob",
    last_name: "Brown",
    email: "bob.brown@example.com",
  },
  {
    first_name: "Charlie",
    last_name: "Davis",
    email: "charlie.davis@example.com",
  },
];

const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "Understanding JavaScript Closures",
    content:
      "In this blog post, we'll explore how closures work in JavaScript...",
    created_at: "2024-08-01T08:30:00Z",
    featured_image: "https://example.com/images/js-closures.jpg",
    author: mockUsers[0],
  },
  {
    id: "2",
    title: "A Guide to React Hooks",
    content:
      "React hooks have revolutionized how we write functional components...",
    created_at: "2024-08-02T09:00:00Z",
    featured_image: "https://example.com/images/react-hooks.jpg",
    author: mockUsers[1],
  },
  {
    id: "3",
    title: "CSS Grid Layout: A Comprehensive Guide",
    content:
      "CSS Grid Layout is a powerful tool for creating responsive layouts...",
    created_at: "2024-08-03T10:15:00Z",
    featured_image: "https://example.com/images/css-grid.jpg",
    author: mockUsers[2],
  },
  {
    id: "4",
    title: "Mastering TypeScript for Large Projects",
    content:
      "TypeScript offers powerful type-checking features that help maintain large codebases...",
    created_at: "2024-08-04T11:45:00Z",
    featured_image: "https://example.com/images/typescript.jpg",
    author: mockUsers[3],
  },
  {
    id: "5",
    title: "Building RESTful APIs with Node.js",
    content:
      "Node.js is a popular choice for building fast and scalable backend services...",
    created_at: "2024-08-05T12:30:00Z",
    featured_image: "https://example.com/images/nodejs.jpg",
    author: mockUsers[4],
  },
];

export default mockBlogs;
