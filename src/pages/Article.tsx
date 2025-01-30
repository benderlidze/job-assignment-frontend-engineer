import { MainLayout } from "layouts/MainLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "../types/Arcticle";
import { UserImage } from "components/UserAvatar";
import { FavoritePostButton } from "components/FavoritePostButton";
import { FollowButton } from "components/FollowButton";

function ArticlePage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    const fetchArticle = async () => {
      const apiEndpoint = process.env.REACT_APP_API_URL + `/articles/${slug}`;
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      if (data.message && data.message === "Not Found") {
      }
      setArticle(data.article);
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  console.log("article", article);

  const formatText = (text: string): JSX.Element[] => {
    return text.split(/\r?\n/).map((line, index) => (
      <p key={index} style={{ textIndent: "2rem" }}>
        {line}
      </p>
    ));
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  const { author, title, favoritesCount, body, favorited, createdAt, updatedAt } = article;
  const date = new Date(createdAt).toDateString();

  return (
    <MainLayout>
      <>
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{title}</h1>

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
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">{formatText(body)}</div>
            </div>

            <hr />

            <div className="article-actions">
              <div className="article-meta">
                <a href="/#/profile/ericsimmons">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="/#/profile/ericsimmons" className="author">
                    Eric Simons
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round" />
                  &nbsp; Follow Eric Simons
                </button>
                &nbsp;
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea className="form-control" placeholder="Write a comment..." rows={3} />
                  </div>
                  <div className="card-footer">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    <button className="btn btn-sm btn-primary">Post Comment</button>
                  </div>
                </form>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  </div>
                  <div className="card-footer">
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      Jacob Schmidt
                    </a>
                    <span className="date-posted">Dec 29th</span>
                  </div>
                </div>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  </div>
                  <div className="card-footer">
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      Jacob Schmidt
                    </a>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
                      <i className="ion-edit" />
                      <i className="ion-trash-a" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MainLayout>
  );
}

export default ArticlePage;
