var	links = ["https://mail.google.com", "https://drive.google.com", 
	"https://www.google.com/calendar/render", "http://startx.stanford.edu/",
	"https://docs.google.com/spreadsheet/viewform?formkey=dHpkTHFONGlfSnRJWk5LVkd4dXVVS1E6MQ#gid=0"];

var linkDescriptions = ["GMail", "Google Docs", "GCal", "StartX Homepage", "StartX FeedBack Form"];

function generateDashboard() {
  var icons = getIcons(links);
	showIcons(icons);
}

function getIcons(links) {
	var icons = new Array();
	for (var i = 0; i < links.length; i++) {
		var domain = hostnameFromURL(links[i]);
		icons[i] = "http://www.google.com/s2/favicons?domain=" + domain;
	}
	return icons;
}

function showIcons(icons) {
  for (var i = 0; i < icons.length; i++) {
    var img = document.createElement('img');
    img.src = icons[i];
    img.setAttribute('alt', links[i]);
		img.setAttribute('id', "icon" + i);
		document.getElementById("images").appendChild(img);
		var link = links[i];
		
		img.addEventListener('click', function() {
			chrome.tabs.create({url: this.alt}, null)
		});
  }
}

function hostnameFromURL(url) {
  var a = document.createElement ('a');
  a.href = url;
  return a.hostname;
}

function openLinkInCurrentTab(link) {
	console.log(link);
	chrome.tabs.create({url: link}, null)
}

// Run the links generator
document.addEventListener('DOMContentLoaded', function () {
  generateDashboard();
});
