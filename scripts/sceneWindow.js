// Reconstructed interaction log overlay helpers used by the scene interface.
(function () {
    const sceneWindow = document.getElementById('scene-window');
    const scenePanel = sceneWindow ? sceneWindow.querySelector('.scene-window-panel') : null;
    const sceneContent = document.getElementById('scene-content');
    const sceneStatus = document.getElementById('scene-status');
    const titleNode = document.getElementById('scene-window-title');
    const backButton = document.getElementById('scene-window-back');
    const closeButton = document.getElementById('scene-window-close');

    let previousFocusedElement = null;
    let backAction = null;

    function getFocusableElements() {
        if (!sceneWindow) {
            return [];
        }

        return Array.from(
            sceneWindow.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ).filter((element) => !element.hasAttribute('disabled'));
    }

    function isSceneWindowOpen() {
        return Boolean(sceneWindow) && !sceneWindow.classList.contains('scene-window-hidden');
    }

    function trapFocus(event) {
        if (!isSceneWindowOpen() || event.key !== 'Tab') {
            return;
        }

        const focusableElements = getFocusableElements();

        if (focusableElements.length === 0) {
            event.preventDefault();
            if (scenePanel) {
                scenePanel.focus();
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
        if (!isSceneWindowOpen()) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            closeSceneWindow();
            return;
        }

        trapFocus(event);
    }

    function clearSceneWindow() {
        if (sceneContent) {
            sceneContent.textContent = '';
        }

        if (sceneStatus) {
            sceneStatus.textContent = 'STANDBY';
        }

        if (titleNode) {
            titleNode.textContent = 'RECONSTRUCTED INTERACTION LOG';
        }
    }

    function setSceneWindowTitle(text) {
        if (!titleNode) {
            return;
        }

        titleNode.textContent = text || 'RECONSTRUCTED INTERACTION LOG';
    }

    function setSceneStatus(text) {
        if (!sceneStatus) {
            return;
        }

        sceneStatus.textContent = text || 'STANDBY';
    }

    function renderSceneLines(lines) {
        if (!sceneContent || !Array.isArray(lines)) {
            return;
        }

        sceneContent.textContent = '';

        for (const lineText of lines) {
            const line = document.createElement('div');
            line.className = 'scene-line';
            line.textContent = lineText || '\u00A0';
            if (!lineText) {
                line.classList.add('is-blank');
            }
            sceneContent.appendChild(line);
        }

        sceneContent.scrollTop = sceneContent.scrollHeight;
    }

    function renderSceneDirectory(records, onSelect) {
        if (!sceneContent || !Array.isArray(records)) {
            return;
        }

        sceneContent.textContent = '';

        const list = document.createElement('div');
        list.className = 'scene-record-list';

        for (const record of records) {
            const row = document.createElement('div');
            row.className = 'scene-record-item';

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'scene-record-button';
            button.textContent = record.title;
            button.disabled = !record.isSelectable;

            if (record.isSelectable && typeof onSelect === 'function') {
                button.addEventListener('click', () => {
                    if (typeof playSound === 'function') {
                        playSound('click');
                    }
                    onSelect(record.id);
                });
            }

            const status = document.createElement('span');
            status.className = `scene-record-status ${record.statusClass || 'is-offline'}`;
            status.textContent = record.availabilityLabel || 'OFFLINE';

            row.appendChild(button);
            row.appendChild(status);
            list.appendChild(row);
        }

        sceneContent.appendChild(list);
        sceneContent.scrollTop = 0;
    }

    function appendLines(container, className, lines) {
        for (const lineText of Array.isArray(lines) ? lines : []) {
            const line = document.createElement('div');
            line.className = className;
            line.textContent = lineText;
            container.appendChild(line);
        }
    }

    function renderSceneLog(sceneBlocks) {
        if (!sceneContent || !Array.isArray(sceneBlocks)) {
            return;
        }

        sceneContent.textContent = '';

        let latestSpeaker = null;

        for (const block of sceneBlocks) {
            if (!block || !block.type) {
                continue;
            }

            if (block.type === 'scene_header') {
                const header = document.createElement('div');
                header.className = 'scene-log-header';
                header.textContent = block.text || block.title || 'RECONSTRUCTED INTERACTION LOG';
                sceneContent.appendChild(header);
                continue;
            }

            if (block.type === 'message_header') {
                const header = document.createElement('div');
                header.className = 'scene-log-query-header';
                header.textContent = block.sender || 'UNKNOWN SOURCE';
                sceneContent.appendChild(header);
                continue;
            }

            if (block.type === 'message_body') {
                const body = document.createElement('div');
                body.className = 'scene-log-query-body';
                appendLines(body, 'scene-log-line', block.lines);
                sceneContent.appendChild(body);
                continue;
            }

            if (block.type === 'speaker') {
                const speaker = document.createElement('div');
                speaker.className = 'scene-log-speaker';
                speaker.textContent = block.speaker || 'UNKNOWN';
                sceneContent.appendChild(speaker);
                latestSpeaker = speaker;
                continue;
            }

            if (block.type === 'dialogue') {
                const dialogue = document.createElement('div');
                dialogue.className = 'scene-log-dialogue';
                appendLines(dialogue, 'scene-log-line', block.lines);
                sceneContent.appendChild(dialogue);
                continue;
            }

            if (block.type === 'narration') {
                const narration = document.createElement('div');
                narration.className = 'scene-log-narration';
                appendLines(narration, 'scene-log-line', block.lines);
                sceneContent.appendChild(narration);
                continue;
            }

            if (block.type === 'divider') {
                const divider = document.createElement('div');
                divider.className = 'scene-log-divider';
                divider.textContent = block.text || 'SEGMENT BREAK';
                sceneContent.appendChild(divider);
            }
        }

        requestAnimationFrame(() => {
            if (!latestSpeaker || !sceneContent) {
                sceneContent.scrollTop = 0;
                return;
            }

            const contentRect = sceneContent.getBoundingClientRect();
            const speakerRect = latestSpeaker.getBoundingClientRect();
            const targetTop = sceneContent.scrollTop + (speakerRect.top - contentRect.top);

            sceneContent.scrollTop = targetTop;
        });
    }

    function setSceneBackAction(handler, label = 'INDEX') {
        backAction = typeof handler === 'function' ? handler : null;

        if (!backButton) {
            return;
        }

        if (!backAction) {
            backButton.classList.add('scene-window-back-hidden');
            backButton.setAttribute('aria-hidden', 'true');
            backButton.disabled = true;
            backButton.textContent = label;
            return;
        }

        backButton.classList.remove('scene-window-back-hidden');
        backButton.setAttribute('aria-hidden', 'false');
        backButton.disabled = false;
        backButton.textContent = label;
    }

    function openSceneWindow(payload = {}) {
        if (!sceneWindow) {
            return;
        }

        if (typeof playSound === 'function') {
            playSound('open_view');
        }

        previousFocusedElement = document.activeElement;
        clearSceneWindow();

        if (typeof closeMessageWindow === 'function') {
            closeMessageWindow();
        }

        if (typeof closeCameraWindow === 'function') {
            closeCameraWindow();
        }

        if (typeof closeImageWindow === 'function') {
            closeImageWindow();
        }

        setSceneWindowTitle(payload.title || 'RECONSTRUCTED INTERACTION LOG');
        setSceneStatus(payload.status || 'STANDBY');

        sceneWindow.classList.remove('scene-window-hidden');
        sceneWindow.setAttribute('aria-hidden', 'false');
        document.body.classList.add('scene-window-open');

        window.setTimeout(() => {
            if (backButton && !backButton.disabled) {
                backButton.focus();
                return;
            }

            if (closeButton) {
                closeButton.focus();
                return;
            }

            if (scenePanel) {
                scenePanel.focus();
            }
        }, 0);
    }

    function closeSceneWindow() {
        if (!sceneWindow) {
            return;
        }

        clearSceneWindow();
        setSceneBackAction(null);
        sceneWindow.classList.add('scene-window-hidden');
        sceneWindow.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('scene-window-open');

        if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
            previousFocusedElement.focus();
        }
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeSceneWindow);
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            if (typeof playSound === 'function') {
                playSound('click');
            }
            if (typeof backAction === 'function') {
                backAction();
            }
        });
    }

    document.addEventListener('keydown', handleGlobalKeys);

    window.openSceneWindow = openSceneWindow;
    window.closeSceneWindow = closeSceneWindow;
    window.renderSceneLines = renderSceneLines;
    window.renderSceneDirectory = renderSceneDirectory;
    window.renderSceneLog = renderSceneLog;
    window.setSceneStatus = setSceneStatus;
    window.setSceneWindowTitle = setSceneWindowTitle;
    window.setSceneBackAction = setSceneBackAction;
})();