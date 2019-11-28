'use strict';
var Circle = (function() {
    // time data
    var date = {
        // set when should circle start
        start: new Date('November 28, 2019 17:00:00').getTime(),
        // set when should circle end
        end: new Date('November 28, 2019 18:45:00').getTime(), 
        // set when should circle change to red color
        milestone:  new Date('November 28, 2019 18:42:00').getTime()
    }
    // elements data
    var elem = {
        // circle
        progress: document.querySelector('.progress'),
        // timer
        time: document.getElementById("time")
    }

    // all days in circle
    var getAllDays = function(startDate, endDate) {
        var secBetween;

        secBetween = parseInt((endDate - startDate) / 1000);

        return secBetween
    }

    // the number of days that have elapsed
    var getCurrentLen = function() {
        var currentTime, fullLenght, currentLenght

        currentTime = new Date().getTime();
        fullLenght = getAllDays(date.start , date.end);
        currentLenght = getAllDays(currentTime, date.end);

        return fullLenght - currentLenght
    }

    // run circle progress bar
    var runCircle = function() {
        var allDays, currentLan, pathLength, per, newOffset
        // get all days
        allDays = getAllDays(date.start , date.end);
        // get current length of circle bar
        currentLan = getCurrentLen(); 
        
        pathLength = Math.PI * ( elem.progress.getAttribute('r') * 2 );
        per = currentLan / allDays;
        newOffset = pathLength - (pathLength * per) + 'px';
        
        // set dash-arra/offset
        elem.progress.style.strokeDasharray  = pathLength + 'px';
        elem.progress.style.strokeDashoffset = newOffset;
    }

    // calculate countdown the time
    var timer = function(time) {
        var days, hours, minutes, seconds;

        days = parseInt(time / 86400);
        time = (time % 86400);
        
        hours = parseInt(time / 3600);
        time = (time % 3600);
        
        minutes = parseInt(time / 60);
        time = (time % 60);
        
        seconds = parseInt(time);

        days = parseInt(days, 10);
        hours = ("0" + hours).slice(-2);
        minutes = ("0" + minutes).slice(-2);
        seconds = ("0" + seconds).slice(-2);

        // render timer
        return elem.time.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s "; 

    }

    // countdown and change color
    var countdown = function() {
        var startDate, timeRemaining, milestone, interval;
        // set interval function
        interval = setInterval(function(){

            startDate = new Date().getTime();
            timeRemaining = parseInt((date.end - startDate) / 1000);
            milestone = parseInt((date.milestone - startDate) / 1000);

            // if id remaining time 
            if (timeRemaining >= 0) {
                // run timer
                timer(timeRemaining)
                // run circle progress bar
                runCircle()
                
            }   else  {
                // if time has passed closed circle
                elem.time.innerHTML = " Circle is closed.";
                // set color victory to progress an timer
                elem.progress.classList.add('victory');
                time.classList.add('victory');
                // stop interval
                clearInterval(interval);
            }
            
            // set color to progress and timer when a milestone is reached
            if (milestone <= 0 && timeRemaining >= 0) {
            
                elem.progress.classList.add('danger');
                time.classList.add('danger');
            } else {
                elem.progress.classList.remove('danger');
                time.classList.remove('danger');
            }
        }, 1000);
    }

    // public functions
    return {
        countdown: countdown
    }

})();
  
(function () { 

    Circle.countdown(); 

}());