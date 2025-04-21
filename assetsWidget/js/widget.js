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
    resetButton.innerHTML = '<i class="fas fa-undo"></i> Restablecer todas las configuraciones <br> de accesibilidad';
    resetButton.id = 'reset-button';
    resetButton.title = 'Reiniciar Todo';
    resetButton.style.backgroundColor = '#007BFF';
    resetButton.style.color = '#FFFFFF';
    resetButton.style.border = 'none';
    resetButton.style.padding = '10px 15px';
    resetButton.style.borderRadius = '5px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.fontSize = '14px';
    resetButton.style.display = 'flex';
    resetButton.style.alignItems = 'center';
    resetButton.style.justifyContent = 'center';
    resetButton.style.margin = '10px auto';
    resetButton.style.width = '100%';
    resetButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    resetButton.style.transition = 'all 0.3s ease';

    resetButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#007BFF';
        this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    });

    // Añade espacio entre el icono y el texto
    var resetIcon = resetButton.querySelector('i');
    resetIcon.style.marginRight = '8px';

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
                { text: 'Aumentar Texto', action: increaseTextSize, isToggle: false, icon: 'fas fa-text-height' },
                { text: 'Disminuir Texto', action: decreaseTextSize, isToggle: false, icon: 'fas fa-text-width' },
                { text: 'Aumentar Espaciado', action: increaseLineHeight, isToggle: false, icon: 'fas fa-arrows-alt-v' },
                { text: 'Detener Animaciones', action: toggleAnimations, isToggle: true, icon: 'fas fa-pause' },
                { text: 'Saturación', action: toggleSaturation, isToggle: true, icon: 'fas fa-tint' },
                { text: 'Contraste Alto', action: toggleHighContrast, isToggle: true, icon: 'fas fa-sun' },
                { text: 'Contraste Bajo', action: toggleLowContrast, isToggle: true, icon: 'fas fa-moon' },
                { text: 'Negativo', action: toggleNegative, isToggle: true, icon: 'fas fa-adjust' },
                { text: 'Tonos de Gris', action: toggleGrayscale, isToggle: true, icon: 'fas fa-palette' },
                { text: 'Fuente Legible', action: toggleLegibleFont, isToggle: true, icon: 'fas fa-font' }
            ]
        },
        { 
            category: 'Navegación y Lectura', 
            icon: 'fas fa-book-reader', 
            options: [
                { text: 'Lectura en Voz Alta', action: toggleTextToSpeech, isToggle: true, icon: 'fas fa-volume-up' },
                { text: 'Resaltar Enlaces', action: toggleHighlightLinks, isToggle: true, icon: 'fas fa-link' },
                { text: 'Resaltar Encabezados', action: toggleHighlightHeadings, isToggle: true, icon: 'fas fa-heading' },
                { text: 'Cursor Grande', action: toggleBigCursor, isToggle: true, icon: 'fas fa-mouse-pointer' },
                { text: 'Navegación con Teclado', action: toggleKeyboardNavigation, isToggle: true, icon: 'fas fa-keyboard' },
                { text: 'Navegación por Voz', action: toggleVoiceNavigation, isToggle: true, icon: 'fas fa-microphone' }
            ]
        },
        { 
            category: 'Accesibilidad para Dislexia', 
            icon: 'fas fa-book', 
            options: [
                { text: 'Estilo 1: Fuente OpenDyslexic', action: setDyslexiaStyle1, isToggle: true, icon: 'fas fa-font' },
                { text: 'Estilo 2: Fuente Dyslexie', action: setDyslexiaStyle2, isToggle: true, icon: 'fas fa-font' },
                { text: 'Estilo 3: Fuente Lexie Readable', action: setDyslexiaStyle3, isToggle: true, icon: 'fas fa-font' },
                { text: 'Estilo 4: Fuente Read Regular', action: setDyslexiaStyle4, isToggle: true, icon: 'fas fa-font' }
            ]            
        },
        { 
            category: 'Otras Herramientas', 
            icon: 'fas fa-tools', 
            options: [
                { text: 'Ocultar Imágenes', action: toggleHideImages, isToggle: true, icon: 'fas fa-eye-slash' },
                { text: 'Detener Sonidos', action: toggleStopSounds, isToggle: true, icon: 'fas fa-volume-mute' },
                { text: 'Modo Enfoque', action: toggleFocusMode, isToggle: true, icon: 'fas fa-bullseye' }
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

        // Añadir las opciones de la categoría
        category.options.forEach(function(option) {
            var optionContainer = document.createElement('div');
            optionContainer.className = 'option-container';
            
            // Crear el contenedor de texto e icono
            var textContainer = document.createElement('div');
            textContainer.className = 'text-container';
            
            // Crear ícono
            var optionIcon = document.createElement('i');
            optionIcon.className = option.icon;
            optionIcon.style.marginRight = '10px';
            optionIcon.style.color = '#007BFF';
            textContainer.appendChild(optionIcon);
            
            // Añadir texto
            var text = document.createElement('span');
            text.innerText = option.text;
            text.style.color = '#333';
            textContainer.appendChild(text);
            
            optionContainer.appendChild(textContainer);
            
            // Si es una opción de toggle, crear un switch
            if (option.isToggle) {
                var switchContainer = document.createElement('label');
                switchContainer.className = 'switch';
                
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                
                var slider = document.createElement('span');
                slider.className = 'slider round';
                
                switchContainer.appendChild(checkbox);
                switchContainer.appendChild(slider);
                
                optionContainer.appendChild(switchContainer);
                
                // Añadir evento al checkbox
                checkbox.addEventListener('change', function() {
                    option.action();
                    
                    // Para opciones mutuamente excluyentes
                    if (option.text.includes('Contraste')) {
                        var allContrastCheckboxes = document.querySelectorAll('.category-options input[type="checkbox"]');
                        allContrastCheckboxes.forEach(function(cb) {
                            if (cb !== checkbox && cb.parentElement.parentElement.querySelector('span').textContent.includes('Contraste')) {
                                cb.checked = false;
                            }
                        });
                    } else if (option.text.includes('Estilo')) {
                        var allDyslexiaCheckboxes = document.querySelectorAll('.category-options input[type="checkbox"]');
                        allDyslexiaCheckboxes.forEach(function(cb) {
                            if (cb !== checkbox && cb.parentElement.parentElement.querySelector('span').textContent.includes('Estilo')) {
                                cb.checked = false;
                            }
                        });
                    }
                });
            } else {
                // Para opciones que no son toggle, crear un botón
                var button = document.createElement('button');
                button.className = 'action-button';
                // Cambiar el icono según el texto
                if (option.text === 'Disminuir Texto') {
                    button.innerHTML = '<i class="fas fa-minus"></i>';
                } else {
                    button.innerHTML = '<i class="fas fa-plus"></i>';
                }
                button.title = option.text;
                
                optionContainer.appendChild(button);
                
                // Añadir evento al botón
                button.addEventListener('click', function() {
                    option.action();
                    
                    // Efecto de clic
                    this.style.transform = 'scale(0.95)';
                    setTimeout(function() {
                        button.style.transform = 'scale(1)';
                    }, 200);
                });
                
                // Guardar referencia a botones de texto
                if (option.text === 'Aumentar Texto') {
                    increaseButton = button;
                } else if (option.text === 'Disminuir Texto') {
                    decreaseButton = button;
                }
            }
            
            categoryOptions.appendChild(optionContainer);
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
                categoryOptions.style.display = 'block';
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
            categoryOptions.style.display = 'block';
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
    }

    function increaseLineHeight() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            var currentLineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
            element.style.lineHeight = (currentLineHeight + 2) + 'px';
        });
    }

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

        // Actualizar el estado del switch
        updateSwitchState('Detener Animaciones', animationsPaused);
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
        
        // Actualizar el estado del switch
        updateSwitchState('Saturación', isSaturationOn);
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
        
        // Actualizar el estado del switch
        updateSwitchState('Contraste Alto', isHighContrastOn);
        if (isHighContrastOn) {
            updateSwitchState('Contraste Bajo', false);
            isLowContrastOn = false;
        }
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
        
        // Actualizar el estado del switch
        updateSwitchState('Contraste Bajo', isLowContrastOn);
        if (isLowContrastOn) {
            updateSwitchState('Contraste Alto', false);
            isHighContrastOn = false;
        }
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
        
        // Actualizar el estado del switch
        updateSwitchState('Negativo', isNegativeOn);
    }

    // Función modificada para tonos de gris (protege elementos específicos)
    function toggleGrayscale() {
        isGrayscaleOn = !isGrayscaleOn;
        
        // Crear selector para excluir elementos protegidos
        const selector = 'body *:not(#accessibility-widget, #accessibility-widget *, .bntNextPrev-container, .bntNextPrev-container *, .headerOpc, .headerOpc  #accessibility-widget *, .bntNextPrev-container, .bntNextPrev-container *, .headerOpc, .headerOpc *)';
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
        
        // Actualizar el estado del switch
        updateSwitchState('Tonos de Gris', isGrayscaleOn);
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
        
        // Actualizar el estado del switch
        updateSwitchState('Fuente Legible', isLegibleFontOn);
    }


    function toggleTextToSpeech() {
        isTextToSpeechOn = !isTextToSpeechOn;
        if (isTextToSpeechOn) {
            // Obtener todo el texto del body
            let allText = document.body.innerText;
            
            // Eliminar el texto del widget de accesibilidad
            const widget = document.getElementById('accessibility-widget');
            if (widget) {
                allText = allText.replace(widget.innerText, '');
            }
            
            // Eliminar el texto de los elementos con la clase "contentHeader"
            const contentHeaders = document.querySelectorAll('.contentHeader');
            contentHeaders.forEach(header => {
                if (header && header.innerText) {
                    // Escapar caracteres especiales en el texto para que funcione con replace
                    const headerText = header.innerText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    // Crear una expresión regular para encontrar el texto exacto
                    const regex = new RegExp(headerText, 'g');
                    allText = allText.replace(regex, '');
                }
            });
            
            // Usar el texto filtrado
            var speech = new SpeechSynthesisUtterance(allText);
            speech.lang = 'es-MX';
            
            // Añadir evento para desactivar cuando termine de hablar
            speech.addEventListener('end', function() {
                isTextToSpeechOn = false;
                updateSwitchState('Lectura en Voz Alta', false);
            });
            
            window.speechSynthesis.speak(speech);
        } else {
            window.speechSynthesis.cancel();
        }
        
        // Actualizar el estado del switch
        updateSwitchState('Lectura en Voz Alta', isTextToSpeechOn);
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
        
        // Actualizar el estado del switch
        updateSwitchState('Resaltar Enlaces', areLinksHighlighted);
    }

    function toggleHighlightHeadings() {
        areHeadingsHighlighted = !areHeadingsHighlighted;
        var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, i');
        headings.forEach(function(heading) {
            if (areHeadingsHighlighted) {
                heading.classList.add('highlighted-heading');
            } else {
                heading.classList.remove('highlighted-heading');
            }
        });
        
        // Actualizar el estado del switch
        updateSwitchState('Resaltar Encabezados', areHeadingsHighlighted);
    }

    function toggleBigCursor() {
        isBigCursorOn = !isBigCursorOn;
        if (isBigCursorOn) {
            // Crear elemento img para el cursor
            var cursorImg = document.createElement('img');
            cursorImg.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOS4xODhweCIgaGVpZ2h0PSI0My42MjVweCIgdmlld0JveD0iMCAwIDI5LjE4OCA0My42MjUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5LjE4OCA0My42MjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Q5REFEOSIgc3Ryb2tlLXdpZHRoPSIxLjE0MDYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyLjgsNC41NDkgMjYuODQ3LDE5LjkwMiAxNi45NjQsMjIuNzAxIDI0LjIzOSwzNy43NDkgMTguMjc4LDQyLjAxNyA5Ljc0MSwzMC43MjQgMS4xMzgsMzUuODA5ICIvPjxnPjxnPjxnPjxwYXRoIGZpbGw9IiMyMTI2MjciIGQ9Ik0yOS4xNzUsMjEuMTU1YzAuMDcxLTAuNjEzLTAuMTY1LTEuMjUzLTAuNjM1LTEuNTczTDIuMTY1LDAuMjU4Yy0wLjQyNC0wLjMyLTAuOTg4LTAuMzQ2LTEuNDM1LTAuMDUzQzAuMjgyLDAuNDk3LDAsMS4wMywwLDEuNjE3djM0LjE3MWMwLDAuNjEzLDAuMzA2LDEuMTQ2LDAuNzc2LDEuNDM5YzAuNDcxLDAuMjY3LDEuMDU5LDAuMjEzLDEuNDgyLTAuMTZsNy40ODItNi4zNDRsNi44NDcsMTIuMTU1YzAuMjU5LDAuNDgsMC43MjksMC43NDYsMS4yLDAuNzQ2YzAuMjM1LDAsMC40OTQtMC4wOCwwLjcwNi0wLjIxM2w2Ljk4OC00LjU4NWMwLjMyOS0wLjIxMywwLjU2NS0wLjU4NiwwLjY1OS0xLjAxM2MwLjA5NC0wLjQyNiwwLjAyNC0wLjg4LTAuMTg4LTEuMjI2bC02LjM3Ni0xMS4zODJsOC42MTEtMi43NDVDMjguNzA1LDIyLjI3NCwyOS4xMDUsMjEuNzY4LDI5LjE3NSwyMS4xNTV6IE0xNi45NjQsMjIuNzAxYy0wLjQyNCwwLjEzMy0wLjc3NiwwLjUwNi0wLjk0MSwwLjk2Yy0wLjE2NSwwLjQ4LTAuMTE4LDEuMDEzLDAuMTE4LDEuNDM5bDYuNTg4LDExLjc4MWwtNC41NDEsMi45ODVsLTYuODk0LTEyLjMxNWMtMC4yMTItMC4zNzMtMC41NDEtMC42NC0wLjk0MS0wLjcyYy0wLjA5NC0wLjAyNy0wLjE2NS0wLjAyNy0wLjI1OS0wLjAyN2MtMC4zMDYsMC0wLjU4OCwwLjEwNy0wLjg0NywwLjMyTDIuOCwzMi41OVY0LjU0OWwyMS41OTksMTUuODA2TDE2Ljk2NCwyMi43MDF6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==';
            cursorImg.style.all = 'cursor';
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
        
        // Actualizar el estado del switch
        updateSwitchState('Cursor Grande', isBigCursorOn);
    }

    function toggleKeyboardNavigation() {
        isKeyboardNavOn = !isKeyboardNavOn;
        if (isKeyboardNavOn) {
            document.addEventListener('keydown', handleKeyboardNavigation);
        } else {
            document.removeEventListener('keydown', handleKeyboardNavigation);
        }
        
        // Actualizar el estado del switch
        updateSwitchState('Navegación con Teclado', isKeyboardNavOn);
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
        
        // Actualizar el estado del switch
        updateSwitchState('Navegación por Voz', isVoiceNavOn);
    }

    function setDyslexiaStyle1() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') {
                element.style.fontFamily = 'OpenDyslexic, sans-serif';
            }
        });
        
        // Actualizar el estado del switch
        updateSwitchState('Estilo 1: Fuente OpenDyslexic', true);
        updateSwitchState('Estilo 2: Fuente Comic Sans', false);
        updateSwitchState('Estilo 3: Fuente Verdana', false);
        updateSwitchState('Estilo 4: Fuente Arial', false);
    }
    
    function setDyslexiaStyle2() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') {
                element.style.fontFamily = 'Comic Sans MS, cursive';
            }
        });
        
        // Actualizar el estado del switch
        updateSwitchState('Estilo 1: Fuente OpenDyslexic', false);
        updateSwitchState('Estilo 2: Fuente Comic Sans', true);
        updateSwitchState('Estilo 3: Fuente Verdana', false);
        updateSwitchState('Estilo 4: Fuente Arial', false);
    }

    function setDyslexiaStyle3() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') {
                element.style.fontFamily = 'Verdana, sans-serif';
            }
        });
        
        // Actualizar el estado del switch
        updateSwitchState('Estilo 1: Fuente OpenDyslexic', false);
        updateSwitchState('Estilo 2: Fuente Comic Sans', false);
        updateSwitchState('Estilo 3: Fuente Verdana', true);
        updateSwitchState('Estilo 4: Fuente Arial', false);
    }

    function setDyslexiaStyle4() {
        var elements = document.querySelectorAll('body *:not(#accessibility-widget, #accessibility-widget *)');
        elements.forEach(function(element) {
            if (element.tagName.toLowerCase() !== 'i') {
                element.style.fontFamily = 'Roboto, sans-serif';
            }
        });
        
        // Actualizar el estado del switch
        updateSwitchState('Estilo 1: Fuente OpenDyslexic', false);
        updateSwitchState('Estilo 2: Fuente Comic Sans', false);
        updateSwitchState('Estilo 3: Fuente Verdana', false);
        updateSwitchState('Estilo 4: Fuente Arial', true);
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
        
        // Actualizar el estado del switch
        updateSwitchState('Ocultar Imágenes', areImagesHidden);
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
        
        // Actualizar el estado del switch
        updateSwitchState('Detener Sonidos', areSoundsStopped);
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
        
        // Actualizar el estado del switch
        updateSwitchState('Modo Enfoque', isFocusModeOn);
    }

    // Función para actualizar el estado de los switches
    function updateSwitchState(optionText, isChecked) {
        var optionContainers = document.querySelectorAll('.option-container');
        optionContainers.forEach(function(container) {
            var text = container.querySelector('span').textContent;
            if (text === optionText) {
                var checkbox = container.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = isChecked;
                }
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
        
        // Deseleccionar todos los switches
        var checkboxes = document.querySelectorAll('.switch input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
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
    }

    document.addEventListener('DOMContentLoaded', function() {
    const widget = document.getElementById('accessibility-widget');
    if (!widget) return;

    // 1. Ocultar widget cuando se abre cualquier modal
    function hideWidget() {
        widget.style.display = 'none';
        console.log('Widget ocultado');
    }

    // 2. Mostrar widget cuando se cierra cualquier modal
    function showWidget() {
        widget.style.display = 'block';
        console.log('Widget mostrado');
    }

    // Detectar apertura de modales (para tus botones específicos)
    document.querySelectorAll('[id^="liveBoxSlide"], [data-bs-toggle="modal24"]').forEach(btn => {
        btn.addEventListener('click', hideWidget);
    });

    // Detectar CIERRE de modales de TODAS las formas posibles
    function setupModalCloseDetection() {
        // Para modales de Bootstrap
        document.querySelectorAll('.modal').forEach(modal => {
            // Evento estándar de cierre
            modal.addEventListener('hidden.bs.modal', showWidget);
            
            // Clic en el fondo (backdrop)
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    showWidget();
                }
            });
        });

        // Para modales personalizados
        document.querySelectorAll('.modal-container').forEach(modal => {
            // Observer para cambios de visibilidad
            new MutationObserver(function() {
                if (window.getComputedStyle(modal).display === 'none') {
                    showWidget();
                }
            }).observe(modal, { attributes: true, attributeFilter: ['style'] });
        });

        // Para botones de cerrar genéricos
        document.querySelectorAll('[data-bs-dismiss="modal"], .btn-close').forEach(btn => {
            btn.addEventListener('click', showWidget);
        });

        // Para tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                showWidget();
            }
        });
    }

    // Iniciar la detección
    setupModalCloseDetection();
});

    // Al final de tu widget.js, añade:
function injectAccessibilityToIframes() {
    document.querySelectorAll('iframe').forEach(iframe => {
        try {
            // Esperar a que el iframe cargue
            iframe.addEventListener('load', function() {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                
                // Inyectar CSS
                const link = iframeDoc.createElement('link');
                link.rel = 'stylesheet';
                link.href = './assetsWidget/css/widget.css';
                iframeDoc.head.appendChild(link);
                
                // Inyectar JS
                const script = iframeDoc.createElement('script');
                script.src = './assetsWidget/js/widget.js';
                iframeDoc.body.appendChild(script);
            });
        } catch (e) {
            console.log('No se pudo acceder al iframe:', e);
        }
    });
}

// Llamar la función inicialmente y cada vez que se agreguen iframes
injectAccessibilityToIframes();

// Opcional: Observar cambios en el DOM para iframes dinámicos
const observer = new MutationObserver(injectAccessibilityToIframes);
observer.observe(document.body, { childList: true, subtree: true });
})();