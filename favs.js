let favChannels = [];
let top = 0;
let nodeListLength = 0;

function onError(error) {
    console.log(error);
}

function onGot(item) {
    if(item.channels) {
        favChannels = item.channels.split(' ');
    }
}

let getting = browser.storage.local.get("channels");
getting.then(onGot, onError);

const observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
        if (mutation.addedNodes.length) {
            if (!mutation.addedNodes[0].className.includes("fav-channel")) {
                top = moveFavoritesToTop(favChannels, top);

                const moreButton = document.querySelector('.eBPxOh');
                const nodeList = document.querySelector('.dBaosp');
                if(nodeList && moreButton) {
                    if(nodeList.childNodes.length > nodeListLength) {
                        if(!nodeList.innerText.endsWith("Offline")){
                            nodeListLength = nodeList.childNodes.length;
                            moreButton.click();
                        } 
                    }
                }

            } 
        }
    });
});
const nav = document.querySelector("#sideNav")
observer.observe(nav, {
    childList: true,
    subtree: true
})

function moveFavoritesToTop(favorites, top) {
    const nodeList = document.querySelector('.dBaosp');

    for(let i = 0; i < favorites.length; i++) {
        for(let j = top; j < nodeList.childNodes.length; j++) {
            let currentNode = nodeList.childNodes[j];
            if (currentNode.innerText.toLowerCase().includes(favorites[i].toLowerCase()) && !currentNode.innerText.endsWith("Offline")) {
                currentNode.classList.add("fav-channel");
                nodeList.insertBefore(currentNode, nodeList.childNodes[0]);
                top++;
                break;
            }
        }
    }
    return top;
}
