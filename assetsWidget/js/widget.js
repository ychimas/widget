(function() {
    // Crear el contenedor del widget
    var widgetContainer = document.createElement('div');
    widgetContainer.id = 'accessibility-widget';
    widgetContainer.style.position = 'fixed';
    widgetContainer.style.bottom = '20px';
    widgetContainer.style.right = '20px';
    widgetContainer.style.zIndex = '1000';

    // Crear el botón del widget (solo ícono y redondo)
    var widgetButton = document.createElement('button');
    widgetButton.innerHTML = '<i class="fas fa-universal-access"></i>';
    widgetButton.style.backgroundColor = '#007BFF';
    widgetButton.style.color = '#FFFFFF';
    widgetButton.style.border = 'none';
    widgetButton.style.padding = '15px'; // Ajustar el padding para que sea redondo
    widgetButton.style.borderRadius = '50%'; // Hacerlo redondo
    widgetButton.style.cursor = 'pointer';
    widgetButton.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    widgetButton.style.display = 'flex';
    widgetButton.style.alignItems = 'center';
    widgetButton.style.justifyContent = 'center';
    widgetButton.style.width = '60px'; // Tamaño fijo
    widgetButton.style.height = '60px'; // Tamaño fijo

    // Aumentar el tamaño del ícono
    var icon = widgetButton.querySelector('i');
    icon.style.fontSize = '40px'; // Tamaño del ícono más grande

    // Crear el menú de opciones
    var widgetMenu = document.createElement('div');
    widgetMenu.id = 'widget-menu';
    widgetMenu.style.display = 'none'; // Ocultar por defecto
    widgetMenu.style.backgroundColor = '#FFFFFF';
    widgetMenu.style.border = '1px solid #DDD';
    widgetMenu.style.borderRadius = '5px';
    widgetMenu.style.padding = '10px';
    widgetMenu.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    widgetMenu.style.maxHeight = '80vh'; // Altura máxima del menú (80% del viewport)
    widgetMenu.style.overflowY = 'auto'; // Añadir scroll vertical si el contenido es muy largo
    widgetMenu.style.position = 'fixed'; // Fijar el menú
    widgetMenu.style.bottom = '70px'; // Posición fija
    widgetMenu.style.right = '20px'; // Posición fija
    widgetMenu.style.width = '400px'; // Ancho del menú (más grande)

    // Crear el encabezado del menú
    var menuHeader = document.createElement('div');
    menuHeader.style.backgroundColor = '#007BFF';
    menuHeader.style.color = '#FFFFFF';
    menuHeader.style.padding = '10px';
    menuHeader.style.borderRadius = '5px 5px 0 0';
    menuHeader.style.display = 'flex';
    menuHeader.style.alignItems = 'center';
    menuHeader.style.justifyContent = 'center';

    // Añadir ícono al encabezado
    var headerIcon = document.createElement('i');
    headerIcon.className = 'fas fa-universal-access';
    headerIcon.style.marginRight = '10px';

    // Añadir título al encabezado
    var headerTitle = document.createElement('span');
    headerTitle.innerText = 'Herramientas de Accesibilidad de Sofactia';
    headerTitle.style.fontSize = '16px';
    headerTitle.style.fontWeight = 'bold';

    // Añadir ícono y título al encabezado
    menuHeader.appendChild(headerIcon);
    menuHeader.appendChild(headerTitle);

    // Añadir el encabezado al menú
    widgetMenu.appendChild(menuHeader);

    // Crear botones para mover el widget a la izquierda o derecha
    var moveButtonsContainer = document.createElement('div');
    moveButtonsContainer.style.display = 'flex';
    moveButtonsContainer.style.justifyContent = 'flex-end'; // Alinear a la derecha
    moveButtonsContainer.style.marginTop = '10px';
    moveButtonsContainer.style.marginBottom = '10px';

    // Botón para mover a la izquierda
    var moveLeftButton = document.createElement('button');
    moveLeftButton.innerHTML = '<i class="fas fa-arrow-left"></i>'; // Flecha izquierda
    moveLeftButton.style.backgroundColor = '#007BFF';
    moveLeftButton.style.color = '#FFFFFF';
    moveLeftButton.style.border = 'none';
    moveLeftButton.style.padding = '10px';
    moveLeftButton.style.borderRadius = '5px';
    moveLeftButton.style.cursor = 'pointer';
    moveLeftButton.style.marginRight = '5px';

    // Botón para mover a la derecha
    var moveRightButton = document.createElement('button');
    moveRightButton.innerHTML = '<i class="fas fa-arrow-right"></i>'; // Flecha derecha
    moveRightButton.style.backgroundColor = '#007BFF';
    moveRightButton.style.color = '#FFFFFF';
    moveRightButton.style.border = 'none';
    moveRightButton.style.padding = '10px';
    moveRightButton.style.borderRadius = '5px';
    moveRightButton.style.cursor = 'pointer';

    // Añadir eventos a los botones de mover
    moveLeftButton.addEventListener('click', function() {
        widgetContainer.style.left = '20px';
        widgetContainer.style.right = 'auto';
        widgetMenu.style.left = '20px';
        widgetMenu.style.right = 'auto';
    });

    moveRightButton.addEventListener('click', function() {
        widgetContainer.style.right = '20px';
        widgetContainer.style.left = 'auto';
        widgetMenu.style.right = '20px';
        widgetMenu.style.left = 'auto';
    });

    // Añadir botones al contenedor
    moveButtonsContainer.appendChild(moveLeftButton);
    moveButtonsContainer.appendChild(moveRightButton);

    // Añadir el contenedor de botones al menú (debajo del encabezado)
    widgetMenu.appendChild(moveButtonsContainer);

    // Opciones del menú
    var options = [
        { 
            category: 'Ajustes Visuales', 
            icon: 'fas fa-eye', 
            options: [
                { text: 'Aumentar Texto', action: increaseTextSize },
                { text: 'Disminuir Texto', action: decreaseTextSize },
                { text: 'Aumentar Espaciado', action: increaseLineHeight },
                { text: 'Detener Animaciones', action: toggleAnimations },
                { text: 'Saturación', action: adjustSaturation },
                { text: 'Contraste Alto', action: toggleHighContrast },
                { text: 'Contraste Bajo', action: toggleLowContrast },
                { text: 'Negativo', action: toggleNegative },
                { text: 'Tonos de Gris', action: toggleGrayscale },
                { text: 'Fuente Legible', action: toggleLegibleFont }
            ]
        },
        { 
            category: 'Navegación y Lectura', 
            icon: 'fas fa-book-reader', 
            options: [
                { text: 'Lectura en Voz Alta', action: startTextToSpeech },
                { text: 'Resaltar Enlaces', action: highlightLinks },
                { text: 'Resaltar Encabezados', action: highlightHeadings },
                { text: 'Cursor Grande', action: toggleBigCursor },
                { text: 'Navegación con Teclado', action: enableKeyboardNavigation },
                { text: 'Navegación por Voz', action: enableVoiceNavigation }
            ]
        },
        { 
            category: 'Accesibilidad para Dislexia', 
            icon: 'fas fa-book', 
            options: [
                { text: 'Estilo 1: Fuente OpenDyslexic', action: setDyslexiaStyle1 },
                { text: 'Estilo 2: Fuente Comic Sans', action: setDyslexiaStyle2 },
                { text: 'Estilo 3: Fuente Verdana', action: setDyslexiaStyle3 },
                { text: 'Estilo 4: Fuente Arial', action: setDyslexiaStyle4 }
            ]
        },
        { 
            category: 'Otras Herramientas', 
            icon: 'fas fa-tools', 
            options: [
                { text: 'Ocultar Imágenes', action: hideImages },
                { text: 'Detener Sonidos', action: stopSounds },
                { text: 'Modo Enfoque', action: toggleFocusMode },
                { text: 'Reiniciar Todo', action: resetAll }
            ]
        }
    ];

    // Variable para rastrear la categoría abierta
    var openCategory = null;

    // Añadir las opciones al menú
    options.forEach(function(category, index) {
        var categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.style.cursor = 'pointer';
        categoryHeader.style.padding = '10px';
        categoryHeader.style.backgroundColor = '#F5F5F5';
        categoryHeader.style.borderBottom = '1px solid #DDD';
        categoryHeader.style.display = 'flex';
        categoryHeader.style.alignItems = 'center';
        categoryHeader.style.borderRadius = '5px';
        categoryHeader.style.marginBottom = '5px';

        // Añadir ícono
        var icon = document.createElement('i');
        icon.className = category.icon;
        icon.style.marginRight = '10px';
        icon.style.color = '#007BFF'; // Color del ícono
        categoryHeader.appendChild(icon);

        // Añadir título
        var title = document.createElement('span');
        title.innerText = category.category;
        title.style.color = '#333'; // Color del texto
        title.style.fontWeight = 'bold';
        categoryHeader.appendChild(title);

        // Añadir flecha para indicar que es desplegable
        var arrow = document.createElement('i');
        arrow.className = 'fas fa-chevron-down';
        arrow.style.marginLeft = 'auto';
        arrow.style.color = '#007BFF'; // Color de la flecha
        categoryHeader.appendChild(arrow);

        // Crear contenedor de opciones
        var categoryOptions = document.createElement('div');
        categoryOptions.className = 'category-options';
        categoryOptions.style.display = 'none'; // Ocultar por defecto
        categoryOptions.style.padding = '10px';
        categoryOptions.style.display = 'flex'; // Usar flexbox para organizar los botones
        categoryOptions.style.flexWrap = 'wrap'; // Permitir que los botones se envuelvan en varias líneas

        // Añadir las opciones de la categoría
        category.options.forEach(function(option) {
            var button = document.createElement('button');
            button.style.display = 'inline-block'; // Para que los botones estén en línea
            button.style.width = '48%'; // Ancho del botón (48% para dejar espacio entre ellos)
            button.style.margin = '1%'; // Margen entre botones
            button.style.padding = '10px';
            button.style.cursor = 'pointer';
            button.style.textAlign = 'center'; // Centrar el contenido
            button.style.border = '1px solid #DDD';
            button.style.borderRadius = '5px';
            button.style.backgroundColor = '#FFF';
            button.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.1)';
            button.style.transition = 'background-color 0.2s ease, transform 0.2s ease'; // Animación de clic

            // Crear el ícono
            var icon = document.createElement('i');
            icon.className = 'fas fa-adjust'; // Ícono por defecto (puedes cambiarlo según la opción)
            icon.style.display = 'block'; // Para que el ícono esté en una línea separada
            icon.style.marginBottom = '5px'; // Espacio entre el ícono y el texto
            icon.style.fontSize = '20px'; // Tamaño del ícono
            icon.style.color = '#007BFF'; // Color del ícono

            // Cambiar el ícono según la opción
            switch (option.text) {
                case 'Aumentar Texto':
                    icon.className = 'fas fa-text-height';
                    break;
                case 'Disminuir Texto':
                    icon.className = 'fas fa-text-width';
                    break;
                case 'Aumentar Espaciado':
                    icon.className = 'fas fa-arrows-alt-v';
                    break;
                case 'Detener Animaciones':
                    icon.className = 'fas fa-pause';
                    break;
                case 'Saturación':
                    icon.className = 'fas fa-tint';
                    break;
                case 'Contraste Alto':
                    icon.className = 'fas fa-sun';
                    break;
                case 'Contraste Bajo':
                    icon.className = 'fas fa-moon';
                    break;
                case 'Negativo':
                    icon.className = 'fas fa-adjust';
                    break;
                case 'Tonos de Gris':
                    icon.className = 'fas fa-palette';
                    break;
                case 'Fuente Legible':
                    icon.className = 'fas fa-font';
                    break;
                case 'Lectura en Voz Alta':
                    icon.className = 'fas fa-volume-up';
                    break;
                case 'Resaltar Enlaces':
                    icon.className = 'fas fa-link';
                    break;
                case 'Resaltar Encabezados':
                    icon.className = 'fas fa-heading';
                    break;
                case 'Cursor Grande':
                    icon.className = 'fas fa-mouse-pointer';
                    break;
                case 'Navegación con Teclado':
                    icon.className = 'fas fa-keyboard';
                    break;
                case 'Navegación por Voz':
                    icon.className = 'fas fa-microphone';
                    break;
                case 'Ocultar Imágenes':
                    icon.className = 'fas fa-eye-slash';
                    break;
                case 'Detener Sonidos':
                    icon.className = 'fas fa-volume-mute';
                    break;
                case 'Modo Enfoque':
                    icon.className = 'fas fa-bullseye';
                    break;
                case 'Reiniciar Todo':
                    icon.className = 'fas fa-undo';
                    break;
                case 'Estilo 1: Fuente OpenDyslexic':
                    icon.className = 'fas fa-font';
                    break;
                case 'Estilo 2: Fuente Comic Sans':
                    icon.className = 'fas fa-font';
                    break;
                case 'Estilo 3: Fuente Verdana':
                    icon.className = 'fas fa-font';
                    break;
                case 'Estilo 4: Fuente Arial':
                    icon.className = 'fas fa-font';
                    break;
            }

            // Añadir el ícono al botón
            button.appendChild(icon);

            // Añadir el texto al botón
            var text = document.createElement('span');
            text.innerText = option.text;
            text.style.display = 'block'; // Para que el texto esté en una línea separada
            text.style.fontSize = '12px'; // Tamaño del texto
            text.style.color = '#333'; // Color del texto
            button.appendChild(text);

            // Añadir la acción al botón
            button.addEventListener('click', function() {
                option.action();
                button.style.backgroundColor = '#F5F5F5'; // Cambiar el color al hacer clic
                setTimeout(function() {
                    button.style.backgroundColor = '#FFF'; // Restaurar el color después de 200ms
                }, 200);
            });

            // Añadir el botón al contenedor de opciones
            categoryOptions.appendChild(button);
        });

        // Añadir evento para desplegar/contraer la categoría
        categoryHeader.addEventListener('click', function() {
            if (openCategory && openCategory !== categoryOptions) {
                openCategory.style.display = 'none';
                openCategory.previousElementSibling.querySelector('.fa-chevron-up').className = 'fas fa-chevron-down';
            }

            if (categoryOptions.style.display === 'none') {
                categoryOptions.style.display = 'flex';
                arrow.className = 'fas fa-chevron-up';
                openCategory = categoryOptions;
            } else {
                categoryOptions.style.display = 'none';
                arrow.className = 'fas fa-chevron-down';
                openCategory = null;
            }
        });

        // Añadir al menú
        widgetMenu.appendChild(categoryHeader);
        widgetMenu.appendChild(categoryOptions);

        // Desplegar el primer acordeón (Ajustes Visuales) por defecto
        if (index === 0) {
            categoryOptions.style.display = 'flex';
            arrow.className = 'fas fa-chevron-up';
            openCategory = categoryOptions;
        } else {
            categoryOptions.style.display = 'none'; // Cerrar los demás acordeones
            arrow.className = 'fas fa-chevron-down';
        }
    });

    // Añadir el botón y el menú al contenedor
    widgetContainer.appendChild(widgetButton);
    widgetContainer.appendChild(widgetMenu);

    // Añadir el contenedor al cuerpo del documento
    document.body.appendChild(widgetContainer);

    // Mostrar/ocultar el menú al hacer clic en el botón
    widgetButton.addEventListener('click', function() {
        if (widgetMenu.style.display === 'none') {
            widgetMenu.style.display = 'block';
        } else {
            widgetMenu.style.display = 'none';
        }
    });

    // Funcionalidades de accesibilidad
    function increaseTextSize() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            var currentSize = parseFloat(window.getComputedStyle(element).fontSize);
            element.style.fontSize = (currentSize + 2) + 'px';
        });
    }

    function decreaseTextSize() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            var currentSize = parseFloat(window.getComputedStyle(element).fontSize);
            element.style.fontSize = (currentSize - 2) + 'px';
        });
    }

    function increaseLineHeight() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            var currentLineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
            element.style.lineHeight = (currentLineHeight + 2) + 'px';
        });
    }

    function toggleAnimations() {
        animationsPaused = !animationsPaused;
        var animations = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        animations.forEach(function(element) {
            if (animationsPaused) {
                element.style.animationPlayState = 'paused';
                element.style.transition = 'none';
            } else {
                element.style.animationPlayState = 'running';
                element.style.transition = '';
            }
        });

        var videos = document.querySelectorAll('video, audio');
        videos.forEach(function(video) {
            if (animationsPaused) {
                video.pause();
            } else {
                video.play();
            }
        });

        var animationButton = document.querySelector('.fa-pause').parentElement;
        if (animationsPaused) {
            animationButton.querySelector('span').innerText = 'Reproducir Animaciones';
            animationButton.querySelector('.fa-pause').className = 'fas fa-play';
        } else {
            animationButton.querySelector('span').innerText = 'Detener Animaciones';
            animationButton.querySelector('.fa-play').className = 'fas fa-pause';
        }
    }

    function adjustSaturation() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            element.classList.toggle('desaturated');
        });
    }

    function toggleHighContrast() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            element.classList.toggle('high-contrast');
        });
    }

    function toggleLowContrast() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            element.classList.toggle('low-contrast');
        });
    }

    function toggleNegative() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            element.classList.toggle('negative');
        });
    }

    function toggleGrayscale() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            element.classList.toggle('grayscale');
        });
    }

    function toggleLegibleFont() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') { // Excluir íconos
                element.classList.toggle('legible-font');
            }
        });
    }

    function startTextToSpeech() {
        var speech = new SpeechSynthesisUtterance(document.body.innerText);
        window.speechSynthesis.speak(speech);
    }

    function highlightLinks() {
        var links = document.querySelectorAll('a');
        links.forEach(function(link) {
            link.style.backgroundColor = '#FFFF00';
        });
    }

    function highlightHeadings() {
        var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(function(heading) {
            heading.style.backgroundColor = '#FFFF00';
        });
    }

    function toggleBigCursor() {
        if (document.body.classList.contains('big-cursor')) {
            document.body.classList.remove('big-cursor');
        } else {
            document.body.classList.add('big-cursor');
        }
    }

    function enableKeyboardNavigation() {
        alert('Navegación con teclado activada');
    }

    function enableVoiceNavigation() {
        alert('Navegación por voz activada');
    }

    function setDyslexiaStyle1() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') { // Excluir íconos
                element.style.fontFamily = 'OpenDyslexic, sans-serif';
            }
        });
    }

    function setDyslexiaStyle2() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') { // Excluir íconos
                element.style.fontFamily = 'Comic Sans MS, cursive';
            }
        });
    }

    function setDyslexiaStyle3() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') { // Excluir íconos
                element.style.fontFamily = 'Verdana, sans-serif';
            }
        });
    }

    function setDyslexiaStyle4() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') { // Excluir íconos
                element.style.fontFamily = 'Arial, sans-serif';
            }
        });
    }

    function hideImages() {
        var images = document.querySelectorAll('img');
        images.forEach(function(image) {
            image.style.display = 'none';
        });
    }

    function stopSounds() {
        var videos = document.querySelectorAll('video, audio');
        videos.forEach(function(video) {
            video.pause();
        });
    }

    function toggleFocusMode() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            element.classList.toggle('focus-mode');
        });
    }

    function resetAll() {
        // Restablecer estilos y clases en todos los elementos, excepto el widget y los iframes
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *, iframe, iframe *)');
        elements.forEach(function(element) {
            // Eliminar todos los estilos en línea relacionados con accesibilidad
            element.style.fontSize = ''; // Restablecer tamaño de texto
            element.style.lineHeight = ''; // Restablecer espaciado
            element.style.backgroundColor = ''; // Restablecer colores de fondo
            element.style.color = ''; // Restablecer colores de texto
            element.style.filter = ''; // Restablecer filtros (contraste, negativo, etc.)
            element.style.fontFamily = ''; // Restablecer la fuente
    
            // Eliminar todas las clases relacionadas con accesibilidad
            element.classList.remove(
                'high-contrast', 'low-contrast', 'negative', 'grayscale', 'legible-font',
                'desaturated', 'focus-mode'
            );
        });
    
        // Restablecer animaciones y transiciones
        var animations = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *, iframe, iframe *)');
        animations.forEach(function(element) {
            element.style.animationPlayState = 'running';
            element.style.transition = '';
        });
    
        // Restablecer videos y audios (excepto los que están dentro de iframes)
        var videos = document.querySelectorAll('body video, body audio');
        videos.forEach(function(video) {
            video.play();
        });
    
        // Restablecer imágenes (excepto las que están dentro de iframes)
        var images = document.querySelectorAll('body img');
        images.forEach(function(image) {
            image.style.display = '';
        });
    
        // Restablecer el cursor
        if (document.body.classList.contains('big-cursor')) {
            document.body.classList.remove('big-cursor');
        }
    
        // Restablecer el modo de enfoque
        if (document.body.classList.contains('focus-mode')) {
            document.body.classList.remove('focus-mode');
        }
    
        // Detener la lectura en voz alta
        window.speechSynthesis.cancel();
    }
})();