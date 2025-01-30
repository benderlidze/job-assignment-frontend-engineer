import { Article } from "types/Arcticle";
import { FavoritePostButton } from "./FavoritePostButton";
import { FollowButton } from "./FollowButton";
import { UserImage } from "./UserAvatar";

export const UserPanel = ({ article }: { article: Article }): JSX.Element => {
  const { author, createdAt, slug, favoritesCount, favorited } = article;
  const date = new Date(createdAt).toDateString();
  return (
    <>
      <div className="article-meta">
        <UserImage username={author.username} image={author.image} />
        <div className="info">
          <a href="/#/profile/ericsimmons" className="author">
            {author.username}
          </a>
          <span className="date">{date}</span>
        </div>
        <FollowButton postSlug={slug} authorName={author.username} following={author.following} />
        &nbsp;&nbsp;
        <FavoritePostButton postSlug={slug} favoritesCount={favoritesCount} favorited={favorited} />
      </div>
    </>
  );
};
