// Surveillance feed overlay helpers used by the camera interface.
(function () {
    const cameraWindow = document.getElementById('camera-window');
    const cameraPanel = cameraWindow ? cameraWindow.querySelector('.camera-window-panel') : null;
    const closeButton = document.getElementById('camera-window-close');
    const titleNode = document.getElementById('camera-window-title');
    const contentNode = document.getElementById('camera-content');
    const statusNode = document.getElementById('camera-status');

    let previousFocusedElement = null;

    function isCameraWindowOpen() {
        return Boolean(cameraWindow) && !cameraWindow.classList.contains('camera-window-hidden');
    }

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

    function setCameraStatus(text) {
        if (!statusNode) {
            return;
        }

        statusNode.textContent = text || 'STANDBY';
    }

    function setActiveCameraFeed(feed) {
        if (!titleNode) {
            return;
        }

        titleNode.textContent = feed ? `FEED: ${String(feed).toUpperCase()}` : 'SURVEILLANCE FEED';
    }

    function clearCameraWindow() {
        if (contentNode) {
            contentNode.textContent = '';
        }

        if (titleNode) {
            titleNode.textContent = 'SURVEILLANCE FEED';
        }

        setCameraStatus('STANDBY');
    }

    function renderCameraLines(lines) {
        if (!contentNode || !Array.isArray(lines)) {
            return;
        }

        contentNode.textContent = '';

        for (const lineText of lines) {
            const line = document.createElement('div');
            line.className = 'camera-line';
            line.textContent = lineText;
            contentNode.appendChild(line);
        }

        contentNode.scrollTop = contentNode.scrollHeight;
    }

    function openCameraWindow() {
        if (!cameraWindow) {
            return;
        }

        previousFocusedElement = document.activeElement;
        clearCameraWindow();
        cameraWindow.classList.remove('camera-window-hidden');
        cameraWindow.setAttribute('aria-hidden', 'false');
        document.body.classList.add('camera-window-open');

        window.setTimeout(() => {
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

    document.addEventListener('keydown', handleGlobalKeys);

    window.openCameraWindow = openCameraWindow;
    window.closeCameraWindow = closeCameraWindow;
    window.clearCameraWindow = clearCameraWindow;
    window.renderCameraLines = renderCameraLines;
    window.setCameraStatus = setCameraStatus;
    window.setActiveCameraFeed = setActiveCameraFeed;
})();
