/* MSG pair entry example (header, body, speaker, dialogue, narration, divider):
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
*/

/*CAMS entry example (header, narration, action, divider):
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

/*
SCENE entry example (reconstructed interaction log):
{
    interface: 'scene',
    type: 'scene',
    sceneId: 'example_scene_id',
    title: 'EXAMPLE SCENE // RECONSTRUCTED INTERACTION LOG',
    setFlags: ['example_scene_flag'],
    blocks: [
        {
            type: 'message_header',
            sender: 'Anon'
        },
        {
            type: 'message_body',
            lines: [
                'Prompt or initiating question for the reconstructed scene.'
            ]
        },
        {
            type: 'speaker',
            speaker: 'Example Speaker One'
        },
        {
            type: 'dialogue',
            lines: [
                'First speaker response line.',
                'Second response line.'
            ]
        },
        {
            type: 'narration',
            lines: [
                'Contextual narration between speakers.'
            ]
        },
        {
            type: 'speaker',
            speaker: 'Example Speaker Two'
        },
        {
            type: 'dialogue',
            lines: [
                'Second speaker response.'
            ]
        },
        {
            type: 'divider',
            text: 'SEGMENT BREAK'
        }
    ]
}
*/

const CHAPTER_04 = {
    id: 'chapter_04',
    title: 'Internal Functions',
    entries: [
        {
            interface: 'msg',
            type: 'reply',
            requireEvent: 'chapter_04_start',
            discoverTerms: ['pyrrha', 'penny'],
            setFlags: ['chapter_04_entry_01'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Shei'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Who is Michael?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Director Salem'
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem watches as Polendina’s brat skips into the cafeteria and waves at 008 and at Nikos. She closes out the screen on her tablet, trusting Watts to carry out her orders.',
                        'Polendina’s daughter being there is a wrinkle she didn’t expect, but she’s sure the man can be silenced.',
                        'She presses a key and the intercom buzzes on.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        '008, report back to your room. Your allotted leisure time is up.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Immediately, the avian says their goodbyes to the pair of redheads and leaves the room without a backwards glance.',
                        'Now that that’s taken care of…'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Who is Michael, you ask?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem finally turns her attention to you, pinning you under her gaze like a butterfly under glass.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Well, Azreal with his useful Shifting ability takes care of problems in the outside world.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem looks down at the two red-heads, and smiles when a notification comes up on her tablet that Watts has passed her orders along.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Michael takes care of problems… in house, so to speak.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            requireEvent: 'msg_cams_alert_mercury',
            setFlags: ['chapter_04_entry_02'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'What about 006? They are the only one we know nothing about! Or did I miss something?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Roman'
                },
                {
                    type: 'dialogue',
                    lines: [
                        '006? Yeah, there’s a good reason why you haven’t heard from him yet…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Roman mutters darkly as he traipses across the floor of the training hall, glancing up at the mirrored windows of the observation booths.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Poor bastard is barely ever out of here, they train him half to death.',
                        'I might have a problem with authority, and yeah, it might’ve gotten me and Neo captured in the first place,'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He admits, guilt coloring his voice.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But I at least know how to keep my head down and listen to the schmucks in charge.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He shrugs.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'It keeps me alive, and by proxy, keeps Neo alive. But 006,'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Roman shakes his head.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The idiot doesn’t seem to have a self-preservation bone in his whole body.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He glances towards the door, towards his handler. The woman’s tail flicks as her hands adjust Roman’s mask. He flinches.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'He cares about Em, you’d have to be blind not to see it,'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He mutters out the corner of his mouth.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But if he keeps fighting them the way he’s doing, he’s not gonna be around to protect her much longer.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            requireEvent: 'chapter_04_start',
            setFlags: ['chapter_04_entry_03'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'This is the same anon with the Tyrian beloved thing dbsldufvw anyway!! I do have a little question for Tyrian, if he’d probably ever escape the facility, what would he do with his freedom?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Tyrian Callows'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Well let me think, what would I do with my so-called "freedom"?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Tyrian makes quotes in the air with his hands.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I say so-called because I’m more free in here than I ever was in the outside world.',
                        'But what would I do?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He seems to ponder your question, his tail swaying from side to side.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Well, I believe that I would do what I was using it for before my Goddess recruited me!',
                        'You see…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'A glow of pink light, and his wings vanish. The purple marking on his face vanish. Tyrian stands where he stood, looking remarkably ordinary.',
                        'His feral grin is the same, a predator on the hunt.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Before I came here, I was a murderer on death row.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'His knife twirls in his hand, catching the light.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Yes it’s true, my life was about to be cut short,'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He says, voice shifting into one of deep regret.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The dear General saw to that.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Tyrian spits out the man’s title like it’s an insult.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But then my Goddess approached him with an offer.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The familiar fanatical light enters his eyes, voice turning reverential. Another flash of pink light, and his wings, markings and multitude of eyes reappear.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And She made me into who I am today.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Tyrian tilts his head, arms now cross behind his back.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'So you ask me what I would do if I got my freedom?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'His grin grows impossibly wider.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Why would I need to wonder, when I already have it?'
                    ]
                }
            ]
        },
        {
            interface: 'scene',
            type: 'scene',
            sceneId: 'pyrrha_role_scene',
            title: 'CHAPTER 04 // PYRRHA ROLE',
            requireEvent: 'scene_command_unlocked',
            setFlags: ['chapter_04_entry_04'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'What’s Pyrrha’s role here?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Pyrrha Nikos'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'My role?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Pyrrha questions, one of her ears flicking.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’m just an athlete, nothing special.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Penny Polendina'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'She’s being too modest!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Penny interrupts from beside her.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Pyrrha is the top weapon, combat drone, and enhancement tester in the entire building!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Pyrrha ducks her head.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Pyrrha Nikos'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Penny, is exaggerating.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Penny Polendina'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Not so.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Penny interrupts again, smiling brightly.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Pyrrha is an Olympic bound track and field star who offered her help to my father when he needed someone to base my prosthetics on!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Penny gestures to her legs.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Pyrrha Nikos'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'It was the least I could do.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Pyrrha says into her hands, blushing as red as her hair.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And afterwards, I offered to stay on and help Dr. Polendina test other ways to keep people safe, and the General agreed.',
                        'I’ve always felt like I was destined to help people.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She gazes off towards 008 as they leave the cafeteria, and her smile turns sad.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And as time has gone on, it has become increasingly clear that I was right.'
                    ]
                }
            ]
        },
        {
            interface: 'cams',
            type: 'scene',
            feedId: 'testing_chamber',
            title: 'Testing Chamber',
            requireEvent: 'msg_cams_alert_mercury',
            setFlags: ['chapter_04_entry_05'],
            blocks: [
                {
                    type: 'camera_header',
                    camera: 'Testing Chamber',
                    timestamp: 'UNKNOWN'
                },
                {
                    type: 'camera_narration',
                    sender: 'Brachy',
                    lines: [
                        '006/michael/mercury my beloved. makes sense that an assassin would be the enforcer. how’s he doing?'
                    ]
                },
                {
                    type: 'camera_divider',
                    text: 'VISUAL FEED'
                },
                {
                    type: 'camera_action',
                    lines: [
                        'It’s dark.',
                        'It’s dark and he can’t see.',
                        'He can’t see them.',
                        'But he can hear them.',
                        'He can hear them prowling around just out of the range of his vision. Just out range for him to strike. To strike, and maim, and kill, and-',
                        'Mercury shakes his head roughly.',
                        'He is Mercury. He is Mercury.',
                        'One of the pseudo-devils emerges from the gloom, and he snarls when he pounces on it. He digs his claws into the cracks of the metal, ripping chunks off with his bare hands, crushing the casing like it’s a tin can.',
                        'He can’t tell if it’s dark, or if he’s losing his vision from sheer exhaustion.',
                        'How long has he been fighting now? Three hours? Three weeks? Anything and anytime within that range is possible.',
                        'His bones feel like jelly turned to lava. His claws throw up sparks when he digs them into the tile floor to slow himself to a halt.',
                        'He is Mercury. He is-',
                        'Another wave of bots comes at him, not giving him a moment to breathe, to center himself. To regain himself. Their arms are knives, razor sharp and glowing as bright as his eyes. They slice at him and he leaps over, pushing off with his feet and diving down at them from above.',
                        'The ground of the training room should be littered with their bodies. He should be coated with their blood- with oil. He wants to rip and tear them apart, to feel their veins burst under his teeth, to rend their flesh from their bones-',
                        'He lets out a shaky breath.',
                        'He inhales, like a drowning man searching for air. His face is twisted into a snarl, and it feels right.',
                        'He is…',
                        'He is…',
                        'Who is he?'
                    ]
                },
                {
                    type: 'camera_divider',
                    text: 'AUDIO RECORDING'
                },
                {
                    type: 'camera_action',
                    lines: [
                        '"Exercise 153 completed," says a cold smooth voice that echoes from above him.',
                        '"Stand down, soldier. Return to your room."'
                    ]
                },
                {
                    type: 'camera_divider',
                    text: 'VISUAL FEED'
                },
                {
                    type: 'camera_action',
                    lines: [
                        'He’s too exhausted to protest.'
                    ]
                }
            ]
        },
        {
            interface: 'scene',
            type: 'scene',
            sceneId: 'subject_008_profile_scene',
            title: 'CHAPTER 04 // SUBJECT 008 ACCESS DENIED',
            requireEvent: 'subject_008_profile_scene',
            setFlags: ['subject_008_profile_scene'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Can we know a little more about Raphael?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Terminal access request detected.',
                        'User credentials: Dr. Polendina.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'System'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'WELCOME DOCTOR POLENDINA',
                        'FILE ACCESS REQUEST: SUBJECT 008',
                        'ACCESSING...'
                    ]
                },
                {
                    type: 'divider',
                    text: '.'
                },
                {
                    type: 'divider',
                    text: '.'
                },
                {
                    type: 'divider',
                    text: '.'
                },
                {
                    type: 'narration',
                    lines: [
                        'File Accessed',
                        'Security Breach'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Project Name: Dovetail',
                        'Title: Raphael',
                        'Designation: 008-0424',
                        'Powers: Empathy, Healing',
                        'Healing: When Raphael places their hands on a hybrid or fellow avian, a YELLOW glow emits from their hands and the healing process is incredibly accelerated',
                        'Empathy: When Raphael becomes emotionally bonded or touches exposed skin of a hybrid or fellow avian, they can feel the emotions, physical stimuli, and pain of the individual they are bonded to.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Familial Relationships: CLASSIFIED, RESTRICTED ACCESS.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'System'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Enter passcode.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Polendina'
                },
                {
                    type: 'dialogue',
                    lines: [
                        '********'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'System'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'ACCESS DENIED',
                        'ERROR',
                        'ERROR',
                        '',
                        'E RR OR',
                        '',
                        '',
                        'ERR'
                    ]
                }
            ]
        }
    ]
}