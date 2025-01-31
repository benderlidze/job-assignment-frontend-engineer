import { ArticleListItem } from "components/ArticleListItem";
import { MainLayout } from "layouts/MainLayout";
import { useState, useEffect } from "react";
import { Article } from "types/Article";
import { useParams } from "react-router-dom";
import { Profile } from "types/Profile";
import { UserImage } from "components/UserAvatar";
import { FollowButton } from "components/FollowButton";

type ArticlesResponse = {
  articles: Article[];
};

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [profile, setProfile] = useState<Profile>();
  const [isLoading, setIsLoading] = useState(true);
  const [articlesError, setArticlesError] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const limit = 20;
        const offset = 0;
        const apiEndpoint = process.env.REACT_APP_API_URL + `/articles?limit=${limit}&offset=${offset}`;
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }

        const data = (await response.json()) as ArticlesResponse;
        const filteredArticles = data.articles.filter((article: Article) => article.author.username === username);

        setArticles(filteredArticles);
        setArticlesError(null);
      } catch (err) {
        setArticlesError(err instanceof Error ? err.message : "Failed to load articles");
      }
    };

    const fetchProfile = async () => {
      try {
        const apiEndpoint = process.env.REACT_APP_API_URL + `/profiles/${username}`;
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const { profile } = await response.json();
        setProfile(profile);
        setProfileError(null);
      } catch (err) {
        setProfileError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchArticles();
    fetchProfile();
  }, [username]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="text-center m-3">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="profile-page">
        {profileError && (
          <div className="alert alert-danger m-3" role="alert">
            {profileError}
          </div>
        )}

        {!profileError && profile && (
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
            {profile && <FollowButton followUserName={profile?.username} followingStatus={profile?.following} />}
          </div>
        )}

        {articlesError && (
          <div className="alert alert-danger m-3" role="alert">
            {articlesError}
          </div>
        )}

        {!articlesError && (
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                {articles.length === 0 ? (
                  <p className="text-center">No articles found</p>
                ) : (
                  articles.map(article => <ArticleListItem {...article} key={article.slug} />)
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
