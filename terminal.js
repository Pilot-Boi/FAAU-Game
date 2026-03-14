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

// Core DOM references.
const terminalOutput = document.getElementById('terminal-output');
const terminalPrompt = document.getElementById('terminal-prompt');
const promptInput = document.querySelector('.prompt-input');

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

    if (meta.action === 'open' && meta.onOpenFlag === 'read_network_status') {
        appendOutputLine('');
        appendOutputLine('[SYSTEM] New keyword archived: SUBJECT_008');
        appendOutputLine('[SYSTEM] New keyword archived: UNKNOWN_SOURCE');
        appendOutputLine('[SYSTEM] New keyword archived: INTERCOM');
    }

    if (meta.action === 'open' && meta.onOpenFlag === 'read_security_log') {
        appendOutputLine('[SYSTEM] New keyword archived: SUBLEVEL_3');
        appendOutputLine('[SYSTEM] New keyword archived: SECURITY');
    }

    if (meta.action === 'open' && meta.onOpenFlag === 'read_staff_directory') {
        appendOutputLine('[SYSTEM] New keyword archived: WATTS');
        appendOutputLine('[SYSTEM] New keyword archived: POLENDINA');
        appendOutputLine('[SYSTEM] New keyword archived: DIRECTOR');
    }

    if (meta.action === 'open' && meta.onOpenFlag === 'read_project_index') {
        appendOutputLine('[SYSTEM] New keyword archived: ACHILLES');
        appendOutputLine('[SYSTEM] New keyword archived: HYDRA');
        appendOutputLine('[SYSTEM] New keyword archived: ATLAS');
        appendOutputLine('[SYSTEM] New keyword archived: SERAPH');
        appendOutputLine('[SYSTEM] New keyword archived: ORACLE');
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
        }
    },
    dir: {
        name: 'dir',
        usage: 'dir',
        description: 'Lists folders and files in the current directory.',
        execute: () => {
            printResult(getDirectoryEntries());
        }
    },
    ls: {
        name: 'ls',
        usage: 'ls',
        description: 'Lists folders and files in the current directory.',
        execute: () => {
            printResult(getDirectoryEntries());
        }
    },
    cd: {
        name: 'cd',
        usage: 'cd [folder] | cd ..',
        description: 'Moves into a folder or up one level.',
        execute: (args) => {
            printResult(changeDirectory(args[0]));
        }
    },
    pwd: {
        name: 'pwd',
        usage: 'pwd',
        description: 'Displays the current path.',
        execute: () => {
            appendOutputLine(formatCurrentPath());
        }
    },
    open: {
        name: 'open',
        usage: 'open [file]',
        description: 'Opens and displays a file from the current directory.',
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

    for (const line of facilityLogoLines) {
        await typeLine(line);
    }

    await wait(lineDelayMs);

    for (const line of postBootLines) {
        await typeLine(line);
        await wait(lineDelayMs);
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
