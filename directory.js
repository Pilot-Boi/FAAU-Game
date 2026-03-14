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
};

// The current working path represented as folder names from root.
const currentPathSegments = [];

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

// Return formatted directory entries for the active folder.
function getDirectoryEntries() {
    const directory = getCurrentDirectoryObject();

    if (!directory || !directory.children) {
        return { error: 'Directory error.' };
    }

    const entries = Object.entries(directory.children);

    if (entries.length === 0) {
        return { entries: ['No files found.'] };
    }

    const formattedEntries = entries.map(([name, item]) => {
        if (item.type === 'dir') {
            const lockedSuffix = item.locked ? ' [LOCKED]' : '';
            return `[DIR] ${name}${lockedSuffix}`;
        }

        return `[FILE] ${name}`;
    });

    return { entries: formattedEntries };
}

// Change directory and return a result object for the terminal to print.
function changeDirectory(target) {
    if (!target) {
        return { error: 'Usage: cd [folder]' };
    }

    if (target === '..') {
        if (currentPathSegments.length === 0) {
            return { error: 'Already at root.' };
        }

        currentPathSegments.pop();
        return { entries: [`Moved to ${formatCurrentPath()}`] };
    }

    const directory = getCurrentDirectoryObject();

    if (!directory || !directory.children) {
        return { error: 'Directory error.' };
    }

    const nextNode = directory.children[target];

    if (!nextNode || nextNode.type !== 'dir') {
        return { error: `Folder not found: ${target}` };
    }

    if (nextNode.locked) {
        return { error: 'Access denied.' };
    }

    currentPathSegments.push(target);
    return { entries: [`Moved to ${formatCurrentPath()}`] };
}

// Open a file and return printable lines for the terminal.
function openFile(fileName) {
    if (!fileName) {
        return { error: 'Usage: open [file]' };
    }

    const directory = getCurrentDirectoryObject();

    if (!directory || !directory.children) {
        return { error: 'Directory error.' };
    }

    const fileNode = directory.children[fileName];

    if (!fileNode || fileNode.type !== 'file') {
        return { error: `File not found: ${fileName}` };
    }

    return {
        entries: [
            `--- ${fileName} ---`,
            ...fileNode.content,
            '--- END FILE ---'
        ]
    };
}
