// Camera metadata for the surveillance interface.
const CAMERA_METADATA = Object.freeze({

    avian_cellblock: {
        feedKey: 'avian_cellblock',
        label: 'Avian Cellblock',
        description: 'Primary containment block for active avian subjects.'
    },

    containment_hallway_a: {
        feedKey: 'containment_hallway_a',
        label: 'Containment Hallway A',
        description: 'Corridor surveillance covering subject transport routes.'
    }

});


// Camera availability by chapter index.
const CAMERA_AVAILABILITY_BY_CHAPTER = Object.freeze({

    // Chapter 2 unlocks the first surveillance feeds
    1: ['avian_cellblock', 'containment_hallway_a']

});


// Expose metadata for non-module script usage.
window.CAMERA_METADATA = CAMERA_METADATA;
window.CAMERA_AVAILABILITY_BY_CHAPTER = CAMERA_AVAILABILITY_BY_CHAPTER;
