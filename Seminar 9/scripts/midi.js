window.onload = function() {
    var emulatedKeys = {
        q: 60, 2: 61, w: 62, 3: 63, e: 64,
        r: 65, 5: 66, t: 67, 6: 68, y: 69,
        7: 70, u: 71, i: 72
    }    
    let pianoNotes=new Array(128).fill(null);
    let oscillators=new Array(128).fill(null);
    //console.log(pianoNotes);
    function initialize(){
        for(let i=60;i<=72;i++){
            let htmlElement=document.querySelector(`[data-midi-code="${i}"]`);
            let noteName=htmlElement.getAttribute('data-note-name');
           
            //console.log(noteName);
            pianoNotes[i]=new Audio(`./notes/${noteName}.mp3`);

            createOscillator(i);
        }

    }
    document.addEventListener('keydown',function(e){
        let key= e.key.toLowerCase();
        if(emulatedKeys.hasOwnProperty(key)){
            let midiCode=emulatedKeys[key];
            playPianoNote(midiCode);
        }
    });
    document.addEventListener('keyup',function(e){
        let key= e.key.toLowerCase();
        if(emulatedKeys.hasOwnProperty(key)){
            let midiCode=emulatedKeys[key];
            playPianoNote(midiCode);
        }
    });


    function playPianoNote(midiCode){
        pianoNotes[midiCode].play();
    }
    function createOscillator(midiCode){
            let audioContext=new AudioContext();
            let oscillator=audioContext.createOscillator();
            let frequency=440*Math.pow(2,(midiCode-69)/12);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency,audioContext.currentTime);
            oscillator.connect(audioContext.destination);
            oscillator.start();
            return{
                context: audioContext,
                oscillator: oscillator
            };
    }
    
    initialize();


};