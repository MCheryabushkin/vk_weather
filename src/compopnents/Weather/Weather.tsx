import React from "react";
import { WeatherData } from "../../interfaces";
import { tempConvert, windDirection, getLocalTime } from "../../utils";

import * as S from "./weather.scss";

function Weather({ data }: { data: WeatherData }) {
    const { main, wind, weather, timezone } = data;
    
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