



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
<div className='container mx-auto max-w-3xl p-6 bg-indigo-100 rounded-lg shadow-lg'>

<h1 className='text-3xl font-bold text-center mb-6 text-orange-600'>Lista de Publicaciones</h1>

<input 
  type="text" 
  placeholder="Buscar publicaciones..." 
  onChange={(e) => setSearch(e.target.value)} 
  className="w-full p-3 border border-gray-300 rounded mb-6 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
/>

<ul className='space-y-4'>
  {filteredPosts.map((post) => (
    <li key={post.id} className='border border-gray-300 p-5 rounded-lg bg-white shadow-md'>
      <Link to={`/posts/${post.id}`} className="text-blue-600 font-semibold hover:underline">
        {post.title}
      </Link>
      <p className='text-gray-700 mt-2'>{post.body.slice(0, 100)}...</p>
    </li>
  ))}
</ul>

</div>

  );
}

export default PostsList;
