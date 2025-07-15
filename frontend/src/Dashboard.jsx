import React, { useState } from 'react';
import PostForm from './PostForm';
import PostList from './PostList';
import Nav from './Nav';
import Footer from './Footer';


export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Nav />
      <div className="container my-4">
        <h2 className="text-center mb-4">📢 Post Something</h2>
        <PostForm setRefresh={setRefresh} />
        <hr />
        <h3 className="mt-5">📝 Your Posts</h3>
        <PostList refresh={refresh} setRefresh={setRefresh} />
      </div>
    
      <Footer/>
    </>
  );
}
