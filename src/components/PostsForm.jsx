import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Si estamos editando, obtener los datos del post
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setBody(data.body);
        })
        .catch((error) => console.error('Error al cargar el post', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = { title, body };

    if (id) {
      // Editar el post existente
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          navigate(`/`); // Redirige a la lista de posts después de editar
        })
        .catch((error) => console.error('Error al editar el post', error));
    } else {
      // Crea una nueva publicación
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {
          navigate(`/`); 
        })
        .catch((error) => console.error('Error al crear el post', error));
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
      {id ? 'Editar Publicación' : 'Crear Publicación'}
    </h2>
  
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
  
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-2">Contenido</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows="5"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
  
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
      >
        {id ? 'Actualizar' : 'Crear'}
      </button>
  
    </form>
  </div>
  
  );
}

export default PostForm;
