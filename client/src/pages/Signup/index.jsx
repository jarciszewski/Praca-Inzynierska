import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { FormDisplay } from "./FormDisplay";
import { DietCarouselDisplay } from "./DietCarouselDisplay";
import { DietCalories } from "./DietCalories";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    login: "",
    password: "",
    repeat_password: "",
    diet_id: 0
  });
  const [error, setError] = useState("");
  const [dataFilled, setDataFilled] = useState(false);
  const [dietChosen, setDietChosen] = useState(false);
  const [dietData, setDietData] = useState({
    name: "Zwykła",
    calories: "",
  });
  // const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleFormChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const urlDiet = "http://localhost:8080/api/diets/find";
      
      while (data.diet_id===0)
      {
        const response = await axios.get(urlDiet, { params: dietData });
        setData({...data, diet_id: response.data.id});
      }

      const urlUser = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(urlUser, data);
      navigate("/login");
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

  const handleFillData = () => {
    setDataFilled(true);
  };

  const handleChooseDiet = () => {
    setDietChosen(true);
  };

  const handleSlideChange = (index) => {
    setDietData({ ...dietData, name: index });
    console.log(data)
  };

  const handleCaloriesChange = async ({ currentTarget: input }) => {
    setDietData({...dietData, [input.name]: input.value});
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {!dataFilled && (
            <FormDisplay
              handleFormChange={handleFormChange}
              firstName={data.firstName}
              lastName={data.lastName}
              email={data.email}
              login={data.login}
              password={data.diet_id.password}
              repeat_password={data.repeat_password}
              handleFillData={handleFillData}
            />
          )}
          {dataFilled && !dietChosen && (
            <DietCarouselDisplay
              handleSlideChange={handleSlideChange}
              handleChooseDiet={handleChooseDiet}
            />
          )}
          {dietChosen && (
            <DietCalories
              handleCaloriesChange={handleCaloriesChange}
              handleSubmit={handleSubmit}
            />
          )}
          {error && <div className={styles.error_msg}>{error}</div>}
          <Link to="/login">
            <button name="login_btn" type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;