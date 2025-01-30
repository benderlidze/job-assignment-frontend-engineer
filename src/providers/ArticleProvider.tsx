import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Article } from "types/Article";

type ArticleContextType = {
  article: Article | undefined;
  setArticle: Dispatch<SetStateAction<Article>>;
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider = ({
  children,
  initialArticle,
}: {
  children: React.ReactNode;
  initialArticle: Article;
}) => {
  const [article, setArticle] = useState<Article>(initialArticle);

  return (
    <ArticleContext.Provider
      value={{
        article,
        setArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export function useArticle() {
  const context = useContext(ArticleContext);
  if (!context) throw new Error("useArticle must be used within ArticleProvider");
  return context;
}
