import React, { ReactNode, RefAttributes, RefObject, useEffect, useRef } from "react";
import cn from "classnames";

import { useMainStore } from "../../stores/MainContext";
import { WeatherData } from "../../interfaces";

import * as S from "./SunMoving.scss";
import Icon from "../UI/Icon/Icon";

interface Weather {
    selectedCityData: WeatherData
}

function SunMoving() {
    const { selectedCityData }: Weather = useMainStore();
    const { sunrise, sunset } = selectedCityData.sys;
    const sunny: any = useRef();

    const parseDate = (date: number) => {
        const dateString: string = new Date(date * 1000).toLocaleTimeString();
        const [hour, minutes] = dateString.split(":")
        return `${hour}:${minutes}`
    }

    // useEffect(() => {
    //     const now = new Date().getTime();
    //     const diffRise = now - sunrise;
    //     const diffSet = sunset - now;
    //     if (sunny.current) {
    //         if (diffRise < 0) {
    //             sunny.current.style.visibility = "hidden"
    //         } else {
    //             const percent = (now / now) * 10;
    //             sunny.current.style.setProperty("--move-by-x", percent);
    //         }
    //     }
    // }, []);

    return (
        <div className={S.sunContainer}>
            <div className={S.sunArea}>
                <div className={S.sun} ref={sunny}></div>
            </div>

            <div className={S.sunTimeContainer}>
                <div className={cn(S.sunInfo)}>
                    <span><Icon type="sunrise" /></span>
                    <span>{parseDate(sunrise)}</span>
                    <span>Sun rise</span>
                </div>
                <div className={cn(S.sunInfo)}>
                    <span><Icon type="sunset" /></span>
                    <span>{parseDate(sunset)}</span>
                    <span>Sun set</span>
                </div>
            </div>
        </div>
    )
}

export default SunMoving;