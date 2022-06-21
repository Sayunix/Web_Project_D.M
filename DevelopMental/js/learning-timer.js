document.getElementById('timer-button').addEventListener("click", () => {
    document.getElementById('timer-button').remove();
    document.getElementById('timer').innerHTML =
        25 + ":" + 0;
    startTimer();
});

function startTimer() {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) {
        m = m - 1
    }
    if (m < 0) {
        return;
    }

    document.getElementById('timer').innerHTML =
        m + ":" + s;
    if (m == 0 && s == 0) {
        let timer = document.getElementById('timer');
        timer.style.fontSize = "28px";
        timer.innerHTML = "⋙Click on me to Relax!⋘";
        timer.setAttribute("type","button");
        timer.onclick = function () {
            location.href = "http://localhost:5000/relax.html";
        }
        return;
    }
    setTimeout(startTimer, 1000);

}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
        sec = "0" + sec
    }
    if (sec < 0) {
        sec = "59"
    }
    return sec;
}