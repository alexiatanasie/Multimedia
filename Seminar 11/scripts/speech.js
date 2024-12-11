window.onload=function(){
    let canvas=document.getElementById('board');
    let context=canvas.getContext('2d');
    let listenButton=document.getElementById('listen');

    let guessInput=document.getElementById('guess');
    let submitButton=document.getElementById('submit');

    let number=parseInt(Math.random() *100);
    console.log(number);

    let SpeechRecognition=window.SpeechRecognition ||window.webkitSpeechRecognition;

    let synth=window.speechSynthesis;

    let recognizer=new SpeechRecognition();
    recognizer.lang='en-US';
    recognizer.maxAlternatives=1;

    listenButton.addEventListener('click',function(){
        recognizer.start();
    });
    submitButton.addEventListener('click',function(){
        let value=guessInput.value;
        console.log(value);
        play(value);
    })
    recognizer.onresult=function(e){
        let value =e.results[0][0].transcript;
        console.log(value);
        play(value);
    }
    function play(value){
        value=parseInt(value);
        if(value==number){
            //i have guessed
            context.fillStyle=blue;
            context.fillRect(value*canvas.width/100,0,canvas.width/100,canvas.height);
            let utterance=new SpeechSynthesisUtterance('you won');
            synth.speak(utterance);
        }
        else{
            if(value<number){
                //color left side
                context.fillStyle='red';
                context.fillRect(0,0,(parseInt(value+ 1))*canvas.width/100,canvas.height);
                let utterance=new SpeechSynthesisUtterance('higher');
                synth.speak(utterance);
            }
            else{
                //color right side
                context.fillStyle='red';
                context.fillRect(value*canvas.width/100,0,canvas.width-(value*canvas.width/100),canvas.height);
                let utterance=new SpeechSynthesisUtterance('lower');
                synth.speak(utterance);
            }
        }
    }
}