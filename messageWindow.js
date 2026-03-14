// Communications overlay helpers used by the narrative messaging interface.
(function () {
    const messageWindow = document.getElementById('message-window');
    const messagePanel = messageWindow ? messageWindow.querySelector('.message-window-panel') : null;
    const messageContent = document.getElementById('message-content');
    const messageStatus = document.getElementById('message-status');
    const backButton = document.getElementById('message-window-back');
    const closeButton = document.getElementById('message-window-close');

    let previousFocusedElement = null;
    let conversationRenderToken = 0;
    let backAction = null;

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
            line.textContent = lineText;
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
            button.disabled = !contact.isAvailable;

            if (contact.isAvailable && typeof onSelect === 'function') {
                button.addEventListener('click', () => {
                    onSelect(contact.id);
                });
            }

            const status = document.createElement('span');
            status.className = `message-contact-status ${contact.isAvailable ? 'is-available' : 'is-unavailable'}`;
            status.textContent = contact.availabilityLabel;

            row.appendChild(button);
            row.appendChild(status);
            list.appendChild(row);
        }

        messageContent.appendChild(list);
        messageContent.scrollTop = 0;
    }

    function wait(ms) {
        return new Promise((resolve) => {
            window.setTimeout(resolve, ms);
        });
    }

    async function renderMessageConversation(conversation) {
        if (!messageContent || !Array.isArray(conversation)) {
            return;
        }

        const token = ++conversationRenderToken;
        messageContent.textContent = '';

        for (const item of conversation) {
            if (token !== conversationRenderToken) {
                return;
            }

            const row = document.createElement('div');
            row.className = `message-chat-row ${item.side === 'right' ? 'is-right' : 'is-left'}`;
            messageContent.appendChild(row);

            const sender = document.createElement('div');
            sender.className = 'message-chat-sender';
            sender.textContent = item.sender || 'UNKNOWN';
            row.appendChild(sender);

            const lines = Array.isArray(item.lines) ? item.lines : [];
            for (const lineText of lines) {
                if (token !== conversationRenderToken) {
                    return;
                }

                const bubble = document.createElement('div');
                bubble.className = 'message-chat-bubble';
                bubble.textContent = lineText;
                row.appendChild(bubble);
                messageContent.scrollTop = messageContent.scrollHeight;
                await wait(110);
            }

            messageContent.scrollTop = messageContent.scrollHeight;
            await wait(120);
        }
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

        previousFocusedElement = document.activeElement;
        clearMessageWindow();
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
            if (typeof backAction === 'function') {
                backAction();
            }
        });
    }

    document.addEventListener('keydown', handleGlobalKeys);

    window.openMessageWindow = openMessageWindow;
    window.closeMessageWindow = closeMessageWindow;
    window.renderMessageLines = renderMessageLines;
    window.renderMessageContacts = renderMessageContacts;
    window.renderMessageConversation = renderMessageConversation;
    window.setMessageStatus = setMessageStatus;
    window.setMessageBackAction = setMessageBackAction;
})();