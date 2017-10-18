const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var wpmDisplay = document.querySelector("#wpm");
var typingErrorDisplay = document.querySelector("#errors");
var accuracyDisplay = document.querySelector("#accuracy");
var changeOriginText = document.querySelector("#alter");
var wordCountDisplay = document.querySelector("#wordcount");

var manyText = ["Click anywhere on this box to change the text you are taking your speed typing test with! The text in this box is your typing test text. All tests are great for practice. Including this informational text. Practice, practice, practice! All of the following text's including this one are available for the speed typing test and can be looped through until you reach the desired text you wish to take the speed typing test against.", "This is a typing test. Your goal is to duplicate the provided text, EXACTLY, in the field below. The timer starts when you start typing, and only stops when you match this text exactly. Do your best now. Good Luck!", "Do not lose time on daily trivialities. Do not dwell on petty detail, for all these things melt away and drift apart within the obscure traffic of time. Live well and live broadly. You are alive and living now. Now is the envy of all of the dead.", "Hello world. It is a nice day.", "The 1910 Cuba hurricane was said to be one of the worst tropical cyclones that has ever hit Cuba. The storm formed in the southern caribbean sea on October 9, 1910.", "It grew stronger as it moved northwest. It then made landfall on the western end of Cuba. The storm made a loop over open water, and then began moving towards the United States."];
var arrCount = 0;
var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var wordsPerMinCalc;
var typingError = 0;
var accuracy;
var wordCount = 0;

window.onload = function() {
  initialLoad();  //example function call.
}


function initialLoad() {
    var pageLoad = 0;
    
    if (pageLoad === 0) {
        changeOriginText.innerHTML= manyText[arrCount];
        pageLoad++;
    }
}
//console.log("This is originText var: " + originText);
//console.log("This is changeOriginText var: " + changeOriginText);
//console.log("This is the current array selection: " + manyText[arrCount]);

//switchText();
//reset();
//getWordCount(manyText, arrCount);
//console.log(getWordCount(manyText, arrCount));
//console.log(wordCount);


//Function for changing text for speed typing test
function switchText() {
    console.log("Timer[2]: " + timer[2] + " Timer[3]: " + timer[3]);
    if (timer[2] >= 1) {
        console.log("Timer[2]: " + timer[2] + " Timer[3]: " + timer[3]);
        alert("cannot change text during test! If you wish to change test text you must rese the timer.");
    } else {
        console.log("Timer[2]: " + timer[2] + " Timer[3]: " + timer[3]);
        console.log("This is changeOriginText.innerHTML var before assignment of manyText[arrCount]: " + changeOriginText.innerHTML);
        changeOriginText.innerHTML= manyText[arrCount];
        console.log("This is changeOriginText.innerHTML var after assignment of manyText[arrCount]: " + changeOriginText.innerHTML);
        console.log("arrCount before increment: " + arrCount)
        arrCount++;
        console.log("arrCount after increment: " + arrCount)
        console.log("This is the current array selection: " + manyText[arrCount]);
//        console.log("This is the current word count for the selected array: " + manyText[arrCount][0].length);
        console.log("manyText length: " + manyText.length);
    
        if (arrCount >= manyText.length) {
            arrCount = 0;
            console.log("Inside if statement meant to set array back to 0");
        }
    
        reset();
        getWordCount(manyText, arrCount);
    }
}

//Function is used to accurately get a word count for each piece of text
function getWordCount(text, arrayCount) {
//    var arr = [];
    var containerArray = manyText[arrCount];
    console.log("inside container array: " + containerArray)
    
    for (i = 0; i < containerArray.length; i++) {
        console.log("Inside for loop in getWordCount func:" + containerArray);
        var separate = containerArray.split(" ");
        console.log('result of separate action: ' + separate);
        console.log('separate array length (should be word count): ' + separate.length);
        break;
//        arr.push(separate);
//        console.log('what new array arr looks like after pushing separate: ' + arr);
//        for (x = 0; x <= manyText[index].length; x++) {
//            arr.push();
//            index++;
//            console.log("current index: " + index);
//            console.log("Array for holding each word from a single text: " + arr)
//        }
    }
    wordCount = separate.length;
    console.log("Total word count at end of getWordCount func: " + wordCount);
    return wordCount;
}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    
    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    console.log("Text entered value based on testArea.value: " + textEntered);
    let originTextMatch = changeOriginText.innerHTML.substring(0, textEntered.length);
    
    if (textEntered == changeOriginText.innerHTML) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#008000";
        
        if (timer[0] >= 1) {
            var completeTime = timer[0] + (timer[1] / 60);
            console.log("This displays complete time by adding seconds to minutes: " + completeTime);
            wordsPerMinCalc = Math.round(wordCount / completeTime);
        } else {
            var accurateMeasure = timer[1] / 60;
            console.log("Divide seconds to get a fraction value for assesing WPM: " + accurateMeasure);
            wordsPerMinCalc = Math.round(wordCount / accurateMeasure);
        }
        
        console.log("WPM: " + wordsPerMinCalc);
        wpmDisplay.innerHTML = wordsPerMinCalc;
        
        //temp fix for accuracy math.. need accurate word count for text; will be an involved process
        accuracy = Math.round(((wordCount - typingError) / wordCount) * 100);
        console.log("Output of changeOriginText.innerHTML.length: " + changeOriginText.innerHTML.length);
        console.log("Initial accuracy math output: " + accuracy);
//        if (accuracy === 1 || accuracy === -1) {
//            accuracy = Math.round(accuracy * 100);
//        } else {
//            accuracy = Math.round(accuracy * 100);
//        }
        console.log("This is the accuracy: " + accuracy + "%");
        accuracyDisplay.innerHTML = accuracy + "%";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            typingError++;
            typingErrorDisplay.innerHTML = typingError;
            testWrapper.style.borderColor = "#8B0000";
        }
    }
    
    console.log(textEntered);
}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    
    //temp fix for word count... need more accurate measure of word count
//    wordCountDisplay.innerHTML = Math.floor(changeOriginText.innerHTML.length / 5);
    wordCountDisplay.innerHTML = wordCount;
    console.log("word count disp: " + wordCountDisplay);
    
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    
    console.log(textEnteredLength);
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;
    wordsPerMinCalc;
    typingError = 0;
    accuracy;
    
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    wpmDisplay.innerHTML = "---";
    typingErrorDisplay.innerHTML = "---";
    accuracyDisplay.innerHTML = "---";
    wordCountDisplay.innerHTML = "---";
    
    console.log("reset button has been pressed!");
}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
changeOriginText.addEventListener("click", switchText, false);



//Functionality to add:
//Add words per minute count (find calculation online), grab time and combine with # of words in test.
//Count number of errors the user makes (increment a number and display # of errors)
//Add an array of different test texts so the user can switch between different text to test.
//Add a high score board
