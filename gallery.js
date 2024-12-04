document.addEventListener('DOMContentLoaded', () => {
    const figures = document.querySelectorAll('.gallery figure');

    const timeZones = {
       'Lima': -5, // UTC -5 for Peru
        'Buenos Aires': -3, // UTC -3 for Buenos Aires, Argentina
        'Brazil': -3, // UTC -3 for Brazil
        'Colombia': -5 // UTC -5 for Colombia
    };

    const updateTimes = () => {
        const now = new Date();
        figures.forEach(figure => {
            const caption = figure.querySelector('figcaption');
            const location = caption.innerText.split(':')[0]; // Get the location from the caption
            
            // Calculate the local time based on the time zone offset
            let timeZoneOffset = timeZones[location] || 0; // Default to UTC if not found
            const localTime = new Date(now.getTime() + (timeZoneOffset * 60 * 60 * 1000)); // Convert hours to milliseconds
            
            // Format the local time and date
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false
            };
            const formattedTime = localTime.toLocaleString('en-US', options);
            
            // Update the caption with the formatted time
            caption.innerHTML = caption.innerHTML.split('<br>')[0]; // Keep the location description only
            caption.innerHTML += `<br>Current time in ${location} (UTC ${timeZoneOffset >= 0 ? '+' : ''}${timeZoneOffset}): ${formattedTime}`;
        });
    };

    // Countdown functionality
    const countdownDate = new Date("2024-12-31T12:00:00").getTime(); // Set your target date here

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the countdown
        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;

        // If the countdown is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "EXPIRED";
        }
    };

    // Initial time update
    updateTimes();
    updateCountdown(); // Initial countdown call

    // Update the time every minute
    setInterval(updateTimes, 60000);
    // Update the countdown every second
    setInterval(updateCountdown, 1000);
});
