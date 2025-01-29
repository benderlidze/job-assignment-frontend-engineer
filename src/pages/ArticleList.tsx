import { ArticleListItem } from "components/ArticleListItem";
import { Banner } from "components/Banner";
import { Tabs } from "components/Tabs";
import { Tags } from "components/Tags";
import { MainLayout } from "layouts/MainLayout";
import { useEffect, useState } from "react";
import { Article } from "types/Arcticle";

export function ArticleList(): JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    const limit = 20;
    const offset = 0;

    const apiEndpoint = process.env.REACT_APP_API_URL + `/articles?limit=${limit}&offset=${offset}`;
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    setArticles(data.articles);
    console.log(data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  console.log("articles", articles);

  return (
    <MainLayout>
      <div className="home-page">
        <Banner />
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <Tabs />
              {articles.map(article => (
                <ArticleListItem {...article} key={article.slug} />
              ))}
            </div>
            <div className="col-md-3">
              <Tags />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
