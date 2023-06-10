export const parseSearchLocation = (location: string): string | Record<string, string> | undefined => {
    const reg = new RegExp(/-?\d+\.\d+,\s*-?\d+\.\d+/i);
    if (location && reg.test(location)) {
        const latLon = (location.match(reg) as RegExpMatchArray)[0];
        const [lat, lon] = latLon.replace(/\s+/, "").split(',');
        return { lat, lon };
    }
    
    if (!location) return '';
    return location;
}