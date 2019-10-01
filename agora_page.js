
var countdownStartDate = new Date();//"May 24, 2020 00:00:00");
var countdownEndDate = new Date("October 05, 2019 00:00:00");//"May 29, 2020 17:00:00");

// async to ensure DOM is loaded
async function onChangeCheck1() {
    //set checked value of checkbox2 equal to checkbox1
    document.getElementById("checkbox2").checked = document.getElementById("checkbox1").checked;
}

async function onChangeCheck2() {
    //set checked value of checkbox1 equal to checkbox2
    document.getElementById("checkbox1").checked = document.getElementById("checkbox2").checked;
}

async function buttonCheck() {
    //checkbox is checked so call to endpoint will be made
    if (document.getElementById("checkbox1").checked) {
        //call endpoint (await can only be used in async function)
        const response = await fetch('https://bl45immth4.execute-api.us-east-1.amazonaws.com/production/');
        // get json from response
        const json = await response.json();
        // get body from response and parse to object
        const body = await JSON.parse(json.body);
        //get elements to display submitok response
        var elements = document.getElementsByClassName("endpoint-response");
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = body.submitok;
        }
    } else { // otherwise an alert will pop up
        alert("Please check the newsletter checkbox before continuing");
    }
}

// not sure what dates to use. Tried contacting recruiter for specifications, but it was a weekend.
// decided to use 5 days before "todays date" though that will change
function countdown(endDate) {
    // evaluate every second
    setInterval(function () {
        var startDate = new Date();//"May 24, 2020 00:00:00");
        // get the time between the two dates
        between = endDate.getTime() - startDate.getTime();

        // if the countdown is finished, which will never be the case in this scenario but realistically
        if (between <= 0) {
            //display some text to inform users
            document.getElementById("countdown").innerHTML = "The Webinar has Started";
        } else {
            // calculate the number of days between
            var days = Math.floor(between / (24 * 60 * 60 * 1000));
            // calculate the hours left from the remainder of days
            var hours = Math.floor((between % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            // calculate the minutes left from the remainder of hours
            var minutes = Math.floor((between % (60 * 60 * 1000)) / (60 * 1000));
            // calculate the seconds left from the remainder of minutes
            var seconds = Math.floor((between % (60 * 1000)) / 1000);

            //display results in #countdown
            document.getElementById("countdown").innerHTML = days + " days " + hours + " hrs " +
                minutes + " mins " + seconds + " secs";
        }
    }, 1000);
}

window.onload = function () { countdown(countdownEndDate); };
