import { useState, useContext } from "react";
import axios from 'axios';
import UserContext from "./UserContext";

function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useContext(UserContext);

  function userRegistration(e) {
    e.preventDefault();

    const data = { email, password }
    axios.post('http://localhost:4000/register', data, { withCredentials: true }).then(response => {
      user.setEmail(response.data.email);
    })
  }

  return (
    <form action=""
      onSubmit={e => userRegistration(e)}
      className="register">
      <h1>Register</h1>

      <input type="email" placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />


      <input type="password" placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  )
}

export default Register