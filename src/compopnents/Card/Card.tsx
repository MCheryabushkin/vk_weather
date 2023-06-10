import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { WeatherData } from "../../interfaces";

import { getLocalTime, tempConvert } from "../../utils";
import Icon from "../UI/Icon/Icon";

import { useMainStore } from "../../stores/MainContext";
import { observer, useObserver } from "mobx-react";

import * as S from "./Card.scss";

function Card({store, small = false}: {store: WeatherData, small?: boolean}) {
    const { weather, main, name } = store;
    const { temp, temp_max, temp_min } = main;
    const mainStore = useMainStore();
    const [isLocationSaved, toggleSavedLocation] = useState<boolean>(false);
    const { savedLocations, removeSavedLocation, saveLocation } = mainStore;

    useEffect(() => {
        const loc = savedLocations.some((el: WeatherData) => el.name === name);
        if (!loc) {
            toggleSavedLocation(false);
        } else {
            toggleSavedLocation(true);
        }
    }, [mainStore.savedLocations, store.name])

    const saveCurrentLocation = () => {
        if (isLocationSaved) {
            removeSavedLocation(store);
        } else {
            if (savedLocations.length === 10) {
                alert("You can't save more then 10 location");
                return;
            }

            saveLocation(store);
        }
    }

    return(
        useObserver(() => <div className={cn(S.currentCity, small && S.smallCard)}>
            <div className={S.locationContainer}>
                {!small && <p className={S.myLocation}>My location</p>}
                <p>
                    <Link to="/" state={{ linkedCity: store.name }}  
                        className={S.location}>{name}</Link>
                </p>
                {small && <div className={S.time}>{getLocalTime(store.timezone)}</div>}
                <div className={cn(S.like, isLocationSaved && S.liked)} onClick={saveCurrentLocation}>
                    <Icon type="heart" />
                </div>
            </div>
            <div className={S.weatherContainer}>
                <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="Weather icon"
                    className={S.weatherIcon} />
                <p className={S.currentTemp}>{tempConvert(temp)}º</p>
                <p className={S.lowHighTemp}>H: {tempConvert(temp_max)}º L: {tempConvert(temp_min)}º</p>
            </div>
        </div>)
    )
}

export default observer(Card);