// Obtener elementos del DOM
const selectRegion = document.getElementById('selectRegion');
const listaPaises = document.getElementById('listaPaises');
const btnCargarPosts = document.getElementById('btnCargarPosts');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const listaPosts = document.getElementById('listaPosts');
const searchCountry = document.getElementById('searchCountry');
const btnSearch = document.getElementById('btnSearch');
const themeToggle = document.getElementById('themeToggle');
const populationChartCtx = document.getElementById('populationChart').getContext('2d');

// Variables globales
let countriesData = [];
let chart = null;

// Función para mostrar spinner de carga
function showLoading(element) {
  element.innerHTML = '<div class="loading" style="width: 50px; height: 50px; margin: 20px auto;"></div>';
}

// Función para formatear números (población)
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Función para renderizar países
function renderCountries(countries) {
  listaPaises.innerHTML = `
    <div class="countries-grid">
      ${countries.map(pais => `
        <div class="country-card">
          <img src="${pais.flags.png}" alt="Bandera de ${pais.name.common}" class="country-flag">
          <h3>${pais.name.common}</h3>
          <p><i class="fas fa-city"></i> <strong>Capital:</strong> ${pais.capital?.[0] ?? 'N/A'}</p>
          <p><i class="fas fa-users"></i> <strong>Población:</strong> ${formatNumber(pais.population)}</p>
          <p><i class="fas fa-globe"></i> <strong>Región:</strong> ${pais.region}</p>
        </div>
      `).join('')}
    </div>
  `;
  
  // Guardar datos para el gráfico
  countriesData = countries;
  updateChart();
}

// Función para actualizar el gráfico
function updateChart() {
  if (countriesData.length === 0) return;
  
  // Ordenar países por población (mayor a menor)
  const sortedCountries = [...countriesData].sort((a, b) => b.population - a.population).slice(0, 5);
  
  const labels = sortedCountries.map(country => country.name.common);
  const data = sortedCountries.map(country => country.population);
  
  if (chart) {
    chart.destroy();
  }
  
  chart = new Chart(populationChartCtx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Población',
        data: data,
        backgroundColor: '#4CAF50',
        borderColor: '#45a049',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return formatNumber(context.raw);
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return formatNumber(value);
            }
          }
        }
      }
    }
  });
}

// Función para obtener países por región
selectRegion.addEventListener('change', async () => {
  const region = selectRegion.value;
  if (!region) return;
  
  showLoading(listaPaises);
  
  const url = `https://restcountries.com/v3.1/region/${region}?fields=name,capital,population,flags,region`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener los países');
    const data = await response.json();
    
    // Ordenar países por nombre
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    renderCountries(data);
  } catch (error) {
    listaPaises.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Error al obtener los países: ${error.message}</p>
      </div>
    `;
  }
});

// Función para buscar países por nombre
btnSearch.addEventListener('click', searchCountries);
searchCountry.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchCountries();
});

async function searchCountries() {
  const term = searchCountry.value.trim();
  if (!term) return;
  
  showLoading(listaPaises);
  
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${term}?fields=name,capital,population,flags,region`);
    if (!response.ok) throw new Error('País no encontrado');
    const data = await response.json();
    
    // Ordenar países por nombre
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    renderCountries(data);
  } catch (error) {
    listaPaises.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// Función para cargar publicaciones simuladas
btnCargarPosts.addEventListener('click', async () => {
  btnText.textContent = 'Cargando...';
  btnLoader.style.display = 'inline-block';
  
  const url = 'https://jsonplaceholder.typicode.com/posts?_limit=5';
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener los posts');
    const posts = await response.json();
    
    listaPosts.innerHTML = `
      <div class="posts-list">
        ${posts.map(post => `
          <div class="post-card">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <div class="post-id">ID: ${post.id}</div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    listaPosts.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Error al obtener los posts: ${error.message}</p>
      </div>
    `;
  } finally {
    btnText.textContent = 'Cargar Posts';
    btnLoader.style.display = 'none';
  }
});

// Implementación del modo oscuro
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  }
});

// Cargar tema guardado
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Inicializar gráfico vacío
chart = new Chart(populationChartCtx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Población',
      data: [],
      backgroundColor: '#4CAF50'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
