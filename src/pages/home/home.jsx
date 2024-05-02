import {useEffect, useState} from 'react';
import UserService from "../../service/api/get-users.js";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "../navbar/navbar.jsx";
import Button from "../../components/button/button.jsx";
import {FaDoorOpen} from "react-icons/fa";
import Title from "../../components/title/title.jsx";
import Card from "../../components/card/card.jsx";

// eslint-disable-next-line react/prop-types
function Home({onMessage}) {
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

    const handlerUser = (e) => {
        let userId = e.target.value;
        let userData = user.find((e) => e.id == userId);
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate("/landingpage_jsonplaceholder/posts")
        return onMessage(userData)
    };

    useEffect(() => {
        retrieveUser();
    }, []);

    const gender = ["men", "women"];
    return (
        <div>
            <Title title={'List User'}/>

            <div className="row">
                {user.map((dataUser, index) => (
                    <div className="col-lg-4 text-center mt-5" key={index}>
                        <Card image={`https://randomuser.me/api/portraits/${gender[Math.round(Math.random() * 1)]}/${Math.round(Math.random() * 99)}.jpg`}
                              name={dataUser.name}
                              email={dataUser.email}
                              phone={dataUser.phone}
                        >
                            <Button className={'btn btn-secondary text-white'}
                                    buttonFunction={handlerUser}
                                    value={dataUser.id}
                            >
                                Enter  <FaDoorOpen/>
                            </Button>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
