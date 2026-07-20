const BLYNK_TOKEN = "bNl0aR4S2IdU18GVkAX527tn1URIsh_o";

// ১. Blynk API দিয়ে লাইট কন্ট্রোল করার ফাংশন
async function controlLight(status) {
  const value = status === "ON" ? 1 : 0;

  try {
    await fetch(
      `https://blynk.cloud/external/api/update?token=${BLYNK_TOKEN}&v0=${value}`,
    );

    // UI আপডেট করা
    const statusElem = document.getElementById("statusText");
    if (statusElem) {
      statusElem.innerText = status === "ON" ? "💡 ON" : "🌑 OFF";
    }
    speakResponse(`Turning ${status.toLowerCase()} the light, sir.`);
  } catch (error) {
    console.error("Error:", error);
    speakResponse("Sorry, I could not connect to the device.");
  }
}

// ২. Jarvis Voice Response (Text-to-Speech)
function speakResponse(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
}

// ৩. ভয়েস ইনপুট নেওয়া (Speech-to-Text)
function startListening() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Your browser does not support Speech Recognition. Please use Google Chrome.",
    );
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  const micBtn = document.getElementById("micBtn");

  recognition.onstart = () => {
    if (micBtn) {
      micBtn.innerText = "Listening...";
      micBtn.style.backgroundColor = "#ff9800";
    }
  };

  recognition.onend = () => {
    if (micBtn) {
      micBtn.innerText = "🎤 Speak to Jarvis";
      micBtn.style.backgroundColor = "#1976d2";
    }
  };

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    const speechElem = document.getElementById("speechText");
    if (speechElem) {
      speechElem.innerText = `"${command}"`;
    }
    processCommand(command);
  };

  recognition.start();
}

// ৪. ভয়েস কমান্ড প্রসেস করা
function processCommand(command) {
  const lowerCmd = command.toLowerCase();

  if (
    lowerCmd.includes("turn on") ||
    lowerCmd.includes("light on") ||
    lowerCmd.includes("অন কর")
  ) {
    controlLight("ON");
  } else if (
    lowerCmd.includes("turn off") ||
    lowerCmd.includes("light off") ||
    lowerCmd.includes("অফ কর")
  ) {
    controlLight("OFF");
  } else {
    speakResponse("Command not recognized, sir.");
  }
}
