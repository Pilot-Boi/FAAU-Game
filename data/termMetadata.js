// Canonical term metadata used by search, contacts, and UI rendering.
const TERM_METADATA = Object.freeze({
    // Concepts
    unknown_source: {
        label: 'Unknown Source',
        type: 'concept',
        summary: [
            'SYSTEM CLASSIFICATION: External signal origin cannot be identified.',
            'Connection attempts associated with this designation do not correspond to any known Facility network, personnel device, or authorized relay.',
            'Monitoring protocols remain active while source identification procedures continue.'
        ]
    },
    restricted_archive: {
        label: 'Restricted Archive',
        type: 'concept',
        summary: [
            'Classification marker used for records excluded from standard directory indexing.',
            'Access is limited to authorized personnel or temporary review exemptions granted by Security Operations.'
        ]
    },
    abilities: {
        label: 'Abilities',
        type: 'concept',
        summary: [
            'Classification category for documented anomalous abilities observed in certain subjects.',
            'Research into the origin, mechanics, and potential applications of these abilities is ongoing.',
            'Documentation is currently classified and access is restricted to personnel with Level 4 clearance or higher.',
        ]
    },

    // Locations
    sublevel: {
        label: 'Sublevel',
        type: 'location',
        summary: [
            'CLASSIFIED: Access to project summary and documentation is restricted to personnel with Level 5 clearance or higher.',
        ]
    },

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

    ironwood: {
        label: 'General J. Ironwood',
        type: 'person',
        unlocks: [
            { flag: 'profile_ironwood_unlocked', path: '/staff/profiles/ironwood_profile.txt' }
        ],
        summary: [
            'General Ironwood serves as the Facility Commander and oversees all operational divisions, including Research, Security, and Command.',
        ]
    },
    polendina: {
        label: 'Dr. P. Polendina',
        type: 'person',
        unlocks: [
            { flag: 'profile_polendina_unlocked', path: '/staff/profiles/polendina_profile.txt' }
        ],
        summary: [
            'Dr. Polendina is a senior researcher and the Head of the Bioengineering Division, specializing in biomechanical augmentation and prosthetic development.',
        ]
    },
    watts: {
        label: 'Dr. A. Watts',
        type: 'person',
        unlocks: [
            { flag: 'profile_watts_unlocked', path: '/staff/profiles/watts_profile.txt' }
        ],
        summary: [
            'Dr. Watts is a senior researcher and the Head of the Genetics Division, specializing in genomic research and engineered physiological traits.',
        ]
    },
    ebi: {
        label: 'Specialist C. Ebi',
        type: 'person',
        unlocks: [
            { flag: 'profile_ebi_unlocked', path: '/staff/profiles/ebi_profile.txt' }
        ],
        summary: [
            'Specialist Ebi is a senior security officer and the Head of Security Operations, specializing in facility security protocols and personnel safety.',
        ]
    },
    schnee: {
        label: 'Specialist W. Schnee',
        type: 'person',
        unlocks: [
            { flag: 'profile_schnee_unlocked', path: '/staff/profiles/schnee_profile.txt' }
        ],
        summary: [
            'Specialist Schnee is a senior security officer and the Head of Containment Operations, specializing in secured research environments and subject monitoring protocols.',
        ]
    },

    subject_001: { label: 'Subject 001', type: 'person' },
    subject_002: { label: 'Subject 002', type: 'person' },
    subject_003: { label: 'Subject 003', type: 'person' },
    subject_004: { label: 'Subject 004', type: 'person' },
    subject_005: { label: 'Subject 005', type: 'person' },
    subject_006: { label: 'Subject 006', type: 'person' },
    subject_007: { label: 'Subject 007', type: 'person' },
    subject_008: { label: 'Subject 008', type: 'person' },

    // Projects
    achilles: {
        label: 'Achilles',
        type: 'project',
        summary: [
            'The ACHILLES system integrates layered actuator bundles with adaptive balance stabilization and real-time neural interface feedback.',
            'Research efforts are directed toward creating prosthetic platforms capable of maintaining long-term operational stability under high physical stress conditions.',
            'Prototype systems are designed to maintain compatibility with multiple neural interface technologies currently under investigation by the Genetics Division.',
            'The project represents a major milestone in the Facility’s efforts to develop biomechanical augmentation systems that function as natural extensions of the host body.'
        ]
    },
    // Species
    avian: {
        label: 'Avian',
        type: 'species',
        summary: [
            'CLASSIFIED: Access to project summary and documentation is restricted to personnel with Level 4 clearance or higher.',
        ]
    },
    hybrid: {
        label: 'Hybrid',
        type: 'species',
        summary: [
            'Hybrids are the dominant sapient species of Remnant and represent the baseline population served by most modern institutions and research organizations.',
            'Hybrid physiology combines humanoid anatomical structure with one or more animal-derived physical traits. These traits vary widely between individuals and may include external features such as ears, tails, claws, wings, or digitigrade limb structures, as well as distinct pigmentation patterns and sensory adaptations.',
            'The specific combination of traits differs from person to person and does not correspond to rigid biological classifications. Genetic variation between hybrid lineages is extensive, and the appearance of traits across generations does not always follow predictable inheritance patterns.',
            'Despite this variation, hybrid populations share a common humanoid physiology and are fully compatible with modern medical treatment, augmentation systems, and standard technological infrastructure.',
            'The Facility conducts research and development programs intended to improve quality of life, medical recovery outcomes, and long-term survivability for hybrid populations through advancements in bioengineering, genetics, and adaptive physiology.'
        ]
    },

    // Systems
    intercom: {
        label: 'Facility Intercom System',
        type: 'system',
        summary: [
            'The intercom network operates through a series of localized communication nodes installed throughout the Facility.',
            'Security protocols restrict access to system-wide broadcast functions to authorized personnel within Security Operations and Command divisions.',
            'The system is also capable of localized communication routing between designated laboratory corridors and operational sectors.',
            'Recent incident logs indicate irregular audio activity detected within portions of the intercom network during anomalous system events.'
        ]
    },
    security: {
        label: 'Facility Security System',
        type: 'system',
        summary: [
            'Security personnel maintain monitoring stations responsible for surveillance systems, biometric access points, and internal communications security.',
            'The division is also responsible for coordinating containment response procedures should laboratory incidents or facility breaches occur.',
            'Security Operations maintains regular coordination with Command and Research leadership to ensure operational continuity across the Facility.',
            'Several areas of the Facility operate under restricted access policies enforced by Security Operations.'
        ]
    },
    containment: {
        label: 'Containment Operations',
        type: 'system',
        summary: [
            'Operational framework governing secured research environments and subject monitoring protocols.',
            'Includes biometric tracking, restricted corridor access, and incident response procedures managed by Security Operations.'
        ]
    },

    // Disciplines
    bioengineering: {
        label: 'Bioengineering',
        type: 'discipline',
        summary: [
            'Primary research efforts include actuator-based prosthetics, adaptive skeletal reinforcement systems, and regenerative support technologies designed to stabilize severe physiological trauma.',
            'The division maintains close coordination with Genetics and Adaptive Physiology research teams when projects require biological modeling or neurological interface integration.',
            'Current development priorities emphasize durability, neural responsiveness, and long-term compatibility between synthetic components and organic tissue.',
            'Bioengineering research programs form a foundational component of the Facility’s augmentation and recovery infrastructure.'
        ]
    },
    genetics: {
        label: 'Genetics',
        type: 'discipline',
        summary: [
            'Research activities include genome mapping, engineered physiological traits, and biological system modeling designed to predict structural adaptation under extreme conditions.',
            'The division provides biological modeling support for several cross-disciplinary programs involving augmentation systems and physiological adaptation studies.',
            'Genetics research is frequently integrated with neural interface experimentation and adaptive physiology modeling to evaluate long-term biological stability.',
            'Due to the complexity of genomic manipulation research, several projects within the division operate under restricted documentation protocols.'
        ]
    },

    // Technologies
    neural_interface: {
        label: 'Neural Interface Systems',
        type: 'technology',
        summary: [
            'Neural interface research focuses on decoding motor cortex activity and converting these signals into responsive command structures.',
            'The technology is frequently used in conjunction with biomechanical prosthetics and augmentation platforms.',
            'Early prototypes have demonstrated the ability to synchronize mechanical systems with natural neural activity.',
            'Ongoing research aims to reduce signal latency and improve long-term neurological compatibility between host and interface.'
        ]
    },
    prosthetics: {
        label: 'Advanced Prosthetics',
        type: 'technology',
        summary: [
            'Modern prosthetic designs incorporate layered actuator systems capable of producing precise mechanical movement.',
            'Integration with neural interface systems allows prosthetics to respond directly to biological motor commands.',
            'Research efforts emphasize durability, responsiveness, and long-term physiological compatibility.',
            'Prosthetic research programs frequently collaborate with regenerative medicine initiatives to improve recovery outcomes following severe injury.'
        ]
    },

    // Abilities
    wipe: {
        label: 'Wipe',
        type: 'ability',
    },
    empathy: {
        label: 'Empathy',
        type: 'ability',
    },
    healing: {
        label: 'Healing',
        type: 'ability',
    }
});

// Expose metadata for non-module script usage.
window.TERM_METADATA = TERM_METADATA;
