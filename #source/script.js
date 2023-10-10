let wrapper = document.querySelector('.wrapper');
let wheel = document.querySelector('.wheel');
let btn = document.querySelector('.btn');
let langList = document.querySelector(".lang_list");
let threeangle = document.querySelector(".curent span");
let listElems = document.querySelectorAll(".lang_list li");
let langBtnText = document.querySelector(".curent p");
let langBtn = document.querySelector(".curent");
let modal = document.querySelector('.modal');
let modalText1 = document.querySelector(".modal_text p:nth-child(1)");
let modalText2 = document.querySelector(".modal_text p:nth-child(2)");
let modalText3 = document.querySelector(".modal_text p:nth-child(3)");
let modalBtn = document.querySelector(".modal a");
let text = document.querySelector('.text p');

function promiseAfterTimeout(seconds) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(), seconds * 1000);
    });
};

function rotateWheel(degr) {
    wheel.style.transform = 'translate(-50%, -50%) rotate(' + degr + 'deg)';
    return promiseAfterTimeout(4);
};

function launchSpin(degrees) {
    currentRotation += degrees;
    return rotateWheel(currentRotation);
};

let spinState = {
    clickedOnce: false,
    count: 0
};

let currentRotation = 0;

let isAnimating = false;

function setButtonsState(disabled, cursorStyle) {
    btn.disabled = disabled;
    btn.style.cursor = cursorStyle;
};


btn.addEventListener('click', function() {
    if (!isAnimating && spinState.count < 2) {
        isAnimating = true;
        setButtonsState(true, 'default');
            

        if (!spinState.clickedOnce) {
            launchSpin(3014).then(() => {
                spinState.clickedOnce = true;
                spinState.count++;
                setButtonsState(false, 'pointer');
                isAnimating = false;
            });
        } else {
            launchSpin(2925).then(() => {
                spinState.count++;
                setButtonsState(false, 'default');
                isAnimating = false;
                setInterval(()=> {
                    modal.classList.add('active');
                }, 500);
                setInterval(()=> {
                    modal.classList.add('opacity');
                }, 600);
            });
        };
    }
});


langBtn.addEventListener('click', () => {
    langList.classList.toggle('active');
    threeangle.classList.toggle('active');
});

listElems.forEach(listElem => {
    listElem.addEventListener('click', (e) => {
        const value = e.target.textContent;
        langBtnText.innerHTML = value;
        
        if (value === 'hi') {
            text.innerHTML = 'बड़ी जीत, <br><span>उदार बोनस</span>';
            modalText1.innerHTML = 'स्वागत बोनस';
            modalText2.innerHTML = 'Gपहली 3 जमाओं पर 375% प्राप्त करें';
            modalText3.innerHTML = '₹36,000 तक';
            modalBtn.innerHTML = 'अभी पकड़ो';
        } else {
            text.innerHTML = 'Big wins,<br><span>generous bonuses</span>';
            modalText1.innerHTML = 'WELCOME BONUS';
            modalText2.innerHTML = 'GET 375% ON FIRST 3 DEPOSITS';
            modalText3.innerHTML = 'UP TO ₹36,000';
            modalBtn.innerHTML = 'GRAB NOW';
        }

        langList.classList.remove('active');
        threeangle.classList.remove('active');
    });
});

function adaptationElements() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const aspectClass = aspectRatio >= 2
        ? 'modificate1'
        : aspectRatio >= 1.6
            ? 'modificate2'
            : aspectRatio > 1
                ? 'modificate3'
                : 'modificate4';

    wrapper.className = `wrapper ${aspectClass}`;
}

adaptationElements();

window.addEventListener('resize', adaptationElements);