window.addEventListener('DOMContentLoaded', function () {
    'use strict'
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent')

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    let deadline = '2020-04-21:12:21:00';

    function getTimeRemaining(endTime) {
        let conv = new Date(endTime),
            t = new Date(conv.getTime() - Date.now()),
            days = t.getUTCDate() - 1,
            seconds = t.getUTCSeconds(),
            minutes = t.getUTCMinutes(),
            hours = t.getUTCHours();
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
        function updateClock() {
            let t = getTimeRemaining(endTime);
            days.textContent = t.days >= 10 ? t.days : '0' + t.days;
            hours.textContent = t.hours >= 10 ? t.hours : '0' + t.hours;
            minutes.textContent = t.minutes >= 10 ? t.minutes : '0' + t.minutes;;
            seconds.textContent = t.seconds >= 10 ? t.seconds : '0' + t.seconds;;
            if (t.total <= 0) {               
                clearInterval(timeInterval);
                days.textContent = '00', hours.textContent = '00', minutes.textContent = '00', seconds.textContent = '00';
            };
        };
    };
    function setDate(id, endTime) {
        let timer = document.getElementById(id),
            day = timer.querySelector('.day'),
            month = timer.querySelector('.month'),
            year = timer.querySelector('.year'),
            date = new Date(endTime);

        day.textContent = date.getDate();
        month.textContent = date.getMonth() >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        year.textContent = date.getFullYear();
    };
    setDate('lastDay', deadline);
    setClock('timer', deadline);

    //Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    })
})