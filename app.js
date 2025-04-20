/* Variables de color */
:root {
  --primary-color: #4CAF50;
  --primary-dark: #45a049;
  --secondary-color: #2c3e50;
  --light-color: #ecf0f1;
  --dark-color: #333;
  --shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* Reset mejorado */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: var(--dark-color);
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

/* Encabezado mejorado */
header {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 25px 40px;
  width: 100%;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: var(--shadow);
}

header h1 {
  font-size: 2.2rem;
  margin-bottom: 10px;
}

/* Contenedor principal */
.container {
  width: 100%;
  max-width: 1000px;
}

/* Secciones mejoradas */
section {
  background-color: white;
  width: 100%;
  padding: 25px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

section:hover {
  transform: translateY(-5px);
}

h2 {
  margin-bottom: 20px;
  color: var(--primary-color);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Formularios mejorados */
select, button {
  padding: 12px 20px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
}

select {
  background-color: white;
  cursor: pointer;
}

select:focus {
  border-color: var(--primary-color);
}

button {
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  font-weight: bold;
  border: none;
}

button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

/* Listas mejoradas */
ul {
  list-style: none;
  padding-left: 0;
}

li {
  padding: 15px;
  margin-bottom: 15px;
  background-color: var(--light-color);
  border-radius: 8px;
  transition: all 0.3s ease;
}

li:hover {
  background-color: #e0e0e0;
  transform: translateX(5px);
}

/* Efectos de carga */
.loading {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive design */
@media (max-width: 768px) {
  body {
    padding: 10px;
  }
  
  header h1 {
    font-size: 1.8rem;
  }
  
  section {
    padding: 15px;
  }
}
