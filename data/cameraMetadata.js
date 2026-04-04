// Camera metadata for the surveillance interface.
const CAMERA_METADATA = Object.freeze({

    // INSIDE THE FACILITY
    avian_cellblock: {
        feedKey: 'avian_cellblock',
        label: 'Avian Cellblock',
    },

    containment_hallway_a: {
        feedKey: 'containment_hallway_a',
        label: 'Containment Hallway A',
    },

    containment_hallway_b: {
        feedKey: 'containment_hallway_b',
        label: 'Containment Hallway B',
    },

    research_lab_a: {
        feedKey: 'research_lab_a',
        label: 'Research Lab A',
    },

    containment_chamber: {
        feedKey: 'containment_chamber',
        label: 'Containment Chamber',
    },

    testing_chamber: {
        feedKey: 'testing_chamber',
        label: 'Testing Chamber',
    },

    cafeteria: {
        feedKey: 'cafeteria',
        label: 'Cafeteria',
    },

    // OUTSIDE THE FACILITY
    ozpin_pine_house: {
        feedKey: 'ozpin_pine_house',
        label: 'Ozpin-Pine House',
    },

});

// Expose metadata for non-module script usage.
window.CAMERA_METADATA = CAMERA_METADATA;
