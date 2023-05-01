const uploadOnCloudinary = require("../middleware/Cloudinary");
const Blog = require("../model/Blog");

const PostBlog = async (req, res) => {
  try {
    let { title, shortDescription, image, detail } = req.body;
    if (!title)
      return res
        .status(400)
        .send({ success: false, message: "Title is required" });
    if (!shortDescription)
      return res
        .status(400)
        .send({ success: false, message: "Short Description is required" });
    if (!detail)
      return res
        .status(400)
        .send({ success: false, message: "Detail is required" });
    let uri = null;
    if (req?.files?.image?.length > 0) {
      uri = await uploadOnCloudinary(req.files.image[0]);
      // req.body.image = uri;
    }
    const savedData = await Blog.create({
      ...req.body,
      image: uri,
    });
    res
      .status(200)
      .send({ success: true, message: "Blog Created", data: savedData });
  } catch (error) {
    console.log(error);
  }
};

const getAllBlog = async (req, res) => {
  try {
    let blogData = await Blog.find(req.query);
    res
      .status(200)
      .send({ success: true, messaage: "Blog Fetched", data: blogData });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteBlogs = async (req, res) => {
  try {
    let deleteIt = await Blog.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .send({ success: true, message: "Successfully deleted", deleteIt });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { PostBlog, getAllBlog, deleteBlogs };
