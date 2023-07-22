<template>
    <div class="weather-home">
        <div class="home-search">
            <WeatherInput @city-updated="updateCity" />
            <button type="button" class="btn">Favorite</button>
        </div>
        <div class="home-info">
            <WeatherCard
                :city="currentCity"
                :temperature="temperature"
                :temperatureMin="temperatureMin"
                :temperatureMax="temperatureMax"
                :humidity="humidity"
                :description="description"
                :date="date"
                :icon="icon"
            />
        </div>
    </div>
</template>

<script>
import { weatherApi } from '@/api/weatherApi';
import WeatherInput from '@/components/WeatherInput.vue';
import WeatherCard from '@/components/WeatherCard.vue';

export default {
    components: {
        WeatherInput,
        WeatherCard,
    },
    data() {
        return {
            currentCity: '',
            temperature: null,
            temperatureMin: null,
            temperatureMax: null,
            humidity: null,
            description: null,
            date: null,
            icon: null,
        };
    },
    methods: {
        async updateCity(city) {
            this.currentCity = city;
            if (city === '') {
                this.temperature = null;
                this.temperatureMin = null;
                this.temperatureMax = null;
                this.humidity = null;
                this.description = null;
                this.date = null;
                this.icon = null;
            } else {
                await this.updateWeather();
            }
        },
        async updateWeather() {
            try {
                const response = await weatherApi.get('weather', {
                    params: { q: this.currentCity },
                });
                this.temperature = Math.round(response.data.main.temp);
                this.temperatureMin = Math.round(response.data.main.temp_min);
                this.temperatureMax = Math.round(response.data.main.temp_max);
                this.humidity = response.data.main.humidity;
                this.description = response.data.weather[0].description;
                this.date = new Date(response.data.dt * 1000);
                this.icon = response.data.weather[0].icon;
            } catch (error) {
                this.temperature = null;
                this.temperatureMin = null;
                this.temperatureMax = null;
                this.humidity = null;
                this.description = null;
                this.date = null;
                this.icon = null;
            }
        },
    },
};
</script>

<style>
.weather-home,
.home-info {
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 9px rgba(254, 179, 134, 0.5);
    padding: 30px;
    margin: 15px;
    height: 100%;
}

.home-search {
    display: flex;
    align-items: center;
    justify-content: space-around;
}

@media (max-width: 530px) {
    .home-search {
        flex-direction: column;
    }
    .btn {
        margin-top: 10px;
    }
}

.btn {
    font-size: 16px;
    letter-spacing: 2px;
    color: #fff;
    background: rgba(254, 179, 134, 0.8);
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 9px rgba(254, 179, 134, 0.5);
    padding: 10px 20px;
    transition: background 0.3s ease, box-shadow 0.2s ease;
}
.btn:hover {
    background: rgba(254, 179, 134, 1);
    box-shadow: 0 0 9px rgba(254, 179, 134, 0.7);
}
</style>
