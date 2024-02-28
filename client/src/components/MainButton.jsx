import { useTranslation } from "react-i18next";

export const MainButton = () => {
  const { t, i18n } = useTranslation();

  const displayMain = () => {
    window.location = "/";
  };

  const mainButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
    fontSize: "28px",
    fontFamily: "Quicksand, cursive",
    marginLeft: '20px'
  };
  return (
    <button style={mainButtonStyle} name="MainButton" onClick={displayMain}>
      {t("Main Button")}
    </button>
  );
};
