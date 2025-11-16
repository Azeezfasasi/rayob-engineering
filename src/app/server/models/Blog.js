import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  postTitle: { type: String, required: true },
  urlSlug: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  content: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  featuredImage: { type: String },
  blogImages: [{ type: String }],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' }
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
