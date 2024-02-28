import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.idUser);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <div className={styles.options}>
            <span className={styles.span}>
              {/* <DropdownButton
                id="dropdown-basic-button"
                title={t("Language")}
              >
                <Dropdown.Item onClick={() => changeLanguage("pl")}>PL</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage("en")}>EN</Dropdown.Item>
              </DropdownButton> */}
            </span>
          </div>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
              type="text"
              placeholder="Login"
              name="login"
              onChange={handleChange}
              value={data.login}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button name="login_btn" type="submit" className={styles.green_btn}>
              Login
            </button>
            <Link to="/signup">
              <button
                name="register_btn"
                type="button"
                className={styles.white_btn}
              >
                Sing Up
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
