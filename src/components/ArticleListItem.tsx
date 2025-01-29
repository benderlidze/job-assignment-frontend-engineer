import type { Article } from "types/Arcticle";
import { UserImage } from "./UserAvatar";

export function ArticleListItem(article: Article): JSX.Element {
  console.log("article111111", article);

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
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> 29
        </button>
      </div>
      <a href={`/#/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </a>
    </div>
  );
}
