
fetch('/api/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    }).catch((error) => {
        console.error('Error parsing JSON:', error);
    });
}).catch((error) => {
    console.error('Network error:', error);
});

const weatherForm = document.querySelector('form');
const inputCity = document.querySelector('#city');
const inputState = document.querySelector('#state');
const temperature = document.querySelector('#message1'); // Corrected selector
const humidity = document.querySelector('#message2'); // Corrected selector

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = inputCity;
    const state = inputState;

    fetch(`http://localhost:3000/weather?location=${encodeURIComponent(city + ',' + state)}`)
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                temperature.innerHTML = 'Error: ' + data.error; // Display errors in temperature paragraph
                humidity.innerHTML = ''; // Clear humidity paragraph if there's an error
            } else {
                console.log('Temperature:', data.temperature);
                console.log('Humidity:', data.humidity);
                temperature.innerHTML = 'Temperature: ' + data.temperature; // Assume data.temperature has the value
                humidity.innerHTML = 'Humidity: ' + data.humidity; // Assume data.humidity has the value
            }
        });
    })
    .catch((error) => {
        console.log('Fetch error:', error);
        temperature.innerHTML = 'Fetch failed'; // Handle fetch errors
        humidity.innerHTML = '';
    });
});
