import { MainLayout } from "layouts/MainLayout";
import { useState } from "react";

export default function LoginRegister() {
  const [isError, setIsError] = useState(false);

  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("I_<3-R0ber7");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email", email);

    fetch(process.env.REACT_APP_API_URL + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        if (data.errors) {
          setIsError(true);
        }
      });
      
  };

  return (
    <MainLayout>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <a href="/">Have an account?</a>
              </p>

              {isError && (
                <ul className="error-messages">
                  <li>That email is already taken</li>
                </ul>
              )}

              <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
