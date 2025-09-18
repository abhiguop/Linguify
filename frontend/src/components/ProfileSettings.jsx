import { useState } from 'react';
import { Save, User, Mail, MapPin, Languages, Shuffle } from 'lucide-react';
import ImageUpload from './ImageUpload';
import useAuthUser from '../hooks/useAuthUser';

const ProfileSettings = ({ isOpen, onClose }) => {
  const { authUser } = useAuthUser();
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || '',
    email: authUser?.email || '',
    location: authUser?.location || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    profilePic: authUser?.profilePic || ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(authUser?.profilePic || '');
  const [isSaving, setIsSaving] = useState(false);

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi',
    'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (file, preview) => {
    console.log('ProfileSettings - handleImageSelect called:', { file, preview });
    setSelectedImage(file);
    setImagePreview(preview);
    if (preview) {
      setFormData(prev => ({
        ...prev,
        profilePic: preview
      }));
    }
  };

  const generateRandomAvatar = () => {
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;
    setImagePreview(avatarUrl);
    setFormData(prev => ({
      ...prev,
      profilePic: avatarUrl
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Here you would typically upload the image and update the profile
      // For now, we'll just simulate the save process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Profile updated:', { ...formData, profilePic: imagePreview });
      onClose && onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-base-100 rounded-2xl shadow-2xl max-w-2xl w-full my-4 max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-base-100 border-b border-base-300 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
              <User className="w-6 h-6 text-primary" />
              Complete Your Profile
            </h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Picture Section */}
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-base-content">Profile Picture</h3>
            
            <div className="flex flex-col items-center gap-4">
              <ImageUpload
                currentImage={imagePreview}
                onImageSelect={handleImageSelect}
              />
              
              <button
                type="button"
                onClick={generateRandomAvatar}
                className="btn btn-outline btn-sm gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Generate Random Avatar
              </button>
            </div>
          </div>

          <div className="divider"></div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="input input-bordered focus:input-primary"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered focus:input-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input input-bordered focus:input-primary"
                placeholder="City, Country"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="textarea textarea-bordered focus:textarea-primary h-24 resize-none"
                placeholder="Tell us about yourself and your language learning goals..."
              ></textarea>
            </div>
          </div>

          <div className="divider"></div>

          {/* Language Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" />
              Language Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formData.nativeLanguage}
                  onChange={handleInputChange}
                  className="select select-bordered focus:select-primary"
                  required
                >
                  <option value="">Select your native language</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formData.learningLanguage}
                  onChange={handleInputChange}
                  className="select select-bordered focus:select-primary"
                  required
                >
                  <option value="">Select language you're learning</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost flex-1"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 gap-2"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
