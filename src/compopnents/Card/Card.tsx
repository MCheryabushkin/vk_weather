import React from "react";
import { WeatherData } from "../../interfaces";

import * as S from "./Card.scss";
import { tempConvert } from "../../utils";


function Card({store}: {store: WeatherData}) {
    const { weather, main, name } = store;
    const { temp, temp_max, temp_min } = main;

    return(
        <div className={S.currentCity}>
            <div>
                <p className={S.myLocation}>My location</p>
                <p className={S.location}>{name}</p>
            </div>
            <div className={S.weatherContainer}>
                <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="Weather icon"
                    className={S.weatherIcon} />
                <p className={S.currentTemp}>{tempConvert(temp)}º</p>
                <p className={S.lowHighTemp}>H: {tempConvert(temp_max)}º L: {tempConvert(temp_min)}º</p>
            </div>
        </div>
    )
}

export default Card;