import axios from 'axios';

const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather?',
    params: {
        appid: 'e4dc49ce2bc5d1c1459936259cc8c63f',
        units: 'metric',
    },
});

export default weatherApi;
