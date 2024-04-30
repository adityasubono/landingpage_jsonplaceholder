import {useEffect, useState} from "react";
import Modal from "../../components/modal/modal";
import UserCard from "../../components/user-card/user-card";
import ListUserInformation from "../../components/list-user-information/list-user-information";
import styles from "./users.module.css";
import UserService from "../../service/api/get-users";

export default function Users() {
  const [theModalIsOpen, setTheModalIsOpen] = useState(false);
  const [infoUser, setInfoUser] = useState();
  const [user, setUser] = useState([]);

  const handlerUser = (e) => {
    let userId = e.target.value;
    let userData = user.find((e) => e.id === userId);
    setTheModalIsOpen(true);
    setInfoUser(userData);
  };

  useEffect(() => {
    retrieveUsers()
  }, []);

  const retrieveUsers = () => {
    UserService.getUsers()
        .then(response => {
          setUser(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  };
  const handlerModal = () => {
    setTheModalIsOpen(false);
  };

  return (
    <div>
      <article className={styles.listOfNames}>
        <h2 className={styles.title}>List of Users</h2>
        <article className={styles.usersCards}>
          {user.map((user) => (
              <UserCard
                  key={user.id}
                  name={user.name}
                  email={user.email}
                  buttonFunction={handlerUser}
                  value={user.id}
              />
          ))}
        </article>
        <Modal theModalIsOpen={theModalIsOpen} buttonFunction={handlerModal}>
          <ListUserInformation userInfo={infoUser}/>
        </Modal>
      </article>
    </div>
  );
}
