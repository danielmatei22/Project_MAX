autowatch = 1;

var chordToMidi = {
    // Major chords
    "Cmaj": [48, 52, 55], "C#maj": [49, 53, 56], "Dmaj": [50, 54, 57],
    "D#maj": [51, 55, 58], "Emaj": [52, 56, 59], "Fmaj": [53, 57, 60],
    "F#maj": [54, 58, 61], "Gmaj": [55, 59, 62], "G#maj": [56, 60, 63],
    "Amaj": [57, 61, 64], "A#maj": [58, 62, 65], "Bmaj": [59, 63, 66],
    
    // Minor chords
    "Cm": [48, 51, 55], "C#m": [49, 52, 56], "Dm": [50, 53, 57],
    "D#m": [51, 54, 58], "Em": [52, 55, 59], "Fm": [53, 56, 60],
    "F#m": [54, 57, 61], "Gm": [55, 58, 62], "G#m": [56, 59, 63],
    "Am": [57, 60, 64], "A#m": [58, 61, 65], "Bm": [59, 62, 66],
    
    // Dominant 7th
    "C7": [48, 52, 55, 58], "C#7": [49, 53, 56, 59], "D7": [50, 54, 57, 60],
    "D#7": [51, 55, 58, 61], "E7": [52, 56, 59, 62], "F7": [53, 57, 60, 63],
    "F#7": [54, 58, 61, 64], "G7": [55, 59, 62, 65], "G#7": [56, 60, 63, 66],
    "A7": [57, 61, 64, 67], "A#7": [58, 62, 65, 68], "B7": [59, 63, 66, 69],
    
    // Major 7th
    "Cmaj7": [48, 52, 55, 59], "C#maj7": [49, 53, 56, 60], "Dmaj7": [50, 54, 57, 61],
    "D#maj7": [51, 55, 58, 62], "Emaj7": [52, 56, 59, 63], "Fmaj7": [53, 57, 60, 64],
    "F#maj7": [54, 58, 61, 65], "Gmaj7": [55, 59, 62, 66], "G#maj7": [56, 60, 63, 67],
    "Amaj7": [57, 61, 64, 68], "A#maj7": [58, 62, 65, 69], "Bmaj7": [59, 63, 66, 70],
    
    // Minor 7th
    "Cm7": [48, 51, 55, 58], "C#m7": [49, 52, 56, 59], "Dm7": [50, 53, 57, 60],
    "D#m7": [51, 54, 58, 61], "Em7": [52, 55, 59, 62], "Fm7": [53, 56, 60, 63],
    "F#m7": [54, 57, 61, 64], "Gm7": [55, 58, 62, 65], "G#m7": [56, 59, 63, 66],
    "Am7": [57, 60, 64, 67], "A#m7": [58, 61, 65, 68], "Bm7": [59, 62, 66, 69],
    
    // Diminished 7th
    "Cdim7": [48, 51, 54, 57], "C#dim7": [49, 52, 55, 58], "Ddim7": [50, 53, 56, 59],
    "D#dim7": [51, 54, 57, 60], "Edim7": [52, 55, 58, 61], "Fdim7": [53, 56, 59, 62],
    "F#dim7": [54, 57, 60, 63], "Gdim7": [55, 58, 61, 64], "G#dim7": [56, 59, 62, 65],
    "Adim7": [57, 60, 63, 66], "A#dim7": [58, 61, 64, 67], "Bdim7": [59, 62, 65, 68]
};

var markovChains = {
    "Pop": {
        // Major chords
        "Cmaj": ["Gmaj", "Am", "Fmaj"], "Dmaj": ["Amaj", "Bm", "Gmaj"],
        "Emaj": ["C#m", "Bmaj", "Amaj"], "Fmaj": ["Cmaj", "Dm", "Gm"],
        "Gmaj": ["Cmaj", "Em", "Dmaj"], "Amaj": ["F#m", "Dmaj", "Emaj"],
        "Bmaj": ["G#m", "Ebmaj", "F#maj"],
        
        // Minor chords
        "Am": ["Fmaj", "Dm", "Em"], "Bm": ["Gmaj", "Em", "F#m"],
        "Cm": ["Gm", "Fmaj", "A#maj"], "Dm": ["Am", "B7", "Gm"],
        "Em": ["Amaj", "C#m", "Bm"], "F#m": ["Bmaj", "Dmaj", "G#m"],
        "G#m": ["Ebmaj", "Bmaj", "F#m"],
        
        // 7th chords
        "C7": ["F7", "G7"], "G7": ["C7", "D7"], "D7": ["G7", "A7"],
        "A7": ["D7", "E7"], "B7": ["E7", "F#7"]
    },
    
    "Rock": {
        // Power chords and simple progressions
        "Cmaj": ["Fmaj", "Gmaj", "Am"], "Dmaj": ["Gmaj", "Amaj", "Bm"],
        "Emaj": ["Amaj", "Bmaj", "C#m"], "Fmaj": ["B7", "Cmaj", "Dm"],
        "Gmaj": ["Cmaj", "Dmaj", "Em"], "Amaj": ["Dmaj", "Emaj", "F#m"],
        
        // Minor progressions
        "Am": ["Dm", "Em", "Gmaj"], "Em": ["Am", "Bm", "Gmaj"],
        "Dm": ["Gm", "Am", "C"], "Bm": ["Em", "F#m", "Amaj"]
    },
    
    "Jazz": {
        // Rich jazz progressions
        "Cmaj7": ["Am7", "Dm7", "G7"], "Fmaj7": ["Dm7", "G7", "B7"],
        "Bbmaj7": ["Gm7", "Cm7", "F7"], "Ebmaj7": ["Cm7", "F7", "Ab7"],
        "Abmaj7": ["Fm7", "B7", "Db7"], "Dbmaj7": ["Bbm7", "Eb7", "Gb7"],
        
        // Minor ii-V-I
        "Dm7": ["G7", "Cmaj7"], "Gm7": ["C7", "Fmaj7"],
        "Cm7": ["F7", "Bbmaj7"], "Fm7": ["B7", "Ebmaj7"],
        
        // Diminished passing
        "Cdim7": ["Dm7", "Fm7"], "Ddim7": ["Em7", "Gm7"]
    },
    
    "Blues": {
        // Standard blues progressions
        "C7": ["F7", "G7"], "F7": ["C7", "B7"], "G7": ["C7", "D7"],
        "B7": ["F7", "Eb7"], "Eb7": ["B7", "Ab7"], "A7": ["D7", "E7"],
        
        // Minor blues
        "Cm7": ["Fm7", "Gm7"], "Fm7": ["Cm7", "Bbm7"],
        "Gm7": ["Cm7", "Dm7"], "Bbm7": ["Fm7", "Ebm7"]
    }
};

var sharedSeed = 0; // Will be overwritten by Max
var tempo = 1200; // default value

var midiProgression = [];
var currentIndex = 0;
var sendTask = new Task(sendNextChord, this);
sendTask.interval = tempo; 
var initialDelayTask = new Task(startProgression, this);
var isLooping = false;
var isFirstRun = true;

function progMidi(chord, genre, initialDelay) {
    sendTask.cancel();
    initialDelayTask.cancel();
    
    initialDelay = (initialDelay !== undefined) ? initialDelay : tempo;
    
    var progression = [chord];
    var current = chord;
    var chain = markovChains[genre];

    if (chain && chain[current]) {
        for (var i = 0; i < 3; i++) {
            var nextOptions = chain[current];
            if (nextOptions && nextOptions.length > 0) {
                var next = nextOptions[Math.floor(getRandom() * nextOptions.length)];
                progression.push(next);
                current = next;
            }
        }
    }

    midiProgression = progression.map(function(chordName) {
        return chordToMidi[chordName] || [];
    });

    post("Generated progression: " + progression.join(" -> ") + "\n");
    
    currentIndex = 0; 
    isLooping = true; 
    isFirstRun = true; 
    
    outlet(0, midiProgression[0]);
    
    initialDelayTask.schedule(initialDelay);
}

function startProgression() {
    currentIndex = 1; 
    isFirstRun = false;

    if (currentIndex < midiProgression.length) {
        sendTask.cancel();
        sendTask.interval = tempo;
        sendTask.repeat();
    }
}

function sendNextChord() {
    if (!isLooping) return;
    
    if (currentIndex < midiProgression.length) {
        outlet(0, midiProgression[currentIndex]);
        currentIndex++;
    } else {
        currentIndex = 0;
        outlet(0, midiProgression[currentIndex]);
        currentIndex++;
    }
}

function stop() {
    isLooping = false;
    sendTask.cancel();
    initialDelayTask.cancel();
    post("Progression stopped.\n");
}

function setSeed(seedFromMax) {
  sharedSeed = seedFromMax * 1000; 
}

function getRandom() {
  sharedSeed = (sharedSeed * 9301 + 49297) % 233280;
  return sharedSeed / 233280; 
}

function setTempo(temposlider) {
  tempo = temposlider;
}
