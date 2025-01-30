import { MainLayout } from "layouts/MainLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "../types/Arcticle";
import { UserPanel } from "components/UserPanel";

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

  const { title, body } = article;

  return (
    <MainLayout>
      <>
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{title}</h1>
              <UserPanel article={article} />
            </div>
          </div>
          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">{formatText(body)}</div>
            </div>
            <hr />
            <div className="article-actions">
              <UserPanel article={article} />
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
