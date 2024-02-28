import { useState } from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

export const DishDisplay = ({
  dish_name,
  meal_time,
  macronutrientData,
  fats,
  carbohydrates,
  proteins,
  calories,
  amount,
  fontSize,
  description,
  ingredients
}) => {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      className={styles.dishes}
      style={{ borderTop: "1px solid rgb(107, 107, 107)", fontSize: fontSize }}
      onClick={toggleModal}
    >
      <div className={styles.dishInfo}>
        <div className={styles.dishName}>
          {t(meal_time)} {dish_name}
        </div>
        <div className={styles.macronutrientData}>
          {macronutrientData && (
            <>
              {t("Fats")}{fats}g {t("Carbohydrates")}{carbohydrates}g 
              {t("Proteins")}{proteins}g {calories}kcal {t("Amount")}{amount}g
            </>
          )}
        </div>
      </div>
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2 style={{fontSize: fontSize*1.2}}>{dish_name}</h2>
            <p>{description}</p>
            <h3 style={{fontSize: fontSize*1.2}}>{t("Ingredients")}</h3>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
              ))}
            </ul>
            <button onClick={toggleModal}>{t("Close")}</button>
          </div>
        </div>
      )}
    </div>
  );
};
