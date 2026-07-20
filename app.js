let isLightOn = false;

function toggleLight() {
  const btn = document.getElementById("lightBtn");

  if (isLightOn) {
    btn.innerText = "চালু করুন";
    btn.style.backgroundColor = "#38bdf8";
    btn.style.color = "#0f172a";
    alert("💡 ঘরের লাইট বন্ধ করা হয়েছে!");
    isLightOn = false;
  } else {
    btn.innerText = "বন্ধ করুন";
    btn.style.backgroundColor = "#ef4444";
    btn.style.color = "#ffffff";
    alert("💡 ঘরের লাইট চালু করা হয়েছে!");
    isLightOn = true;
  }
}
