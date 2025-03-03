import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostsList from "./components/PostList";
import PostDetail from "./components/PostsDetail";
import PostForm from "./components/PostsForm";
import { PostCrud } from "./components/PostCrud"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/edit/:id" element={<PostForm />} />
        <Route path="/crud" element={<PostCrud />} /> 
      </Routes>
    </Router>
  );
}

export default App;
