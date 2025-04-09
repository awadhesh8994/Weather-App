const input = document.querySelector('input');
    const btn = document.getElementById("btn");
    const icon = document.querySelector('.icon');
    const weather = document.querySelector('.weather');
    const temperature = document.querySelector('.temperature');
    const description = document.querySelector('.description');

    const apiKey = '3f57ebc2b108a9cb3e6d61a404e640f6';

    btn.addEventListener('click', () => {
        const city = input.value.trim();
        if (city) {
            getWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            btn.click();
        }
    });

    function getWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {
                const iconCode = data.weather[0].icon;
                icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon"/>`;

                const weatherCity = data.name;
                const weatherCountry = data.sys.country;
                weather.innerHTML = `${weatherCity}, ${weatherCountry}`;

                const temp = data.main.temp.toFixed(2);
                temperature.innerHTML = `${temp}°C`;

                const weatherDescription = data.weather[0].description;
                description.innerHTML = `${weatherDescription}`;

                input.value = ''; // Clear input field
            })
            .catch(error => {
                console.error(error);
                alert("Unable to fetch weather data. Please check the city name and try again.");
            });
    }