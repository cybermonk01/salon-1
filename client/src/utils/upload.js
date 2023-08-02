import axios from "axios";
import { useState } from "react";

const upload = async (file) => {
  const data = new FormData();

  data.append("file", file);

  data.append("upload_preset", "blog_images");

  console.log(data);

  try {
    const res = await axios
      .post("https://api.cloudinary.com/v1_1/dx78ez1cn/image/upload", data)

      .catch((err) => {
        console.log(err);
      });

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
