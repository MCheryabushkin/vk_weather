import React from "react";
import { tempConvert, windDirection, getLocalTime } from "../../utils";

import * as S from "./weather.scss";
import { useMainStore } from "../../stores/MainContext";

function Weather() {
    const { selectedCityData } = useMainStore();
    const { main, wind, weather, timezone } = selectedCityData;
    
    return (
        <div className={S.weather}>
            <div className={S.temperature}>{tempConvert(main.temp)}&#8451;</div>
            <div>
                <p>Wind: <span dangerouslySetInnerHTML={{ __html: windDirection(wind.deg) }}></span> {wind.speed} meter/sec</p>
                <p>Humidity: {main.humidity}%</p>
            </div>
            <div className={S.time}>
                <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
                <div>{getLocalTime(timezone)}</div>
            </div>
        </div>
    )
}

export default Weather;