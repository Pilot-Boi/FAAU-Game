function isDevTermUnlock(context = {}, term = '') {
    return context.action === 'dev_unlock_term' &&
        String(context.term || '').trim().toLowerCase() === String(term || '').trim().toLowerCase();
}

const EVENT_RULES = [
    /* CHAPTER 01 EVENTS */
    {
        id: 'first_contact_available',
        when: (context = {}) =>
            (hasFlag('read_network_status') && hasFlag('read_security_log')) ||
            (context.action === 'search' && context.term === 'subject_008'),
        do: () => {
            unlockCommand('msg');
            return [
                '',
                '[SYSTEM] Anomalous communication channel detected.',
                '[SYSTEM] External relay interface partially restored.',
                '[SYSTEM] New command unlocked: msg'
            ];
        }
    },

    {
        id: 'msg_alert_watts',
        when: (context = {}) =>
            (isCommandUnlocked('msg') && hasDiscoveredTerm('watts')) ||
            isDevTermUnlock(context, 'watts'),
        do: () => {
            return [
                '[SYSTEM] Relay status update: new communication available in msg.'
            ];
        }
    },

    {
        id: 'chapter_01_progress_complete',
        when: () =>
            hasFlag('chapter_01_entry_01') &&
            hasFlag('chapter_01_entry_02') &&
            hasFlag('chapter_01_entry_03') &&
            hasFlag('chapter_01_entry_04'),
        do: () => {
            setFlag('chapter_01_complete');
            return [
                '=== CHAPTER 1 COMPLETE: INITIAL CONTACT ==='
            ];
        }
    },

    /* CHAPTER 02 EVENTS */
    {
        id: 'sublevel_review_unlocked',
        when: () =>
            hasFlag('chapter_01_complete') &&
            hasDiscoveredTerm('sublevel') &&
            hasDiscoveredTerm('ebi') &&
            hasDiscoveredTerm('schnee'),
        do: () => {
            setFlag('sublevel_security_unlocked');
            return [
                '[SYSTEM] Security cross-reference updated.',
                '[SYSTEM] New file unlocked: /logs/sublevel_security.txt'
            ];
        }
    },

    {
        id: 'security_protocols_unlocked',
        when: () =>
            hasFlag('chapter_01_complete') &&
            hasDiscoveredTerm('containment'),
        do: () => {
            setFlag('security_protocols_unlocked');
            return [
                '[SYSTEM] Containment protocol reference located.',
                '[SYSTEM] New file unlocked: /staff/security_protocols.txt'
            ];
        }
    },

    {
        id: 'anomaly_correlation_unlocked',
        when: () =>
            hasFlag('chapter_01_complete') &&
            hasFlag('read_security_protocols') &&
            hasDiscoveredTerm('unknown_source') &&
            hasDiscoveredTerm('security'),
        do: () => {
            setFlag('anomaly_correlation_unlocked');
            return [
                '[SYSTEM] Anomalous event cross-correlation available.',
                '[SYSTEM] New file unlocked: /logs/anomaly_correlation.txt'
            ];
        }
    },

    {
        id: 'archive_notice_unlocked',
        when: () =>
            hasFlag('chapter_01_complete') &&
            hasDiscoveredTerm('restricted_archive'),
        do: () => {
            setFlag('archive_notice_unlocked');
            return [
                '[SYSTEM] Archive access memorandum recovered.',
                '[SYSTEM] New file unlocked: /staff/archive_notice.txt'
            ];
        }
    },

    {
        id: 'secure_access_granted',
        when: (context = {}) =>
                hasFlag('chapter_01_complete') &&
            (context.action === 'search' && context.term === 'avian'),
        do: () => {
            setFlag('secure_access_granted');
            return [
                '[SYSTEM] Security authorization override detected.',
                '[SYSTEM] Access credentials updated.',
                '[SYSTEM] New directory unlocked: secure'
            ];
        }
    },

    {
        id: 'msg_alert_secure_unlock',
        when: () =>
            hasFlag('chapter_01_complete') &&
            isCommandUnlocked('msg') &&
            hasFlag('secure_access_granted'),
        do: () => {
            return [
                '[SYSTEM] Relay status update: new communication available in msg.'
            ];
        }
    },

    {
        id: 'msg_alert_subject_002_read',
        when: () =>
            hasFlag('chapter_01_complete') &&

            isCommandUnlocked('msg') &&
            hasFlag('read_subject_002'),
        do: () => {
            return [
                '[SYSTEM] Relay status update: new communication available in msg.'
            ];
        }
    },

    {
        id: 'msg_alert_subject_003',
        when: (context = {}) =>
                hasFlag('chapter_01_complete') &&
            (isCommandUnlocked('msg') && hasDiscoveredTerm('subject_003')) ||
            hasFlag('read_subject_003'),
        do: () => {
            return [
                '[SYSTEM] Relay status update: new communication available in msg.'
            ];
        }
    },

    {
        id: 'cams_unlocked',
        when: () => {
            const containmentFilesRead = Array.from(GAME_STATE.filesRead)
                .filter(path => path.startsWith('/secure/containment/'));
            return hasFlag('chapter_01_complete') && containmentFilesRead.length >= 2;
        },
        do: () => {
            unlockCommand('cams');
            return [
                '[SYSTEM] Security subsystem detected.',
                '[SYSTEM] Surveillance interface partially restored.',
                '[SYSTEM] New command unlocked: cams'
            ];
        }
    },

    {
        id: 'msg_alert_chapter_02_end',
        when: () =>
            hasFlag('chapter_01_complete') &&
            isCommandUnlocked('msg') &&
            hasFlag('chapter_02_entry_01') &&
            hasFlag('chapter_02_entry_02') &&
            hasFlag('chapter_02_entry_03') &&
            hasFlag('chapter_02_entry_04') &&
            hasFlag('chapter_02_entry_05'),
        do: () => {
            return [
                '[SYSTEM] Relay status update: critical communication available in msg.'
            ];
        }
    },

    {
        id: 'chapter_02_progress_complete',
        when: () =>
            hasFlag('chapter_01_complete') &&
            hasFlag('chapter_02_entry_01') &&
            hasFlag('chapter_02_entry_02') &&
            hasFlag('chapter_02_entry_03') &&
            hasFlag('chapter_02_entry_04') &&
            hasFlag('chapter_02_entry_05') &&
            hasFlag('chapter_02_entry_06'),
        do: () => {
            setFlag('chapter_02_complete');
            return [
                '=== CHAPTER 2 COMPLETE: THROUGH THE GLASS ==='
            ];
        }
    },

    /* CHAPTER 03 EVENTS */
    {
        id: 'chapter_03_subject_files_unlocked',
        when: () =>
            hasFlag('chapter_02_complete'),
        do: () => {
            setFlag('subject_004_file_unlocked');
            setFlag('subject_005_file_unlocked');
            return [
                '[SYSTEM] Containment archive permissions updated.',
                '[SYSTEM] New file unlocked: /secure/subjects/subject_004.txt',
                '[SYSTEM] New file unlocked: /secure/subjects/subject_005.txt'
            ];
        }
    },

    {
        id: 'abilities_dir_unlocked',
        when: (context = {}) =>
            (hasFlag('chapter_02_complete')) &&
            (context.action === 'search' &&
            (context.term === 'wipe' || context.term === 'empathy' || context.term === 'healing')),
        do: () => {
            setFlag('abilities_dir_unlocked');
            return [
                '[SYSTEM] Behavioral profile archive link detected.',
                '[SYSTEM] New directory unlocked: /secure/abilities'
            ];
        }
    },

    {
        id: 'msg_alert_empathy',
        when: () =>
            hasFlag('abilities_dir_unlocked') &&
            isCommandUnlocked('msg') &&
            hasFlag('read_ability_empathy'),
        do: () => {
            return [
                '[SYSTEM] Relay status update: new communication available in msg.'
            ];
        }
    }
];


function evaluateEvents(context = {}) {
    const triggeredLines = [];

    for (const rule of EVENT_RULES) {
        if (hasTriggeredEvent(rule.id)) {
            continue;
        }

        if (!rule.when(context)) {
            continue;
        }

        triggerEvent(rule.id);

        const lines = rule.do(context) || [];
        triggeredLines.push(...lines);
    }

    return triggeredLines;
}


function applyEntryEffects(entry, unlockedTerms) {
    if (!entry) {
        return;
    }

    if (entry.setFlags) {
        for (const flag of entry.setFlags) {
            setFlag(flag);
        }
    }

    if (entry.unlockCommands) {
        for (const command of entry.unlockCommands) {
            unlockCommand(command);
        }
    }

    if (entry.discoverTerms) {
        addDiscoveredTerms(entry.discoverTerms);

        for (const term of entry.discoverTerms) {
            unlockedTerms.push(term);
        }
    }
}

function getContactSpeakerAliases(contactId) {
    const map = {
        watts: ['Dr. Watts'],
        subject_008: ['Test Subject 008', 'Subject 008', 'Jaune Arc'],
        subject_001: ['Subject 001', 'Emerald Sustrai', 'Emerald'],
        subject_002: ['Subject 002', 'Roman Torchwick', 'Roman'],
        subject_003: ['Subject 003', 'Hazel Rainart'],
        subject_004: ['Subject 004', 'Neo Politan'],
        subject_005: ['Subject 005', 'Tyrian Callows'],
        subject_006: ['Subject 006', 'Mercury Black'],
        subject_007: ['Subject 007', 'Cinder Fall'],
        salem: ['Director Salem', 'Salem', 'Director'],
        polendina: ['Dr. Pietro Polendina', 'Dr. Polendina'],
        ebi: ['Ebi', 'Clover Ebi'],
        schnee: ['Schnee', 'Winter Schnee']
    };

    return map[contactId] || [];
}

function buildStoryEntryKey(chapterId, entryIndex) {
    return `${chapterId}:${entryIndex}`;
}

function getEntrySpeaker(entry) {
    if (!entry) {
        return '';
    }

    if (typeof entry.speaker === 'string' && entry.speaker.trim()) {
        return entry.speaker;
    }

    if (!Array.isArray(entry.blocks)) {
        return '';
    }

    const speakerBlock = entry.blocks.find((block) => block && block.type === 'speaker' && typeof block.speaker === 'string');
    return speakerBlock ? speakerBlock.speaker : '';
}

function findUnreadReplyEntryForContact(chapter, contactId) {
    const speakerAliases = new Set(getContactSpeakerAliases(contactId));

    if (speakerAliases.size === 0) {
        return null;
    }

    for (let index = 0; index < chapter.entries.length; index += 1) {
        const entry = chapter.entries[index];
        const entrySpeaker = getEntrySpeaker(entry);

        if (!entry || entry.type !== 'reply' || !speakerAliases.has(entrySpeaker)) {
            continue;
        }

        const entryKey = buildStoryEntryKey(chapter.id, index);
        if (hasStoryEntryRead(entryKey)) {
            continue;
        }

        if (entry.requireEvent && !hasTriggeredEvent(entry.requireEvent)) {
            continue;
        }

        return {
            entry,
            entryIndex: index,
            entryKey
        };
    }

    return null;
}

function hasUnreadReplyEntries(chapter) {
    if (!chapter || !Array.isArray(chapter.entries)) {
        return false;
    }

    for (let index = 0; index < chapter.entries.length; index += 1) {
        const entry = chapter.entries[index];
        if (!entry || entry.type !== 'reply') {
            continue;
        }

        const entryKey = buildStoryEntryKey(chapter.id, index);
        if (!hasStoryEntryRead(entryKey)) {
            return true;
        }
    }

    return false;
}

function isCameraSceneEntry(entry) {
    return Boolean(entry) && entry.interface === 'cams' && entry.type === 'scene';
}

function hasUnreadCameraSceneEntries(chapter) {
    if (!chapter || !Array.isArray(chapter.entries)) {
        return false;
    }

    for (let index = 0; index < chapter.entries.length; index += 1) {
        const entry = chapter.entries[index];
        if (!isCameraSceneEntry(entry)) {
            continue;
        }

        const entryKey = buildStoryEntryKey(chapter.id, index);
        if (!hasStoryEntryRead(entryKey)) {
            return true;
        }
    }

    return false;
}

function shouldAdvanceChapter(chapter, chapterIndex) {
    if (!chapter || hasPlayedChapter(chapter.id)) {
        return false;
    }

    return !hasUnreadReplyEntries(chapter) && !hasUnreadCameraSceneEntries(chapter);
}

function advanceChapterIfComplete(chapter, chapterIndex) {
    if (!shouldAdvanceChapter(chapter, chapterIndex)) {
        return;
    }

    markChapterPlayed(chapter.id);
    applyChapterEffects(chapter);
    setCurrentChapterIndex(chapterIndex + 1);
}

function findNextCameraSceneEntryForFeed(chapter, feedId) {
    if (!chapter || !Array.isArray(chapter.entries) || !feedId) {
        return null;
    }

    for (let index = 0; index < chapter.entries.length; index += 1) {
        const entry = chapter.entries[index];

        if (!isCameraSceneEntry(entry) || entry.feedId !== feedId) {
            continue;
        }

        const entryKey = buildStoryEntryKey(chapter.id, index);
        if (hasStoryEntryRead(entryKey)) {
            continue;
        }

        if (entry.requireEvent && !hasTriggeredEvent(entry.requireEvent)) {
            continue;
        }

        return {
            entry,
            entryIndex: index,
            entryKey
        };
    }

    return null;
}

function findLatestCameraSceneEntryForFeed(chapter, feedId) {
    if (!chapter || !Array.isArray(chapter.entries) || !feedId) {
        return null;
    }

    for (let index = chapter.entries.length - 1; index >= 0; index -= 1) {
        const entry = chapter.entries[index];
        if (!isCameraSceneEntry(entry) || entry.feedId !== feedId) {
            continue;
        }

        return {
            entry,
            entryIndex: index,
            entryKey: buildStoryEntryKey(chapter.id, index)
        };
    }

    return null;
}

function formatSingleCameraEntry(chapter, entry, feedId, entryIndex, newlyUnlockedTerms) {
    const sceneBlocks = [];

    for (const block of Array.isArray(entry.blocks) ? entry.blocks : []) {
        if (!block || !block.type) {
            continue;
        }

        sceneBlocks.push({
            ...block,
            lines: Array.isArray(block.lines) ? [...block.lines] : block.lines
        });
    }

    return {
        entries: [
            'Restoring surveillance archive node...',
            'Routing camera playback stream...',
            '',
            'Camera playback ready.',
            'Feed Status: ACTIVE'
        ],
        meta: {
            action: 'camera_story',
            chapterId: chapter.id,
            feedId,
            entryIndex,
            unlockedTerms: newlyUnlockedTerms,
            sceneBlocks,
            title: entry.title || null
        }
    };
}

function findContextMessageForReply(chapter, replyIndex) {
    if (!chapter || !Array.isArray(chapter.entries)) {
        return null;
    }

    for (let index = replyIndex - 1; index >= 0; index -= 1) {
        const entry = chapter.entries[index];
        if (entry && entry.type === 'message') {
            return entry;
        }
    }

    return null;
}

function formatSingleMessageEntry(chapter, entry, contactId, entryIndex, newlyUnlockedTerms) {
    const contextMessage = findContextMessageForReply(chapter, entryIndex);
    const sceneBlocks = [];

    if (contextMessage) {
        if (Array.isArray(contextMessage.blocks) && contextMessage.blocks.length > 0) {
            for (const block of contextMessage.blocks) {
                if (!block || !block.type) {
                    continue;
                }

                sceneBlocks.push({
                    ...block,
                    lines: Array.isArray(block.lines) ? [...block.lines] : block.lines
                });
            }
        } else {
            sceneBlocks.push({
                type: 'message_header',
                sender: contextMessage.sender
            });

            sceneBlocks.push({
                type: 'message_body',
                lines: contextMessage.lines || []
            });
        }
    }

    if (entry.type === 'reply') {
        if (Array.isArray(entry.blocks) && entry.blocks.length > 0) {
            for (const block of entry.blocks) {
                if (!block || !block.type) {
                    continue;
                }

                sceneBlocks.push({
                    ...block,
                    lines: Array.isArray(block.lines) ? [...block.lines] : block.lines
                });
            }
        } else {
            sceneBlocks.push({
                type: 'speaker',
                speaker: entry.speaker
            });

            sceneBlocks.push({
                type: 'dialogue',
                lines: entry.lines || []
            });
        }
    }


    return {
        entries: [
            'Establishing anomalous relay...',
            'Routing targeted transmission channel...',
            '',
            'Connection established.',
            'Channel Status: UNSTABLE'
        ],
        meta: {
            action: 'story',
            chapterId: chapter.id,
            contactId,
            entryIndex,
            unlockedTerms: newlyUnlockedTerms,
            sceneBlocks
        }
    };
}


function formatChapterScene(chapter) {
    const lines = [
        'Establishing anomalous relay...',
        'Routing external transmission channel...',
        '',
        'Connection established.',
        'Channel Status: UNSTABLE',
        ''
    ];

    const newlyUnlockedTerms = [];

    for (const entry of chapter.entries) {
        if (entry.type === 'system') {
            lines.push(`[SYSTEM] ${entry.lines.join(' ')}`);
            lines.push('');
            applyEntryEffects(entry, newlyUnlockedTerms);
            continue;
        }

        if (entry.type === 'message') {
            lines.push('INCOMING TRANSMISSION');
            for (const line of entry.lines) {
                lines.push(line);
            }
            lines.push(`- ${entry.sender}`);
            lines.push('');
            applyEntryEffects(entry, newlyUnlockedTerms);
            continue;
        }

        if (entry.type === 'reply') {
            lines.push(`${entry.speaker}:`);
            for (const line of entry.lines) {
                lines.push(line);
            }
            lines.push('');
            applyEntryEffects(entry, newlyUnlockedTerms);
            continue;
        }
    }

    if (newlyUnlockedTerms.length > 0) {
        lines.push('[SYSTEM] Archive updated.');
        for (const term of newlyUnlockedTerms) {
            lines.push(`[SYSTEM] New keyword archived: ${formatTermForOutput(term)}`);
        }
    }

    return {
        entries: lines,
        meta: {
            action: 'story',
            chapterId: chapter.id,
            unlockedTerms: newlyUnlockedTerms
        }
    };
}


function applyChapterEffects(chapter) {
    if (!chapter) {
        return;
    }

    if (chapter.setFlags) {
        for (const flag of chapter.setFlags) {
            setFlag(flag);
        }
    }

    if (chapter.unlockCommands) {
        for (const command of chapter.unlockCommands) {
            unlockCommand(command);
        }
    }

    if (chapter.discoverTerms) {
        addDiscoveredTerms(chapter.discoverTerms);
    }
}


function openMessageInterface(contactId) {
    if (!hasTriggeredEvent('first_contact_available')) {
        return {
            error: 'No communication channels available.'
        };
    }

    if (!contactId) {
        return {
            error: 'No contact selected.'
        };
    }

    const chapterIndex = getCurrentChapterIndex();
    const chapter = getChapterByIndex(chapterIndex);

    if (!chapter) {
        return {
            entries: [
                'No new incoming transmissions.',
                'Relay remains unstable.'
            ],
            meta: {
                action: 'story_end'
            }
        };
    }

    const unreadReply = findUnreadReplyEntryForContact(chapter, contactId);

    if (!unreadReply) {
        return {
            entries: [
                'No unread transmissions for this contact.',
                'Relay remains unstable.'
            ],
            meta: {
                action: 'story_none',
                chapterId: chapter.id,
                contactId
            }
        };
    }

    const newlyUnlockedTerms = [];
    applyEntryEffects(unreadReply.entry, newlyUnlockedTerms);
    markStoryEntryRead(unreadReply.entryKey);

    advanceChapterIfComplete(chapter, chapterIndex);

    return formatSingleMessageEntry(
        chapter,
        unreadReply.entry,
        contactId,
        unreadReply.entryIndex,
        newlyUnlockedTerms
    );

}

function openCameraSceneInterface(feedId) {
    if (!feedId) {
        return null;
    }

    const chapterIndex = getCurrentChapterIndex();
    const chapter = getChapterByIndex(chapterIndex);

    if (!chapter) {
        return null;
    }

    const nextEntry = findNextCameraSceneEntryForFeed(chapter, feedId);

    if (nextEntry) {
        const newlyUnlockedTerms = [];
        applyEntryEffects(nextEntry.entry, newlyUnlockedTerms);
        markStoryEntryRead(nextEntry.entryKey);
        advanceChapterIfComplete(chapter, chapterIndex);

        return formatSingleCameraEntry(
            chapter,
            nextEntry.entry,
            feedId,
            nextEntry.entryIndex,
            newlyUnlockedTerms
        );
    }

    const latestEntry = findLatestCameraSceneEntryForFeed(chapter, feedId);
    if (!latestEntry) {
        return null;
    }

    return formatSingleCameraEntry(
        chapter,
        latestEntry.entry,
        feedId,
        latestEntry.entryIndex,
        []
    );
}
