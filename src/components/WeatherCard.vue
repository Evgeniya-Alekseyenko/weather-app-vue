<template>
    <div class="tabs">
        <button
            :class="{ active: activeTab === 'day' }"
            @click="toggleTab('day')"
        >
            Day
        </button>
        <button
            :class="{ active: activeTab === 'week' }"
            @click="toggleTab('week')"
        >
            Week
        </button>
    </div>
    <h2>{{ city }}</h2>

    <div v-if="activeTab === 'day'">
        <div v-if="temperature !== null && city !== ''">
            <p v-if="temperature !== null">Temperature: {{ temperature }} °C</p>
            <p v-if="humidity">Humidity: {{ humidity }}%</p>
            <p v-if="description">Description: {{ description }}</p>
        </div>
        <div v-else>
            <p>City not found: {{ city }}</p>
        </div>
    </div>
    <div v-if="activeTab === 'week'">
        <div v-if="weeklyForecast.length > 0">
            <div v-for="forecast in weeklyForecast" :key="forecast.date">
                <h3>{{ forecast.date }}</h3>
                <p>Temperature: {{ forecast.temperature }} °C</p>
                <p>Humidity: {{ forecast.humidity }}%</p>
                <p>Description: {{ forecast.description }}</p>
            </div>
        </div>
        <div v-else>
            <p>No weekly forecast available.</p>
        </div>
    </div>
</template>

<script>
import { updateWeather, updateForecast } from '@/services/weatherService';

export default {
    props: {
        city: {
            type: String,
            default: '',
        },
        temperature: Number,
        humidity: Number,
        description: String,
    },
    data() {
        return {
            activeTab: 'day',
            localTemperature: this.temperature,
            localHumidity: this.humidity,
            localDescription: this.description,
            weeklyForecast: [],
        };
    },
    watch: {
        async city(newCity) {
            if (newCity === '') {
                this.localTemperature = null;
                this.localHumidity = null;
                this.localDescription = null;
                this.weeklyForecast = [];
            } else {
                const weatherData = await updateWeather(newCity);
                if (weatherData === null) {
                    this.localTemperature = null;
                    this.localHumidity = null;
                    this.localDescription = null;
                    this.weeklyForecast = [];
                } else {
                    this.localTemperature = weatherData.temperature;
                    this.localHumidity = weatherData.humidity;
                    this.localDescription = weatherData.description;
                    const weeklyForecast = await updateForecast(newCity);
                    this.weeklyForecast = weeklyForecast;
                }
            }
        },
    },

    methods: {
        toggleTab(tab) {
            this.activeTab = tab;
        },
    },
};
</script>

<style>
.tabs {
    display: flex;
    justify-content: center;
}

.tabs button {
    font-size: 16px;
    letter-spacing: 2px;
    color: #fff;
    padding: 10px;
    margin: 0 5px;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: #ccc;
    cursor: pointer;
    width: 70px;
    transition: background 0.3s ease, box-shadow 0.2s ease;
}

.tabs button.active {
    background: rgba(254, 179, 134, 0.8);
    color: #fff;
}
.tabs button:hover {
    background: rgba(254, 179, 134, 1);
    box-shadow: 0 0 9px rgba(254, 179, 134, 0.7);
}
</style>
