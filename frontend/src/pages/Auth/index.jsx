import { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import styles from "./Auth.module.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <main className={styles.main}>
      <img src="./logo.png" alt="Nexora logo" className={styles.logo} />
      <section className={styles.section}>
        <header className={styles.header}>
          <button
            className={`${styles.btn} ${!isLogin ? styles.active : ""}`}
            onClick={toggleMode}
          >
            SignUp
          </button>
          <button
            className={`${styles.btn} ${isLogin ? styles.active : ""}`}
            onClick={toggleMode}
          >
            Login
          </button>
        </header>
        <article className={styles.container}>
          <div className={styles.formContainer}>
            <p className={styles.formTitle}>
              {isLogin ? "Welcome Back" : "Ready to Join?"}
            </p>
            <p className={styles.subtitle}>
              {isLogin ? "Sign in to continue." : "Sign up and start sharing links."}
            </p>

            {isLogin ? <Login /> : <SignUp />}

            <p className={styles.linkContainer}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span className={styles.link} onClick={toggleMode}>
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Auth;
