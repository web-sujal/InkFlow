import { authentication, createDirectus, rest } from "@directus/sdk";
import { Blog } from "~/types";

type Schema = {
  Blogs: Blog[];
};

const directus = createDirectus<Schema>(process.env.DIRECTUS_URL || "")
  .with(rest())
  .with(authentication("json"));

export default directus;
