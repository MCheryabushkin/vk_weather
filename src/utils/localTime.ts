export const getLocalTime = (timezone: number) => {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const date = new Date(utc + timezone * 1000);
    const hours = date.getHours();
    const minutes = JSON.stringify(date.getMinutes());
    return `${hours}:${minutes.length > 1 ? minutes : "0" + minutes}`;
}