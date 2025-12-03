
/* =============================================
   LEGADO DEPORTIVO GLOBAL 3D
   main.js - Archivo JavaScript Principal
   ============================================= */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏆 Legado Deportivo Global 3D - Iniciado');
    
    // Inicializar módulos
    inicializarHeader();
    inicializarScrollSuave();
    inicializarAnimaciones();
    inicializarAccesibilidad();
});

/* =============================================
   HEADER - Efectos scroll y navegación
   ============================================= */
function inicializarHeader() {
    const header = document.querySelector('.header-global');
    
    if (!header) return;
    
    // Efecto al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Resaltar enlace activo según página actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* =============================================
   SCROLL SUAVE - Enlaces ancla
   ============================================= */
function inicializarScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* =============================================
   ANIMACIONES - Intersection Observer
   ============================================= */
function inicializarAnimaciones() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase animate
    document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
        observer.observe(el);
    });
}

/* =============================================
   ACCESIBILIDAD - Alto contraste
   ============================================= */
function inicializarAccesibilidad() {
    // Cargar preferencia guardada
    if (localStorage.getItem('alto-contraste') === 'true') {
        document.body.classList.add('alto-contraste');
    }
}

function toggleAccesibilidad() {
    document.body.classList.toggle('alto-contraste');
    const isActive = document.body.classList.contains('alto-contraste');
    localStorage.setItem('alto-contraste', isActive);
    
    console.log(`Modo alto contraste: ${isActive ? 'ACTIVADO' : 'DESACTIVADO'}`);
}

/* =============================================
   UTILIDADES - Funciones auxiliares
   ============================================= */

// Formatear número con separador de miles
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Detectar dispositivo móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Obtener parámetro de URL
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Mostrar notificación temporal
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/* =============================================
   EXPORTAR funciones globales
   ============================================= */
window.toggleAccesibilidad = toggleAccesibilidad;
window.showNotification = showNotification;
window.getURLParameter = getURLParameter;
// ============================================
// SISTEMA DE NAVEGACIÓN INTELIGENTE
// Gestiona enlaces entre deportistas internacionales y españoles
// ============================================

const deportistasInternacionales = {
    1: { nombre: "Paavo Nurmi", ficha: "fichas/nurmi.html", esEspanol: false },
    2: { nombre: "Bobby Jones", ficha: "fichas/jones.html", esEspanol: false },
    // ... 40 deportistas internacionales
    27: { nombre: "Michael Jordan", ficha: "fichas/jordan.html", esEspanol: false },
    // ...
    40: { nombre: "Simone Biles", ficha: "fichas/biles.html", esEspanol: false },
    41: { nombre: "España", ficha: "espana.html", esEspanol: true, tipo: "colectivo" }
};

const deportistasEspana = {
    1: { nombre: "Rafael Nadal", ficha: "fichas/nadal.html", estaEnInternacional: true, posicionInternacional: 36 },
    2: { nombre: "Pau Gasol", ficha: "fichas/gasol.html", estaEnInternacional: true, posicionInternacional: 27 },
    3: { nombre: "Fernando Alonso", ficha: "fichas/alonso.html", estaEnInternacional: false },
    4: { nombre: "Miguel Induráin", ficha: "fichas/indurain.html", estaEnInternacional: false },
    // ... 25 deportistas españoles
};

// Función para abrir ficha de deportista
function abrirFichaDeportista(id, origen = 'internacional') {
    let deportista;

    if (origen === 'internacional') {
        deportista = deportistasInternacionales[id];
    } else if (origen === 'espana') {
        deportista = deportistasEspana[id];
    }

    if (deportista) {
        // Navegación a la ficha individual
        window.location.href = deportista.ficha;

        // Guardar información de navegación en localStorage
        localStorage.setItem('origenNavegacion', origen);
        localStorage.setItem('deportistaActual', id);
    }
}

// Función para volver al origen correcto
function volverAlOrigen() {
    const origen = localStorage.getItem('origenNavegacion');

    if (origen === 'espana') {
        window.location.href = 'espana.html';
    } else {
        window.location.href = 'galeria.html';
    }
}