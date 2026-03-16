// Surveillance overlay helpers used by the cams interface.
(function () {
    const cameraWindow = document.getElementById('camera-window');
    const cameraPanel = cameraWindow ? cameraWindow.querySelector('.camera-window-panel') : null;
    const cameraContent = document.getElementById('camera-content');
    const cameraStatus = document.getElementById('camera-status');
    const titleNode = document.getElementById('camera-window-title');
    const backButton = document.getElementById('camera-window-back');
    const closeButton = document.getElementById('camera-window-close');

    let previousFocusedElement = null;
    let backAction = null;

    function getFocusableElements() {
        if (!cameraWindow) {
            return [];
        }

        return Array.from(
            cameraWindow.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ).filter((element) => !element.hasAttribute('disabled'));
    }

    function isCameraWindowOpen() {
        return Boolean(cameraWindow) && !cameraWindow.classList.contains('camera-window-hidden');
    }

    function trapFocus(event) {
        if (!isCameraWindowOpen() || event.key !== 'Tab') {
            return;
        }

        const focusableElements = getFocusableElements();

        if (focusableElements.length === 0) {
            event.preventDefault();
            if (cameraPanel) {
                cameraPanel.focus();
            }
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
            return;
        }

        if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    function handleGlobalKeys(event) {
        if (!isCameraWindowOpen()) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            closeCameraWindow();
            return;
        }

        trapFocus(event);
    }

    function clearCameraWindow() {
        if (cameraContent) {
            cameraContent.textContent = '';
        }

        if (cameraStatus) {
            cameraStatus.textContent = 'STANDBY';
        }

        if (titleNode) {
            titleNode.textContent = 'SURVEILLANCE FEED';
        }
    }

    function setCameraWindowTitle(text) {
        if (!titleNode) {
            return;
        }

        titleNode.textContent = text || 'SURVEILLANCE FEED';
    }

    function setCameraStatus(text) {
        if (!cameraStatus) {
            return;
        }

        cameraStatus.textContent = text || 'STANDBY';
    }

    function renderCameraLines(lines) {
        if (!cameraContent || !Array.isArray(lines)) {
            return;
        }

        cameraContent.textContent = '';

        for (const lineText of lines) {
            const line = document.createElement('div');
            line.className = 'camera-line';
            line.textContent = lineText || '\u00A0';
            if (!lineText) {
                line.classList.add('is-blank');
            }
            cameraContent.appendChild(line);
        }

        cameraContent.scrollTop = cameraContent.scrollHeight;
    }

    function renderCameraDirectory(feeds, onSelect) {
        if (!cameraContent || !Array.isArray(feeds)) {
            return;
        }

        cameraContent.textContent = '';

        const list = document.createElement('div');
        list.className = 'camera-feed-list';

        for (const feed of feeds) {
            const row = document.createElement('div');
            row.className = 'camera-feed-item';

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'camera-feed-button';
            button.textContent = feed.label;
            button.disabled = !feed.isSelectable;

            if (feed.isSelectable && typeof onSelect === 'function') {
                button.addEventListener('click', () => {
                    onSelect(feed.id);
                });
            }

            const status = document.createElement('span');
            status.className = `camera-feed-status ${feed.statusClass || 'is-restricted'}`;
            status.textContent = feed.availabilityLabel || 'RESTRICTED';

            row.appendChild(button);
            row.appendChild(status);
            list.appendChild(row);
        }

        cameraContent.appendChild(list);
        cameraContent.scrollTop = 0;
    }

    function renderCameraScene(sceneBlocks) {
        if (!cameraContent || !Array.isArray(sceneBlocks)) {
            return;
        }

        cameraContent.textContent = '';

        for (const block of sceneBlocks) {
            if (!block || !block.type) {
                continue;
            }

            if (block.type === 'camera_header') {
                const header = document.createElement('div');
                header.className = 'camera-scene-header';
                const segments = [block.camera || 'UNSPECIFIED CAMERA'];
                if (block.timestamp) {
                    segments.push(block.timestamp);
                }
                header.textContent = segments.join('  |  ');
                cameraContent.appendChild(header);
                continue;
            }

            if (block.type === 'camera_narration') {
                const narration = document.createElement('div');
                narration.className = 'camera-scene-narration';

                for (const lineText of Array.isArray(block.lines) ? block.lines : []) {
                    const line = document.createElement('div');
                    line.className = 'camera-scene-line';
                    line.textContent = lineText;
                    narration.appendChild(line);
                }

                cameraContent.appendChild(narration);
                continue;
            }

            if (block.type === 'camera_action') {
                const action = document.createElement('div');
                action.className = 'camera-scene-action';

                for (const lineText of Array.isArray(block.lines) ? block.lines : []) {
                    const line = document.createElement('div');
                    line.className = 'camera-scene-line';
                    line.textContent = lineText;
                    action.appendChild(line);
                }

                cameraContent.appendChild(action);
                continue;
            }

            if (block.type === 'camera_divider') {
                const divider = document.createElement('div');
                divider.className = 'camera-scene-divider';
                divider.textContent = block.text || '────────────';
                cameraContent.appendChild(divider);
            }
        }

        cameraContent.scrollTop = cameraContent.scrollHeight;
    }

    function setCameraBackAction(handler, label = 'DIRECTORY') {
        backAction = typeof handler === 'function' ? handler : null;

        if (!backButton) {
            return;
        }

        if (!backAction) {
            backButton.classList.add('camera-window-back-hidden');
            backButton.setAttribute('aria-hidden', 'true');
            backButton.disabled = true;
            backButton.textContent = label;
            return;
        }

        backButton.classList.remove('camera-window-back-hidden');
        backButton.setAttribute('aria-hidden', 'false');
        backButton.disabled = false;
        backButton.textContent = label;
    }

    function openCameraWindow(payload = {}) {
        if (!cameraWindow) {
            return;
        }

        previousFocusedElement = document.activeElement;
        clearCameraWindow();

        if (typeof closeMessageWindow === 'function') {
            closeMessageWindow();
        }

        if (typeof closeImageWindow === 'function') {
            closeImageWindow();
        }

        setCameraWindowTitle(payload.title || 'SURVEILLANCE FEED');
        setCameraStatus(payload.status || 'STANDBY');

        cameraWindow.classList.remove('camera-window-hidden');
        cameraWindow.setAttribute('aria-hidden', 'false');
        document.body.classList.add('camera-window-open');

        window.setTimeout(() => {
            if (backButton && !backButton.disabled) {
                backButton.focus();
                return;
            }

            if (closeButton) {
                closeButton.focus();
                return;
            }

            if (cameraPanel) {
                cameraPanel.focus();
            }
        }, 0);
    }

    function closeCameraWindow() {
        if (!cameraWindow) {
            return;
        }

        clearCameraWindow();
        setCameraBackAction(null);
        cameraWindow.classList.add('camera-window-hidden');
        cameraWindow.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('camera-window-open');

        if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
            previousFocusedElement.focus();
        }
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeCameraWindow);
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            if (typeof backAction === 'function') {
                backAction();
            }
        });
    }

    document.addEventListener('keydown', handleGlobalKeys);

    window.openCameraWindow = openCameraWindow;
    window.closeCameraWindow = closeCameraWindow;
    window.renderCameraLines = renderCameraLines;
    window.renderCameraDirectory = renderCameraDirectory;
    window.renderCameraScene = renderCameraScene;
    window.setCameraStatus = setCameraStatus;
    window.setCameraWindowTitle = setCameraWindowTitle;
    window.setCameraBackAction = setCameraBackAction;
})();
