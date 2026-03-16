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

    renderImageAttachment({
        src: normalized.src,
        title: normalized.title || 'FILE IMAGE ATTACHMENT',
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

    if (/^===\s*CHAPTER\s+\d+\s+COMPLETE:/i.test(normalized)) {
        return 'terminal-line-alert';
    }

    if (normalized.startsWith('[SYSTEM] Relay status update:')) {
        return 'terminal-line-alert';
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
    const legacyClassMap = {
        'terminal-system': 'terminal-line-system',
        'terminal-error': 'terminal-line-error',
        'terminal-header': 'terminal-line-heading',
        'terminal-muted': 'terminal-line-entry'
    };

    for (const className of classList) {
        if (!className) {
            continue;
        }

        const resolvedClassName = legacyClassMap[className] || className;
        if (resolvedClassName) {
            line.classList.add(resolvedClassName);
        }
    }

    const resolvedText = text == null ? '' : String(text);
    if (resolvedText === '') {
        line.textContent = '\u00A0';
        line.classList.add('is-blank');
        return line;
    }

    line.textContent = resolvedText;
    return line;
}

// Helper for printing multiple output rows.
function printLines(lines) {
    let contextMode = null;
    let fileHeaderSectionActive = false;

    for (const line of lines) {
        const normalized = String(line || '').trim();
        const extraClasses = [];

        if (contextMode === 'file' && normalized && normalized !== '--- END FILE ---') {
            extraClasses.push('terminal-line-file-content');

            // Make the file header section visually obvious: color all lines from
            // file start until the first blank line using the speaker highlight.
            if (fileHeaderSectionActive) {
                extraClasses.push('terminal-line-speaker');
            }
        }

        if (contextMode === 'search' && normalized && !normalized.startsWith('[SYSTEM]')) {
            extraClasses.push('terminal-line-search-content');
        }

        const renderedLine = appendOutputLine(line, extraClasses);

        if (
            contextMode === 'file' &&
            renderedLine &&
            renderedLine.classList &&
            !(fileHeaderSectionActive && normalized && normalized !== '--- END FILE ---')
        ) {
            renderedLine.classList.remove('terminal-line-speaker');
        }

        if (/^--- .* ---$/.test(normalized) && normalized !== '--- END FILE ---') {
            contextMode = 'file';
            fileHeaderSectionActive = true;
            continue;
        }

        if (normalized === '--- END FILE ---') {
            contextMode = null;
            fileHeaderSectionActive = false;
            continue;
        }

        if (contextMode === 'file' && normalized === '') {
            fileHeaderSectionActive = false;
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
function getContactDisplayLabel(contactId, definition, discoveredTerms, termMetadata, fallbackLabel) {
    if (!definition || !Array.isArray(definition.revealedNames)) {
        return fallbackLabel;
    }

    const firstReveal = definition.revealedNames[0];

    if (definition.revealOnFileRead) {
        return hasReadFile(definition.revealOnFileRead)
            ? ((firstReveal && firstReveal.label) || fallbackLabel)
            : fallbackLabel;
    }

    if (definition.revealOnFlag) {
        return hasFlag(definition.revealOnFlag)
            ? ((firstReveal && firstReveal.label) || fallbackLabel)
            : fallbackLabel;
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

function getMessageUnredactionRules() {
    if (typeof MESSAGE_UNREDACTION_RULES === 'undefined' || !Array.isArray(MESSAGE_UNREDACTION_RULES)) {
        return [];
    }

    return MESSAGE_UNREDACTION_RULES;
}

function applyMessageUnredactionText(value) {
    const source = typeof value === 'string' ? value : String(value || '');

    if (!hasFlag('secure_access_granted')) {
        return source;
    }

    let next = source;
    const rules = getMessageUnredactionRules();

    for (const rule of rules) {
        if (!rule || typeof rule.redacted !== 'string' || typeof rule.revealed !== 'string') {
            continue;
        }

        if (!rule.redacted) {
            continue;
        }

        next = next.split(rule.redacted).join(rule.revealed);
    }

    return next;
}

function applyMessageUnredactionSceneBlocks(sceneBlocks = []) {
    if (!Array.isArray(sceneBlocks) || sceneBlocks.length === 0) {
        return [];
    }

    return sceneBlocks.map((block) => {
        if (!block || typeof block !== 'object') {
            return block;
        }

        const nextBlock = { ...block };

        if (typeof nextBlock.sender === 'string') {
            nextBlock.sender = applyMessageUnredactionText(nextBlock.sender);
        }

        if (typeof nextBlock.speaker === 'string') {
            nextBlock.speaker = applyMessageUnredactionText(nextBlock.speaker);
        }

        if (typeof nextBlock.text === 'string') {
            nextBlock.text = applyMessageUnredactionText(nextBlock.text);
        }

        if (Array.isArray(nextBlock.lines)) {
            nextBlock.lines = nextBlock.lines.map((line) => applyMessageUnredactionText(line));
        }

        return nextBlock;
    });
}

function applyMessageUnredactionConversationItems(conversationItems = []) {
    if (!Array.isArray(conversationItems) || conversationItems.length === 0) {
        return [];
    }

    return conversationItems.map((item) => {
        if (!item || typeof item !== 'object') {
            return item;
        }

        return {
            ...item,
            sender: applyMessageUnredactionText(item.sender),
            lines: Array.isArray(item.lines)
                ? item.lines.map((line) => applyMessageUnredactionText(line))
                : []
        };
    });
}

function getReplyEntriesForContact(chapter, contactId) {
    if (!chapter || !Array.isArray(chapter.entries)) {
        return [];
    }

    if (typeof getContactSpeakerAliases !== 'function' || typeof getEntrySpeaker !== 'function') {
        return [];
    }

    const speakerAliases = new Set(getContactSpeakerAliases(contactId));
    if (speakerAliases.size === 0) {
        return [];
    }

    return chapter.entries.filter((entry) => {
        if (!entry || entry.type !== 'reply') {
            return false;
        }

        const entrySpeaker = getEntrySpeaker(entry);
        return speakerAliases.has(entrySpeaker);
    });
}

function contactHasUnlockedDialogueInChapter(chapter, contactId) {
    const entries = getReplyEntriesForContact(chapter, contactId);

    return entries.some((entry) => !entry.requireEvent || hasTriggeredEvent(entry.requireEvent));
}

// Build the visible message-contact list from discovered person terms.
function getDiscoveredMessageContacts() {
    const discoveredTerms = new Set((getDiscoveredTerms() || []).map(normalizeTermKey));
    const termMetadata = typeof TERM_METADATA !== 'undefined' ? TERM_METADATA : {};
    const contactMetadata = typeof CONTACT_METADATA !== 'undefined' ? CONTACT_METADATA : {};
    const availabilityByChapter =
        typeof CONTACT_AVAILABILITY_BY_CHAPTER !== 'undefined' ? CONTACT_AVAILABILITY_BY_CHAPTER : {};
    const currentChapterIndex = getCurrentChapterIndex();
    const availableContacts = new Set();

    for (const [chapterIndex, chapterValue] of Object.entries(availabilityByChapter)) {
        const parsedChapterIndex = Number(chapterIndex);
        if (Number.isNaN(parsedChapterIndex) || parsedChapterIndex > currentChapterIndex) {
            continue;
        }

        const chapterEntry = Array.isArray(chapterValue)
            ? { contacts: chapterValue }
            : chapterValue;

        if (chapterEntry.requireFlag && !hasFlag(chapterEntry.requireFlag)) {
            continue;
        }

        for (const contactId of chapterEntry.contacts || []) {
            availableContacts.add(contactId);
        }
    }

    const unlockedContacts = new Set();
    for (const [contactId, definition] of Object.entries(contactMetadata)) {
        if (!availableContacts.has(contactId)) {
            continue;
        }

        if (definition.dialogueUnlockEvent && !hasTriggeredEvent(definition.dialogueUnlockEvent)) {
            continue;
        }

        unlockedContacts.add(contactId);
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
            const displayLabel = getContactDisplayLabel(contactId, definition, discoveredTerms, termMetadata, defaultLabel);
            const contactIsUnlockedByDirectoryRules = unlockedContacts.has(contactId);
            const hasPastSceneHistory = typeof getContactMessageSceneHistory === 'function'
                && getContactMessageSceneHistory(contactId).length > 0;
            const hasUnlockedDialogue = Boolean(
                contactIsUnlockedByDirectoryRules &&
                (
                    hasPastSceneHistory ||
                    (currentChapter && contactHasUnlockedDialogueInChapter(currentChapter, contactId))
                )
            );
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

    if (result.meta && Array.isArray(result.meta.sceneBlocks) && typeof renderMessageScene === 'function') {
        renderMessageScene(result.meta.sceneBlocks);
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

    const sceneHistory = typeof getContactMessageSceneHistory === 'function'
        ? getContactMessageSceneHistory(contactId)
        : [];
    if (!contactHasUnreadDialogue(contactId)) {
        if (typeof renderMessageScene === 'function' && sceneHistory.length > 0) {
            renderMessageScene(applyMessageUnredactionSceneBlocks(sceneHistory));
            return;
        }

        if (typeof renderMessageLines === 'function') {
            renderMessageLines([
                'No unread transmissions for this contact.',
                'Relay remains unstable.'
            ]);
        }
        return;
    }

    const result = openMessageInterface(contactId);

    if (!result) {
        if (typeof renderMessageLines === 'function') {
            renderMessageLines(['Unknown error.']);
        }
        return;
    }

    if (result.meta && Array.isArray(result.meta.sceneBlocks) && typeof renderMessageScene === 'function') {
        if (typeof appendContactMessageSceneHistory === 'function') {
            appendContactMessageSceneHistory(contactId, result.meta.sceneBlocks);
        }

        const updatedSceneHistory = typeof getContactMessageSceneHistory === 'function'
            ? getContactMessageSceneHistory(contactId)
            : result.meta.sceneBlocks;

        renderMessageScene(applyMessageUnredactionSceneBlocks(updatedSceneHistory));
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

function getAvailableCameraFeeds() {
    const feedMetadata = typeof CAMERA_METADATA !== 'undefined' ? CAMERA_METADATA : {};
    const availabilityByChapter =
        typeof CAMERA_AVAILABILITY_BY_CHAPTER !== 'undefined' ? CAMERA_AVAILABILITY_BY_CHAPTER : {};
    const currentChapterIndex = getCurrentChapterIndex();
    const currentChapter = typeof getChapterByIndex === 'function'
        ? getChapterByIndex(currentChapterIndex)
        : null;
    const unlockedFeedIds = new Set();

    for (const [chapterIndex, feedIds] of Object.entries(availabilityByChapter)) {
        const parsedChapterIndex = Number(chapterIndex);
        if (Number.isNaN(parsedChapterIndex) || parsedChapterIndex > currentChapterIndex) {
            continue;
        }

        const chapterEntry = Array.isArray(feedIds)
            ? { feeds: feedIds }
            : feedIds;

        if (chapterEntry.requireFlag && !hasFlag(chapterEntry.requireFlag)) {
            continue;
        }

        for (const feedId of chapterEntry.feeds || []) {
            unlockedFeedIds.add(feedId);
        }
    }

    const feedEntries = Object.entries(feedMetadata).map(([feedId, definition]) => {
        const hasChapterAvailability = Object.keys(availabilityByChapter).length > 0;
        const isSelectable = hasChapterAvailability ? unlockedFeedIds.has(feedId) : true;
        const hasUnreadChapterScene = Boolean(
            currentChapter &&
            typeof findNextCameraSceneEntryForFeed === 'function' &&
            findNextCameraSceneEntryForFeed(currentChapter, feedId)
        );

        const hasUnlockedChapterScene = Boolean(
            currentChapter &&
            Array.isArray(currentChapter.entries) &&
            currentChapter.entries.some((entry) =>
                entry &&
                entry.interface === 'cams' &&
                entry.type === 'scene' &&
                entry.feedId === feedId &&
                (!entry.requireEvent || hasTriggeredEvent(entry.requireEvent))
            )
        );

        let status = 'OFFLINE';
        if (hasUnreadChapterScene) {
            status = '● LIVE';
        } else if (hasUnlockedChapterScene) {
            status = 'STANDBY';
        } else if (!currentChapter) {
            status = String(definition.status || '● LIVE').toUpperCase() === 'LIVE'
                ? '● LIVE'
                : (definition.status || '● LIVE');
        }

        const fallbackLabel = String(feedId).replace(/_/g, ' ').toUpperCase();

        const normalizedStatus = String(status).replace(/^\u25CF\s*/, '').toUpperCase();

        let statusClass = 'is-live';
        if (normalizedStatus === 'OFFLINE') {
            statusClass = 'is-offline';
        } else if (normalizedStatus === 'STANDBY') {
            statusClass = 'is-standby';
        }

        if (!isSelectable) {
            statusClass = 'is-restricted';
        }

        const description = typeof definition.description === 'string'
            ? definition.description
            : 'No archived camera description available.';

        const sceneBlocks = Array.isArray(definition.sceneBlocks) && definition.sceneBlocks.length > 0
            ? definition.sceneBlocks
            : [
                {
                    type: 'camera_header',
                    camera: definition.label || fallbackLabel,
                    timestamp: '● LIVE'
                },
                {
                    type: 'camera_narration',
                    lines: [description]
                }
            ];

        return {
            id: definition.feedKey || feedId,
            label: definition.label || fallbackLabel,
            title: definition.title || 'SURVEILLANCE FEED',
            camera: definition.label || fallbackLabel,
            status,
            recording: definition.recording || 'ENABLED',
            sceneBlocks,
            isSelectable,
            availabilityLabel: isSelectable ? status : 'OFFLINE',
            statusClass
        };
    });

    if (feedEntries.length === 0) {
        return [];
    }

    const hasSelectableFeed = feedEntries.some((feed) => feed.isSelectable);
    if (hasSelectableFeed) {
        return feedEntries;
    }

    // Fallback so first camera unlock always shows indexed options even if chapter progression lags.
    return feedEntries.map((feed) => {
        const normalizedStatus = String(feed.status || '').replace(/^\u25CF\s*/, '').toUpperCase();
        let fallbackStatusClass = 'is-live';
        if (normalizedStatus === 'OFFLINE') {
            fallbackStatusClass = 'is-offline';
        } else if (normalizedStatus === 'STANDBY') {
            fallbackStatusClass = 'is-standby';
        }

        return {
            ...feed,
            isSelectable: true,
            availabilityLabel: feed.status || '● LIVE',
            statusClass: fallbackStatusClass
        };
    });
}

function formatCameraStatusText(feed) {
    if (!feed) {
        return 'STANDBY';
    }

    return `CAMERA: ${feed.camera} | STATUS: ${feed.status} | RECORDING: ${feed.recording}`;
}

function showCameraFeedDirectory() {
    const feeds = getAvailableCameraFeeds();

    if (typeof openCameraWindow !== 'function') {
        appendOutputLine('[SYSTEM] Surveillance interface unavailable.');
        return;
    }

    openCameraWindow({
        title: 'CAMERA DIRECTORY',
        status: 'CAMERA DIRECTORY'
    });

    if (typeof setCameraBackAction === 'function') {
        setCameraBackAction(null);
    }

    if (feeds.length === 0) {
        if (typeof renderCameraLines === 'function') {
            renderCameraLines([
                'No surveillance feeds indexed.',
                'Archive relay remains unavailable.'
            ]);
        }
        return;
    }

    if (typeof renderCameraDirectory === 'function') {
        renderCameraDirectory(feeds, openCameraFeed);
        return;
    }

    if (typeof renderCameraLines === 'function') {
        const fallbackLines = ['CAMERA DIRECTORY', ''];

        for (const feed of feeds) {
            fallbackLines.push(`${feed.label} [${feed.availabilityLabel}]`);
        }

        renderCameraLines(fallbackLines);
    }
}

function openCameraFeed(feedId) {
    const feed = getAvailableCameraFeeds().find((entry) => entry.id === feedId);

    if (!feed) {
        if (typeof setCameraStatus === 'function') {
            setCameraStatus('CAMERA DIRECTORY');
        }

        if (typeof renderCameraLines === 'function') {
            renderCameraLines(['Selected camera feed could not be resolved.']);
        }
        return;
    }

    if (typeof openCameraWindow === 'function') {
        openCameraWindow({
            title: feed.title,
            status: formatCameraStatusText(feed)
        });
    }

    if (typeof setCameraBackAction === 'function') {
        setCameraBackAction(showCameraFeedDirectory, 'DIRECTORY');
    }

    if (!feed.isSelectable) {
        if (typeof setCameraStatus === 'function') {
            setCameraStatus(`CAMERA: ${feed.camera} | STATUS: OFFLINE | RECORDING: LOCKED`);
        }

        if (typeof renderCameraLines === 'function') {
            renderCameraLines([
                'Feed access restricted.',
                'Additional containment records are required to restore this archive node.'
            ]);
        }
        return;
    }

    const chapterSceneResult = typeof openCameraSceneInterface === 'function'
        ? openCameraSceneInterface(feed.id)
        : null;

    if (chapterSceneResult && chapterSceneResult.meta && Array.isArray(chapterSceneResult.meta.sceneBlocks)) {
        if (typeof setCameraWindowTitle === 'function' && chapterSceneResult.meta.title) {
            setCameraWindowTitle(chapterSceneResult.meta.title);
        }

        if (typeof renderCameraScene === 'function') {
            renderCameraScene(chapterSceneResult.meta.sceneBlocks);
        }

        handleResultMeta(chapterSceneResult.meta);
        const eventLines = evaluateEvents(chapterSceneResult.meta);
        if (eventLines.length > 0) {
            printLines(eventLines);
        }

        return;
    }

    if (typeof renderCameraScene === 'function') {
        renderCameraScene(feed.sceneBlocks);
        return;
    }

    if (typeof renderCameraLines === 'function') {
        renderCameraLines([
            'Camera scene renderer unavailable.',
            'Unable to display archived feed.'
        ]);
    }
}

function openCameraInterface() {
    if (!hasFlag('camera_directory_initialized')) {
        setFlag('camera_directory_initialized');
        appendOutputLine('[SYSTEM] Surveillance feed index loaded.');
    }

    showCameraFeedDirectory();
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

                if (command.name === 'dev') {
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
        execute: async (args) => {
            const filePath = args.join(' ');
            printResult(await openFile(filePath));
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
    cams: {
        name: 'cams',
        usage: 'cams',
        description: 'Access facility surveillance feeds.',
        execute: () => {
            openCameraInterface();
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
    flags: {
        name: 'flags',
        usage: 'flags',
        description: 'Lists currently active progression flags.',
        execute: () => {
            const state = getGameState();
            const activeFlags = Object.entries(state.flags)
                .filter(([, enabled]) => Boolean(enabled))
                .map(([flagName]) => flagName)
                .sort();

            appendOutputLine('ACTIVE FLAGS');
            appendOutputLine('');

            if (activeFlags.length === 0) {
                appendOutputLine('(none)');
                return;
            }

            for (const flagName of activeFlags) {
                appendOutputLine(`- ${flagName}`);
            }
        }
    },
    dev: {
        name: 'dev',
        usage: 'dev [subcommand]',
        description: 'Runs development and debugging shortcuts.',
        execute: async (args) => {
            await handleDevCommand(args);
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

async function handleDevCommand(args) {
    if (!args || args.length === 0) {
        appendOutputLine(
            '[DEV] Usage: dev unlock term|flag|command ..., dev msg, dev cams, dev set chapter N, dev read file /path, dev search term, dev state, dev reset, dev secure',
            'terminal-system'
        );
        return;
    }

    const subcommand = (args[0] || '').toLowerCase();

    if (subcommand === 'msg') {
        appendOutputLine('[DEV] Opening messaging interface.', 'terminal-system');
        showMessageContactDirectory();
        return;
    }

    if (subcommand === 'cams') {
        appendOutputLine('[DEV] Opening surveillance interface.', 'terminal-system');
        openCameraInterface();
        return;
    }

    if (subcommand === 'unlock') {
        const unlockType = (args[1] || '').toLowerCase();
        const value = args.slice(2).join(' ').trim();

        if (!unlockType || !value) {
            appendOutputLine('[DEV] Usage: dev unlock term|flag|command [value]', 'terminal-error');
            return;
        }

        if (unlockType === 'term') {
            addDiscoveredTerms([value]);
            appendOutputLine(`[DEV] Term unlocked: ${formatTermForOutput(value)}`, 'terminal-system');

            const eventLines = evaluateEvents({
                action: 'dev_unlock_term',
                term: value
            });

            if (eventLines.length > 0) {
                printLines(eventLines);
            }
            return;
        }

        if (unlockType === 'flag') {
            setFlag(value);
            appendOutputLine(`[DEV] Flag set: ${value}`, 'terminal-system');

            const eventLines = evaluateEvents({
                action: 'dev_unlock_flag',
                flag: value
            });

            if (eventLines.length > 0) {
                printLines(eventLines);
            }
            return;
        }

        if (unlockType === 'command') {
            unlockCommand(value);
            appendOutputLine(`[DEV] Command unlocked: ${value}`, 'terminal-system');
            return;
        }

        appendOutputLine(`[DEV] Unknown unlock type: ${unlockType}`, 'terminal-error');
        return;
    }

    if (subcommand === 'lock') {
        const lockType = (args[1] || '').toLowerCase();
        const value = args.slice(2).join(' ').trim();

        if (!lockType || !value) {
            appendOutputLine('[DEV] Usage: dev lock term|flag|command [value]', 'terminal-error');
            return;
        }

        if (lockType === 'term') {
            if (typeof removeDiscoveredTerm === 'function') {
                removeDiscoveredTerm(value);
            }
            appendOutputLine(`[DEV] Term removed: ${formatTermForOutput(value)}`, 'terminal-system');
            return;
        }

        if (lockType === 'flag') {
            if (typeof clearFlag === 'function') {
                clearFlag(value);
            }
            appendOutputLine(`[DEV] Flag cleared: ${value}`, 'terminal-system');
            return;
        }

        if (lockType === 'command') {
            const protectedCommands = new Set(['help', 'dev']);
            const normalizedCommandName = value.toLowerCase();

            if (protectedCommands.has(normalizedCommandName)) {
                appendOutputLine(`[DEV] Refusing to lock command: ${normalizedCommandName}`, 'terminal-error');
                return;
            }

            if (typeof lockCommand === 'function') {
                lockCommand(value);
            }
            appendOutputLine(`[DEV] Command locked: ${value}`, 'terminal-system');
            return;
        }

        appendOutputLine(`[DEV] Unknown lock type: ${lockType}`, 'terminal-error');
        return;
    }

    if (subcommand === 'set') {
        const setType = (args[1] || '').toLowerCase();
        const value = args[2];

        if (setType === 'chapter') {
            const chapterIndex = Number(value);

            if (!Number.isInteger(chapterIndex) || chapterIndex < 0) {
                appendOutputLine('[DEV] Chapter index must be a non-negative integer.', 'terminal-error');
                return;
            }

            setCurrentChapterIndex(chapterIndex);
            appendOutputLine(`[DEV] Current chapter index set to ${chapterIndex}`, 'terminal-system');
            return;
        }

        appendOutputLine(`[DEV] Unknown set type: ${setType}`, 'terminal-error');
        return;
    }

    if (subcommand === 'read') {
        const readType = (args[1] || '').toLowerCase();
        const value = args.slice(2).join(' ').trim();

        if (readType !== 'file' || !value) {
            appendOutputLine('[DEV] Usage: dev read file /path/to/file.txt', 'terminal-error');
            return;
        }

        const result = await openFile(value);

        if (result.error) {
            appendOutputLine(`[DEV] ${result.error}`, 'terminal-error');
            return;
        }

        appendOutputLine(`[DEV] Reading file: ${value}`, 'terminal-system');
        printResult(result);
        return;
    }

    if (subcommand === 'search') {
        const term = args.slice(1).join(' ').trim();

        if (!term) {
            appendOutputLine('[DEV] Usage: dev search [term]', 'terminal-error');
            return;
        }

        addDiscoveredTerms([term]);
        appendOutputLine(`[DEV] Forced search availability for: ${formatTermForOutput(term)}`, 'terminal-system');
        printResult(searchTerm(term));
        return;
    }

    if (subcommand === 'move') {
        const path = args.slice(1).join(' ').trim();

        if (!path) {
            appendOutputLine('[DEV] Usage: dev move /path/to/directory', 'terminal-error');
            return;
        }

        const result = changeDirectory(path);

        if (result.error) {
            appendOutputLine(`[DEV] ${result.error}`, 'terminal-error');
            return;
        }

        appendOutputLine(`[DEV] Moved to: ${path}`, 'terminal-system');
        printResult(result);
        return;
    }

    if (subcommand === 'secure') {
        setFlag('secure_access_granted');
        appendOutputLine('[DEV] Secure archive unlocked.', 'terminal-system');
        return;
    }

    if (subcommand === 'chapter') {
        const value = args[1];
        const chapterIndex = Number(value);

        if (!Number.isInteger(chapterIndex) || chapterIndex < 0) {
            appendOutputLine('[DEV] Usage: dev chapter [index]', 'terminal-error');
            return;
        }

        setCurrentChapterIndex(chapterIndex);
        appendOutputLine(`[DEV] Current chapter index set to ${chapterIndex}`, 'terminal-system');
        return;
    }

    if (subcommand === 'event') {
        const eventName = args.slice(1).join(' ').trim();

        if (!eventName) {
            appendOutputLine('[DEV] Usage: dev event [event_name]', 'terminal-error');
            return;
        }

        triggerEvent(eventName);
        appendOutputLine(`[DEV] Event marked triggered: ${eventName}`, 'terminal-system');
        return;
    }

    if (subcommand === 'unevent') {
        const eventName = args.slice(1).join(' ').trim();

        if (!eventName) {
            appendOutputLine('[DEV] Usage: dev unevent [event_name]', 'terminal-error');
            return;
        }

        if (typeof clearTriggeredEvent === 'function') {
            clearTriggeredEvent(eventName);
        }
        appendOutputLine(`[DEV] Event cleared: ${eventName}`, 'terminal-system');
        return;
    }

    if (subcommand === 'state') {
        const state = getGameState();

        appendOutputLine('[DEV] CURRENT STATE', 'terminal-header');
        appendOutputLine(`Path: ${formatCurrentPath()}`, 'terminal-muted');
        appendOutputLine(`Flags (${Object.keys(state.flags).length}): ${Object.keys(state.flags).join(', ') || '(none)'}`, 'terminal-muted');
        appendOutputLine(`Terms (${state.discoveredTerms.size}): ${Array.from(state.discoveredTerms).join(', ') || '(none)'}`, 'terminal-muted');
        appendOutputLine(`Files Read (${state.filesRead.size}): ${Array.from(state.filesRead).join(', ') || '(none)'}`, 'terminal-muted');
        appendOutputLine(`Commands: ${Array.from(state.unlockedCommands).join(', ') || '(none)'}`, 'terminal-muted');
        appendOutputLine(`Triggered Events: ${Array.from(state.triggeredEvents).join(', ') || '(none)'}`, 'terminal-muted');
        appendOutputLine(`Current Chapter Index: ${state.storyState.currentChapter}`, 'terminal-muted');
        appendOutputLine(`Played Chapters: ${Array.from(state.storyState.chapterPlayed).join(', ') || '(none)'}`, 'terminal-muted');
        return;
    }

    if (subcommand === 'flags') {
        const state = getGameState();
        const flags = Object.keys(state.flags);

        appendOutputLine('[DEV] FLAGS', 'terminal-header');
        if (flags.length === 0) {
            appendOutputLine('(none)', 'terminal-muted');
            return;
        }

        for (const flag of flags) {
            appendOutputLine(`- ${flag}`, 'terminal-muted');
        }
        return;
    }

    if (subcommand === 'terms') {
        const state = getGameState();
        const terms = Array.from(state.discoveredTerms).sort();

        appendOutputLine('[DEV] TERMS', 'terminal-header');
        if (terms.length === 0) {
            appendOutputLine('(none)', 'terminal-muted');
            return;
        }

        for (const term of terms) {
            appendOutputLine(`- ${term}`, 'terminal-muted');
        }
        return;
    }

    if (subcommand === 'commands') {
        const state = getGameState();
        const commands = Array.from(state.unlockedCommands).sort();

        appendOutputLine('[DEV] COMMANDS', 'terminal-header');
        if (commands.length === 0) {
            appendOutputLine('(none)', 'terminal-muted');
            return;
        }

        for (const commandName of commands) {
            appendOutputLine(`- ${commandName}`, 'terminal-muted');
        }
        return;
    }

    if (subcommand === 'reset') {
        if (typeof resetGameState === 'function') {
            resetGameState();
            announcedTerms.clear();
            currentPathSegments.length = 0;
            appendOutputLine('[DEV] Runtime state reset.', 'terminal-system');
        } else {
            appendOutputLine('[DEV] Reset unavailable: state manager not loaded.', 'terminal-error');
        }
        return;
    }

    if (subcommand === 'help') {
        appendOutputLine('[DEV] AVAILABLE DEV COMMANDS', 'terminal-header');
        appendOutputLine('dev unlock term [term]', 'terminal-muted');
        appendOutputLine('dev unlock flag [flag]', 'terminal-muted');
        appendOutputLine('dev unlock command [command]', 'terminal-muted');
        appendOutputLine('dev msg', 'terminal-muted');
        appendOutputLine('dev cams', 'terminal-muted');
        appendOutputLine('dev lock term [term]', 'terminal-muted');
        appendOutputLine('dev lock flag [flag]', 'terminal-muted');
        appendOutputLine('dev lock command [command]', 'terminal-muted');
        appendOutputLine('dev read file /path/to/file.txt', 'terminal-muted');
        appendOutputLine('dev search [term]', 'terminal-muted');
        appendOutputLine('dev move /path/to/folder', 'terminal-muted');
        appendOutputLine('dev set chapter [index]', 'terminal-muted');
        appendOutputLine('dev chapter [index]', 'terminal-muted');
        appendOutputLine('dev event [event_name]', 'terminal-muted');
        appendOutputLine('dev unevent [event_name]', 'terminal-muted');
        appendOutputLine('dev secure', 'terminal-muted');
        appendOutputLine('dev state', 'terminal-muted');
        appendOutputLine('dev flags', 'terminal-muted');
        appendOutputLine('dev terms', 'terminal-muted');
        appendOutputLine('dev commands', 'terminal-muted');
        appendOutputLine('dev reset', 'terminal-muted');
        return;
    }

    appendOutputLine(`[DEV] Unknown subcommand: ${subcommand}`, 'terminal-error');
}


// Parse and execute a user-entered command.
async function runCommand(inputText) {
    const trimmedInput = inputText.trim();

    if (!trimmedInput) {
        return;
    }

    const parts = trimmedInput.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    appendOutputLine(`FACILITY:${formatCurrentPath()}> ${trimmedInput}`);

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

    try {
        await Promise.resolve(COMMANDS[command].execute(args));
    } catch (_error) {
        appendOutputLine('Unknown error.');
    }


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
        void runCommand(commandText);
        promptInput.textContent = '';
    }
});

// Begin the boot simulation when the page finishes loading.
window.addEventListener('load', () => {
    runBootSequence();
});
