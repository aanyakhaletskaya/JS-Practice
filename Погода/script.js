const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const cityNameEl = document.getElementById('city-name');
const tempEl = document.getElementById('temp');
const feelsLikeEl = document.getElementById('feels-like');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const pressureEl = document.getElementById('pressure');
const weatherIconEl = document.getElementById('weather-icon');
const forecastListEl = document.getElementById('forecast-list');
const errorMessageEl = document.getElementById('error-message');
const favoritesListEl = document.getElementById('favorites-list');
const favoriteStar = document.getElementById('favorite-star');
const appContainer = document.getElementById('app-container');

//  2. ПЕРЕМЕННЫЕ СОСТОЯНИЯ 
let currentCity = null;
let currentLat = null;
let currentLon = null;
let favorites = [];

//  3. КОНФИГУРАЦИЯ OPEN-METEO 
// Сервис геокодирования (превращает название города в координаты)
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
// API погоды
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

//  4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ 
function showError(message, type = 'error') {
    errorMessageEl.textContent = message;
    errorMessageEl.style.display = 'block';
    errorMessageEl.style.background = type === 'error' ? '#fed7d7' : '#c6f6d5';
    errorMessageEl.style.color = type === 'error' ? '#742a2a' : '#22543d';
    
    setTimeout(() => {
        errorMessageEl.style.display = 'none';
    }, 4000);
}

function hideError() {
    errorMessageEl.style.display = 'none';
}

function getWeatherIconAndDescription(weatherCode, isDay = 1) {
    // Коды погоды Open-Meteo (WMO)
    const weatherCodes = {
        0: { icon: '01d', desc: 'ясно' },
        1: { icon: '02d', desc: 'в основном ясно' },
        2: { icon: '03d', desc: 'переменная облачность' },
        3: { icon: '04d', desc: 'пасмурно' },
        45: { icon: '50d', desc: 'туман' },
        48: { icon: '50d', desc: 'туман' },
        51: { icon: '09d', desc: 'морось' },
        53: { icon: '09d', desc: 'морось' },
        55: { icon: '09d', desc: 'сильная морось' },
        61: { icon: '10d', desc: 'дождь' },
        63: { icon: '10d', desc: 'дождь' },
        65: { icon: '10d', desc: 'сильный дождь' },
        71: { icon: '13d', desc: 'снег' },
        73: { icon: '13d', desc: 'снег' },
        75: { icon: '13d', desc: 'сильный снег' },
        77: { icon: '13d', desc: 'снежные зерна' },
        80: { icon: '09d', desc: 'ливень' },
        81: { icon: '09d', desc: 'ливень' },
        82: { icon: '09d', desc: 'сильный ливень' },
        85: { icon: '13d', desc: 'снегопад' },
        86: { icon: '13d', desc: 'сильный снегопад' },
        95: { icon: '11d', desc: 'гроза' },
        96: { icon: '11d', desc: 'гроза с градом' },
        99: { icon: '11d', desc: 'гроза с градом' }
    };
    
    const weather = weatherCodes[weatherCode] || { icon: '03d', desc: 'облачно' };
    return weather;
}

/**
 * Изменить фон в зависимости от погоды
 */
function changeBackground(weatherCode) {
    appContainer.classList.remove('clear', 'clouds', 'rain', 'snow', 'thunderstorm', 'default');
    
    if (weatherCode === 0 || weatherCode === 1) {
        appContainer.classList.add('clear');
    } else if (weatherCode === 2 || weatherCode === 3) {
        appContainer.classList.add('clouds');
    } else if ((weatherCode >= 51 && weatherCode <= 65) || (weatherCode >= 80 && weatherCode <= 82)) {
        appContainer.classList.add('rain');
    } else if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) {
        appContainer.classList.add('snow');
    } else if (weatherCode >= 95) {
        appContainer.classList.add('thunderstorm');
    } else {
        appContainer.classList.add('default');
    }
}

// 5. ОСНОВНЫЕ ЗАПРОСЫ К API
async function searchCity(cityName) {
    const url = `${GEOCODING_URL}?name=${encodeURIComponent(cityName)}&count=1&language=ru&format=json`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Ошибка геокодирования');
    }
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
        throw new Error(`Город "${cityName}" не найден`);
    }
    
    const result = data.results[0];
    return {
        lat: result.latitude,
        lon: result.longitude,
        name: result.name,
        country: result.country
    };
}

async function getWeatherByCoords(lat, lon, cityInfo = null) {
    hideError();
    
    // Строим URL для запроса текущей погоды и прогноза
    const url = `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=6`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ошибка получения данных погоды');
        }
        
        const data = await response.json();
        
        // Если cityInfo не передан, значит нужно получить название города обратным геокодингом
        let cityDisplayName = cityInfo ? `${cityInfo.name}, ${cityInfo.country}` : `${lat}, ${lon}`;
        let citySimpleName = cityInfo ? cityInfo.name : `${lat}, ${lon}`;
        
        if (!cityInfo) {
            // Пытаемся получить название города через обратный геокодинг
            try {
                const reverseUrl = `${GEOCODING_URL}?latitude=${lat}&longitude=${lon}&count=1&language=ru&format=json`;
                const reverseResp = await fetch(reverseUrl);
                const reverseData = await reverseResp.json();
                if (reverseData.results && reverseData.results.length > 0) {
                    citySimpleName = reverseData.results[0].name;
                    cityDisplayName = `${reverseData.results[0].name}, ${reverseData.results[0].country}`;
                }
            } catch (e) {
                console.warn('Не удалось получить название города по координатам');
            }
        }
        
        currentCity = citySimpleName;
        currentLat = lat;
        currentLon = lon;
        
        // Отображаем текущую погоду
        displayCurrentWeather(data, cityDisplayName);
        
        // Отображаем прогноз
        displayDailyForecast(data);
        
        // Обновляем звездочку избранного
        updateFavoriteStar();
        
    } catch (error) {
        showError(error.message);
        console.error(error);
    }
}

function displayCurrentWeather(data, cityDisplayName) {
    const current = data.current;
    const weatherInfo = getWeatherIconAndDescription(current.weather_code);
    
    cityNameEl.textContent = cityDisplayName;
    tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
    feelsLikeEl.textContent = `Ощущается как ${Math.round(current.apparent_temperature)}°C`;
    descriptionEl.textContent = weatherInfo.desc;
    humidityEl.textContent = `${current.relative_humidity_2m}%`;
    
    // Ветер: м/с -> км/ч
    const windKmh = (current.wind_speed_10m * 3.6).toFixed(1);
    windEl.textContent = `${windKmh} км/ч`;
    
    // Давление: гПа -> мм рт. ст.
    const pressureMmHg = Math.round(current.pressure_msl * 0.75006);
    pressureEl.textContent = `${pressureMmHg} мм рт. ст.`;
    
    // Иконка
    weatherIconEl.src = `https://open-meteo.com/images/weather-icons/${current.weather_code}.svg`;
    weatherIconEl.alt = weatherInfo.desc;
    // Если SVG не загрузится, используем fallback
    weatherIconEl.onerror = function() {
        this.src = `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;
    };
    
    // Меняем фон
    changeBackground(current.weather_code);
}

function displayDailyForecast(data) {
    const daily = data.daily;
    const today = new Date();
    
    // Создаем массив прогнозов (пропускаем сегодняшний день, показываем со следующего)
    const forecasts = [];
    for (let i = 1; i <= 5 && i < daily.time.length; i++) {
        const date = new Date(daily.time[i]);
        const weatherInfo = getWeatherIconAndDescription(daily.weather_code[i]);
        const tempMax = Math.round(daily.temperature_2m_max[i]);
        const tempMin = Math.round(daily.temperature_2m_min[i]);
        
        forecasts.push({
            date: date,
            tempMax: tempMax,
            tempMin: tempMin,
            icon: daily.weather_code[i],
            desc: weatherInfo.desc
        });
    }
    
    if (forecasts.length === 0) {
        forecastListEl.innerHTML = '<p>Нет данных прогноза</p>';
        return;
    }
    
    forecastListEl.innerHTML = forecasts.map(forecast => {
        const dayName = forecast.date.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric' });
        
        return `
            <div class="forecast-card">
                <div class="forecast-date">${dayName}</div>
                <img class="forecast-icon" src="https://open-meteo.com/images/weather-icons/${forecast.icon}.svg" 
                     alt="${forecast.desc}"
                     onerror="this.src='https://openweathermap.org/img/wn/03d.png'">
                <div class="forecast-temp">${forecast.tempMax}° / ${forecast.tempMin}°</div>
                <div class="forecast-desc">${forecast.desc}</div>
            </div>
        `;
    }).join('');
}

//  6. ПОИСК ПО НАЗВАНИЮ ГОРОДА 
async function getWeatherByCityName(cityName) {
    if (!cityName || cityName.trim() === '') {
        showError('Введите название города');
        return;
    }
    
    cityNameEl.textContent = 'Поиск...';
    hideError();
    
    try {
        const city = await searchCity(cityName);
        await getWeatherByCoords(city.lat, city.lon, city);
        cityInput.value = city.name; // Подставляем правильное название
    } catch (error) {
        showError(error.message);
        cityNameEl.textContent = '--';
        forecastListEl.innerHTML = '';
    }
}

//  7. ГЕОЛОКАЦИЯ 
function getUserLocation() {
    if (!navigator.geolocation) {
        showError('Геолокация не поддерживается вашим браузером');
        return;
    }
    
    showError('📍 Определение местоположения...', 'success');
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude, null);
        },
        (error) => {
            let errorMsg = 'Не удалось определить местоположение. ';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg += 'Разрешите доступ к геолокации.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg += 'Информация недоступна.';
                    break;
                case error.TIMEOUT:
                    errorMsg += 'Время ожидания истекло.';
                    break;
                default:
                    errorMsg += 'Попробуйте ввести город вручную.';
            }
            showError(errorMsg);
        }
    );
}

//  8. ИЗБРАННЫЕ ГОРОДА 
const FAVORITES_KEY = 'weather_favorites';

function loadFavorites() {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
        favorites = JSON.parse(stored);
    } else {
        favorites = ['Москва', 'London', 'Tokyo'];
        saveFavorites();
    }
    renderFavorites();
}

function saveFavorites() {
    if (favorites.length > 5) favorites = favorites.slice(0, 5);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    renderFavorites();
}

function addToFavorites(city) {
    if (!city) return;
    if (favorites.includes(city)) {
        showError('Этот город уже в избранном!');
        return;
    }
    if (favorites.length >= 5) {
        showError('Можно добавить не более 5 городов!');
        return;
    }
    favorites.push(city);
    saveFavorites();
    showError('✅ Город добавлен в избранное!', 'success');
    updateFavoriteStar();
}

function removeFromFavorites(city) {
    const index = favorites.indexOf(city);
    if (index !== -1) {
        favorites.splice(index, 1);
        saveFavorites();
        showError('🗑️ Город удалён из избранного', 'success');
        updateFavoriteStar();
    }
}

function clearAllFavorites() {
    if (confirm('Вы уверены, что хотите очистить весь список избранных городов?')) {
        favorites = [];
        saveFavorites();
        showError('Список избранных очищен', 'success');
        updateFavoriteStar();
    }
}

function renderFavorites() {
    if (favorites.length === 0) {
        favoritesListEl.innerHTML = '<span style="color: #a0aec0;">Нет избранных городов</span>';
        return;
    }
    
    favoritesListEl.innerHTML = favorites.map(city => `
        <div class="fav-city" data-city="${city}">
            ⭐ ${city}
        </div>
    `).join('');
    
    document.querySelectorAll('.fav-city').forEach(el => {
        el.addEventListener('click', () => {
            const city = el.dataset.city;
            cityInput.value = city;
            getWeatherByCityName(city);
        });
    });
}

function updateFavoriteStar() {
    if (!currentCity) return;
    if (favorites.includes(currentCity)) {
        favoriteStar.textContent = '★';
        favoriteStar.classList.add('active');
    } else {
        favoriteStar.textContent = '☆';
        favoriteStar.classList.remove('active');
    }
}

//  9. ОБРАБОТЧИКИ СОБЫТИЙ
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) getWeatherByCityName(city);
    else showError('Введите название города');
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) getWeatherByCityName(city);
    }
});

locationBtn.addEventListener('click', getUserLocation);

favoriteStar.addEventListener('click', () => {
    if (!currentCity) {
        showError('Сначала найдите город');
        return;
    }
    if (favorites.includes(currentCity)) {
        removeFromFavorites(currentCity);
    } else {
        addToFavorites(currentCity);
    }
});

document.getElementById('clear-favorites')?.addEventListener('click', clearAllFavorites);

//  10. ИНИЦИАЛИЗАЦИЯ 
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    getWeatherByCityName('Москва');
});