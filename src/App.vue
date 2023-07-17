<template>
    <div>
        <h1>Погода в {{ city }}</h1>
        <p>Температура: {{ temperature }} °C</p>
        <p>Описание: {{ description }}</p>
    </div>
</template>

<script>
import weatherApi from './api/weatherApi';

export default {
    data() {
        return {
            city: 'London',
            temperature: null,
            description: null,
        };
    },
    async mounted() {
        try {
            const city = this.city;
            const response = await weatherApi.get('weather', {
                params: { q: city },
            });
            this.temperature = Math.round(response.data.main.temp);
            this.description = response.data.weather[0].description;
        } catch (error) {
            console.error('Ошибка при получении данных о погоде', error);
        }
    },
};
</script>
