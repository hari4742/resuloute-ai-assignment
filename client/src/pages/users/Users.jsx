import { useEffect, useState } from "react";
import backend from "../../backend";

const Users = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const response = await backend.get("/users");
    console.log(response);
    setUsers(response.data.data);
    console.log(users);
  };
  useEffect(() => {
    fetchUsers();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="users">
      <h1>Users</h1>
      <div className="users-container">
        {users.map((user) => {
          return (
            <div className="user" key={user.id}>
              Name: {user.name}
              <br />
              Email: {user.email}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
