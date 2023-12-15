import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  query,
  collection,
  getFirestore,
  where,
  getDocs,
} from "firebase/firestore";
import UserProfileCard from "@/app/components/UserProfileCard";
import styles from "../app/components/components.module.css";

export default function UserProfile({ isLoggedIn, loginInformation }) {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    // if user is not logged in, send them to login page
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn]);

  // Get user to display
  useEffect(() => {
    async function getUser() {
      let user = {};
      const db = getFirestore();
      const q = query(
        collection(db, "users"),
        where("userId", "==", loginInformation?.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        user = doc.data();
      });
      setUser(user);
    }
    if (loginInformation) {
      getUser();
    }
  }, [loginInformation]);

  return (
    <main>
      <div className= {styles.usercardbackground} >
        <h1 className={styles.aboutyoutitle}>about you</h1>
          <UserProfileCard user={user} loginInformation={loginInformation} />
      </div>
    </main>
  );
}
