// script.js

// 🚨 IMPORTANTE: Reemplaza el contenido completo de tu script.js con este código.

// 1. Inicializar el cliente de Supabase
// Usamos window.onload para asegurarnos de que el script de Supabase (que está en index.html) ya se haya cargado.
window.onload = function () {
    // Verificamos que el objeto global 'supabase' exista después de cargar el CDN
    if (typeof supabase !== 'undefined') {
        
        // --- TUS CREDENCIALES ---
        const SUPABASE_URL = 'https://ofyalhphejzwzizqkzmi.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9meWFsaHBoZWp6d3ppenFrem1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNTA4NzUsImV4cCI6MjA3ODkyNjg3NX0.RiTXrF_4qzLF27zaDnIAtKMBzyYrdMnzSzM0w1SBZF4';

        // 🟢 CORRECCIÓN DEL ERROR: Usamos supabase.createClient()
        const supabaseClient = supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );

        // 2. Función para obtener los sorteos de Supabase
        async function getSorteos() {
            console.log('Intentando cargar sorteos desde Supabase...');
            
            // La tabla se llama 'sorteos'
            const { data, error } = await supabaseClient
                .from('sorteos')
                .select('*'); 

            if (error) {
                console.error('Error al obtener sorteos:', error);
                // Muestra un mensaje amigable en el HTML si hay un error
                document.getElementById('sorteos-container').innerHTML = 
                    '<p style="color: red;">Error al cargar los sorteos. Revisa la consola y tu configuración de Supabase.</p>';
                return null;
            }

            console.log('Sorteos cargados exitosamente:', data);
            return data;
        }

        // 3. Función para mostrar los sorteos en el HTML
        async function displaySorteos() {
            const sorteos = await getSorteos();
            const sorteosContainer = document.getElementById('sorteos-container');

            if (!sorteos || sorteos.length === 0) {
                if (!document.querySelector('p[style*="red"]')) {
                     sorteosContainer.innerHTML = '<h2>No hay sorteos disponibles por el momento.</h2>';
                }
                return;
            }

            // Limpiamos el contenedor antes de agregar los nuevos sorteos
            sorteosContainer.innerHTML = ''; 

            sorteos.forEach(sorteo => {
                const sorteoElement = document.createElement('div');
                // Usamos la clase 'sorteo' que definiste en styles.css
                sorteoElement.classList.add('sorteo'); 
                
                sorteoElement.innerHTML = `
                    <h2>${sorteo.titulo || 'Sorteo sin título'}</h2>
                    <p>${sorteo.descripcion_corta || 'Sin descripción.'}</p>
                    <p>Precio por boleto: **Bs. ${sorteo.precio_bs || 'N/A'}**</p>
                    <button onclick="comprarBoleto('${sorteo.id}')">Comprar Boleto</button>
                `;
                sorteosContainer.appendChild(sorteoElement);
            });
        }
        
        // 4. Definir la función comprarBoleto (para que el botón funcione)
        // Por ahora, solo es una función de prueba.
        window.comprarBoleto = function(sorteoId) {
            alert('Has seleccionado comprar un boleto para el sorteo con ID: ' + sorteoId + '. Aquí iría la lógica de pago.');
            console.log('Comprar boleto ID:', sorteoId);
        };


        // 5. Iniciar la carga de sorteos
        displaySorteos();

    } else {
        // Esto ocurre si el archivo 'index.html' no cargó el script de Supabase correctamente.
        console.error("❌ Supabase no está definido. Revisa el archivo index.html para asegurar que la línea del CDN de Supabase está presente y correcta.");
        document.getElementById('sorteos-container').innerHTML = 
            '<h2 style="color: red;">Error crítico: No se cargó la librería de Supabase.</h2>';
    }
};
