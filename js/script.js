
const images = [
    'https://gaceta.cch.unam.mx/sites/default/files/styles/imagen_articulos_1920x1080/public/2023-09/pag_62.jpg?h=208bb47f&itok=Nj1QrlLd',
    'https://wallpapers.com/images/featured/fondos-de-hermosos-paisajes-wnxju2647uqrcccv.jpg',
    'https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2022/11/22/lago-kawaguchiko.jpeg',
    'https://multimedia.andalucia.org/media/60DBA931A7E0442C961B1EC45AB4EC30/img/322BD52AE4D54D849FBBD6387C91D594/19-18_Playa_de_Monsul_Almeria.jpg?responsive',
    'https://wallpapers.com/images/hd/nature-scenery-3840-x-2160-picture-3af2kc5s6203e3n2.jpg',
    'https://www.pyb.travel/blog/wp-content/uploads/2023/06/1-min-3.jpg',
    'https://www.ferraraporter.com/wp-content/uploads/2022/03/Badab-e-Surt.jpg',
    'https://culturafotografica.es/wp-content/uploads/2016/06/Cala_Cap_Roig-Girona-2016-1.jpg',
    'https://wallpapers.com/images/hd/scenery-background-5981uwa34170hwys.jpg',
    'https://www.malabruxa.com/wp-content/uploads/2023/11/Malabruxa_paisajes-y-experiencias-Camino-de-Santiago.png',
];

function changeBackgroundImage() {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage = `url('${randomImage}')`;
    document.body.style.backgroundSize = "cover";  
    document.body.style.backgroundPosition = "center"; 
}

setInterval(changeBackgroundImage, 15000);
changeBackgroundImage(); 

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    document.getElementById('date').textContent = `${day}/${month}/${year}`;
    updateMessage(now.getHours());
}

function updateMessage(hours) {
    let message = '';

    if (hours >= 0 && hours < 7) {
        message = 'Es hora de descansar. Apaga y sigue mañana';
    } else if (hours >= 7 && hours < 12) {
        message = 'Buenos días, desayuna fuerte y a darle al código';
    } else if (hours >= 12 && hours < 14) {
        message = 'Echa un rato más pero no olvides comer';
    } else if (hours >= 14 && hours < 16) {
        message = 'Espero que hayas comido';
    } else if (hours >= 16 && hours < 18) {
        message = 'Buenas tardes, el último empujón';
    } else if (hours >= 18 && hours < 22) {
        message = 'Esto ya son horas extras... piensa en parar pronto';
    } else if (hours >= 22 && hours < 24) {
        message = 'Buenas noches, es hora de pensar en parar y descansar';
    }

    document.getElementById('message').textContent = message;
}

setInterval(updateClock, 1000);
updateClock();

async function getWeather() {
    const apiKey = '7d10b43219384fe8b4f174739241012';
    const city = 'Madrid';
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById('location').textContent = `${data.location.name}, ${data.location.country}`;
        const weatherInfo = `
            <img src="${data.current.condition.icon}" alt="weather icon">
            <p>${data.current.condition.text}, ${data.current.temp_c}°C</p>
        `;
        const weatherDetails = `
            <p>Precipitación: ${data.current.precip_mm} mm</p>
            <p>Humedad: ${data.current.humidity}%</p>
            <p>Viento: ${data.current.wind_kph} km/h</p>
        `;

        document.getElementById('weather-info').innerHTML = weatherInfo;
        document.getElementById('weather-details').innerHTML = weatherDetails;

        let forecastHTML = '';
        data.forecast.forecastday[0].hour.forEach(hour => {
            forecastHTML += `
                <div class="forecast-hour">
                    <p>${hour.time.split(' ')[1]}</p>
                    <img src="${hour.condition.icon}" alt="forecast icon">
                    <p>${hour.temp_c}°C</p>
                </div>
            `;
        });
        document.getElementById('forecast').innerHTML = forecastHTML;

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

getWeather();

function generatePassword() {
    const length = document.getElementById('length').value;
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+';
    const allChars = upperCase + lowerCase + numbers + symbols;

    let password = '';

    if (length < 12 || length > 50) {
        document.getElementById('result').textContent = 'Longitud inválida. Debe estar entre 12 y 50 caracteres.';
        return;
    }

    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');

    document.getElementById('result').textContent = password;
}

document.getElementById('generateBtn').addEventListener('click', generatePassword);
