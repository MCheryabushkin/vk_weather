import React, { useEffect, useState } from "react";
import api from "../../api/api";
import ForecastItem from "../ForecastItem/ForecastItem";

import * as s from "./forecast.scss";
import { DayWeather } from "../../interfaces";

interface IPForecastList {
    coord: {
        lat: number,
        lon: number
    }
}

function ForecastList(props: IPForecastList) {
    const [list, setList] = useState<DayWeather[]>([]);
    const [isLoad, setLoading] = useState<Boolean>(false);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        const { lat, lon } = props.coord;

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
        <div className={s.forecast}>
            <h3>Forecast for week:</h3>
            <div className={s.forecastList}>
                { renderForecastCards() }
            </div>
        </div>
    );    
}

export default ForecastList;