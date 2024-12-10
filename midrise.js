async function fetchMidriseData() {
    try {
        const response = await fetch('https://robsengelalcha.github.io/SD330/parking.json');
        const data = await response.json();
        displayMidriseSpots(data.parkingLots.Midrise.lots);
    } catch (error) {
        console.error('Error fetching Midrise parking data:', error);
    }
}

function getStatusIcon(availability) {
    switch(availability) {
        case 'available':
            return '<i class="fas fa-check-circle mr-2"></i>';
        case 'filled':
            return '<i class="fas fa-times-circle mr-2"></i>';
        case 'reserved':
            return '<i class="fas fa-clock mr-2"></i>';
        default:
            return '';
    }
}

function getStatusClass(availability) {
    switch(availability) {
        case 'available':
            return 'status-available';
        case 'filled':
            return 'status-filled';
        case 'reserved':
            return 'status-reserved';
        default:
            return '';
    }
}

function displayMidriseSpots(spots) {
    const container = document.getElementById('midriseSpots');
    
    spots.forEach(spot => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        
        const reservedInfo = spot.reservedDate !== "Not Reserved" 
            ? `<li><i class="fas fa-calendar-alt mr-2"></i>Reserved: ${spot.reservedDate}</li>`
            : '';

        card.innerHTML = `
            <div class="floating-card">
                <div class="card-body">
                    <h5 class="card-title">Spot ${spot.id}</h5>
                    <ul class="parking-info">
                        <li class="spot-type"><i class="fas fa-user mr-2"></i>Type: ${spot.type}</li>
                        <li><i class="fas fa-wheelchair mr-2"></i>Handicap: ${spot.handicap ? 'Yes' : 'No'}</li>
                        <li><i class="fas fa-parking mr-2"></i>Angle: ${spot.angle}</li>
                        <li class="${getStatusClass(spot.availability)}">
                            ${getStatusIcon(spot.availability)}Status: ${spot.availability}
                        </li>
                        ${reservedInfo}
                    </ul>
                    ${spot.availability === 'available' ? 
                        '<a href="404.html" class="btn btn-outline-danger">Reserve Spot</a>' : 
                        '<button class="btn btn-outline-danger" disabled>Unavailable</button>'}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', fetchMidriseData);