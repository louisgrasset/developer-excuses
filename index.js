"use strict";
const BODY = document.querySelector("body");
const QUOTE = document.querySelector(".quote");

const fetchExcuse = () => {
    const REX = /<a.*?>(.*?)<\/a>/;
    const URL = 'http://developerexcuses.com';

    return fetch(new Request(URL))
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error("Internet disconnected");
        })
        .then(response => {
            let match = REX.exec(response);
            return match ? match[1] : "No more excuses";
        })
        .catch(() => {
            return Promise.resolve("Seems internet is down");
        })
};

const excuse = () => {
    Promise.all([fetchExcuse(), restore_options()])
        .then(([excuse, quoting]) => {
            QUOTE.innerText = quote(excuse, quoting);
            prepareToClipboard(excuse);
        })
        .catch((error) => {
            console.log(error)
        });
};

const quote = (text, quoting) => {
    switch (quoting) {
        case "none":
            return text;
            break;
        case "single":
            return `' ${text} '`;
            break;
        case "double":
            return `“ ${text} ”`;
            break;
    }
};

const restore_options = (debug) => {
    return new Promise((resolve) => {
        chrome.storage.sync.get({theme: "moon", quoting: "double"}, function (items) {
            if (debug) {
                console.group("Developer excuses debug mode");
                console.log("ℹ️ Current theme : " + items.theme);
                console.log("ℹ️ Current quotation schema : " + items.quoting);
                console.groupEnd();
            }
            switch (items.theme) {
                case "moon":
                    BODY.classList.add(items.theme);
                    break;
                case "light":
                    BODY.classList.add(items.theme);
                    break;
                case "dark":
                    BODY.classList.add(items.theme);
                    break;
                case "sun":
                    BODY.classList.add(items.theme);
                    break;
                case "dream":
                    BODY.classList.add(items.theme);
                    break;
                case "grass":
                    BODY.classList.add(items.theme);
                    break;
            }
            resolve(items.quoting);
        });
    });
};

const prepareToClipboard = (excuse) => {
    document.querySelector('.currentQuote').value = excuse;
};

document.addEventListener('DOMContentLoaded', excuse());

QUOTE.addEventListener('click', function () {
    document.querySelector('.currentQuote').select();
    document.execCommand('copy');
});

window.addEventListener('keypress', function (event) {
    if (event.key === "r" || event.key === "") {
        excuse()
    }
    if (event.key === "o" || event.key === "O") {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    }
});
