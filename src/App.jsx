import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Posts from "./pages/posts/posts.jsx";
import PostDetail from "./pages/postDetail/postDetail.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Home from "./pages/home/home.jsx";
import Profile from "./pages/profile/profile.jsx";
import Albums from "./pages/albums/albums.jsx";


function App() {
  return (
      <BrowserRouter>
          <Navbar/>
          <div className="container">
              <Routes>
                  <Route path="/landingpage_jsonplaceholder" element={<Home/>}/>
                  <Route path="/landingpage_jsonplaceholder/profile" element={<Profile/>}/>
                  <Route path="/landingpage_jsonplaceholder/posts" element={<Posts/>}/>
                  <Route path="/landingpage_jsonplaceholder/post/:postId" element={<PostDetail/>}/>
                  <Route path="/landingpage_jsonplaceholder/albums" element={<Albums/>}/>
              </Routes>
          </div>
      </BrowserRouter>

  )
}

export default App
