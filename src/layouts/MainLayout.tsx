import { Footer } from "components/Footer";
import Header from "components/Header";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
  showBanner?: boolean;
  showTags?: boolean;
};

export function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
