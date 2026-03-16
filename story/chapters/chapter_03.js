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

const CHAPTER_03 = {
    id: 'chapter_03',
    title: 'Empathy and Threats',
    entries: [
        {
            interface: 'msg',
            type: 'reply',
            requireEvent: 'msg_alert_empathy',
            discoverTerms: ['research_labs'],
            setFlags: ['chapter_03_entry_01'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Fly'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Question for the esteemed and brilliant researchers of the lab: 002 mentioned an empathy link? Why would you put an empathy link between two of the subjects, surely ensuring that two different subjects would have such a close link would be dangerous for testing? Were there certain parameters you were testing when linking Subject 004 and 002 together or was it something that occurred unintentionally?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Watts'
                },
                {
                    type: 'narration',
                    lines: [
                        'Watts sighs, irritated, and glares across the room at Roman. On the exam table where he’s sitting, he ducks his head and keeps his eyes on the ground. Neo stays silent, but returns the scientist’s glare.',
                        'The scientist huffs, jotting something down on his clipboard.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        '002 should know better than to speak. It just lost its food privileges for the next three days, that should teach it to hold its tongue.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Watts snaps at Roman, who flinches but doesn’t meet the man’s eyes.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'As for the empathy link, believe me I would rather that none of them have any.',
                        'Tragically, one of the 004’s powers seems to be Empathy.',
                        'It bonds with people and can feel their pain and emotions, very useful for spying and such.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The man grimaces.',
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Much to my chagrin, the ability also seems to extend to 004’s fellow test subjects.',
                        'Thus the Empathy link between 002 and 004. Observe.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The scientist gestures for one of his assistants, and the woman nods. She grabs Roman’s upper arm and drags the boy over to the head scientist, the woman’s hooves clip-clopping on the tiles. Neo shifts in her guard’s grip, eyes wide as she strains towards Roman.',
                        'Watts retrieves a letter opener from an inside pocket and casually slices a cut up Roman’s arm.',
                        'Roman stiffens and his yelp is muffled by his mask. Across the room, Neo flinches and makes an aborted motion to grab her own arm, which appears uninjured.',
                        'Watts smirks, wiping the blood off the blade and tucking it back into his lab coat. '
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'See? It’s unfortunate, but it does have its uses.',
                        'Keeping the test subjects under control is always a priority, and what better way than to use the bonds they seem to have with each other?'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            requireEvent: 'chapter_03_subject_files_unlocked',
            discoverTerms: ['subject_005', 'subject_007'],
            setFlags: ['chapter_03_entry_02'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Dragosar'
                },
                {
                    type: 'message_body',
                    lines: [
                        'So. With all the revealed ‘subjects’ displaying either fear or contempt for the scientists and Director,',
                        'but none seem to risk attacking them, is there one amongst them they dare not risk intentionally earning the ire of?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Emerald'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Oh yeah, definitely. Sure, Hazel is a big guy, but he wouldn’t hurt us unless specifically ordered to.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald nods, tucking her knees into her chest.',
                        'Roman taps on the window to his cell, looking like he wants to argue. Emerald rolls her eyes.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Roman would of course disagree with me, but he has a knack for getting on the big guy’s nerves, but-'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'It’s Neo’s turn to interrupt, tapping insistently on her wall to pass a message to Roman. Who, in turn, taps the message to Emerald.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I was getting to them!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She snaps at him. Roman rolls his eyes.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The ones we don’t want to cross are 005 and 007.',
                        '007 is Miss Mangle-Face, as Roman so delights in calling her.',
                        'And 005 is… He’s terrifying.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald shudders. Neo nods vehemently, and Roman glances down the hallway as if the two mentioned avians might be listening in.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        '007 only cares about becoming more powerful, she’s had so many procedures she’s gone half crazy.',
                        'And 005 doesn’t need a reason to exact out punishment, he likes it.',
                        'He’s the Director’s personal attack dog, he actually believes she’s the gods returned to Earth.',
                        'They’ll both do anything the Director says.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald looks down at her hands, the rings over her head spinning and glowing agitatedly.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And not because their minds have been Wiped clean like… like 008.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            requireEvent: 'msg_alert_tyrian',
            setFlags: ['chapter_03_entry_03'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'yOUR TYRIAN IN YOUR AU MY BELOVED,, I hope he gets all the chaos and knives he gets'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Tyrian'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Oh well thank you, my darling.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Tyrian gives you a mocking bow. He stands, and aims a sharp toothed grin at you. A shark smiling at a minnow.',
                        'He crosses his arms behind his back and leans forward as he takes a step towards you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’m a creature who delights in the simple things in life.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Head tilted to one side, the multitude of eyes on his face blink in a ripple as he continues grinning.',
                        'Tyrian flips his knife up into the air and catches it without looking.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Death, mayhem, blood …',
                        'Anything and everything that my Goddess commands!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He tilts his head the other way, examining you.',
                        'The fanatical light in his eyes has nothing to do with the unnatural glow they emit normally.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Hope to see you again soon, my darling!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He cackles, and stalks away.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            requireEvent: 'chapter_03_subject_files_unlocked',
            discoverTerms: ['testing_chamber'],
            setFlags: ['chapter_03_entry_04'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Brachy'
                },
                {
                    type: 'message_body',
                    lines: [
                        'hang on im dumbass. 008 is luckier'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Salem'
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem narrows slit-pupiled eyes at you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I assume you mean “Lucifer”?',
                        'As if any of my angels would stray from their righteous path, or fall from the grace of their goddess.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She examines perfectly manicured nails. Through the observation window an avian screams and slams into a cube floating in the test chamber, leaving bloody handprints on it. Salem presses a button on the panel in front of her and leans into a microphone.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Inadequate work, soldier. Prepare for round 29-B.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The avian flaps in midair, hands glowing as they slowly heal their wounds.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Do not disappoint me again.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem clicks off the microphone, the avian nods, and they throw themself back into combat.',
                        'Their wounds are still bleeding.',
                        'She gestures through the window'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'See? As if any of my angels would ever betray me and fall as the legends say Lucifer fell.',
                        'Take 008 here for example.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem’s gaze turns away from you as she watches the avian dodge attacks by less than a hair.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'They can’t even remember their life from before the Facility, I can thank dear 001 for that.',
                        'Why would they ever betray their goddess, if they can’t even remember why .',
                        'No, none of my angels are Lucifer. The creatures are too loyal, they can’t even imagine disobeying me.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Her nails click on the panel in front of her.',
                        'No angels have fallen yet, none have joined the side of the “devils.”',
                        'At least… not yet …'
                    ]
                }
            ]
        },
        {
            interface: 'cams',
            type: 'scene',
            feedId: 'cafeteria',
            title: 'Cafeteria',
            requireEvent: 'cams_alert_chapter_03_end',
            discoverTerms: ['cafeteria'],
            setFlags: ['chapter_03_entry_05'],
            blocks: [
                {
                    type: 'camera_header',
                    camera: 'Cafeteria',
                    timestamp: 'UNKNOWN'
                },
                {
                    type: 'camera_narration',
                    sender: 'Anon',
                    lines: [
                        'I do have to wonder… what would happen, Director, if one of your ‘soldiers’ finally snapped and decided they would rather die',
                        'taking out as many of your scientists as they can… than being forced to entertain your little god complex?',
                        'After all, despite what you may think, they are living beings and some with enough free will to realise what a monster you are.',
                        'Can you afford to lose one of your ‘army’?'
                    ]
                },
                {
                    type: 'camera_divider',
                    text: 'SEGMENT BREAK'
                },
                {
                    type: 'camera_action',
                    lines: [
                        'The cafeteria is a tall white room with mirrored windows high above. The cameras are all well and good, but Salem prefers',
                        'to watch her subjects in a way that can’t be doctored by any meddling scientist. Watts may be her lead researcher, but she doesn’t trust him as far as she could throw him.',
                        'Not that she would throw him, of course. She has people to do that for her.',
                        'From her vantage point, she watches as 008 talks with the damn red-headed brat they’ve become so attached to in the last few weeks. 008 listens to the girl, cares for the girl. They’ve even begun prioritizing the red-head’s opinions over the orders and protocols Salem has worked so hard over the years to ingrain into 008’s mind.',
                        'It’s better when you don’t think, your Superiors are always smarter and will make better decisions. You will be told what to do.',
                        'You are special, you are powerful, you are unique. You are disposable, you are worthless, you are an object.',
                        'You have a name, you have a title, you have a purpose. You have no rights, you have no control, you are a number.',
                        'Don’t think, 008.',
                        'This red-head… She was making 008 believe it can think.',
                        'And if 008 can think, the trusting fool it is, the others will be able to convince it that their goddess was the true enemy, not the devils waiting outside the safety of the Facility’s walls. Fear keeps the others in check, but if 008’s foolish naivety gets added to the mix…',
                        'Salem gazes imperiously down at the pair. 008, the healer, the puppet, the blank slate. Stolen from its home, mind Wiped clean, and molded into the perfect obedient soldier. The girl, green eyes, bright smile, red hair in a long ponytail down her back. One of the General’s pet projects that she entertained so the man continues to look the other way.',
                        'A threat to everything Salem has built for the past twelve years.',
                        'She pulls up the girl’s file and sends a memo to Watts. “Tell Michael I have a new target for her to dispose of. Terminate with extreme prejudice.”',
                        'Can she afford to lose one of her army?',
                        '008 smiles at the girl, eyes wide as they hang onto the girl’s words.',
                        'No. ',
                        'No she can not.'
                    ]
                }
            ]
        }
    ]
}