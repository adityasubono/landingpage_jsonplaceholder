import {useEffect, useState} from 'react';
import UserService from "../../service/api/get-users.js";
import {useNavigate} from "react-router-dom";

function Home() {
    const [user, setUser] = useState([]);
    const navigate = useNavigate()
    const retrieveUser =  () => {
        UserService.getUsers()
            .then(response => {
                setUser(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    useEffect(() => {
        retrieveUser();
    }, []);

    const handlerUser = (e) => {
        let userId = e.target.value;
        let userData = user.find((e) => e.id == userId);
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate("/posts")
    };

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

                        <button type='button' className='btn btn-secondary text-white' onClick={handlerUser} value={dataUser.id}>Enter&raquo;</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
