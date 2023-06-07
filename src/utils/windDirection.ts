export const windDirection = (direction: number) => {
    if (direction > 348.75 || direction <= 11.25) return 'N&#8595;';
    if (direction > 11.25 && direction <= 33.75) return 'NNE&#8599;';
    if (direction > 33.75 && direction <= 56.25) return 'NE&#8599;';
    if (direction > 56.25 && direction <= 78.75) return 'ENE&#8599;';
    if (direction > 78.75 && direction <= 101.25) return 'E&#8594;';
    if (direction > 101.25 && direction <= 123.75) return 'ESE&#8600;';
    if (direction > 123.75 && direction <= 146.25) return 'SE&#8600;';
    if (direction > 146.25 && direction <= 168.75) return 'SSE&#8600;';
    if (direction > 168.75 && direction <= 191.25) return 'S&#8595;';
    if (direction > 191.25 && direction <= 213.75) return 'SSW&#8601;';
    if (direction > 213.75 && direction <= 236.25) return 'SW&#8601;';
    if (direction > 236.25 && direction <= 258.75) return 'WSW&#8601;';
    if (direction > 258.75 && direction <= 281.25) return 'W&#8592;';
    if (direction > 281.25 && direction <= 303.75) return 'WNW&#8598;';
    if (direction > 303.75 && direction <= 326.25) return 'NW&#8598;';
    if (direction > 326.25 && direction <= 348.75) return 'NNW&#8598;';
}