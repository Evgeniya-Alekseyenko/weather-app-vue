<template>
    <div class="weather-icon">
        <img :src="getIconUrl(icon)" :alt="icon" />
    </div>
</template>

<script>
export default {
    props: {
        icon: String,
    },
    methods: {
        getIconUrl(icon) {
            const baseUrl = 'https://openweathermap.org/img/wn/';
            const iconUrl = `${baseUrl}${icon}@2x.png`;
            return iconUrl;
        },
    },
};
</script>

<style>
.weather-icon {
    text-align: center;
}

.weather-icon img {
    width: 50px;
    height: 50px;
}
</style>
