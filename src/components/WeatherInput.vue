<template>
    <div>
        <input
            class="weather-input"
            v-model="inputCity"
            :placeholder="inputProps.placeholder"
            :type="inputProps.type"
            @keydown="onKeyDown"
            @input="onInput"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputCity: '',
            inputProps: {
                placeholder: 'Enter city name',
                type: 'text',
            },
        };
    },
    methods: {
        onInput() {
            clearTimeout(this.timer);
            this.timer = setTimeout(this.updateCity, 900);
        },
        async updateCity() {
            // this.$emit('city-updated', this.inputCity);
            const trimmedCity = this.inputCity.trim();
            this.$emit('city-updated', trimmedCity);
        },
        onKeyDown(event) {
            if (/^\d+$/.test(event.key)) {
                event.preventDefault();
            }
        },
    },
};
</script>

<style>
.weather-input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    max-width: 280px;
    box-shadow: 0 0 9px rgba(254, 179, 134, 0.5);
}

.weather-input:focus {
    outline: none;
    border-color: #feb386;
    box-shadow: 0 0 9px rgba(254, 179, 134, 0.5);
}
</style>
