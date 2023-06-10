export const parseDate = (date: number) => {
    const dateString: string = new Date(date * 1000).toLocaleTimeString();
    const [hour, minutes] = dateString.split(":")
    return `${hour}:${minutes}`
}