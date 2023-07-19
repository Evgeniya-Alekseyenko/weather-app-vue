import axios from 'axios';

export const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather?',
    params: {
        appid: 'e4dc49ce2bc5d1c1459936259cc8c63f',
        units: 'metric',
    },
});

export const forecastApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/forecast?',
    params: {
        appid: 'e4dc49ce2bc5d1c1459936259cc8c63f',
        units: 'metric',
    },
});
