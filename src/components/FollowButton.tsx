import { useAuth } from "hooks/useAuth";
import { useState } from "react";

type FollowButtonProps = {
  postSlug: string;
  authorName: string;
  following: boolean;
};

type ProfileResponse = {
  profile: {
    bio: string;
    following: boolean;
    image: string;
    username: string;
  };
  errors?: Record<string, string[]>;
};

export const FollowButton = ({ postSlug, authorName, following: initialFollowing }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  if (!user) return null;

  const handleFollowClick = async () => {
    try {
      await toggleFollowStatus(postSlug, !isFollowing);
    } catch (error) {
      // Handle error appropriately for your application
      console.error("Failed to toggle follow status:", error);
    }
  };

  const toggleFollowStatus = async (slug: string, shouldFollow: boolean): Promise<void> => {
    setIsLoading(true);
    try {
      const method = shouldFollow ? "POST" : "DELETE";
      const apiEndpoint = `${process.env.REACT_APP_API_URL}/profiles/${authorName}/follow`;

      const response = await fetch(apiEndpoint, {
        method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const data: ProfileResponse = await response.json();

      await new Promise(resolve => setTimeout(resolve, 1000));//for testing purposes

      if (data.errors) {
        throw new Error(Object.values(data.errors).flat().join(", "));
      }

      if (data.profile) {
        setIsFollowing(data.profile.following);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`btn btn-sm ${isFollowing ? "btn-secondary" : "btn-outline-secondary"}`}
      onClick={handleFollowClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <i className={`ion-${isFollowing ? "checkmark" : "plus"}-round`} />
          &nbsp; {isFollowing ? "Following" : "Follow"} {authorName}
        </>
      )}
    </button>
  );
};
