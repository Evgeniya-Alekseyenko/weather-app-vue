<template>
    <div class="container">
        <ul class="menu-main">
            <li><router-link to="/">Home</router-link></li>
            <li>
                <router-link to="/favorites">Favorites</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import { weatherApi } from './api/weatherApi';
import WeatherInput from '@/components/WeatherInput';

export default {
    components: {
        WeatherInput,
    },
    data() {
        return {
            city: 'Kiev',
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
            console.error('Error getting weather data', error);
        }
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu+Condensed');

* {
    font-family: 'Ubuntu Condensed', sans-serif;
}
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
}

/* tabs */
.menu-main {
    list-style: none;
    margin: 40px 0 5px;
    padding: 25px 0 5px;
    text-align: center;
    background: white;
}
.menu-main li {
    display: inline-block;
}
.menu-main li:after {
    content: '|';
    color: #606060;
    display: inline-block;
    vertical-align: top;
}
.menu-main li:last-child:after {
    content: none;
}
.menu-main a {
    text-decoration: none;
    letter-spacing: 2px;
    position: relative;
    padding-bottom: 20px;
    margin: 0 34px 0 30px;
    font-size: 17px;
    text-transform: uppercase;
    display: inline-block;
    transition: color 0.2s;
}
.menu-main a,
.menu-main a:visited {
    color: #9d999d;
}
.menu-main a.current,
.menu-main a:hover {
    color: #feb386;
}
.menu-main a:before,
.menu-main a:after {
    content: '';
    position: absolute;
    height: 4px;
    top: auto;
    right: 50%;
    bottom: -5px;
    left: 50%;
    background: #feb386;
    transition: 0.8s;
}
.menu-main a:hover:before,
.menu-main .current:before {
    left: 0;
}
.menu-main a:hover:after,
.menu-main .current:after {
    right: 0;
}
@media (max-width: 450px) {
    .menu-main {
        padding-top: 0;
    }
    .menu-main li {
        display: block;
    }
    .menu-main li:after {
        content: none;
    }
    .menu-main a {
        padding: 25px 0 20px;
        margin: 0 30px;
    }
}
</style>
