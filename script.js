// Inicializar el cliente de Supabase
const supabase = createClient(
  'https://ofyalhphejzwzizqkzmi.supabase.co', // Tu URL de Supabase
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9meWFsaHBoZWp6d3ppenFrem1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNTA4NzUsImV4cCI6MjA3ODkyNjg3NX0.RiTXrF_4qzLF27zaDnIAtKMBzyYrdMnzSzM0w1SBZF4' // Tu Key de Supabase
);

// Función para obtener los sorteos de Supabase
async function getSorteos() {
  const { data, error } = await supabase
    .from('sorteos')  // Asegúrate de que el nombre de la tabla sea correcto
    .select('*'); // Seleccionar todos los registros

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

// Mostrar los sorteos
window.onload = async function () {
  const sorteos = await getSorteos();

  if (sorteos) {
    const sorteosContainer = document.getElementById('sorteos-container');
    sorteos.forEach(sorteo => {
      const sorteoElement = document.createElement('div');
      sorteoElement.classList.add('sorteo');
      sorteoElement.innerHTML = `
        <h2>${sorteo.titulo}</h2>
        <p>${sorteo.descripcion_corta}</p>
        <p>Precio por boleto: Bs. ${sorteo.precio_bs}</p>
        <button onclick="comprarBoleto('${sorteo.id}')">Comprar Boleto</button>
      `;
      sorteosContainer.appendChild(sorteoElement);
    });
  }
};
