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

// Expose metadata for non-module script usage.
window.CAMERA_METADATA = CAMERA_METADATA;
