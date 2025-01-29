import { useAuth } from "hooks/useAuth";
import { MainLayout } from "layouts/MainLayout";
import { useState } from "react";

export default function LoginRegister() {
  const [error, setError] = useState("");

  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("I_<3-R0ber7");

  const { user, login } = useAuth();

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
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            setError("Invalid credentials");
          }
          if (response.status === 422) {
            setError("Unexpected error");
          }
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then(data => {
        // Save user data to local storage and state
        login(data.user);
        // Redirect to home page
        window.location.href = "/";
      })
      .catch(error => {
        setError("Error logging in: " + error);
      });
  };

  return (
    <MainLayout>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>

              {error && <ul className="error-messages">{error}</ul>}

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
