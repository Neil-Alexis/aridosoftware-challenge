import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setAuthor(data));

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [id]);

  if (!post || !author) return <div>Cargando...</div>;

  return (
    <div className='container mx-auto max-w-2xl p-6 bg-cyan-200 rounded-lg shadow-xl'>

    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-slate-800">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.body}</p>
      <p className="text-sm text-gray-600 mb-6">
        <strong>Autor:</strong> {author.name}
      </p>
  
      <h3 className="text-xl font-semibold mt-4 mb-3 text-slate-700">Comentarios:</h3>
      <ul className="space-y-3">
        {comments.map((comment) => (
          <li key={comment.id} className="border border-gray-200 p-4 rounded-lg bg-white shadow-md hover:bg-gray-100 transition">
            <strong className="font-semibold text-gray-900">{comment.name}:</strong>{" "}
            <span className="text-gray-700">{comment.body}</span>
          </li>
        ))}
      </ul>
    </div>
  
  </div>
  
  );
}

export default PostDetail;
