import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users , setUsers] = useState([]);

  useEffect( () =>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  },[])

  const handleOnsubmit = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name:name, email:email};

    //post data to the server

    fetch('http://localhost:5000/user',{
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      let newUsers = [];
      newUsers = [...users,data]
      setUsers(newUsers);
    })
  }

  return (
    <div className="App">
      <h1>First time creating my own api : {users.length}</h1>
      <form onSubmit={handleOnsubmit}>
        <input type="text" name="name" id="" />
        <input type="email" name="email" id="" />
        <input type="submit" value="Add user" />
      </form>
      {
        users.map(user => <li key={user.id}>id: {user.id}  name: {user.name} email:  {user.email}</li>)
      }
    </div>
  );
}

export default App;
