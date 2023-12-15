import styles from './components.module.css';


const UserProfileCard = ({user}) => {
    return (
        <div className = {styles.UserProfileCard}>
            <h3 className={styles.username}>Name: {user?.name}</h3>
            <h3 className={styles.username}>Email: {user?.email}</h3> 
        </div>
    );
};

export default UserProfileCard;

//by putting the ? lets you have unknown values coming in, you can have a user or not have a user