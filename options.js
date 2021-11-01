
function saveChannels(e) {
    e.preventDefault();
    browser.storage.local.set({
        channels: document.querySelector("#channels").value
    });
    console.log("Options set");
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#channels").value = result.channels || "EMPTY";
    }

    function onError(error) {
        console.log('error');
        console.log(error);
    }

    let getting = browser.storage.local.get("channels");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveChannels);