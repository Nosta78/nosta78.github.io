function getDuration(id) {

    const h = document.getElementById("h" + id).value || 0;
    const m = document.getElementById("m" + id).value || 0;
    const s = document.getElementById("s" + id).value || 0;

    return (h * 3600 + m * 60 + s) * 1000;
}

function startTimer(id) {

    const duration = getDuration(id);

    if (duration <= 0) return;

    const endTime = Date.now() + duration;

    localStorage.setItem("timer_end_" + id, endTime);
}

function resetTimer(id) {

    localStorage.removeItem("timer_end_" + id);

    document.getElementById("timer" + id).innerHTML = "00h 00m 00s";
}

function updateTimer(id) {

    const endTime = localStorage.getItem("timer_end_" + id);

    if (!endTime) return;

    const now = Date.now();
    const remaining = endTime - now;

    const timerElement = document.getElementById("timer" + id);

    if (remaining <= 0) {

        timerElement.innerHTML = "Terminé";
        return;
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    timerElement.innerHTML =
        hours + "h " +
        minutes + "m " +
        seconds + "s";
}

function loopTimers() {

    updateTimer(1);
    updateTimer(2);
    updateTimer(3);
}

setInterval(loopTimers, 1000);

loopTimers();