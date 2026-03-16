// Contact metadata for the communications interface.
const CONTACT_METADATA = Object.freeze({
    
    subject_001: {
        termKey: 'subject_001',
        label: 'Subject 001',
        dialogueUnlockEvent: 'msg_alert_subject_003',
        revealOnFileRead: '/secure/subjects/subject_001.txt',
        revealedNames: [
            { term: 'emerald', label: 'Emerald Sustrai' }
        ]
    },
    subject_002: {
        termKey: 'subject_002',
        label: 'Subject 002',
        dialogueUnlockEvent: 'msg_alert_subject_002_read',
        revealOnFileRead: '/secure/subjects/subject_002.txt',
        revealedNames: [
            { term: 'roman', label: 'Roman Torchwick' }
        ]
    },
    subject_003: {
        termKey: 'subject_003',
        label: 'Subject 003',
        revealOnFileRead: '/secure/subjects/subject_003.txt',
        revealedNames: [
            { term: 'hazel', label: 'Hazel Rainart' }
        ]
    },
    subject_004: {
        termKey: 'subject_004',
        label: 'Subject 004',
        revealOnFileRead: '/secure/subjects/subject_004.txt',
        revealedNames: [
            { term: 'neo', label: 'Neo Politan' }
        ]
    },
    subject_005: {
        termKey: 'subject_005',
        label: 'Subject 005',
        revealOnFileRead: '/secure/subjects/subject_005.txt',
        revealedNames: [
            { term: 'tyrian', label: 'Tyrian Callows' }
        ]
    },
    subject_006: {
        termKey: 'subject_006',
        label: 'Subject 006',
        revealOnFileRead: '/secure/subjects/subject_006.txt',
        revealedNames: [
            { term: 'mercury', label: 'Mercury Black' }
        ]
    },
    subject_007: {
        termKey: 'subject_007',
        label: 'Subject 007',
        revealOnFileRead: '/secure/subjects/subject_007.txt',
        revealedNames: [
            { term: 'cinder', label: 'Cinder Fall' }
        ]
    },
    subject_008: {
        termKey: 'subject_008',
        label: 'Subject 008',
        revealOnFileRead: '/secure/subjects/subject_008.txt',
        revealedNames: [
            { term: 'jaune', label: 'Jaune Arc' }
        ]
    },
    salem: {
        termKey: 'salem',
        label: 'Director',
        dialogueUnlockEvent: 'msg_alert_chapter_02_end',
        revealOnFlag: 'chapter_01_complete',
        revealedNames: [
            { term: 'salem', label: 'Director Salem' }
        ]
    },
    polendina: {
        termKey: 'polendina',
        label: 'Dr. Polendina'
    },
    ebi: {
        termKey: 'ebi',
        label: 'Clover Ebi'
    },
    schnee: {
        termKey: 'schnee',
        label: 'Winter Schnee'
    },
    watts: {
        termKey: 'watts',
        label: 'Dr. Watts'
    }
});

// Expose metadata for non-module script usage.
window.CONTACT_METADATA = CONTACT_METADATA;
