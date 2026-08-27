/* =========================================
   SCHOOL LEARNING AI
   SCRIPT.JS
   ========================================= */


/* =========================================
   ELEMENTS
   ========================================= */

const questionInput = document.getElementById("question");

const classSelect = document.getElementById("classSelect");

const languageSelect = document.getElementById("languageSelect");

const answerBox = document.getElementById("answerBox");

const answerText = document.getElementById("answerText");


/* =========================================
   ASK QUESTION
   ========================================= */

function askQuestion() {

    const question = questionInput.value.trim();

    const classLevel = classSelect.value;

    const language = languageSelect.value;


    /* Empty question check */

    if (question === "") {

        alert("Please enter your question.");

        questionInput.focus();

        return;

    }


    /* Show answer box */

    answerBox.style.display = "block";


    /* Loading */

    answerText.innerHTML = `
        <div class="loading">

            <span>AI is thinking</span>

            <span class="loading-dot"></span>

            <span class="loading-dot"></span>

            <span class="loading-dot"></span>

        </div>
    `;


    /*
     * IMPORTANT:
     *
     * Abhi hum frontend test kar rahe hain.
     *
     * Real AI API ko frontend mein directly
     * nahi rakhenge, kyunki API key public ho sakti hai.
     *
     * Secure AI connection next step mein add hoga.
     */


    setTimeout(function () {

        let demoAnswer = "";


        if (language === "hindi") {

            demoAnswer =
                "नमस्ते विद्यार्थी! 👋\n\n" +
                "आपने पूछा:\n" +
                question +
                "\n\n" +
                "यह School Learning AI का demo answer है।\n\n" +
                "आपकी Class: " +
                classLevel +
                "\n\n" +
                "अगले चरण में इस जगह पर Real AI का उत्तर आएगा। " +
                "AI आपके सवाल को समझकर आसान भाषा में step-by-step explanation देगा।";

        }


        else if (language === "english") {

            demoAnswer =
                "Hello Student! 👋\n\n" +
                "Your question:\n" +
                question +
                "\n\n" +
                "This is the School Learning AI demo answer.\n\n" +
                "Your Class: " +
                classLevel +
                "\n\n" +
                "In the next step, this area will show the real AI answer. " +
                "The AI will explain your question in simple language with step-by-step explanations.";

        }


        else {

            demoAnswer =
                "Hello Student! 👋\n\n" +
                "Aapka question:\n" +
                question +
                "\n\n" +
                "Ye School Learning AI ka demo answer hai.\n\n" +
                "Aapki Class: " +
                classLevel +
                "\n\n" +
                "Next step mein Real AI connect hoga aur AI aapke question ka " +
                "simple Hinglish mein step-by-step answer dega.";

        }


        answerText.textContent = demoAnswer;


    }, 800);

}


/* =========================================
   ENTER KEY
   ========================================= */

questionInput.addEventListener("keydown", function (event) {

    /*
     * Ctrl + Enter se question submit hoga.
     *
     * Normal Enter textarea mein new line banayega.
     */

    if (event.ctrlKey && event.key === "Enter") {

        askQuestion();

    }

});


/* =========================================
   ABOUT BUTTON
   ========================================= */

function showInfo() {

    alert(
        "School Learning AI\n\n" +
        "A smart learning assistant for students.\n\n" +
        "You can ask questions about Maths, Science, " +
        "History, Geography, English and many other school subjects."
    );

}


/* =========================================
   DARK MODE
   ========================================= */

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

}


/* =========================================
   VOICE INPUT
   ========================================= */

let speechRecognition = null;


/*
 * Browser speech recognition support check
 */

if (
    "SpeechRecognition" in window ||
    "webkitSpeechRecognition" in window
) {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    speechRecognition =
        new SpeechRecognition();


    speechRecognition.continuous = false;

    speechRecognition.interimResults = false;

    speechRecognition.lang = "hi-IN";


    speechRecognition.onstart = function () {

        questionInput.placeholder =
            "Listening... बोलिए...";

    };


    speechRecognition.onresult = function (event) {

        const transcript =
            event.results[0][0].transcript;

        questionInput.value +=
            transcript;

    };


    speechRecognition.onerror = function () {

        alert(
            "Voice input start nahi ho saka. " +
            "Please microphone permission check karein."
        );

    };


    speechRecognition.onend = function () {

        questionInput.placeholder =
            "Example: Photosynthesis kya hai?\n\nYa: 25 × 48 solve karo...";

    };

}


/* =========================================
   START VOICE INPUT
   ========================================= */

function startVoiceInput() {

    if (!speechRecognition) {

        alert(
            "Aapka browser voice input support nahi karta. " +
            "Latest Google Chrome ya Microsoft Edge use karein."
        );

        return;

    }


    speechRecognition.start();

}


/* =========================================
   SPEAK ANSWER
   ========================================= */

function speakAnswer() {

    const text =
        answerText.innerText.trim();


    if (text === "") {

        alert("Pehle AI se answer lein.");

        return;

    }


    if (!("speechSynthesis" in window)) {

        alert(
            "Aapka browser text-to-speech support nahi karta."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    const language =
        languageSelect.value;


    if (language === "hindi") {

        speech.lang = "hi-IN";

    }

    else if (language === "english") {

        speech.lang = "en-US";

    }

    else {

        speech.lang = "hi-IN";

    }


    speech.rate = 0.9;

    speech.pitch = 1;


    window.speechSynthesis.speak(speech);

}


/* =========================================
   STOP SPEAKING
   ========================================= */

function stopSpeaking() {

    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

    }

}


/* =========================================
   CLEAR QUESTION
   ========================================= */

function clearQuestion() {

    questionInput.value = "";

    answerText.textContent = "";

    answerBox.style.display = "none";

    questionInput.focus();

}


/* =========================================
   PAGE READY
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "School Learning AI loaded successfully."
        );

    }
);
