import { addLike, removeLike } from '../../../../server/controllers/blogController';
import { connectDB } from '../../../../server/db';

// POST /api/blog/[id]/like
export async function POST(req, { params }) {
  await connectDB();
  const resolvedParams = await params;
  return addLike(req, { params: resolvedParams });
}

// DELETE /api/blog/[id]/like
export async function DELETE(req, { params }) {
  await connectDB();
  const resolvedParams = await params;
  return removeLike(req, { params: resolvedParams });
}
