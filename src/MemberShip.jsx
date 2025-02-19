import React, { useState } from 'react';
import axios from 'axios';
import drone13 from './assets/drone13.jpg';
import { Upload } from 'lucide-react';
import Navbar from './NavBar';
import Footer from './Footer';

const MembershipForm = () => {
  const [memberType, setMemberType] = useState('individual');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    contact_no: '',
    email: '',
    password: '',
    password2: '',
    drone_experience: '',
    organization_name: '',
    organization_weblink: '',
    organization_social_media_link: '',
  });
  const [files, setFiles] = useState({
    citizenship_upload: null,
    regd_document_upload: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.password2) {
      newErrors.password2 = 'Passwords do not match';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateFileSize = (file) => {
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    return file.size <= maxSize;
  };

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    const file = uploadedFiles[0];

    if (file) {
      if (!validateFileSize(file)) {
        setErrors(prev => ({
          ...prev,
          [name]: 'File size must be less than 2MB'
        }));
        return;
      }

      setFiles(prev => ({
        ...prev,
        [name]: file
      }));
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const FileUploadBox = ({ id, label }) => (
    <div className="mt-1">
      <label 
        htmlFor={id}
        className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-500 focus:outline-none"
      >
        <span className="flex flex-col items-center justify-center space-y-2">
          <Upload className="w-6 h-6 text-gray-600" />
          <span className="font-medium text-gray-600 text-center">
            {files[id] ? files[id].name : `Drop your ${label} here or click to browse`}
          </span>
          <span className="text-xs text-gray-500">
            PNG, JPG, PDF up to 2MB
          </span>
        </span>
        <input 
          type="file" 
          id={id} 
          name={id} 
          className="hidden" 
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
        />
      </label>
      {errors[id] && (
        <p className="mt-1 text-sm text-red-600">{errors[id]}</p>
      )}
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (memberType === 'individual' && ['organization_name', 'organization_weblink', 'organization_social_media_link'].includes(key)) {
          return;
        }
        formDataToSend.append(key, value);
      });

      // Append files
      formDataToSend.append('citizenship_upload', files.citizenship_upload);
      if (memberType === 'organizational' && files.regd_document_upload) {
        formDataToSend.append('regd_document_upload', files.regd_document_upload);
      }

      formDataToSend.append('involvement_type', memberType);

      const response = await axios.post('https://api.nepaldroneassociation.org.np/app/signup/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === "success") {
        alert('Application submitted successfully!');
        // Reset form
        setFormData({
          first_name: '',
          last_name: '',
          address: '',
          contact_no: '',
          email: '',
          password: '',
          password2: '',
          drone_experience: '',
          organization_name: '',
          organization_weblink: '',
          organization_social_media_link: '',
        });
        setFiles({
          citizenship_upload: null,
          regd_document_upload: null,
        });
      }
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || 'Failed to submit application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
            <div className="relative h-64 lg:h-auto">
              <img
                src={drone13}
                alt="Mountain landscape with drone"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="bg-gradient-to-b from-red-100 to-blue-100 rounded-lg shadow-lg p-4 sm:p-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Become a member
                </h1>
                <p className="text-gray-600 mb-6 sm:mb-8">
                  Join us and be part of Nepal's drone community
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Basic Information */}
                  {Object.entries({
                    first_name: 'First Name',
                    last_name: 'Last Name',
                    address: 'Address',
                    contact_no: 'Contact No.',
                    email: 'Email',
                  }).map(([key, label]) => (
                    <div key={key}>
                      <label 
                        htmlFor={key} 
                        className="block text-sm font-medium text-gray-700"
                      >
                        {label} *
                      </label>
                      <input
                        type={key === 'email' ? 'email' : 'text'}
                        id={key}
                        name={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder={`Your ${label.toLowerCase()}`}
                      />
                    </div>
                  ))}

                  {/* Password Fields */}
                  <div>
                    <label 
                      htmlFor="password" 
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password *
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label 
                      htmlFor="password2" 
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      id="password2"
                      name="password2"
                      value={formData.password2}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Confirm your password"
                    />
                    {errors.password2 && (
                      <p className="mt-1 text-sm text-red-600">{errors.password2}</p>
                    )}
                  </div>

                  <div>
                    <label 
                      htmlFor="drone_experience" 
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Drone Related Experience *
                    </label>
                    <textarea
                      id="drone_experience"
                      name="drone_experience"
                      value={formData.drone_experience}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Describe your drone-related experience"
                    />
                  </div>

                  {/* Rest of the form remains the same */}
                  {/* Membership Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Membership Type *
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="memberType"
                          value="individual"
                          checked={memberType === 'individual'}
                          onChange={(e) => setMemberType(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Individual / Freelancer</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="memberType"
                          value="organizational"
                          checked={memberType === 'organizational'}
                          onChange={(e) => setMemberType(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Organizational</span>
                      </label>
                    </div>
                  </div>

                  {/* Organizational Fields */}
                  {memberType === 'organizational' && (
                    <>
                      {Object.entries({
                        organization_name: 'Organization Name',
                        organization_weblink: 'Organization Weblink',
                        organization_social_media_link: 'Organization Social Media Link',
                      }).map(([key, label]) => (
                        <div key={key}>
                          <label 
                            htmlFor={key} 
                            className="block text-sm font-medium text-gray-700"
                          >
                            {label} *
                          </label>
                          <input
                            type={key.includes('link') ? 'url' : 'text'}
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder={key.includes('link') ? 'https://...' : label}
                          />
                        </div>
                      ))}
                    </>
                  )}

                  {/* File Upload Sections */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Citizenship Document *
                    </label>
                    <FileUploadBox id="citizenship_upload" label="citizenship document" />
                  </div>

                  {memberType === 'organizational' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Registration Document *
                      </label>
                      <FileUploadBox id="regd_document_upload" label="registration document" />
                    </div>
                  )}

                  {/* Terms and Submit */}
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label 
                      htmlFor="terms" 
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I agree to the terms and conditions
                    </label>
                  </div>

                  {errors.submit && (
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </div>
            </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default MembershipForm;