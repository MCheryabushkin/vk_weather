export const parseLocation = (location: string): string | Record<string, string> | undefined => {
    const {search} = window.location;
    const reg = new RegExp(/lat=\d+\.\d+&lon=\d+\.\d+/i);
    if (search && reg.test(search)) {
        const latLon = search.match(reg)[0];
        return latLon.split('&').reduce((acc: Record<string, string>, el: string) => {
            const [key, value] = el.split('=');
            acc[key] = value;
            return acc;
        }, {});
    }
    
    if (!location) return undefined;
    return location;
}