import * as yup from "yup";

export const blogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  full_name: yup.string().required("Name is required"),
});
