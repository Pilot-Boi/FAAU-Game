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
	clear: {
		name: 'clear',
		usage: 'clear',
		description: 'Clears the terminal screen.',
		execute: () => {
			terminalOutput.textContent = '';
		}
	},
	about: {
		name: 'about',
		usage: 'about',
		description: 'Displays information about the Facility system.',
		execute: () => {
			printLines([
				'THE FACILITY TERMINAL INTERFACE v0.1',
				'ARCHIVAL ACCESS NODE FOR INTERNAL RECORDS.'
			]);
		}
	},
	dir: {
		name: 'dir',
		usage: 'dir',
		description: 'Lists available directories and files.',
		execute: () => {
			printLines([
				'/logs',
				'/research',
				'/staff',
				'/secure'
			]);
		}
	},
	login: {
		name: 'login',
		usage: 'login',
		description: 'Attempts to authenticate with the system.',
		execute: () => {
			appendOutputLine('Authorization required.');
		}
	}
};

// Parse and execute a user-entered command.
function runCommand(inputText) {
	const command = inputText.trim().toLowerCase();

	if (!command) {
		return;
	}

	appendOutputLine(`> ${command}`);

	if (!Object.prototype.hasOwnProperty.call(COMMANDS, command)) {
		appendOutputLine("Command not recognized. Type 'help' for a list of commands.");
		scrollTerminalToBottom();
		return;
	}

	COMMANDS[command].execute();

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
