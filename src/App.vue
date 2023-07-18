<template>
    <div class="container">
        <div class="tabs">
            <router-link to="/" class="tab-link">Home</router-link>
            <router-link to="/favorites" class="tab-link"
                >Favorites</router-link
            >
        </div>
        <router-view></router-view>
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

<style>
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* tabs */
.tabs {
    /* max-width: 90%; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ccc;
}

.tab-link {
    padding: 10px 20px;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    transition: background-color 0.2s ease;
}

.tab-link.active {
    background-color: #ccc;
}

.tab-link:hover {
    background-color: #ddd;
}

/* media queries */
@media (max-width: 768px) {
    .container {
        max-width: 90%;
        padding: 10px;
    }
}

@media (max-width: 360px) {
    .container {
        max-width: 100%;
        padding: 5px;
    }

    .tabs {
        padding: 5px;
    }
}
</style>
