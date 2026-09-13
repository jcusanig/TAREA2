const fileSystem = {
    name: "Inicio",
    subfolders: [{
        name: "Documentos",
        subfolders: [{
            name: "Trabajo",
            subfolders: []
        }, {
            name: "Proyectos Personales",
            subfolders: []
        }]
    }, {
        name: "Imágenes",
        subfolders: [{
            name: "Vacaciones 2024",
            subfolders: []
        }, {
            name: "Fotos de Perfil",
            subfolders: []
        }]
    }, {
        name: "Música",
        subfolders: []
    }]
};

// La PILA (Stack) para gestionar el historial de navegación
// Inicializamos con el directorio raíz
const navigationStack = [fileSystem];

// Elementos del DOM
const btnBack = document.getElementById('btn-back');
const breadcrumbsContainer = document.getElementById('breadcrumbs');
const folderListContainer = document.getElementById('folder-list');

// Función para renderizar la interfaz según el estado actual de la Pila
function render() {
    // Obtener la carpeta actual (el elemento superior/último de la pila)
    const currentFolder = navigationStack[navigationStack.length - 1];

    // 1. Actualizar el estado del botón "Atrás"
    // Si la pila tiene solo 1 elemento (la raíz), el botón se deshabilita
    btnBack.disabled = navigationStack.length <= 1;

    // 2. Renderizar Migas de Pan (Breadcrumbs)
    breadcrumbsContainer.innerHTML = '';
    navigationStack.forEach((folder, index) => {
        const item = document.createElement('span');
        item.className = 'breadcrumb-item';
        item.textContent = folder.name;
        breadcrumbsContainer.appendChild(item);

        // Agregar separador '/' si no es el último elemento
        if (index < navigationStack.length - 1) {
            const separator = document.createElement('span');
            separator.className = 'breadcrumb-separator';
            separator.textContent = '>';
            breadcrumbsContainer.appendChild(separator);
        }
    });

    // 3. Renderizar las Subcarpetas de la carpeta actual
    folderListContainer.innerHTML = '';
    if (currentFolder.subfolders.length === 0) {
        folderListContainer.innerHTML = '<div class="empty-msg">Esta carpeta está vacía</div>';
    } else {
        currentFolder.subfolders.forEach((subfolder) => {
            const card = document.createElement('div');
            card.className = 'folder-card';
            card.onclick = () => openFolder(subfolder);

            card.innerHTML = `
                    <div class="folder-icon">📁</div>
                    <div class="folder-name">${subfolder.name}</div>
                `;
            folderListContainer.appendChild(card);
        });
    }
}

// OPERACIÓN APILAR (PUSH): Entrar a una carpeta
function openFolder(folder) {
    navigationStack.push(folder); // Se agrega la carpeta seleccionada al tope de la pila
    render();
}

// OPERACIÓN DESAPILAR (POP): Regresar a la carpeta anterior
function goBack() {
    if (navigationStack.length > 1) {
        navigationStack.pop(); // Se remueve el elemento del tope de la pila
        render();
    }
}

// Inicializar la vista por primera vez
render();