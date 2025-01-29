import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { ArticleList } from "pages/ArticleList";
import Article from "pages/Article";
import Editor from "pages/Editor";
import LoginRegister from "pages/LoginRegister";
import Login from "pages/Login";
import Logout from "pages/Logout";
import Profile from "pages/Profile";
import Settings from "pages/Settings";
import { AuthProvider } from "hooks/useAuth";

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/editor" exact component={Editor} />
          <Route path="/editor/:slug" exact component={Editor} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/profile/:username" exact component={Profile} />
          <Route path="/profile/:username/favorites" exact component={Profile} />
          <Route path="/register" exact component={LoginRegister} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/:slug" exact component={Article} />
          <Route path="/" component={ArticleList} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
