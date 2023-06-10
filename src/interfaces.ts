interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface IMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

interface Wind {
    speed: number,
    deg: number,
    gust?: number
}

interface Coordinates {
    lon: number,
    lat: number,
}

interface Clouds {
    all: number
}

interface Sys {
	type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number,
}

export interface WeatherData {
    base: string,
    weather: IWeather[],
    main: IMain,
    timezone: number
    visibility: number,
    dt: number,
    id: number,
    name: string,
    cod: number
    coord: Coordinates,
    wind: Wind,
    clouds: Clouds,
    sys: Sys,
}

export interface DayWeather {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    moon_phase: number,
    temp: Record<string, number>,
    feels_like: Record<string, number>,
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    wind_gust: number,
    weather: IWeather[],
    clouds: number,
    pop: number,
    uvi: number
}

export interface ListWeatherItem {
    dt: number,
    main: IMain & {
        sea_level: number,
        grnd_level: number,
        temp_kf: number,
    },
    weather: IWeather[],
    clouds: Clouds,
    wind: Wind,
    visibility: number,
    pop: number,
    sys: Sys,
    dt_txt: string,
}