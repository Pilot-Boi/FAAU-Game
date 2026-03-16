// Image attachment overlay helpers used by file-open actions.
(function () {
    const imageWindow = document.getElementById('image-window');
    const imagePanel = imageWindow ? imageWindow.querySelector('.image-window-panel') : null;
    const closeButton = document.getElementById('image-window-close');
    const titleNode = document.getElementById('image-window-title');
    const contentNode = document.getElementById('image-window-content');
    const imageNode = document.getElementById('image-window-preview');
    const statusNode = document.getElementById('image-window-status');

    let previousFocusedElement = null;

    function getFocusableElements() {
        if (!imageWindow) {
            return [];
        }

        return Array.from(
            imageWindow.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ).filter((element) => !element.hasAttribute('disabled'));
    }

    function isImageWindowOpen() {
        return Boolean(imageWindow) && !imageWindow.classList.contains('image-window-hidden');
    }

    function trapFocus(event) {
        if (!isImageWindowOpen() || event.key !== 'Tab') {
            return;
        }

        const focusableElements = getFocusableElements();

        if (focusableElements.length === 0) {
            event.preventDefault();
            if (imagePanel) {
                imagePanel.focus();
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
        if (!isImageWindowOpen()) {
            return;
        }

        if (event.key === 'Escape' || event.key === 'Enter') {
            event.preventDefault();
            closeImageWindow();
            return;
        }

        trapFocus(event);
    }

    function formatImageStatusText(text) {
        const baseText = text || 'STANDBY';
        return `${baseText} | PRESS ENTER TO CLOSE`;
    }

    function setImageWindowStatus(text) {
        if (!statusNode) {
            return;
        }

        statusNode.textContent = formatImageStatusText(text);
    }

    function clearImageWindow() {
        if (titleNode) {
            titleNode.textContent = 'FILE IMAGE ATTACHMENT';
        }

        if (imageNode) {
            imageNode.removeAttribute('src');
            imageNode.alt = 'Attachment preview';
        }

        setImageWindowStatus('STANDBY');
    }

    function openImageWindow(payload = {}) {
        if (!imageWindow) {
            return;
        }

        previousFocusedElement = document.activeElement;

        if (titleNode) {
            titleNode.textContent = payload.title || 'FILE IMAGE ATTACHMENT';
        }

        if (imageNode) {
            imageNode.alt = payload.title || 'Attachment preview';
            imageNode.src = payload.src || '';
        }

        setImageWindowStatus(payload.status || 'IMAGE ATTACHMENT LOADED');

        imageWindow.classList.remove('image-window-hidden');
        imageWindow.setAttribute('aria-hidden', 'false');

        document.body.classList.add('image-window-open');

        window.setTimeout(() => {
            if (closeButton) {
                closeButton.focus();
                return;
            }

            if (contentNode) {
                contentNode.focus();
                return;
            }

            if (imagePanel) {
                imagePanel.focus();
            }
        }, 0);
    }

    function closeImageWindow() {
        if (!imageWindow) {
            return;
        }

        clearImageWindow();

        imageWindow.classList.add('image-window-hidden');
        imageWindow.setAttribute('aria-hidden', 'true');

        document.body.classList.remove('image-window-open');

        if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
            previousFocusedElement.focus();
        }
    }

    function renderImageAttachment(attachment = {}) {
        if (!attachment || !attachment.src) {
            setImageWindowStatus('NO IMAGE ATTACHMENT AVAILABLE');
            return;
        }

        if (typeof closeMessageWindow === 'function') {
            closeMessageWindow();
        }

        if (typeof closeCameraWindow === 'function') {
            closeCameraWindow();
        }

        openImageWindow({
            src: attachment.src,
            title: attachment.title,
            status: attachment.status
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeImageWindow);
    }

    if (imageNode) {
        imageNode.addEventListener('error', () => {
            setImageWindowStatus('FAILED TO LOAD IMAGE ATTACHMENT');
        });

        imageNode.addEventListener('load', () => {
            if (isImageWindowOpen()) {
                setImageWindowStatus('IMAGE ATTACHMENT LOADED');
            }
        });
    }

    document.addEventListener('keydown', handleGlobalKeys);

    window.openImageWindow = openImageWindow;
    window.closeImageWindow = closeImageWindow;
    window.renderImageAttachment = renderImageAttachment;
    window.setImageWindowStatus = setImageWindowStatus;
})();
