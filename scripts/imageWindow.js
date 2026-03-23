// Image attachment overlay helpers used by file-open actions.
(function () {
    const imageWindow = document.getElementById('image-window');
    const imagePanel = imageWindow ? imageWindow.querySelector('.image-window-panel') : null;
    const closeButton = document.getElementById('image-window-close');
    const titleNode = document.getElementById('image-window-title');
    const contentNode = document.getElementById('image-window-content');
    let imageNode = document.getElementById('image-window-preview');
    const statusNode = document.getElementById('image-window-status');

    let previousFocusedElement = null;
    let activeImageStatus = 'IMAGE ATTACHMENT LOADED';
    let imageRequestNonce = 0;

    function buildImageRequestSrc(src) {
        const baseSrc = String(src || '').trim();
        if (!baseSrc) {
            return '';
        }

        imageRequestNonce += 1;
        const separator = baseSrc.includes('?') ? '&' : '?';
        return `${baseSrc}${separator}view=${imageRequestNonce}`;
    }

    function bindImageNodeEvents(node) {
        if (!node) {
            return;
        }

        node.addEventListener('error', () => {
            setImageWindowStatus('FAILED TO LOAD IMAGE ATTACHMENT');
        });

        node.addEventListener('load', () => {
            if (isImageWindowOpen()) {
                setImageWindowStatus(activeImageStatus);
            }
        });
    }

    function replaceImageNode() {
        if (!contentNode || !imageNode) {
            return imageNode;
        }

        const nextImageNode = imageNode.cloneNode(false);
        nextImageNode.removeAttribute('src');
        nextImageNode.alt = 'Attachment preview';
        contentNode.replaceChild(nextImageNode, imageNode);
        imageNode = nextImageNode;
        bindImageNodeEvents(imageNode);

        return imageNode;
    }

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

        if (event.key === 'Escape') {
            event.preventDefault();
            closeImageWindow();
            return;
        }

        if (event.key === 'Enter') {
            const eventTarget = event.target instanceof Element ? event.target : null;
            const activeElement = document.activeElement instanceof Element ? document.activeElement : null;
            const isInsideImageWindow = (eventTarget && imageWindow.contains(eventTarget)) ||
                (activeElement && imageWindow.contains(activeElement));

            if (!isInsideImageWindow) {
                return;
            }

            event.preventDefault();
            closeImageWindow();
            return;
        }

        trapFocus(event);
    }

    function setImageWindowStatus(text) {
        if (!statusNode) {
            return;
        }

        const baseText = String(text || 'STANDBY').trim();
        const closeHint = 'PRESS ESC OR ENTER TO CLOSE';
        const hasHint = baseText.toUpperCase().includes(closeHint);
        statusNode.textContent = hasHint ? baseText : `${baseText} | ${closeHint}`;
    }

    function clearImageWindow() {
        if (titleNode) {
            titleNode.textContent = 'FILE IMAGE ATTACHMENT';
        }

        activeImageStatus = 'IMAGE ATTACHMENT LOADED';

        if (imageNode) {
            replaceImageNode();
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
        activeImageStatus = payload.status || 'IMAGE ATTACHMENT LOADED';

        if (titleNode) {
            titleNode.textContent = payload.title || 'FILE IMAGE ATTACHMENT';
        }

        if (imageNode) {
            replaceImageNode();
            const nextSrc = buildImageRequestSrc(payload.src);
            imageNode.alt = payload.title || 'Attachment preview';
            imageNode.removeAttribute('src');

            if (nextSrc) {
                imageNode.src = nextSrc;
            }
        }

        setImageWindowStatus(activeImageStatus);

        imageWindow.classList.remove('image-window-hidden');
        imageWindow.style.display = 'block';
        imageWindow.setAttribute('aria-hidden', 'false');
        imageWindow.setAttribute('aria-modal', 'true');

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
        imageWindow.style.display = 'none';
        imageWindow.setAttribute('aria-hidden', 'true');
        imageWindow.setAttribute('aria-modal', 'false');

        document.body.classList.remove('image-window-open');

        if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
            previousFocusedElement.focus();
        }

        previousFocusedElement = null;
    }

    function renderImageAttachment(attachment = {}) {
        if (!attachment || !attachment.src) {
            setImageWindowStatus('NO IMAGE ATTACHMENT AVAILABLE');
            return;
        }

        if (isImageWindowOpen()) {
            closeImageWindow();
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

    bindImageNodeEvents(imageNode);

    document.addEventListener('keydown', handleGlobalKeys);

    window.openImageWindow = openImageWindow;
    window.closeImageWindow = closeImageWindow;
    window.renderImageAttachment = renderImageAttachment;
    window.setImageWindowStatus = setImageWindowStatus;
})();
