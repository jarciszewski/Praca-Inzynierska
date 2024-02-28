import styles from "./Signup.module.css";

export const FormDisplay = ({ handleFormChange, firstName, lastName, email, login, password, repeat_password, handleFillData }) => {
    return (
        <div className={styles.form_container_inner}>
            <h1>Create Account</h1>
            <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleFormChange}
                value={firstName}
                required
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleFormChange}
                value={lastName}
                required
                className={styles.input}
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleFormChange}
                value={email}
                required
                className={styles.input}
            />
            <input
                type="text"
                placeholder="Login"
                name="login"
                onChange={handleFormChange}
                value={login}
                required
                className={styles.input}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleFormChange}
                value={password}
                required
                className={styles.input}
            />
            <input
                type="password"
                placeholder="Repeat password"
                name="repeat_password"
                onChange={handleFormChange}
                value={repeat_password}
                required
                className={styles.input}
            />
            <button
                name="register_btn"
                className={styles.green_btn}
                onClick={(handleFillData)}
            >
                Choose diet
            </button>
        </div>
    );
};