(function() {
    // Variables de estado para los botones toggle
    var isSaturationOn = false;
    var isHighContrastOn = false;
    var isLowContrastOn = false;
    var isNegativeOn = false;
    var isGrayscaleOn = false;
    var isLegibleFontOn = false;
    var areImagesHidden = false;
    var areSoundsStopped = false;
    var isFocusModeOn = false;
    var animationsPaused = false;
    
    // Variables para controlar el tamaño del texto
    var originalFontSizes = new Map();
    var currentFontSizeMultiplier = 1;
    var fontSizeSteps = 0;
    var increaseButton, decreaseButton;

    // Variables para navegación y lectura
    var isTextToSpeechOn = false;
    var areLinksHighlighted = false;
    var areHeadingsHighlighted = false;
    var isBigCursorOn = false;
    var isKeyboardNavOn = false;
    var isVoiceNavOn = false;

    // Variable para almacenar el estado de los medios
    var mediaElementsState = [];

    // Elementos protegidos de los filtros visuales
    const protectedElements = [
        '#accessibility-widget',
        '#accessibility-widget *',
        '.bntNextPrev-container',
        '.bntNextPrev-container *',
        '.headerOpc',
        '.headerOpc *'
    ];

    // Crear el contenedor del widget
    var widgetContainer = document.createElement('div');
    widgetContainer.id = 'accessibility-widget';
    widgetContainer.style.position = 'fixed';
    widgetContainer.style.bottom = '20px';
    widgetContainer.style.right = '20px';
    widgetContainer.style.zIndex = '1000';

    // Crear el botón del widget
    var widgetButton = document.createElement('button');
    widgetButton.innerHTML = '<i class="fas fa-universal-access"></i>';
    widgetButton.style.backgroundColor = '#007BFF';
    widgetButton.style.color = '#FFFFFF';
    widgetButton.style.border = 'none';
    widgetButton.style.padding = '15px';
    widgetButton.style.borderRadius = '50%';
    widgetButton.style.cursor = 'pointer';
    widgetButton.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    widgetButton.style.display = 'flex';
    widgetButton.style.alignItems = 'center';
    widgetButton.style.justifyContent = 'center';
    widgetButton.style.width = '60px';
    widgetButton.style.height = '60px';

    // Aumentar el tamaño del ícono
    var icon = widgetButton.querySelector('i');
    icon.style.fontSize = '40px';

    // Crear el menú de opciones
    var widgetMenu = document.createElement('div');
    widgetMenu.id = 'widget-menu';
    widgetMenu.style.display = 'none';
    widgetMenu.style.backgroundColor = '#FFFFFF';
    widgetMenu.style.border = '1px solid #DDD';
    widgetMenu.style.borderRadius = '5px';
    widgetMenu.style.padding = '10px';
    widgetMenu.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';
    widgetMenu.style.maxHeight = '80vh';
    widgetMenu.style.overflowY = 'auto';
    widgetMenu.style.position = 'fixed';
    widgetMenu.style.bottom = '70px';
    widgetMenu.style.right = '20px';
    widgetMenu.style.width = '400px';

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
    headerTitle.innerText = 'Accesibilidad de Sofactia';
    headerTitle.style.fontSize = '16px';
    headerTitle.style.fontWeight = 'bold';

    // Añadir ícono y título al encabezado
    menuHeader.appendChild(headerIcon);
    menuHeader.appendChild(headerTitle);

    // Añadir el encabezado al menú
    widgetMenu.appendChild(menuHeader);

    // Contenedor para botones de control
    var controlButtonsContainer = document.createElement('div');
    controlButtonsContainer.className = 'control-buttons';
    controlButtonsContainer.style.display = 'flex';
    controlButtonsContainer.style.justifyContent = 'space-between';
    controlButtonsContainer.style.marginTop = '10px';
    controlButtonsContainer.style.marginBottom = '10px';
    controlButtonsContainer.style.padding = '0 10px';

    // Botón para reiniciar
    var resetButton = document.createElement('button');
    resetButton.innerHTML = '<i class="fas fa-undo"></i>';
    resetButton.id = 'reset-button';
    resetButton.title = 'Reiniciar Todo';
    resetButton.style.backgroundColor = 'transparent';
    resetButton.style.color = '#007BFF';
    resetButton.style.border = 'none';
    resetButton.style.padding = '8px';
    resetButton.style.borderRadius = '5px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.fontSize = '16px';
    resetButton.style.display = 'flex';
    resetButton.style.alignItems = 'center';
    resetButton.style.justifyContent = 'center';

    // Contenedor para botones de mover
    var moveButtonsContainer = document.createElement('div');
    moveButtonsContainer.style.display = 'flex';
    moveButtonsContainer.style.gap = '5px';

    // Botones de mover (izquierda/derecha)
    var moveLeftButton = document.createElement('button');
    moveLeftButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
    moveLeftButton.title = 'Mover a la izquierda';
    moveLeftButton.style.backgroundColor = 'transparent';
    moveLeftButton.style.color = '#007BFF';
    moveLeftButton.style.border = 'none';
    moveLeftButton.style.padding = '8px';
    moveLeftButton.style.borderRadius = '5px';
    moveLeftButton.style.cursor = 'pointer';
    moveLeftButton.style.fontSize = '16px';

    var moveRightButton = document.createElement('button');
    moveRightButton.innerHTML = '<i class="fas fa-arrow-right"></i>';
    moveRightButton.title = 'Mover a la derecha';
    moveRightButton.style.backgroundColor = 'transparent';
    moveRightButton.style.color = '#007BFF';
    moveRightButton.style.border = 'none';
    moveRightButton.style.padding = '8px';
    moveRightButton.style.borderRadius = '5px';
    moveRightButton.style.cursor = 'pointer';
    moveRightButton.style.fontSize = '16px';

    // Eventos para botones de mover
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

    // Evento para reiniciar
    resetButton.addEventListener('click', function() {
        resetAll();
        resetButton.style.transform = 'scale(0.9)';
        setTimeout(function() {
            resetButton.style.transform = 'scale(1)';
        }, 200);
    });

    // Añadir botones al contenedor
    moveButtonsContainer.appendChild(moveLeftButton);
    moveButtonsContainer.appendChild(moveRightButton);
    controlButtonsContainer.appendChild(resetButton);
    controlButtonsContainer.appendChild(moveButtonsContainer);
    widgetMenu.appendChild(controlButtonsContainer);

    // Opciones del menú
    var options = [
        { 
            category: 'Ajustes Visuales', 
            icon: 'fas fa-eye', 
            options: [
                { text: 'Aumentar Texto', action: increaseTextSize },
                { text: 'Disminuir Texto', action: decreaseTextSize },
                { text: 'Aumentar Espaciado', action: increaseLineHeight },
                { text: 'Detener Animaciones', action: toggleAnimations, isToggle: true },
                { text: 'Saturación', action: toggleSaturation, isToggle: true },
                { text: 'Contraste Alto', action: toggleHighContrast, isToggle: true },
                { text: 'Contraste Bajo', action: toggleLowContrast, isToggle: true },
                { text: 'Negativo', action: toggleNegative, isToggle: true },
                { text: 'Tonos de Gris', action: toggleGrayscale, isToggle: true },
                { text: 'Fuente Legible', action: toggleLegibleFont, isToggle: true }
            ]
        },
        { 
            category: 'Navegación y Lectura', 
            icon: 'fas fa-book-reader', 
            options: [
                { text: 'Lectura en Voz Alta', action: toggleTextToSpeech, isToggle: true },
                { text: 'Resaltar Enlaces', action: toggleHighlightLinks, isToggle: true },
                { text: 'Resaltar Encabezados', action: toggleHighlightHeadings, isToggle: true },
                { text: 'Cursor Grande', action: toggleBigCursor, isToggle: true },
                { text: 'Navegación con Teclado', action: toggleKeyboardNavigation, isToggle: true },
                { text: 'Navegación por Voz', action: toggleVoiceNavigation, isToggle: true }
            ]
        },
        { 
            category: 'Accesibilidad para Dislexia', 
            icon: 'fas fa-book', 
            options: [
                { text: 'Estilo 1: Fuente OpenDyslexic', action: setDyslexiaStyle1, isToggle: true },
                { text: 'Estilo 2: Fuente Comic Sans', action: setDyslexiaStyle2, isToggle: true },
                { text: 'Estilo 3: Fuente Verdana', action: setDyslexiaStyle3, isToggle: true },
                { text: 'Estilo 4: Fuente Arial', action: setDyslexiaStyle4, isToggle: true }
            ]
        },
        { 
            category: 'Otras Herramientas', 
            icon: 'fas fa-tools', 
            options: [
                { text: 'Ocultar Imágenes', action: toggleHideImages, isToggle: true },
                { text: 'Detener Sonidos', action: toggleStopSounds, isToggle: true },
                { text: 'Modo Enfoque', action: toggleFocusMode, isToggle: true }
            ]
        }
    ];

    // Variable para categoría abierta
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
        icon.style.color = '#007BFF';
        categoryHeader.appendChild(icon);

        // Añadir título
        var title = document.createElement('span');
        title.innerText = category.category;
        title.style.color = '#333';
        title.style.fontWeight = 'bold';
        categoryHeader.appendChild(title);

        // Añadir flecha
        var arrow = document.createElement('i');
        arrow.className = 'fas fa-chevron-down';
        arrow.style.marginLeft = 'auto';
        arrow.style.color = '#007BFF';
        categoryHeader.appendChild(arrow);

        // Crear contenedor de opciones
        var categoryOptions = document.createElement('div');
        categoryOptions.className = 'category-options';
        categoryOptions.style.display = 'none';
        categoryOptions.style.padding = '10px';
        categoryOptions.style.display = 'flex';
        categoryOptions.style.flexWrap = 'wrap';

        // Añadir las opciones de la categoría
        category.options.forEach(function(option) {
            var button = document.createElement('button');
            button.style.display = 'inline-block';
            button.style.width = '48%';
            button.style.margin = '1%';
            button.style.padding = '10px';
            button.style.cursor = 'pointer';
            button.style.textAlign = 'center';
            button.style.border = '1px solid #DDD';
            button.style.borderRadius = '5px';
            button.style.backgroundColor = '#FFF';
            button.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.1)';
            button.style.transition = 'all 0.2s ease';

            // Guardar referencia a botones de texto
            if (option.text === 'Aumentar Texto') {
                increaseButton = button;
            } else if (option.text === 'Disminuir Texto') {
                decreaseButton = button;
            }

            // Añadir clase si es toggle
            if (option.isToggle) {
                button.classList.add('toggle-button');
            }

            // Crear ícono
            var icon = document.createElement('i');
            icon.className = 'fas fa-adjust';
            icon.style.display = 'block';
            icon.style.marginBottom = '5px';
            icon.style.fontSize = '20px';
            icon.style.color = '#007BFF';

            // Cambiar ícono según opción
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

            button.appendChild(icon);

            // Añadir texto
            var text = document.createElement('span');
            text.innerText = option.text;
            text.style.display = 'block';
            text.style.fontSize = '12px';
            text.style.color = '#333';
            button.appendChild(text);

            // Añadir evento click
            button.addEventListener('click', function() {
                // Para botones toggle, alternar estado
                if (option.isToggle) {
                    if (this.classList.contains('selected')) {
                        this.classList.remove('selected');
                    } else {
                        // Solo para contraste y dislexia, deseleccionar otros del mismo grupo
                        if (option.text.includes('Contraste')) {
                            var allContrastButtons = document.querySelectorAll('.category-options button');
                            allContrastButtons.forEach(function(btn) {
                                if (btn.textContent.includes('Contraste')) {
                                    btn.classList.remove('selected');
                                }
                            });
                        } else if (option.text.includes('Estilo')) {
                            var allDyslexiaButtons = document.querySelectorAll('.category-options button');
                            allDyslexiaButtons.forEach(function(btn) {
                                if (btn.textContent.includes('Estilo')) {
                                    btn.classList.remove('selected');
                                }
                            });
                        }
                        this.classList.add('selected');
                    }
                } else {
                    // Para botones normales, mantener seleccionado
                    this.classList.add('selected');
                }
                
                option.action();
                
                // Efecto de clic
                this.style.transform = 'scale(0.95)';
                setTimeout(function() {
                    button.style.transform = 'scale(1)';
                }, 200);
            });

            categoryOptions.appendChild(button);
        });

        // Evento para desplegar/contraer categoría
        categoryHeader.addEventListener('click', function() {
            // Cerrar la categoría abierta actual si es diferente a la que se está haciendo clic
            if (openCategory && openCategory !== categoryOptions) {
                openCategory.style.display = 'none';
                openCategory.previousElementSibling.querySelector('.fa-chevron-down, .fa-chevron-up').className = 'fas fa-chevron-down';
            }

            // Alternar la categoría actual
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

        widgetMenu.appendChild(categoryHeader);
        widgetMenu.appendChild(categoryOptions);

        // Desplegar primera categoría por defecto
        if (index === 0) {
            categoryOptions.style.display = 'flex';
            arrow.className = 'fas fa-chevron-up';
            openCategory = categoryOptions;
        } else {
            categoryOptions.style.display = 'none';
            arrow.className = 'fas fa-chevron-down';
        }
    });

    // Añadir widget al DOM
    widgetContainer.appendChild(widgetButton);
    widgetContainer.appendChild(widgetMenu);
    document.body.appendChild(widgetContainer);

    // Mostrar/ocultar menú
    widgetButton.addEventListener('click', function() {
        widgetMenu.style.display = widgetMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Funciones de accesibilidad
    function storeOriginalFontSizes() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (!originalFontSizes.has(element)) {
                originalFontSizes.set(element, parseFloat(window.getComputedStyle(element).fontSize));
            }
        });
    }

    function increaseTextSize() {
        storeOriginalFontSizes();
        currentFontSizeMultiplier += 0.1;
        fontSizeSteps++;
        
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            var originalSize = originalFontSizes.get(element);
            if (originalSize) {
                element.style.fontSize = (originalSize * currentFontSizeMultiplier) + 'px';
            }
        });
        
        // Siempre seleccionar el botón de aumentar
        increaseButton.classList.add('selected');
        
        // Deseleccionar el de disminuir si estamos por encima del tamaño original
        if (currentFontSizeMultiplier > 1) {
            decreaseButton.classList.remove('selected');
        }
        
        // Si volvemos al tamaño original, deseleccionar ambos
        if (currentFontSizeMultiplier === 1) {
            increaseButton.classList.remove('selected');
            decreaseButton.classList.remove('selected');
        }
    }
    
    function decreaseTextSize() {
        storeOriginalFontSizes();
        currentFontSizeMultiplier = Math.max(0.5, currentFontSizeMultiplier - 0.1);
        fontSizeSteps--;
        
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            var originalSize = originalFontSizes.get(element);
            if (originalSize) {
                element.style.fontSize = (originalSize * currentFontSizeMultiplier) + 'px';
            }
        });
        
        // Siempre seleccionar el botón de disminuir
        decreaseButton.classList.add('selected');
        
        // Deseleccionar el de aumentar si estamos por debajo del tamaño original
        if (currentFontSizeMultiplier < 1) {
            increaseButton.classList.remove('selected');
        }
        
        // Si volvemos al tamaño original, deseleccionar ambos
        if (currentFontSizeMultiplier === 1) {
            increaseButton.classList.remove('selected');
            decreaseButton.classList.remove('selected');
        }
    }

    function increaseLineHeight() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            var currentLineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
            element.style.lineHeight = (currentLineHeight + 2) + 'px';
        });
    }

    // Función mejorada para pausar/reproducir animaciones y medios
    // Función mejorada para pausar/reproducir animaciones, medios e iframes
    function toggleAnimations() {
        animationsPaused = !animationsPaused;
        var animations = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        
        // Pausar/reproducir animaciones CSS
        animations.forEach(function(element) {
            if (animationsPaused) {
                element.style.animationPlayState = 'paused';
                element.style.transition = 'none';
            } else {
                element.style.animationPlayState = 'running';
                element.style.transition = '';
            }
        });

        // Manejar elementos multimedia (audio/video)
        var mediaElements = document.querySelectorAll('video, audio');
        
        // Manejar iframes (videos embebidos, etc.)
        var iframes = document.querySelectorAll('iframe');
        
        if (animationsPaused) {
            // Al pausar, guardar el estado actual de los medios e iframes
            mediaElementsState = [];
            
            // Manejar elementos multimedia
            mediaElements.forEach(function(media) {
                mediaElementsState.push({
                    element: media,
                    type: 'media',
                    wasPlaying: !media.paused,
                    currentTime: media.currentTime
                });
                
                if (!media.paused) {
                    media.pause();
                }
            });
            
            // Manejar iframes
            iframes.forEach(function(iframe) {
                try {
                    // Solo para iframes que tienen contenido que puede ser pausado (como videos de YouTube)
                    if (iframe.contentWindow) {
                        mediaElementsState.push({
                            element: iframe,
                            type: 'iframe',
                            src: iframe.src
                        });
                        
                        // Reemplazar el iframe con una imagen estática o simplemente cambiar el src
                        var originalSrc = iframe.src;
                        iframe.dataset.originalSrc = originalSrc;
                        iframe.src = ''; // Pausar el contenido del iframe
                    }
                } catch (e) {
                    console.log('No se pudo pausar el iframe:', e);
                }
            });
        } else {
            // Al reanudar, restaurar el estado de los medios e iframes
            mediaElementsState.forEach(function(mediaState) {
                if (mediaState.type === 'media' && mediaState.wasPlaying) {
                    mediaState.element.currentTime = mediaState.currentTime;
                    mediaState.element.play().catch(e => console.log('No se pudo reproducir automáticamente:', e));
                } else if (mediaState.type === 'iframe') {
                    // Restaurar el iframe original
                    mediaState.element.src = mediaState.element.dataset.originalSrc || mediaState.src;
                }
            });
            mediaElementsState = [];
        }

        // Actualizar el texto y el ícono del botón
        var animationButton = document.querySelector('.fa-pause, .fa-play').parentElement;
        if (animationButton) {
            if (animationsPaused) {
                animationButton.querySelector('span').innerText = 'Reproducir Animaciones';
                animationButton.querySelector('.fa-pause').className = 'fas fa-play';
            } else {
                animationButton.querySelector('span').innerText = 'Detener Animaciones';
                animationButton.querySelector('.fa-play').className = 'fas fa-pause';
            }
        }
    }

    // Función modificada para saturación (protege elementos específicos)
    function toggleSaturation() {
        isSaturationOn = !isSaturationOn;
        
        // Crear selector para excluir elementos protegidos
        const selector = 'body *:not(#accessibility-widget, #accessibility-widget *, .bntNextPrev-container, .bntNextPrev-container *, .headerOpc, .headerOpc *)';
        var elements = document.querySelectorAll(selector);
        
        elements.forEach(function(element) {
            if (isSaturationOn) {
                // Aplicar filtro solo si no es un elemento protegido
                if (!element.closest('.bntNextPrev-container') && !element.closest('.headerOpc')) {
                    element.style.filter = 'saturate(0.5)';
                }
            } else {
                element.style.filter = '';
            }
        });
    }

    function toggleHighContrast() {
        isHighContrastOn = !isHighContrastOn;
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (isHighContrastOn) {
                element.classList.add('high-contrast');
                element.classList.remove('low-contrast');
            } else {
                element.classList.remove('high-contrast');
            }
        });
    }

    function toggleLowContrast() {
        isLowContrastOn = !isLowContrastOn;
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (isLowContrastOn) {
                element.classList.add('low-contrast');
                element.classList.remove('high-contrast');
            } else {
                element.classList.remove('low-contrast');
            }
        });
    }

    // Función modificada para negativo (protege elementos específicos)
    function toggleNegative() {
        isNegativeOn = !isNegativeOn;
        
        // Crear selector para excluir elementos protegidos
        const selector = 'body *:not(#accessibility-widget, #accessibility-widget *, .bntNextPrev-container, .bntNextPrev-container *, .headerOpc, .headerOpc *)';
        var elements = document.querySelectorAll(selector);
        
        elements.forEach(function(element) {
            if (isNegativeOn) {
                // Aplicar filtro solo si no es un elemento protegido
                if (!element.closest('.bntNextPrev-container') && !element.closest('.headerOpc')) {
                    element.style.filter = 'invert(100%)';
                }
            } else {
                element.style.filter = '';
            }
        });
    }

    // Función modificada para tonos de gris (protege elementos específicos)
    function toggleGrayscale() {
        isGrayscaleOn = !isGrayscaleOn;
        
        // Crear selector para excluir elementos protegidos
        const selector = 'body *:not(#accessibility-widget, #accessibility-widget *, .bntNextPrev-container, .bntNextPrev-container *, .headerOpc, .headerOpc *)';
        var elements = document.querySelectorAll(selector);
        
        elements.forEach(function(element) {
            if (isGrayscaleOn) {
                // Aplicar filtro solo si no es un elemento protegido
                if (!element.closest('.bntNextPrev-container') && !element.closest('.headerOpc')) {
                    element.style.filter = 'grayscale(100%)';
                }
            } else {
                element.style.filter = '';
            }
        });
    }

    function toggleLegibleFont() {
        isLegibleFontOn = !isLegibleFontOn;
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') {
                if (isLegibleFontOn) {
                    element.classList.add('legible-font');
                    // Aumentar el tamaño de fuente en un 10% cuando se activa
                    var currentSize = parseFloat(window.getComputedStyle(element).fontSize);
                    element.style.fontSize = (currentSize * 1.1) + 'px';
                } else {
                    element.classList.remove('legible-font');
                    // Restaurar el tamaño original de fuente
                    element.style.fontSize = '';
                }
            }
        });
    }

    function toggleTextToSpeech() {
        isTextToSpeechOn = !isTextToSpeechOn;
        if (isTextToSpeechOn) {
            var speech = new SpeechSynthesisUtterance(document.body.innerText);
            // Configurar idioma a español latinoamericano
            speech.lang = 'es-MX'; // Puedes cambiar a 'es-AR', 'es-CO', etc. según prefieras
            window.speechSynthesis.speak(speech);
        } else {
            window.speechSynthesis.cancel();
        }
    }

    function toggleHighlightLinks() {
        areLinksHighlighted = !areLinksHighlighted;
        var links = document.querySelectorAll('a');
        links.forEach(function(link) {
            if (areLinksHighlighted) {
                link.classList.add('highlighted-link');
            } else {
                link.classList.remove('highlighted-link');
            }
        });
    }

    function toggleHighlightHeadings() {
        areHeadingsHighlighted = !areHeadingsHighlighted;
        var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(function(heading) {
            if (areHeadingsHighlighted) {
                heading.classList.add('highlighted-heading');
            } else {
                heading.classList.remove('highlighted-heading');
            }
        });
    }

    function toggleBigCursor() {
        isBigCursorOn = !isBigCursorOn;
        if (isBigCursorOn) {
            // Crear elemento img para el cursor
            var cursorImg = document.createElement('img');
            cursorImg.src = 'https://img.icons8.com/dotty/80/cursor.png';
            cursorImg.style.width = '40px';
            cursorImg.style.height = '40px';
            cursorImg.style.position = 'fixed';
            cursorImg.style.pointerEvents = 'none';
            cursorImg.style.zIndex = '9999';
            cursorImg.id = 'custom-cursor';
            document.body.appendChild(cursorImg);

            // Mover el cursor con el mouse
            document.addEventListener('mousemove', function(e) {
                var cursor = document.getElementById('custom-cursor');
                if (cursor) {
                    cursor.style.left = (e.clientX - 20) + 'px';
                    cursor.style.top = (e.clientY - 20) + 'px';
                }
            });

            // Ocultar completamente el cursor normal
            document.body.style.cursor = 'none';
        } else {
            // Eliminar el cursor personalizado
            var cursor = document.getElementById('custom-cursor');
            if (cursor) {
                cursor.remove();
            }
            // Restaurar cursor normal
            document.body.style.cursor = '';
            document.removeEventListener('mousemove', function() {});
        }
    }

    function toggleKeyboardNavigation() {
        isKeyboardNavOn = !isKeyboardNavOn;
        if (isKeyboardNavOn) {
            document.addEventListener('keydown', handleKeyboardNavigation);
        } else {
            document.removeEventListener('keydown', handleKeyboardNavigation);
        }
    }

    function handleKeyboardNavigation(e) {
        if (e.key === 'ArrowDown') window.scrollBy(0, 50);
        else if (e.key === 'ArrowUp') window.scrollBy(0, -50);
        else if (e.key === 'ArrowRight') window.scrollBy(50, 0);
        else if (e.key === 'ArrowLeft') window.scrollBy(-50, 0);
    }

    function toggleVoiceNavigation() {
        isVoiceNavOn = !isVoiceNavOn;
        if (isVoiceNavOn) {
            alert('Navegación por voz activada. Di "scroll down" o "scroll up" para navegar.');
        } else {
            alert('Navegación por voz desactivada');
        }
    }

    function setDyslexiaStyle1() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') {
                element.style.fontFamily = 'OpenDyslexic, sans-serif';
            }
        });
    }
    
    function setDyslexiaStyle2() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') {
                element.style.fontFamily = 'Comic Sans MS, cursive';
            }
        });
    }

    function setDyslexiaStyle3() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') {
                element.style.fontFamily = 'Verdana, sans-serif';
            }
        });
    }

    function setDyslexiaStyle4() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') {
                element.style.fontFamily = 'Roboto, sans-serif';
            }
        });
    }

    function toggleHideImages() {
        areImagesHidden = !areImagesHidden;
        var images = document.querySelectorAll('img');
        images.forEach(function(image) {
            if (areImagesHidden) {
                image.style.display = 'none';
            } else {
                image.style.display = '';
            }
        });
    }

    function toggleStopSounds() {
        areSoundsStopped = !areSoundsStopped;
        var videos = document.querySelectorAll('video, audio');
        videos.forEach(function(video) {
            if (areSoundsStopped) {
                video.pause();
            }
            // No reproducir automáticamente al desactivar
        });
    }

    function toggleFocusMode() {
        isFocusModeOn = !isFocusModeOn;
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (isFocusModeOn) {
                element.classList.add('focus-mode');
            } else {
                element.classList.remove('focus-mode');
            }
        });
    }

    // Función resetAll mejorada
    function resetAll() {
        // Restablecer estilos y clases
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *, iframe, iframe *)');
        elements.forEach(function(element) {
            element.style.fontSize = '';
            element.style.lineHeight = '';
            element.style.backgroundColor = '';
            element.style.color = '';
            element.style.filter = '';
            element.style.fontFamily = '';
    
            element.classList.remove(
                'high-contrast', 'low-contrast', 'legible-font',
                'focus-mode', 'highlighted-link', 'highlighted-heading'
            );
        });
    
        // Restablecer animaciones
        var animations = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *, iframe, iframe *)');
        animations.forEach(function(element) {
            element.style.animationPlayState = 'running';
            element.style.transition = '';
        });
    
        // Mostrar imágenes
        var images = document.querySelectorAll('body img');
        images.forEach(function(image) {
            image.style.display = '';
        });
    
        // Restablecer cursor
        if (document.getElementById('custom-cursor')) {
            document.getElementById('custom-cursor').remove();
        }
        document.body.style.cursor = '';
    
        // Detener lectura en voz alta
        window.speechSynthesis.cancel();
        
        // Deseleccionar botones
        var selectedButtons = document.querySelectorAll('.category-options button.selected');
        selectedButtons.forEach(function(button) {
            button.classList.remove('selected');
        });
        
        // Restablecer estados
        isSaturationOn = false;
        isHighContrastOn = false;
        isLowContrastOn = false;
        isNegativeOn = false;
        isGrayscaleOn = false;
        isLegibleFontOn = false;
        areImagesHidden = false;
        areSoundsStopped = false;
        isFocusModeOn = false;
        animationsPaused = false;
        isTextToSpeechOn = false;
        areLinksHighlighted = false;
        areHeadingsHighlighted = false;
        isBigCursorOn = false;
        isKeyboardNavOn = false;
        isVoiceNavOn = false;
        
        // Restablecer tamaño texto
        currentFontSizeMultiplier = 1;
        fontSizeSteps = 0;
        originalFontSizes.clear();
        mediaElementsState = [];
        
        // Restaurar botón de animaciones
        var animationButton = document.querySelector('.fa-pause, .fa-play').parentElement;
        if (animationButton) {
            animationButton.querySelector('span').innerText = 'Detener Animaciones';
            animationButton.querySelector('.fa-play').className = 'fas fa-pause';
        }
    }
})();