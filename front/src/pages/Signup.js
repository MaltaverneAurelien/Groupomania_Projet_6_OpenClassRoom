import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateToken, UpdateData } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toastErr, toastSuccess } from "../lib/toast";
import "./Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  async function handleForm(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toastErr("Les mots de passes ne sont pas identique !");
      return;
    }
    const res = await fetch("http://localhost:8000/api/user/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        admin: false,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.log(error);
      setError(error);
      toastErr("Il y a une erreur");
      return;
    }
    // On récupère le token et on le sauvegarde dans le localstorage
    const userData = await res.json();
    console.log("Token:", userData);
    const userDataStr = JSON.stringify(userData);
    localStorage.setItem("userData", userDataStr);
    // On sauvegarde le token également dans le store
    dispatch(updateToken(userData.token));

    UpdateData();
    toastSuccess("Inscription réussi !");
    navigate("/");
  }

  return (
    <div>
      <h1 className="signupTitre">Créez votre compte Groupomania :</h1>
      <form onSubmit={handleForm}>
        <div className="row--signup">
          <div className="signup--col-15">
            <label htmlFor="name">Username :</label>
          </div>
          <div className="signup--col-75">
            <input
              required
              type="text"
              name="name"
              value={username}
              onChange={handleUsername}
              placeholder="Name"
            />
            <span className="signup--error--msg">{error.type === "username" && error.error}</span>
          </div>
        </div>
        <div className="row--signup">
          <div className="signup--col-15">
            <label fohtmlFor="email">Email :</label>
          </div>
          <div className="signup--col-75">
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="exemple@gmail.com"
            />
          </div>
        </div>
        <div className="row--signup">
          <div className="signup--col-15">
            <label htmlFor="password">Password :</label>
          </div>
          <div className="signup--col-75">
            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="Votre mot de passe"
            />
            <span className="signup--error--msg">{error.type === "password" && error.error}</span>
          </div>
        </div>
        <div className="row--signup">
          <div className="signup--col-15">
            <label htmlFor="confirm_password">Confirm Password :</label>
          </div>
          <div className="signup--col-75">
            <input
              required
              type="password"
              name="confirm_password"
              onChange={handleConfirmPassword}
              placeholder="Confirmer votre mot de passe"
            />
          </div>
        </div>
        <div className="row--submit--signup">
          <button type="submit" className="btn--signup">
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
