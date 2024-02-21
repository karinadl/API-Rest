window.addEventListener('load', () => {
    let lon;
    let lat;

    let temperaturaValor = document.getElementById('temperatura-valor');
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion');
    let ubicacion = document.getElementById('ubicacion');
    let iconoAnimado = document.getElementById('icono-animado');
    let vientoVelocidad = document.getElementById('viento-velocidad');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude;
            lat = posicion.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=88563e22f74d797e3f932e6eb4fc0a6f&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let temp = Math.round(data.main.temp);
                    temperaturaValor.textContent = `${temp} °C`;

                    let desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();
                    ubicacion.textContent = data.name;
                    vientoVelocidad.textContent = `${data.wind.speed} m/s`;

                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                            iconoAnimado.src = 'animated/thunder.svg';
                            break;
                        case 'Drizzle':
                            iconoAnimado.src = 'animated/rainy-2.svg';
                            break;
                        case 'Rain':
                            iconoAnimado.src = 'animated/rainy-7.svg';
                            break;
                        case 'Snow':
                            iconoAnimado.src = 'animated/snowy-6.svg';
                            break;
                        case 'Clear':
                            iconoAnimado.src = 'animated/day.svg';
                            break;
                        case 'Atmosphere':
                            iconoAnimado.src = 'animated/weather.svg';
                            break;
                        case 'Clouds':
                            iconoAnimado.src = 'animated/cloudy-day-1.svg';
                            break;
                        default:
                            iconoAnimado.src = 'animated/cloudy-day-1.svg';
                    }
                })
                .catch(error => {
                    console.error('Error al obtener el pronóstico del tiempo:', error);
                });
        });
    }
});
