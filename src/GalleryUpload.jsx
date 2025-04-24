// import { useState, useEffect } from 'react';
// import { Plus, X, Upload, Trash2 } from 'lucide-react';
// import Navbar2 from './Navbar2';
// import axios from 'axios';

// const ImageUploadManager = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [previewUrls, setPreviewUrls] = useState([]);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem('token');

//   const axiosInstance = axios.create({
//     baseURL: 'https://api.nepaldroneassociation.org.np/app',
//     headers: {
//       'Authorization': `Token ${token}`
//     }
//   });

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get('/gallery/');
//       if (response.data && response.data.status === "success") {
//         setUploadedImages(response.data.images || []);
//       }
//     } catch (err) {
//       console.error('Error fetching images:', err);
//       setError('Failed to fetch images');
//       setUploadedImages([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileSelect = (event) => {
//     const newFiles = Array.from(event.target.files);
    
//     // Combine with existing files if any
//     setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    
//     // Create preview URLs for new files and combine with existing previews
//     const newPreviews = newFiles.map(file => URL.createObjectURL(file));
//     setPreviewUrls(prevUrls => [...prevUrls, ...newPreviews]);
//   };

//   const cleanupPreviews = () => {
//     previewUrls.forEach(url => URL.revokeObjectURL(url));
//   };

//   const handleUpload = async () => {
//     if (!selectedFiles.length) return;

//     const formData = new FormData();
//     selectedFiles.forEach(file => {
//       formData.append('images', file);
//     });

//     try {
//       setLoading(true);
//       const response = await axiosInstance.post('/gallery/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
      
//       if (response.data && response.data.status === "success") {
//         fetchImages();
//       }
      
//       // Clear selected files and previews
//       setSelectedFiles([]);
//       setPreviewUrls([]);
//     } catch (err) {
//       console.error('Error uploading images:', err);
//       setError('Failed to upload images');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (imageId) => {
//     try {
//       setLoading(true);
//       await axiosInstance.delete(`/gallery/${imageId}/`);
//       setUploadedImages(prevImages => 
//         prevImages.filter(image => image.id !== imageId)
//       );
//     } catch (err) {
//       console.error('Error deleting image:', err);
//       setError('Failed to delete image');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add this useEffect for cleanup
//   useEffect(() => {
//     return () => {
//       // Cleanup preview URLs when component unmounts
//       previewUrls.forEach(url => URL.revokeObjectURL(url));
//     };
//   }, [previewUrls]);

//   return (
//     <>
//       <Navbar2 />
//       {/* Container with conditional max-width */}
//       <div className="max-w-screen-lg xl:max-w-none 2xl:max-w-none mx-auto p-6">
//         <div className="mb-8">
//           <div className="flex flex-wrap items-center gap-4 mb-6">
//             <div className="relative">
//               <input
//                 type="file"
//                 multiple
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 accept="image/*"
//                 onChange={handleFileSelect}
//                 onClick={(e) => e.target.value = null} // Allow selecting same file again
//               />
//               <div className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
//                 <Plus size={24} />
//               </div>
//             </div>
//             Add Images
            
//             {selectedFiles.length > 0 && (
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600">
//                   {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
//                 </span>
//                 <button
//                   onClick={handleUpload}
//                   disabled={loading}
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
//                 >
//                   <Upload size={20} />
//                   Upload All
//                 </button>
//                 <button
//                   onClick={() => {
//                     setSelectedFiles([]);
//                     setPreviewUrls([]);
//                     cleanupPreviews();
//                   }}
//                   className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>
//             )}
//           </div>

//           {previewUrls.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2">
//                 Preview ({selectedFiles.length} {selectedFiles.length === 1 ? 'image' : 'images'})
//               </h3>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                 {previewUrls.map((url, index) => (
//                   <div key={index} className="relative group aspect-square">
//                     <img
//                       src={url}
//                       alt={`Preview ${index + 1}`}
//                       className="w-full h-full object-cover rounded-lg"
//                       loading="lazy"
//                     />
//                     <button
//                       onClick={() => {
//                         const newFiles = selectedFiles.filter((_, i) => i !== index);
//                         const newPreviews = previewUrls.filter((_, i) => i !== index);
//                         URL.revokeObjectURL(url); // Cleanup unused preview URL
//                         setSelectedFiles(newFiles);
//                         setPreviewUrls(newPreviews);
//                       }}
//                       className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         {loading && (
//           <div className="flex justify-center my-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {uploadedImages.map((image) => (
//             <div key={image.id} className="relative group">
//               <div className="relative">
//                 <img
//                   src={image.image}
//                   alt={`Upload ${image.id}`}
//                   className="w-full h-48 object-cover rounded-lg"
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg" />
//               </div>
//               <button
//                 onClick={() => handleDelete(image.id)}
//                 className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ImageUploadManager;




import { useState, useEffect } from 'react';
import { Plus, X, Upload, Trash2 } from 'lucide-react';
import Navbar2 from './Navbar2';
import axios from 'axios';

// Resize function
const resizeImage = (file, maxSize = 800) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        resolve(url);
      }, file.type);
    };
    img.src = URL.createObjectURL(file);
  });

const ImageUploadManager = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: 'https://api.nepaldroneassociation.org.np/app',
    headers: {
      'Authorization': `Token ${token}`
    }
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/gallery/');
      if (response.data && response.data.status === "success") {
        setUploadedImages(response.data.images || []);
      }
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to fetch images');
      setUploadedImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (event) => {
    const newFiles = Array.from(event.target.files);

    const resizedPreviews = await Promise.all(newFiles.map(file => resizeImage(file)));

    setSelectedFiles(prev => [...prev, ...newFiles]);
    setPreviewUrls(prev => [...prev, ...resizedPreviews]);
  };

  const cleanupPreviews = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return;

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      setLoading(true);
      const response = await axiosInstance.post('/gallery/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.status === "success") {
        fetchImages();
      }

      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (err) {
      console.error('Error uploading images:', err);
      setError('Failed to upload images');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/gallery/${imageId}/`);
      setUploadedImages(prev => prev.filter(img => img.id !== imageId));
    } catch (err) {
      console.error('Error deleting image:', err);
      setError('Failed to delete image');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <>
      <Navbar2 />
      <div className="max-w-screen-lg xl:max-w-none 2xl:max-w-none mx-auto p-6">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative">
              <input
                type="file"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleFileSelect}
                onClick={(e) => e.target.value = null}
              />
              <div className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
                <Plus size={24} />
              </div>
            </div>
            Add Images

            {selectedFiles.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
                </span>
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                >
                  <Upload size={20} />
                  Upload All
                </button>
                <button
                  onClick={() => {
                    setSelectedFiles([]);
                    setPreviewUrls([]);
                    cleanupPreviews();
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {previewUrls.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Preview ({selectedFiles.length} {selectedFiles.length === 1 ? 'image' : 'images'})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                    <button
                      onClick={() => {
                        const newFiles = selectedFiles.filter((_, i) => i !== index);
                        const newPreviews = previewUrls.filter((_, i) => i !== index);
                        URL.revokeObjectURL(url);
                        setSelectedFiles(newFiles);
                        setPreviewUrls(newPreviews);
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center my-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedImages.map((image) => (
            <div key={image.id} className="relative group">
              <div className="relative">
                <img
                  src={image.image}
                  alt={`Upload ${image.id}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg" />
              </div>
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageUploadManager;
