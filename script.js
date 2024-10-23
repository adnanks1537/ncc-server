async function getCadetInfo() {
    const cadetId = document.getElementById('cadetId').value.trim();

    if (!cadetId) {
        alert('Please enter a Cadet ID');
        return;
    }

    try {
        const response = await fetch(`https://ncc-server.onrender.com/cadet/${cadetId}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const cadetData = await response.json();
        displayCadetInfo(cadetData);
    } catch (error) {
        console.error('Error fetching cadet information:', error);
        alert('Error fetching cadet information: ' + error.message);
    }
}

function displayCadetInfo(cadetData) {
    const cadetInfoDiv = document.getElementById('cadetInfo');
    cadetInfoDiv.innerHTML = `
        <h2>Cadet Information</h2>
        <p><strong>Name:</strong> ${cadetData.name}</p>
        <p><strong>Cadet ID:</strong> ${cadetData.cadetId}</p>
        <p><strong>Rank:</strong> ${cadetData.rank}</p>
        <p><strong>Unit:</strong> ${cadetData.unit}</p>
    `;
}
