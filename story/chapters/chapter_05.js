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

const chapter_05 = {
    id: 'chapter_05',
    title: 'Remembering and Forgetting',
    entries: [
        {
            interface: 'msg',
            type: 'reply',
            requireEvent: 'chapter_05_start',
            setFlags: ['chapter_05_entry_01'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Caterpillar'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Hey 001, has anyone ever reacted severely/been badly injured by one of the *ahem*, “treatments?” Considering how far things seems to go it seems like it could happen…'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Emerald Sustrai'
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald can’t meet your eyes.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The first person I Wiped I…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Her wings curl protectively around her, shielding her from view.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I had just gotten my wings.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She murmurs, wringing her hands.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I didn’t have full control over my powers yet, but the Director didn’t care. She-'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald swallows thickly.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'She’d just acquired a new candidate for the treatments, but they were a threat to security so…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald shrugs helplessly, still not meeting your eyes.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'So she had me Wipe them.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The rings over her head continue their spinning, the red in them pulsing sickly.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I wasn’t fully in control of my powers.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She repeats, her voice breaking.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I was scared. I was hurt, and I was scared . And so I overdid things.',
                        'The Director asked me to only Wipe memories of herself from the candidate’s mind.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She shudders, gazing blankly at the wall a foot and half left of your head.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But instead, I Wiped everything.',
                        'All I can remember is them sitting there. Tears streaming from their eyes, but no emotions left. An empty shell.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She shakes her head, tears welling up in her eyes.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And the Director said ‘Excellent work!’'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald lets out a choked sounding sob, burying her face in her hands.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'We were just little kids! I didn’t mean to! I’m sorry, 008 please, I’m sorry, I didn’t mean to, I’m sorry-!'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_05_entry_02'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        '“A threat to security” … “wiping the memories of Salem” … “we were just little kids” … hmm',
                        '008, by any chance, does the name Ruby Rose mean something or sound familiar to you?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Subject 008'
                },
                {
                    type: 'narration',
                    lines: [
                        'They blink their eyes at you, processing the name.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'No?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'They tilt their head, eyebrows pressing together in confusion.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Should it? Is this a test? ‘Cause I’m really bad at tests, you can ask anyone!'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_05_entry_03'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Dragosar'
                },
                {
                    type: 'message_body',
                    lines: [
                        '08… maybe the name Ruby Rose doesn’t mean anything to you… but does Saphron mean anything? Does ARC mean anything to you?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Subject 008'
                },
                {
                    type: 'narration',
                    lines: [
                        'As soon as you say the names, 008 freezes where they stand.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I- I don’t-'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'They stutter. He stutters. He stumbles back a few steps, shaking his head, trying to clear the fog from his mind.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Who- How- What are you-'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He backs away until he runs into a wall, and he spins around, blue eyes wide and panicked.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I don’t know what you’re talking about! I- I don’t know who that is, but-'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He stares at you, shaking his head, panic and confusion and pain on his face.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But I do know. But I don’t know. But-'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Shaking his head more than ever, the confusion rises in his expression.',
                        'But the pain does more.',
                        'One second he’s standing, the next he’s dropped to the ground. The pain overtakes the confusion, and the question of'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Arc'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Is driven from his mind. Agony like an ocean of fire floods his body.',
                        'A scream rips itself from his throat, and for a split second he’s certain that he’s dying. Nobody could feel this much pain and survive.',
                        'He feels pain, adrenaline, and focus. Not his own. His screams draw personnel from open doorways, but he doesn’t even notice them. They call guards when he writhes away from their restraining hands and tries to bolt for the stairs.',
                        'The stairs that lead up, to the floor above. Where the cafeteria is.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'PYRRHA!!!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He screams, tears streaming from his eyes as he pulls against their hands with all his strength. A needle plunges into his neck. His eyes roll back into his head. He slumps in their hold, still weakly straining to get upstairs.',
                        'Through his Empathy link with her, Jaune isn’t sure if she died or if he did.'
                    ]
                }
            ]
        },
        {
            interface: 'scene',
            type: 'scene',
            sceneId: 'chapter_05_scene_01',
            title: 'CHAPTER 05 // SCENE 01 // JAUNE’S BREAKDOWN',
            setFlags: ['chapter_05_entry_04'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Green'
                },
                {
                    type: 'message_body',
                    lines: [
                        'WHO INJECTED WHAT INTO HIM I WILL LITERALLY FIGHT YO',
                        'You as in whoever did what to Jaune. On a side note, I hope he isn’t punished. Don’t punish him for the actions of other people, Salem.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'As soon as Jaune wakes back up, he’s screaming.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Watts'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Hold him down!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Watts orders as soon as he recovers. Black-visored guards rush past him and grab the avian’s flailing limbs. With no little effort, his arms and legs are forced into the plastic cuffs on the exam table. One of Roman’s muzzles is forced over his mouth, silencing his screams.',
                        'Tears stream sideways down his face. No amount of restraint can stop him from shaking.',
                        'Salem chooses that moment to sweep in.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Director Salem'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Michael was injured in the attack.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She says to Watts, not even glancing at the avian on the table.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'As was Polendina’s brat.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The scientist jumps to his feet and wipes down his lab coat.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Watts'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And the Nikos girl?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Director Salem'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Dead.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem confirms. Jaune’s eyes squeeze shut and he lets out a muffled sob at her words. Seeming to just notice him, she crosses to the table, gazing down at the boy. She examines him for a moment, her cold red eyes meeting his pained blue ones.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The Empathy link?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She asks Watts, circling to the other side of the table.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Watts'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'That’s what the data seems to suggest.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Watts confirms, passing her clipboard of printouts.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'It has been completely incapacitated, the reaction is like nothing we’ve ever seen from 002 and 004.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Director Salem'
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem nods and glances at the next page of printouts.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'How long will it take 008 to recover?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She asks, passing the clipboard back to the man.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Michael will need Healing.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Watts'
                },
                {
                    type: 'narration',
                    lines: [
                        'Watts shakes his head.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Regrettably, I don’t believe that will be possible.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem’s expression turns dangerous, and the man hurries to continue.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'What I mean to say is that… 008’s neurons are continually firing. The Empathy link with this… girl, and it’s ability feel her death-'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Director Salem'
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem holds up a hand, and Watts cuts off his rambling immediately.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'How long?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Watts'
                },
                {
                    type: 'narration',
                    lines: [
                        'Watts stares at her, and he slumps minutely.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Without intervention, there is no way to tell.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'For a minute the only sound is Jaune’s sobbing from the table between them. He goes ignored.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Director Salem'
                },
                {
                    type: 'narration',
                    lines: [
                        'She nods slowly, seemingly pondering something.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Well, if it’s disturbed by the memory of the girl…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She pulls out her tablet, and swipes to the intercom in Emerald’s cell.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Then those memories will simply have to go.'
                    ]
                }
            ]
        },
        {
            interface: 'cams',
            type: 'scene',
            feedId: 'avian_cellblock',
            title: 'Avian Cellblock',
            setFlags: ['chapter_05_entry_05'],
            blocks: [
                {
                    type: 'camera_header',
                    camera: 'Avian Cellblock',
                },
                {
                    type: 'camera_narration',
                    sender: 'Anon',
                    lines: [
                        'Can the rest of you hear 008?'
                    ]
                },
                {
                    type: 'camera_action',
                    lines: [
                        'Emerald is sitting in her cell, knees tucked into her chest as usual, when the normal monotonous silence is broken by an ear splitting scream echoing down the hallways.',
                        'Before she knows what she’s doing, she’s leapt up and bolted to the door of her cell. Her hands clutch at the bars of the window and she gazes up and down the hall as best as she can. There’s no one there, but she can see that the others have done the same.',
                        'The screams and intermingled sobs haven’t stopped, and Emerald recognizes them from some distant memory. “What’s going on?” Neo signs at her through the bars.',
                        '“I don’t know!” Emerald calls back. She meets Mercury’s eyes from across the hallway, but he just shakes his head, looking as confused as her.',
                        'The screams are just barely distinguishable as words. Even though none of them can tell what is going on, there’s no doubt about who is involved. Because they’ve all heard each other’s screams enough to identify each other by them.',
                        'Somewhere, for some reason, Raphael is in incredible pain.'
                    ]
                }
            ]
        },
        {
            interface: 'terminal',
            type: 'terminal',
            requireEvent: 'pietro_terminal_request',
            setFlags: ['chapter_05_entry_06'],
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
                        'REQUEST TO VIEW CAMERA FOOTAGE AND REPORT OF [SUBJECT 007]’S LATEST MISSION.',
                        '',
                        'REASON FOR REQUEST: ',
                        'Dr. Polendina, something is wrong.',
                        '-A friend',
                        '',
                        'ALLOW ACCESS?',
                        '[ YES ]    [ NO ]'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            requireEvent: 'msg_alert_pietro',
            setFlags: ['chapter_05_entry_07'],
            blocks: [
                {
                    type: 'narration',
                    lines: [
                        'Pietro sighs and pushes up his glasses, rubbing at his tired eyes. It’s been a long time since he worked this late in the day.',
                        'Without any warning, the screens of his computer go black.',
                        'He drops his glasses onto his desk, staring stunned at the console.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'No.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He snatches his glasses back up and pushes them onto his face.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'No, no, no-'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He trypes frantically at the keyboard, but the computer remains unresponsive.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Oh dang it all!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He sighs, dejected, leaning back in his chair.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Access Granted.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Types it’s way across his screen, and he squints at it.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Dr. Polendina, something is wrong.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He blinks at this, adjusting his glasses and leaning forward. If someone managed to hack into the Facility’s mainframe then-'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'A friend.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'And then his screens are replaced with a grainy video feed, and his concern about possible security breaches goes out of his mind.',
                        'Pietro recognizes his daughter, of course. And he recognizes the girl sitting next to her, Miss Pyrrha Nikos. Both of them are sitting in the cafeteria, chatting amicably.',
                        'And neither of them notice when an avian with soot-black hair and ember-bright wings stalks into the room.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'No, wait-!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Pietro starts, clutching the arms of his assisted walking chair, but he’s too late. Several hours too late.',
                        'For the next few minutes, he watches in slack-jawed horror. He watches the other occupants of the cafeteria run screaming from the cackling girl. He watches the avian bat his daughter aside like she’s a paper doll. He watches his daughter scream, slam into a distant wall, and not get back up when she slides to the floor.',
                        'He watches as Pyrrha grabs a dinner tray and a broom to defend everyone else as they retreat.',
                        'He watches as a swipe of the girl’s claws catch Pyrrha at the ankle, and she falls to the ground with a scream. He watches as the avian’s eyes glow red like flames when she sticks her clawed fingers into Pyrrha’s chest.',
                        'And he watches as Pyrrha’s very life force is drawn out of her body and she crumples to the ground.',
                        'Pietro lets out a shuddering breath, not realizing that he’s been holding his breath the whole time. He feels sick to his stomach. He barely notices his monitors return to their normal views of spreadsheets and data.',
                        'He only looks up in time to see a memo arrive from someone.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Dr. Polendina, your presence is required. Report to Med Bay 3 at once. -Director Salem.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Suddenly he has no doubt whose fault this tragedy lies with.'
                    ]
                }
            ]
        },
        {
            interface: 'scene',
            type: 'scene',
            sceneId: 'chapter_05_scene_02',
            title: 'CHAPTER 05 // SCENE 02 // JAUNE’S MEMORY WIPE',
            setFlags: ['chapter_05_entry_08'],
            blocks: [
                {
                    type: 'narration',
                    lines: [
                        'I feel so bad. Poor Emerald, being forced to Wipe Jaune’s memory again, especially since the first time she did it was clearly traumatizing for her.',
                        'At least she can control her powers better now, yeah???',
                        'Anon'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Emerald Sustrai'
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald is lead into the room, and as soon as Jaune sees her, his head cocks to one side.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Hey, Raphael…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She rasps, guilty beyond belief. He’s confused for a second, but then he shakes his head, eyes widening with rising panic.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'This-'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She swallows thickly, and tries for a smile.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'This won’t hurt a bit.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She closes her eyes, and the rings over her head glow bright enough to be blinding. They spin, faster, faster , until all he can see is a red X.',
                        'As soon as they start spinning, he feels something powerful go through his mind, a wave. It’s like a rolling ocean of acid steaming into the folds of his brain, burning away everything it touches. Everything it touches, that is, that has to do with Pyrrha.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Jaune Arc'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'No!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He screams. Jaune’s eyes shoot open, and for a moment he struggles, and then he stills. He latches onto different memories, turning them over in his mind, trying to hold them above water. But each one is wrenched from his grasp and dissolved in mere moments.',
                        'Slowly but surely, he is forgetting.',
                        'His yell is desperate, tears welling up in his eyes. He focuses on them training together. Gone. He focuses on her introducing herself. Gone. He tries more recent memories, like when Pyrrha surprised him by telling him he’s a person. Gone. What day is Pyrrha’s birthday? Gone. What is her favourite color? Gone. He has to change tactics.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Pyrrha.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He whispers, voice shaky with tears,'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Pyrrha, Pyrrha, Pyrrha…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He repeats her name over and over as he continues focusing on different memories. It becomes a little easier, the memories lasting a little longer as her name rings out through his mind. He begins to feel hope, as long as he has her name…',
                        'Salem chuckles softly when she realizes what it is doing. No matter. It has never succeeded in fighting off Uriel’s abilities.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Pyrrha, Pyrrha, Pyrrha…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Her favourite catchphrases. Gone. The way her eyes glint before she laughs. Gone.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Pyrrha, Pyrrha, Pyrrha…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Her name doesn’t even sound like a real word anymore. But Jaune keeps repeating it, over and over, if he can just hold onto her name…',
                        'The shape of her face. Gone. The color of her hair. Gone. The sound of her voice. Gone. Jaune begins to sob.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Pyrrha, Pyrrha, please…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem raises an eyebrow at the begging. That is a new development, she’s going to have to keep an eye on that.',
                        'Jaune forgets Pyrrha’s bright eyes, eyes that didn’t miss a thing. He forgets her soft, twinkling laugh, and all the times he managed to make it happen, even on his darkest days. Pyrrha becomes a fuzzy concept in his mind, no longer a person but an idea, a half-held thought of something he used to know.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Pyrrha, Pyrrha, Pyrh, no, please!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Jaune wails, voice thick with despair.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I can’t forget, I don’t want to forget, I don’t want to lose her!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He can take the pain. The pain of losing her in life is preferable to losing her in memory.',
                        'All he has is a name. Pyrrha. Who is Pyrrha? Someone important. A friend? A Superior? Someone… someone… someone Jaune can’t remember. What did it mean? What did it mean?',
                        'And just like that, the name vanishes from his mind.',
                        'What had he just been thinking about? He stops crying, now confused. Why is he sad?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Director Salem'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Guards, you may remove the restraints.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Miss Salem is talking. Emerald is crying. Why is she crying? They both sound like they’re a million miles away. A red X is burned into his mind.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'It won’t be fighting anymore.'
                    ]
                }
            ]
        }
    ]
}