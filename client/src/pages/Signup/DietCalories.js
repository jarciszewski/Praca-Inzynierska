import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Signup.module.css";

export const DietCalories = ({ handleCaloriesChange, handleSubmit }) => {

    return (
        <div className={styles.calories_container}>
            <h2>Calories</h2>
            <div className={styles.calories_buttons}>
                <input type="radio" id="calories_1400" name="calories" value="1400" onChange={handleCaloriesChange} />
                <label htmlFor="calories_1400">1400</label>

                <input type="radio" id="calories_1600" name="calories" value="1600" onChange={handleCaloriesChange} />
                <label htmlFor="calories_1600">1600</label>

                <input type="radio" id="calories_1800" name="calories" value="1800" onChange={handleCaloriesChange} />
                <label htmlFor="calories_1800">1800</label>

                <input type="radio" id="calories_2000" name="calories" value="2000" onChange={handleCaloriesChange} />
                <label htmlFor="calories_2000">2000</label>
            </div>
            <button
                name="register_btn"
                className={styles.green_btn}
                onClick={handleSubmit}
            >
                Create Account
            </button>
        </div>
    );
};
