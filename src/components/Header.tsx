import { useAuth } from "hooks/useAuth";

export default function ArticleList(): JSX.Element {
  const { user } = useAuth();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/#">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" class when you're on that page" */}
            <a className="nav-link active" href="/#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#/editor">
              <i className="ion-compose" />
              &nbsp;New Article
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#/settings">
              <i className="ion-gear-a" />
              &nbsp;Settings
            </a>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link font-weight-bold">{user.username}</span>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/#/logout">
                  Log out
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a className="nav-link " href="/#/login">
                  Sign in
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#/register">
                  Sign up
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
