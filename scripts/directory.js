/**
 * 
 */
// Search index mapping terms to file paths for the 'search' command.
const SEARCH_INDEX = {
    subject_008: [
        { type: 'file', path: '/logs/network_status.txt' },
        { type: 'file', path: '/logs/security_log.txt' },
        { type: 'file', path: '/logs/anomaly_report.txt' },
        { type: 'file', path: '/logs/anomaly_correlation.txt' },
        { type: 'file', path: '/logs/sublevel_monitor.txt' }
    ],
    unknown_source: [
        { type: 'file', path: '/logs/system_boot.txt' },
        { type: 'file', path: '/logs/network_status.txt' },
        { type: 'file', path: '/logs/security_log.txt' },
        { type: 'file', path: '/logs/anomaly_report.txt' },
        { type: 'file', path: '/logs/anomaly_correlation.txt' },
        { type: 'file', path: '/logs/sublevel_monitor.txt' },
        { type: 'file', path: '/staff/notice_01.txt' }
    ],
    intercom: [
        { type: 'file', path: '/logs/network_status.txt' },
        { type: 'file', path: '/logs/anomaly_correlation.txt' },
        { type: 'file', path: '/staff/notice_01.txt' }
    ],
    sublevel: [
        { type: 'file', path: '/logs/security_log.txt' },
        { type: 'file', path: '/logs/sublevel_monitor.txt' },
        { type: 'file', path: '/logs/sublevel_security.txt' },
        { type: 'file', path: '/staff/notice_02.txt' }
    ],
    watts: [
        { type: 'file', path: '/staff/directory.txt' },
        { type: 'file', path: '/research/projects/GEN_02.txt' }
    ],
    polendina: [
        { type: 'file', path: '/staff/directory.txt' },
        { type: 'file', path: '/research/projects/BIO_01.txt' },
        { type: 'file', path: '/research/projects/BIO_02.txt' },
        { type: 'file', path: '/research/projects/BIO_03.txt' }
    ],
    ebi: [
        { type: 'file', path: '/staff/directory.txt' }
    ],
    schnee: [
        { type: 'file', path: '/staff/directory.txt' }
    ],
    ironwood: [
        { type: 'file', path: '/staff/directory.txt' }
    ],
    director: [
        { type: 'file', path: '/staff/directory.txt' },
        { type: 'file', path: '/staff/notice_02.txt' },
        { type: 'file', path: '/research/overview.txt' }
    ],
    achilles: [
        { type: 'file', path: '/research/project_index.txt' },
        { type: 'file', path: '/research/projects/BIO_01.txt' }
    ],
    prosthetics: [
        { type: 'file', path: '/research/projects/BIO_01.txt' }
    ],
    neural_interface: [
        { type: 'file', path: '/research/projects/GEN_02.txt' }
    ],
    hybrid: [
        { type: 'file', path: '/research/projects/BIO_01.txt' }
    ],
    containment: [
        { type: 'file', path: '/logs/sublevel_security.txt' }
    ],
    restricted_archive: [
        { type: 'file', path: '/logs/anomaly_correlation.txt' },
        { type: 'file', path: '/staff/archive_notice.txt' }
    ],
    avian: [
        { type: 'file', path: '/staff/archive_notice.txt' },
        { type: 'file', path: '/secure/avian_project.txt' }
    ],
    bioengineering: [
        { type: 'file', path: '/staff/directory.txt' },
        { type: 'file', path: '/research/overview.txt' },
        { type: 'file', path: '/research/project_index.txt' },
        { type: 'file', path: '/research/projects/BIO_01.txt' },
        { type: 'file', path: '/research/projects/BIO_02.txt' },
        { type: 'file', path: '/research/projects/BIO_03.txt' }
    ],
    genetics: [
        { type: 'file', path: '/staff/directory.txt' },
        { type: 'file', path: '/research/overview.txt' },
        { type: 'file', path: '/research/project_index.txt' }
    ],
    security: [
        { type: 'file', path: '/logs/security_log.txt' },
        { type: 'file', path: '/logs/sublevel_security.txt' },
        { type: 'file', path: '/staff/directory.txt' },
        { type: 'file', path: '/staff/notice_01.txt' },
        { type: 'file', path: '/staff/notice_02.txt' },
        { type: 'file', path: '/staff/archive_notice.txt' },
        { type: 'file', path: '/staff/security_protocols.txt' },
        { type: 'file', path: '/staff/security_clearance.txt' }
    ]
};

// In-memory filesystem for the narrative terminal.
const FILE_SYSTEM = {
    type: 'dir',
    children: {
        logs: {
            type: 'dir',
            children: {
                'system_boot.txt': {
                    type: 'file',
                    terms: ['unknown_source'],
                    onOpenFlag: 'read_system_boot',
                    contentFile: 'content/logs/system_boot.txt'
                },
                'network_status.txt': {
                    type: 'file',
                    terms: ['subject_008', 'unknown_source', 'intercom'],
                    onOpenFlag: 'read_network_status',
                    contentFile: 'content/logs/network_status.txt'
                },
                'security_log.txt': {
                    type: 'file',
                    terms: ['subject_008', 'sublevel', 'security', 'unknown_source'],
                    onOpenFlag: 'read_security_log',

                    contentFile: 'content/logs/security_log.txt'
                },
                'anomaly_report.txt': {
                    type: 'file',
                    terms: ['unknown_source', 'subject_008'],
                    onOpenFlag: 'read_anomaly_report',
                    contentFile: 'content/logs/anomaly_report.txt'
                },
                'anomaly_correlation.txt': {
                    type: 'file',
                    requiredFlag: 'anomaly_correlation_unlocked',
                    hiddenUntilFlag: 'anomaly_correlation_unlocked',
                    terms: ['unknown_source', 'subject_008', 'intercom', 'restricted_archive'],
                    onOpenFlag: 'read_anomaly_correlation',
                    contentFile: 'content/logs/anomaly_correlation.txt'
                },
                'sublevel_monitor.txt': {
                    type: 'file',
                    terms: ['sublevel', 'subject_008', 'security', 'unknown_source'],
                    onOpenFlag: 'read_sublevel_monitor',
                    contentFile: 'content/logs/sublevel_monitor.txt'
                },
                'sublevel_security.txt': {
                    type: 'file',
                    requiredFlag: 'sublevel_security_unlocked',
                    hiddenUntilFlag: 'sublevel_security_unlocked',
                    terms: ['sublevel', 'security', 'containment'],
                    onOpenFlag: 'read_sublevel_security',
                    contentFile: 'content/logs/sublevel_security.txt'
                }
            }
        },
        research: {
            type: 'dir',
            children: {
                'overview.txt': {
                    type: 'file',
                    terms: ['genetics', 'bioengineering', 'director'],
                    onOpenFlag: 'read_research_overview',
                    contentFile: 'content/research/overview.txt'
                },
                'project_index.txt': {
                    type: 'file',
                    terms: ['achilles', 'bioengineering', 'genetics'],
                    onOpenFlag: 'read_project_index',
                    contentFile: 'content/research/project_index.txt'
                },
                projects: {
                    type: 'dir',
                    children: {
                        'BIO_01.txt': {
                            type: 'file',
                            terms: ['achilles', 'bioengineering', 'prosthetics', 'polendina', 'hybrid'],
                            onOpenFlag: 'read_bio_01',
                            contentFile: 'content/research/projects/BIO_01.txt'
                        },
                        'BIO_02.txt': {
                            type: 'file',
                            terms: ['bioengineering', 'polendina'],
                            onOpenFlag: 'read_bio_02',
                            contentFile: 'content/research/projects/BIO_02.txt'
                        },
                        'BIO_03.txt': {
                            type: 'file',
                            terms: ['bioengineering', 'polendina'],
                            onOpenFlag: 'read_bio_03',
                            contentFile: 'content/research/projects/BIO_03.txt'
                        },
                        'GEN_02.txt': {
                            type: 'file',
                            terms: ['genetics', 'neural_interface'],
                            onOpenFlag: 'read_gen_02',
                            contentFile: 'content/research/projects/GEN_02.txt'
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
                    terms: ['watts', 'polendina', 'ebi', 'ironwood', 'schnee', 'director', 'genetics', 'bioengineering', 'security'],
                    onOpenFlag: 'read_staff_directory',
                    contentFile: 'content/staff/directory.txt'
                },
                'notice_01.txt': {
                    type: 'file',
                    terms: ['security', 'intercom', 'unknown_source'],
                    onOpenFlag: 'read_notice_01',
                    contentFile: 'content/staff/notice_01.txt'
                },
                'notice_02.txt': {
                    type: 'file',
                    terms: ['security', 'sublevel'],
                    onOpenFlag: 'read_notice_02',
                    contentFile: 'content/staff/notice_02.txt'
                },
                'archive_notice.txt': {
                    type: 'file',
                    requiredFlag: 'archive_notice_unlocked',
                    hiddenUntilFlag: 'archive_notice_unlocked',
                    terms: ['restricted_archive', 'avian', 'security'],
                    onOpenFlag: 'read_archive_notice',
                    contentFile: 'content/staff/archive_notice.txt'
                },
                'security_clearance.txt': {
                    type: 'file',
                    terms: ['security'],
                    onOpenFlag: 'read_security_clearance',
                    contentFile: 'content/staff/security_clearance.txt'
                },
                'security_protocols.txt': {
                    type: 'file',
                    requiredFlag: 'security_protocols_unlocked',
                    hiddenUntilFlag: 'security_protocols_unlocked',
                    terms: ['security'],
                    onOpenFlag: 'read_security_protocols',
                    contentFile: 'content/staff/security_protocols.txt',
                },
                profiles: {
                    type: 'dir',
                    hiddenUntilFlag: 'profile_archive_visible',
                    children: {
                        'ironwood_profile.txt': {
                            type: 'file',
                            requiredFlag: 'profile_ironwood_unlocked',
                            hiddenUntilFlag: 'profile_ironwood_unlocked',
                            contentFile: 'content/staff/profiles/ironwood_profile.txt'
                        },
                        'watts_profile.txt': {
                            type: 'file',
                            requiredFlag: 'profile_watts_unlocked',
                            hiddenUntilFlag: 'profile_watts_unlocked',
                            contentFile: 'content/staff/profiles/watts_profile.txt'
                        },
                        'polendina_profile.txt': {
                            type: 'file',
                            requiredFlag: 'profile_polendina_unlocked',
                            hiddenUntilFlag: 'profile_polendina_unlocked',
                            contentFile: 'content/staff/profiles/polendina_profile.txt'
                        },
                        'ebi_profile.txt': {
                            type: 'file',
                            requiredFlag: 'profile_ebi_unlocked',
                            hiddenUntilFlag: 'profile_ebi_unlocked',
                            contentFile: 'content/staff/profiles/ebi_profile.txt'
                        },
                        'schnee_profile.txt': {
                            type: 'file',
                            requiredFlag: 'profile_schnee_unlocked',
                            hiddenUntilFlag: 'profile_schnee_unlocked',
                            contentFile: 'content/staff/profiles/schnee_profile.txt'
                        },

                    }
                }
            }
        },
        secure: {
            type: 'dir',
            requiredFlag: 'secure_access_granted',
            children: {
                avians: {
                    type: 'dir',
                    children: {
                        subjects: {
                            type: 'dir',
                            children: {
                                'subject_001.txt': {
                                    type: 'file',
                                    terms: ['subject_001', 'test_subjects'],
                                    onOpenFlag: 'read_subject_001',
                                    imageAttachment: {
                                        src: 'assets/subjects/subject_001.png',
                                        title: 'SUBJECT 001 IMAGE ARCHIVE',
                                        description: 'Placeholder image. Replace with subject_001 asset when available.'
                                    },
                                    contentFile: 'content/secure/subjects/subject_001.txt'
                                },
                                'subject_002.txt': {
                                    type: 'file',
                                    terms: ['subject_002', 'test_subjects'],
                                    onOpenFlag: 'read_subject_002',
                                    imageAttachment: {
                                        src: 'assets/subjects/subject_002.png',
                                        title: 'SUBJECT 002 IMAGE ARCHIVE',
                                        description: 'Placeholder image. Replace with subject_002 asset when available.'
                                    },
                                    contentFile: 'content/secure/subjects/subject_002.txt'
                                },
                                'subject_003.txt': {
                                    type: 'file',
                                    terms: ['subject_003', 'test_subjects'],
                                    onOpenFlag: 'read_subject_003',
                                    imageAttachment: {
                                        src: 'assets/subjects/subject_003.png',
                                        title: 'SUBJECT 003 IMAGE ARCHIVE',
                                        description: 'Placeholder image. Replace with subject_003 asset when available.'
                                    },
                                    contentFile: 'content/secure/subjects/subject_003.txt'
                                },
                                'subject_004.txt': {
                                    type: 'file',
                                    requiredFlag: 'subject_004_file_unlocked',
                                    hiddenUntilFlag: 'subject_004_file_unlocked',
                                    terms: ['subject_004', 'test_subjects'],
                                    onOpenFlag: 'read_subject_004',
                                    imageAttachment: {
                                        src: 'assets/subjects/subject_004.png',
                                        title: 'SUBJECT 004 IMAGE ARCHIVE',
                                        description: 'Placeholder image. Replace with subject_004 asset when available.'
                                    },
                                    contentFile: 'content/secure/subjects/subject_004.txt'
                                },
                                'subject_005.txt': {
                                    type: 'file',
                                    requiredFlag: 'subject_005_file_unlocked',
                                    hiddenUntilFlag: 'subject_005_file_unlocked',
                                    terms: ['subject_005', 'test_subjects'],
                                    onOpenFlag: 'read_subject_005',
                                    imageAttachment: {
                                        src: 'assets/subjects/subject_005.png',
                                        title: 'SUBJECT 005 IMAGE ARCHIVE',
                                        description: 'Placeholder image. Replace with subject_005 asset when available.'
                                    },
                                    contentFile: 'content/secure/subjects/subject_005.txt'
                                },
                                'subject_006.txt': {
                                    type: 'file',
                                    requiredFlag: 'subject_006_file_unlocked',
                                    hiddenUntilFlag: 'subject_006_file_unlocked',
                                    terms: ['subject_006', 'test_subjects'],
                                    onOpenFlag: 'read_subject_006',
                                    imageAttachment: {
                                        src: 'assets/subjects/subject_006.png',
                                        title: 'SUBJECT 006 IMAGE ARCHIVE',
                                        description: 'Placeholder image. Replace with subject_006 asset when available.'
                                    },
                                    contentFile: 'content/secure/subjects/subject_006.txt'
                                },
                                'subject_007.txt': {
                                    type: 'file',
                                    requiredFlag: 'subject_007_file_unlocked',
                                    hiddenUntilFlag: 'subject_007_file_unlocked',
                                    terms: ['subject_007', 'test_subjects'],
                                    onOpenFlag: 'read_subject_007',
                                    imageAttachment: {
                                        src: 'assets/subjects/subject_007.png',
                                        title: 'SUBJECT 007 IMAGE ARCHIVE',
                                        description: 'Placeholder image. Replace with subject_007 asset when available.'
                                    },
                                    contentFile: 'content/secure/subjects/subject_007.txt'
                                },
                                'subject_008.txt': {
                                    type: 'file',
                                    requiredFlag: 'subject_008_file_unlocked',
                                    hiddenUntilFlag: 'subject_008_file_unlocked',
                                    terms: ['subject_008', 'test_subjects'],
                                    onOpenFlag: 'read_subject_008',
                                    imageAttachment: {
                                        src: 'assets/subjects/subject_008.png',
                                        title: 'SUBJECT 008 IMAGE ARCHIVE',
                                        description: 'Placeholder image. Replace with subject_008 asset when available.'
                                    },
                                    contentFile: 'content/secure/subjects/subject_008.txt'
                                }
                            }
                        },
                        containment: {
                            type: 'dir',
                            children: {
                                'containment_overview.txt': {
                                    type: 'file',
                                    terms: ['containment', 'sublevel', 'security'],
                                    onOpenFlag: 'read_containment_overview',
                                    contentFile: 'content/secure/containment/containment_overview.txt'
                                },
                                'protocol_overview.txt': {
                                    type: 'file',
                                    terms: ['containment', 'security'],
                                    onOpenFlag: 'read_protocol_overview',
                                    contentFile: 'content/secure/containment/protocol_overview.txt'
                                },
                                'vocal_restraint_protocol.txt': {
                                    type: 'file',
                                    requiredFlag: 'vocal_restraint_unlocked',
                                    hiddenUntilFlag: 'vocal_restraint_unlocked',
                                    terms: ['containment', 'security', 'subject_002', 'subject_007'],
                                    onOpenFlag: 'read_vocal_restraint_protocol',
                                    contentFile: 'content/secure/containment/vocal_restraint_protocol.txt'
                                },
                                'reinforced_containment_protocol.txt': {
                                    type: 'file',
                                    requiredFlag: 'reinforced_containment_unlocked',
                                    hiddenUntilFlag: 'reinforced_containment_unlocked',
                                    terms: ['containment', 'security', 'subject_003', 'subject_006'],
                                    onOpenFlag: 'read_reinforced_containment_protocol',
                                    contentFile: 'content/secure/containment/reinforced_containment_protocol.txt'
                                },
                                'observation_barrier_protocol.txt': {
                                    type: 'file',
                                    requiredFlag: 'observation_barrier_unlocked',
                                    hiddenUntilFlag: 'observation_barrier_unlocked',
                                    terms: ['containment', 'security', 'subject_004', 'subject_005'],
                                    onOpenFlag: 'read_observation_barrier_protocol',
                                    contentFile: 'content/secure/containment/observation_barrier_protocol.txt'
                                }
                            }
                        },
                        abilities: {
                            type: 'dir',
                            requiredFlag: 'abilities_dir_unlocked',
                            hiddenUntilFlag: 'abilities_dir_unlocked',
                            children: {
                                'ability_overview.txt': {
                                    type: 'file',
                                    terms: ['abilities'],
                                    onOpenFlag: 'read_ability_overview',
                                    contentFile: 'content/secure/abilities/ability_overview.txt'
                                },
                                'ability_manifestation.txt': {
                                    type: 'file',
                                    terms: ['abilities', 'manifestation'],
                                    onOpenFlag: 'read_ability_manifestation',
                                    contentFile: 'content/secure/abilities/ability_manifestation.txt'
                                },
                                'wipe.txt': {
                                    type: 'file',
                                    terms: ['wipe', 'abilities'],
                                    onOpenFlag: 'read_ability_wipe',
                                    contentFile: 'content/secure/abilities/wipe.txt'
                                },
                                'empathy.txt': {
                                    type: 'file',
                                    terms: ['empathy', 'abilities'],
                                    onOpenFlag: 'read_ability_empathy',
                                    contentFile: 'content/secure/abilities/empathy.txt'
                                },
                                'healing.txt': {
                                    type: 'file',
                                    terms: ['healing', 'abilities'],
                                    onOpenFlag: 'read_ability_healing',
                                    contentFile: 'content/secure/abilities/healing.txt'
                                },
                                'strength.txt': {
                                    type: 'file',
                                    terms: ['strength', 'abilities'],
                                    onOpenFlag: 'read_ability_strength',
                                    contentFile: 'content/secure/abilities/strength.txt'
                                },
                                'speed.txt': {
                                    type: 'file',
                                    terms: ['speed', 'abilities'],
                                    onOpenFlag: 'read_ability_speed',
                                    contentFile: 'content/secure/abilities/speed.txt'
                                },
                                'telepathy.txt': {
                                    type: 'file',
                                    terms: ['telepathy', 'abilities'],
                                    onOpenFlag: 'read_ability_telepathy',
                                    contentFile: 'content/secure/abilities/telepathy.txt'
                                },
                                'silver_tongue.txt': {
                                    type: 'file',
                                    terms: ['silver_tongue', 'abilities'],
                                    onOpenFlag: 'read_ability_silver_tongue',
                                    contentFile: 'content/secure/abilities/silver_tongue.txt'
                                },
                                'absorption.txt': {
                                    type: 'file',
                                    terms: ['absorption', 'abilities'],
                                    onOpenFlag: 'read_ability_absorption',
                                    contentFile: 'content/secure/abilities/absorption.txt'
                                },
                                'shifting.txt': {
                                    type: 'file',
                                    terms: ['shifting', 'abilities'],
                                    onOpenFlag: 'read_ability_shifting',
                                    contentFile: 'content/secure/abilities/shifting.txt'
                                },
                                'wither.txt': {
                                    type: 'file',
                                    terms: ['wither', 'abilities'],
                                    onOpenFlag: 'read_ability_wither',
                                    contentFile: 'content/secure/abilities/wither.txt'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

// The current working path represented as folder names from root.
const currentPathSegments = [];
const contentFileCache = new Map();
const MAX_LINE_LENGTH = 64;
const PROFILE_UNLOCK_FLAGS = Object.freeze([
    'profile_ironwood_unlocked',
    'profile_watts_unlocked',
    'profile_polendina_unlocked',
    'profile_ebi_unlocked',
    'profile_schnee_unlocked'
]);

function syncProfileArchiveVisibility() {
    if (hasFlag('profile_archive_visible')) {
        return;
    }

    if (PROFILE_UNLOCK_FLAGS.some((flagName) => hasFlag(flagName))) {
        setFlag('profile_archive_visible');
    }
}

function wrapLineToMaxLength(line, maxLength = MAX_LINE_LENGTH) {
    const source = String(line || '');
    if (source.length <= maxLength) {
        return [source];
    }

    const wrapped = [];
    const words = source.split(/\s+/).filter(Boolean);

    if (words.length === 0) {
        return [''];
    }

    let currentLine = '';

    for (const word of words) {
        if (word.length > maxLength) {
            if (currentLine) {
                wrapped.push(currentLine);
                currentLine = '';
            }

            for (let index = 0; index < word.length; index += maxLength) {
                wrapped.push(word.slice(index, index + maxLength));
            }
            continue;
        }

        if (!currentLine) {
            currentLine = word;
            continue;
        }

        if ((currentLine.length + 1 + word.length) <= maxLength) {
            currentLine += ` ${word}`;
        } else {
            wrapped.push(currentLine);
            currentLine = word;
        }
    }

    if (currentLine) {
        wrapped.push(currentLine);
    }

    return wrapped;
}

function wrapContentLines(lines = [], maxLength = MAX_LINE_LENGTH) {
    if (!Array.isArray(lines) || lines.length === 0) {
        return [];
    }

    const wrapped = [];

    for (const line of lines) {
        const source = String(line || '');
        if (!source.trim()) {
            wrapped.push('');
            continue;
        }

        wrapped.push(...wrapLineToMaxLength(source, maxLength));
    }

    return wrapped;
}

async function loadNodeContent(node) {
    if (!node) {
        return [];
    }

    if (Array.isArray(node.content)) {
        return [...node.content];
    }

    if (!node.contentFile) {
        return [];
    }

    const contentPath = String(node.contentFile).trim();
    if (!contentPath) {
        return [];
    }

    if (contentFileCache.has(contentPath)) {
        return [...contentFileCache.get(contentPath)];
    }

    const response = await fetch(contentPath, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error(`Content file load failed: ${contentPath}`);
    }

    const text = await response.text();
    const lines = text.replace(/\r\n/g, '\n').split('\n');
    const processedLines = contentPath.toLowerCase().endsWith('.txt')
        ? wrapContentLines(lines, MAX_LINE_LENGTH)
        : lines;
    contentFileCache.set(contentPath, processedLines);
    return [...processedLines];
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

// Determine whether a node should be visible in listings and path resolution.
function isNodeVisible(node) {
    if (!node) {
        return false;
    }

    if (node.hiddenUntilFlag && !hasFlag(node.hiddenUntilFlag)) {
        return false;
    }

    return true;
}

// Convert path segments into slash notation shown to the player.
function formatCurrentPath() {
    if (currentPathSegments.length === 0) {
        return '/';
    }

    return `/${currentPathSegments.join('/')}`;
}

// Path resolution function that handles absolute and relative paths, including '.' and '..' segments.
function resolvePath(pathString = '') {
    syncProfileArchiveVisibility();

    const rawPath = pathString.trim();

    if (!rawPath) {
        return { error: 'Invalid path.' };
    }

    const isAbsolute = rawPath.startsWith('/');
    const segments = rawPath.split('/').filter(Boolean);

    const workingSegments = isAbsolute ? [] : [...currentPathSegments];
    let node = FILE_SYSTEM;

    if (!isAbsolute) {
        for (const segment of workingSegments) {
            if (!node.children || !node.children[segment]) {
                return { error: 'Directory error.' };
            }
            node = node.children[segment];
        }
    }

    for (const segment of segments) {
        if (segment === '.') {
            continue;
        }

        if (segment === '..') {
            if (workingSegments.length > 0) {
                workingSegments.pop();
            }

            node = FILE_SYSTEM;
            for (const part of workingSegments) {
                if (!node.children || !node.children[part]) {
                    return { error: 'Directory error.' };
                }
                node = node.children[part];
            }
            continue;
        }

        if (!node.children || !node.children[segment]) {
            return { error: `Path not found: ${pathString}` };
        }

        if (!isNodeVisible(node.children[segment])) {
            return { error: `Path not found: ${pathString}` };
        }

        node = node.children[segment];
        workingSegments.push(segment);
    }

    return {
        node,
        segments: workingSegments,
        path: workingSegments.length === 0 ? '/' : `/${workingSegments.join('/')}`
    };
}

// Return formatted directory entries for the active folder.
function getDirectoryEntries(targetPath = '') {
    syncProfileArchiveVisibility();

    let directory;
    let resolvedPath;

    if (!targetPath || targetPath.trim() === '') {
        directory = getCurrentDirectoryObject();
        resolvedPath = formatCurrentPath();
    } else {
        const resolved = resolvePath(targetPath);

        if (resolved.error) {
            return { error: resolved.error };
        }

        if (!resolved.node || resolved.node.type !== 'dir') {
            return { error: `Folder not found: ${targetPath}` };
        }

        directory = resolved.node;
        resolvedPath = resolved.path;
    }

    if (!directory || !directory.children) {
        return { error: 'Directory error.' };
    }

    const entries = Object.entries(directory.children);
    const visibleEntries = entries.filter(([, item]) => isNodeVisible(item));

    if (visibleEntries.length === 0) {
        return {
            entries: [
                `DIRECTORY: ${resolvedPath}`,
                '',
                'No files found.'
            ],
            meta: {
                path: resolvedPath,
                itemCount: 0,
                action: 'list'
            }
        };
    }

    const formattedEntries = [
        `DIRECTORY: ${resolvedPath}`,
        ''
    ];

    for (const [name, item] of visibleEntries) {
        if (item.type === 'dir') {
            const lockedByFlag = item.requiredFlag && !hasFlag(item.requiredFlag);
            const isLocked = item.locked || lockedByFlag;
            const lockedSuffix = isLocked ? ' [LOCKED]' : '';
            formattedEntries.push(`[DIR] ${name}${lockedSuffix}`);
        } else {
            const lockedByFlag = item.requiredFlag && !hasFlag(item.requiredFlag);
            const isLocked = item.locked || lockedByFlag;
            const lockedSuffix = isLocked ? ' [LOCKED]' : '';
            formattedEntries.push(`[FILE] ${name}${lockedSuffix}`);
        }
    }

    return {
        entries: formattedEntries,
        meta: {
            path: resolvedPath,
            itemCount: visibleEntries.length,
            action: 'list'
        }
    };
}

// Change directory and return a result object for the terminal to print.
function changeDirectory(target) {
    if (!target) {
        return { error: 'Usage: move [folder|path]' };
    }

    const resolved = resolvePath(target);

    if (resolved.error) {
        return { error: resolved.error };
    }

    if (!resolved.node || resolved.node.type !== 'dir') {
        return { error: `Folder not found: ${target}. Use "list" to see available folders.` };
    }

    const lockedByFlag = resolved.node.requiredFlag && !hasFlag(resolved.node.requiredFlag);
    const isLocked = resolved.node.locked || lockedByFlag;

    if (isLocked) {
        return {
            error: 'Access denied.',
            meta: {
                path: formatCurrentPath(),
                target,
                action: 'move_denied'
            }
        };
    }

    currentPathSegments.length = 0;
    currentPathSegments.push(...resolved.segments);

    return {
        entries: [`Moved to ${resolved.path}`],
        meta: {
            path: resolved.path,
            target,
            action: 'move'
        }
    };
}

// Open a file and return printable lines for the terminal.
async function openFile(filePath) {
    syncProfileArchiveVisibility();

    if (!filePath) {
        return { error: 'Usage: open [file]' };
    }

    const resolved = resolvePath(filePath);

    if (resolved.error) {
        return { error: resolved.error };
    }

    if (!resolved.node || resolved.node.type !== 'file') {
        return { error: `File not found: ${filePath}. Use "list" to see available files.` };
    }

    const lockedByFlag = resolved.node.requiredFlag && !hasFlag(resolved.node.requiredFlag);
    const isLocked = resolved.node.locked || lockedByFlag;

    if (isLocked) {
        return {
            error: 'Access denied.'
        };
    }

    const fullPath = resolved.path;

    markFileRead(fullPath);

    if (resolved.node.onOpenFlag) {
        setFlag(resolved.node.onOpenFlag);
    }

    if (resolved.node.terms) {
        addDiscoveredTerms(resolved.node.terms);
    }

    const fileName = resolved.segments[resolved.segments.length - 1];
    let fileContentLines = [];

    try {
        fileContentLines = await loadNodeContent(resolved.node);
    } catch (_error) {
        return {
            error: 'Unable to load file content.'
        };
    }

    return {
        entries: [
            `--- ${fileName} ---`,
            ...fileContentLines,
            '--- END FILE ---'
        ],
        meta: {
            action: 'open',
            fileName,
            path: fullPath,
            terms: resolved.node.terms || [],
            onOpenFlag: resolved.node.onOpenFlag || null,
            imageAttachment: resolved.node.imageAttachment || null
        }
    };
}

// Create dossier-style lines for term search output.
function getSearchTermContextLines(term) {
    const metadata = (typeof TERM_METADATA !== 'undefined' && TERM_METADATA[term]) ? TERM_METADATA[term] : {};
    const label = metadata.label || term.toUpperCase();
    const typeLabel = metadata.type ? metadata.type.toUpperCase() : 'UNKNOWN';
    const summary = metadata.summary || `Fragmentary references indicate ${label} is relevant to active facility records.`;
    const classification = metadata.classification || 'PARTIAL // UNVERIFIED';
    const details = Array.isArray(metadata.details) ? metadata.details : [];

    const contextLines = [
        'TERM DOSSIER',
        `Label: ${label}`,
        `Type: ${typeLabel}`,
        `Summary: ${summary}`,
        `Classification: ${classification}`
    ];

    if (details.length > 0) {
        contextLines.push('');
        contextLines.push('Details:');

        for (const detail of details) {
            if (!detail) {
                continue;
            }

            contextLines.push(`- ${detail}`);
        }
    }

    return contextLines;
}

// Unlock any files tied to the searched term and return newly unlocked paths.
function unlockSearchTermFiles(term) {
    const metadata = (typeof TERM_METADATA !== 'undefined' && TERM_METADATA[term]) ? TERM_METADATA[term] : null;

    if (!metadata || !Array.isArray(metadata.unlocks)) {
        return [];
    }

    const unlockedPaths = [];

    for (const unlock of metadata.unlocks) {
        if (!unlock || !unlock.flag || !unlock.path) {
            continue;
        }

        if (hasFlag(unlock.flag)) {
            continue;
        }

        setFlag(unlock.flag);
        unlockedPaths.push(unlock.path);
    }

    return unlockedPaths;
}


// Search for a term in the discovered index and return results for the terminal.
function searchTerm(rawTerm) {
    syncProfileArchiveVisibility();

    if (!rawTerm) {
        return { error: 'Usage: search [term]' };
    }

    const term = normalizeTerm(rawTerm);

    if (typeof markTermSearched === 'function') {
        markTermSearched(term);
    }

    if (!hasDiscoveredTerm(term)) {
        return {
            error: `No archived reference found for: ${rawTerm}`,
            meta: {
                action: 'search_denied',
                term
            }
        };
    }

    const matches = SEARCH_INDEX[term] || [];

    const lines = [
        `SEARCH RESULTS FOR: ${term}`,
        ''
    ];

    if (matches.length === 0) {
        lines.push('No indexed results found.');
    } else {
        for (const match of matches) {
            lines.push(`[${match.type.toUpperCase()}] ${match.path}`);
        }
    }

    const termContextLines = getSearchTermContextLines(term);
    if (termContextLines.length > 0) {
        lines.push('');
        lines.push(...termContextLines);
    }

    const unlockedPaths = unlockSearchTermFiles(term);
    syncProfileArchiveVisibility();

    if (unlockedPaths.length > 0) {
        lines.push('');
        lines.push('[SYSTEM] Personnel archive updated.');
        for (const path of unlockedPaths) {
            lines.push(`[SYSTEM] Unlocked file: ${path}`);
        }
    }

    return {
        entries: lines,
        meta: {
            action: 'search',
            term,
            resultCount: matches.length,
            unlockedPaths
        }
    };
}






