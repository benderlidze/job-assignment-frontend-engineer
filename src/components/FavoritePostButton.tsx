import { useAuth } from "providers/useAuth";
import { useEffect, useState } from "react";
import { Article } from "types/Article";

type FavoritePostButtonProps = {
  slug: string;
  favoritesCount: number;
  favoriteStatus: boolean;
  articleAuthorUsername: string;
  size?: "sm" | "lg";
  setArticle?: React.Dispatch<React.SetStateAction<Article>>;
};

export const FavoritePostButton = ({
  slug,
  favoritesCount,
  favoriteStatus,
  articleAuthorUsername,
  size = "lg",
  setArticle,
}: FavoritePostButtonProps) => {
  const [favorited, setFavorited] = useState(favoriteStatus);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setFavorited(favoriteStatus);
  }, [favoriteStatus]);

  if (!user) return null;
  if (user.username === articleAuthorUsername) return null;

  const favoriteButtonClick = async () => {
    try {
      await setFavoriteState(!favorited);
    } catch (error) {
      console.error("Failed to toggle favorite status:", error);
    }
  };

  const setFavoriteState = async (shouldFavorite: boolean) => {
    setIsLoading(true);
    try {
      const method = shouldFavorite ? "POST" : "DELETE";
      const apiEndpoint = `${process.env.REACT_APP_API_URL}/articles/${slug}/favorite`;

      const response = await fetch(apiEndpoint, {
        method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const data = await response.json();

      if (data.errors) {
        throw new Error(Object.values(data.errors).flat().join(", "));
      }

      if (data.article) {
        setFavorited(data.article.favorited);

        if (typeof setArticle === "function") {
          setArticle((article: Article) => ({
            ...article,
            favorited: data.article.favorited,
            favoritesCount: data.article.favoritesCount,
          }));
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="btn btn-sm btn-outline-primary" onClick={favoriteButtonClick} disabled={isLoading}>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {favorited && <i className="ion-heart" />}
          &nbsp; {size === "sm" ? "" : "Favorite Post"} <span className="counter">({favoritesCount})</span>
        </>
      )}
    </button>
  );
};
