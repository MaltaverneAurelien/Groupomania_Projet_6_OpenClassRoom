import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toastInfo, toastErr } from "../lib/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faEdit,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./Post.css";

function Post() {
  const { id } = useParams();
  const [likes, setLikes] = useState([]);
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const userValue = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Récupère les infos du post
     */
    async function fetchPost() {
      const res = await fetch(`http://localhost:8000/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    }
    /**
     * Récupère les infos des commentaires du post
     */
    async function fetchComment() {
      const res = await fetch(`http://localhost:8000/api/posts/${id}/comments`);
      const data = await res.json();
      console.log(data[0]);
      setComments(data.sort((a, b) => b.id - a.id));
    }
    /**
     * Récupère les likes du post
     */
    async function fetchLikes() {
      const res = await fetch(`http://localhost:8000/api/posts/${id}/likes`);
      const data = await res.json();
      console.log(data);
      setLikes(data);
    }
    fetchPost();
    fetchComment();
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
    navigate("/");
  }
  /**
   * Permet de récupèrer le contenue du commentaire
   */
  function handleCommentText(e) {
    setCommentText(e.target.value);
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
   * Permet d'ajouter un commentaire
   */
  async function handleComment(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/posts/comment", {
      method: "POST",
      body: JSON.stringify({
        postId: id,
        text: commentText,
      }),
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + userValue.token,
      },
    });

    if (!res.ok) {
      toastErr("Il y a un problème sur le commentaire");
      return;
    }
    const data = await res.json();
    setComments([data, ...comments]);
    toastInfo("Le commentaire a été publié !");
  }
  /**
   * Permet de supprimer un commentaire
   */
  async function deleteComment(id) {
    const res = await fetch(
      `http://localhost:8000/api/posts/comment/${id}/delete`
    );

    if (res.ok) {
      setComments(comments.filter((comment) => comment.id !== id));
    }
    toastInfo("Le commentaire a été supprimé !");
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
    console.log(data);

    if (likes.some((like) => like.userId === data.userId)) {
      setLikes(
        likes.map((like) => {
          if (like.userId === data.userId) {
            return data;
          }

          return like;
        })
      );

      return;
    }
    // Ajouter un like
    setLikes([...likes, data]);
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
    <div className="onePost">
      <button className="onePostTitre">
        <Link to="/">Tous les posts</Link>
      </button>
      <div className="post--box">
        <div className="post--image--container">
          {post.image && (
            <img
              className="post--image"
              src={`http://localhost:8000/api/posts/${post.id}/image`}
              alt="Image du post"
            />
          )}
        </div>
        <div className="post--text--container">
          <div className="home--post--username--container">
            <div className="post--username">{post.username}</div>
            <div className="post--date">
              {formatDate(new Date(post.updateAt))}
              {formatHeure(new Date(post.updateAt))}
            </div>
          </div>
          <h1 className="post--title">{post.title}</h1>
          <p className="post--text">{post.postText}</p>
          <div className="post--btn--container">
            <div className="like--box">
              <span
                className="like--style"
                onClick={() => handleLike(id, userValue.token, true)}
              >
                <FontAwesomeIcon icon={faThumbsUp} /> {calcLikes(likes, 1)}
              </span>
              <span
                className="dislike--style"
                onClick={() => handleLike(id, userValue.token, false)}
              >
                <FontAwesomeIcon icon={faThumbsDown} /> {calcLikes(likes, 0)}
              </span>
            </div>
            {(post.userId === userValue.id || userValue.admin === 1) && (
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
      {userValue.token && (
        <form onSubmit={handleComment} className="comment--box">
          <h2 className="comment--username">Commentaires</h2>
          <textarea
            className="commentTextArea"
            name="text"
            value={commentText}
            onChange={handleCommentText}
            placeholder="Rédigez un commentaire..."
          />
          <div className="comment--btn--publier">
            <button type="submit" className="btn--home--user">
              Publier
            </button>
          </div>
        </form>
      )}
      {comments.map((comment) => (
        <>
          <div className="comment--list">
            <div className="comment--list--username--container">
              <div className="comment--list--username">
                {comment.username} à dit :
              </div>
              <div className="comment--list--date">
                {formatDate(new Date(comment.updateAt))}
                {formatHeure(new Date(comment.updateAt))}
              </div>
            </div>
            <p className="comment--list--text">{comment.text}</p>
            {(comment.userId === userValue.id || userValue.admin === 1) && (
              <>
                <div className="comment--list--btn">
                  <Link
                    to={`/comment/${comment.id}/modify`}
                    className="comment--list--btn--modify"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <button
                    className="comment--list--btn--modify"
                    onClick={() => deleteComment(comment.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      ))}
    </div>
  );
}

export default Post;
