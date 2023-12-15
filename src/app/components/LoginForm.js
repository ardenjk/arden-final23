import styles from './components.module.css';


const LoginForm = ({loginUserFunction}) => {
    //e represents the element that the function called on; in this case it is the entire form 
    return (
        <div>
            <h2>Login Form</h2>
            <form className = {styles.Form} onSubmit={(e) => loginUserFunction(e)}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />

                <label htmlFor="pass">Password</label>
                <input type="password" name="password" />

                <button type = "submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;


