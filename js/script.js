window.addEventListener('DOMContentLoaded', function () {
    'use strict'
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

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

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });


    //Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо!',
        failure: 'Что-то пошло не так'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        contact = document.querySelector('#form');

    statusMessage.classList.add('status');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);

        let formData = new FormData(form);
        function postData(data) {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', '../server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

                request.onreadystatechange = function () {
                    if (request.readyState < 4) {
                        resolve()
                    } else if (request.readyState === 4) {
                        if (request.status == 200 && request.status < 300) {
                            resolve()
                        } else {
                            reject()
                        }
                    }
                }
                request.send(data)
            })
        }

        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }

        postData(formData)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput)
    });

    contact.addEventListener('submit', (event) => {
        event.preventDefault();
        contact.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', '../server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(contact);
        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);
        request.send(json);

        request.addEventListener('readystatechange', () => {
            if (request.readyStateM < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });


    //Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function nextSlides(n) {
        showSlides(slideIndex += n)
    };

    function currentSlide(n) {
        showSlides(slideIndex = n);
    };

    prev.addEventListener('click', () => {
        nextSlides(-1);
    });

    next.addEventListener('click', () => {
        nextSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });
});