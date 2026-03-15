// Story entry renderer — routes narrative entries to the correct interface window.
//
// Routing rules:
//   entry.interface === 'msg'  → message window only
//   entry.interface === 'cam'  → camera window only
//   entry.interface === 'both' → camera window + message window simultaneously
//
// Usage:
//   renderStoryEntry(entry)         — render one entry, appending to the current session
//   renderStoryEntries(entries)     — fresh session: clear buffers, render all in order
//   beginStorySession()             — manually reset buffers without rendering

// ---- Session buffers ----
// Accumulate content across multiple renderStoryEntry calls so that the windows
// show a growing conversation/scene rather than replacing on every call.

let _storyMsgBuffer = [];   // array of { side, sender, lines } for renderMessageConversation
let _storyCamBuffer = [];   // array of line strings for renderCameraLines
let _storyCamFeed = null;   // current feed label shown in the camera window title

function beginStorySession() {
    _storyMsgBuffer = [];
    _storyCamBuffer = [];
    _storyCamFeed = null;
}

// ---- Normalization ----

function normalizeStoryEntry(entry) {
    if (!entry || typeof entry !== 'object') {
        return null;
    }

    return {
        interface: String(entry.interface || '').toLowerCase(),
        type: String(entry.type || '').toLowerCase(),
        sender: String(entry.sender || ''),
        speaker: String(entry.speaker || ''),
        feed: String(entry.feed || ''),
        lines: Array.isArray(entry.lines) ? entry.lines : [],
        msgLines: Array.isArray(entry.msgLines) ? entry.msgLines : [],
        camLines: Array.isArray(entry.camLines) ? entry.camLines : [],
        discoverTerms: Array.isArray(entry.discoverTerms) ? entry.discoverTerms : [],
        setFlags: Array.isArray(entry.setFlags) ? entry.setFlags : [],
        unlockCommands: Array.isArray(entry.unlockCommands) ? entry.unlockCommands : []
    };
}

// ---- Effect application ----

function applyStoryEntryEffects(norm) {
    const unlockedTerms = [];

    if (norm.discoverTerms.length > 0 && typeof addDiscoveredTerms === 'function') {
        addDiscoveredTerms(norm.discoverTerms);
        for (const term of norm.discoverTerms) {
            unlockedTerms.push(term);
        }
    }

    for (const flag of norm.setFlags) {
        if (typeof setFlag === 'function') {
            setFlag(flag);
        }
    }

    for (const command of norm.unlockCommands) {
        if (typeof unlockCommand === 'function') {
            unlockCommand(command);
        }
    }

    return unlockedTerms;
}

// ---- Window flush helpers ----

// Open the message window if not already visible, without clearing its content.
function _ensureMsgWindowOpen() {
    const win = document.getElementById('message-window');
    if (!win || !win.classList.contains('message-window-hidden')) {
        return;
    }

    if (typeof openMessageWindow === 'function') {
        openMessageWindow();
    }
}

// Open the camera window if not already visible, without clearing its content.
function _ensureCamWindowOpen() {
    const win = document.getElementById('camera-window');
    if (!win || !win.classList.contains('camera-window-hidden')) {
        return;
    }

    if (typeof openCameraWindow === 'function') {
        openCameraWindow();
    }
}

// Sync the message window with the current buffer contents, only animating
// entries added after animateFromIndex (so existing items don't re-animate).
function _flushMsgBuffer(statusText, animateFromIndex) {
    _ensureMsgWindowOpen();

    if (typeof setMessageStatus === 'function') {
        setMessageStatus(statusText || 'CHANNEL ACTIVE');
    }

    if (_storyMsgBuffer.length > 0 && typeof renderMessageConversation === 'function') {
        renderMessageConversation(_storyMsgBuffer, {
            animateFromIndex: animateFromIndex != null ? animateFromIndex : 0
        });
    }
}

// Sync the camera window with the current buffer contents.
function _flushCamBuffer() {
    _ensureCamWindowOpen();

    if (_storyCamFeed && typeof setActiveCameraFeed === 'function') {
        setActiveCameraFeed(_storyCamFeed);
    }

    if (typeof setCameraStatus === 'function') {
        setCameraStatus(_storyCamFeed ? `FEED: ${_storyCamFeed.toUpperCase()} — ACTIVE` : 'FEED ACTIVE');
    }

    if (_storyCamBuffer.length > 0 && typeof renderCameraLines === 'function') {
        renderCameraLines(_storyCamBuffer);
    }
}

// ---- Entry renderers ----

// Render a msg-interface entry. Supports type 'message' (right/sender) and 'reply' (left/speaker).
function renderMsgEntry(entry) {
    const norm = normalizeStoryEntry(entry);

    if (!norm) {
        console.warn('[storyRenderer] renderMsgEntry: received invalid entry', entry);
        return [];
    }

    const prevLength = _storyMsgBuffer.length;

    if (norm.type === 'message') {
        _storyMsgBuffer.push({
            side: 'right',
            sender: norm.sender || 'UNKNOWN',
            lines: norm.lines
        });
    } else if (norm.type === 'reply') {
        _storyMsgBuffer.push({
            side: 'left',
            sender: norm.speaker || 'UNKNOWN',
            lines: norm.lines
        });
    } else {
        console.warn('[storyRenderer] renderMsgEntry: unknown type "' + norm.type + '"', entry);
    }

    _flushMsgBuffer('CHANNEL ACTIVE', prevLength);
    return applyStoryEntryEffects(norm);
}

// Render a cam-interface entry. Shows a feed name and prose scene lines.
function renderCamEntry(entry) {
    const norm = normalizeStoryEntry(entry);

    if (!norm) {
        console.warn('[storyRenderer] renderCamEntry: received invalid entry', entry);
        return [];
    }

    if (norm.feed) {
        _storyCamFeed = norm.feed;
    }

    for (const line of norm.lines) {
        _storyCamBuffer.push(line);
    }

    _flushCamBuffer();
    return applyStoryEntryEffects(norm);
}

// Render a both-interface entry. Camera receives camLines, message window receives msgLines.
// msgLines are rendered as plain-text lines (e.g. "Dr. Watts: ...") rather than chat bubbles,
// since dual entries are typically audio-log or intercepted-recording style content.
function renderDualEntry(entry) {
    const norm = normalizeStoryEntry(entry);

    if (!norm) {
        console.warn('[storyRenderer] renderDualEntry: received invalid entry', entry);
        return [];
    }

    // Camera side — prose scene description
    if (norm.feed) {
        _storyCamFeed = norm.feed;
    }

    for (const line of norm.camLines) {
        _storyCamBuffer.push(line);
    }

    _flushCamBuffer();

    // Message side — plain lines (e.g. intercepted audio, speaker-prefixed dialogue)
    if (norm.msgLines.length > 0) {
        _ensureMsgWindowOpen();

        if (typeof setMessageStatus === 'function') {
            setMessageStatus(norm.feed ? `RECORDING: ${norm.feed.toUpperCase()}` : 'RECORDING ACTIVE');
        }

        if (typeof renderMessageLines === 'function') {
            renderMessageLines(norm.msgLines);
        }
    }

    return applyStoryEntryEffects(norm);
}

// ---- Main dispatcher ----

// Route a single story entry to the correct window based on entry.interface.
// Appends to the current session — call beginStorySession() first to reset.
function renderStoryEntry(entry) {
    if (!entry || typeof entry !== 'object') {
        console.warn('[storyRenderer] renderStoryEntry: skipping non-object entry', entry);
        return [];
    }

    const iface = String(entry.interface || '').toLowerCase();

    if (iface === 'msg') {
        return renderMsgEntry(entry);
    }

    if (iface === 'cam') {
        return renderCamEntry(entry);
    }

    if (iface === 'both') {
        return renderDualEntry(entry);
    }

    console.warn('[storyRenderer] renderStoryEntry: unknown interface "' + iface + '" on entry', entry);
    return [];
}

// Render an ordered array of story entries, starting a fresh session.
// Returns all terms unlocked across the full sequence (useful for event evaluation).
//
// Example:
//   const unlockedTerms = renderStoryEntries(CHAPTER_02.entries);
//   evaluateEvents({ action: 'story', unlockedTerms });
function renderStoryEntries(entries) {
    if (!Array.isArray(entries)) {
        console.warn('[storyRenderer] renderStoryEntries: expected an array, got', typeof entries);
        return [];
    }

    beginStorySession();

    const allUnlockedTerms = [];

    for (const entry of entries) {
        const unlocked = renderStoryEntry(entry);
        for (const term of unlocked) {
            allUnlockedTerms.push(term);
        }
    }

    return allUnlockedTerms;
}

// ---- Example usage (for reference, not executed) ----
//
// // msg-only: a question from a viewer
// renderStoryEntry({
//     interface: 'msg',
//     type: 'message',
//     sender: 'B',
//     lines: ['Here I snuck out three cookies for Subjects 01, 02, and 03']
// });
//
// // msg-only: a reply from a character
// renderStoryEntry({
//     interface: 'msg',
//     type: 'reply',
//     speaker: 'Roman',
//     lines: ['Well monstrous is going a bit far, don\'t you think?']
// });
//
// // cam-only: a surveillance scene
// renderStoryEntry({
//     interface: 'cam',
//     feed: 'subject_hall',
//     lines: [
//         'Emerald takes the cookie and nibbles on it, murmuring a thank you.',
//         'Roman picks at his muzzle and stares longingly at the cookie.',
//         'Hazel pockets his cookie without a word and stalks away.'
//     ]
// });
//
// // both: camera footage + intercepted audio
// renderStoryEntry({
//     interface: 'both',
//     feed: 'test_recording_03',
//     camLines: [
//         'Footage shows an avian fighting for its life under observation.'
//     ],
//     msgLines: [
//         'Dr. Watts: Normal hybrids don\'t have powers.',
//         'But the avians can.'
//     ]
// });
