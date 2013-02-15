/* TOC
 * 0. Globals
 * 1. Main execution functions
 * 2. Utility Functions
 */

/* Global variables */
var	links = ["https://mail.google.com", "https://drive.google.com", 
	"https://www.google.com/calendar/render", "http://startx.stanford.edu/",
	"https://docs.google.com/spreadsheet/viewform?formkey=dHpkTHFONGlfSnRJWk5LVkd4dXVVS1E6MQ#gid=0"];

//currently unused -- Can use later if favicons deemed insufficient
// var linkDescriptions = ["GMail", "Google Docs", "GCal", "StartX Homepage", "StartX FeedBack Form"];

/* Execution Functions */
function generateDashboard() {
	getLinksFromLocalStorage();
  var icons = getIcons(links);
	showIcons(icons);
}

//Gets links from localstorage. Otherwise, uses defaults
function getLinksFromLocalStorage() {
	//Check if localStorage enabled. If so, we use localhost links
	if (supportsLocalstorage()) {
		//Get links from localstorage if nonempty. If empty, populate it with default links
		var storedLinks = (localStorage["links"]) ? JSON.parse(localStorage["links"]) : [];
		if (storedLinks.length > 0) {
			links = storedLinks;
		} else {
			localStorage["links"] = JSON.stringify(links);
		}
	}
}

//returns a list of favicon urls
function getIcons(links) {
	var icons = new Array();
	for (var i = 0; i < links.length; i++) {
		var domain = hostnameFromURL(links[i]);
		icons[i] = "http://www.google.com/s2/favicons?domain=" + domain;
	}
	return icons;
}

//Creates a bunch of imgs for each favicon
function showIcons(icons) {
	clearBox("images");

 	for (var i = 0; i < icons.length; i++) {
    var img = document.createElement('img');
    img.src = icons[i];
    img.setAttribute('alt', links[i]);
		img.setAttribute('id', "icon" + i);
		document.getElementById("images").appendChild(img);
		
		img.addEventListener('click', function() {
			chrome.tabs.create({url: this.alt}, null)
		});
  }

  if (supportsLocalstorage()) {
	  //Add a plus icon
	  var addLinks = document.createElement("img");
	  addLinks.src = "plus.png";
	  addLinks.setAttribute("alt", "Add another link");
	  addLinks.setAttribute("id", "addLink-button");
	  document.getElementById("images").appendChild(addLinks);
	  addLinks.addEventListener("click", function() {
	  	addLinkDialog();
	  });
	}
}

//Process to add a link
function addLinkDialog() {
	//Make links submit box visible
	var form = document.getElementById("text-box");
	form.className = "active";

	//Add event listener for form
	form.addEventListener("keydown", newLinkSubmit);
}

//process to add another link


/* Utility Functions */

//gets the domain name of a url
function hostnameFromURL(url) {
  var a = document.createElement ('a');
  a.href = url;
  return a.hostname;
}

//Clears div of contents
function clearBox(elementID) {
    document.getElementById(elementID).innerHTML = "";
}

//returns true if localStorage html5 is enabled
function supportsLocalstorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function newLinkSubmit(event) {
	if (event.keyCode == 13) {
		debugger;
		
		//Add the link to preferences
		var newLink = document.getElementById("text-box").value;
		links.push(newLink);
		console.log(newLink);
		localStorage["links"] = JSON.stringify(links);

		//Hide the toolbar again
		document.getElementById("text-box").className = "inactive";

		//Refresh everything
		generateDashboard();
	}
}

/********************
 * Main
 * Run the links generator
 ********************/
document.addEventListener('DOMContentLoaded', function () {
  generateDashboard();
});
