import { Article } from "types/Article";
import { FavoritePostButton } from "./FavoritePostButton";
import { FollowButton } from "./FollowButton";
import { UserImage } from "./UserAvatar";
import { useArticle } from "providers/ArticleProvider";

export const UserPanel = (): JSX.Element => {
  const { article } = useArticle();
  const {
    author: { username, image },
    createdAt,
  } = article as Article;
  const date = new Date(createdAt).toDateString();

  return (
    <>
      <div className="article-meta">
        <UserImage username={username} image={image} />
        <div className="info">
          <a href="/#/profile/ericsimmons" className="author">
            {username}
          </a>
          <span className="date">{date}</span>
        </div>
        <FollowButton />
        &nbsp;&nbsp;
        <FavoritePostButton />
      </div>
    </>
  );
};
