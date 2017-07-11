// Saves options to chrome.storage
function save_options() {
    let color = document.querySelector('#color').value;
    let quoting = document.querySelector('#quoting').value;
    chrome.storage.sync.set({
        theme: color,
        quoting: quoting
    }, function () {
        // Update status to let user know options were saved.
        let status = document.querySelector('#status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}
function restore_options() {
    chrome.storage.sync.get({theme: "moon", quoting: "double"}, function (items) {
        document.querySelector('#color').value = items.theme;
        document.querySelector('#quoting').value = items.quoting;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);

document.querySelector('#quotingSelector').addEventListener('click', save_options);

document.querySelector("#moon").addEventListener("click", function () {
    document.querySelector("#color").value = "moon";
    save_options();
}, false);

document.querySelector("#light").addEventListener("click", function () {
    document.querySelector("#color").value = "light";
    save_options();
}, false);

document.querySelector("#dark").addEventListener("click", function () {
    document.querySelector("#color").value = "dark";
    save_options();
}, false);

document.querySelector("#sun").addEventListener("click", function () {
    document.querySelector("#color").value = "sun";
    save_options();
}, false);

document.querySelector("#dream").addEventListener("click", function () {
    document.querySelector("#color").value = "dream";
    save_options();
}, false);

document.querySelector("#grass").addEventListener("click", function () {
    document.querySelector("#color").value = "grass";
    save_options();
}, false);
