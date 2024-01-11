export function getStateFromCoordinates(latitude, longitude) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const address = data.address || {};
      const state = address.city || '';
      console.log(state);
      return state;
    });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  // Convert latitude and longitude from degrees to radians
  const radLat1 = (Math.PI / 180) * lat1;
  const radLon1 = (Math.PI / 180) * lon1;
  const radLat2 = (Math.PI / 180) * lat2;
  const radLon2 = (Math.PI / 180) * lon2;

  // Haversine formula
  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) *
      Math.cos(radLat2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = 6371 * c; // Radius of the Earth in kilometers

  return distance;
}

export function findClosestCity(userLatitude, userLongitude) {
  let closestCity = null;
  let minDistance = Infinity;

  for (const city of cities) {
    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      city.latitude,
      city.longitude,
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  }

  return closestCity;
}

const cities = [
  {name: 'delhi', latitude: 28.6139, longitude: 777.209},
  {name: 'Kolkata', latitude: 22.5726, longitude: 88.3639},
  {name: 'Mumbai', latitude: 19.076, longitude: 72.8777},
  {name: 'Hydrabad', latitude: 17.385, longitude: 78.4867},
  {name: 'Banglore', latitude: 12.9716, longitude: 77.5946},
  {name: 'Pune', latitude: 18.5204, longitude: 73.8567},
  {name: 'Jaipur', latitude: 26.9124, longitude: 75.7873},
  {name: 'Ahemdabad', latitude: 23.0225, longitude: 72.5714},
  {name: 'Lucknow', latitude: 26.8467, longitude: 80.9462},
  {name: 'Chennai', latitude: 13.0827, longitude: 80.2707},
];
