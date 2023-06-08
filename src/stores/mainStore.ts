import { WeatherData } from "../interfaces";

interface IMainStore {
    city: string,
    setCity: (city: string) => void,
    selectedCityData: WeatherData | {},
    setSelectedCityData: (data: WeatherData) => void,
}


function MainStore(): IMainStore {
    return {
        city: "Saint Petersburg",
        setCity(city) {
            this.city = city;
        },

        selectedCityData: {},
        setSelectedCityData(data) {
            this.selectedCityData = data;
        }
    }
}

export default MainStore;