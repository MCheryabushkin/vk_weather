import React, { SyntheticEvent, useEffect, useState } from "react";
import { observer, useObserver } from "mobx-react";
import cn from "classnames";

import api from "../../api/api";
import { WeatherData } from "../../interfaces";
import { useMainStore } from "../../stores/MainContext";
import { IMainStore } from "../../stores/mainStore";
import { getOneDayWeather } from "../../helper";
import { parseSearchLocation } from "../../utils";

import Card from "../Card/Card";
import Icon from "../UI/Icon/Icon";

import * as S from "./Search.scss";

const INTERVAL_OF_DATA_REQUEST = 300000;

function Search() {
	const [inputVal, setInput] = useState<string | number | readonly string[]>('');
	const [isLoding, setLoading] = useState<boolean>(false);
    const mainStore: IMainStore = useMainStore();
    const { setCity, selectedCityData, setSelectedCityData } = mainStore;
    let interval: ReturnType<typeof setInterval>;

    useEffect(() => {
        interval = setInterval(getData, INTERVAL_OF_DATA_REQUEST);

        const cachedLocations = localStorage.getItem("locations");
        
        if (cachedLocations) {
            const savedLocations = JSON.parse(cachedLocations);
            mainStore.setLocationsFromCache(savedLocations);
        }

        if ((selectedCityData as WeatherData)?.weather) {
            setLoading(true);
            return;
        }
        
        getData();

        return () => clearInterval(interval);
    }, []);

    function getData() {
        getOneDayWeather({
            success: (res) => {
                setSelectedCityData(res);
                setLoading(true);
            },
            fail: () => {
                new Error("Something goes wrong");
            },
            city: mainStore.city,
        });
    }
    
    const onChange = (val: React.ChangeEvent<HTMLInputElement>) => {
		const {value} = val.target;
		
		if (typeof value === 'string')
			setInput(val.target.value);
	}

	const onClick = (e: SyntheticEvent) => {
		e.preventDefault();
        const target = e.target;
        const { search }: any = target;
        const parsedLocation = parseSearchLocation(search.value);

        if (search.value === '') return;

        if (typeof parsedLocation !== 'string') {
            const { lat, lon } = parsedLocation;
            const cityByCoord = async () => {
                const data = await api.getCityByCoord(lat, lon);
                return data;
            }
            cityByCoord()
                .then(data => {
                    setCity(data.name);
                    setSelectedCityData(data);
                    clearInterval(interval);
                    interval = setInterval(getData, INTERVAL_OF_DATA_REQUEST);
                })
                .catch(() => console.log("City not found"));
        } else {
            getOneDayWeather({
                success: (res) => {
                    setCity(res.name);
                    setSelectedCityData(res);
                    clearInterval(interval);
                    interval = setInterval(getData, INTERVAL_OF_DATA_REQUEST);
                },
                fail: () => {
                    alert("City not found");
                }, 
                city: search.value,
            });
        }
		
		setInput("");
	}

    return useObserver(() => (<>
        <form onSubmit={onClick} className={S.form}>
            <button 
                className={S.button} 
                type="submit">
                <Icon type="find" />
            </button>
            <input type="text" 
                name="search"
                onChange={onChange} 
                value={inputVal}
                placeholder="Search city, country,  or location"
                className={S.input} />
        </form>

        {
            isLoding
                ?  <Card key={(selectedCityData as WeatherData).dt} 
                    store={(selectedCityData as WeatherData)} classNames={S.seelctedLocation} />
                : <div>Load data...</div>
        }

        <div className={S.locationsList}>
            <p className={S.locationsTitle}>Saved locations</p>
            {mainStore.savedLocations.length === 0 && <p>No saved locations</p>}

            <div className={S.savedLocationsContainer}>
                { mainStore.savedLocations.map((location: WeatherData, index: number) => {
                    return <Card key={location.dt} store={location} small classNames={cn(S.savedCard, S[`savedCard${index}`])} />
                }) }
            </div>
        </div>
    </>))
}

export default observer(Search);