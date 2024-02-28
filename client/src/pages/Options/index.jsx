import styles from "./styles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { MainButton } from "../../components/MainButton";
import useFontSize from "../../components/useFontSize";
import { useTranslation } from "react-i18next";
import { verifyToken } from "../../utils/verifyToken";
import { isAdmin as checkIsAdmin, isAdmin } from "../../utils/isAdmin";

const Options = () => {
  const { t, i18n } = useTranslation();
  const { fontSize, setFontSize } = useFontSize();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [id, setId] = useState("")
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const isAdmin = await checkIsAdmin();
        setIsAdminUser(isAdmin);
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
      const UID = await verifyToken();
      setId(UID);
    };
    checkAdminStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  console.log(isAdminUser);
  const handleDeleteUser = async (e) => {
    e.preventDefault();

    const url = `http://localhost:8080/api/users/${id}`;

    try {
      await axios.delete(url);
      localStorage.removeItem("token");
      window.location = "/";
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <MainButton />
        <button
          className={styles.btn}
          style={{ fontSize: fontSize }}
          onClick={handleLogout}
        >
          {t("Logout")}
        </button>
      </nav>
      <div className={styles.options_container} style={{ fontSize: fontSize }}>
        <span
          className={styles.options}
          style={{ border: "1px solid rgb(107, 107, 107)" }}
        >
          <button
            name="deleteUser_btn"
            className={styles.delete_btn}
            onClick={handleDeleteUser}
          >
            {t("Delete User")}
          </button>
        </span>
        <div className={styles.options}>
          <label>{t("Language")}</label>
          <select
            style={{ fontSize: fontSize }}
            className={styles.lang_dropdown}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value={i18n.language}>{t(i18n.language)}</option>
            {i18n.languages.map(
              (lang) =>
                lang !== i18n.language && (
                  <option key={lang} value={lang}>
                    {t(lang)}
                  </option>
                )
            )}
            {i18n.language !== "en" && <option value="en">{t("en")}</option>}
          </select>
        </div>
        <div className={styles.options}>
          <label>{t("Font size")}</label>
          <div className={styles.fontSizeContainer}>
            {[16, 20, 24, 28].map((size) => (
              <div
                key={size}
                className={styles.fontSizeOption}
                onClick={() => handleFontSizeChange(size)}
                style={{ fontSize: `${size}px` }}
              >
                A
              </div>
            ))}
          </div>
        </div>
        {isAdminUser && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>Welcome Admin!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Options;