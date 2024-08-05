import { createItem, uploadFiles } from "@directus/sdk";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";

import BlogForm from "~/components/BlogForm/BlogForm";
import directus from "~/lib/directus.server";
import { getSession } from "~/sessions";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  // fetch userId from session cookie
  const session = getSession(request.headers.get("cookie"));
  const userId = (await session).get("userId");
  console.log("userId: ", userId);

  // extracting details form formData
  const title = String(formData.get("title"));
  const content = String(formData.get("content"));
  const full_name = String(formData.get("full_name"));
  const featured_image = formData.get("featured_image") as File;

  let imageId: string | undefined = undefined;

  try {
    if (featured_image && featured_image instanceof Blob) {
      const imageData = new FormData();
      imageData.append("file", featured_image);

      userId && imageData.append("uploaded_by", userId);

      const result = await directus.request(uploadFiles(imageData));
      console.log("result: ", result);
      imageId = result.id;
    }

    const image_url = `${process.env.DIRECTUS_URL}/assets/${imageId}`;
    console.log("image_url: ", image_url); // getting a working url for img

    const newBlog = {
      title,
      content,
      full_name,
      author: userId,
      featured_image: imageId,
      image_url,
    };

    // save to directus: TODO: failing here
    await directus.request(createItem("Blogs", newBlog));

    return redirect("/blogs");
  } catch (error) {
    console.log("Error while creating blog: ", (error as Error).message);
    return json(
      { errors: { unknown_error: "An unknown error occurred" } },
      { status: 500 }
    );
  }
};

const CreateBlog = () => {
  return <BlogForm type="create" />;
};

export default CreateBlog;

/*
export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 625_000, // 5 MB
  });
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  // fetch userId from session cookie
  const session = getSession(request.headers.get("cookie"));
  const userId = (await session).get("userId");

  // extracting details form formData
  const title = String(formData.get("title"));
  const content = String(formData.get("content"));
  const full_name = String(formData.get("full_name"));

  // everthing is working: checked the console
  console.log("title, content, full_name: ", {
    title,
    content,
    full_name,
    userId,
  });
  userId && formData.append("uploaded_by", userId);

  try {
    // upload image to directus: working
    const imgRes = await directus.request(uploadFiles(formData));
    console.log("imgRes: ", imgRes);

    const image_url = `${process.env.DIRECTUS_URL}/assets/${imgRes.id}`;
    console.log("image_url: ", image_url); // getting a working url for img

    // save to directus: TODO: failing here
    await directus.request(
      createItem("Blogs", {
        title,
        content,
        full_name,
        author: userId,
        image_url,
      })
    );

    // return redirect("/blogs");
    return true;
  } catch (error) {
    console.log("Error while creating blog: ", (error as Error).message);

    return json(
      { errors: { unknown_error: "An unknown error occurred" } },
      { status: 500 }
    );
  }
};
*/
