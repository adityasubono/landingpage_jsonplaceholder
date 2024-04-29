import React, {useEffect, useState} from 'react';
import PostsService from "../../service/api/get-posts.js";
import UserService from "../../service/api/get-users.js";
import AlbumsService from "../../service/api/get-albums.jsx";
import {Link, useParams} from "react-router-dom";
import ListUser from "../list-user/list-user.jsx";
import UserCard from "../../components/user-card/user-card.jsx";
import Button from "../../components/button/button.jsx";




function Home() {
    const { userId } = useParams();
    const [posts, setPosts] = useState([]);
    const [album, setAlbum] = useState([]);
    const [user, setUser] = useState([]);
    const [infoUser, setInfoUser] = useState();

    const handlerUser = (e) => {
        let userId = e.target.value;
        let userData = user.find((e) => e.id === userId);
        setInfoUser(userData);
    };

    const retrievePosts = async () => {
        PostsService.getAllUserPosts()
            .then(response => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveUser = async () => {
        UserService.getUsers()
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveAlbums = async () => {
        AlbumsService.getAllAlbums()
            .then(response => {
                setAlbum(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrievePosts();
        retrieveAlbums();
        retrieveUser();
    }, []);

    return (
        <div>
            <div className="section search-result-wrap">
                <div className="container">
                    <div className="row posts-entry">
                        <div className="col-lg-8">
                            jahdjad
                            {JSON.stringify(infoUser)}





                            <div className="blog-entry d-flex blog-entry-search-item">
                                <a href="single.html" className="img-link me-4">
                                    <img src="images/img_1_sq.jpg" alt="Image" className="img-fluid"/>
                                </a>
                                <div>
                                    <span className="date">Apr. 14th, 2022 &bullet; <a href="#">Business</a></span>
                                    <h2><a href="single.html">Thought you loved Python? Wait until you meet Rust</a>
                                    </h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, nobis ea quis
                                        inventore vel voluptas.</p>
                                    <p><a href="single.html" className="btn btn-sm btn-outline-primary">Read More</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 sidebar">
                            <div className="sidebar-box">
                                <h3 className="heading">User Popular Posts</h3>
                                <div className="post-entry-sidebar">
                                    {user.map((user) => (
                                        <Button buttonFunction={handlerUser} text="More Info" value={user.id} key={user.id} />
                                    ))}
                                </div>
                            </div>






                        </div>
                    </div>
                </div>
            </div>
        </div>



        // <div className="row align-items-stretch retro-layout">
        //     <h3 className="heading">User</h3>
        //     {user.map((user) => (
        //         <ListUser name={user.name} id={user.id} key={user.id}/>
        //     ))}
        //
        //
        //     <h3 className="heading">Post</h3>
        //     <div className="row g-3">
        //         {posts.map((post) => (
        //             <div className="col-md-12" key={post.userId}>
        //                 <div className="blog-entry">
        //                     <h2><a href="single.html">{post.title}</a></h2>
        //                     <p>{post.body}</p>
        //                     {/*<p><a href="single.html" className="btn btn-sm btn-outline-primary">Read More</a></p>*/}
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        //
        //     <h3 className="heading">Album</h3>
        //
        //     {posts.map((post) => (
        //         <div className="col-md-4" key={post.id}>
        //             <Link href="single.html" className="h-entry mb-30 v-height gradient">
        //                 <div className="featured-img"></div>
        //                 <div className="text">
        //                     <h2>{post.title}</h2>
        //                 </div>
        //             </Link>
        //         </div>
        //     ))}
        // </div>
    );
}

export default Home;
