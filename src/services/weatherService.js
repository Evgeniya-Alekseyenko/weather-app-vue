import { weatherApi } from '@/api/weatherApi';
import { forecastApi } from '@/api/weatherApi';

export async function updateWeather(city) {
    try {
        const response = await weatherApi.get('weather', {
            params: { q: city },
        });
        const temperature = Math.round(response.data.main.temp);
        const humidity = response.data.main.humidity;
        const description = response.data.weather[0].description;
        return { temperature, humidity, description };
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

export async function updateForecast(city) {
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
            return {
                date: forecast.dt_txt,
                temperature: Math.round(forecast.main.temp),
                humidity: forecast.main.humidity,
                description: forecast.weather[0].description,
            };
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
