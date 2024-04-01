import { imgs } from './src/data/watherImages'
import './style.css'

// API url https://api.openweathermap.org
// API icons https://openweathermap.org/weather-conditions#How-to-get-icon-URL
const weather$$ = document.querySelector('#weather')
let map = L.map('map').setView([40.3095, -3.6842], 6)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)
/* obtener coordenadas del click en el mapa y hacer la petición de datos climaticos */
const realizarPeticion = async (e) => {
  weather$$.innerHTML = ''
  const { lat, lng } = e.latlng
  /* peticion al servidor de datos climaticos */
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  )
  const res = await response.json()
  const datos = document.createElement('div')

  const img = document.createElement('img')
  const name = document.createElement('h2')
  const Temp = document.createElement('h3')
  const humedad = document.createElement('p')
  const salidaSol = document.createElement('p')
  const salida = new Date(res.sys.sunrise * 1000)
  const ocultaSol = document.createElement('p')
  const puesta = new Date(res.sys.sunset * 1000)
  const viento = document.createElement('p')

  name.textContent = res.name
  Temp.textContent =
    'Temperatura: ' + String(Math.round(Number(res.main.temp) - 273.15) + 'ºC')
  humedad.textContent = 'Humedad: ' + res.main.humidity + '%'
  salidaSol.textContent =
    'Amanecer: ' + salida.getHours() + ':' + salida.getMinutes()
  ocultaSol.textContent =
    'Anochecer: ' + puesta.getHours() + ':' + puesta.getMinutes()
  viento.textContent = 'Velocidad de viento (km/h): ' + res.wind.speed
  img.src = `https://openweathermap.org/img/wn/${res.weather[0].icon}.png`
  weather$$.append(datos)
  datos.append(name)
  datos.append(Temp)
  datos.append(humedad)
  datos.append(salidaSol)
  datos.append(ocultaSol)
  datos.append(img)
  weather$$.style = `background-image: url(${
    imgs.find((img) => img.name === res.weather[0].main).img
  })`
  console.log(res)
}
map.on('click', realizarPeticion)
