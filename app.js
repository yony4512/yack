// Obtener elementos
const selectRegion = document.getElementById('selectRegion');
const listaPaises = document.getElementById('listaPaises');
const btnCargarPosts = document.getElementById('btnCargarPosts');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const listaPosts = document.getElementById('listaPosts');

// Función para mostrar spinner de carga
function showLoading(element) {
  element.innerHTML = '<div class="loading" style="width: 50px; height: 50px;"></div>';
}

// Función para formatear números (población)
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Función para obtener países por región
selectRegion.addEventListener('change', async () => {
  const region = selectRegion.value;
  if (!region) return;
  
  showLoading(listaPaises);
  
  const url = `https://restcountries.com/v3.1/region/${region}?fields=name,capital,population,flags`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener los países');
    const data = await response.json();
    
    // Ordenar países por nombre
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    
    listaPaises.innerHTML = `
      <div class="countries-grid">
        ${data.map(pais => `
          <div class="country-card">
            <img src="${pais.flags.png}" alt="Bandera de ${pais.name.common}" class="country-flag">
            <h3>${pais.name.common}</h3>
            <p><i class="fas fa-city"></i> <strong>Capital:</strong> ${pais.capital?.[0] ?? 'N/A'}</p>
            <p><i class="fas fa-users"></i> <strong>Población:</strong> ${formatNumber(pais.population)}</p>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    listaPaises.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <p>Error al obtener los países: ${error.message}</p>
      </div>
    `;
  }
});

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
