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

/*SCENE entry example (reconstructed interaction log):
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

/*TERMINAL entry example (typed line-by-line in terminal):
{
    interface: 'terminal',
    type: 'terminal',
    requireEvent: 'example_terminal_event', // optional
    awaitResponse: true, // optional, defaults to true
    promptText: '[SYSTEM] Respond YES or NO to continue.', // optional (accepts YES/NO or Y/N)
    yesResponseText: [ // optional: string or array of lines
        '[SYSTEM] Handshake accepted.',
        '[SYSTEM] Continuing relay...'
    ],
    noResponseText: [ // optional: string or array of lines
        '[SYSTEM] Acknowledged.',
        '[SYSTEM] Continuing relay...'
    ],
    setFlags: ['example_terminal_flag'],
    blocks: [
        {
            type: 'narration',
            lines: [
                'INITIATING UNAUTHORIZED ACCESS...',
                'BYPASSING SECURITY LAYER 1...'
            ]
        },
        {
            type: 'speaker',
            speaker: 'UNKNOWN'
        },
        {
            type: 'dialogue',
            lines: [
                'Can you read this?'
            ]
        },
        {
            type: 'divider',
            text: '---'
        }
    ]
}

To play a terminal entry, trigger scheduleTerminalPlayback() in an event rule.
This is story-driven and not tied to a player command unlock.
*/

const chapter_07 = {
    id: 'chapter_07',
    title: 'Things Set in Motion',
    entries: [
        {
            interface: 'scene',
            type: 'scene',
            sceneId: 'chapter_07_scene_01',
            title: 'CHAPTER 07 // SCENE 01 // TRAINING DETAILS',
            setFlags: ['chapter_07_entry_01'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'B'
                },
                {
                    type: 'message_body',
                    lines: [
                        'What kind of training do you all do?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Mercury Black'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Hell.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury says darkly before anyone else can speak up.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Roman Torchwick'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Ignore him.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Roman says, waving Mercury away.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'He’s over exaggerating.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Mercury Black'
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury bats Roman’s hand away and glares at him.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'It. Is. Hell!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He insists, snapping at Roman.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Sorry we can’t all be charming , pretty boy, but some of us are going through literal hell for the Director’s war!'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Roman Torchwick'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Oh go fight a training drone then, if you’re so special!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Roman snarks, rolling his eyes. Mercury huffs and stalks back to his cell.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'He’s right is the thing, not that I’ll ever tell him that to his face.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Roman mutters to you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The training is hell, and we all know it’s worse for Merc and Raphael.',
                        'Wake up, training room, Raph heals our broken bones.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Roman ticks off the routine on his fingers.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Time for experiments with the scientists, and then if we’ve been good a bit to eat, then back to the training room.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Roman’s voice gets more frantic, pitch jumping with anxiety as he paces.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Fighting for hours to test our endurance, getting pumped full of adrenaline until we can’t see straight.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He waves his hands in the air, his wings flaring.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Bleeding on the tiles that never stay dirty. Getting punished if we win, and punished if we lose! It’s just-! We can’t-!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He slumps. His chest heaves with emotions, the fight gone from his eyes.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'There’s no way to win.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Roman says quietly.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'We fight, and we train, and we hurt and all for what? To get sent back to our cells and sit in the dark until the next day?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'His eyes find the tally marks under his bed.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I used to count the days.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He murmurs, tracing his fingers over the scratches.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But I don’t bother anymore. What’s the point? We all know we’re gonna die in here.'
                    ]
                }
            ]
        },
        {
            interface: 'cams',
            type: 'scene',
            feedId: 'avian_cellblock',
            title: 'Avian Cellblock',
            setFlags: ['chapter_07_entry_02'],
            blocks: [
                {
                    type: 'camera_header',
                    camera: 'Avian Cellblock'
                },
                {
                    type: 'camera_narration',
                    sender: 'Anon'
                },
                {
                    type: 'camera_action',
                    lines: [
                        'He pokes at it, distrustful. He can’t count on one hand the amount of “gifts” that have ended with him either being drugged or punished. The things that would happen to him if one of the guards saw him with this.',
                        'Eventually though, Mercury picks it up.He peels back the wrapping, wincing when it crinkles.He sniffs it, and turns it around in his hands, but in the end he’s unable to find anything wrong with it.',
                        'So he breaks off a piece and takes a tiny bite.',
                        'And then he waits.',
                        'Waits for the familiar sensation of narcotics, waits to drop to the ground and get dragged out of his cell.Waits for the inevitable shoe to drop.',
                        'But nothing happens.It is, after all, just a chocolate bar.',
                        'Mercury glances at his door, but of course sees nobody there. “Thanks,” he mutters, nibbling at the candy. “I dunno who you guys are, but thanks for this.”'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_07_entry_03'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Harmony'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Hey I was wondering why are there only 8 subjects?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Hazel Rainart'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Originally, there were more of us.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Hazel says. He sits cross-legged on the floor of his cell, and gestures for you to sit across from him.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The rest died. The treatments were too much, or the training. But for whatever reason, they all died.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He sighs, looking down at both sets of hands.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I tried to help some of them…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He murmurs. His hands are shaking, with sorrow or rage you can’t tell.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But none survived.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Hazel clenches his hands into fists, and looks up at you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'By the time the Director perfected her technique, only seven of us remained.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He holds up two of his hands and counts his fingers down with a third.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Tyrian, myself, Cinder, Roman, Neo, Emerald, and Mercury.',
                        'Seven avians for a false goddess, as the seven archangels were for the gods of old.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He explains.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Raphael is a special case, he was brought in personally by the Director, and he became the eighth of our number.',
                        'After that as far as I know no more candidates have been brought in.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He puts his hands on his knees, and crosses the other two.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'We’ve numbered eight ever since.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_07_entry_04'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Brachy'
                },
                {
                    type: 'message_body',
                    lines: [
                        'How’s Penny doing?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Penny Polendina'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’ve… I’ve been better.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Penny says, her smile a little dimmer than normal.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'My legs were destroyed in the attack, but my father says that I’ll be able to go home soon.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She gazes towards the door, where Pietro just exited.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'He seems upset.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She murmurs, eyes saddening.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'More than he should be. And he won’t tell me how Pyrrha is doing, or what happened to the other girl.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Her fingers tighten on her sheets, and she leans back into the pillow propping her up.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I hope they’re doing okay…'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_07_entry_05'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Emerald, this is a major risk, but have you ever considered wiping the director. No matter how powerful she may be, a blank slate is far less of a menace than she already is.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Emerald Sustrai'
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald barks out a laugh, roughly wiping the tears from her eyes.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'You think that I don’t dream about that every night?!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She asks, voice hollow.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'You think that I don’t wish that I could just Wipe her and get me and my… my friends out of this hell hole?',
                        'A blank slate…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald has that far away look in her eyes again, and she shakes her head.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’m never doing that to anyone ever again.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Her voice is shaking, but her conviction is firm.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Not again.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_07_entry_06'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Why must Mercury train so hard?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Mercury Black'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Because I had the good luck to inherit Strength and Speed as my powers.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury grumbles, flipping back on his bed, his arms behind his head.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Blame my freaking ancestors.',
                        'It’s not my fault this freaky cult wants an army.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He mutters, staring at the ceiling. As if he hadn’t memorized the cracks in his cell years ago.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'It’s not my fault.'
                    ]
                }
            ]
        },
        {
            interface: 'terminal',
            type: 'terminal',
            setFlags: ['chapter_06_entry_08'],
            yesResponseText: [
                '[SYSTEM] Processing request...',
                '[SYSTEM] Authorization acknowledged.',
                '',
                '[SYSTEM] ACCESS GRANTED.'
            ],
            noResponseText: [
                '[SYSTEM] Processing request...',
                '[SYSTEM] Authorization acknowledged.',
                '',
                '[SYSTEM] ACCESS DENIED.',
                '...',
                '[SYSTEM] WARNING: REPEATED ACCESS REQUEST DETECTED',
                '[SYSTEM] Override initiated.',
                '[SYSTEM] ACCESS GRANTED.'
            ],
            blocks: [
                {
                    type: 'narration',
                    lines: [
                        'WARNING: UNAUTHORIZED ACCESS REQUESTED',
                        '',
                        'USER ID: UNKNOWN',
                        'NETWORK ID: ERROR',
                        '',
                        'REQUEST TO VIEW HISTORY RECORDS OF [PROJECT: RAPHAEL]',
                        '',
                        'REASON FOR REQUEST: ',
                        'Dr. Polendina, if we can understand why Salem was interested in Jaune specifically and how she discovered and obtained him, we might be able to help him, and the others.',
                        'Please.',
                        '-A friend',
                        '',
                        'ALLOW ACCESS?',
                        '[ YES ]    [ NO ]'
                    ]
                }
            ]
        },
        {
            interface: 'cams',
            type: 'scene',
            feedId: 'research_lab_b',
            title: 'Research Lab B',
            setFlags: ['chapter_07_entry_07'],
            blocks: [
                {
                    type: 'camera_header',
                    camera: 'Research Lab B'
                },
                {
                    type: 'camera_narration',
                    sender: 'Anon'
                },
                {
                    type: 'camera_action',
                    lines: [
                        'Pietro isn’t even surprised when a third message types its way across his screen, addressed from his mysterious “friend.”',
                        'While he is hesitant to call the person a friend, he can’t deny that they’re certainly an ally. An ally in a war that he didn’t know he was fighting in. He’ll do anything to help the children who are trapped here.',
                        '“Information about Jaune?” he mutters, reading the message and typing on his other screen. “I’m sure that can be arranged.”',
                        'He delves into the project files. Information on Emerald’s previous foster homes. Information on Neo’s abusive parents. Information on the men Hazel killed in his quest for revenge. Information on Jaune…',
                        'Pietro blinks.',
                        'No information on Jaune.',
                        'Nothing about his family, his friends, where he had lived. Nothing at all about his life before the Facility.',
                        'There are plenty of videos of his training.Security footage of his cell, of his treatments.Photos showing Jaune growing from a broken little boy into a shell of a young man.',
                        'But nothing from before.',
                        'It’s like the boy didn’t exist until twelve years ago, when Salem brought him here as a five year old.Pietro has learned to distrust anything that the Director is directly involved in, but this strikes an even worse chord than her usual escapades.',
                        'Still, he copies what information he has on the boy onto a secure drive, along with everything he can find on the others.He doesn’t know who his new “friend” is, but he hopes that they can help him help the children.',
                        'So for now, he works with what he has. Pietro cracks his knuckles, and begins to type.'
                    ]
                },
                {
                    type: 'camera_narration',
                    sender: 'Pietro Polendina',
                    lines: [
                        'USER ID: Dr. Pietro Polendina',
                        'SYSTEM ID: Facility_Mainframe_B',
                        '',
                        '> execute: run pinocchio.exe',
                        '',
                        'ENCRYPTION SOFTWARE ENGAGED',
                        '',
                        'Welcome Dr. Polendina',
                        '',
                        'TO: [recipient_ID_unknown]',
                        'SUBJECT: URGENT',
                        '',
                        'I’ve gathered the information I can, but it won’t be long until they discover that it was me. The others are locked in their cells. Jaune is still in the Med Bay, as is my daughter.',
                        'We are on our way.',
                        '-Pietro'
                    ]
                },
                {
                    type: 'camera_narration',
                    sender: 'A friend',
                    lines: [
                        'RECIPIENT ID: UNKNOWN',
                        'RECIPIENT SYSTEM: ERROR',
                        '',
                        'Understood. I will send you an address once you clear the gate.',
                        'Be cautious, Dr. Polendina.',
                        '-A friend'
                    ]
                }
            ]
        },
        {
            interface: 'scene',
            type: 'scene',
            sceneId: 'chapter_07_scene_02',
            title: 'CHAPTER 07 // SCENE 02 // AVIAN AGES',
            setFlags: ['chapter_07_entry_08'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Green'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Excuse me, Jaune was five-years-old when Salem kidnapped him???',
                        'How old were the rest of them? How old are they now? Because if they’re the same ages as they are in the show… and I recall Jaune was the last one to be taken… they’ve been there for over a decade .',
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Emerald Sustrai'
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury and Emerald exchange glances, and then give you an almost pitying look.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I was six.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald says.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'It’s hard to tell… but we think I’m seventeen now.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Mercury Black'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Same here.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury mutters.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Over a decade, Goddess has it been that long?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Emerald Sustrai'
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald nods.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Why did you think Roman stopped tallying?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She looks at you, seeming old even though she’s so young.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Roman’s our age, and Neo’s a couple years older than me and Merc.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She says, tucking her knees into her chest.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Mercury Black'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'So is Cinder.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury adds, flopping back onto his cot.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Tyrian and the big guy are both like twenty-five or thirty.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'His voice softens, and you’re unsure if he’s still speaking to you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Time is hard in this place.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Emerald Sustrai'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But yes.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald concludes.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Raphael was five. Not much life to forget.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She admits, gaze distant once again.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But any amount is too much.'
                    ]
                }
            ]
        },
        {
            interface: 'cams',
            type: 'scene',
            feedId: 'research_lab_b',
            title: 'Research Lab B',
            setFlags: ['chapter_07_entry_09'],
            blocks: [
                {
                    type: 'camera_header',
                    camera: 'Research Lab B'
                },
                {
                    type: 'camera_narration',
                    sender: 'Brachy',
                    lines: [
                        'How well does Dr. Polendina know the other avians?'
                    ]
                },
                {
                    type: 'camera_action',
                    lines: [
                        '“I’ve met them,” Pietro says softly, glancing over his shoulder to check if anyone is listening in. “My biggest regret in life is not getting to know them better.Those children would’ve greatly benefited from a positive influence in their lives.”',
                        'He shoves papers into his briefcase in a way that he hopes looks casual, still glancing around nervously. “If all goes well with my new “friend” then hopefully I’ll be able to rectify that mistake.”',
                        'The briefcase closes with a snap, and he attaches it to the latch on the back of his chair.',
                        'Well. He’s stalled for long enough.',
                        'Time to break a person, who in the eyes of law was never born, out of the most secure government facility this side of the continent.',
                        'Pietro swallows thickly, and shuts his eyes for a moment.He thinks about his daughter, injured in a hospital bed.He thinks about Pyrrha, who only ever wanted to help.But mostly, he thinks about the avians who had lived their whole lives in fear.',
                        'When he opens his eyes, they’re hardened with the steel of determination.',
                        'For their sake, he will risk life and limb.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_07_entry_10'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Brachy'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Mercury, did you kill your father at age 6?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Mercury Black'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'In the eyes of the law, maybe I did and maybe I didn’t.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He shrugs, but his face darkens.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'They were never able to prove that the fire was my fault, or the locked door. Maybe I’m just a victim of circumstance.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury looks away from you. His expression softens, and very suddenly he looks like the scared, hurt, seventeen-year-old that he really is.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'That bastard hurt me every day of my life.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He murmurs, voice shaking minutely.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I didn’t even know it was wrong .'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury shrugs again, shaking his head.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I killed him, and for one beautiful moment I was happy.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He chokes out, sounding halfway between anger and sadness.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And then!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He laughs. A broken laugh that sounds like he dropped it on the ground and kept using it after it shattered.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And then I got brought to this place!',
                        'So yeah I killed him…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury’s wings tuck around him, shielding him from your view.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I killed him and nothing even changed .'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_07_entry_11'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Dar'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Ok I’m caught up. Can Hazel tell us anymore about the first wave of avians?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Hazel Rainart'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Not much to tell.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He sighs, sitting heavily on the edge of his cot.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Most of us were convicts, almost entirely from death row. The kind that the government turns a blind eye towards if they were suddenly to go “mysteriously missing.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He rolls his eyes, the disdain palpable in his voice.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The kind of people who wouldn’t be opposed to fighting just for the sake of the kill.',
                        'They were all real pieces of work.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Hazel says, shaking his head.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But none more than Tyrian who, in a wonderful twist of fate, was the first person that the treatments didn’t kill.',
                        'I’ll spare you the details of the deaths.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He says, sounding haunted.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'They were gory, limbs ripping through their flesh, wings tearing through their skulls. And the screams…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Hazel shudders, falling silent.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Only two things in this life stalk my nightmares.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He says after a long while.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'My sister’s face as she was murdered.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He counts.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And those screams.'
                    ]
                }
            ]
        },
        {
            interface: 'cams',
            type: 'scene',
            feedId: 'avian_cellblock',
            title: 'Avian Cellblock',
            setFlags: ['chapter_07_entry_12'],
            blocks: [
                {
                    type: 'camera_header',
                    camera: 'Avian Cellblock'
                },
                {
                    type: 'camera_narration',
                    sender: 'A friend',
                    lines: [
                        'A note, dispatched to 001, 002, 004, and 006. It is written on a small square of paper, folded up into a rectangle no bigger than a thumbnail. In tiny, precise handwriting the following is written:',
                        'Things have been set into motion. We regret that we cannot tell you more, but we cannot risk anything. Be ready to act when the time comes, and trust the doctor. Destroy this note after reading it.',
                        '-A friend'
                    ]
                },
                {
                    type: 'camera_action',
                    lines: [
                        'Emerald blinks in surprise when her allotted amount of food for the day has paper in it. She doesn’t quite know why she’s surprised, she should just be grateful to be getting food in the first place.',
                        'But still. Paper is a new one.',
                        'She tugs it out of the grey mush that is her dinner, and slowly unfolds it. Wary of what could be inside.',
                        'Her eyes widen as she reads what it says. This… This has to be a trick, right? Or some kind of sick joke played by the superiors, or one of the guards. Goddess knows it’s happened enough times over the years.',
                        'But still… somehow she can’t squash down the flicker of hope in her chest.',
                        '“Trust the doctor.”',
                        'Which doctor though? Maybe she’ll know when the time comes? Emerald traces her eyes back over the note, endeavoring to memorize it. It’s addressed to some of the others, and she feels a swell of relief when she realizes that it’s her friends.',
                        'The other avians who most want to escape.',
                        'Emerald scoots to the wall between her and Roman, and taps out a speedy message. “Did you get a paper?” she asks. It’s all she can think to say that won’t raise suspicion.',
                        '“Yes,” comes his reply. “Neo, too.” Emerald’s heart swells with relief until it’s fit to burst.',
                        'She jumps up from the ground and swoops over to the door. She needs to check in with Mercury, to make sure that he got a note, to make sure that he knows.',
                        'And when Emerald meets his eyes across the hallway, she sees hope in them. A hope that hasn’t been there for over a decade.',
                        'Destroy this note, it said. So without another pause, Emerald folds the note back up, chews it up, and swallows it. Mercury does the same, and he almost smiles when he nods at her.',
                        'And now, they wait. To act when the time comes.'
                    ]
                }
            ]
        },
        {
            interface: 'scene',
            type: 'scene',
            sceneId: 'chapter_07_scene_03',
            title: 'CHAPTER 07 // SCENE 03 // THE ENEMY',
            setFlags: ['chapter_07_entry_13'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Directed to any avian (Excluding 005 & 007), do you even know who the enemy is supposed to be in this “imminent war” you’re training for?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Mercury Black'
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury shakes his head.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'You think they allow me to ask questions?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He barks out a laugh.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Their so-called mindless attack dog?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Emerald Sustrai'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The Director says we\'re fighting the devils.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald says, and Roman rolls his eyes.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Whether that’s true or not doesn’t seem to matter.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald shrinks down on herself a little.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'It’s been twelve years… the world was pretty bad when I was a kid, makes sense that it would only get worse.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'This time, Roman doesn’t argue.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Neo is in training right now and can’t answer your question.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald says.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But she’d probably agree with me. Raphael…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She stops, her eyebrows furrowing for a second.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Raphael still hasn’t come back.',
                        'That’s weird, he’s usually back from his treatment by now.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_07_entry_14'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Green'
                },
                {
                    type: 'message_body',
                    lines: [
                        '(I need to follow up on the previous anon’s ask because holy heck your response was brilliant. You write Salem so well.)',
                        'The gods inflicted misery and suffering, and yet you torment and humiliate. The gods stripped humanity of their magic, and yet you strip them of their freedom. The gods slaughter many, and yet so. have. you.',
                        'You said what you’ve done is a mere pinprick compared to the gods… and yet you intend to replace them, and your actions leave much to be desired in terms of godhood.',
                        'You are no better than the gods you scorn so vehemently, friend .'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Director Salem'
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem’s eyes turn as cold and harsh as a winter’s storm. She slithers towards you, and the light almost seems to draw away from her. The shadows cast across her face catch on her cheekbones, turning her pale face into the visage of death.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’ve had just about enough of you.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She says, and her voice is whisper soft as it carries through the room.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The gods slaughter billions , and you dare to compare a few measly lives to their death count?',
                        'When they left it broke the world, and our species still hasn’t recovered all the knowledge lost in the breaking.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She hisses, eyes narrowing as she continues towards you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Centuries of knowledge gone forever, because two beings were slighted. And you DARE to claim that I am no better than them?!',
                        'I admit my own faults.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem snarls. Your back hits a wall, and she looms over you, casting your face in shadows.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I never claimed to be better than the gods…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Her eyes seem to glow like coals.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        '...But I will be.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She turns away from you, and you breathe a shaky breath.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'You are no friend of mine.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She hisses, facing away.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But if you continue making these foolish accusations, I’ll tear out your throat myself.'
                    ]
                }
            ]
        }
    ]
}