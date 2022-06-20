document.getElementById('timer-button').addEventListener("click", () => {
    document.getElementById('timer-button').remove();
    document.getElementById('timer').innerHTML =
        25 + ":" + 0;
    startTimer();
});

var counter = 0;
var longbreak = 0;

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
        let btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('id', 'break-timer');
        if (longbreak === 4) {
            longbreak = 0;
            counter = 1;
            document.getElementById('timer').innerHTML = "TAKE A LONGER BREAK!";
            btn.setAttribute('value', 'Start Timer for the longer break!');
            btn.addEventListener("click", () => {
                document.getElementById('break-timer').remove();
                document.getElementById('timer').innerHTML =
                    15 + ":" + 0;
                startTimer();
            });
        } else if (counter === 0) {
            counter = 1;
            document.getElementById('timer').innerHTML = "TAKE A BREAK!";
            btn.setAttribute('value', 'Start Timer for the break!');
            btn.addEventListener("click", () => {
                document.getElementById('break-timer').remove();
                document.getElementById('timer').innerHTML =
                    5 + ":" + 0;
                startTimer();
            });
        } else if (counter === 1) {
            counter = 0;
            longbreak++;
            document.getElementById('timer').innerHTML = "START TO STUDY!";
            btn.setAttribute('value', 'Start Timer for Studying!');
            btn.addEventListener("click", () => {
                document.getElementById('break-timer').remove();
                document.getElementById('timer').innerHTML =
                    25 + ":" + 0;
                startTimer();
            });
        }
        Aside.appendChild(btn);
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