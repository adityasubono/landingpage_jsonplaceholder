import {useEffect, useState} from "react";

function Profile() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            setUser(userData);
        }
    }, []);
    const gender = ["men", "women"];
    return (
        <div className="card border-0">
            <div className="row g-0">
                <div className="col-md-2">
                    <img
                        src={`https://randomuser.me/api/portraits/${gender[Math.round(Math.random() * 1)]}/${Math.round(Math.random() * 99)}.jpg`}
                        alt="Image"
                        className="img-fluid  rounded-circle mb-3"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">{user.name} ( {user.username} )</h3>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Email : {user.email}</li>
                            <li className="list-group-item">Phone : {user.email}</li>
                            <li className="list-group-item">Username : {user.email}</li>
                            <li className="list-group-item">Website : {user.email}</li>
                            <li className="list-group-item">Address : {user.address?.street}, {user.address?.suite}, {user.address?.city} {user.address?.zipcode}</li>
                            <li className="list-group-item">Company : {user.company?.name}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
