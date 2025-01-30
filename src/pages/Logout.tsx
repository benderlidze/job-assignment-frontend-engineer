import { useEffect } from "react";
import { useAuth } from "providers/useAuth";
import { MainLayout } from "layouts/MainLayout";

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <MainLayout>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">You have been logged out</h1>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
