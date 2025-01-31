import { MainLayout } from "layouts/MainLayout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "../types/Article";
import { UserPanel } from "components/UserPanel";
import { ArticleProvider } from "providers/ArticleProvider";
import { Comments } from "components/Comments";

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
      <ArticleProvider initialArticle={article}>
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{title}</h1>
              <UserPanel  />
            </div>
          </div>
          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">{formatText(body)}</div>
            </div>
            <hr />
            <div className="article-actions">
              <UserPanel />
            </div>
            <Comments />
          </div>
        </div>
      </ArticleProvider>
    </MainLayout>
  );
}

export default ArticlePage;
