import { useAuth } from "hooks/useAuth";
import { useState } from "react";
import { Article } from "types/Arcticle";

type FavoritePostButtonProps = {
  postSlug: string;
  favoritesCount: number;
  favorited: boolean;
};

export const FavoritePostButton = ({ postSlug, favoritesCount, favorited }: FavoritePostButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(favorited);
  const [isLoading, setIsLoading] = useState(false);
  const [favoritesCountState, setFavoritesCountState] = useState(favoritesCount);

  const { user } = useAuth();
  if (!user) return null;

  const favoriteButtonClick = async () => {
    console.log("isFavorite", isFavorite);
    setFavoriteState(postSlug, !isFavorite);
  };

  const setFavoriteState = async (slug: string, isFavorite: boolean) => {
    setIsLoading(true);
    const method = isFavorite ? "POST" : "DELETE";
    const apiEndpoint = process.env.REACT_APP_API_URL + `/articles/${slug}/favorite`;
    console.log("method", method);

    const response = await fetch(apiEndpoint, {
      method: method,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "",
    });
    const data = await response.json();
    if (data.errors) {
      console.error(data.errors);
    }

    console.log("data Favorite", data);
    if (data.article) {
      setIsFavorite(data.article.favorited);
      setFavoritesCountState(data.article.favoritesCount);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
  };

  return (
    <button className="btn btn-sm btn-outline-primary" onClick={favoriteButtonClick} disabled={isLoading}>
      {isLoading ? "Loading..." : isFavorite ? <i className="ion-heart" /> : ""}
      {!isLoading && (
        <>
          &nbsp; Favorite Post <span className="counter">({favoritesCountState})</span>
        </>
      )}
    </button>
  );
};
