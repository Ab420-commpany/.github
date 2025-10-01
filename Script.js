document.addEventListener('DOMContentLoaded', () => {

  // Referencias a elementos
  const loginSection = document.getElementById('login-section');
  const presentacion = document.getElementById('presentacion');
  const menuArea = document.getElementById('menu-area');

  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');

  const logoLogin = document.getElementById('logoLogin'); // Logo como botón

  const btnCerrarSesion = document.getElementById('cerrarSesion');
  const btnGestorArchivos = document.getElementById('gestorArchivos');
  const btnAdminWeb = document.getElementById('adminWeb');

  // Paneles
  const panelGestor = document.getElementById('panel-gestor');
  const panelWeb = document.getElementById('panel-web');

  // --- NUEVO: GESTIÓN DE VISTAS Y NAVEGACIÓN ---

  /**
   * Función central para mostrar la vista correcta y ocultar las demás.
   * @param {string} viewName - El nombre de la vista a mostrar ('presentacion', 'login', 'menu', 'gestor', 'web').
   */
  function showView(viewName) {
    // Ocultar todas las secciones y paneles principales primero
    presentacion.classList.add('hidden');
    loginSection.classList.add('hidden');
    menuArea.classList.add('hidden');
    panelGestor.classList.add('hidden');
    panelWeb.classList.add('hidden');

    // Mostrar la sección principal correcta según la vista
    switch (viewName) {
      case 'presentacion':
        presentacion.classList.remove('hidden');
        break;
      case 'login':
        loginSection.classList.remove('hidden');
        break;
      case 'menu':
        menuArea.classList.remove('hidden');
        break;
      case 'gestor':
        menuArea.classList.remove('hidden');
        panelGestor.classList.remove('hidden'); // Muestra el panel específico
        break;
      case 'web':
        menuArea.classList.remove('hidden');
        panelWeb.classList.remove('hidden'); // Muestra el panel específico
        break;
    }
  }

  /**
   * Maneja el evento 'popstate' que se dispara con el botón/gesto "atrás".
   * @param {PopStateEvent} event - El evento que contiene el estado del historial.
   */
  function handlePopState(event) {
    if (event.state) {
      showView(event.state.view);
    } else {
      // Si no hay estado, volvemos a la vista inicial
      showView('presentacion');
    }
  }

  // 1. Establecer el estado inicial en el historial al cargar la página
  history.replaceState({ view: 'presentacion' }, 'Bienvenidos', window.location.pathname);

  // 2. Escuchar los eventos de "atrás" y "adelante" del navegador/celular
  window.addEventListener('popstate', handlePopState);

  // --- EVENTOS DE LA APLICACIÓN (MODIFICADOS) ---

  // Evento: clic en logo para mostrar formulario de login
  if (logoLogin) {
    logoLogin.addEventListener('click', () => {
      showView('login');
      history.pushState({ view: 'login' }, 'Iniciar Sesión', '#login');
    });
  }

  // Gestionar login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuario = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (usuario === 'admin' && pass === 'password') {
      loginMessage.innerText = 'Inicio de sesión exitoso.';
      loginMessage.style.color = 'green';
      loginForm.reset();
      
      showView('menu');
      history.pushState({ view: 'menu' }, 'Panel de Control', '#menu');

    } else {
      loginMessage.innerText = 'Usuario o contraseña incorrectos.';
      loginMessage.style.color = 'red';
    }
  });

  // Cerrar sesión
  btnCerrarSesion.addEventListener('click', () => {
    loginMessage.innerText = '';
    showView('presentacion');
    history.pushState({ view: 'presentacion' }, 'Bienvenidos', window.location.pathname);
  });

  // Botones para el gestor de archivos
const fileput= document.getElementByld('fileput');
const uploadButton= 
document.getElementById('uploadButton');
const fileList= document.getElementById('fileList');



// Evento para el boton de subir archivo
uploadButton.addEventListener('click',()=>{
  const files = fileinput.files;
  if (files.legth===0){
    alert('Por favor, selecciona un archivo para subir.');
    return;
  }


  // Recorrer Atchivos y Listar el Nuevo
  for (const file of files){
    const listitem = document.createElementNS('Li');

    // Nombre del Archivo
    const fileName = document.createTextNode(`${file.name} (${(file.size / 1024).toFixed(2)} KB)`);


      // Boton para Eliminar
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.classList.add('delete-btn');

      // Evento para eliminar el elemento de la lista
      deleteButton.addEventListener('click', () => {
        listItem.remove();
      });
      
      listItem.appendChild(fileName);
      listItem.appendChild(deleteButton);
      fileList.appendChild(listItem);
    }
  
    // Limpiar el input de archivos después de subirlos
    fileInput.value = ''; 
  });


  // Mostrar panel wb
  btnAdminWeb.addEventListener('click', () => {
    showView('web');
    history.pushState({ view: 'web' }, 'Administrador Web', '#web');
  });

  // --- NUEVO: GESTO DE DESLIZAR (SWIPE) PARA IR ATRÁS ---
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe

  document.body.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  document.body.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipeGesture();
  }, { passive: true });

  function handleSwipeGesture() {
    // Si el dedo se deslizó de izquierda a derecha...
    if (touchEndX > touchStartX + swipeThreshold) {
      history.back(); // ...vamos "atrás" en el historial.
    }
  }
});