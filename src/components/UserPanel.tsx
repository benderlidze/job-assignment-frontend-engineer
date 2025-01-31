import { Article } from "types/Article";
import { FavoritePostButton } from "./FavoritePostButton";
import { FollowButton } from "./FollowButton";
import { UserImage } from "./UserAvatar";
import { useArticle } from "providers/ArticleProvider";

export const UserPanel = (): JSX.Element => {
  const { article, setArticle } = useArticle();
  const {
    author: { username, image, following },
    createdAt,
    slug,
    favoritesCount,
    favorited,
  } = article as Article;
  const date = new Date(createdAt).toDateString();

  if (!article) return <></>;

  return (
    <>
      <div className="article-meta">
        <UserImage username={username} image={image} />
        <div className="info">
          <a href={`/#/profile/${username}`} className="author">
            {username}
          </a>
          <span className="date">{date}</span>
        </div>
        <FollowButton followUserName={username} followingStatus={following} setArticle={setArticle} />
        &nbsp;&nbsp;
        <FavoritePostButton
          slug={slug}
          favoritesCount={favoritesCount}
          favoriteStatus={favorited}
          articleAuthorUsername={username}
          setArticle={setArticle}
        />
      </div>
    </>
  );
};
