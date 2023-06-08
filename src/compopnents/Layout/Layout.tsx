import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer, useObserver } from "mobx-react";

import api from "../../api/api";
import { useMainStore } from "../../stores/MainContext";
import { parseURLLocation } from "../../utils";

import ForecastList from "../Forecast/Forecast";
import Weather from "../Weather/Weather";
import { getOneDayWeather } from "../../helper";


function Layout() {
    const [isLoad, setLoading] = useState<Boolean>(false);
    const mainStore = useMainStore();
    const { location } = useParams();
    const parsedLocation = parseURLLocation(location);
    let defaultCity: string = "Saint Petersburg";

    useEffect(() => {
        if (parsedLocation) {
            if (typeof parsedLocation === 'string') {
                mainStore.setCity(location);
            } else {
                const { lat, lon } = parsedLocation;
                const cityByCoord = async () => {
                    const data = await api.getCityByCoord(lat, lon);
                    return data;
                }
                cityByCoord()
                    .then(data => {
                        mainStore.setCity(data.name);
                    })
                    .catch(() => console.log("City not found"))
            }
        } else {
            navigator.geolocation.getCurrentPosition(
                async (e) => {
                    const { latitude, longitude } = e.coords;

                    await api.getCityByCoord(latitude, longitude)
                        .then((res) => {
                            mainStore.setCity(res.name);
                            mainStore.setSelectedCityData(res);
                            setLoading(true);
                        })
                }
            );
        }

    }, []);

    useEffect(() => {
        defaultCity = mainStore.city;
        getData();
    }, [mainStore.city]);

    function getData() {
        getOneDayWeather({
            success: (res) => {
                mainStore.setSelectedCityData(res);
                setLoading(true);
            },
            fail: () => {
                console.log("City not found");
                mainStore.setCity(defaultCity);
            }, 
            city: mainStore.city,
        });
    }

    return useObserver(() => (
        <>
            {/* <Header /> */}
            {isLoad ? (
                <>
                    <Weather />
                    <ForecastList />
                </>
            ) : (
                <p>Load data...</p>
            )}
        </>
    ));
}

export default observer(Layout);
