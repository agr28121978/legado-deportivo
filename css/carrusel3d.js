/* =============================================
   carrusel3d.js - Carrusel 3D Espiral
   ============================================= */

class Carrusel3D {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Contenedor ${containerId} no encontrado`);
            return;
        }
        
        this.currentIndex = 0;
        this.totalItems = options.totalItems || 40;
        this.angleStep = 360 / this.totalItems;
        this.radius = options.radius || 800;
        this.autoRotate = options.autoRotate || false;
        this.rotationSpeed = options.rotationSpeed || 2000;
        
        this.init();
    }
    
    init() {
        this.setupControls();
        if (this.autoRotate) {
            this.startAutoRotation();
        }
        this.updateCarousel();
    }
    
    setupControls() {
        // Flechas de navegación
        document.querySelectorAll('.flecha-nav').forEach(arrow => {
            arrow.addEventListener('click', (e) => {
                if (arrow.classList.contains('flecha-izq')) {
                    this.rotate('prev');
                } else {
                    this.rotate('next');
                }
            });
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.rotate('prev');
            } else if (e.key === 'ArrowRight') {
                this.rotate('next');
            }
        });
        
        // Touch/Swipe en móvil
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                this.rotate('next');
            }
            if (touchEndX > touchStartX + 50) {
                this.rotate('prev');
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
    
    rotate(direction) {
        if (direction === 'next') {
            this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        }
        
        this.updateCarousel();
    }
    
    updateCarousel() {
        const angle = -this.currentIndex * this.angleStep;
        this.container.style.transform = `translateZ(-${this.radius}px) rotateY(${angle}deg)`;
    }
    
    startAutoRotation() {
        this.autoRotateInterval = setInterval(() => {
            this.rotate('next');
        }, this.rotationSpeed);
    }
    
    stopAutoRotation() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
    }
    
    goToIndex(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
}

// Función global para compatibilidad
function rotarCarrusel(direccion) {
    if (window.carrusel3D) {
        window.carrusel3D.rotate(direccion === 'izq' ? 'prev' : 'next');
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('carrusel')) {
        window.carrusel3D = new Carrusel3D('carrusel', {
            totalItems: 40,
            radius: 800,
            autoRotate: false
        });
    }
});

// Exportar funciones
window.rotarCarrusel = rotarCarrusel;
window.Carrusel3D = Carrusel3D;
