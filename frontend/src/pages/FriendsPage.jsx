import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUserFriends } from "../lib/api";
import { Link } from "react-router";
import { 
  SearchIcon, 
  FilterIcon, 
  MessageCircleIcon, 
  VideoIcon, 
  UserMinusIcon,
  SortAscIcon,
  UsersIcon,
  MapPinIcon
} from "lucide-react";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { capitialize } from "../lib/utils";

const FriendsPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // Filter and sort friends
  const filteredAndSortedFriends = friends
    .filter((friend) => {
      const matchesSearch = friend.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = !languageFilter || 
        friend.nativeLanguage.toLowerCase() === languageFilter.toLowerCase() ||
        friend.learningLanguage.toLowerCase() === languageFilter.toLowerCase();
      return matchesSearch && matchesLanguage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.fullName.localeCompare(b.fullName);
        case "native":
          return a.nativeLanguage.localeCompare(b.nativeLanguage);
        case "learning":
          return a.learningLanguage.localeCompare(b.learningLanguage);
        default:
          return 0;
      }
    });

  // Get unique languages for filter dropdown
  const allLanguages = [...new Set([
    ...friends.map(f => f.nativeLanguage),
    ...friends.map(f => f.learningLanguage)
  ])].filter(Boolean).sort();

  const handleVideoCall = (friendId) => {
    const callUrl = `/call/${friendId}`;
    window.open(callUrl, '_blank');
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
              <UsersIcon className="size-8 text-primary" />
              My Friends
            </h1>
            <p className="text-base-content opacity-70 mt-1">
              {friends.length} language exchange partner{friends.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="btn-group">
              <button 
                className={`btn btn-sm ${viewMode === 'grid' ? 'btn-active' : 'btn-outline'}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button 
                className={`btn btn-sm ${viewMode === 'list' ? 'btn-active' : 'btn-outline'}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="card bg-base-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="form-control flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-base-content opacity-50" />
                <input
                  type="text"
                  placeholder="Search friends by name..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Language Filter */}
            <div className="form-control">
              <select
                className="select select-bordered"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
              >
                <option value="">All Languages</option>
                {allLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {capitialize(lang)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="form-control">
              <select
                className="select select-bordered"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="native">Sort by Native Language</option>
                <option value="learning">Sort by Learning Language</option>
              </select>
            </div>
          </div>
        </div>

        {/* Friends List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : filteredAndSortedFriends.length === 0 ? (
          <div className="card bg-base-200 p-8 text-center">
            <FilterIcon className="size-12 mx-auto text-base-content opacity-50 mb-4" />
            <h3 className="font-semibold text-lg mb-2">No friends match your filters</h3>
            <p className="text-base-content opacity-70">
              Try adjusting your search or filter criteria
            </p>
            <button 
              className="btn btn-outline mt-4"
              onClick={() => {
                setSearchTerm("");
                setLanguageFilter("");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              : "space-y-4"
          }>
            {filteredAndSortedFriends.map((friend) => (
              viewMode === 'grid' ? (
                <FriendCard key={friend._id} friend={friend} />
              ) : (
                <FriendListItem 
                  key={friend._id} 
                  friend={friend} 
                  onVideoCall={handleVideoCall}
                />
              )
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {friends.length > 0 && (
          <div className="card bg-base-200 p-6">
            <h3 className="font-semibold text-lg mb-4">Friend Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="stat">
                <div className="stat-title">Total Friends</div>
                <div className="stat-value text-primary">{friends.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Languages Covered</div>
                <div className="stat-value text-secondary">{allLanguages.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Showing</div>
                <div className="stat-value text-accent">{filteredAndSortedFriends.length}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// List view component for friends
const FriendListItem = ({ friend, onVideoCall }) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="avatar size-16">
              <img src={friend.profilePic} alt={friend.fullName} className="rounded-full" />
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{friend.fullName}</h3>
              
              {/* Languages */}
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="badge badge-secondary text-xs">
                  {getLanguageFlag(friend.nativeLanguage)}
                  Native: {capitialize(friend.nativeLanguage)}
                </span>
                <span className="badge badge-outline text-xs">
                  {getLanguageFlag(friend.learningLanguage)}
                  Learning: {capitialize(friend.learningLanguage)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link 
              to={`/chat/${friend._id}`}
              className="btn btn-outline btn-sm"
              title="Send Message"
            >
              <MessageCircleIcon className="size-4" />
            </Link>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onVideoCall(friend._id)}
              title="Video Call"
            >
              <VideoIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
