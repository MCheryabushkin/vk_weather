import React, { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { observer, useObserver } from "mobx-react";

import { useMainStore } from "../../stores/MainContext";
import { getOneDayWeather } from "../../helper";

import * as S from "./Search.scss";
import { parseSearchLocation } from "../../utils";
import api from "../../api/api";
import Card from "../Card/Card";
import Icon from "../UI/Icon/Icon";

const INTERVAL_OF_DATA_REQUEST = 30000;

function Search() {
	const [inputVal, setInput] = useState<string | number | readonly string[]>('');
	const [isLoding, setLoading] = useState<boolean>(false);
    const { city, setCity, selectedCityData, setSelectedCityData } = useMainStore();
    let interval: ReturnType<typeof setInterval>;

    useEffect(() => {
        interval = setInterval(getData, INTERVAL_OF_DATA_REQUEST);

        if (selectedCityData?.weather) {
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
            city,
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
                ?  <Card key={selectedCityData.td} store={selectedCityData} />
                : <div>Load data...</div>
        }
    </>))
}

export default observer(Search);