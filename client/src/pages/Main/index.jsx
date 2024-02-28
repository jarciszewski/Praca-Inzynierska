import styles from "./styles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DishDisplay } from "./DishDisplay";
import { MainButton } from "../../components/MainButton";
import useFontSize from "../../components/useFontSize";
import { verifyToken } from "../../utils/verifyToken";
import Charts from "../../components/Charts";

const Main = () => {
  const { t, i18n } = useTranslation();
  const { fontSize } = useFontSize();

  const [loading, setLoading] = useState(true);
  const [dishesHistory, setDishesHistory] = useState("");
  const [addDish, setAddDish] = useState({
    name: "",
    description: "",
    meal_time: "",
    macronutrients_id: "",
  });
  const [chartData, setChartData] = useState({
    date: "",
    calories: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (verifyToken() === "Invalid token.") {
          window.location = "/login";
        }
        const UID = await verifyToken();
        // const diet = await axios.get("http://localhost:8080/api/diets/uid/" + UID, {UID});
        const dishesHistoryResponse = await axios.get(
          "http://localhost:8080/api/dishes_histories",
          { params: { UID } }
        );
        setDishesHistory(dishesHistoryResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (dishesHistory && dishesHistory.data && dishesHistory.data.length > 0) {
      const dataByDate = {};
      
      dishesHistory.data.forEach((item) => {
        const date = new Date(item.timestamp).toLocaleDateString();
        const calories = item.dish.macronutrientData.calories;
        
        if (dataByDate[date]) {
          dataByDate[date] += calories;
        } else {
          dataByDate[date] = calories;
        }
      });
      
      const sortedDates = Object.keys(dataByDate).sort((a, b) => new Date(a) - new Date(b));
      const calories = sortedDates.map(date => dataByDate[date]);

      setChartData({ dates: sortedDates, calories });
    }
  }, [dishesHistory]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  const handleOptions = () => {
    window.location = "/options";
  };

  const handleDishInput = (event) => {
    setAddDish({ ...addDish, [event.target.name]: event.target.value });
  };

  const handleDishSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/dishes", addDish)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error submitting dish:", error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!dishesHistory || dishesHistory.length === 0) {
    return <p>No data available</p>;
  }

  const sortedDishesHistory = dishesHistory.data.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const latestDishes = {
    breakfast: sortedDishesHistory.find(
      ({ dish }) => dish.meal_time === "Breakfast"
    ),
    dinner: sortedDishesHistory.find(({ dish }) => dish.meal_time === "Dinner"),
    supper: sortedDishesHistory.find(({ dish }) => dish.meal_time === "Supper"),
  };

  const mealTimes = ["breakfast", "dinner", "supper"];

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <MainButton />
        <div className={styles.btns_in_nav}>
          <button
            name="options_btn"
            className={styles.btn}
            style={{fontSize: fontSize}}
            onClick={handleOptions}
          >
            {t("Options")}
          </button>
          <button
            name="logout_btn"
            className={styles.btn}
            style={{fontSize: fontSize}}
            onClick={handleLogout}
          >
            {t("Logout")}
          </button>
        </div>
      </nav>
      <div className={styles.dishes_container}>
        {mealTimes.map(
          (mealTime) =>
            latestDishes[mealTime] && (
              <DishDisplay
                key={mealTime}
                dish_name={latestDishes[mealTime].dish.name}
                meal_time={latestDishes[mealTime].dish.meal_time}
                macronutrientData={latestDishes[mealTime].dish.macronutrientData}
                fats={latestDishes[mealTime].dish.macronutrientData.fats}
                carbohydrates={latestDishes[mealTime].dish.macronutrientData.carbohydrates}
                proteins={latestDishes[mealTime].dish.macronutrientData.proteins}
                calories={latestDishes[mealTime].dish.macronutrientData.calories}
                amount={latestDishes[mealTime].dish.macronutrientData.amount}
                fontSize={fontSize}
                description={latestDishes[mealTime].dish.description}
                ingredients={latestDishes[mealTime].ingredients}
              />
            )
        )}
      </div>
      <Charts dates={chartData.dates} calories={chartData.calories} />;
    </div>
  );
};

export default Main;