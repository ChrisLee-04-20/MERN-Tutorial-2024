import { useState } from "react";
import Alert from "../../components/Alert";
import { registerUser } from "../../controllers/usersController";

const Register = () => {
  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
  });

  // Handle login
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData.email, formData.password, formData.passwordConfirm);

    } catch (err) {
      setError(err.message);
    }

  }

  return (
    <section className="card">

      <h1 className="title">Create a new account</h1>

      <form onSubmit={handleRegister}>
          <input 
            type="email" 
            placeholder="Email Address" 
            className="input" 
            autoFocus 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input" 
            autoFocus 
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="input" 
            autoFocus 
            value={formData.passwordConfirm}
            onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
            />
          <button className="btn">Register</button>
      </form>

      { error && <Alert msg={error} /> }

    </section>
  )
}

export default Register;
