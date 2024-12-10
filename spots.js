async function fetchParkingData() {
    try {
        const response = await fetch('https://robsengelalcha.github.io/SD330/parking.json');
        const data = await response.json();
        displayParkingLots(data.parkingLots);
    } catch (error) {
        console.error('Error fetching parking data:', error);
    }
}

function displayParkingLots(parkingLots) {
    const container = document.getElementById('parkingLots');
    
    for (const [key, lot] of Object.entries(parkingLots)) {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        
        
        const viewSpacesLink = lot.name === 'Midrise' ? 'midrise.html' : '404.html';
        
        card.innerHTML = `
            <div class="floating-card">
                <div class="card-body">
                    <h5 class="card-title">${lot.name}</h5>
                    <ul class="parking-info">
                        <li><i class="fas fa-parking mr-2"></i>Total Spaces: ${lot.totalSpaces}</li>
                        <li><i class="fas fa-wheelchair mr-2"></i>Handicap Spaces: ${lot.handicapSpaces}</li>
                        <li><i class="fas fa-building mr-2"></i>Nearest Building: ${lot.nearestBuilding}</li>
                        <li><i class="fas fa-users mr-2"></i>Visitors Allowed: ${lot.visitorsAllowed ? 'Yes' : 'No'}</li>
                    </ul>
                    <a href="${viewSpacesLink}" class="btn btn-outline-danger">View Spaces</a>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    }
}


document.addEventListener('DOMContentLoaded', fetchParkingData);