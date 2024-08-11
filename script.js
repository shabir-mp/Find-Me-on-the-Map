const map = L.map("map").setView([-6.9175, 107.6191], 8); // Center on Bandung

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

document.getElementById("searchButton").addEventListener("click", function () {
  alert("Notes: To find more place, zoom out the maps");
  const name = document.getElementById("nameInput").value;
  if (name) {
    searchPlaces(name);
  } else {
    alert("Please enter a name.");
  }
});

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

function clearResults() {
  document.getElementById("results").innerHTML = "";
}

// Confetti
let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson",
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W;
  this.y = Math.random() * H - H;
  this.r = randomFromTo(11, 33);
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
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

for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

canvas.width = W;
canvas.height = H;
Draw();

alert("Welcome to : Find Me on the Map! by @shabirmp");
alert("Find your name on the map and share it with your friends!");
alert("Dont forget to support this project at Github : @shabirmp");
alert("Good Luck !");
