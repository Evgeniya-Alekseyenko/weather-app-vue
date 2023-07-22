import { weatherApi } from '@/api/weatherApi';
import { forecastApi } from '@/api/weatherApi';

export async function updateWeather(city) {
    try {
        const response = await weatherApi.get('weather', {
            params: { q: city },
        });
        console.log(response);
        const temperature = Math.round(response.data.main.temp);
        const temperatureMin = Math.round(response.data.main.temp_min);
        const temperatureMax = Math.round(response.data.main.temp_max);
        const humidity = response.data.main.humidity;
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        const date = response.data.dt
            ? new Date(response.data.dt * 1000)
            : null;
        console.log(response);

        return {
            temperature,
            temperatureMin,
            temperatureMax,
            humidity,
            description,
            icon,
            date,
        };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error('City not found:', city);
            return null;
        } else {
            console.error('Error fetching weather data', error);
            throw error;
        }
    }
}

export async function updateForecast(city, currentWeatherData) {
    try {
        if (!city) {
            return [];
        }

        const response = await forecastApi.get('forecast', {
            params: { q: city },
        });

        const forecasts = response.data.list;

        const filteredForecasts = forecasts.filter((forecast) => {
            const date = new Date(forecast.dt * 1000);
            const hours = date.getHours();
            return hours === 9;
        });

        const weeklyForecast = filteredForecasts.map((forecast) => {
            const date = new Date(forecast.dt * 1000);
            const formattedDate = formatDate(date);
            return {
                date: formattedDate,
                temperature: Math.round(forecast.main.temp),
                humidity: forecast.main.humidity,
                description: forecast.weather[0].description,
                icon: forecast.weather[0].icon,
            };
        });
        weeklyForecast.unshift({
            date: formatDate(currentWeatherData.date),
            temperature: currentWeatherData.temperature,
            humidity: currentWeatherData.humidity,
            description: currentWeatherData.description,
            icon: currentWeatherData.icon,
        });

        return weeklyForecast;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error('City not found:', city);
            return [];
        } else {
            console.error('Error fetching forecast data', error);
            throw error;
        }
    }
}

function formatDate(date) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const dayOfWeek = days[date.getDay()];
    return `${dayOfWeek}, ${month} ${dayOfMonth} `;
}
