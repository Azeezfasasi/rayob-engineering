import { connectDB } from '../db/connect';
import Blog from '../models/Blog';

export async function createBlog(req) {
  await connectDB();
  try {
    const form = await req.formData();
    const blogData = {};
    for (const [key, value] of form.entries()) {
      if (key === 'blogImages' || key === 'featuredImage') {
        // For now, just store the file name (implement file upload logic as needed)
        if (!blogData[key]) blogData[key] = [];
        if (value && value.name) {
          blogData[key].push(value.name);
        }
      } else {
        blogData[key] = value;
      }
    }
    // If featuredImage is a single file, store as string
    if (Array.isArray(blogData.featuredImage) && blogData.featuredImage.length === 1) {
      blogData.featuredImage = blogData.featuredImage[0];
    }
    const blog = new Blog(blogData);
    await blog.save();
    return new Response(JSON.stringify(blog), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

export async function getAllBlogs() {
  await connectDB();
  try {
    const blogs = await Blog.find().sort({ publishDate: -1 });
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function getBlogById(req, { params }) {
  await connectDB();
  try {
    const blog = await Blog.findById(params.id);
    if (!blog) return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function updateBlog(req, { params }) {
  await connectDB();
  try {
    const body = await req.json();
    const blog = await Blog.findByIdAndUpdate(params.id, body, { new: true });
    if (!blog) return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}

export async function deleteBlog(req, { params }) {
  await connectDB();
  try {
    const blog = await Blog.findByIdAndDelete(params.id);
    if (!blog) return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
    return new Response(JSON.stringify({ message: 'Blog deleted' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function changeBlogStatus(req, { params }) {
  await connectDB();
  try {
    const { status } = await req.json();
    if (!['draft', 'published'].includes(status)) {
      return new Response(JSON.stringify({ error: 'Invalid status' }), { status: 400 });
    }
    const blog = await Blog.findByIdAndUpdate(params.id, { status }, { new: true });
    if (!blog) return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
