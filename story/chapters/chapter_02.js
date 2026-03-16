/*
Dummy entry templates

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
            requireEvent: 'msg_alert_subject_002_read',
            blocks: [
                {
                    type: 'speaker',
                    speaker: 'Roman'
                },
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

const CHAPTER_02 = {
    id: 'chapter_02',
    title: 'Through The Glass',
    entries: [
        {
            interface: 'cams',
            type: 'scene',
            feedId: 'avian_cellblock',
            title: 'Avian Cellblock',
            discoverTerms: ['avian_cellblock'],
            setFlags: ['chapter_02_entry_01'],
            blocks: [
                {
                    type: 'camera_header',
                    camera: 'AVIAN CELLBLOCK',
                    timestamp: 'UNKNOWN'
                },
                {
                    type: 'camera_narration',
                    sender: 'B',
                    lines: [
                        'Here I snuck out three cookies for Subjects 01, 02, and 03',
                    ]
                },
                {
                    type: 'camera_divider',
                    text: 'SEGMENT BREAK'
                },
                {
                    type: 'camera_action',
                    lines: [
                        'Emerald takes the cookie and nibbles on it, murmuring a thank you. She feels tempted to save part of it, but she’s not sure if the Director is going to come and take her for Raphael’s treatment before that.',
                        'Roman picks at his muzzle and stares longingly at the cookie, turning it over and over in his hands. Only the Director and the scientists can remove it, and given the pain that usually accompanies the tests, he’s not really in a rush.',
                        'Hazel pockets his cookie without a word and stalks away.'
                    ]
                }
            ]
        },
        {
            interface: 'cams',
            type: 'scene',
            feedId: 'containment_hallway_a',
            title: 'Containment Hallway A',
            discoverTerms: ['healing', 'containment_hallways'],
            setFlags: ['chapter_02_entry_02'],
            blocks: [
                {
                    type: 'camera_header',
                    camera: 'CONTAINMENT HALLWAY A',
                    timestamp: 'UNKNOWN'
                },
                {
                    type: 'camera_narration',
                    sender: 'Anon',
                    lines: [
                        'Places a thermos of cocoa somewhere in the facility subject 008 is likely to find it, addressed to them. '
                    ]
                },
                {
                    type: 'camera_divider',
                    text: 'SEGMENT BREAK'
                },
                {
                    type: 'camera_action',
                    lines: [
                        '008 wanders down the hallway, unaccompanied by virtue of good behavior. And by virtue of being too injured to threaten the facility’s defenses. Not that they would ever do that, they believe in Miss Salem’s cause.',
                        'Their hands are glowing, slowly healing the bruises across their ribs. They don’t mind though, the training is all to help them get stronger. They were told not to question it, and they have no reason to.',
                        'Pyrrha questioned it. She didn’t want them to get hurt, and they tended to listen to her, no matter what the Superiors said.',
                        '008 spotted a thermos sitting on the floor outside their cell. They pause, staring at it, head tilted to one side as they process what they’re looking at.',
                        'Cautiously they pick it up, the warmth of the drink soaking into their palms and leeching away the cold that is everywhere in the facility. The label reads “For 008, from REDACTED” They blink, familiar confusion filling their mind.',
                        'Did one of the Scientists leave this here? They’ve seen some of the Scientists with these things. And the training went well, so they have permission to eat today. And it was addressed to them so maybe…',
                        '008 sips from the thermos. The sweet flavor and the heat of the liquid brought a warmth to their bones that they’d never felt before. Their eyes widen.',
                        'They didn’t know water could taste like this.',
                        '“Thank you…” they whisper.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            requireEvent: 'msg_alert_subject_002_read',
            discoverTerms: ['empathy'],
            setFlags: ['chapter_02_entry_03'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Fly',
                },
                {
                    type: 'message_body',
                    lines: [
                        'Oh my god I feel really bad for them… I find it interesting that Roman so far looks the most monstrous in this au (bird feet and he has to wear a mouth mask). It’s like, what are they exactly doing to these guys???'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Roman Torchwick'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Well monstrous is going a bit far, don’t you think?',
                        'Personally I think Miss Mangle-Face is the most monstrous of us.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Roman grumbles.',
                        'Neo signs at him, huffing and glaring. He waves her away and reluctantly glances back at you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Truthfully, the higher ups make me wear this damn mask so my silver tongue doesn’t charm them into letting me and Neo out of this hell hole.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Roman shifts awkwardly, glaring daggers at his clawed feet.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'As for these things, well… Let’s just say that they hurt like a bitch to get, and leave it at that.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'His wings flare at his back.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’d tear them off myself if I had the chance, but I can’t risk hurting Neo as well. Damn Empathy link.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_02_entry_04'],
            requireEvent: 'msg_alert_secure_unlock',
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Millie'
                },
                {
                    type: 'message_body',
                    lines: [
                        '(Hello, it’s me again, I’m terrified but fascinated with this AU.) Do the subjects get to interact with each other?',
                        'Is the purpose of the study specifically for the powers of the subjects or is it also a behavioral study about bonding and habits?',
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Watts'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The subjects do get to speak to each other under controlled circumstances.',
                        'It is vital that the troops work together to form a cohesive unit for Director Salem’s army.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Dr. Watts speaks without looking up from his clipboard.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Pushing each avian to its limits and studying its powers is also a major part of our research.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He flips a page over and keeps writing.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Normal hybrids don’t have powers, the genetic makeup left from the gods’ departures can’t sustain magic.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Watts smirks and stares at you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But the avians can.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He taps a few keys on a keyboard and footage of one of the avians comes up, fighting for their life.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Each one has a unique combination of traits.',
                        'As you can see here, the creature displays survival instincts just as a person would.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'As for bonding and habits.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He closes the program with a smirk.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Why bother to study those?',
                        'We created them, they’re just animals. To train, and punish, and point at a target, and die for our cause.',
                        'Any personality each one had was squashed out the moment their avian traits overcame their hybrid ones.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The test subjects aren’t people after all.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            discoverTerms: ['subject_003'],
            setFlags: ['chapter_02_entry_05'],
            requireEvent: 'msg_alert_subject_003',
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Hazel in your Fallen Angel au,, are they like scared of him?? if so I kindly ask for like one hug from him /hj',
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Roman, masked once again, glances in the direction of Hazel’s cell and then stares at you as if to say “Are you kidding me?!”',
                        'Hazel growls and rolls his massive shoulders, his scars rippling and distinct even in the dim light through his cell window. Neo taps a warning through the wall, and Roman flinches and returns to his bed.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Emerald Sustrai'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'It’s not so much that we’re scared of him'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald whispers to you, the rings over her head rotating slowly.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'He’s been kind to me in the past, Roman and Neo just have problems with authorities.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Her wings ruffle anxiously and she gazes down the hall to where she knows Hazel sits in his cell.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'He’s been here the longest.',
                        'From the first wave of avians, only two survived the procedure, and Hazel is the strength to his partner’s subtlety.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She shudders, and her fingers brush at her feathers.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Anyone who can go toe to toe with that monster is terrifying in my book.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_02_entry_06'],
            requireEvent: 'msg_alert_chapter_02_end',
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Devoir'
                },
                {
                    type: 'message_body',
                    lines: [
                        'In one of the posts you mentioned some kind of war so I’m gonna guess Salem is the fallen angel,',
                        'taking the role of Lucifer, and is experimenting on these people to make an army to fight God or something?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Director Salem'
                },
                {
                    type: 'narration',
                    lines: [
                        'A voice purrs from the darkness.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'My dear, you’ve got it all wrong.',
                        'As much as I wish, I am no fallen angel.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The voice turns regretful and sweet, like sugar luring a fly into a spider’s web.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The gods are gone, my dear.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Red eyes gleam from the shadows and a dark chuckle echoes through the air.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And with what’s left of their power under my control…',
                        'I’m going to replace them.'
                    ]
                }
            ],
        }
    ]
};
