// ===============================
// PARTICLE BACKGROUND SYSTEM
// ===============================

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 0.6 + 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.y -= this.speedY;
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 0, 150, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 120; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// ===============================
// TREE + BLOOM SYSTEM
// ===============================

const startBtn = document.getElementById("startBtn");
const treeSection = document.getElementById("treeSection");
const messageSection = document.getElementById("messageSection");
const typedText = document.getElementById("typedText");

function bloomHearts() {

    const heartTypes = ["💖","💗","💘","💞","💕","💓"];
    const leftBranch = document.getElementById("leftBranch");
    const rightBranch = document.getElementById("rightBranch");

    for (let i = 0; i < 6; i++) {

        // LEFT BRANCH
        let heartLeft = document.createElement("div");
        heartLeft.className = "heart-leaf";
        heartLeft.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heartLeft.style.left = (i * 22) + "px";
        heartLeft.style.top = "-18px";
        heartLeft.style.animationDelay = (i * 0.3) + "s";
        leftBranch.appendChild(heartLeft);

        // RIGHT BRANCH
        let heartRight = document.createElement("div");
        heartRight.className = "heart-leaf";
        heartRight.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heartRight.style.right = (i * 22) + "px";
        heartRight.style.top = "-18px";
        heartRight.style.animationDelay = (i * 0.3) + "s";
        rightBranch.appendChild(heartRight);
    }
}

// ===============================
// TYPING EFFECT SYSTEM
// ===============================

const messages = [
    "Hey, you💕",
    "Happy birthday 🎈",
    "May God bless you🍀",
    "And bring you more happiness 💗",
    "Just saying you are pretty... pretty awesome❣️",
    "Sending good vibes and maybe a... wink😏",
    "Hope you have a great day today🤞🏻",
    "Luv yaa🫶🏻😁"
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
            setTimeout(() => typeMessage(index + 1), 700);
        }
    }, 40);
}

// ===============================
// MAIN SEQUENCE CONTROLLER
// ===============================

startBtn.addEventListener("click", () => {

    // Hide button
    startBtn.style.display = "none";

    // Grow tree upward
    setTimeout(() => {
        treeSection.style.bottom = "0";
    }, 400);

    // Bloom hearts
    setTimeout(() => {
        bloomHearts();
    }, 2000);

    // Show message card
    setTimeout(() => {
        messageSection.style.opacity = "1";
        typeMessage();
    }, 3500);

});
