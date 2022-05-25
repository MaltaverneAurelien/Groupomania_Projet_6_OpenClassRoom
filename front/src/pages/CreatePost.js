import { useState } from "react";
import { useSelector } from "react-redux";
import { toastInfo, toastErr } from "../lib/toast";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

function CreatePost() {
  const userValue = useSelector((state) => state.user.value);
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  function handlePostTitle(e) {
    setPostTitle(e.target.value);
  }
  function handlePostText(e) {
    setPostText(e.target.value);
  }

  function handleFile(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  async function handleForm(e) {
    e.preventDefault();

    const form = new FormData();
    form.append("image", file);
    form.append("title", postTitle);
    form.append("post", postText);
    
    const res = await fetch("http://localhost:8000/api/posts/createPost", {
      method: "POST",
      body: form,
      headers: {
        authorization: "Bearer " + userValue.token,
      },
    });
    if (!res.ok) {
      toastErr("Il y a un problème sur le post");
      return;
    }
    toastInfo("Le post a été publié !");
    navigate("/");
  }

  return (
    <div>
      <h1 className="createPostTitre">Créer ton post :</h1>
      <form onSubmit={handleForm}>
        <div className="row--create">
          <div className="createPost--titre">
            <label htmlFor="title">Titre :</label>
          </div>
          <div class="createPost--text">
            <input
              type="text"
              name="title"
              value={postTitle}
              onChange={handlePostTitle}
              placeholder="Titre du post"
            />
          </div>
        </div>
        <div className="row--create">
          <label className="createPost--btn">
            <input
              type="file"
              className="input--file"
              accept="image/png, image/jpeg"
              onChange={handleFile}
            />
            Choisir un fichier
          </label>
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
        <div className="row--create">
          <div className="createPost--titre">
            <label for="post">Texte :</label>
          </div>
          <div className="createPost--text">
            <textarea
              className="createTextArea"
              name="text"
              value={postText}
              onChange={handlePostText}
              placeholder="Votre texte..."
            ></textarea>
          </div>
        </div>
        <div className="row--submit--post">
          <button className="btn--login">Publier</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
