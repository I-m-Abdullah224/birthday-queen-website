const startBtn = document.getElementById("startBtn");
const heartsContainer = document.getElementById("heartsContainer");
const messageSection = document.getElementById("messageSection");
const typedText = document.getElementById("typedText");

const heartEmojis = ["💖","💗","💘","💞","💕","💓","❤️","♥️","🧡","💜"];

/* HEART BURST */
function heartBurst(x, y) {

    const burstCount = 30;

    for (let i = 0; i < burstCount; i++) {

        const heart = document.createElement("div");
        heart.className = "burst-heart";
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        heart.style.left = x + "px";
        heart.style.top = y + "px";

        const angle = Math.random() * 2 * Math.PI;
        const distance = 80 + Math.random() * 120;

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        heart.style.setProperty("--x", moveX + "px");
        heart.style.setProperty("--y", moveY + "px");

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    }
}

/* FLOATING HEARTS */
function createHeart() {

    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (20 + Math.random() * 30) + "px";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 8000);
}

function startHearts() {
    setInterval(createHeart, 250);
}

/* TYPING EFFECT */
const messages = [
    "Hey, Areej💕",
    "Happy birthday 🎈",
    "May God bless you🍀",
    "And bring you more happiness 💗",
    "Just saying you are pretty and pretty awesome❣️",
    "Sending good vibes and maybe a... wink😏",
    "Hope you have a great day today🤞🏻",
    "Love You Baby Girl♥️🐥"
    "🫶🏻😁"
];

function typeMessage(index = 0) {

    if (index >= messages.length) return;

    let p = document.createElement("p");
    typedText.appendChild(p);

    let text = messages[index];
    let i = 0;

    let typing = setInterval(() => {
        p.innerHTML += text.charAt(i);
        i++;

        if (i === text.length) {
            clearInterval(typing);
            setTimeout(() => typeMessage(index + 1), 800);
        }
    }, 40);
}

/* CLICK EVENT */
startBtn.addEventListener("click", () => {

    const rect = startBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    heartBurst(centerX, centerY);

    setTimeout(() => {
        startBtn.style.display = "none";
        startHearts();

        setTimeout(() => {
            messageSection.style.opacity = "1";
            typeMessage();
        }, 1500);

    }, 600);

});




