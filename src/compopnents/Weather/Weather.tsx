import React from "react";
import { observer, useObserver } from "mobx-react";
import { tempConvert, windDirection, getLocalTime } from "../../utils";

import { useMainStore } from "../../stores/MainContext";
import { WeatherData } from "../../interfaces";
import Icon from "../UI/Icon/Icon";

import * as S from "./Weather.scss";

interface Weather {
    selectedCityData: WeatherData
}

function Weather() {
    const { selectedCityData }: Weather = useMainStore();
    const { main, wind, weather, timezone, name } = selectedCityData;
    const { temp, temp_max, temp_min, humidity } = main;
    
    return (
        useObserver(() => <div className={S.weather}>
        <div className={S.mainBlock}>
            <div className={S.tempWrapper}>
                <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
                <div className={S.temperature}>{tempConvert(temp)}º</div>
            </div>

            <div className={S.nameWrapper}>
                <p className={S.location}>{name}</p>
                <p className={S.lowHighTemp}>H: {tempConvert(temp_max)}º L: {tempConvert(temp_min)}º</p>
            </div>
        </div>

        <div className={S.infoWrapper}>
            <p><Icon type="time" className={S.icon} />{getLocalTime(timezone)}</p>
            <p><Icon type="water" className={S.icon} />{humidity}%</p>
            <p><Icon type="wind" className={S.icon} />
                <span dangerouslySetInnerHTML={{ __html: windDirection(wind.deg) }}></span> 
                {wind.speed} meter/sec
            </p>
        </div>
    </div>)
    )
}

export default observer(Weather);