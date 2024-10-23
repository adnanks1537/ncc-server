async function getCadetInfo() {
    const cadetId = document.getElementById('cadetId').value;
    if (cadetId === '') {
        alert('Please enter a Cadet ID');
        return;
    }

    try {
        // Simulate an API call (replace with actual backend URL)
        const response = await fetch(`https://your-backend-api-url.com/cadet/${cadetId}`);
        if (!response.ok) {
            throw new Error('Cadet not found');
        }

        const cadetData = await response.json();
        displayCadetInfo(cadetData);
    } catch (error) {
        alert(error.message);
    }
}

function displayCadetInfo(cadetData) {
    const cadetInfoDiv = document.getElementById('cadetInfo');
    cadetInfoDiv.style.display = 'block';
    cadetInfoDiv.innerHTML = `
        <h3>Cadet Name: ${cadetData.name}</h3>
        <p>Cadet ID: ${cadetData.cadetId}</p>
        <p>Rank: ${cadetData.rank}</p>
        <p>Unit: ${cadetData.unit}</p>
    `;
}
