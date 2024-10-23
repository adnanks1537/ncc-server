async function getCadetInfo() {
    const cadetId = $('#cadetId').val().trim();

    if (!cadetId) {
        alert('Please enter a valid Cadet ID');
        return;
    }

    // Show loader
    $('#loader').show();
    $('#cadetInfo').hide();

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
    } finally {
        // Hide loader
        $('#loader').hide();
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
    cadetInfoDiv.fadeIn(400);  // Smooth transition when displaying the data
}
