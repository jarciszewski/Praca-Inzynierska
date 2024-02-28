import styles from "./Signup.module.css";
import VegeDietIMG from "../../vege.png";
import NormalDietIMG from "../../normal.png";

export const DietCarouselDisplay = ({ handleSlideChange, handleChooseDiet }) => {
    return (
        <div className={styles.carousel}>
            <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                        onClick={() => handleSlideChange("Zwykła")}
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                        onClick={() => handleSlideChange("Wegetariańska")}
                    ></button>
                </div>
                <div className="carousel-inner" style={{ width: "800px", margin: "30px" }}>
                    <div className="carousel-item active">
                        <div className={styles.dietText}>
                            <p>Low-Fat</p>
                        </div>
                        <img
                            src={NormalDietIMG}
                            className="d-block w-100"
                            alt="1"
                            style={{ height: "400px" }}
                        />
                    </div>
                    <div className="carousel-item">
                        <div className={styles.dietText}>
                            <p>Vegetarian Low-Fat</p>
                        </div>
                        <img
                            src={VegeDietIMG}
                            className="d-block w-100"
                            alt="2"
                            style={{ height: "400px" }}
                        />
                    </div>
                </div>
                {/* <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button> */}
            </div>
            <button
                name="register_btn"
                className={styles.green_btn}
                onClick={handleChooseDiet}
            >
                Choose Calories
            </button>
        </div>
    );
};