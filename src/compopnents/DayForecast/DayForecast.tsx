import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import api from "../../api/api";
import { useMainStore } from "../../stores/MainContext";
import { ListWeatherItem, WeatherData } from "../../interfaces";
import { tempConvert } from "../../utils";

import * as S from "./DayForecast.scss";

interface Weather {
    selectedCityData: WeatherData
}

function DayForecast() {
    const [weatherList, setList] = useState<ListWeatherItem[] | []>([]);
    const [isLoading, setLoading] = useState<Boolean>(false);
    const { selectedCityData: { coord } }: Weather = useMainStore();

    useEffect(() => {
        const { lat, lon } = coord;
        api.getWeatherForDay(lat, lon)
            .then((res: { list: ListWeatherItem[] }) => {
                setList(res.list);
                setLoading(true);
            });
    }, [])

    const renderWeatherByHour = (list: ListWeatherItem[]) => (
        list.slice(0,9).map(el => (
            <div key={el.dt} className={S.hourInfo}>
                <div className={S.time}>{el.dt_txt.split(" ")[1].replace(":00", "")}</div>
                <img src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="" />
                <div className={S.temp}>{tempConvert(el.main.temp)}º</div>
            </div>
        ))
    );

    return (
        <div className={S.dayWeatherContainer}>
            { isLoading ? renderWeatherByHour(weatherList) : <div>Load data...</div>}
        </div>
    )
}

export default observer(DayForecast);