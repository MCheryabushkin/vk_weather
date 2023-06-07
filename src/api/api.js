import { KEYS } from './keys';


class api {
    _apiBase = 'http://api.openweathermap.org/data/2.5/';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not get resource ${url}, received ${res.status}`);
        }

        return await res.json();
    }

    async getOneDayWeather(city) {
        return this.getResource(`weather?q=${city}&appid=${KEYS.API_KEY}`);
    }

    async get7DaysForecast(lat, lon) {
        return this.getResource(`onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${KEYS.API_KEY}`);
    }

    getImgUrl(icon) {
        return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    }

    getCityByCoord(lat, lon) {
        return this.getResource(`weather?lat=${lat}&lon=${lon}&appid=${KEYS.API_KEY}`);
    }
}

export default new api();