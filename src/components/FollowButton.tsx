import { useAuth } from "providers/useAuth";
import { useEffect, useState } from "react";
import { Article } from "types/Article";

type ProfileResponse = {
  profile: {
    bio: string;
    following: boolean;
    image: string;
    username: string;
  };
  errors?: Record<string, string[]>;
};

type FollowButtonProps = {
  followUserName: string;
  followingStatus: boolean;
  setArticle?: React.Dispatch<React.SetStateAction<Article>>;
};

export const FollowButton = ({ followUserName, followingStatus, setArticle }: FollowButtonProps) => {
  console.log("followingStatus", followingStatus);

  const [isLoading, setIsLoading] = useState(false);
  const [following, setFolowing] = useState(followingStatus);
  const { user } = useAuth();

  useEffect(() => {
    setFolowing(followingStatus);
  }, [followingStatus]);

  if (!user) return null;
  if (user.username === followUserName) return null;

  const handleFollowClick = async () => {
    try {
      await toggleFollowStatus(followUserName, !following);
    } catch (error) {
      console.error("Failed to toggle follow status:", error);
    }
  };

  const toggleFollowStatus = async (followUserName: string, shouldFollow: boolean): Promise<void> => {
    setIsLoading(true);
    try {
      const method = shouldFollow ? "POST" : "DELETE";
      const apiEndpoint = `${process.env.REACT_APP_API_URL}/profiles/${followUserName}/follow`;

      const response = await fetch(apiEndpoint, {
        method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const data: ProfileResponse = await response.json();
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (data.errors) {
        throw new Error(Object.values(data.errors).flat().join(", "));
      }

      if (data.profile) {
        if (typeof setArticle === "function") {
          setArticle((article: Article) => ({
            ...article,
            author: {
              ...article.author,
              following: data.profile.following,
            },
          }));
        }
        setFolowing(data.profile.following);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`btn btn-sm ${following ? "btn-secondary" : "btn-outline-secondary"}`}
      onClick={handleFollowClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <i className={`ion-${following ? "checkmark" : "plus"}-round`} />
          &nbsp; {following ? "Following" : "Follow"} {followUserName}
        </>
      )}
    </button>
  );
};
