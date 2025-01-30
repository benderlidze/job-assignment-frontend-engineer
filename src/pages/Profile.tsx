import { ArticleListItem } from "components/ArticleListItem";
import { MainLayout } from "layouts/MainLayout";
import { useState, useEffect } from "react";
import { Article } from "types/Article";
import { useParams } from "react-router-dom";
import { Profile } from "types/Profile";
import { UserImage } from "components/UserAvatar";
import { FollowButton } from "components/FollowButton";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const fetchArticles = async () => {
      const limit = 20;
      const offset = 0;
      const apiEndpoint = process.env.REACT_APP_API_URL + `/articles?limit=${limit}&offset=${offset}`;
      const response = await fetch(apiEndpoint);
      const data = (await response.json()) as { articles: Article[] };
      setArticles(data.articles.filter(article => article.author.username === username));
    };

    const fetchProfile = async () => {
      const apiEndpoint = process.env.REACT_APP_API_URL + `/profiles/${username}`;
      const response = await fetch(apiEndpoint);
      const { profile } = (await response.json()) as { profile: Profile };
      setProfile(profile);
    };

    fetchArticles();
    fetchProfile();
  }, [username]);

  return (
    <MainLayout>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                {profile && (
                  <>
                    <UserImage username={profile.username} image={profile.image} />
                    <h4>{profile.username}</h4>
                    <p>{profile.bio}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              {articles.map(article => (
                <ArticleListItem {...article} key={article.slug} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
