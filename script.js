async function getCadetInfo() {
    const cadetId = $('#cadetId').val().trim();

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
        $('#cadetInfo').hide();  // Hide the info section if there is an error
    }
}

function displayCadetInfo(cadetData) {
    const cadetInfoDiv = $('#cadetInfo');
    cadetInfoDiv.html(`
        <h2>Cadet Information</h2>
        <p><strong>Name:</strong> ${cadetData.name}</p>
        <p><strong>Cadet ID:</strong> ${cadetData.cadetId}</p>
        <p><strong>Rank:</strong> ${cadetData.rank}</p>
        <p><strong>Unit:</strong> ${cadetData.unit}</p>
    `);
    cadetInfoDiv.show();  // Show the info section after successful retrieval
}
