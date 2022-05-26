import React from "react";
import { Link } from "react-router-dom";
import { updateToken, UpdateData } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userValue = useSelector((state) => state.user.value);
  console.log("Uservalue :", userValue);
  UpdateData();

  function disconnect() {
    localStorage.removeItem("userData");
    dispatch(updateToken(""));
    navigate("/");
  }

  return (
    <nav>
      <ul className="nav--home">
        <li>
          <Link to="/">Accueil</Link>
        </li>
      </ul>
      <ul className="nav--items">
        {userValue.token && (
          <>
            <li>
              <img
                src={`http://localhost:8000/api/user/${userValue.id}/avatar`}
                alt="Avatar"
                className="avatar--navbar"
              />
            </li>
            <li>
              <Link to={`/profile/${userValue.id}`}>{userValue.username}</Link>
            </li>
            <li>
              <Link to="/profile/settings">
                <FontAwesomeIcon icon={faCog} />
              </Link>
            </li>
            <li onClick={disconnect}>
              <Link to="home">Déconnexion</Link>
            </li>
          </>
        )}
        {!userValue.token && (
          <>
            <li>
              <Link to="signup">Inscription</Link>
            </li>
            <li>
              <Link to="login">Connexion</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
