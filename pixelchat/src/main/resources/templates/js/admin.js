window.addEventListener('DOMContentLoaded', (event) => {
    let currentDate = new Date();

    // Options to format the date
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    // Format the date
    let formattedDate = currentDate.toLocaleDateString('en-US', options);

    // Insert the formatted date into the HTML element
    document.getElementById('currentDate').textContent = formattedDate;
});
