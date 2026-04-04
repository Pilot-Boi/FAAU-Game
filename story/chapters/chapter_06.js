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

const chapter_06 = {
    id: 'chapter_06',
    title: 'What Was Lost',
    entries: [
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_06_entry_01'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Question for Tyrian, what’s his most favourite thing about being in the facility?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Tyrian Callows'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'My favourite thing about the Facility?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Tyrian ponders the question.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Saying “everything'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Feels like a cop out, so I’ll give you an actual answer.”',
                        'He thinks for a little bit, circling you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Wait!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He claps, and jumps over you with one flap of his wings. He lands in front of you with his arms outstretched.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’ve decided! My favourite thing about the Facility is the free reign I have to be who I am .',
                        'My Goddess gave me these abilities, these powers!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Tyrian flings his arms out wide and laughs. The sound echoes around the room, dark and dangerous and more than a little unhinged.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Here nobody arrests me for a few silly murders, and my true loves Death and Mayhem are encouraged!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He’s breathing heavily, his tail lashing erratically.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'For the first time in my life, and probably the last, I’ve never known more who I am.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_06_entry_02'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Devoir'
                },
                {
                    type: 'message_body',
                    lines: [
                        'Murder, torture, manipulation, lies and deceit, stripping people of free will to serve you, corruption of lives. You know, for someone who claims to want to become Gog, you sure do seem to enjoy acting like the Devil.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Director Salem'
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem actually laughs at this. It’s a dark chilling laugh, mirthless but sincere.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'My dear, are you aware of the atrocities that the actual gods committed?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She asks once her laughter dies down.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'They started wars, committed genocides, stripped humanity of their magic like a parent punishing an unruly child.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She scoffs, eyes turning hard as flint.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And then, after all that, they left and didn’t take responsibility for the travesties they committed.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem gestures in the direction of the cells.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And they left us to pick up the pieces, even as their departure caused a cataclysm in our world’s magic.',
                        'Well I’m picking up the pieces.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She states coldly, straightening to her full height.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'So believe me when I tell you that what I’ve done is a mere pinprick of candlelight in the raging sun that were the gods of old.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_06_entry_03'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'What is the basis on which it is decided, who gets bird legging, extra arms, extra eyes, and/or claws in the FA AU? And how does it happen in the AU?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Watts'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Well, I can’t explain to you how it happens, as the process is highly classified.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Watts says without looking up from his computer.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But I should be able to share the relevant data on the other topics.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He types in a command, and a live feed of Roman appears on the screen.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Let’s take 002 for example.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Beside the feed, a wire frame of the avian appears. He taps it and it begins to rotate slowly.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'As you can see, 002 has the customary two pairs of wings, these seem to be common for most of the avians.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Watts zooms in and slowly pans down the wire frame.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I understand that 002 has already explained to you about its mask.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He grumbles as the view passes Roman’s face.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But as for the bird legs, it appears that those avians with the power of Speed require these appendages.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He types in another command, bringing up an archived video of Roman training.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'As you can see, the claws on the legs provide the necessary friction for the avian to stop.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'As he says this, Roman skids to a halt, his feet digging into the floor and throwing up sparks.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Without them, I believe that they wouldn’t be able to. I hypothesize that they were an evolutionary requirement when the gods’ angels actually walked the planet.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Watts closes out the video, and returns to the previous screen.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'The same goes for Strength, giving the avian a second pair of arms.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'A wire frame of Hazel appears.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'As for the extra eyes, their origin is unclear.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He closes out all the tabs.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'All the avians develop them during their initial gene therapy, so it may be that they’re universal.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Watts looks away from you, returning to what he was working on.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Now if that’s all, I need to finish compiling the data from 008’s catastrophic Empathy link.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_06_entry_04'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'I’ve got a question for 007, you may have killed her, but how did it feel to be injured by someone weaker than you?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Cinder Fall'
                },
                {
                    type: 'narration',
                    lines: [
                        'In her hospital bed, Cinder stiffens.',
                        'One of her arms is covered in bandages, as is one of her legs and half of her face. But the half of her expression that you can see is murderous.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'My injuries have nothing to do with the skill of that girl.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She snaps, shifting as much as she can in her restraints.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Compared to my abilities, she burnt out more quickly than a matchstick held to a blazing fire.',
                        'If I may just remind you, I did kill her.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Cinder snarls, wincing slightly when her movements pull at her injuries.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And I won’t hesitate to do the same to you if you continue crossing me.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She slumps back onto the cot, turning her head away from you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'As the Director has delighted in telling me, my injuries are my own fault.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Her hand clenches into a fist, claws tearing into the rough fabric of the cot.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'My hubris and overconfidence.',
                        'These wounds can’t be attributed to the girl, they can only be blamed on me.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Cinder’s expression is unreadable.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I deigned to ignore the orders of my Goddess.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Her voice is flat, emotionless.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'This is the karmic punishment I deserve for ignoring her wisdom.'
                    ]
                }
            ]
        },
        {
            interface: 'cams',
            type: 'scene',
            feedId: 'ozpin_pine_house',
            title: 'Ozpin-Pine House',
            setFlags: ['chapter_06_entry_05'],
            blocks: [
                {
                    type: 'camera_header',
                    camera: 'Ozpin-Pine House',
                },
                {
                    type: 'camera_narration',
                    sender: 'Green',
                    lines: [
                        '*kicks open the facility door*',
                        'WHERE IS OSCAR',
                        '/lh',
                        'I gotta know where my son fits into this'
                    ]
                },
                {
                    type: 'camera_action',
                    lines: [
                        'In a cozy bedroom far away from the cold walls of the Facility, a boy lays on his bed reading a book. Freckles dot his striped cheeks, and his bright eyes rove the pages of the story he holds.',
                        'He doesn’t know that mere miles from here, people only a few years older than him are being stripped of their identity. He doesn’t know that at this very moment, the athlete from the cereal commercial is being murdered for the crime of being a friend.',
                        'He doesn’t know that his adoptive father isn’t just a Councilman.',
                        'All he cares about at the moment is that his father isn’t home yet. The biggest worry in his mind is what they’re going to have for dinner.',
                        'Oscar Ozpin-Pine doesn’t know how much his idyllic life is about to change.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_06_entry_06'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Devoir'
                },
                {
                    type: 'message_body',
                    lines: [
                        '“It doesn’t matter if I commit atrocities because others have done worse.” Sounds like a weak, petty excuse to try justify your horrors. You have all those power and knowledge, and instead of making the world better, you use it to add more pain, suffering and misery to it.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Director Salem'
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem pauses at this, as your words seem to actually reach her for the first time.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Some things… are necessary.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She says eventually.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'What’s the saying, you can’t make an omelette without breaking a few eggs? It’s pedestrian, but the message is true enough.',
                        'For the greater good of the world, I will do what must be done.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She says, standing to her full height and gazing down at you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'This world is broken, it has been since the day the gods left, and I intend to remedy that.',
                        'If I have to break a few toys to become the god this world deserves, then I will do so.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Salem slithers towards you, the shadows on her face making her expression more sinister than before.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Without. Hesitation.'
                    ]
                }
            ]
        },
        {
            interface: 'scene',
            type: 'scene',
            sceneId: 'avian_origins',
            title: 'Avian Origins',
            setFlags: ['chapter_06_entry_07'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Anon'
                },
                {
                    type: 'message_body',
                    lines: [
                        'For the faau: Where did each of you (the avians) come from? And how did you end up in the facility?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Neo Politan'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'This idiot thought it would be funny to sneak in here.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Neo signs, nodding her head towards Roman. He can’t even defend himself, masked as he is, so he just crosses his arms.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'So I went in to rescue him.',
                        'Sadly, I somehow forgot that I was six.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Her hands pause, and she winces.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'So instead of rescuing him, we both got captured. And the rest is history.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Tyrian Callows'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'As I’ve said before, I was a prisoner on death row.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Tyrian says, with a note of pride in his voice.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'But then my Goddess plucked me out of the depths of obscurity and raised me to the light!',
                        'The same is true of my friend here-'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He reaches towards Hazel, but the larger man growls at him.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Hazel Rainart'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'We are not friends.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Hazel growls, crossing one pair of arms.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And only by sheer coincidence do I share any backstory with you.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Tyrian looks mildly put out.',
                        'Hazel turns to face you.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I was also a death row convict.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He admits.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I killed the bastards on the Council who were at fault for my sister’s death.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'His glower darkens, teeth bared in a snarl at the memory.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I was at peace with my fate, having avenged her, but then the Director showed up in my cell and offered me a second chance.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'It’s like his face is carved from stone, you can’t detect any emotion except anger.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'She offered me the chance to tear down the system that was really at fault, and gave me the tools to do so.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Mercury Black'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I was in Juvie.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury says casually, arms hanging out through the bars of his cell window.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Killed my bastard of a dad and got arrested.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He scoffs, rolling his eyes.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Just goes to show, no good deed goes unpunished.',
                        'Em? You wanna go next in our little show and tell?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury calls across the hallway. Emerald just shakes her head, tears still running down her cheeks. He sighs.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Figures. She’s always like this after one of Raphael’s treatments, and from the screaming sounds like this one was a doozy.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He runs a hand through his hair.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Basically, from what I’ve pieced together over the years, Em ran away from a bunch of foster homes.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He jabs a thumb down the hall to Cinder’s empty cell.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Miss Perfect over there found her, and then they both got found by our mighty Director.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury’s eyes darken minutely, and he glances back across the hall.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Hey Em? You think Raphael’s up for sharing his story?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He calls, voice softer than before.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Emerald Sustrai'
                },
                {
                    type: 'narration',
                    lines: [
                        'Emerald shakes her head, tucking her knees closer to her chest.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Not-'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'She swallows thickly, her voice croaky with tears.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Not for a little while at least…'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Mercury Black'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Yup, that checks out, dude’s always out of sorts after a treatment.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Mercury sighs again, gazing down the hall in the direction of the hospital wing.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Hope they get Doc Polendina down here to check on him if he’s that bad off.'
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
                        'REQUEST TO VIEW LIVE CAMERA FEED OF [PROJECT: RAPHAEL]',
                        '',
                        'REASON FOR REQUEST: ',
                        'Dr. Polendina, I’m afraid your assistance is needed.',
                        '-A friend',
                        '(PS: I am very sorry about your daughter, we would have stopped 007 if we could. We have faith that she will recover, she’s a strong girl.)',
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
            feedId: 'containment_hallway_b',
            title: 'Containment Hallway B',
            setFlags: ['chapter_06_entry_09'],
            blocks: [
                {
                    type: 'camera_header',
                    camera: 'Containment Hallway B',
                },
                {
                    type: 'camera_narration',
                    sender: 'Brachy'
                },
                {
                    type: 'camera_action',
                    lines: [
                        'Pietro slumps back into his chair. He’s just left Med Bay 3, where his daughter was taken after the… accident.',
                        'That’s what Director Salem called it. An accident. A horrible gas explosion that injured his daughter and countless others, and killed that poor Nikos girl.',
                        'Pietro had to fight to keep his face straight, to not display the rage he felt when the woman blatantly lied to his face.',
                        'Accident his foot, he’s seen the footage. He watched that girl swat his daughter aside, watched her crumple to the ground like a puppet with her strings cut.',
                        'He watched that girl burn half of her body and then suck the very life out of Miss Nikos in retaliation, until the light left her eyes.',
                        'But for his daughter’s sake, he keeps silent. He tries not to scream, and he bites out the most sincere “Thank you” he can to the woman who is at the center of this tragedy.',
                        'The control panel under his right hand beeps, indicating that he has a message. He rubs a hand over his face and opens it, only slightly surprised when he sees that it’s from the same “friend” who sent him the footage an hour ago.',
                        'Has it only been an hour? It feels like a lifetime has passed.',
                        '“Dr. Polendina, I’m afraid your assistance is required,” the message reads. He’s barely read the message when once again a video feed has opened on the tiny screen.',
                        'A boy sits in an empty room. His eyes are empty, like mirrors reflecting nothing. His expression is blank, but he sits stock still. His wings tremble at his back, empty eyes blinking slowly, but not moving.',
                        'Pietro sucks in a breath.',
                        'He’s moving before he realizes it, chair taking steps towards the room, towards what he hopes is a live feed. He knows this boy, knows him from scarred hands and naive smiles in conversations with his daughter, with Pyrrha .',
                        '“Jaune, my dear boy, what have they done to you?”',
                        'He wasn’t attentive enough to protect Pyrrha, to protect his daughter. But maybe… maybe he can protect this boy, and help Jaune through the grief of losing the only friend he ever had.'
                    ]
                }
            ]
        },
        {
            interface: 'msg',
            type: 'reply',
            setFlags: ['chapter_06_entry_10'],
            blocks: [
                {
                    type: 'message_header',
                    sender: 'Squid'
                },
                {
                    type: 'message_body',
                    lines: [
                        'How did Dr. Polendina get involved with the project?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Polendina'
                },
                {
                    type: 'narration',
                    lines: [
                        'Pietro’s laugh is dry and mirthless, and it echoes off the thankfully empty hallways as he walks towards where Jaune is sitting.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Would you believe me if I said it was for a good cause?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He asks.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'My daughter, Penny.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He starts, lowering his voice marginally.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I adopted her, but she’s the light of my life.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He sighs.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Her legs were gone, a “defect'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'From birth, and I… I saw a kindred spirit in her.”',
                        'Pietro shakes his head, dejected.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'She’s a stronger person than I could ever hope to be.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He pauses at a hallway intersection, and turns left.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I wanted to help her, but I didn’t have access to the materials or funds to build her the legs she deserves until…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He shudders.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        '...until She approached me.',
                        'She said she was working on a project, and as one of the top bio-medical doctors in the country, she was interested in recruiting me.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Pietro explains.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'All I asked in return was to have free rein to build my Penny her legs.',
                        'She agreed.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He swallows.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'And from then on, I’ve turned a blind eye to the horrors she’s committed in the name of her “progress."',
                        'But not anymore.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Pietro shakes his head, his chair stepping faster as a new light comes into his eyes. He stops outside a door, his hand raised hesitantly.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’m done standing by, caring only for my daughter while these children suffer.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He knocks on the door, and steps inside.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Hello, Jaune.'
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
                        'REQUEST TO STREAM SECURITY CAMERA AND AUDIO [SUBJECT_008] AND [CONTAINMENT_CHAMBER] TO OUTSIDE SOURCE...',
                        '...',
                        'OUTSIDE SOURCE CANNOT BE IDENTIFIED',
                        '',
                        'ALLOW ACCESS?',
                        '[ YES ]    [ NO ]'
                    ]
                }
            ]
        },
        {
            interface: 'scene',
            type: 'scene',
            sceneId: 'jaune_check_up',
            title: 'Jaune Check-Up',
            setFlags: ['chapter_06_entry_11'],
            blocks: [
                {
                    type: 'speaker',
                    speaker: 'Jaune Arc'
                },
                {
                    type: 'narration',
                    lines: [
                        'A lot of things in Jaune’s life were confusing.',
                        'His name for one. Jaune. The scientists didn’t call him that, they called him Subject 008. Miss Salem and the Superiors didn’t call him that, they called him Raphael. Even most of the other avians called him that.',
                        'Dr. Polendina called him Jaune. Penny called him Jaune. Jaune called him Jaune.',
                        'And…',
                        'Nobody else did. He thought someone did. Nobody else did. All was well.',
                        'That was another confusing thing. Jaune’s memory was like the cheese he saw on some of the technicians\' sandwiches. Full of holes. He couldn’t for the life of him think about what could fill the holes in his mind, but sometimes, when he was alone in his dark room, he could feel them there. On the corners of his mind.',
                        'But only when he wasn’t thinking about it.',
                        'Sometimes he wondered what life was like outside of The Facility’s walls. It was dangerous out there, Miss Salem said. They were preparing for war out there, and Jaune and the others had to be ready to fight. To follow orders, die if necessary.',
                        'Jaune was ready to die if necessary. If Miss Salem said it was necessary.',
                        'He sat in a daze on a cot in a blinding white room. Jaune blinked slowly, staring at the wall across from him. His head felt like it was full of cotton, like his brain hadn’t quite reconnected yet.',
                        'Jaune often felt like this. He’d blink his eyes open in a room just like this, not quite able to remember how he got there. He often woke up in places without being able to remember how he got there.',
                        'Once a month usually. So that’s why this was confusing, because this is the second time in a month. Probably because of…',
                        'He couldn’t remember. The memory was there, but when he tried to grasp it, the thought dissipated like smoke.',
                        'It probably wasn’t important.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Polendina'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Hello, Jaune.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'A warm voice said, and the door creaked open. Jaune blinked slowly and looked up. He’d be punished later for his slow reactions.',
                        'Dr. Polendina smiled at him from the doorway, wheeling his chair in. Jaune just stared blankly at him, fighting blearily at the fog in his mind. At his lack of reaction, the doctor’s smile faltered. But he fixed it back in place quickly.',
                        'Jaune was too out-of-it to notice that the man’s smile was much more forced than normal.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'How are you feeling?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The man asked kindly, pulling out his pad to scan Jaune for injuries.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Jaune Arc'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Nothing to report.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Jaune said automatically, coming a bit more awake at the familiarity of protocols that had been beaten into him for longer than his faulty memory could recall.',
                        'Dr. Polendina’s brow furrowed, and Jaune winced. Evidently that hadn’t been the answer the doctor was wanting to hear.',
                        'The rest of the check-up went smoothly, with Dr. Polendina tutting more loudly than usual as he wrapped Jaune’s injuries. The doctor kept up a running commentary of soothing dialogue, nothing too taxing, nothing that would require a response. Slowly, the blonde came back to himself.',
                        'Dr. Polendina wrapped a bandage around Jaune’s palm, careful to keep the cloth from irritating the eye on the back of the teen’s hand. And then the doctor paused, grasping Jaune’s scarred hand in his warmer one.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Polendina'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'My boy…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The man’s voice shook, and Jaune blinked in surprise when he realized that there were tears dripping from those warm brown eyes. “I am so sorry for your loss. News of the… accident traveled fast, as did your reaction to her death. You and she were very close, and I regret more than anything not stepping in sooner. If I had maybe Pyrrha-“'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Jaune Arc'
                },
                {
                    type: 'narration',
                    lines: [
                        'Jaune blinked.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Who?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Polendina'
                },
                {
                    type: 'narration',
                    lines: [
                        'Dr. Polendina stuttered to a halt.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'What… what did you just say?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Jaune Arc'
                },
                {
                    type: 'narration',
                    lines: [
                        'Jaune cocked his head to one side and then the other.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Who is that?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Pietro’s eyes widened a fraction, and through his hands Jaune could feel a portion of the man’s rising panic. It was… familiar.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Polendina'
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
                        'Jaune gazed blankly at him.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Pyrrha Nikos.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The doctor tried again, but again got not a flicker of recognition.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'You know her, Jaune. You two were incredibly close, you know her!'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Jaune was beginning to feel worried, was Dr. Polendina okay?'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Jaune Arc'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’m sorry sir, but I don’t know who that is.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Jaune said slowly, apologetically. Was this a test? A test that he was failing? Definitely failing, because Dr. Polendina looked more horrified with every word Jaune said.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Polendina'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'You… you really can’t remember, can you, dear boy?'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The doctor’s voice was faint, the warmth given way to shock.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Jaune Arc'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’m sorry.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Jaune repeated.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'My memory… ya know…'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'He definitely failed this test.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’m sorry.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Dr. Polendina'
                },
                {
                    type: 'dialogue',
                    lines: [
                        'No… no.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Dr. Polendina’s grip tightened on Jaune’s hands.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'You have nothing to be sorry for.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The certainty in his voice surprised Jaune, as did the resolve he could feel pulsing out of the man in waves.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'This, none of this, is your fault.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The doctor released Jaune’s hand and returned his medi-pad to his lap. As he rolled to the door, Dr. Polendina paused and glanced over his shoulder. Jaune still sat on the cot, watching the man go, the wings on the sides of his head twitching in confusion and agitation at the man’s sudden emotional shift and departure.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’m sure this must all be very confusing for you.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'The doctor said eventually. Jaune nearly sobbed out loud. Yes it was confusing. But how was this any different than normal?'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'Don’t worry, Jaune.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Dr. Polendina reassured him, throwing caution to the winds.'
                    ]
                },
                {
                    type: 'dialogue',
                    lines: [
                        'I’ll see you soon, very soon, and I’ll get you out of here. And then… then maybe everything will start to make sense.'
                    ]
                },
                {
                    type: 'narration',
                    lines: [
                        'Jaune doubted that, but he nodded. Apparently this was the correct response, because the doctor smiled, returned the nod, and left.'
                    ]
                },
                {
                    type: 'speaker',
                    speaker: 'Jaune Arc'
                },
                {
                    type: 'narration',
                    lines: [
                        'Jaune sighed and curled up on the cot, waiting for someone to collect him. His wings wrapped around his body, trying to retain whatever warmth they could from the processed air.',
                        'Someone would be by to collect him soon, and transport him back to his room with its familiar darkness and hard blue cot.',
                        'But for now Jaune was alone.',
                        'In a blindingly white room.',
                        'With a memory like cheese holes.',
                        'And the promise that everything in his life would make sense soon.',
                        'Jaune stared at the scars on his hands. Scars that he couldn’t remember getting, and scars he could. An eye with a blue pupil blinked up at him from the back of his hand. Two sets of huge buttery wings shuddered on his back, and a third pair trembled on the sides of his head.',
                        'Subject 008. Raphael. Project Dovetail. Jaune.',
                        'He had no name. He was no one. He was nothing.',
                        'Everything about his life was confusing. The Facility was the only part of it that made sense. The Facility was structure, and safety, and orders. He didn’t need to think for himself.',
                        'Following orders wasn’t confusing, it made sense.',
                        'So he was most confused when the tiniest part of him longed for the doctor’s nonsensical promise to be true.'
                    ]
                }
            ]
        }
    ]
}