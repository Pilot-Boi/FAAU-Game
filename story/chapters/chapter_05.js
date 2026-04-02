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
                    speaker: 'The Director'
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
            setFlags: ['chapter_05_entry_03'],
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
            setFlags: ['chapter_05_entry_04'],
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
            sceneId: 'jaune_empathy_feedback',
            title: 'Jaune Empathy Feedback',
            setFlags: ['chapter_05_entry_05'],
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
                    type: 'divider',
                    text: '---'
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
                        'Watts orders as soon as he recovers. Black-visored guards rush past him and grab the avian’s flailing limbs. With no little effort, his arms and legs are forced into the plastic cuffs on the exam table. One of Roman’s muzzles is forced over his mouth, silencing his screams.'
                    ]
                },
                {
                    type: 'divider',
                    text: '---'
                },
                {
                    type: 'narration',
                    lines: [
                        'Tears stream sideways down his face. No amount of restraint can stop him from shaking.'
                    ]
                },
                {
                    type: 'divider',
                    text: '---'
                },
                {
                    type: 'narration',
                    lines: [
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
                    type: 'divider',
                    text: '---'
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
            setFlags: ['chapter_05_entry_06'],
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
        }
    ]
}