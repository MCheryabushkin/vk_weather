import React from "react";
import api from "../../api/api";
import { tempConvert } from "../../utils";

import * as S from "./ForecastItem.scss";
import { DayWeather } from "../../interfaces";

interface IPropsItem {
    data: DayWeather;
}

enum Days {
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
}

function ForecastItem({ data }: IPropsItem) {
    const getDay = () => {
        const date = new Date(data.dt * 1000);
        return `${Days[date.getDay()]}, ${date.getDate()}`
    }
    const { weather, temp } = data;

    return(
        <div>
            <div>{getDay()}</div>
            <img src={api.getImgUrl(weather[0].icon)} alt="" />
            <div className={S.tempList}>
                <p>Night: {tempConvert(temp.night)}&#8451;</p>
                {/* <p>Morning: {tempConvert(temp.morn)}&#8451;</p> */}
                <p>Day: {tempConvert(temp.day)}&#8451;</p>
                {/* <p>Evening: {tempConvert(temp.eve)}&#8451;</p> */}
            </div>
        </div>
    );
}

export default ForecastItem;