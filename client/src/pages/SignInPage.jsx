import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function SignInPage({ setUser }) {
    const navigate = useNavigate()

    let emptyRegisterForm = {
        username: '',
        password: '',
        email: ''
    }
    let emptyLoginForm = {
        username: '',
        password: ''
    }

    const [option, setOption] = useState(true)
    const [input, setInput] = useState("")
    let [registerForm, setRegisterForm] = useState(emptyRegisterForm)
    let [loginForm, setLoginForm] = useState(emptyLoginForm)

    async function handleLoginSubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.post("/auth/login", loginForm)
            const token = response.data.token

            console.log(token)

            if (!token) {
                setLoginForm(emptyLoginForm)
                return
            }
            localStorage.setItem("token", token)

            const userResponse = await axios.get("/api/users", {
                headers: {
                    Authorization: token
                }
            })
            setUser(userResponse.data)

            navigate("/home")

        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    function handleLoginChange(e) {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    async function handleRegisterSubmit(e) {
        e.preventDefault()
        try {
            //Send data to backend to create user and token
            const response = await axios.post("/auth/register", registerForm)
            const token = response.data.token
            console.log(token)
            if (!token) {
                setRegisterForm(emptyRegisterForm)
                return
            }
            localStorage.setItem("token", token)

            const userResponse = await axios.get("/api/users", {
                headers: {
                    Authorization: token
                }
            })
            setUser(userResponse.data)

            setRegisterForm(emptyRegisterForm)
            navigate("/home")
        } catch (error) {
            console.log(error)
        }
    }

    //function for the handle change
    // Come back to this
    function handleRegisterChange(e) {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    function loginFormPage() {
        return (
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="username">Username: </label>
                <input 
                type="text" 
                name="username" 
                id="username"
                onChange={handleLoginChange}
                />
                <br /> <br />
                <label htmlFor="password">Password: </label>
                <input 
                type="password" 
                name="password" 
                id="password"
                onChange={handleLoginChange}
                />
                <br /><br />
                <button>Submit</button>
            </form>
        )
    }

    function registerFormPage() {
        return (
            <form onSubmit={handleRegisterSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleRegisterChange}
                    value={registerForm.username}
                />
                <br /> <br />
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleRegisterChange}
                    value={registerForm.email} />
                <br /><br />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleRegisterChange}
                    value={registerForm.password} />
                <br /><br />
                <button>Submit</button>
            </form>
        )
    }


    return (
        <div className='login-main'>
            <section className="w-full flex justify-around mt-4">
                <button className="px-14 py-4 text-xl" onClick={() => { setOption(true) }}>Sign In</button>
                <button className="px-14 py-4 text-xl" onClick={() => { setOption(false) }}>Register</button>
            </section>
            <section className="mt-14 flex w-full justify-center">
                {option ? loginFormPage() : registerFormPage()}
            </section>
        </div>
    );
}

export default SignInPage;