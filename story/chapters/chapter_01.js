/*
Dummy entry templates for Chapter 02

MSG pair entry example (header, body, speaker, dialogue, narration, divider):
{
    interface: 'msg',
    type: 'reply',
    speaker: 'Test Subject 008',
    discoverTerms: ['example_term'],
    setFlags: ['example_msg_flag'],
    blocks: [
        {
            type: 'message_header',
            sender: 'Example Sender'
        },
        {
            type: 'message_body',
            lines: [
                'Primary message line.',
                'Secondary message line.'
            ]
        },
        {
            type: 'speaker',
            speaker: 'Example Speaker'
        },
        {
            type: 'dialogue',
            lines: [
                'Primary dialogue line.',
                'Secondary dialogue line.'
            ]
        },
        {
            type: 'narration',
            lines: [
                'Ambient or descriptive note between transmissions.'
            ]
        },
        {
            type: 'divider',
            text: '---'
        }
    ]
}

CAMS entry example (header, narration, action, divider):
{
    interface: 'cams',
    type: 'scene',
    feedId: 'example_feed_id',
    title: 'Example Camera Feed',
    setFlags: ['example_cams_flag'],
    blocks: [
        {
            type: 'camera_header',
            camera: 'Example Camera Name',
            timestamp: 'Example Timestamp (YYYY-MM-DD HH:MM:SS)'
        },
        {
            type: 'camera_narration',
            sender: 'Example Contributor Name',
            lines: [
                'Ambient or descriptive note for camera feed.'
            ]
        },
        {
            type: 'camera_action',
            lines: [
                'Description of notable action or event captured on camera.',
                'Additional details about the action or event.'
            ]
        },
        {
            type: 'camera_divider',
            text: 'SEGMENT BREAK'
        }
    ]
}
*/

const CHAPTER_01 = {
    id: 'chapter_01',
    title: 'Initial Contact',
    entries: [
        {
            interface: 'msg',
            type: 'message',
            setFlags: ['chapter_01_entry_01'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Issac'
                },
                {
                    type: 'message_body',
                    lines: [
                        'What the fuck is the facility?'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            discoverTerms: ['director'],
            blocks: [
                {
                    type: 'speaker',
                    speaker: 'Test Subject 008'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Well it’s where all us ███████ live and train for the upcoming war!',
                        'That’s what the Director says.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'message',
            setFlags: ['chapter_01_entry_02'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'B'
                },
                {
                    type: 'message_body',
                    lines: [
                        '*lowers a can of soup into the facility*',
                        'All I can offer at the moment'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            discoverTerms: ['subject_002'],
            blocks: [
                {
                    type: 'speaker',
                    speaker: 'Test Subject 008'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Oh thank you so much!',
                        'I’m not allowed to eat right now, but the thought is very nice.',
                        'I’ll give it to SUBJECT_002[NAME REDACTED], maybe he can use it…'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'message',
            setFlags: ['chapter_01_entry_03'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Dragosar'
                },
                {
                    type: 'message_body',
                    lines: [
                        'I know I’m sending a lot of asks… but unless it’s spoiler…',
                        'Salem as the only fallen angel… and she’s CREATING more to fight for her?'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            discoverTerms: ['salem', 'hybrid'],
            blocks: [
                {
                    type: 'speaker',
                    speaker: 'Test Subject 008'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Miss Salem isn’t an ███████, that would be ridiculous.',
                        'She did create us to fight for her though, that part is true.',
                        'But no, Miss Salem isn’t an ███████, she’s…',
                        'Well she’s not a hybrid exactly…'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'message',
            setFlags: ['chapter_01_entry_04'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Millie'
                },
                {
                    type: 'message_body',
                    lines: [
                        'What’s inspiring the different designs for the test subjects?',
                        'Angels? Prisoners?',
                        'And why are you picking which archangel names go to which subjects?'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            discoverTerms: ['subject_001'],
            blocks: [
                {
                    type: 'speaker',
                    speaker: 'Dr. Watts'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The appearances of the gods’ angels from the past have had a significant influence on avian design.',
                        'Multiple wings, ocular clusters, and related traits.',
                        'Our research indicates wing coloration corresponds to the powers an avian will manifest.',
                        'For example: Subject 001 and its Wipe ability.',
                        'As for the names, Director ███████ named them herself.',
                        'She has not deigned to explain her reasoning.'
                    ]
                }
            ]
        }
    ]
};
