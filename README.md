<p align="center">
<img src="https://github.com/user-attachments/assets/fdfa7c0c-aafb-48b8-bb46-0d688e951749" width="120" />
<h1 align="center">Find Me on The Map!</h1>
</p>

"Find Me on the Map!" is an interactive web application designed to provide users with a fun and engaging way to search for the occurrence of their name across the globe. Whether you're curious about places that share your name or simply want to explore the world through a personalized lens, this app brings the map to life with a dynamic search experience and celebratory effects.
> [!TIP]
> Did you know ? This project was made during and for my birthday on August 11th.

## About
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/shabir-mp/Image-Background-Remover/blob/main/LICENSE)

- **Developer:** Shabir Mahfudz Prahono - @shabir-mp
- **Application creation date:** 11 August 2024

## Usage
- Enter Your Name:
Open the web application and type your name in the input field located at the top of the page.
- Start the Search:
Click the "Find Me!" button to initiate the search. The application will query the map for any locations that match the name you've entered.
- Explore the Results:
If the search is successful, markers will appear on the map, indicating places that match your name. Simultaneously, a confetti animation will celebrate your discovery!
- Interact with the Map:
Use your mouse or touch gestures to zoom in and out, or drag the map to explore different regions. You can click on the markers to get more information about each location.

## Features
- **Interactive Mapping:** The application uses Leaflet.js, a leading open-source library for mobile-friendly interactive maps. Users can pan, zoom, and interact with the map to explore various locations around the world.
- **Name Search Functionality:** The core feature of the application is a search bar where users can input their name. Upon clicking the "Find Me!" button, the app searches for locations that match the input and displays them on the map.
- **Confetti Celebration:** To enhance user engagement, the app includes a playful confetti effect that is triggered when the search yields results. This adds a layer of fun and excitement, making the discovery process more enjoyable.
- **Responsive Design:** The application is designed to be fully responsive, ensuring that it works seamlessly across different devices, including desktops, tablets, and smartphones.

## File Structure
- **HTML (index.html):**
  The main structure of the web page is defined in the `index.html` file. It sets up the layout, including the map container, input field, and buttons. The file also links to the necessary CSS and JavaScript resources.

- **CSS (style.css):**
  All styling for the application is handled in the `style.css` file. It includes styles for the page layout, map container, input field, buttons, and other elements to ensure a visually appealing and cohesive design.

- **JavaScript (script.js):**
  The `script.js` file contains the logic that powers the interactive elements of the application. This includes handling user input, performing the name search, updating the map with search results, and triggering the confetti animation.

- **External Libraries:**
**Leaflet.js:** This is the main library used for rendering the map. It is linked externally via a CDN in the `index.html` file.

## Code Explanations (script.js)

### 1. **Map Initialization**

```javascript
const map = L.map("map").setView([-6.9175, 107.6191], 8); // Center on Bandung

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);
```

- **L.map("map").setView([-6.9175, 107.6191], 8);**  
  This line initializes a Leaflet map centered on Bandung, Indonesia, with coordinates (-6.9175, 107.6191) and a zoom level of 8.
  
- **L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);**  
  This line adds a tile layer to the map using tiles from OpenStreetMap. The `maxZoom` is set to 19, which is the highest zoom level available for these tiles.

### 2. **Search Functionality**

```javascript
document.getElementById("searchButton").addEventListener("click", function () {
  alert("Notes: To find more place, zoom out the maps");
  const name = document.getElementById("nameInput").value;
  if (name) {
    searchPlaces(name);
  } else {
    alert("Please enter a name.");
  }
});
```

- **Event Listener for Search Button:**  
  This code listens for a click event on the "Find Me!" button. When clicked, it alerts the user to zoom out to find more places. It then retrieves the name entered by the user and calls the `searchPlaces()` function if the name is provided. If the input is empty, it alerts the user to enter a name.

### 3. **Search Function (`searchPlaces`)**

```javascript
function searchPlaces(name) {
  const query = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    name
  )}&format=json&addressdetails=1`;

  fetch(query)
    .then((response) => response.json())
    .then((data) => {
      clearResults();
      if (data.length > 0) {
        data.forEach((place) => {
          addMarker(place);
          displayResult(place);
        });
        map.setView([data[0].lat, data[0].lon], 10); // Center map on the first result
      } else {
        alert("No places found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      alert("An error occurred while searching.");
    });
}
```

- **Query Construction:**  
  A query URL is built using the OpenStreetMap Nominatim API to search for the input name. The `encodeURIComponent` function ensures that special characters in the name are properly encoded.

- **Fetching Data:**  
  The `fetch()` function sends the query to the API and retrieves the results in JSON format. If data is returned, it calls `clearResults()` to reset previous search results, and processes each result by calling `addMarker()` and `displayResult()`.

- **Error Handling:**  
  If no places are found, it alerts the user. If there’s an error during the API call, it logs the error to the console and alerts the user.

### 4. **Adding Markers and Displaying Results**

```javascript
function addMarker(place) {
  const marker = L.marker([place.lat, place.lon]).addTo(map);
  marker.bindPopup(place.display_name).openPopup();
}

function displayResult(place) {
  const resultsDiv = document.getElementById("results");
  const resultItem = document.createElement("div");
  resultItem.innerText = place.display_name;
  resultsDiv.appendChild(resultItem);
}
```

- **`addMarker(place)`:**  
  This function adds a marker to the map at the location specified by the latitude (`place.lat`) and longitude (`place.lon`). It also binds a popup to the marker, displaying the place’s name (`place.display_name`).

- **`displayResult(place)`:**  
  This function adds the place’s name to the results section of the web page. It creates a new `div` element, sets its text to the place’s name, and appends it to the `results` div.

### 5. **Clearing Results**

```javascript
function clearResults() {
  document.getElementById("results").innerHTML = "";
}
```

- **`clearResults()`:**  
  This function clears any previous search results by setting the `results` div’s `innerHTML` to an empty string.

### 6. **Confetti Animation**

```javascript
// Confetti Animation Setup
let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", 
  "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson",
];

// Confetti Particle Constructor Function
function confettiParticle() {
  this.x = Math.random() * W;
  this.y = Math.random() * H - H;
  this.r = randomFromTo(11, 33);
  this.d = Math.random() * maxConfettis + 11;
  this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function () {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

// Draw Function to Render Confetti Animation
function Draw() {
  const results = [];

  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

// Handle Window Resize Events
window.addEventListener(
  "resize",
  function () {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Initialize Confetti Particles
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

canvas.width = W;
canvas.height = H;
Draw();
```

- **Confetti Particle Setup:**  
  The confetti particles are created using a `confettiParticle` constructor function. Each particle has properties like position (`x`, `y`), size (`r`), density (`d`), color, and tilt angle. The `draw()` function is responsible for rendering each particle on the canvas.

- **Draw Function:**  
  This function is continuously called using `requestAnimationFrame()` to animate the confetti. It clears the canvas, draws each particle, and updates their positions and angles. If a particle moves off-screen, it is repositioned at the top.

- **Resize Handling:**  
  The `resize` event listener ensures that the canvas resizes along with the browser window, keeping the confetti animation consistent.

- **Initialization:**  
  The confetti animation is initialized by creating `maxConfettis` particles and starting the `Draw()` function.

### 7. **Welcome Alerts**

```javascript
alert("Welcome to : Find Me on the Map! by @shabirmp");
alert("Find your name on the map and share it with your friends!");
alert("Dont forget to support this project at Github : @shabirmp");
alert("Good Luck !");
```

- **Welcome Messages:**  
  These alerts welcome the user to the application, encourage them to find their name on the map, and prompt them to support the project on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

-----------------------------------------------------------------------------------------
![Github Footer](https://github.com/shabir-mp/Kereta-Api-Indonesia-Booking-System/assets/133546000/c1833fe4-f470-494f-99e7-d583421625be)
