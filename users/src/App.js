import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      {users.map(user => (
        <div key={user.id} className="user">
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Bio: {user.bio}</p>
          <button className="removeUser">Remove</button>
          <button className="editUser">Edit</button>
        </div>
      ))}
    </div>
  );
}

export default App;
