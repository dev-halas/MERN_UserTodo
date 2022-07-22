import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { loginHeader } from "../../helpers/httpHeaders"

const UserLoginView = () => {
    const navigate = useNavigate()

    const LOGIN_API_URL = `http://localhost:5000/api/user/login`

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")


    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post( LOGIN_API_URL, { email, password }, loginHeader )
            
            localStorage.setItem("userToken", data.token); 
            
            navigate('/user_panel')

        } catch (error) {
            setError(error.data.message);
            setTimeout(() => { setError("") }, 10000);  
        }

    }


    return (
        <form onSubmit={loginHandler} className="login-screen__form">
            <span className="error-message">{error}</span>
            <div className="form-group">
              <label htmlFor="password">
                Email
              </label>
              <input
                type="email"
                required
                id="email"
                autoComplete="true"
                placeholder="Enter password"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={0}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Wpisz hasło aby uzyskać dostęp do sesji zdjęciowej
              </label>
              <input
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={1}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
    )
}

export default UserLoginView