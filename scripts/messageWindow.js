// Communications overlay helpers used by the narrative messaging interface.
(function () {
    const messageWindow = document.getElementById('message-window');
    const messagePanel = messageWindow ? messageWindow.querySelector('.message-window-panel') : null;
    const messageContent = document.getElementById('message-content');
    const messageCompose = document.getElementById('message-compose');
    const messageStatus = document.getElementById('message-status');
    const backButton = document.getElementById('message-window-back');
    const nextButton = document.getElementById('message-window-next');
    const closeButton = document.getElementById('message-window-close');

    let previousFocusedElement = null;
    let conversationRenderToken = 0;
    let backAction = null;
    let nextAction = null;

    function getFocusableElements() {
        if (!messageWindow) {
            return [];
        }

        return Array.from(
            messageWindow.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ).filter((element) => !element.hasAttribute('disabled'));
    }

    function isMessageWindowOpen() {
        return Boolean(messageWindow) && !messageWindow.classList.contains('message-window-hidden');
    }

    function trapFocus(event) {
        if (!isMessageWindowOpen() || event.key !== 'Tab') {
            return;
        }

        const focusableElements = getFocusableElements();

        if (focusableElements.length === 0) {
            event.preventDefault();
            if (messagePanel) {
                messagePanel.focus();
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
        if (!isMessageWindowOpen()) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            closeMessageWindow();
            return;
        }

        trapFocus(event);
    }

    function clearMessageWindow() {
        conversationRenderToken += 1;

        if (messageContent) {
            messageContent.textContent = '';
        }

        if (messageStatus) {
            messageStatus.textContent = 'STANDBY';
        }
    }

    function renderMessageLines(lines) {
        if (!messageContent || !Array.isArray(lines)) {
            return;
        }

        messageContent.textContent = '';

        for (const lineText of lines) {
            const line = document.createElement('div');
            line.className = 'message-line';
            line.textContent = lineText || '\u00A0';
            if (!lineText) {
                line.classList.add('is-blank');
            }
            messageContent.appendChild(line);
        }

        messageContent.scrollTop = messageContent.scrollHeight;
    }

    function renderMessageContacts(contacts, onSelect) {
        if (!messageContent || !Array.isArray(contacts)) {
            return;
        }

        conversationRenderToken += 1;
        messageContent.textContent = '';

        const list = document.createElement('div');
        list.className = 'message-contact-list';

        for (const contact of contacts) {
            const row = document.createElement('div');
            row.className = 'message-contact-item';

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'message-contact-button';
            button.textContent = contact.label;
            button.disabled = !contact.isSelectable;

            if (contact.isSelectable && typeof onSelect === 'function') {
                button.addEventListener('click', () => {
                    // Play click sound
                    if (typeof playSound === 'function') {
                        playSound('click');
                    }
                    onSelect(contact.id);
                });
            }

            const status = document.createElement('span');
            status.className = `message-contact-status ${contact.statusClass || 'is-offline'}`;
            status.textContent = contact.availabilityLabel;

            row.appendChild(button);
            row.appendChild(status);
            list.appendChild(row);
        }

        messageContent.appendChild(list);
        messageContent.scrollTop = 0;
    }

    function renderMessageScene(sceneBlocks) {
        if (!messageContent || !Array.isArray(sceneBlocks)) {
            return;
        }

        conversationRenderToken += 1;
        messageContent.textContent = '';

        for (const block of sceneBlocks) {
            if (!block || !block.type) {
                continue;
            }

            if (block.type === 'message_header') {
                const header = document.createElement('div');
                header.className = 'message-scene-message-header';
                header.textContent = block.sender || 'UNKNOWN SOURCE';
                messageContent.appendChild(header);
                continue;
            }

            if (block.type === 'message_body') {
                const body = document.createElement('div');
                body.className = 'message-scene-message-body';

                const lines = Array.isArray(block.lines) ? block.lines : [];
                for (const lineText of lines) {
                    const line = document.createElement('div');
                    line.className = 'message-scene-line';
                    line.textContent = lineText;
                    body.appendChild(line);
                }

                messageContent.appendChild(body);
                continue;
            }

            if (block.type === 'speaker') {
                const speaker = document.createElement('div');
                speaker.className = 'message-scene-speaker';
                speaker.textContent = block.speaker || 'UNKNOWN';
                messageContent.appendChild(speaker);
                continue;
            }

            if (block.type === 'dialogue') {
                const dialogue = document.createElement('div');
                dialogue.className = 'message-scene-dialogue';

                const lines = Array.isArray(block.lines) ? block.lines : [];
                for (const lineText of lines) {
                    const line = document.createElement('div');
                    line.className = 'message-scene-line';
                    line.textContent = lineText;
                    dialogue.appendChild(line);
                }

                messageContent.appendChild(dialogue);
                continue;
            }

            if (block.type === 'narration') {
                const narration = document.createElement('div');
                narration.className = 'message-scene-narration';

                const lines = Array.isArray(block.lines) ? block.lines : [];
                for (const lineText of lines) {
                    const line = document.createElement('div');
                    line.className = 'message-scene-line';
                    line.textContent = lineText;
                    narration.appendChild(line);
                }

                messageContent.appendChild(narration);
                continue;
            }

            if (block.type === 'divider') {
                const divider = document.createElement('div');
                divider.className = 'message-scene-divider';
                divider.textContent = block.text || '────────────';
                messageContent.appendChild(divider);
            }
        }

        messageContent.scrollTop = messageContent.scrollHeight;
    }

    function setMessageBackAction(handler, label = 'CONTACTS') {
        backAction = typeof handler === 'function' ? handler : null;

        if (!backButton) {
            return;
        }

        if (!backAction) {
            backButton.classList.add('message-window-back-hidden');
            backButton.setAttribute('aria-hidden', 'true');
            backButton.disabled = true;
            backButton.textContent = label;
            return;
        }

        backButton.classList.remove('message-window-back-hidden');
        backButton.setAttribute('aria-hidden', 'false');
        backButton.disabled = false;
        backButton.textContent = label;
    }

    function setMessageAdvanceAction(handler, label = 'NEXT') {
        nextAction = typeof handler === 'function' ? handler : null;

        if (!nextButton) {
            return;
        }

        if (!nextAction) {
            if (messageCompose) {
                messageCompose.classList.add('message-compose-hidden');
                messageCompose.setAttribute('aria-hidden', 'true');
            }

            nextButton.disabled = true;
            nextButton.textContent = label;
            return;
        }

        if (messageCompose) {
            messageCompose.classList.remove('message-compose-hidden');
            messageCompose.setAttribute('aria-hidden', 'false');
        }

        nextButton.disabled = false;
        nextButton.textContent = label;
    }

    function setMessageStatus(text) {
        if (!messageStatus) {
            return;
        }

        messageStatus.textContent = text || 'STANDBY';
    }

    function openMessageWindow() {
        if (!messageWindow) {
            return;
        }

        // Play open_view sound
        if (typeof playSound === 'function') {
            playSound('open_view');
        }

        previousFocusedElement = document.activeElement;
        clearMessageWindow();

        if (typeof closeCameraWindow === 'function') {
            closeCameraWindow();
        }

        messageWindow.classList.remove('message-window-hidden');
        messageWindow.setAttribute('aria-hidden', 'false');
        document.body.classList.add('message-window-open');

        window.setTimeout(() => {
            if (backButton && !backButton.disabled) {
                backButton.focus();
                return;
            }

            if (closeButton) {
                closeButton.focus();
                return;
            }

            if (messagePanel) {
                messagePanel.focus();
            }
        }, 0);
    }

    function closeMessageWindow() {
        if (!messageWindow) {
            return;
        }

        clearMessageWindow();
        setMessageBackAction(null);
        setMessageAdvanceAction(null);
        messageWindow.classList.add('message-window-hidden');
        messageWindow.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('message-window-open');

        if (previousFocusedElement && typeof previousFocusedElement.focus === 'function') {
            previousFocusedElement.focus();
        }
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeMessageWindow);
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

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (typeof playSound === 'function') {
                playSound('click');
            }
            if (typeof nextAction === 'function') {
                nextAction();
            }
        });
    }

    document.addEventListener('keydown', handleGlobalKeys);

    window.openMessageWindow = openMessageWindow;
    window.closeMessageWindow = closeMessageWindow;
    window.renderMessageLines = renderMessageLines;
    window.renderMessageContacts = renderMessageContacts;
    window.renderMessageScene = renderMessageScene;
    window.setMessageStatus = setMessageStatus;
    window.setMessageBackAction = setMessageBackAction;
    window.setMessageAdvanceAction = setMessageAdvanceAction;
})();