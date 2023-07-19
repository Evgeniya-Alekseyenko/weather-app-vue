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
    <h2 class="city-name">{{ city }}</h2>

    <div v-if="activeTab === 'day'">
        <div
            v-if="temperature !== null && city !== ''"
            class="forecast-item dayly"
        >
            <h3>{{ formatDate(date) }}</h3>
            <p v-if="temperature !== null">Temperature: {{ temperature }} °C</p>
            <p v-if="humidity">Humidity: {{ humidity }}%</p>
            <p v-if="description">Description: {{ description }}</p>
            <WeatherIcon :icon="icon" />
        </div>
        <div v-else>
            <p class="forecast-item-info">City not found</p>
        </div>
    </div>
    <div v-if="activeTab === 'week'">
        <div v-if="weeklyForecast.length > 0" class="forcast-weekly">
            <div
                v-for="forecast in weeklyForecast"
                :key="forecast.date"
                class="forecast-item"
                @mouseover="hoverCard"
                @mouseleave="unhoverCard"
            >
                <h3>{{ forecast.date }}</h3>
                <p>Temperature: {{ forecast.temperature }} °C</p>
                <p>Humidity: {{ forecast.humidity }}%</p>
                <p>Description: {{ forecast.description }}</p>
                <WeatherIcon :icon="icon" />
            </div>
        </div>
        <div v-else>
            <p class="forecast-item-info">No weekly forecast available.</p>
        </div>
    </div>
</template>

<script>
import { updateWeather, updateForecast } from '@/services/weatherService';
import WeatherIcon from '@/components/WeatherIcon.vue';

export default {
    components: {
        WeatherIcon,
    },
    props: {
        city: {
            type: String,
            default: '',
        },
        temperature: Number,
        humidity: Number,
        description: String,
        date: Date,
        icon: String,
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
        formatDate(date) {
            if (date) {
                const options = {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                };
                return date.toLocaleDateString(undefined, options);
            } else {
                return '';
            }
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

.city-name {
    text-align: center;
    text-transform: uppercase;
    color: #feb386;
}

.forecast-item {
    outline: none;
    border-color: #feb386;
    border-radius: 5px;
    box-shadow: 0 0 9px rgba(254, 179, 134, 0.7);
    padding: 5px 15px;
    flex-basis: 300px;
    margin: 10px;
    text-align: center;
    font-size: 18px;
    letter-spacing: 2px;
    background: rgba(254, 179, 134, 0.8);
    transition: background-color 0.3s ease, transform 0.3s ease;
    color: #fff;
}

.dayly {
    max-width: 400px;
    margin: 0 auto;
}

.forcast-weekly {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}

.forecast-item-info {
    text-align: center;
    font-size: 22px;
}

.forecast-item:hover {
    background-color: rgba(254, 179, 134, 0.6);
    transform: translateY(-5px);
    color: #000;
}

.forcast-weekly .forecast-item {
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.forcast-weekly .forecast-item.hovered-card {
    background-color: rgba(254, 179, 134, 0.6);
    transform: translateY(-5px);
}

@media (max-width: 768px) {
    .forcast-weekly .forecast-item {
        width: calc(50% - 10px);
        margin-bottom: 20px;
    }
}

@media (max-width: 400px) {
    .forcast-weekly .forecast-item {
        width: 100%;
    }
}
</style>
