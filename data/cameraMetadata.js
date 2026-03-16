// Surveillance feed metadata for the cams interface.
const CAMERA_FEED_METADATA = Object.freeze({
    cellblock_a: {
        label: 'CELLBLOCK_A',
        camera: 'CELLBLOCK_A',
        status: 'LIVE',
        recording: 'ENABLED',
        requiredFlags: ['read_containment_overview'],
        sceneBlocks: [
            {
                type: 'camera_header',
                camera: 'CELLBLOCK_A',
                timestamp: '03:12:44'
            },
            {
                type: 'camera_narration',
                lines: [
                    'Archive segment restored from containment node A.',
                    'Three occupied cells remain visible through low-light interference.'
                ]
            },
            {
                type: 'camera_divider',
                text: 'SEGMENT BREAK'
            },
            {
                type: 'camera_action',
                lines: [
                    'Subject 001 sits near the rear wall, folding and unfolding a ration wrapper.',
                    'Subject 002 paces the corridor threshold in short, measured loops.',
                    'Subject 003 watches the ceiling speakers without moving.'
                ]
            }
        ]
    },
    restraint_hall: {
        label: 'RESTRAINT_HALL',
        camera: 'RESTRAINT_HALL',
        status: 'LIVE',
        recording: 'ENABLED',
        requiredFlags: ['read_protocol_overview'],
        sceneBlocks: [
            {
                type: 'camera_header',
                camera: 'RESTRAINT_HALL',
                timestamp: '04:48:09'
            },
            {
                type: 'camera_narration',
                lines: [
                    'Hall feed recovered with partial audio annotations removed.',
                    'Restraint frames line the chamber in a staggered maintenance configuration.'
                ]
            },
            {
                type: 'camera_action',
                lines: [
                    'A technician cart remains parked beneath the west light bank.',
                    'Indicator panels cycle from amber to green in synchronized intervals.'
                ]
            }
        ]
    },
    vocal_chamber: {
        label: 'VOCAL_CHAMBER',
        camera: 'VOCAL_CHAMBER',
        status: 'ARCHIVED',
        recording: 'ENABLED',
        requiredFlags: ['read_vocal_restraint_protocol'],
        sceneBlocks: [
            {
                type: 'camera_header',
                camera: 'VOCAL_CHAMBER',
                timestamp: '01:06:31'
            },
            {
                type: 'camera_narration',
                lines: [
                    'Playback restored from a restricted vocal suppression archive.',
                    'The chamber door seal remains intact for the duration of the segment.'
                ]
            },
            {
                type: 'camera_divider'
            },
            {
                type: 'camera_action',
                lines: [
                    'Subject 007 leans toward the observation glass, then steps back when the ceiling emitter powers on.',
                    'Subject 002 turns away and braces against the rear restraint rail.'
                ]
            }
        ]
    },
    barrier_walkway: {
        label: 'BARRIER_WALKWAY',
        camera: 'BARRIER_WALKWAY',
        status: 'ARCHIVED',
        recording: 'ENABLED',
        requiredFlags: ['read_observation_barrier_protocol'],
        sceneBlocks: [
            {
                type: 'camera_header',
                camera: 'BARRIER_WALKWAY',
                timestamp: '05:27:52'
            },
            {
                type: 'camera_narration',
                lines: [
                    'Observation catwalk feed exhibits minor scan tearing along the lower frame.',
                    'Barrier projectors obscure most of the central holding floor.'
                ]
            },
            {
                type: 'camera_action',
                lines: [
                    'Two staff silhouettes cross the upper walkway carrying sealed casework.',
                    'A barrier emitter spikes briefly before stabilizing at baseline output.'
                ]
            }
        ]
    }
});

window.CAMERA_FEED_METADATA = CAMERA_FEED_METADATA;
