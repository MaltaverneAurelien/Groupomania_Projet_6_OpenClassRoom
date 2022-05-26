import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toastInfo } from "../lib/toast";
import "./Profile.css";

function Profile() {
  const userValue = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  /**
   * Permet de supprimer un utilisateur
   */
  // async function userDelete(id) {
  //   const res = await fetch(
  //     `http://localhost:8000/api/user/profile/${id}/delete`
  //   );

  //   if (res.ok) {
  //     navigate("/");
  //   }
  //   toastInfo("L'utilisateur a été suprimmé !");
  // }
  return (
    <div className="profile--container">
      <div className="profile--contact">
        <img
          src={`http://localhost:8000/api/user/${userValue.id}/avatar`}
          alt="Avatar"
          className="avatar--profile"
        />
        <div className="row--profile--text--container">
          <div className="text--profile">
            <div className="name--profile">{userValue.username}</div>
            <div className="email--profile">{userValue.email}</div>
          </div>
          {userValue.admin === 1 && (
            <>
              <div className="profile--btn">
                <button className="profile--delete--btn">
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
