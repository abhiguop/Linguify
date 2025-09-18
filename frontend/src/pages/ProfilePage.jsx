import { useState } from 'react';
import { Edit, Camera, MapPin, Languages, Calendar, Users } from 'lucide-react';
import ProfileSettings from '../components/ProfileSettings';
import useAuthUser from '../hooks/useAuthUser';

const ProfilePage = () => {
  const { authUser } = useAuthUser();
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  const stats = [
    { label: 'Friends', value: '24', icon: Users },
    { label: 'Languages', value: '2', icon: Languages },
    { label: 'Days Active', value: '45', icon: Calendar },
  ];

  return (
    <div className="h-full overflow-y-auto bg-base-100">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Profile Header */}
        <div className="card bg-base-200 shadow-xl mb-6">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Picture */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                  <img
                    src={authUser?.profilePic || '/default-avatar.png'}
                    alt={authUser?.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => setShowProfileSettings(true)}
                  className="absolute -bottom-2 -right-2 btn btn-primary btn-circle btn-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Edit profile picture"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-base-content">
                    {authUser?.fullName || 'Your Name'}
                  </h1>
                  <button
                    onClick={() => setShowProfileSettings(true)}
                    className="btn btn-outline btn-sm gap-2 mx-auto sm:mx-0 w-fit"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>

                {authUser?.location && (
                  <div className="flex items-center gap-2 text-base-content/70 justify-center sm:justify-start mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{authUser.location}</span>
                  </div>
                )}

                {authUser?.bio && (
                  <p className="text-base-content/80 max-w-md">
                    {authUser.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="divider"></div>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-base-content">{stat.value}</div>
                    <div className="text-sm text-base-content/70">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Language Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-primary">Native Language</h2>
              <div className="flex items-center gap-3">
                <div className="text-2xl">🗣️</div>
                <div>
                  <div className="font-semibold text-lg capitalize">
                    {authUser?.nativeLanguage || 'Not specified'}
                  </div>
                  <div className="text-sm text-base-content/70">
                    Language you speak fluently
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-secondary">Learning Language</h2>
              <div className="flex items-center gap-3">
                <div className="text-2xl">📚</div>
                <div>
                  <div className="font-semibold text-lg capitalize">
                    {authUser?.learningLanguage || 'Not specified'}
                  </div>
                  <div className="text-sm text-base-content/70">
                    Language you're learning
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Joined a conversation with Maria</span>
                <span className="text-xs text-base-content/50 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Updated profile information</span>
                <span className="text-xs text-base-content/50 ml-auto">1 day ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Added 3 new friends</span>
                <span className="text-xs text-base-content/50 ml-auto">3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Settings Modal */}
      <ProfileSettings
        isOpen={showProfileSettings}
        onClose={() => setShowProfileSettings(false)}
      />
    </div>
  );
};

export default ProfilePage;
