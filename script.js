// Conexión con Supabase
const supabase = createClient(
  'https://ofyalhphejzwzizqkzmi.supabase.co',  // URL de tu proyecto de Supabase
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9meWFsaHBoZWp6d3ppenFrem1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNTA4NzUsImV4cCI6MjA3ODkyNjg3NX0.RiTXrF_4qzLF27zaDnIAtKMBzyYrdMnzSzM0w1SBZF4'  // Clave pública
);

// Función para obtener los sorteos de la base de datos
async function getSorteos() {
  const { data, error } = await supabase
    .from('sorteos')  // Nombre de la tabla en Supabase
    .select('*');  // Selecciona todos los campos de los sorteos

  if (error) {
    console.error("Error al obtener sorteos: ", error);
    return [];
  }

  return data;
}

// Mostrar los sorteos en la página
window.onload = async function () {
  const sorteos = await getSorteos();
  
  if (sorteos.length > 0) {
    const sorteosContainer = document.getElementById('sorteos-container');
    sorteos.forEach(sorteo => {
      const sorteoElement = document.createElement('div');
      sorteoElement.classList.add('sorteo');
      sorteoElement.innerHTML = `
        <div class="sorteo-header">
          <h2>${sorteo.titulo}</h2>
          <span class="popular">¡Más Popular!</span>
        </div>
        <p>${sorteo.descripcion_corta}</p>
        <p>Precio por boleto: Bs. ${sorteo.precio_bs}</p>
        <button onclick="comprarBoleto('${sorteo.id}')">Comprar Boleto</button>
      `;
      sorteosContainer.appendChild(sorteoElement);
    });
  } else {
    console.log("No hay sorteos disponibles.");
  }
};
