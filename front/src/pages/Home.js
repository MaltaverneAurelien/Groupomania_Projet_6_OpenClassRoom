import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faThumbsUp,
  faThumbsDown,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { toastErr, toastInfo } from "../lib/toast";
import "./Home.css";

function Home() {
  const userValue = useSelector((state) => state.user.value);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    /**
     * Renvoyer le nombre de comms d'un post
     */
    async function fetchComments(id) {
      const res = await fetch(`http://localhost:8000/api/posts/${id}/comments`);
      const data = await res.json();

      return data.length;
    }
    /**
     * Renvoyer le nombre de posts
     */
    async function fetchPosts() {
      const res = await fetch("http://localhost:8000/api/posts");
      const data = await res.json();

      for (let i = 0; i < data.length; i++) {
        data[i].comments = await fetchComments(data[i].id);
        data[i].likes = await fetchLikes(data[i].id);
      }
      setPosts(data);
      console.log("setPosts :", data);
    }
    /**
     * Récupère les likes du post
     */
    async function fetchLikes(id) {
      const res = await fetch(`http://localhost:8000/api/posts/${id}/likes`);
      const data = await res.json();

      return data;
    }

    fetchPosts();
    fetchLikes();
  }, []);
  /**
   * Permet de supprimer un post
   */
  async function deletePost(id) {
    const res = await fetch(`http://localhost:8000/api/posts/${id}/delete`);

    if (res.ok) {
      setPosts(posts.filter((posts) => posts.id !== id));
    }
    toastInfo("Le post a été suprimmé !");
  }
  /**
   * Permet de récupèrer la liste des likes = 1 et dislikes = 0
   */
  function calcLikes(likes, n) {
    let like = 0;

    for (let i = 0; i < likes.length; i++) {
      if (likes[i].value === n) like++;
    }
    return like;
  }
  /**
   * Permet d'ajouter un like / dislike
   */
  async function handleLike(id, token, value) {
    const res = await fetch(`http://localhost:8000/api/posts/${id}/like`, {
      method: "POST",
      body: JSON.stringify({
        postId: parseInt(id),
        value: value,
      }),
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      toastErr("Il y a un problème sur le like");
      return;
    }

    const data = await res.json();
    const index = posts.findIndex((post) => post.id === id);
    console.log(data);

    // Modifier le like si l'user a déjà like le post
    if (posts[index].likes.some((like) => like.userId === data.userId)) {
      setPosts(
        posts.map((post) => {
          if (post.id === id) {
            const likes = post.likes.map((like) => {
              if (like.userId === data.userId) {
                return data;
              }

              return like;
            });

            post.likes = likes;
          }

          return post;
        })
      );
      return;
    }
    // Ajouter un like si l'user n'a pas déjà like le post
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          post.likes.push(data);
        }

        return post;
      })
    );
  }
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
    <div className="home">
      <img src="/images/icon_nav.svg" className="home--logo" />
      <div className="home--post">
        <h3 className="homeTitre">Tous les posts</h3>
        {userValue.token && (
          <>
            <Link to="/posts/create" className="btn--cree">
              Créer
            </Link>
          </>
        )}
      </div>
      <>
        {posts
          .sort(function(a, b){
            return new Date(b.updateAt) - new Date(a.updateAt);
          })
          .map((post) => (
            <>
              <div className="home--post--user">
                {post.image && (
                  <div className="home--image--container">
                    <Link to={`/post/${post.id}`}>
                      <img
                        className="home--image"
                        src={`http://localhost:8000/api/posts/${post.id}/image`}
                        alt="Image du post"
                      />
                    </Link>
                  </div>
                )}
                <div className="home--text--container">
                  <Link to={`/post/${post.id}`} className="home--link ">
                    <div className="home--post--username--container">
                      <div className="home--post--username">
                        {post.username}
                      </div>
                      <div className="home--post--date">
                        {formatDate(new Date(post.updateAt))}{formatHeure(new Date(post.updateAt))}
                      </div>
                    </div>
                    <span className="home--post--title">{post.title}</span>
                    <p className="home--post--text">{post.postText}</p>
                  </Link>
                  <div className="home--post--btn">
                    <div className="home-mobile--btn">
                      <span className="comment--style">
                        <FontAwesomeIcon icon={faComment} /> {post.comments}
                      </span>
                      <span
                        className="like--style"
                        onClick={() =>
                          handleLike(post.id, userValue.token, true)
                        }
                      >
                        <FontAwesomeIcon icon={faThumbsUp} />{" "}
                        {calcLikes(post.likes, 1)}
                      </span>
                      <span
                        className="dislike--style"
                        onClick={() =>
                          handleLike(post.id, userValue.token, false)
                        }
                      >
                        <FontAwesomeIcon icon={faThumbsDown} />{" "}
                        {calcLikes(post.likes, 0)}
                      </span>
                    </div>
                    {(post.userId === userValue.id ||
                      userValue.admin === 1) && (
                      <>
                        <div className="btn--post">
                          <Link
                            to={`/post/${post.id}/modify`}
                            className="modify--style"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                          <button
                            className="modify--style"
                            onClick={() => deletePost(post.id)}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ))}
      </>
    </div>
  );
}

export default Home;
