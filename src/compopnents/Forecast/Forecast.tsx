import React, { useEffect, useState } from "react";
import api from "../../api/api";
import ForecastItem from "../ForecastItem/ForecastItem";

import { DayWeather, WeatherData } from "../../interfaces";
import { useMainStore } from "../../stores/MainContext";

import * as S from "./Forecast.scss";

function ForecastList() {
    const [list, setList] = useState<DayWeather[]>([]);
    const [isLoad, setLoading] = useState<Boolean>(false);
    const { selectedCityData }: { selectedCityData: WeatherData } = useMainStore();

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        const { lat, lon } = selectedCityData.coord;

        api.get7DaysForecast(lat, lon)
            .then(res => {
                setList(res.daily);
                setLoading(true);
            })
            .catch(err => console.log(err));
    }

    function renderForecastCards() {
        return list.map((el: DayWeather, iDx: number) => {
            if (iDx) return <ForecastItem key={iDx} data={el} />;
        })
    }

    if (!isLoad) return <></>;
    
    return(
        <div className={S.forecast}>
            <div className={S.forecastList}>
                { renderForecastCards() }
            </div>
        </div>
    );    
}

export default ForecastList;