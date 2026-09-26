(function () {

document.addEventListener("DOMContentLoaded", function () {

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const catContainer = document.getElementById("catContainer");
    const letterOverlay = document.getElementById("letterOverlay");
    const envelope = document.getElementById("envelope");
    const envelopeHint = document.getElementById("envelopeHint");
    const musicPlayer = document.getElementById("musicPlayer");

    if (
        !yesBtn ||
        !noBtn ||
        !catContainer ||
        !letterOverlay ||
        !envelope
    ) {
        return;
    }

    let noCount = 0;
    let catIndex = 0;
    let catMoveTimer = null;

    const catImages = [
        "https://www.pikpng.com/pngl/m/106-1060552_crying-cat-meme-transparent-crying-cat-meme-png.png",
        "https://www.pikpng.com/pngl/m/526-5262894_generic-sad-cat-cat-transparent-png-download-crying.png"
    ];

    yesBtn.onclick = function () {

        letterOverlay.classList.add("show");

        if (musicPlayer) {
            musicPlayer.src =
                "https://www.youtube.com/embed/75-Com9Bo_s?autoplay=1&loop=1&playlist=75-Com9Bo_s";
        }
    };

    noBtn.onclick = function () {

        noCount++;

        moveNoButton();

        showSadCat();

        if (noCount >= 12) {
            noBtn.textContent = "NOOO 😿";
        } else if (noCount >= 8) {
            noBtn.textContent = "Please 😭";
        } else if (noCount >= 4) {
            noBtn.textContent = "Really? 😭";
        }
    };

    function showSadCat() {

        catContainer.innerHTML = "";

        if (catMoveTimer) {
            clearInterval(catMoveTimer);
            catMoveTimer = null;
        }

        const cat = document.createElement("img");

        cat.src = catImages[catIndex];
        cat.alt = "Sad cat";
        cat.className = "cat-reaction";

        catContainer.appendChild(cat);

        catIndex++;

        if (catIndex >= catImages.length) {
            catIndex = 0;
        }

        cat.onload = function () {

            moveCat(cat);

            catMoveTimer = setInterval(function () {

                if (document.body.contains(cat)) {
                    moveCat(cat);
                }

            }, 2200);
        };
    }

    function moveCat(cat) {

        const padding = 20;

        const width = cat.offsetWidth;
        const height = cat.offsetHeight;

        const maxLeft = Math.max(
            padding,
            window.innerWidth - width - padding
        );

        const maxTop = Math.max(
            padding,
            window.innerHeight - height - padding
        );

        const left =
            padding +
            Math.random() *
            Math.max(1, maxLeft - padding);

        const top =
            padding +
            Math.random() *
            Math.max(1, maxTop - padding);

        cat.style.left =
            Math.min(left, maxLeft) + "px";

        cat.style.top =
            Math.min(top, maxTop) + "px";
    }

    function moveNoButton() {

        noBtn.style.position = "fixed";

        const padding = 20;

        const width = noBtn.offsetWidth;
        const height = noBtn.offsetHeight;

        const yesRect =
            yesBtn.getBoundingClientRect();

        const maxLeft = Math.max(
            padding,
            window.innerWidth - width - padding
        );

        const maxTop = Math.max(
            padding,
            window.innerHeight - height - padding
        );

        let left = padding;
        let top = padding;

        for (let i = 0; i < 100; i++) {

            left =
                padding +
                Math.random() *
                Math.max(1, maxLeft - padding);

            top =
                padding +
                Math.random() *
                Math.max(1, maxTop - padding);

            const touchingYes =
                left < yesRect.right &&
                left + width > yesRect.left &&
                top < yesRect.bottom &&
                top + height > yesRect.top;

            if (!touchingYes) {
                break;
            }
        }

        noBtn.style.left =
            Math.max(
                padding,
                Math.min(left, maxLeft)
            ) + "px";

        noBtn.style.top =
            Math.max(
                padding,
                Math.min(top, maxTop)
            ) + "px";
    }

    envelope.onclick = function () {

        envelope.classList.toggle("open");

        if (
            envelope.classList.contains("open")
        ) {

            envelopeHint.textContent =
                "♡ A little message for you, Babi ♡";

        } else {

            envelopeHint.textContent =
                "Tap the envelope 💌";
        }
    };

    function createHeart() {

        const heart =
            document.createElement("div");

        heart.className = "heart";

        heart.textContent =
            Math.random() > 0.5
                ? "♥"
                : "♡";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.fontSize =
            14 +
            Math.random() * 18 +
            "px";

        heart.style.animationDuration =
            5 +
            Math.random() * 5 +
            "s";

        document.body.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, 10000);
    }

    setInterval(createHeart, 700);

    window.addEventListener(
        "resize",
        function () {

            if (
                noBtn.style.position === "fixed"
            ) {
                moveNoButton();
            }

            const cat =
                catContainer.querySelector(
                    ".cat-reaction"
                );

            if (cat) {
                moveCat(cat);
            }
        }
    );

});

})();