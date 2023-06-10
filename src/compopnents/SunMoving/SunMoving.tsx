import React, { ReactNode, RefAttributes, RefObject, useEffect, useRef } from "react";
import cn from "classnames";

import { useMainStore } from "../../stores/MainContext";
import { WeatherData } from "../../interfaces";

import * as S from "./SunMoving.scss";
import Icon from "../UI/Icon/Icon";
import { parseDate } from "../../utils";

interface Weather {
    selectedCityData: WeatherData
}

function SunMoving() {
    const { selectedCityData }: Weather = useMainStore();
    const { sunrise, sunset } = selectedCityData.sys;
    const sunny: any = useRef();

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