import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000,
});

async function uploadWithRetry(fileBuffer, folderName, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folderName,
            resource_type: 'auto',
            quality: 'auto',
            fetch_format: 'auto',
          },
          (error, uploaded) => {
            if (error) return reject(error);
            resolve(uploaded);
          }
        );

        Readable.from(fileBuffer).pipe(uploadStream);
      });

      return result;
    } catch (error) {
      lastError = error;

      if (!error.message?.includes('Timeout') && !error.message?.includes('ECONNREFUSED') && attempt === maxRetries) {
        throw error;
      }

      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folderName = formData.get('folderName') || 'rayob/gallery';

    if (!file || typeof file === 'string') {
      return Response.json(
        { message: 'File is required' },
        { status: 400 }
      );
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return Response.json(
        { message: 'Cloudinary is not configured' },
        { status: 500 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadWithRetry(fileBuffer, folderName);

    return Response.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return Response.json(
      {
        message: 'Failed to upload media to Cloudinary',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * Delete image from Cloudinary
 */
export async function DELETE(req) {
  try {
    const { publicId, resourceType = 'image' } = await req.json();

    if (!publicId) {
      return Response.json(
        { message: 'Public ID is required' },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });

    return Response.json({
      success: result.result === 'ok',
      message: result.result,
    });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return Response.json(
      {
        message: 'Failed to delete image from Cloudinary',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
