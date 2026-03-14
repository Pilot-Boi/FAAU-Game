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
                'system_boot.txt': {
                    type: 'file',
                    content: [
                        'FACILITY INTERNAL NETWORK BOOT SEQUENCE',
                        'SYSTEM NODE: PRIMARY',
                        '',
                        'Initializing system nodes...',
                        'Establishing secure internal connections...',
                        'Loading authentication protocols...',
                        'Verifying biometric access channels...',
                        '',
                        'WARNING: External connection detected.',
                        '',
                        'Source origin: UNKNOWN',
                        'Connection type: NONSTANDARD',
                        'Authorization token: NOT FOUND',
                        '',
                        'Response protocol: OBSERVE',
                        'Monitoring enabled.',
                        '',
                        'Boot complete.',
                        '',
                        'SYSTEM READY'
                    ]
                },
                'network_status.txt': {
                    type: 'file',
                    content: [
                        'NETWORK STATUS LOG',
                        'NODE: FACILITY_INTERNAL_MAIN',
                        '',
                        '[01:12:04] Secure connection established.',
                        '[01:12:07] Connection origin mismatch detected.',
                        '[01:12:07] Source classification: UNKNOWN',
                        '[01:12:08] Connection type: NONSTANDARD',
                        '',
                        '[01:13:41] Biometric channel lost from SUBJECT 008.',
                        '[01:13:42] Monitoring rerouted to passive observation.',
                        '',
                        '[01:15:09] Audio event detected on intercom subnet.',
                        '[01:15:10] Voiceprint match: NONE',
                        '[01:15:11] Source location: LAB CORRIDOR C-03',
                        '',
                        '[01:17:26] External access attempt detected.',
                        '[01:17:26] Firewall response: BLOCKED',
                        '',
                        '[01:20:03] Monitoring protocols activated.',
                        '[01:20:04] Flag assigned: UNKNOWN SOURCE',
                        '',
                        'LOG END'
                    ]
                },
                'security_log.txt': {
                    type: 'file',
                    content: [
                        'SECURITY INCIDENT LOG',
                        'COMPILED BY: SECURITY OPERATIONS',
                        '',
                        'LOG ENTRY 4581',
                        'Unauthorized system connection detected.',
                        'Source origin: UNKNOWN',
                        'Connection type: NONSTANDARD',
                        'Status: UNDER REVIEW',
                        '',
                        'LOG ENTRY 4582',
                        'Intercom system activation detected in',
                        'unoccupied laboratory corridor C-03.',
                        'Voice source could not be identified.',
                        'Status: OPEN',
                        '',
                        'LOG ENTRY 4583',
                        'Biometric scanner malfunction reported',
                        'at Sublevel 3 access point.',
                        'No authorized transit recorded.',
                        'Status: OPEN',
                        '',
                        'LOG ENTRY 4584',
                        'Observation channel assigned to SUBJECT 008',
                        'temporarily lost synchronization.',
                        'Cause undetermined.',
                        'Status: ESCALATED',
                        '',
                        'Security teams are investigating all related',
                        'anomalous activity for possible correlation.'
                    ]
                },
                'anomaly_report.txt': {
                    type: 'file',
                    content: [
                        'ANOMALY REPORT',
                        'FILE CLASSIFICATION: INTERNAL',
                        '',
                        'Multiple low-level system irregularities were detected',
                        'during the last monitoring cycle.',
                        '',
                        'Observed events include:',
                        '- Nonstandard external network handshake',
                        '- Intermittent voice activity on inactive channels',
                        '- Loss of biometric continuity from monitored subject',
                        '- Repeated failed authentication without credential input',
                        '',
                        'At this time no confirmed breach pathway has been',
                        'identified.',
                        '',
                        'Recommendation:',
                        'Continue passive observation and maintain enhanced',
                        'security posture until source identification is complete.',
                        '',
                        'FILE END'
                    ]
                },
                'sublevel_monitor.txt': {
                    type: 'file',
                    content: [
                        'SUBLEVEL MONITORING LOG',
                        'ZONE: SUBLEVEL 3',
                        '',
                        '[02:01:14] Access point sealed.',
                        '[02:01:15] Biometric verification cycle initiated.',
                        '[02:01:16] Verification failure recorded.',
                        '',
                        '[02:03:52] Corridor motion detected.',
                        '[02:03:53] No matching personnel transponder found.',
                        '',
                        '[02:04:09] Audio activity detected near Intake Wing.',
                        '[02:04:10] Source classification unavailable.',
                        '',
                        '[02:06:31] Observation feed loss: CONTAINMENT_008',
                        '[02:06:33] Feed recovery unsuccessful.',
                        '',
                        'Automated alert forwarded to Security Operations.',
                        '',
                        'LOG END'
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
                        'FACILITY RESEARCH DIVISION OVERVIEW',
                        '',
                        'All research programs operate under Director-level oversight',
                        'and are subject to internal compliance monitoring.',
                        '',
                        'DIVISION DIRECTORY',
                        '',
                        'GENETICS DIVISION',
                        'Focus: Genomic sequencing, manipulation, and synthetic modeling.',
                        'Status: Operational',
                        'Primary Objective: Adaptive trait analysis.',
                        '',
                        'BIOENGINEERING DIVISION',
                        'Focus: Biomechanical augmentation and prosthetic integration.',
                        'Status: Operational',
                        'Primary Objective: Combat survivability enhancements.',
                        '',
                        'ADAPTIVE PHYSIOLOGY DIVISION',
                        'Focus: Dynamic physiological adaptation and modeling.',
                        'Status: Operational',
                        'Primary Objective: Extreme-environment survivability.',
                        '',
                        '███████ RESEARCH DIVISION',
                        'Classification: Director Authorization Required',
                        'Status: ACTIVE',
                        'Access: RESTRICTED',
                        '',
                        'Unauthorized personnel are prohibited from accessing',
                        'classified program documentation.'
                    ]
                },
                'project_index.txt': {
                    type: 'file',
                    content: [
                        'FACILITY PROJECT INDEX',
                        '',
                        'All programs listed below are currently active unless',
                        'otherwise noted in status fields.',
                        '',
                        'BIO-01',
                        'Project: ACHILLES',
                        'Division: Bioengineering',
                        'Status: COMPLETED',
                        'Objective: Advanced biomechanical lower-limb prosthetics.',
                        '',
                        'BIO-02',
                        'Project: HYDRA',
                        'Division: Bioengineering',
                        'Status: ACTIVE',
                        'Objective: Accelerated cellular repair for trauma stabilization.',
                        '',
                        'BIO-03',
                        'Project: ATLAS',
                        'Division: Adaptive Physiology',
                        'Status: ACTIVE',
                        'Objective: Analysis of extreme physiological tolerance thresholds.',
                        '',
                        'GEN-01',
                        'Project: SERAPH',
                        'Division: Genetics',
                        'Status: CLASSIFIED',
                        'Objective: ███████ musculoskeletal modeling.',
                        'Access Level: Director Authorization Required',
                        'Notes: Cross-division coordination in progress.',
                        '',
                        'GEN-02',
                        'Project: ORACLE',
                        'Division: Genetics',
                        'Status: DEVELOPMENTAL',
                        'Objective: Neural control interfaces for augmentation systems.',
                        '',
                        'Additional classified projects may not appear in',
                        'standard program listings.'
                    ]
                },
                projects: {
                    type: 'dir',
                    children: {
                        'BIO_01.txt': {
                            type: 'file',
                            content: [
                                'PROJECT FILE: BIO-01',
                                'PROJECT NAME: ACHILLES',
                                'DIVISION: BIOENGINEERING',
                                '',
                                'PROJECT STATUS: COMPLETED',
                                'IMPLEMENTATION STATUS: SUCCESSFUL',
                                '',
                                'PROJECT SUMMARY',
                                'The ACHILLES initiative focused on the development of advanced',
                                'biomechanical lower-limb prosthetics designed for high-performance',
                                'mobility and neurological synchronization.',
                                '',
                                'The system integrates reinforced skeletal actuators, adaptive',
                                'balance stabilization, and real-time neural interface feedback',
                                'to replicate and exceed baseline hybrid locomotion capability.',
                                '',
                                'DESIGN LEAD',
                                'Dr. Pietro Polendina',
                                '',
                                'SYSTEM ARCHITECTURE',
                                'The prosthetic platform utilizes layered actuator bundles and',
                                'magnetically stabilized joint assemblies derived from previous',
                                'adaptive physiology modeling research.',
                                '',
                                'Primary design objectives included:',
                                '- High precision motor control',
                                '- Reinforced load tolerance',
                                '- Real-time neural interface compatibility',
                                '- Long-term durability under combat-grade stress conditions',
                                '',
                                'IMPLEMENTATION NOTES',
                                'Prototype units were successfully integrated with a synthetic',
                                'hybridoid platform designated Asset P-01.',
                                '',
                                'Initial activation demonstrated full mobility capability and',
                                'stable neural interface synchronization.',
                                '',
                                'Performance testing indicates locomotion efficiency exceeding',
                                'baseline hybrid standards by approximately 17%.',
                                '',
                                'Dr. Polendina reports that the system remains highly stable',
                                'following extended operational trials.',
                                '',
                                'DIRECTORATE REVIEW',
                                'The ACHILLES platform has been approved for long-term operational',
                                'deployment and will serve as a foundational architecture for',
                                'future biomechanical integration projects.',
                                '',
                                'FILE END'
                            ]
                        },
                        'BIO_02.txt': {
                            type: 'file',
                            content: [

                                'PROJECT FILE: BIO-02',
                                'PROJECT NAME: HYDRA',
                                'DIVISION: BIOENGINEERING',
                                '',
                                'PROJECT STATUS: ACTIVE',
                                'IMPLEMENTATION STATUS: CLINICAL DEVELOPMENT',
                                '',
                                'PROJECT SUMMARY',
                                'The HYDRA initiative focuses on accelerated biological',
                                'regeneration through adaptive cellular scaffolding systems.',
                                '',
                                'The program was developed to improve recovery outcomes',
                                'for patients suffering severe tissue loss following',
                                'industrial accidents, battlefield trauma, or catastrophic',
                                'injury.',
                                '',
                                'HYDRA research emphasizes restoration of natural',
                                'musculoskeletal function while minimizing invasive',
                                'prosthetic intervention.',
                                '',
                                'DESIGN LEAD',
                                'Dr. Pietro Polendina',
                                '',
                                'SYSTEM ARCHITECTURE',
                                'The HYDRA platform utilizes a biodegradable',
                                'regenerative lattice composed of programmable',
                                'bio-compatible polymers.',
                                '',
                                'The scaffold encourages localized cellular growth',
                                'and guides tissue reconstruction while gradually',
                                'dissolving once natural regeneration is complete.',
                                '',
                                'Primary design objectives included:',
                                '- Accelerated wound healing',
                                '- Restoration of damaged musculature',
                                '- Reduced long-term prosthetic dependency',
                                '- Compatibility with existing medical treatments',
                                '',
                                'IMPLEMENTATION NOTES',
                                'Laboratory trials demonstrate significantly',
                                'improved recovery rates compared to conventional',
                                'tissue reconstruction methods.',
                                '',
                                'Initial patient trials show promising regeneration',
                                'of damaged muscle groups and connective tissue',
                                'structures.',
                                '',
                                'Further refinement is focused on increasing',
                                'regenerative precision and long-term stability.',
                                '',
                                'DIRECTORATE REVIEW',
                                'The HYDRA system represents a major advancement',
                                'in regenerative medicine and is expected to',
                                'significantly improve long-term recovery outcomes',
                                'for trauma patients.',
                                '',
                                'Additional development funding approved.',
                                '',
                                'FILE END'
                            ]
                        },
                        'BIO_03.txt': {
                            type: 'file',
                            content: [
                                'PROJECT FILE: BIO-03',
                                'PROJECT NAME: ATLAS',
                                'DIVISION: ADAPTIVE PHYSIOLOGY',
                                '',
                                'PROJECT STATUS: ACTIVE',
                                'IMPLEMENTATION STATUS: FIELD TESTING',
                                '',
                                'PROJECT SUMMARY',
                                'The ATLAS initiative studies long-term physiological',
                                'adaptation in extreme environmental conditions.',
                                '',
                                'The program was originally developed to support',
                                'search-and-rescue personnel, long-duration',
                                'exploration teams, and disaster response units',
                                'operating in hostile environments.',
                                '',
                                'Research focuses on improving endurance,',
                                'metabolic efficiency, and recovery rates',
                                'during prolonged physical strain.',
                                '',
                                'DESIGN LEAD',
                                'Dr. Pietro Polendina',
                                '',
                                'SYSTEM ARCHITECTURE',
                                'ATLAS utilizes controlled conditioning protocols',
                                'combined with metabolic regulation therapies',
                                'to gradually increase physiological tolerance',
                                'to environmental stress.',
                                '',
                                'Subjects undergo monitored training cycles',
                                'within adaptive simulation environments',
                                'designed to replicate high-altitude,',
                                'low-oxygen, and high-gravity conditions.',
                                '',
                                'Primary design objectives included:',
                                '- Improved oxygen efficiency',
                                '- Increased muscular endurance',
                                '- Enhanced skeletal load tolerance',
                                '- Faster physiological recovery rates',
                                '',
                                'IMPLEMENTATION NOTES',
                                'Test participants demonstrate significant',
                                'improvements in endurance and recovery',
                                'following extended conditioning cycles.',
                                '',
                                'The program has shown particular promise',
                                'for individuals operating in high-risk',
                                'environmental rescue roles.',
                                '',
                                'Further study will focus on long-term',
                                'physiological sustainability.',
                                '',
                                'DIRECTORATE REVIEW',
                                'ATLAS is considered a valuable program',
                                'for improving survivability in extreme',
                                'operational environments.',
                                '',
                                'Continued development authorized.',
                                '',
                                'FILE END'
                            ]
                        },
                        'GEN_02.txt': {
                            type: 'file',
                            content: [
                                'PROJECT FILE: GEN-02',
                                'PROJECT NAME: ORACLE',
                                'DIVISION: GENETICS',
                                '',
                                'PROJECT STATUS: DEVELOPMENTAL',
                                'IMPLEMENTATION STATUS: PROTOTYPE TESTING',
                                '',
                                'PROJECT SUMMARY',
                                'The ORACLE initiative focuses on the stabilization',
                                'of advanced neurological interface systems designed',
                                'to synchronize external augmentation platforms',
                                'with host neural activity.',
                                '',
                                'The program investigates methods for translating',
                                'complex neural signals into real-time control inputs',
                                'for biomechanical and physiological augmentation',
                                'systems.',
                                '',
                                'DESIGN LEAD',
                                'Dr. Arthur Watts',
                                '',
                                'SYSTEM ARCHITECTURE',
                                'ORACLE utilizes a multi-layer neural signal decoding',
                                'array capable of interpreting motor cortex activity',
                                'with minimal latency.',
                                '',
                                'The interface platform integrates with specialized',
                                'biomechanical control frameworks to provide',
                                'direct neural command authority over external',
                                'systems.',
                                '',
                                'Primary design objectives included:',
                                '- Stable neural signal interpretation',
                                '- Reduced latency in motor command translation',
                                '- Long-term neurological compatibility',
                                '- Cross-platform augmentation control',
                                '',
                                'IMPLEMENTATION NOTES',
                                'Prototype systems demonstrate strong signal fidelity',
                                'during short-duration synchronization tests.',
                                '',
                                'Extended interface sessions have produced',
                                'intermittent neurological feedback disturbances',
                                'in early test subjects.',
                                '',
                                'Further signal filtering adjustments are in progress.',
                                '',
                                'DIRECTORATE REVIEW',
                                'ORACLE has been designated as a critical support',
                                'technology for several classified augmentation',
                                'projects currently under restricted development.',
                                '',
                                'Director clearance required for full documentation.',
                                '',
                                'FILE END'
                            ]
                        }
                    }
                }
            },
            staff: {
                type: 'dir',
                children: {
                    'directory.txt': {
                        type: 'file',
                        content: [
                            'FACILITY STAFF DIRECTORY',
                            '',
                            'COMMAND STRUCTURE',
                            'ID: D-001',
                            'DIRECTOR ███████████',
                            'Position: Facility Director',
                            '',
                            'ID: C-001',
                            'GENERAL JAMES IRONWOOD',
                            'Position: Facility Commander',
                            '',
                            'RESEARCH DIVISIONS',
                            'ID: R-014',
                            'DR. ARTHUR WATTS',
                            'Position: Head of Genetics Division',
                            '',
                            'ID: R-021',
                            'DR. PIETRO POLENDINA',
                            'Position: Head of Bioengineering Division',
                            '',
                            'SECURITY DIVISION',
                            'ID: S-002',
                            'CLOVER EBI',
                            'Position: Head of Security Operations',
                            '',
                            'Full personnel records require elevated access credentials.'
                        ]
                    },
                    'notice_01.txt': {
                        type: 'file',
                        content: [
                            'SECURITY NOTICE',
                            '',
                            'All personnel are reminded to maintain vigilance regarding',
                            'facility security procedures.',
                            '',
                            'Report any suspicious activity or unauthorized system',
                            'access attempts to Security Operations immediately.',
                            '',
                            'Recent incidents have included:',
                            '',
                            '- Unidentified voice transmission on internal intercom network',
                            '- External connection attempts targeting internal servers',
                            '- Temporary disruption of biometric authentication channels',
                            '',
                            'Security protocols have been enhanced in response to',
                            'these incidents.',
                            '',
                            'All staff should verify workstation authentication',
                            'before accessing internal systems.',
                            '',
                            '— SECURITY OPERATIONS'
                        ]
                    },
                    'notice_02.txt': {
                        type: 'file',
                        content: [
                            'FACILITY STAFF NOTICE',
                            '',
                            'Due to recent security concerns, access to the following',
                            'facility areas has been temporarily restricted:',
                            '',
                            '- Sublevel 3 laboratories',
                            '- Subject Intake Wing',
                            '- Adaptive Physiology Division',
                            '',
                            'Personnel assigned to affected divisions will receive',
                            'updated clearance credentials once internal review',
                            'procedures have been completed.',
                            '',
                            'Staff are reminded that Director-level authorization',
                            'is required for all research beyond BIO-03 classification.',
                            '',
                            '— FACILITY ADMINISTRATION'
                        ]
                    },
                    'security_clearance.txt': {
                        type: 'file',
                        content: [
                            'FACILITY CLEARANCE LEVELS',
                            '',
                            'LEVEL 1',
                            'General facility access.',
                            '',
                            'LEVEL 2',
                            'Research division documentation access.',
                            '',
                            'LEVEL 3',
                            'Restricted laboratory access.',
                            '',
                            'LEVEL 4',
                            'Sensitive research program access.',
                            '',
                            'LEVEL 5',
                            'Director authorization required.',
                            '',
                            'Certain classified projects may require',
                            'additional authorization protocols.'
                        ]
                    }

                }
            },
            secure: {
                type: 'dir',
                locked: true,
                children: {
                    'avian_project.txt': {
                        type: 'file',
                        content: [
                            'PROJECT AVIA-PHASE',
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
