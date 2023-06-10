import { WeatherData } from "../interfaces";

interface IMainStore {
    city: string,
    setCity: (city: string) => void,
    selectedCityData: WeatherData | {},
    setSelectedCityData: (data: WeatherData) => void,
    savedLocations: WeatherData[] | [],
    saveLocation: (location: WeatherData) => void,
    removeSavedLocation: (location: WeatherData) => void,
    setLocationsFromCache: (locations: WeatherData[]) => void,
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
        },

        savedLocations: [],
        saveLocation(location) {
            this.savedLocations = [...this.savedLocations, location];
            localStorage.setItem("locations", JSON.stringify(this.savedLocations));
        },
        removeSavedLocation(location) {
            const updatedLocations: WeatherData[] = [];
            this.savedLocations.map((loc: WeatherData) => {
                if (loc.name !== location.name)
                    updatedLocations.push(loc);
            });
            this.savedLocations = updatedLocations;
            localStorage.setItem("locations", JSON.stringify(this.savedLocations));
        },
        setLocationsFromCache(locations) {
            this.savedLocations = locations;
        }
    }
}

export default MainStore;