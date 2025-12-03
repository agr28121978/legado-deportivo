/* =============================================
   navigation.js - Sistema de navegación
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    inicializarNavegacion();
});

function inicializarNavegacion() {
    // Resaltar página activa en navegación
    resaltarPaginaActiva();
    
    // Añadir eventos a enlaces de fichas
    setupFichasNavigation();
}

function resaltarPaginaActiva() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

function setupFichasNavigation() {
    // Botón "Volver" en fichas
    const btnVolver = document.querySelector('.btn-volver');
    if (btnVolver) {
        btnVolver.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    }
}
