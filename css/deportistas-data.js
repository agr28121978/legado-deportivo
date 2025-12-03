/* =============================================
   deportistas-data.js - Base de datos deportistas
   ============================================= */

const deportistasData = {
    // DEPORTISTAS INTERNACIONALES (40)
    internacionales: [
        {
            id: 1,
            nombre: "Paavo Nurmi",
            deporte: "Atletismo",
            pais: "Finlandia",
            año: 1897,
            imagen: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Paavo_Nurmi_1920.jpg",
            video: "https://www.youtube.com/embed/example",
            descripcion: "El 'Finlandés Volador' ganó 9 oros olímpicos y estableció 22 récords mundiales.",
            logros: ["9 medallas de oro olímpicas", "22 récords mundiales", "Pionero del entrenamiento científico"],
            ficha: "fichas/nurmi.html"
        },
        {
            id: 27,
            nombre: "Michael Jordan",
            deporte: "Baloncesto",
            pais: "USA",
            año: 1963,
            imagen: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Michael_Jordan_in_2014.jpg",
            video: "https://www.youtube.com/embed/example2",
            descripcion: "Considerado el mejor jugador de baloncesto de todos los tiempos.",
            logros: ["6 campeonatos NBA", "5 MVP", "10 títulos de anotación"],
            ficha: "fichas/jordan.html"
        },
        {
            id: 36,
            nombre: "Rafael Nadal",
            deporte: "Tenis",
            pais: "España",
            año: 1986,
            imagen: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Rafael_Nadal_2016_%28cropped%29.jpg",
            video: "https://www.youtube.com/embed/example3",
            descripcion: "El Rey de la Tierra Batida, con 22 Grand Slams incluyendo 14 Roland Garros.",
            logros: ["22 Grand Slams", "14 Roland Garros", "2 oros olímpicos"],
            ficha: "fichas/nadal.html"
        }
        // ... Agregar los 37 deportistas restantes
    ],
    
    // DEPORTISTAS ESPAÑOLES (25)
    espana: [
        {
            id: 36,
            nombre: "Rafael Nadal",
            deporte: "Tenis",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Rafael_Nadal_2016_%28cropped%29.jpg",
            destacado: "22 Grand Slams, 14 Roland Garros. Rey de la tierra batida.",
            ficha: "fichas/nadal.html"
        },
        {
            id: 41,
            nombre: "Pau Gasol",
            deporte: "Baloncesto",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Pau_Gasol_2015.jpg/440px-Pau_Gasol_2015.jpg",
            destacado: "2 anillos NBA, 6 All-Star, medallas olímpicas.",
            ficha: "fichas/gasol.html"
        }
        // ... Agregar los 23 deportistas restantes
    ]
};

// Funciones de utilidad
function getDeportistaById(id) {
    const todos = [...deportistasData.internacionales, ...deportistasData.espana];
    return todos.find(d => d.id === id);
}

function getDeportistasByDeporte(deporte) {
    const todos = [...deportistasData.internacionales, ...deportistasData.espana];
    return todos.filter(d => d.deporte === deporte);
}

function getDeportistasByPais(pais) {
    return deportistasData.internacionales.filter(d => d.pais === pais);
}

// Exportar
window.deportistasData = deportistasData;
window.getDeportistaById = getDeportistaById;
window.getDeportistasByDeporte = getDeportistasByDeporte;
window.getDeportistasByPais = getDeportistasByPais;
