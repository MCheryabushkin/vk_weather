import React, { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { observer, useObserver } from "mobx-react";

import { useMainStore } from "../../stores/MainContext";
import { NavLink } from "react-router-dom";
import { getOneDayWeather } from "../../helper";

import * as S from "./Search.scss";
import { parseSearchLocation, tempConvert } from "../../utils";
import api from "../../api/api";
import { WeatherData } from "../../interfaces";
import Card from "../Card/Card";
import Icon from "../UI/Icon/Icon";

function Search() {
	const [inputVal, setInput] = useState<string | number | readonly string[]>('');
	const [isLoding, setLoading] = useState<boolean>(false);
    const { city, setCity, selectedCityData, setSelectedCityData } = useMainStore();

    useEffect(() => {
        if (selectedCityData?.weather) {
            setLoading(true);
            return;
        }

        getOneDayWeather({
            success: (res) => {
                setSelectedCityData(res);
                setLoading(true);
            },
            fail: () => {
                new Error("Something goes wrong");
            },
            city,
        });
    }, []);

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

        if (typeof parsedLocation !== 'string') {
            const { lat, lon } = parsedLocation;
            const cityByCoord = async () => {
                const data = await api.getCityByCoord(lat, lon);
                return data;
            }
            cityByCoord()
                .then(data => {
                    setCity(data.name);
                })
                .catch(() => console.log("City not found"));
        } else {
            getOneDayWeather({
                success: (res) => {
                    setCity(res.name);
                    setSelectedCityData(res);
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
        <NavLink to="/">Home</NavLink>
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
                ?  <Card store={selectedCityData} />
                : <div>Load data...</div>
        }
    </>))
}

export default observer(Search);