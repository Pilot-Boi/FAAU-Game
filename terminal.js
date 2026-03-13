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

// In-memory filesystem for the narrative terminal.
const FILE_SYSTEM = {
	type: 'dir',
	children: {
		logs: {
			type: 'dir',
			children: {
				'log_01.txt': {
					type: 'file',
					content: [
						'ENTRY 01: NIGHT SHIFT BEGAN 23:40.',
						'AUDIBLE VIBRATIONS DETECTED BELOW SUBLEVEL C.',
						'NO MAINTENANCE REQUEST WAS FILED.'
					]
				},
				'system_boot.txt': {
					type: 'file',
					content: [
						'FACILITY CORE BOOT LOG ARCHIVE',
						'SECURITY HANDSHAKE: PARTIAL',
						'NOTICE: ARCHIVE INDEX REPORTS MISSING SECTORS.'
					]
				}
			}
		},
		research: {
			type: 'dir',
			children: {
				'overview.txt': {
					type: 'file',
					content: [
						'PROJECT OVERVIEW: BEHAVIORAL RESPONSE TO SIGNAL-LOCK ENVIRONMENTS.',
						'LEAD STATUS: UNCONFIRMED',
						'RECOMMENDATION: RESTRICT ACCESS TO LAB WING FILES.'
					]
				},
				'project_index.txt': {
					type: 'file',
					content: [
						'- SERA-PHASE / STATUS: REDACTED',
						'- SUBJECT TRACKING / STATUS: OFFLINE',
						'- LONG-RANGE ARRAY / STATUS: ACTIVE'
					]
				}
			}
		},
		staff: {
			type: 'dir',
			children: {
				'directory.txt': {
					type: 'file',
					content: [
						'STAFF DIRECTORY (PARTIAL)',
						'DR. I. KELLER - RESEARCH LEAD',
						'R. NOA - SECURITY OVERSIGHT',
						'VACANT - ARCHIVE CUSTODIAN'
					]
				},
				'notice.txt': {
					type: 'file',
					content: [
						'NOTICE TO ALL STAFF:',
						'DO NOT RESPOND TO INTERCOM CALLS AFTER 02:00.',
						'REPORT ALL UNAUTHORIZED VOICES TO SECURITY.'
					]
				}
			}
		},
		secure: {
			type: 'dir',
			locked: true,
			children: {
				'seraph_project.txt': {
					type: 'file',
					content: [
						'PROJECT SERA-PHASE',
						'ACCESS LEVEL OMEGA REQUIRED.',
						'DOCUMENT LOCK ACTIVE.'
					]
				},
				'subject_01.txt': {
					type: 'file',
					content: [
						'SUBJECT 01 STATUS: UNKNOWN',
						'LAST CONFIRMED LOCATION: OBSERVATION CHAMBER 4',
						'BIOMETRIC CHANNEL LOST AT 01:13.'
					]
				}
			}
		}
	}
};

// The current working path represented as folder names from root.
const currentPathSegments = [];

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

// Resolve the directory node for the current path state.
function getCurrentDirectoryObject() {
	let node = FILE_SYSTEM;

	for (const segment of currentPathSegments) {
		if (!node || !node.children || !node.children[segment]) {
			return null;
		}

		node = node.children[segment];
	}

	return node;
}

// Convert path segments into slash notation shown to the player.
function formatCurrentPath() {
	if (currentPathSegments.length === 0) {
		return '/';
	}

	return `/${currentPathSegments.join('/')}`;
}

// Print [DIR] and [FILE] items for the active folder.
function listDirectory() {
	const directory = getCurrentDirectoryObject();

	if (!directory || !directory.children) {
		appendOutputLine('Directory error.');
		return;
	}

	const entries = Object.entries(directory.children);

	if (entries.length === 0) {
		appendOutputLine('No files found.');
		return;
	}

	for (const [name, item] of entries) {
		if (item.type === 'dir') {
			const lockedSuffix = item.locked ? ' [LOCKED]' : '';
			appendOutputLine(`[DIR] ${name}${lockedSuffix}`);
			continue;
		}

		appendOutputLine(`[FILE] ${name}`);
	}
}

// Handle relative navigation (cd folder, cd ..) with secure gate checks.
function changeDirectory(target) {
	if (!target) {
		appendOutputLine('Usage: cd [folder]');
		return;
	}

	if (target === '..') {
		if (currentPathSegments.length === 0) {
			appendOutputLine('Already at root.');
			return;
		}

		currentPathSegments.pop();
		appendOutputLine(`Moved to ${formatCurrentPath()}`);
		return;
	}

	const directory = getCurrentDirectoryObject();

	if (!directory || !directory.children) {
		appendOutputLine('Directory error.');
		return;
	}

	const nextNode = directory.children[target];

	if (!nextNode || nextNode.type !== 'dir') {
		appendOutputLine(`Folder not found: ${target}`);
		return;
	}

	if (nextNode.locked) {
		appendOutputLine('Access denied.');
		return;
	}

	currentPathSegments.push(target);
	appendOutputLine(`Moved to ${formatCurrentPath()}`);
}

// Open and print file content from the active directory.
function openFile(fileName) {
	if (!fileName) {
		appendOutputLine('Usage: open [file]');
		return;
	}

	const directory = getCurrentDirectoryObject();

	if (!directory || !directory.children) {
		appendOutputLine('Directory error.');
		return;
	}

	const fileNode = directory.children[fileName];

	if (!fileNode || fileNode.type !== 'file') {
		appendOutputLine(`File not found: ${fileName}`);
		return;
	}

	appendOutputLine(`--- ${fileName} ---`);
	printLines(fileNode.content);
	appendOutputLine('--- END FILE ---');
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
			listDirectory();
		}
	},
	ls: {
		name: 'ls',
		usage: 'ls',
		description: 'Lists folders and files in the current directory.',
		execute: () => {
			listDirectory();
		}
	},
	cd: {
		name: 'cd',
		usage: 'cd [folder] | cd ..',
		description: 'Moves into a folder or up one level.',
		execute: (args) => {
			changeDirectory(args[0]);
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
			openFile(args[0]);
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
