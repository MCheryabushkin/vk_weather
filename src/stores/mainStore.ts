function MainStore() {
    return {
        city: "Saint Petersburg",
        setCity(city: string): void {
            this.city = city;
        }
    }
}

export default MainStore;