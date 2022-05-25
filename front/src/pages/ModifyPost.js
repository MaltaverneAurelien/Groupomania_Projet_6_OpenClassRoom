import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toastInfo, toastErr } from "../lib/toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ModifyPost.css";

function ModifyPost() {
  const { id } = useParams();
  const userValue = useSelector((state) => state.user.value);
  const [postTitle, setNewPostTitle] = useState("");
  const [postText, setNewPostText] = useState("");
  const [file, setNewFile] = useState(null);
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Récupère les infos du post
     */
    async function fetchPost() {
      const res = await fetch(`http://localhost:8000/api/posts/${id}`);
      const data = await res.json();

      setPost(data);
      setNewPostTitle(data.title);
      setNewPostText(data.postText);
    }
    fetchPost();
  }, []);

  function handleModifyPostTitle(e) {
    setNewPostTitle(e.target.value);
  }
  function handleModifyPostText(e) {
    setNewPostText(e.target.value);
  }

  function handleModifyFile(e) {
    setNewFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  async function handleUpdatePost(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("image", file);
    form.append("title", postTitle);
    form.append("post", postText);

    const res = await fetch(`http://localhost:8000/api/posts/${id}/modify`, {
      method: "POST",
      body: form,
      headers: {
        authorization: "Bearer " + userValue.token,
      },
    });
    if (!res.ok) {
      toastErr("Il y a un problème sur la modification");
      return;
    }
    toastInfo("Le post a été modifié !");
    navigate("/");
  }

  return (
    <div>
      <h1 className="modifyPostTitre">Modifie ton post :</h1>
      <form onSubmit={handleUpdatePost}>
        <div className="row--modify">
          <div className="modifyPost--titre">
            <label htmlFor="title">Titre :</label>
          </div>
          <div className="modifyPost--text">
            <input
              type="text"
              name="title"
              value={postTitle}
              onChange={handleModifyPostTitle}
            />
          </div>
        </div>
        <div className="row--modify">
          <label className="modifyPost--btn">
            <input
              type="file"
              className="input--file"
              accept="image/png, image/jpeg"
              onChange={handleModifyFile}
            />
            Choisir un fichier
          </label>
          {!file && (<div className="row--image--modify">
            <img
              className="image--modify"
              src={`http://localhost:8000/api/posts/${post.id}/image`}
              alt="Image du post"
            />
          </div>
          )}
          {file && (
            <>
              <div className="row--image--modify">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Avatar"
                  className="image--modify"
                />
              </div>
            </>
          )}
        </div>
        <div className="row--modify">
          <div className="modifyPost--titre">
            <label htmlFor="post">Texte :</label>
          </div>
          <div className="modifyPost--text">
            <textarea
              className="modifyTextArea"
              name="text"
              value={postText}
              onChange={handleModifyPostText}
            ></textarea>
          </div>
        </div>
        <div className="row--submit--modifyPost">
          <button className="btn--login">Modifier</button>
        </div>
      </form>
    </div>
  );
}

export default ModifyPost;
