// main.js

console.log("Yo, I am alive!");


// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("main-container");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.width;
var pHeight = paper.height;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
var pageLoadTime = Date.now(); // (in miliseconds since 1970)
var gamesEndTime;
var snekTotalTime;
var bubbleTotalTime;
var playerAvatar;
var game04State = true;
//---------------------------------------------------------------------

// Just create a nice black background
var bgRect = paper.rect(0,0,pWidth, pHeight).attr({"fill": "black"});
var commentary = document.getElementById("commentary");
commentary.innerHTML = `<hr>This webpage is powered by HTML5, CSS, and purely by the Javascript library, Raphaël.<br><br>All audio and SVG line paths are extracted from works that are in the public domain (sources: freesound.org and freesvg.org). The image files used are created by yours truly.<br><br> Copyright © 2021, <a href='https://www.linkedin.com/in/lenon-ong/' target= '_blank'><span class='underline'>Lenon Ong</span></a><br><a href='https://creativecommons.org/licenses/by/3.0/' target= '_blank'><span class='underline'>Available under the Creative Commons Attribution 3.0 Unported License.</span></a><hr>`;
// 𝑑𝑖𝑠𝑡𝑎𝑛𝑐𝑒 = 𝑠𝑞𝑟𝑡(𝑥2 − 𝑥1)^2 + (𝑦2 − 𝑦1)^2)

let distance = function(p1, p2){
    return Math.sqrt(Math.pow(p2.x-p1.x,2)+Math.pow(p2.y-p1.y,2));
};

let distanceBackground = function(p1, p2){
    return Math.sqrt(Math.pow(p2.attr("cx")-p1.x,2)+Math.pow(p2.attr("cy")-p1.y,2));
};

// maps x in  the interval [a,b] into the interval [m, n]
let map =function (x, a, b, m, n){
    let range = n-m;
    // x is 'proportion' of the way from a to b
    // e.g. if a=10, b=20, and x=15, x is half (.5) of the way from a to b
    let proportion = (x-a)/(b-a); 
    return (m + proportion*range);
};

let startAudio = document.getElementById("startAudio");
let finalAudio = document.getElementById("finalAudio");
let hitAudio = [];
hitAudio[0] = new Audio("resources/362328__josepharaoh99__platform-jump.mp3");
hitAudio[1] = new Audio("resources/350866__cabled-mess__blip-c-06.wav");
hitAudio[2] = new Audio("resources/256555__skiggz__donald-duck-1.wav");
hitAudio[3] = new Audio("resources/146723__leszek-szary__coin-object.wav");
hitAudio[4] = new Audio("resources/462089__newagesoup__ethereal-woosh.wav");
hitAudio[5] = new Audio("resources/418231__kierankeegan__ui-back-sound.wav");
hitAudio[6] = new Audio("resources/452998__breviceps__blip-wave.wav");

bulletSpotX = pWidth/2;
bulletSpotY = pHeight/4*3.5;


// Creating cursorTarget, an overlay and event listeners
var cursorTarget = paper.circle(bulletSpotX,bulletSpotY,20).attr({
    "stroke-width":4,
    "stroke": "#FFF"
});
var cursorTarget2 = paper.circle(bulletSpotX,bulletSpotY,20).attr({
    "stroke-width":2,
    "stroke": "#000"
});
var cursorTarget2_2 = paper.path(`M${bulletSpotX-19},${bulletSpotY},L${bulletSpotX+19},${bulletSpotY}`).attr({
    "stroke-width":1,
    "stroke": "#FFF"
});
var cursorTarget2_3 = paper.path(`M${bulletSpotX},${bulletSpotY-19},L${bulletSpotX},${bulletSpotY+19}`).attr({
    "stroke-width":1,
    "stroke": "#FFF"
});

let cursorInitialRipple = paper.circle(bulletSpotX,bulletSpotY,20).attr({
    "stroke-width":1,
    "stroke": "#FFF"
});


let cursorRippleAnimation = function(){
	cursorInitialRipple.animate({
		"r": 200,
		"opacity": 0
	}, 1000);

	if (game04State === "true"){
		cursorInitialRipple = paper.circle(bulletSpotX,bulletSpotY,20).attr({
		    "stroke-width":1,
		    "stroke": "#000"
			});
		};
	cursorInitialRipple.hide();
};

cursorTarget.hide();
cursorTarget2.hide();
cursorTarget2_2.hide();
cursorTarget2_3.hide();
cursorInitialRipple.hide();

var overlay = paper.rect(0,0,pWidth,pHeight).attr({
    "fill":"#FFFFFF", 
    "fill-opacity": 0}
    );
var state = {
    "pushed":false, 
    "x":0, 
    "y":0
};

var globeMouseState = "up";

overlay.node.addEventListener("mousedown", function(ev){
    state.pushed = true;
    //globeMouseState = "down"
    cursorTarget.show();
    cursorTarget2.show();
    cursorTarget2_2.show();
    cursorTarget2_3.show();
});
overlay.node.addEventListener("mousemove", function(ev){
    state.x = ev.offsetX;
    state.y = ev.offsetY;
    cursorTarget.attr({
        "cx": state.x,
        "cy": state.y
    });
    cursorTarget2.attr({
        "cx": state.x,
        "cy": state.y
    });
    cursorTarget2_2.attr({"path": `M${state.x-19},${state.y},L${state.x+19},${state.y}`});
	cursorTarget2_3.attr({"path": `M${state.x},${state.y-19},L${state.x},${state.y+19}`});
});
overlay.node.addEventListener("mouseup", function(ev){
    state.pushed=false;
    globeMouseState = "up"
    cursorTarget.hide();
    cursorTarget2.hide();
    cursorTarget2_2.hide();
    cursorTarget2_3.hide();
});
overlay.node.addEventListener("click", function(ev){
	cursorInitialRipple.attr({
        "cx": state.x,
        "cy": state.y
    });
    console.log("overlay clicked")
    cursorInitialRipple.show();
	cursorRippleAnimation();
	hitAudio[5].pause();
    hitAudio[5].currentTime = 0;
    hitAudio[5].play();
});


	    	//globeMain.animate({"opacity": 0}, 1500, function(ev){this.hide()}); 
	    	//globeMain.node.removeEventListener("click", myFunction);
		    //globeMain.node.style.cursor="pointer";
		    //game03State = "false";
		    
		    //creating the door

		    var theDoorWidth = pWidth/20;
		    var theDoorHeight = pHeight/5;
		    var theDoorCoordinateX = pWidth/2-theDoorWidth/2;
		    var theDoorCoordinateY = pHeight-theDoorHeight;
		    var theDoor = paper.rect(theDoorCoordinateX, theDoorCoordinateY, theDoorWidth, theDoorHeight, 5).attr({
		    	"fill": "#dcddd9",
		    	"stroke-width": 0
		    });

		    let theDoorBlueConvertor = function(loop){
				theDoor.animate({
					"fill" : "#15f4ee"
				}, 1500, theDoorWhiteConvertor);
			};

			let theDoorWhiteConvertor = function(loop){
				theDoor.animate({
					"fill" : "#dcddd9"
				}, 1500, theDoorBlueConvertor);
			};


			theDoor.node.addEventListener("click", function myFunction(ev){
				theDoor.node.removeEventListener("click", myFunction);
				theDoor.node.style.cursor="pointer";
				finalAudio.pause();
	        	finalAudio.currentTime = 0;
	        	finalAudio.play();
	        	finalAudio.loop = true;
				game03State = "false";
				game04State = "true";
				theDoorGlowFluorescentBlue.animate({
					"opacity": 0
				}, 3000, function(ev){this.remove()});
				theDoor.animate({
					"width": 20,
					"opacity": 0
				}, 3000, function(ev){this.remove()});
				bgRect.animate({
					"fill": "white"
				}, 3000);
				//hitGlobeText.animate({"opacity":0}, 3000, function(ev){this.remove()});
				var chapterHeader = paper.text(pWidth/2, pHeight/2, "Act 0: The Floating Lemon Slice Game").attr({"font-size": 20, "fill": "#000000", "opacity": 0}).animate({"y": pHeight/10, "opacity": 1},7000, function(ev){this.animate({"opacity":0},2000, function(ev){this.remove()})});
				//commentary.innerHTML = `[${new Date().toLocaleTimeString()}] <b>The Talking Lemon</b>: This is the endgame. We are now in the <i>internal dimension</i> of a patent, and this is the manifestation of the patent's core. <i>Fancy.</i> You can learn more about the principles of "inventive step" and "industrial application" here. <br><br><br> Y'know, this is inspired by the internal dimension where Naruto talks to the Nine Tailed Fox:<br>Source:<a href='https://www.youtube.com/watch?v=vWwVkkzruFM 'target= '_blank'><span class='underline'>YouTube - "Naruto Meets Kyuubi First Time"</span></a>
					    		//<hr>This webpage is powered by HTML5, CSS, and purely by the Javascript library, Raphaël.<br><br>All audio and SVG line paths are extracted from works that are in the public domain (sources: freesound.org and freesvg.org). The image files used are created by yours truly.<br><br> Copyright © 2021, <a href='https://www.linkedin.com/in/lenon-ong/' target= '_blank'><span class='underline'>Lenon Ong</span></a><br><a href='https://creativecommons.org/licenses/by/3.0/' target= '_blank'><span class='underline'>Available under the Creative Commons Attribution 3.0 Unported License.</span></a><hr>`;
				hitAudio[4].pause();
        		hitAudio[4].currentTime = 0;
        		hitAudio[4].play();
				startGame04();
			});

		    theDoor.node.addEventListener("mousemove", function(ev){
		    	theDoor.node.style.cursor="pointer";
		    });   
		    
			theDoorBlueConvertor(theDoorBlueConvertor);

		    //creating the door glow

		    var theDoorGlowFluorescentBlue = theDoor.glow({ 'width': 20, 'fill': true, 'opacity': 0.8, 'color': '#15f4ee'});
		    let theDoorGlowZoffanyGlacierGreyConvertor = function(loop){
				theDoorGlowFluorescentBlue.animate({
					"color" : "#dcddd9",
					"width": 300
				}, 1500, theDoorGlowFluorescentBlueConvertor);
			};

			let theDoorGlowFluorescentBlueConvertor = function(loop){
				theDoorGlowFluorescentBlue.animate({
					"color" : "#15f4ee",
					"width": 20
				}, 1500, theDoorGlowZoffanyGlacierGreyConvertor);
			};


			theDoorGlowZoffanyGlacierGreyConvertor(theDoorGlowZoffanyGlacierGreyConvertor);


////*******************

//GAME 04: 

////*******************


let startGame04 = function(){
			
				//creating all the variables for Game 04    
	var orbsArray = [];
	var target1Y = [];
	var target2Y = [];
	var target3Y = [];
	let numOrbs = 18;
	var orbsCounter = 0;
	var newOrbsObj = {};
	var newOrbsArray = [];
	var orbsCleared = 0;
	let avatarClicked = 0;
	let numBubbles = 10;
	var newBubbles = [];
	let playerAvatarRadius = 15;
	var bubbleTimeLapsed = "";
	var finalStageCleared = 0;

				//prompt text

	var mouseText2 = paper.text(pWidth/2, pHeight/4*3, "Click on the floating core to begin.").attr({"font-size": 15, "fill": "#000000", "font-family": "Arial", "opacity": 0});
	mouseText2.animate({opacity: 1}, 5000);

			    //creating the "egg"
    var theEgg = paper.circle(bulletSpotX/3,bulletSpotY/3*2,20).attr({
    		"fill": "r(.3,.25) #ffe9e8-" + "pink",
		    "stroke-width":0,
		    "stroke": "#FFF",
		    "opacity": 0
		});
    theEgg.hide();
    theEgg.animate({"opacity": 1}, 3500, function(ev){this.show();});

    theEgg.node.addEventListener("click", function myFunction(ev){
		theEgg.node.removeEventListener("click", myFunction);
		theEgg.node.style.cursor="pointer";
		commentary.innerHTML = `[${new Date().toLocaleTimeString()}] <b>The Talking Lemon</b>: That flash of darkness... and we are now within a body of water. Are those impurities? Ahhh! Clear away the black orbs with the floating slice of lemon!<b> The slice of lemon can only be controlled vertically upwards</b>. You might be able to move faster by rebounding from the bottom, or the top. <br><br>Tip: Try using the ↑ arrow button on your keyboard as an alternative to the mouse click.
			    		<hr>This webpage is powered by HTML5, CSS, and purely by the Javascript library, Raphaël.<br><br>All audio and SVG line paths are extracted from works that are in the public domain (sources: freesound.org and freesvg.org). The image files used are created by yours truly.<br><br> Copyright © 2021, <a href='https://www.linkedin.com/in/lenon-ong/' target= '_blank'><span class='underline'>Lenon Ong</span></a><br><a href='https://creativecommons.org/licenses/by/3.0/' target= '_blank'><span class='underline'>Available under the Creative Commons Attribution 3.0 Unported License.</span></a><hr>`;
		hitAudio[3].pause();
        hitAudio[3].currentTime = 0;
        hitAudio[3].play();
		console.log("egg clicked");
		cursorTarget2_2.attr({"opacity": 0});
		cursorTarget2_3.attr({"opacity": 0});
		overlay.node.addEventListener("click", function(ev){
			cursorInitialRipple.attr({
		        "cx": state.x,
		        "cy": state.y
		    });
		    console.log("overlay clicked");
		    playerAvatar.speedX *= 1.05;
			playerAvatar.speedY += -10;
			avatarClicked++;
    		hitAudio[5].pause();
        	hitAudio[5].currentTime = 0;
        	hitAudio[5].play();
		    cursorInitialRipple.show();
			cursorRippleAnimation();
		});
		var bubbleSpawnTime = Date.now();
		var bubbleTimeLapsed = paper.text(pWidth/10, pHeight/10, `${Date.now()-bubbleSpawnTime}`).attr({"font-size": 20, "fill": "#000000", "opacity": 0});
		
						//creating the orbs

		while (orbsCounter<numOrbs){
			//target1Y[orbsCounter] = map(Math.random(),0,1,0.2,1)*column1Coord.y/1.5;
			orbsArray[orbsCounter] = paper.circle(map(Math.random(),0,1,playerAvatarRadius,pWidth-playerAvatarRadius),map(Math.random(),0,1,pHeight/3,pHeight-playerAvatarRadius),map(Math.random(),0,1,5,8)).attr({
			    		"fill": "r(.3,.25) #ffe9e8-" + "black",
					    "stroke-width":0,
					    "opacity":0
					});
			orbsArray[orbsCounter].animate({"opacity": 1}, 5000);
			var orbsValuesArray = Object.values(orbsArray[orbsCounter]);
			newOrbsObj = {
				"x": orbsValuesArray[6].cx,
				"y": orbsValuesArray[6].cy,
				"r": orbsValuesArray[6].r
			};
			newOrbsArray.push(newOrbsObj);
			orbsCounter++;
		};

		var overlay2 = paper.rect(0,0,pWidth,pHeight).attr({
		    "fill":"#FFFFFF",
		    "stroke-width": 0, 
		    "fill-opacity": 1}
		    );
		overlay2.node.addEventListener("click", function(ev){
			cursorInitialRipple.attr({
		        "cx": state.x,
		        "cy": state.y
		    });
		    console.log("overlay clicked");
		    playerAvatar.speedX *= 1.05;
			playerAvatar.speedY += -5;
			avatarClicked++;
    		hitAudio[5].pause();
        	hitAudio[5].currentTime = 0;
        	hitAudio[5].play();
		    /*cursorInitialRipple.show();
			cursorRippleAnimation();*/
		});
		overlay2.animate({opacity: 0}, 3000, function(ev){this.remove();});
		mouseText2.remove();
		var mouseText3 = paper.text(pWidth/2, pHeight/4*3, `Click anywhere or use the "up" arrow key on a keyboard to give the slice of lemon a little vertical boost!\n \nClear away all the black orbs by touching them with the slice of lemon!`).attr({"font-size": 15, "fill": "#000000", "font-family": "Arial", "opacity": 1});
		mouseText3.animate({opacity: 0}, 7000, function(ev){this.remove();});
		var scoreTextStage4 = paper.text(pWidth/4*3.6, pHeight/10, `Black orbs cleared: ${orbsCleared} / 18`).attr({"font-size": 15, "fill": "#000000", "font-family": "Arial", "opacity": 0});
		scoreTextStage4.animate({opacity: 1}, 1000);
		eggSqueezed++;
		bgRect.animate({
			"fill": "90-#9cfbff:5-#FFFFFF:100"
		}, 1000);

		if (eggSqueezed===1){
		theEgg.animate({"cx": bulletSpotX/4, "cy": bulletSpotY/4*2, "fill": "white", "r":0.1, "opacity":0.1}, 2000, function(ev){this.remove();});
			};

		var playerAvatar = paper.circle(bulletSpotX/3,bulletSpotY/3*2,playerAvatarRadius).attr({
    		"fill": "url('resources/just_lemon5.png')",
		    "stroke-width":0,
		});





	//bubbles code
	let createBubbles = function(){			

		var bubblesInitialPosition = {
			"x": map(Math.random(),0,1,0,pWidth),
			"y": pHeight + 25
		};
		var bubblesCounter = 0;
		while (bubblesCounter < numBubbles) {
				newBubbles[bubblesCounter] = paper.circle(bubblesInitialPosition.x,bubblesInitialPosition.y,map(Math.random(),0,1,5,20)).attr({
		    		"fill": "r(.3,.25) #b5fcff-" + "#e8feff",
				    "stroke-width":0,
				});

				if (orbsCleared >= numOrbs){
					newBubbles[bubblesCounter].attr({"fill": "r(.3,.25) #bd3000-" + "#e8feff"});
				};
				

				newBubbles[bubblesCounter].animate({"cx": map(Math.random(),0,1,-20,pWidth), "cy": -25}, map(Math.random(),0,1,10000,20000)); //removed , function(ev){this.remove();}
				bubblesCounter++;
		};
	};

		//4. Map "Up" key to button

		// Execute a function when the user releases a key on the keyboard
		window.addEventListener("keyup", function(event) {
		  // Number 32 is the "Spacebar" key on the keyboard
		  if (event.keyCode === 38) {
		    // Cancel the default action, if needed
		    event.preventDefault();
			var playerAvatarObj = {
				"x": playerAvatar.attr("cx"),
				"y": playerAvatar.attr("cy")
			};
			playerAvatar.speedX *= 1.05;
			playerAvatar.speedY += -5;
			avatarClicked++;
			hitAudio[5].pause();
        	hitAudio[5].currentTime = 0;
        	hitAudio[5].play();
		  };
		});


		playerAvatar.speedX = 2;
		playerAvatar.speedY = 0;
		playerAvatar.gravity = 0.1;
		playerAvatar.drag = 0.95;
		playerAvatar.gravitySpeed = 0;
		playerAvatar.posx = bulletSpotX/3;
		playerAvatar.posy = bulletSpotY/3*2;

		let updateMap = function() {
			//bubbleTimeLapsed.attr({text: `${(Math.round((Date.now()-bubbleSpawnTime))/1000).toFixed(2)}`});
			scoreTextStage4.attr({text: `Black orbs cleared: ${orbsCleared} / 18`});
			playerAvatar.toFront();
			playerAvatar.gravitySpeed += playerAvatar.gravity;
			playerAvatar.posx += playerAvatar.speedX;
			playerAvatar.posy += playerAvatar.speedY + playerAvatar.gravitySpeed;
			playerAvatar.posy *= playerAvatar.drag;

			/*let clashInitialRipple = paper.circle(-100,-100,40).attr({
			    "stroke-width":2,
			    "stroke": "yellow"
			});
			let clashRippleAnimation = function(){
				clashInitialRipple.show();
				clashInitialRipple.animate({
					"r": 400,
					"opacity": 0
				}, 2000);
			};*/
			if(playerAvatar.posy >= pHeight-15){
				playerAvatar.posy = pHeight-21;
				playerAvatar.gravitySpeed = 0;
				playerAvatar.speedY = -3;
	            /*clashInitialRipple.attr({
	            	"cx": playerAvatar.posx,
	            	"cy": playerAvatar.posy
	            });
	            clashRippleAnimation();*/
    			hitAudio[5].pause();
        		hitAudio[5].currentTime = 0;
        		hitAudio[5].play();
			};
			if(playerAvatar.posx >= pWidth-15){
				playerAvatar.posx = pWidth-21;
				playerAvatar.speedX = -2;
	            /*clashInitialRipple.attr({
	            	"cx": playerAvatar.posx,
	            	"cy": playerAvatar.posy
	            });
	            clashRippleAnimation();*/
    			hitAudio[5].pause();
        		hitAudio[5].currentTime = 0;
        		hitAudio[5].play();
			};
			if(playerAvatar.posx <= 15){
				playerAvatar.posx = 21;
				playerAvatar.speedX = 2;
	            /*clashInitialRipple.attr({
	            	"cx": playerAvatar.posx,
	            	"cy": playerAvatar.posy
	            });
	            clashRippleAnimation();*/
    			hitAudio[5].pause();
        		hitAudio[5].currentTime = 0;
        		hitAudio[5].play();
			};

			if(playerAvatar.posy <= 15){
				playerAvatar.speedY += 10;
	            /*clashInitialRipple.attr({
	            	"cx": playerAvatar.posx,
	            	"cy": playerAvatar.posy
	            });
	            clashRippleAnimation();*/
    			hitAudio[5].pause();
        		hitAudio[5].currentTime = 0;
        		hitAudio[5].play();
			};
			playerAvatar.attr({
				"cx": playerAvatar.posx,
				"cy": playerAvatar.posy
			});
			//console.log(orbsCleared);
        	if (orbsCleared === numOrbs){
        		clearInterval(game04Inverval);
        		bubbleTotalTime = Math.round((Date.now()-bubbleSpawnTime)).toFixed(2)/1000;
        		bubbleTimeLapsed.attr({"opacity": 1});
        		bubbleTimeLapsed.attr({"text": `You took ${Math.round((Date.now()-bubbleSpawnTime)).toFixed(2)/1000} seconds.`});
        		bubbleTimeLapsed.animate({"x": pWidth/5, "opacity": 0}, 5000, function(ev){this.remove()});
        		scoreTextStage4.animate({"opacity": 0}, 5000, function(ev){this.remove()});
	        	var playerAvatarObj = {
					"stroke": "red",
					"stroke-width": 5,
					"fill": "r(.3,.25) red-" + "black"
				};
				gamesEndTime = Date.now(); // (in miliseconds since 1970)
				let theAvatarEnlarger = function(loop){
					playerAvatar.animate({
						"r" : 500
					}, 5000, theAvatarSqueezer);
				};

				let theAvatarSqueezer = function(loop){
					playerAvatar.animate({
						"r" : 1
					}, 5000, theAvatarEnlarger);
				};
			    theAvatarEnlarger(theAvatarEnlarger);
			    bgRect.attr({
					"fill": "90-#bd3000:5-#FFFFFF:100"
				});
        		oneLastThing();
        	};

			let bubblePop = function(b1, b2){
				bz = {
			        "x" : b1.posx,
			        "y" : b1.posy,
			    };

			    var d = [];
    			var orbsCounter = 0;

				while (orbsCounter<numOrbs){
					b2[orbsCounter] = {
				        "x" : b2[orbsCounter].x,
				        "y" : b2[orbsCounter].y,
				       	"r" : b2[orbsCounter].r,
				    };
				    d[orbsCounter] = distance(bz,b2[orbsCounter]);
					if (d[orbsCounter] < playerAvatarRadius + b2[orbsCounter].r){
				        orbsArray[orbsCounter].animate({"r":0, "opacity": 0.5}, 0.000001, function(){
				        	this.remove(); 
				        	orbsCleared++;
							hitAudio[0].pause();
			        		hitAudio[0].currentTime = 0;
			        		hitAudio[0].play();
							let clashInitialRipple = paper.circle(-100,-100,40).attr({
							    "stroke-width":2,
							    "stroke": "yellow"
							});
							let clashRippleAnimation = function(){
								clashInitialRipple.show();
								clashInitialRipple.animate({
									"r": 400,
									"opacity": 0
								}, 2000);
							};
				            clashInitialRipple.attr({
				            	"cx": b1.posx,
				            	"cy": b1.posy
				            });
				            clashRippleAnimation();
				        });
				    };

					orbsCounter++;
				};

			};

			bubblePop(playerAvatar, newOrbsArray);
 			
		};

		//c. create exclaimation mark prompt

		var exclaimationMarkPrompt = "";

		//d. create question mark prompt

		var questionMarkPrompt = "";

		//e. create small window showing expression (benzier)
		//f. animate
		let game04Inverval = setInterval(updateMap, 30);
		let createBubblesInverval = setInterval(createBubbles, 15000);

	});

    theEgg.node.addEventListener("mousemove", function(ev){
    	theEgg.node.style.cursor="pointer";
    });   

    let theEggEnlarger = function(loop){
		theEgg.animate({
			"r" : 30
		}, 1500, theEggSqueezer);
	};

	let theEggSqueezer = function(loop){
		theEgg.animate({
			"r" : 20
		}, 1500, theEggEnlarger);
	};

	var eggSqueezed = 0;
	if (eggSqueezed	=== 0){
    		theEggEnlarger(theEggEnlarger);
		};
};


//gravity function. source: https://www.w3schools.com/graphics/game_gravity.asp
//because I want to stimulate a floating environment, gravity will be weak while acceleration will be high (for later on)

			////*******************

			//Ending website formation / information / replay / options for hard mode.

			////*******************

let oneLastThing = function(){
    commentary.innerHTML = `[${new Date().toLocaleTimeString()}] <b>The Talking Lemon</b>: The patent example here is [CN101796992A] Manufacturing Process of Lemon Tea: <a href='https://patents.google.com/patent/CN101796992A/en' 'target= '_blank'><span class='underline'>Google Patents</span></a>
    <br><br><br> The physics of Act 0 is inspired by the gravity and drag logic of MapleStory's Aqua Road:<br>Source:<a href='https://youtu.be/SxFGmwu3YOw' 'target= '_blank'><span class='underline'>YouTube - "Maplestory Exploring Aqua Road Aquarium Pt 1 | Maplestory Nostalgia"</span></a>
	<hr>      <input class="styled"
       type="button" onClick="window.location.href=window.location.href"
       value="Play Again"> 

<hr>This webpage is powered by HTML5, CSS, and purely by the Javascript library, Raphaël.<br><br>All audio and SVG line paths are extracted from works that are in the public domain (sources: freesound.org and freesvg.org). 
The image files used are created by yours truly.
<br><br> Copyright © 2021, <a href='https://www.linkedin.com/in/lenon-ong/' target= '_blank'><span class='underline'>Lenon Ong</span></a><br><a href='https://creativecommons.org/licenses/by/3.0/' target= '_blank'><span class='underline'>Available under the Creative Commons Attribution 3.0 Unported License.</span></a><hr>`;
    hitAudio[3].pause();
    hitAudio[3].currentTime = 0;
    hitAudio[3].play();
	var overlay3 = paper.rect(0,0,pWidth,pHeight).attr({
    "fill":"#FFFFFF", 
    "fill-opacity": 0.5}
    );
	var finalText = paper.text(pWidth/2, pHeight/2, "x").attr({
	"font-size": 20, 
	"fill": "#000000",
	"opacity": 0
	});
	var chapterHeader = paper.text(pWidth/2, pHeight/2, "Epilogue: Lemons, Water, and Lemon Tea.").attr({"font-size": 25, "fill": "#000000", "opacity": 0}).animate({"y": pHeight/10, "opacity": 1},7000);
	var evaluateTime = Math.floor(bubbleTotalTime);
	if (bubbleTotalTime < 120){
		    finalText.attr({"text": `You have witnessed the birth of a patent's core.\n \nYou took a total of about ${evaluateTime} seconds! I give that an "A+"!`});
		    finalText.animate({"opacity":1}, 3000);
	}else{
		    finalText.attr({"text": `You have witnessed the birth of a patent's core.\n \nYou took a total of about ${evaluateTime} seconds! I give that an "A"!`});
			finalText.animate({"opacity":1}, 3000);
	};
};			
