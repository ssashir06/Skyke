var div = null;
var stop = false;
var tab_id = null;

function play(src) {
	while (div.childNodes.length) {
		div.removeChild(div.childNodes[0]);
	}

	var audio = document.createElement("audio");
	audio.autoplay = true;
	audio.src = src;

	div.appendChild(audio);
	
	console.log("Pipo!");
}

function delay(max) {
	return 1000 + Math.random() * max * 1000;
}

function chat() {
	if (!stop) {
		setTimeout(chat, delay(30));
		play("pipo.mp3");
	}
}

chrome.browserAction.onClicked.addListener(function(tab) {
	if (!div) {
		div = document.createElement("div");
		document.body.appendChild(div);
	}

	setTimeout(chat, delay(5));
	tab_id = tab.id;
	stop = false;
});

chrome.tabs.onRemoved.addListener(function(tab, info) {
	if (tab == tab_id) stop = true;
});
