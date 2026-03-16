// Camera metadata for the surveillance interface.
const CAMERA_METADATA = Object.freeze({

    avian_cellblock: {
        feedKey: 'avian_cellblock',
        label: 'Avian Cellblock',
    },

    containment_hallway_a: {
        feedKey: 'containment_hallway_a',
        label: 'Containment Hallway A',
    },

    research_lab_a: {
        feedKey: 'research_lab_a',
        label: 'Research Lab A',
    },

    testing_chamber: {
        feedKey: 'testing_chamber',
        label: 'Testing Chamber',
    },

    cafeteria: {
        feedKey: 'cafeteria',
        label: 'Cafeteria',
    }

});


// Camera availability by chapter index.
const CAMERA_AVAILABILITY_BY_CHAPTER = Object.freeze({

    // Chapter 2 unlocks the first surveillance feeds
    1: ['avian_cellblock', 'containment_hallway_a'],
    2: { feeds: ['avian_cellblock', 'containment_hallway_a', 'cafeteria'], requireFlag: 'chapter_02_complete' }

});


// Expose metadata for non-module script usage.
window.CAMERA_METADATA = CAMERA_METADATA;
window.CAMERA_AVAILABILITY_BY_CHAPTER = CAMERA_AVAILABILITY_BY_CHAPTER;
