import { useArticle } from "providers/ArticleProvider";
import { useAuth } from "providers/useAuth";
import { useState } from "react";
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

export const FollowButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { article, setArticle } = useArticle();

  const {
    slug,
    author: { following, username },
  } = article as Article;

  if (!user || !article) return null;

  if (user.username === article.author.username) return null;

  const handleFollowClick = async () => {
    try {
      await toggleFollowStatus(slug, !following);
    } catch (error) {
      console.error("Failed to toggle follow status:", error);
    }
  };

  const toggleFollowStatus = async (slug: string, shouldFollow: boolean): Promise<void> => {
    setIsLoading(true);
    try {
      const method = shouldFollow ? "POST" : "DELETE";
      const apiEndpoint = `${process.env.REACT_APP_API_URL}/profiles/${username}/follow`;

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
        setArticle({
          ...article,
          author: {
            ...article.author,
            following: data.profile.following,
          },
        });
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
          &nbsp; {following ? "Following" : "Follow"} {username}
        </>
      )}
    </button>
  );
};
