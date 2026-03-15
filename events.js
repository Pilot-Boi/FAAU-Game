const EVENT_RULES = [
    {
        id: 'first_contact_available',
        when: () =>
            hasFlag('read_network_status') &&
            hasFlag('read_security_log'),
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
        id: 'sublevel_review_unlocked',
        when: () =>
            hasDiscoveredTerm('sublevel') &&
            hasDiscoveredTerm('ebi') &&
            hasDiscoveredTerm('schnee'),
        do: () => {
            setFlag('sublevel_security_review_unlocked');
            return [
                '[SYSTEM] Security cross-reference updated.',
                '[SYSTEM] New file unlocked: /logs/sublevel_security_review.txt'
            ];
        }
    },

    {
        id: 'security_protocols_unlocked',
        when: () =>
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
        id: 'archive_access_notice_unlocked',
        when: () =>
            hasDiscoveredTerm('restricted_archive'),
        do: () => {
            setFlag('archive_access_notice_unlocked');
            return [
                '[SYSTEM] Archive access memorandum recovered.',
                '[SYSTEM] New file unlocked: /staff/archive_access_notice.txt'
            ];
        }
    },

    {
        id: 'secure_access_granted',
        when: () =>
            hasDiscoveredTerm('avian'),
        do: () => {
            setFlag('secure_access_granted');
            return [
                '[SYSTEM] Security authorization override detected.',
                '[SYSTEM] Access credentials updated.',
                '[SYSTEM] Secure archive directory unlocked.'
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
        subject_001: ['Subject 001', 'Emerald Sustrai'],
        subject_002: ['Subject 002', 'Roman Torchwick'],
        subject_003: ['Subject 003', 'Hazel Rainart'],
        subject_004: ['Subject 004', 'Neo Politan'],
        subject_005: ['Subject 005', 'Tyrian Callows'],
        subject_006: ['Subject 006', 'Mercury Black'],
        subject_007: ['Subject 007', 'Cinder Fall'],
        polendina: ['Dr. Pietro Polendina', 'Dr. Polendina'],
        ebi: ['Ebi', 'Clover Ebi'],
        schnee: ['Schnee', 'Winter Schnee']
    };

    return map[contactId] || [];
}

function buildStoryEntryKey(chapterId, entryIndex) {
    return `${chapterId}:${entryIndex}`;
}

function findUnreadReplyEntryForContact(chapter, contactId) {
    const speakerAliases = new Set(getContactSpeakerAliases(contactId));

    if (speakerAliases.size === 0) {
        return null;
    }

    for (let index = 0; index < chapter.entries.length; index += 1) {
        const entry = chapter.entries[index];

        if (!entry || entry.type !== 'reply' || !speakerAliases.has(entry.speaker)) {
            continue;
        }

        const entryKey = buildStoryEntryKey(chapter.id, index);
        if (hasStoryEntryRead(entryKey)) {
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
    const conversation = [];

    if (contextMessage) {
        conversation.push({
            side: 'right',
            sender: contextMessage.sender,
            lines: contextMessage.lines || []
        });
    }

    if (entry.type === 'reply') {
        conversation.push({
            side: 'left',
            sender: entry.speaker,
            lines: entry.lines || []
        });
    }

    const lines = [
        'Establishing anomalous relay...',
        'Routing targeted transmission channel...',
        '',
        'Connection established.',
        'Channel Status: UNSTABLE',
        ''
    ];

    if (entry.type === 'reply') {
        lines.push(`${entry.speaker}:`);
        for (const line of entry.lines) {
            lines.push(line);
        }
        lines.push('');
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
            contactId,
            entryIndex,
            unlockedTerms: newlyUnlockedTerms,
            conversation
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

    if (!hasUnreadReplyEntries(chapter) && !hasPlayedChapter(chapter.id)) {
        markChapterPlayed(chapter.id);
        applyChapterEffects(chapter);
        setCurrentChapterIndex(chapterIndex + 1);
    }

    return formatSingleMessageEntry(
        chapter,
        unreadReply.entry,
        contactId,
        unreadReply.entryIndex,
        newlyUnlockedTerms
    );

}
