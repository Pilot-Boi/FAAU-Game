// Boot log lines typed at startup before the prompt is enabled.
const bootLines = [
    'INITIALIZING FACILITY SYSTEM INTERFACE...',
    'LOADING CORE MODULES...',
    'CHECKING MEMORY...',
    'MEMORY STATUS: OK',
    'CONNECTING TO INTERNAL NETWORK...',
    'NETWORK STATUS: CONNECTED',
    'VERIFYING SECURITY PROTOCOLS...',
    'AUTHORIZATION SYSTEM ONLINE',
    'LOADING ARCHIVE INDEX...',
    'ARCHIVE STATUS: PARTIAL',
    'WARNING: SOME RECORDS UNAVAILABLE',
    'INITIALIZING TERMINAL INTERFACE...',
    'SYSTEM READY'
];

// Intro status block shown after the logo.
const postBootLines = [
    'WELCOME TO THE FACILITY TERMINAL INTERFACE',
    '',
    'ACCESS LEVEL: OBSERVER',
    'SOURCE: UNKNOWN',
    'TYPE "HELP" FOR A LIST OF AVAILABLE COMMANDS'
];

// ASCII banner displayed after boot logs.
const facilityLogoLines = [
    '████████╗██╗  ██╗███████╗    ███████╗ █████╗  ██████╗██╗██╗     ██╗████████╗██╗   ██╗',
    '╚══██╔══╝██║  ██║██╔════╝    ██╔════╝██╔══██╗██╔════╝██║██║     ██║╚══██╔══╝╚██╗ ██╔╝',
    '   ██║   ███████║█████╗      █████╗  ███████║██║     ██║██║     ██║   ██║    ╚████╔╝',
    '   ██║   ██╔══██║██╔══╝      ██╔══╝  ██╔══██║██║     ██║██║     ██║   ██║     ╚██╔╝',
    '   ██║   ██║  ██║███████╗    ██║     ██║  ██║╚██████╗██║███████╗██║   ██║      ██║',
    '   ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝'
];

// Timing controls for line-by-line and character-by-character effects.
const lineDelayMs = 450;
const finalPauseMs = 300;
const characterDelayMs = 24;
const logoLineDelayMs = 70;
const postBootLineDelayMs = 90;

// Core DOM references.
const terminalOutput = document.getElementById('terminal-output');
const terminalPrompt = document.getElementById('terminal-prompt');
const promptInput = document.querySelector('.prompt-input');
const promptSymbol = document.getElementById('prompt-symbol');


// Tracks keywords already announced to avoid repeating the same unlock message.
const announcedTerms = new Set();

function normalizeImageAttachment(attachment) {
    if (!attachment) {
        return null;
    }

    if (typeof attachment === 'string') {
        const src = attachment.trim();
        if (!src) {
            return null;
        }

        return {
            src,
            title: 'FILE IMAGE ATTACHMENT',
            description: ''
        };
    }

    if (typeof attachment === 'object') {
        const src = typeof attachment.src === 'string' ? attachment.src.trim() : '';
        if (!src) {
            return null;
        }

        return {
            src,
            title: typeof attachment.title === 'string' ? attachment.title : 'FILE IMAGE ATTACHMENT',
            description: typeof attachment.description === 'string' ? attachment.description : ''
        };
    }

    return null;
}

function openImageAttachmentWindow(attachment, meta = {}) {
    const normalized = normalizeImageAttachment(attachment);

    if (!normalized) {
        return;
    }

    if (typeof renderImageAttachment !== 'function') {
        appendOutputLine('[SYSTEM] Image attachment detected, but the image viewer module is unavailable.');
        return;
    }

    const fileName = typeof meta.fileName === 'string' ? meta.fileName : 'UNKNOWN FILE';
    const filePath = typeof meta.path === 'string' ? meta.path : '/';

    renderImageAttachment({
        src: normalized.src,
        title: normalized.title || `FILE IMAGE ATTACHMENT // ${fileName.toUpperCase()}`,
        meta: `SOURCE FILE: ${fileName} (${filePath}) | IMAGE SOURCE: ${normalized.src}`,
        status: normalized.description || 'IMAGE ATTACHMENT LOADED'
    });

    appendOutputLine('[SYSTEM] Image attachment detected. Opening image panel...');
}

// Keep newest output in view.
function scrollTerminalToBottom() {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Create one terminal output row.
function appendBootLine() {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    terminalOutput.appendChild(line);
    scrollTerminalToBottom();
    return line;
}

// Apply lightweight syntax coloring to improve terminal readability.
function getTerminalLineClass(text) {
    const normalized = String(text || '').trim();
    const lowerNormalized = normalized.toLowerCase();

    if (!normalized) {
        return '';
    }

    if (normalized.startsWith('[SYSTEM]')) {
        return 'terminal-line-system';
    }

    if (/^FACILITY:.*>\s/.test(normalized)) {
        return 'terminal-line-command';
    }

    if (/^--- .* ---$/.test(normalized) && normalized !== '--- END FILE ---') {
        return 'terminal-line-file-header';
    }

    if (normalized === '--- END FILE ---') {
        return 'terminal-line-divider';
    }

    if (/^(INCOMING TRANSMISSION|Establishing anomalous relay\.\.\.|Routing .* transmission channel\.\.\.|Connection established\.|Channel Status:)/.test(normalized)) {
        return 'terminal-line-transmission';
    }

    if (
        /^[A-Za-z0-9 .'-]+:$/.test(normalized) &&
        !/^(Label|Type|Summary|Classification|Details|Usage|Description|Position|Division|Office|Status|Source|Access Level|Directory|Channel Status):$/i.test(normalized)
    ) {
        return 'terminal-line-speaker';
    }

    if (/^(DIRECTORY:|SEARCH RESULTS FOR:|TERM DOSSIER|ARCHIVED KEYWORDS|AVAILABLE COMMANDS|KNOWN CONTACTS)/.test(normalized)) {
        return 'terminal-line-heading';
    }

    if (/^\[(DIR|FILE)\]/.test(normalized)) {
        return 'terminal-line-entry';
    }

    if (/^warning:/.test(lowerNormalized)) {
        return 'terminal-line-system';
    }

    if (/(access denied|not found|command unavailable|command not recognized|no archived reference found|unknown error|invalid path|directory error|usage:)/i.test(normalized)) {
        return 'terminal-line-error';
    }

    return '';
}

// Append a complete output row immediately.
function appendOutputLine(text, extraClasses = []) {
    const line = appendBootLine();
    const lineClass = getTerminalLineClass(text);
    if (lineClass) {
        line.classList.add(lineClass);
    }

    const classList = Array.isArray(extraClasses) ? extraClasses : [extraClasses];
    for (const className of classList) {
        if (className) {
            line.classList.add(className);
        }
    }

    line.textContent = text;
    return line;
}

// Helper for printing multiple output rows.
function printLines(lines) {
    let contextMode = null;

    for (const line of lines) {
        const normalized = String(line || '').trim();
        const extraClasses = [];

        if (contextMode === 'file' && normalized && normalized !== '--- END FILE ---') {
            extraClasses.push('terminal-line-file-content');
        }

        if (contextMode === 'search' && normalized && !normalized.startsWith('[SYSTEM]')) {
            extraClasses.push('terminal-line-search-content');
        }

        appendOutputLine(line, extraClasses);

        if (/^--- .* ---$/.test(normalized) && normalized !== '--- END FILE ---') {
            contextMode = 'file';
            continue;
        }

        if (normalized === '--- END FILE ---') {
            contextMode = null;
            continue;
        }

        if (/^SEARCH RESULTS FOR:/.test(normalized)) {
            contextMode = 'search';
            continue;
        }

        if (contextMode === 'search' && normalized.startsWith('[SYSTEM]')) {
            contextMode = null;
        }
    }
}

// Convert normalized term keys into readable terminal labels.
function formatTermForOutput(term) {
    return String(term || '')
        .trim()
        .replace(/\s+/g, '_')
        .toUpperCase();
}

// Normalize terms for stable comparisons regardless of case/spacing style.
function normalizeTermKey(term) {
    return String(term || '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_');
}

// Resolve contact display name, upgrading from subject ID to known name when available.
function getContactDisplayLabel(definition, discoveredTerms, termMetadata, fallbackLabel) {
    if (!definition || !Array.isArray(definition.revealedNames)) {
        return fallbackLabel;
    }

    for (const reveal of definition.revealedNames) {
        const revealTerm = normalizeTermKey(reveal.term);
        if (revealTerm && discoveredTerms.has(revealTerm)) {
            return reveal.label || fallbackLabel;
        }
    }

    return fallbackLabel;
}

function contactHasUnreadDialogue(contactId) {
    if (!contactId || typeof findUnreadReplyEntryForContact !== 'function') {
        return false;
    }

    const chapter = getChapterByIndex(getCurrentChapterIndex());
    if (!chapter) {
        return false;
    }

    return Boolean(findUnreadReplyEntryForContact(chapter, contactId));
}

// Build the visible message-contact list from discovered person terms.
function getDiscoveredMessageContacts() {
    const discoveredTerms = new Set((getDiscoveredTerms() || []).map(normalizeTermKey));
    const termMetadata = typeof TERM_METADATA !== 'undefined' ? TERM_METADATA : {};
    const contactMetadata = typeof CONTACT_METADATA !== 'undefined' ? CONTACT_METADATA : {};
    const availabilityByChapter =
        typeof CONTACT_AVAILABILITY_BY_CHAPTER !== 'undefined' ? CONTACT_AVAILABILITY_BY_CHAPTER : {};
    const currentChapterIndex = getCurrentChapterIndex();
    const unlockedContacts = new Set();

    for (const [chapterIndex, contactIds] of Object.entries(availabilityByChapter)) {
        const parsedChapterIndex = Number(chapterIndex);
        if (Number.isNaN(parsedChapterIndex) || parsedChapterIndex > currentChapterIndex) {
            continue;
        }

        for (const contactId of contactIds || []) {
            unlockedContacts.add(contactId);
        }
    }

    const unreadContacts = new Set();
    const currentChapter = getChapterByIndex(currentChapterIndex);
    if (currentChapter && typeof findUnreadReplyEntryForContact === 'function') {
        for (const contactId of unlockedContacts) {
            if (findUnreadReplyEntryForContact(currentChapter, contactId)) {
                unreadContacts.add(contactId);
            }
        }
    }

    return Object.entries(contactMetadata)
        .filter(([, definition]) => {
            const termKey = normalizeTermKey(definition.termKey || '');
            if (termKey && discoveredTerms.has(termKey)) {
                return true;
            }

            const revealTerms = Array.isArray(definition.revealedNames) ? definition.revealedNames : [];
            return revealTerms.some((reveal) => discoveredTerms.has(normalizeTermKey(reveal.term)));
        })
        .map(([contactId, definition]) => {
            const termKey = normalizeTermKey(definition.termKey || contactId);
            const meta = termMetadata[termKey] || {};
            const fallbackLabel = formatTermForOutput(termKey).replace(/_/g, ' ');
            const defaultLabel = definition.label || meta.label || fallbackLabel;
            const displayLabel = getContactDisplayLabel(definition, discoveredTerms, termMetadata, defaultLabel);
            const hasUnlockedDialogue = unlockedContacts.has(contactId);
            const hasUnreadDialogue = unreadContacts.has(contactId);

            let presence = 'OFFLINE';
            let statusClass = 'is-offline';

            if (hasUnreadDialogue) {
                presence = 'ONLINE';
                statusClass = 'is-online';
            } else if (hasUnlockedDialogue) {
                presence = 'AWAY';
                statusClass = 'is-away';
            }

            return {
                id: contactId,
                termKey,
                label: displayLabel,
                isSelectable: hasUnlockedDialogue,
                availabilityLabel: presence,
                statusClass
            };
        });
}

// Helper for printing result objects returned from directory.js.
function printResult(result) {
    if (!result) {
        appendOutputLine('Unknown error.');
        return;
    }

    if (result.error) {
        appendOutputLine(result.error);
    }

    if (result.entries) {
        printLines(result.entries);
    }

    if (result.meta) {
        handleResultMeta(result.meta);

        const eventLines = evaluateEvents(result.meta);
        if (eventLines.length > 0) {
            printLines(eventLines);
        }
    }
}

// Display story communication output inside the communications overlay.
function displayMessageWindowResult(result, statusText = 'CHANNEL ACTIVE') {
    if (!result) {
        appendOutputLine('Unknown error.');
        return;
    }

    if (result.error) {
        appendOutputLine(result.error);
        return;
    }

    if (typeof openMessageWindow === 'function') {
        openMessageWindow();
    }

    if (typeof setMessageStatus === 'function') {
        setMessageStatus(statusText);
    }

    if (result.meta && Array.isArray(result.meta.conversation) && typeof renderMessageConversation === 'function') {
        renderMessageConversation(result.meta.conversation);
    } else if (typeof renderMessageLines === 'function' && result.entries) {
        renderMessageLines(result.entries);
    }

    if (result.meta) {
        handleResultMeta(result.meta);

        const eventLines = evaluateEvents(result.meta);
        if (eventLines.length > 0) {
            printLines(eventLines);
        }
    }
}

// Show the discovered contacts directory inside the communications interface.
function showMessageContactDirectory() {
    const contacts = getDiscoveredMessageContacts();

    if (typeof openMessageWindow === 'function') {
        openMessageWindow();
    }

    if (typeof setMessageBackAction === 'function') {
        setMessageBackAction(null);
    }

    if (typeof setMessageAdvanceAction === 'function') {
        setMessageAdvanceAction(null);
    }

    if (typeof setMessageStatus === 'function') {
        setMessageStatus('CONTACT DIRECTORY');
    }

    if (contacts.length === 0) {
        if (typeof renderMessageLines === 'function') {
            renderMessageLines([
                'No known contacts available.',
                'Continue investigating the archive to identify message targets.'
            ]);
        }

        return;
    }

    if (typeof renderMessageContacts === 'function') {
        renderMessageContacts(contacts, openMessageContact);
        return;
    }

    const fallbackLines = ['KNOWN CONTACTS', ''];

    for (const contact of contacts) {
        fallbackLines.push(`${contact.label} [${contact.availabilityLabel}]`);
    }

    renderMessageLines(fallbackLines);
}

// Open a selected contact thread if that contact has unlocked dialogue.
function openMessageContact(contactId) {
    const contact = getDiscoveredMessageContacts().find((entry) => entry.id === contactId);

    if (!contact) {
        if (typeof setMessageStatus === 'function') {
            setMessageStatus('UNKNOWN CONTACT');
        }

        if (typeof renderMessageLines === 'function') {
            renderMessageLines(['Selected contact could not be resolved.']);
        }

        return;
    }

    if (!contact.isSelectable) {
        if (typeof setMessageStatus === 'function') {
            setMessageStatus('CONTACT OFFLINE');
        }

        if (typeof renderMessageLines === 'function') {
            renderMessageLines([`${contact.label} has no unlocked transmissions.`]);
        }

        return;
    }

    if (typeof openMessageWindow === 'function') {
        openMessageWindow();
    }

    if (typeof setMessageBackAction === 'function') {
        setMessageBackAction(showMessageContactDirectory, 'CONTACTS');
    }

    if (typeof setMessageAdvanceAction === 'function') {
        setMessageAdvanceAction(null);
    }

    if (typeof setMessageStatus === 'function') {
        setMessageStatus(`CHANNEL ACTIVE: ${contact.label.toUpperCase()}`);
    }

    const result = openMessageInterface(contactId);

    if (!result) {
        if (typeof renderMessageLines === 'function') {
            renderMessageLines(['Unknown error.']);
        }
        return;
    }

    let newlyAppendedCount = 0;

    if (result.meta && result.meta.action === 'story' && Array.isArray(result.meta.conversation)) {
        appendContactMessageHistory(contactId, result.meta.conversation);
        newlyAppendedCount = result.meta.conversation.length;
    }

    const conversationHistory = getContactMessageHistory(contactId);
    if (typeof renderMessageConversation === 'function' && conversationHistory.length > 0) {
        const animateFromIndex = newlyAppendedCount > 0
            ? Math.max(0, conversationHistory.length - newlyAppendedCount)
            : conversationHistory.length;

        renderMessageConversation(conversationHistory, { animateFromIndex });
    } else if (typeof renderMessageLines === 'function' && result.entries) {
        renderMessageLines(result.entries);
    }

    if (result.error) {
        appendOutputLine(result.error);
        return;
    }

    if (result.meta) {
        handleResultMeta(result.meta);

        const eventLines = evaluateEvents(result.meta);
        if (eventLines.length > 0) {
            printLines(eventLines);
        }
    }

    if (typeof setMessageAdvanceAction === 'function') {
        if (contactHasUnreadDialogue(contactId)) {
            setMessageAdvanceAction(() => {
                openMessageContact(contactId);
            }, 'NEXT');
        } else {
            setMessageAdvanceAction(null);
        }
    }
}


// Handle special metadata returned from directory operations to trigger story events and other side effects.
function handleResultMeta(meta) {
    if (!meta) {
        return;
    }

    if (meta.action === 'open' && meta.onOpenFlag) {
        const termsToAnnounce = Array.isArray(meta.terms) ? meta.terms : [];

        const knownTerms = new Set((getDiscoveredTerms() || []).map(normalizeTermKey));
        const newTerms = termsToAnnounce.filter((term) => {
            const normalized = normalizeTermKey(term);
            return knownTerms.has(normalized) && !announcedTerms.has(normalized);
        });

        if (newTerms.length > 0) {
            appendOutputLine('');

            for (const term of newTerms) {
                announcedTerms.add(normalizeTermKey(term));
                appendOutputLine(`[SYSTEM] New keyword archived: ${formatTermForOutput(term)}`);
            }
        }
    }

    if (meta.action === 'open' && meta.imageAttachment) {
        openImageAttachmentWindow(meta.imageAttachment, meta);
    }

    if (meta.action === 'search' && meta.resultCount > 0) {
        appendOutputLine('');
        appendOutputLine('[SYSTEM] Search complete.');
    }

    if (meta.action === 'story' && Array.isArray(meta.unlockedTerms) && meta.unlockedTerms.length > 0) {
        appendOutputLine('');
        appendOutputLine('[SYSTEM] Archive updated.');
        for (const term of meta.unlockedTerms) {
            appendOutputLine(`[SYSTEM] New keyword archived: ${formatTermForOutput(term)}`);
        }
    }
}

// Command registry: add new commands here to make them available and auto-listed in help.
const COMMANDS = {
    help: {
        name: 'help',
        usage: 'help',
        description: 'Displays this help menu.',
        execute: () => {
            appendOutputLine('AVAILABLE COMMANDS');
            appendOutputLine('');

            for (const command of Object.values(COMMANDS)) {
                if (!isCommandUnlocked(command.name)) {
                    continue;
                }

                appendOutputLine(command.name);
                appendOutputLine(`  Usage: ${command.usage}`);
                appendOutputLine(`  Description: ${command.description}`);
                appendOutputLine('');
            }


            appendOutputLine('PATH TOKENS');
            appendOutputLine('');
            appendOutputLine('.');
            appendOutputLine('  Means "current directory".');
            appendOutputLine('  Example: list .');
            appendOutputLine('');
            appendOutputLine('..');
            appendOutputLine('  Means "parent directory" (one level up).');
            appendOutputLine('  Example: move ..');
        }
    },
    list: {
        name: 'list',
        usage: 'list [folder|path]',
        description: 'Lists folders and files in the current or target directory.',
        execute: (args) => {
            const targetPath = args.join(' ');
            printResult(getDirectoryEntries(targetPath));
        }
    },
    move: {
        name: 'move',
        usage: 'move [folder|path]',
        description: 'Moves to a folder using relative or absolute paths.',
        execute: (args) => {
            const targetPath = args.join(' ');
            printResult(changeDirectory(targetPath));
        }

    },
    open: {
        name: 'open',
        usage: 'open [file|path]',
        description: 'Opens and displays a file using a relative or absolute path.',
        execute: (args) => {
            const filePath = args.join(' ');
            printResult(openFile(filePath));
        }

    },
    search: {
        name: 'search',
        usage: 'search [term]',
        description: 'Searches the archive for a discovered keyword.',
        execute: (args) => {
            const searchText = args.join(' ');
            printResult(searchTerm(searchText));
        }
    },
    msg: {
        name: 'msg',
        usage: 'msg',
        description: 'Opens the inter-Facility communication interface.',
        execute: () => {
            showMessageContactDirectory();
        }
    },
    cam: {
        name: 'cam',
        usage: 'cam',
        description: 'Access facility surveillance feeds.',
        execute: () => {
            printResult(openCameraInterface());
        }
    },
    terms: {
        name: 'terms',
        usage: 'terms',
        description: 'Lists all archived keywords discovered so far.',
        execute: () => {
            const terms = getDiscoveredTerms();

            if (terms.length === 0) {
                appendOutputLine('No archived keywords.');
                return;
            }

            appendOutputLine('ARCHIVED KEYWORDS');
            appendOutputLine('');

            for (const term of terms) {
                const searched = typeof hasSearchedTerm === 'function' && hasSearchedTerm(term);
                appendOutputLine(
                    `- ${formatTermForOutput(term)}`,
                    searched ? 'terminal-line-term-searched' : 'terminal-line-term-unsearched'
                );
            }

            appendOutputLine('');
            appendOutputLine('[SYSTEM] Highlight legend: searched terms are tinted differently.');
        }
    },
    clear: {
        name: 'clear',
        usage: 'clear',
        description: 'Clears the terminal screen.',
        execute: () => {
            terminalOutput.textContent = '';
        }
    }
};

// Update the prompt display to reflect the current directory path.
function updatePromptDisplay() {
    promptSymbol.textContent = `FACILITY:${formatCurrentPath()}> `;
}

// Parse and execute a user-entered command.
function runCommand(inputText) {
    const trimmedInput = inputText.trim();

    if (!trimmedInput) {
        return;
    }

    const parts = trimmedInput.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    appendOutputLine(`FACILITY:${formatCurrentPath()}> ${trimmedInput}`);

    // Hidden test command: reset progression state without listing it in help.
    if (command === 'reset') {
        if (typeof resetGameState === 'function') {
            resetGameState();
            announcedTerms.clear();
            appendOutputLine('[TEST] Runtime state reset.');
        } else {
            appendOutputLine('Reset unavailable: state manager not loaded.');
        }

        updatePromptDisplay();
        scrollTerminalToBottom();
        return;
    }

    if (!Object.prototype.hasOwnProperty.call(COMMANDS, command)) {
        appendOutputLine("Command not recognized. Type 'help' for a list of commands.");
        scrollTerminalToBottom();
        return;
    }

    if (!isCommandUnlocked(command)) {
        appendOutputLine(`Command unavailable: ${command}`);
        scrollTerminalToBottom();
        return;
    }

    COMMANDS[command].execute(args);


    updatePromptDisplay();
    scrollTerminalToBottom();
}

// Type one line using the terminal typewriter effect.
async function typeLine(text) {
    const lineElement = appendBootLine();

    for (const character of text) {
        lineElement.textContent += character;
        scrollTerminalToBottom();
        await wait(characterDelayMs);
    }
}

// Delay utility for animation pacing.
function wait(ms) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, ms);
    });
}

// Run startup sequence, then reveal interactive prompt.
async function runBootSequence() {
    terminalOutput.textContent = '';

    for (const line of bootLines) {
        await typeLine(line);
        await wait(lineDelayMs);
    }

    await wait(finalPauseMs);

    // Logo renders line-by-line to signal faster startup once core boot finishes.
    for (const line of facilityLogoLines) {
        appendOutputLine(line);
        await wait(logoLineDelayMs);
    }

    await wait(lineDelayMs);

    // Post-boot status lines render line-by-line for a faster, responsive handoff.
    for (const line of postBootLines) {
        appendOutputLine(line);
        await wait(postBootLineDelayMs);
    }

    await wait(finalPauseMs);

    terminalPrompt.classList.remove('terminal-prompt-hidden');
    promptInput.textContent = '';
    updatePromptDisplay();
    promptInput.focus();
}

// Clicking the prompt area places focus into editable input.
terminalPrompt.addEventListener('click', () => {
    promptInput.focus();
});

// Keep input as plain one-line command entry.
promptInput.setAttribute('contenteditable', 'true');
promptInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const commandText = promptInput.textContent.replace(/\n/g, '');
        runCommand(commandText);
        promptInput.textContent = '';
    }
});

// Begin the boot simulation when the page finishes loading.
window.addEventListener('load', () => {
    runBootSequence();
});
