var gems = 0;
var drills = 0;
var gemsps = 0;
var drillCost = 0;
var nextDrill;
var nextDrillPrice;
var drill;
var drillingUnderground = false;
var drillGems = 1;
var foundUnderground = false;
var undergroundCountdown;
function mineGem(){
	var amount = 1;
	if(drill!=null){
		if(drill=="Stone"){
			amount = 2;
		} else if(drill=="Iron"){
			amount = 5;
		} else if(drill=="Diamond"){
			amount = 9;
		} else if(drill == "Reinforced Diamond"){
			amount = 15;
		} else if(drill=="Gem"){
			amount = 25;
		}
	}
	gems = gems+amount;
	document.getElementById("gems").innerHTML = gems;
}
function mainCave(){
	loadDrillPrices();
	if(drillCost!=0){
		document.getElementById("autodrillPrice").innerHTML = " ("+drillCost+" gems)";
	} else {
		document.getElementById("autodrillPrice").innerHTML = " (30 gems)";
	}
	document.getElementById("alert alert-mainShop").style.visibility = "visible";
}
function mystCave(){
	if(!foundUnderground){
		if (drill!=null && drill!="Stone") {
			if(!drillingUnderground){
				document.getElementById("underTimeRemain").innerHTML = "You now have a drill good enough for the rocks!<br>Would you like to mine the rocks?";
				document.getElementById("drillStart").style.visibility = "visible";
			} else {
				document.getElementById("underTimeRemain").innerHTML = "Drilling...<br>Time Remaining: "+undergroundCountdown+" Minute(s)";
			}
			document.getElementById("alert alert-mystCave").style.visibility = "visible";
		} else {
			document.getElementById("underTimeRemain").innerHTML = "<br>You need at least an Iron Drill in order to break the hard rocks in this cave!";
			document.getElementById("alert alert-mystCave").style.visibility = "visible";
		}
	} else {
		document.getElementById("alert alert-mystCave").style.visibility = "visible";
	}
}
function startDrilling(){
	drillingUnderground = true;
	document.getElementById("drillStart").style.visibility = "hidden";
	undergroundCountdown=30;
	document.getElementById("underTimeRemain").innerHTML = "Drilling...<br>Time Remaining: "+undergroundCountdown+" Minute(s)";
}

function loadDrillPrices(){
	if(drill==null){
		nextDrill="Stone";
		nextDrillPrice = 1000;
	} else if(drill=="Stone"){
		nextDrill = "Iron";
		nextDrillPrice = 20000;
	} else if(drill=="Iron"){
		nextDrill = "Diamond";
		nextDrillPrice = 150000;
	} else if(drill=="Diamond"){
		nextDrill= "Reinforced Diamond";
		nextDrillPrice=2500000;
	} else if(drill == "Reinforced Diamond"){
		nextDrill = "Gem";
		nextDrillPrice = 50000000;
	} else if(drill=="Gem"){
		nextDrill = "Sorry:(, there is no better";
		nextDrillPrice = null;
	}
	document.getElementById("buyDrill").value = "Buy "+nextDrill+" Drill";
	if(nextDrillPrice!=null){
	document.getElementById("drillPrice").innerHTML = " ("+nextDrillPrice+" gems)";
	} else {
		document.getElementById("drillPrice").innerHTML = "";
	}
}

function alertError(string){

}

function buyAutodrill(amount){
	for (var i = 0; i < amount; i++) {
		drillCost = Math.floor(30 * Math.pow(1.1,drills));     //works out the cost of this cursor
    	if(gems >= drillCost){                                   //checks that the player can afford the cursor
       		drills = drills + 1;                                   //increases number of cursors
    		gems = gems - drillCost;                          //removes the cookies spent
        	document.getElementById('autodrills').innerHTML = drills;  //updates the number of cursors for the user
        	document.getElementById('gems').innerHTML = gems;  //updates the number of cookies for the user
    	};
    	var nextCost = Math.floor(30 * Math.pow(1.1,drills));       //works out the cost of the next cursor
    	drillCost = nextCost;
    	updateGemsPerSec();
		document.getElementById("autodrillPrice").innerHTML = " ("+drillCost+" gems)";
	}
}

function updateGemsPerSec(){
	gemsps = drills*drillGems;
}

function buyDrill(){
	if(gems >= nextDrillPrice){
		gems-=nextDrillPrice;
		drill = nextDrill;
		loadDrillPrices();
	}
}

window.setInterval(function(){
	gems+=gemsps;
	document.getElementById("gems").innerHTML = gems;
}, 1000);

window.setInterval(function(){
	if(!foundUnderground){
		if(undergroundCountdown!=null && undergroundCountdown!=0){
			undergroundCountdown=undergroundCountdown-1;
			document.getElementById("underTimeRemain").innerHTML = "Drilling...<br>"+undergroundCountdown+" Minute(s)";
		} 
		if(undergroundCountdown==0){
			foundUnderground = true;
			drillingUnderground = false;
			document.getElementById("undergroundVillage").style.visibility="visible";
			document.getElementById("undergroundMain").style.visibility = "visible";
			document.getElementById("underTimeRemain").innerHTML = "You found an underground village!";
			drillGems = 2;
			updateGemsPerSec();
		}
	}
}, 60000);

function closeMessage(id){
	document.getElementById("alert alert-"+id).style.visibility = "hidden";
	if(id=="mystCave"){			
		document.getElementById("underTimeRemain").innerHTML = "This cave also has gems! Your autodrills now make 2 gems/sec";
		document.getElementById("drillStart").style.visibility = "hidden";
	}
}