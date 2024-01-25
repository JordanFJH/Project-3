import { useState } from "react";


function SignInPage(props) {

    const [option, setOption] = useState(true)

    function loginForm() {
        return (
            <form action="">
                <label htmlFor="username">Username: </label>
                <input type="text" name="username"/>
                <br /> <br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" />
                <br /><br />
                <button>Submit</button>
            </form>
        )
    }

    function registerForm() {
        return (
            <form action="">
                <label htmlFor="username">Username: </label>
                <input type="text" name="username"/>
                <br /> <br />
                <label htmlFor="email">Email: </label>
                <input type="email" name="email"/>
                <br /><br />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" />
                <br /><br />
                <button>Submit</button>
            </form>
        )
    }


    return (
        <div className='login-main'>
            <section className="w-full flex justify-around mt-4">
                <button className="px-14 py-4 text-xl" onClick={() => {setOption(true)}}>Sign In</button>
                <button className="px-14 py-4 text-xl" onClick={() => {setOption(false)}}>Register</button>
            </section>
            <section className="mt-14 flex w-full justify-center">
                {option ? loginForm() : registerForm()}
            </section>
        </div>
    );
}

export default SignInPage;