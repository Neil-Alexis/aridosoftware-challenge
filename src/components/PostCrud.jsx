import React, { useState, useEffect } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const PostCrud = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingPost, setEditingPost] = useState(null);

  // Obtener posts al cargar el componente
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 10))) // Solo 10 posts
      .catch((error) => console.error("Error al obtener posts:", error));
  }, []);

  // Crear un nuevo post
  const createPost = () => {
    if (!title.trim() || !body.trim()) {
      alert("El título y el cuerpo no pueden estar vacíos.");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId: 1 }),
    })
      .then((res) => res.json())
      .then((newPost) => {
        setPosts([newPost, ...posts]);
        setTitle("");
        setBody("");
      })
      .catch((error) => console.error("Error al crear post:", error));
  };

  // Actualizar un post
  const updatePost = () => {
    if (!title.trim() || !body.trim()) {
      alert("El título y el cuerpo no pueden estar vacíos.");
      return;
    }

    fetch(`${API_URL}/${editingPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId: 1 }),
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
        setEditingPost(null);
        setTitle("");
        setBody("");
      })
      .catch((error) => console.error("Error al actualizar post:", error));
  };

  // Eliminar un post
  const deletePost = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => console.error("Error al eliminar post:", error));
  };

  return (
    <div className="p-4 container mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-center">Crear Editar Eliminar</h1>
    <div className="mb-4 space-y-2">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />
      <input
        type="text"
        placeholder="Cuerpo"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      />
      {editingPost ? (
        <button
          onClick={updatePost}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Actualizar
        </button>
      ) : (
        <button
          onClick={createPost}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear
        </button>
      )}
    </div>
  
    {/* Lista de posts */}
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-4">{post.body}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setEditingPost(post);
                setTitle(post.title);
                setBody(post.body);
              }}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Editar
            </button>
            <button
              onClick={() => deletePost(post.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};
