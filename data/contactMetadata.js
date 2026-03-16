// Contact metadata for the communications interface.
const CONTACT_METADATA = Object.freeze({
    
    subject_001: {
        termKey: 'subject_001',
        label: 'Subject 001',
        revealedNames: [
            { term: 'emerald', label: 'Emerald Sustrai' }
        ]
    },
    subject_002: {
        termKey: 'subject_002',
        label: 'Subject 002',
        revealedNames: [
            { term: 'roman', label: 'Roman Torchwick' }
        ]
    },
    subject_003: {
        termKey: 'subject_003',
        label: 'Subject 003',
        revealedNames: [
            { term: 'hazel', label: 'Hazel Rainart' }
        ]
    },
    subject_004: {
        termKey: 'subject_004',
        label: 'Subject 004',
        revealedNames: [
            { term: 'neo', label: 'Neo Politan' }
        ]
    },
    subject_005: {
        termKey: 'subject_005',
        label: 'Subject 005',
        revealedNames: [
            { term: 'tyrian', label: 'Tyrian Callows' }
        ]
    },
    subject_006: {
        termKey: 'subject_006',
        label: 'Subject 006',
        revealedNames: [
            { term: 'mercury', label: 'Mercury Black' }
        ]
    },
    subject_007: {
        termKey: 'subject_007',
        label: 'Subject 007',
        revealedNames: [
            { term: 'cinder', label: 'Cinder Fall' }
        ]
    },
    subject_008: {
        termKey: 'subject_008',
        label: 'Subject 008',
        revealedNames: [
            { term: 'jaune', label: 'Jaune Arc' }
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

// Availability by chapter index. Chapter 1 allows only Watts and Subject 008.
const CONTACT_AVAILABILITY_BY_CHAPTER = Object.freeze({
    0: ['watts', 'subject_008']
});

// Expose metadata for non-module script usage.
window.CONTACT_METADATA = CONTACT_METADATA;
window.CONTACT_AVAILABILITY_BY_CHAPTER = CONTACT_AVAILABILITY_BY_CHAPTER;
