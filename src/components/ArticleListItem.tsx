import type { Article } from "types/Article";
import { UserImage } from "./UserAvatar";
import { FavoritePostButton } from "./FavoritePostButton";
import { ArticleProvider } from "providers/ArticleProvider";

export function ArticleListItem(article: Article): JSX.Element {
  const {
    author: { username, image },
    title,
    description,
    createdAt,
    slug,
  } = article;

  const date = new Date(createdAt).toDateString();

  return (
    <div className="article-preview">
      <div className="article-meta">
        <UserImage username={username} image={image} />
        <div className="info">
          <a href="/#/profile/ericsimmons" className="author">
            {username}
          </a>
          <span className="date">{date}</span>
        </div>
        <div className=" pull-xs-right">
          <ArticleProvider initialArticle={article}>
            <FavoritePostButton size="sm" />
          </ArticleProvider>
        </div>
      </div>
      <a href={`/#/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </a>
    </div>
  );
}
