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

// All known file-open flags mapped to their associated archival terms.
const FLAG_TERM_MAP = {
    read_system_boot: ['unknown_source'],
    read_network_status: ['subject_008', 'unknown_source', 'intercom'],
    read_security_log: ['subject_008', 'sublevel', 'security'],
    read_anomaly_report: ['unknown_source', 'subject_008'],
    read_sublevel_monitor: ['sublevel', 'subject_008', 'security', 'unknown_source'],
    read_research_overview: ['genetics', 'bioengineering', 'director'],
    read_project_index: ['achilles', 'seraph', 'bioengineering', 'genetics'],
    read_bio_01: ['achilles', 'bioengineering', 'prosthetics', 'polendina'],
    read_bio_02: ['bioengineering', 'polendina'],
    read_bio_03: ['bioengineering', 'polendina'],
    read_gen_02: ['genetics', 'neural_interface'],
    read_staff_directory: ['watts', 'polendina', 'ebi', 'ironwood', 'schnee', 'director', 'genetics', 'bioengineering', 'security'],
    read_notice_01: ['security', 'intercom', 'unknown_source'],
    read_notice_02: ['security', 'sublevel'],
    read_security_clearance: ['security']
};

// Tracks keywords already announced to avoid repeating the same unlock message.
const announcedTerms = new Set();

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

// Append a complete output row immediately.
function appendOutputLine(text) {
    const line = appendBootLine();
    line.textContent = text;
    return line;
}

// Helper for printing multiple output rows.
function printLines(lines) {
    for (const line of lines) {
        appendOutputLine(line);
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
    }
}

// Handle special metadata returned from directory operations to trigger story events and other side effects.
function handleResultMeta(meta) {
    if (!meta) {
        return;
    }

    if (meta.action === 'open' && meta.onOpenFlag) {
        const mappedTerms = FLAG_TERM_MAP[meta.onOpenFlag] || [];
        const fallbackTerms = Array.isArray(meta.terms) ? meta.terms : [];
        const termsToAnnounce = mappedTerms.length > 0 ? mappedTerms : fallbackTerms;

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

    if (meta.action === 'search' && meta.resultCount > 0) {
        appendOutputLine('');
        appendOutputLine('[SYSTEM] Search complete.');
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
            printResult(changeDirectory(args[0]));
        }
    },
    where: {
        name: 'where',
        usage: 'where',
        description: 'Displays the current directory.',
        execute: () => {
            appendOutputLine(formatCurrentPath());
        }
    },
    open: {
        name: 'open',
        usage: 'open [file|path]',
        description: 'Opens and displays a file using a relative or absolute path.',
        execute: (args) => {
            printResult(openFile(args[0]));
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
                appendOutputLine(`- ${term}`);
            }
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

// Parse and execute a user-entered command.
function runCommand(inputText) {
    const trimmedInput = inputText.trim();

    if (!trimmedInput) {
        return;
    }

    const parts = trimmedInput.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    appendOutputLine(`> ${trimmedInput}`);

    if (!Object.prototype.hasOwnProperty.call(COMMANDS, command)) {
        appendOutputLine("Command not recognized. Type 'help' for a list of commands.");
        scrollTerminalToBottom();
        return;
    }

    COMMANDS[command].execute(args);

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
