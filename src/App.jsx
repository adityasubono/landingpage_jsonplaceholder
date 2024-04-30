import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Posts from "./pages/posts/posts.jsx";
import PostDetail from "./pages/postDetail/postDetail.jsx";
import AddEditPost from "./pages/posts/addEditPost/addEditPost.jsx";
import Navbar from "./components/navbar/navbar.jsx";

import Home from "./pages/home/home.jsx";
import React from "react";
import Users from "./pages/users/users.jsx";
import ListPhoto from "./pages/list-photo/list-photo.jsx";


function App() {
  return (
      <main>
          <Navbar/>
          <div className="section search-result-wrap">
              <div className="container">
                  <BrowserRouter>
                      <Routes>
                          <Route path="/" element={<Users/>}/>
                          <Route path="/user/:userId/posts" element={<Posts/>}/>
                          <Route path="/post/:postId" element={<PostDetail/>}/>
                          <Route path="/album/:albumId" element={<ListPhoto/>}/>
                          <Route path="/post/edit/:postId" element={<AddEditPost/>}/>
                          {/*<Route path="/albums/:userId" element={<Albums />} />*/}
                          {/*<Route path="/post/:postId" element={<postDetail />} />*/}
                          {/*<Route path="/photos/:albumId" element={<Photos />} />*/}
                          {/*<Route path="/photo/:photoId" element={<PhotoDetail />} />*/}
                      </Routes>
                  </BrowserRouter>
              </div>
          </div>
      </main>
  )
}

export default App
