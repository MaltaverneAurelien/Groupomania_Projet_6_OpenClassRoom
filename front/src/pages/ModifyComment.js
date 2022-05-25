import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toastInfo, toastErr } from "../lib/toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ModifyComment.css";

function ModifyComment() {
  const { id } = useParams();
  const userValue = useSelector((state) => state.user.value);
  const [commentText, setNewCommentText] = useState("");
  const [comment, setComment] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Récupère les infos du commentaire du post
     */
    async function fetchComment() {
      const res = await fetch(`http://localhost:8000/api/posts/comment/${id}`);
      const data = await res.json();
      console.log("Comment value :", data);

      setComment(data)
      setNewCommentText(data.text);
    }
    fetchComment();
  }, []);

  function handleModifyCommentText(e) {
    setNewCommentText(e.target.value);
  }

  async function handleUpdateComment(e) {
    e.preventDefault();

    const res = await fetch(`http://localhost:8000/api/posts/comment/${id}/modify`, {
      method: "POST",
      body: JSON.stringify({
        text: commentText,
      }),
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + userValue.token,
      },
    });
    if (!res.ok) {
      toastErr("Il y a un problème sur la modification");
      return;
    }

    toastInfo("Le commentaire a été modifié !");
    navigate(`/post/${comment.postId}`);
  }

  return (
    <div>
      <h1 className="modifyPostTitre">Modifie ton commentaire :</h1>
      <form onSubmit={handleUpdateComment}>
        <div className="row--modify--comment">
          <div className="modifyPost--titre">
            <label htmlFor="title">Texte :</label>
          </div>
          <div className="modifyPost--text">
            <textarea
              className="commentModifyTextArea"
              type="text"
              name="title"
              value={commentText}
              onChange={handleModifyCommentText}
            />
          </div>
          <div className="comment--btn--modify">
            <button type="submit" className="btn--home--user">
              Modifier
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ModifyComment;
