import { useEffect, useState } from "react";
import backend from "../../backend";
import "./users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const response = await backend.get("/users");
    // console.log(response);
    setUsers(response.data.data);
    // console.log(users);
  };
  const deleteUser = async (id) => {
    // console.log(id);
    if (
      window.confirm(
        "Are you sure to delete the User?\nThis actions is irreversable"
      )
    ) {
      const response = await backend.delete(`/user/${id}`);
      // console.log(response);

      setUsers(
        users.filter((user) => {
          return user.id !== id;
        })
      );
      if (response.data.status === "OK") {
        alert("User deleted successfully");
      }
    }
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
              <p>
                Name: <b>{user.name}</b>{" "}
              </p>
              <p>
                Email: <b>{user.email}</b>{" "}
              </p>
              <div className="btns">
                {/* <button className="update-btn btn">Update</button> */}
                <button
                  className="delete-btn btn"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
