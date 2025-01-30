import { useArticle } from "providers/ArticleProvider";
import { useAuth } from "providers/useAuth";
import { useState } from "react";
import { Article } from "types/Article";

type FavoritePostButtonProps = {
  size?: "sm" | "lg";
};

export const FavoritePostButton = ({ size = "lg" }: FavoritePostButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { article, setArticle } = useArticle();

  const { slug, favoritesCount, favorited } = article as Article;

  if (!user || !article) return null;

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
        setArticle({
          ...article,
          favorited: data.article.favorited,
          favoritesCount: data.article.favoritesCount,
        });
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
