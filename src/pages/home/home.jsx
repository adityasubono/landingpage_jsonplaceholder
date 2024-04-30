import {useEffect, useState} from 'react';
import UserService from "../../service/api/get-users.js";
import {Link} from "react-router-dom";


function Home() {
    const [user, setUser] = useState([]);

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

    useEffect(() => {
        retrieveUser();
    }, []);

    const gender = ["men", "women"];
    return (
        <div>
            <h3 className="text-center mt-5">List User</h3>
            <div className="row">
                {user.map((dataUser, index) => (
                    <div className="col-lg-4 text-center mt-5" key={index}>
                        <img
                            src={`https://randomuser.me/api/portraits/${gender[Math.round(Math.random() * 1)]}/${Math.round(Math.random() * 99)}.jpg`}
                            alt="Image"
                            className="img-fluid w-25 rounded-circle mb-3"
                        />
                        <h2 className="fw-normal">{dataUser.name}</h2>
                        <p>{dataUser.email}</p>
                        <p>{dataUser.address.street}, {dataUser.address.suite}, {dataUser.address.city}, {dataUser.address.zipcode}</p>
                        <Link className="btn btn-secondary" to={`user/${dataUser.id}/posts`}> User Posts &raquo;</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
