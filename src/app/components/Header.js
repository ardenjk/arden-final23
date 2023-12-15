import Link from "next/link";
import styles from "./components.module.css"

const Header = ({isLoggedIn, logoutUser}) => {
    return (
        <header className = {styles.Header}>
            <nav className={styles.HeaderNav}>
                {isLoggedIn && (
                    <>
                    <Link href = "/">Home</Link>
                    <Link href = "/profile">User Profile</Link>
                    <Link href = "/createPost"> Create Post</Link>
                    <a onClick = {logoutUser}> Log out </a>
                       
                    </>
                )}
                {!isLoggedIn && (
                    <>
                    <Link href = "/login"> Login</Link>
                    <Link href = "/createUser">Create User</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
