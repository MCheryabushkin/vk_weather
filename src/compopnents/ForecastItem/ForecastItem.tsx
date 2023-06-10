import React from "react";
import api from "../../api/api";

import { DayWeather } from "../../interfaces";
import { addZero, tempConvert } from "../../utils";

import * as S from "./ForecastItem.scss";

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
        const day = date.getDate();
        const month = date.getMonth();
        return (
            <div className={S.dateWrapper}>
                <span className={S.dayOfWeek}>{Days[date.getDay()]}</span>
                <span className={S.date}>{addZero(day, 2)}/{addZero(month, 2)}</span>
            </div>
        )
    }
    const { weather, temp } = data;

    return(
        <div className={S.root}>
            <div>{getDay()}</div>
            <img src={api.getImgUrl(weather[0].icon)} alt="" />
            <p className={S.temp}>{tempConvert(temp.day)}º/{tempConvert(temp.night)}º</p>
        </div>
    );
}

export default ForecastItem;