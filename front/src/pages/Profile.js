import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

function Profile() {
  const userValue = useSelector((state) => state.user.value);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    /**
     * Renvoyer le nombre de posts
     */
    async function fetchPosts() {
      const res = await fetch("http://localhost:8000/api/posts");
      const data = await res.json();

      setPosts(data);
    }
    fetchPosts();
  }, []);
  /**
   * Rajoute un 0 au début du nombre si < 10
   * @param {number} num
   */
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  /**
   * Formate la date au format DD.MM.YYYY
   */
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join(".");
  }
  function formatHeure(hours) {
    return [
      padTo2Digits(" " + hours.getHours() + "h"),
      padTo2Digits(hours.getMinutes()),
    ];
  }
  return (
    <div className="profile--container">
      <div className="profile--contact">
        <img
          src={`http://localhost:8000/api/user/${userValue.id}/avatar`}
          alt="Avatar"
          className="avatar--profile"
        />
        <div className="row--profile--container">
          <div className="name--profile">{userValue.username}</div>
          <div className="email--profile">{userValue.email}</div>
          {userValue.admin === 1 && (
            <>
              <div className="btn--post">
                <button className="modify--style">
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="profile--post">
        <>
          {posts
            .sort((a, b) => b.id - a.id)
            .map((post) => (
              <>
                <div className="profile--post--user">
                  {post.image && (
                    <div className="profile--post--image">
                      <Link to={`/post/${post.id}`}>
                        <img
                          className="home--image"
                          src={`http://localhost:8000/api/posts/${post.id}/image`}
                          alt="Image du post"
                        />
                      </Link>
                    </div>
                  )}
                  <div className="profile--post--text">
                    <Link to={`/post/${post.id}`} className="home--link">
                      <div className="home--post--username--container">
                        <div className="home--post--username">
                          {post.username}
                        </div>
                        <div className="home--post--date">
                          {formatDate(new Date(post.updateAt))}
                          {formatHeure(new Date(post.updateAt))}
                        </div>
                      </div>
                      <span className="home--post--title">{post.title}</span>
                      <p className="home--post--text">{post.postText}</p>
                    </Link>
                  </div>
                </div>
              </>
            ))}
        </>
      </div>
    </div>
  );
}

export default Profile;
