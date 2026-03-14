// Canonical term metadata used by search, contacts, and UI rendering.
const TERM_METADATA = Object.freeze({
    // Concepts
    unknown_source: { label: 'Unknown Source', type: 'concept' },

    // Disciplines
    bioengineering: { label: 'Bioengineering', type: 'discipline' },
    genetics: { label: 'Genetics', type: 'discipline' },

    // Locations
    sublevel: { label: 'Sublevel', type: 'location' },

    // People
    director: { label: 'Director', type: 'person' },
    salem: { label: 'Salem', type: 'person' },

    ruby: { label: 'Ruby Rose', type: 'person' },
    weiss: { label: 'Weiss Schnee', type: 'person' },
    blake: { label: 'Blake Belladonna', type: 'person' },
    yang: { label: 'Yang Xiao Long', type: 'person' },
    jaune: { label: 'Jaune Arc', type: 'person' },
    nora: { label: 'Nora Valkyrie', type: 'person' },
    ren: { label: 'Lie Ren', type: 'person' },
    pyrrha: { label: 'Pyrrha Nikos', type: 'person' },
    oscar: { label: 'Oscar Pine', type: 'person' },

    cinder: { label: 'Cinder Fall', type: 'person' },
    emerald: { label: 'Emerald Sustrai', type: 'person' },
    hazel: { label: 'Hazel Rainart', type: 'person' },
    mercury: { label: 'Mercury Black', type: 'person' },
    neo: { label: 'Neo Politan', type: 'person' },
    roman: { label: 'Roman Torchwick', type: 'person' },
    tyrian: { label: 'Tyrian Callows', type: 'person' },

    qrow: { label: 'Qrow Branwen', type: 'person' },
    ozpin: { label: 'Ozpin', type: 'person' },
    taiyang: { label: 'Taiyang Xiao Long', type: 'person' },
    raven: { label: 'Raven Branwen', type: 'person' },
    summer: { label: 'Summer Rose', type: 'person' },
    glynda: { label: 'Glynda Goodwitch', type: 'person' },
    peach: { label: 'Dr. Peach', type: 'person' },

    ironwood: { label: 'General Ironwood', type: 'person' },
    polendina: { label: 'Dr. Polendina', type: 'person' },
    watts: { label: 'Dr. Watts', type: 'person' },
    ebi: { label: 'Clover Ebi', type: 'person' },
    schnee: { label: 'Winter Schnee', type: 'person' },

    subject_001: { label: 'Subject 001', type: 'person' },
    subject_002: { label: 'Subject 002', type: 'person' },
    subject_003: { label: 'Subject 003', type: 'person' },
    subject_004: { label: 'Subject 004', type: 'person' },
    subject_005: { label: 'Subject 005', type: 'person' },
    subject_006: { label: 'Subject 006', type: 'person' },
    subject_007: { label: 'Subject 007', type: 'person' },
    subject_008: { label: 'Subject 008', type: 'person' },

    // Projects
    achilles: { label: 'Achilles', type: 'project' },
    seraph: { label: 'Seraph', type: 'project' },

    // Species
    avian: { label: 'Avian', type: 'species' },
    hybrid: { label: 'Hybrid', type: 'species' },

    // Systems
    intercom: { label: 'Intercom', type: 'system' },
    security: { label: 'Security', type: 'system' },

    // Technologies
    neural_interface: { label: 'Neural Interface', type: 'technology' },
    prosthetics: { label: 'Prosthetics', type: 'technology' }
});

// Expose metadata for non-module script usage.
window.TERM_METADATA = TERM_METADATA;
