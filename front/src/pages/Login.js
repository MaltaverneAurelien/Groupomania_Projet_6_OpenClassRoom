import { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateData, updateToken } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toastErr, toastSuccess } from "../lib/toast";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleForm(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      toastErr("L'utilisateur et/ou le mot de passe est incorrecte");
      return;
    }
    // On récupère le token et on le sauvegarde dans le localstorage
    const userData = await res.json();
    console.log("Token userData :", userData);
    const userDataStr = JSON.stringify(userData);
    localStorage.setItem("userData", userDataStr);
    // On sauvegarde le token également dans le store
    dispatch(updateToken(userData.token));
    UpdateData();
    toastSuccess("Vous êtes connecté !");
    navigate("/");
  }

  return (
    <div>
      <h1 className="loginTitre">Connectez-vous :</h1>
      <form onSubmit={handleForm}>
        <div className="row--login">
          <div className="login--col-15">
            <label htmlFor="name">Username :</label>
          </div>
          <div className="login--col-75">
            <input
              id="name"
              type="text"
              name="name"
              value={username}
              onChange={handleUsername}
              placeholder="Name"
            />
          </div>
        </div>
        <div className="row--login">
          <div className="login--col-15">
            <label htmlFor="password">Password :</label>
          </div>
          <div className="login--col-75">
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="Votre mot de passe"
            />
          </div>
        </div>
        <div className="row--submit--login">
          <button type="submit" className="btn--login">
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
