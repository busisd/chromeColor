var changeColor = document.getElementById("changeColor");

var rRange = document.getElementById("rRange");
var rVal = document.getElementById("rVal");
chrome.storage.local.get(['storeRed'], function(result){
	rRange.value = result['storeRed'];
	rVal.innerHTML = rRange.value;
});

var gRange = document.getElementById("gRange");
var gVal = document.getElementById("gVal");
chrome.storage.local.get(['storeGrn'], function(result){
	gRange.value = result['storeGrn'];
	gVal.innerHTML = gRange.value;
});

var bRange = document.getElementById("bRange");
var bVal = document.getElementById("bVal");
bVal.innerHTML = bRange.value;
chrome.storage.local.get(['storeBlu'], function(result){
	bRange.value = result['storeBlu'];
	bVal.innerHTML = bRange.value;
	updateButton();
});


rRange.oninput = function() {
	updateRed();
	updateButton();
}
gRange.oninput = function() {
	updateGrn();
	updateButton();
}
bRange.oninput = function() {
	updateBlu();
	updateButton();
}


rRange.onmouseup = function(){
	chrome.storage.local.set({'storeRed': rRange.value}, function(){});
}
gRange.onmouseup = function(){
	chrome.storage.local.set({'storeGrn': gRange.value}, function(){});
}
bRange.onmouseup = function(){
	chrome.storage.local.set({'storeBlu': bRange.value}, function(){});
}


changeColor.onclick = function(element) {
	var color = 'rgb('+rRange.value+','+gRange.value+','+bRange.value+')';
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'document.body.style.backgroundColor = "' + color + '";'}
		);
	});
};


function updateRed() {
	rVal.innerHTML = rRange.value;
}
function updateGrn() {
	gVal.innerHTML = gRange.value;
}
function updateBlu() {
	bVal.innerHTML = bRange.value;
}

function updateButton() {
	changeColor.style.backgroundColor = 'rgb('+rRange.value+','+gRange.value+','+bRange.value+')'
}