// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const selectRegion = document.getElementById("selectRegion");
  const listaPaises = document.getElementById("listaPaises");
  const btnCargarPosts = document.getElementById("btnCargarPosts");
  const listaPosts = document.getElementById("listaPosts");

  // Función para cargar países según la región seleccionada
  selectRegion.addEventListener("change", () => {
    const region = selectRegion.value;

    fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((response) => response.json())
      .then((data) => {
        listaPaises.innerHTML = data.map(pais => `
          <div class="card">
            <strong>${pais.name.common}</strong><br>
            Capital: ${pais.capital?.[0] ?? 'N/A'}<br>
            Población: ${pais.population.toLocaleString()}
          </div>
        `).join('');
      })
      .catch((error) => {
        listaPaises.innerHTML = "<p>Error al cargar los países. Intenta nuevamente.</p>";
        console.error("Error al obtener países:", error);
      });
  });

  // Cargar la primera región por defecto (opcional)
  selectRegion.dispatchEvent(new Event('change'));

  // Función para cargar publicaciones simuladas
  btnCargarPosts.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((response) => response.json())
      .then((posts) => {
        listaPosts.innerHTML = posts.map(post => `
          <div class="card">
            <strong>${post.title}</strong>
            <p>${post.body}</p>
          </div>
        `).join('');
      })
      .catch((error) => {
        listaPosts.innerHTML = "<p>Error al cargar publicaciones. Intenta más tarde.</p>";
        console.error("Error al obtener posts:", error);
      });
  });
});
