// Función que simula el aumento del progreso en la barra
let boletosVendidos = 0;
const totalBoletos = 10000;

function actualizarBarraProgreso() {
  const progreso = (boletosVendidos / totalBoletos) * 100;
  document.getElementById('barra').style.width = `${progreso}%`;

  // Si alcanzamos el 100%, mostramos un mensaje de sorteo completo
  if (progreso >= 100) {
    alert("¡Sorteo completado! Todos los boletos han sido vendidos.");
  }
}

// Simulación de compra de boletos (esto será reemplazado por la lógica de verificación de pagos más adelante)
function simularCompra() {
  boletosVendidos += 1;  // Aumenta el contador de boletos vendidos
  actualizarBarraProgreso();  // Actualiza la barra de progreso
}

// Llamar a la función de simulación cada segundo para ver el cambio de la barra
setInterval(simularCompra, 1000);
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
