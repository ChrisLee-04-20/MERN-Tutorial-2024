import { useState } from "react";
import Alert from "../../components/Alert";
import { loginUser } from "../../controllers/usersController";

const Login = () => {

    // Error state
    const [error, setError] = useState(null);

    // Form data state
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    // Handle login
    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        await loginUser(email, password);

      } catch (err) {
        setError(err.message);
      }

    }

    return (
      <section className="card">

        <h1 className="title">Login to your account</h1>

        <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="input" 
              autoFocus 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="input" 
              autoFocus 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn">Login</button>
        </form>

        { error && <Alert msg={error} /> }

      </section>
    )

}
  
  export default Login;
  