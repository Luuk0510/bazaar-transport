export default class TruckService {
    static canTruckDrive(weather, truckType) {
        const windSpeed = weather.wind.speed;
        const temperature = weather.main.temp;
        const weatherCondition = weather.weather[0].main.toLowerCase();

        if (windSpeed > 40 && truckType.toLowerCase() === 'breekbaar transport') {
            return false;
        }
        if (temperature > 25 && truckType.toLowerCase() === 'koud transport') {
            return false;
        }
        if ((weatherCondition === 'rain' || weatherCondition === 'snow') && truckType.toLowerCase() === 'algemeen transport') {
            return false;
        }
        if (weatherCondition === 'snow' && truckType.toLowerCase() === 'pallets') {
            return false;
        }
        if (weatherCondition === 'storm' && truckType.toLowerCase() === 'snelkoerier') {
            return false;
        }

        return true;
    }
}
