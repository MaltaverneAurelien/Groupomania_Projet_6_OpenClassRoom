import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import ModifyPost from "./pages/ModifyPost";
import ModifyComment from "./pages/ModifyComment";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

import { useDispatch } from 'react-redux';
import { updateToken, UpdateData } from './store/userSlice';
import { ToastContainer } from "react-toastify";

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch()

  if(userData === null) {
    console.log("Pas de localstorage", localStorage);
  } else {
    dispatch(updateToken(userData.token))
  }

  UpdateData()
  
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route className="form" path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />

          <Route path="profile/settings" element={<Settings />} />

          <Route path="posts/create" element={<CreatePost />} />
          <Route path="post/:id/modify" element={<ModifyPost />} />
          <Route path="post/:id" element={<Post />} />

          <Route path="comment/:id/modify" element={<ModifyComment />} />
        </Routes>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
}

export default App;
