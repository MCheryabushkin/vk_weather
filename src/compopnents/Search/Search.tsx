import { observer, useObserver } from "mobx-react";
import React, { SyntheticEvent, useState } from "react";

import { useMainStore } from "../../stores/MainContext";
import { NavLink } from "react-router-dom";
import { getOneDayWeather } from "../../helper";

import * as S from "./Search.scss";
import { parseSearchLocation } from "../../utils";
import api from "../../api/api";

function Search() {
	const [inputVal, setInput] = useState<string | number | readonly string[]>('');
    const { setCity, setSelectedCityData } = useMainStore();

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
                .catch(() => console.log("City not found"))
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
        <form onSubmit={onClick}>
            <input type="text" 
                name="search"
                onChange={onChange} 
                value={inputVal}
                placeholder="Find city"
                className={S.input} />
            <button 
                className={S.button} 
                type="submit">
                    <span>Find</span>
            </button>
        </form>


    </>))
}

export default observer(Search);