// Use relative paths for API calls - works on any domain
const getApiBase = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use current origin
    return '';
  }
  // Server-side fallback
  return process.env.NEXT_PUBLIC_APP_URL || '';
};

const API_BASE = getApiBase();

const directCloudinaryUpload = async (file, folderName = 'rayob/gallery') => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary direct upload is not configured');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', folderName);
  formData.append('resource_type', 'auto');

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Direct Cloudinary upload failed');
  }

  return {
    success: true,
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
  };
};

/**
 * Upload a file to Cloudinary via direct browser upload when the media is too large
 * for a Vercel serverless function request limit.
 */
export const uploadImageToCloudinary = async (file, folderName = 'rayob/gallery', maxRetries = 2) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (!file) {
        throw new Error('File is required');
      }

      const shouldUseDirectUpload = typeof file === 'object' && file.size > 4 * 1024 * 1024;

      if (shouldUseDirectUpload) {
        return await directCloudinaryUpload(file, folderName);
      }

      const formData = new FormData();
      const uploadFile = typeof file === 'string' && file.startsWith('data:')
        ? new File([file], 'upload', { type: file.substring(file.indexOf(':') + 1, file.indexOf(';')) || 'application/octet-stream' })
        : file;

      formData.append('file', uploadFile);
      formData.append('folderName', folderName);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000);

      const response = await fetch(`${API_BASE}/api/cloudinary`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload image');
      }

      return await response.json();
    } catch (error) {
      lastError = error;

      if (error.name === 'AbortError' && attempt < maxRetries) {
        const delay = Math.pow(2, attempt - 1) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      if (attempt === maxRetries) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
      }
    }
  }

  throw lastError;
};

/**
 * Delete image or video from Cloudinary via API
 */
export const deleteImageFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    if (!publicId) {
      throw new Error('Public ID is required');
    }

    const response = await fetch(`${API_BASE}/api/cloudinary`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId, resourceType }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete image');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

/**
 * Fetch all galleries with filters
 */
export const fetchGalleries = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.category) params.append('category', filters.category);
    if (filters.status) params.append('status', filters.status);
    if (filters.featured) params.append('featured', filters.featured);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.search) params.append('search', filters.search);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);

    const response = await fetch(`${API_BASE}/api/gallery?${params}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch galleries');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching galleries:', error);
    throw error;
  }
};

/**
 * Fetch single gallery by ID
 */
export const fetchGallery = async (id) => {
  try {
    if (!id) {
      throw new Error('Gallery ID is required');
    }

    const response = await fetch(`${API_BASE}/api/gallery/${id}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch gallery');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching gallery:', error);
    throw error;
  }
};

/**
 * Create new gallery
 */
export const createGallery = async (galleryData) => {
  try {
    if (!galleryData.title) {
      throw new Error('Title is required');
    }

    const response = await fetch(`${API_BASE}/api/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(galleryData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create gallery');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating gallery:', error);
    throw error;
  }
};

/**
 * Update gallery
 */
export const updateGallery = async (id, galleryData) => {
  try {
    if (!id) {
      throw new Error('Gallery ID is required');
    }

    const response = await fetch(`${API_BASE}/api/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(galleryData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update gallery');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating gallery:', error);
    throw error;
  }
};

/**
 * Delete gallery
 */
export const deleteGallery = async (id) => {
  try {
    if (!id) {
      throw new Error('Gallery ID is required');
    }

    const response = await fetch(`${API_BASE}/api/gallery/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete gallery');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting gallery:', error);
    throw error;
  }
};

/**
 * Reorder images in gallery
 */
export const reorderGalleryImages = async (id, imageOrder) => {
  try {
    if (!id) {
      throw new Error('Gallery ID is required');
    }

    if (!Array.isArray(imageOrder)) {
      throw new Error('imageOrder must be an array');
    }

    const response = await fetch(`${API_BASE}/api/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageOrder }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reorder images');
    }

    return await response.json();
  } catch (error) {
    console.error('Error reordering images:', error);
    throw error;
  }
};

/**
 * Delete image from gallery
 */
export const deleteGalleryImage = async (id, publicId) => {
  try {
    if (!id || !publicId) {
      throw new Error('Gallery ID and publicId are required');
    }

    const response = await fetch(`${API_BASE}/api/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: 'deleteImage',
        publicId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete image');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

/**
 * Add images to gallery
 */
export const addGalleryImages = async (id, images) => {
  try {
    if (!id) {
      throw new Error('Gallery ID is required');
    }

    if (!Array.isArray(images) || images.length === 0) {
      throw new Error('Images array is required');
    }

    const response = await fetch(`${API_BASE}/api/gallery/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: 'addImages',
        images,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add images');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding images:', error);
    throw error;
  }
};

const galleryApi = {
  fetchGalleries,
  fetchGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  reorderGalleryImages,
  deleteGalleryImage,
  addGalleryImages,
};

export default galleryApi;
