// Obtener elementos
const selectRegion = document.getElementById('selectRegion');
const listaPaises = document.getElementById('listaPaises');
const btnCargarPosts = document.getElementById('btnCargarPosts');
const listaPosts = document.getElementById('listaPosts');

// Función para obtener países por región (REST Countries)
selectRegion.addEventListener('change', async () => {
  const region = selectRegion.value;
  const url = `https://restcountries.com/v3.1/region/${region}?fields=name,capital,population`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    listaPaises.innerHTML = "<ul>" +
      data.map(pais => `
        <li><strong>${pais.name.common}</strong> - Capital: ${pais.capital?.[0] ?? 'N/A'} - Población: ${pais.population}</li>
      `).join('') +
      "</ul>";
  } catch (error) {
    listaPaises.innerHTML = `<p>Error al obtener los países: ${error.message}</p>`;
  }
});

// Función para cargar publicaciones simuladas (JSONPlaceholder)
btnCargarPosts.addEventListener('click', async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts?_limit=5';
  try {
    const response = await fetch(url);
    const posts = await response.json();

    listaPosts.innerHTML = "<ul>" +
      posts.map(post => `
        <li><strong>${post.title}</strong><br/>${post.body}</li>
      `).join('') +
      "</ul>";
  } catch (error) {
    listaPosts.innerHTML = `<p>Error al obtener los posts: ${error.message}</p>`;
  }
});
