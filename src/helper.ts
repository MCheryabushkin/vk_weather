import api from "./api/api";
import { WeatherData } from "./interfaces";

type Callback = (params?: any) => void;
interface IParams {
    success?: Callback,
    fail?: Callback,
    city: string,
}

export const getOneDayWeather = ({success, fail, city}: IParams) => {
    api.getOneDayWeather(city)
        .then((res: WeatherData) => {
            if (success)
                success(res);
        })
        .catch((err) => {
            if (fail)
                fail();
        });
}