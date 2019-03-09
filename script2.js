var canvas, ctx, canvasBoat, ctxBoat, canvasFish, ctxFish;

var totalScore = 0;
var frames = 0;
var displayScore = 0;
var pop = new Image();
var pop1 = new Image();
var fishCatchSound = new Audio();
fishCatchSound.src = "./sounds/plop.wav";

var bgMusic = new Audio();
bgMusic.src = "./sounds/369920__mrthenoronha__cartoon-game-theme-loop.wav";

musicOnFlag = true;

// Arrays of New Fish 
var fishArray = [];
var fishArray1 = [];
var fishArray2 = [];
var fishArray3 = [];
var fishArray4 = [];
var fishArrayEel = [];
var fishArrayOctopus = [];

// Array of Fish caught
var fishCaughtArray = [];

//New fish object created

var fishImg = {}
var fishImg1 = {}
var fishImg2 = {}
var fishImg3 = {}
var fishImg4 = {}
var fishImgEel = {}
var fishImgOctopus = {}


//Constructor for fish

function Fish(fishY, fishYmax, value, fishImg, points) {
    this.x = canvas.width;
    this.minY = fishY;     //min range of swimming area 
    this.maxY = fishYmax; //max range of Swimming area defind of Y-axis
    this.value = value;   // points of each fish

    this.y = Math.floor(Math.random() * (this.maxY - this.minY)) + this.minY; // random swimming
}

Fish.prototype.fishDraw = function () {
    ctxFish.drawImage(fishImg.type, this.x, this.y, 115, 115); // point- 1 fish
}

Fish.prototype.fishDraw1 = function () {
    ctxFish.drawImage(fishImg1.type, this.x, this.y, 115, 115); // point- 3 fish
}

Fish.prototype.fishDraw2 = function () {
    ctxFish.drawImage(fishImg2.type, this.x, this.y, 115, 115); // point- 5 fish
}

Fish.prototype.fishDraw3 = function () {
    ctxFish.drawImage(fishImg3.type, this.x, this.y, 115, 115); // point- 10 fish
}

Fish.prototype.fishDraw4 = function () {
    ctxFish.drawImage(fishImg4.type, this.x, this.y, 167, 115); // Shark - 15 point
}

Fish.prototype.fishDraw5 = function () {
    ctxFish.drawImage(fishImgEel.type, this.x, this.y, 115, 115); //  Eel with minus 5
}

Fish.prototype.fishDraw6 = function () {
    ctxFish.drawImage(fishImgOctopus.type, this.x, this.y, 115, 115); // octopus with minus 10
}


//-------------------------------------------------------Window onload

window.onload = function () {
    
    document.getElementById("StartButton").onclick = showCanvas;//--start button click-event
    document.getElementById("RestartButton").onclick = showCanvas;

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvasBoat = document.getElementById('canvas-boat');
    ctxBoat = canvasBoat.getContext('2d');
    canvasFish = document.getElementById('canvas-fish');
    ctxFish = canvasFish.getContext('2d');
    
    // game background
    var bgImg = new Image();
    imgScale = 640 / 480;
    bgImg.onload = function () {
    ctx.drawImage(bgImg, 0, 0, 748 * imgScale, 748);
    }
    bgImg.src = './images/bg.jpg';

    // Boat image
    var boat = new Image();
    boat.onload = function () {
        ctxBoat.drawImage(boat, 700, 160, 300, 150);
    }
    boat.src = './images/boat.png';

    //Pop image
    
    pop.src = './images/pop.png';
    pop1.src = './images/pop1.png';

    //music icon
     
    var musicOnBtn = new Image();
    musicOnBtn.onload = function () {
        ctxBoat.drawImage(musicOnBtn, 810, 25, 20, 20);
    }
    musicOnBtn.src = './images/music-on.png';

   var musicOffBtn = new Image();
   musicOffBtn.src = './images/music-off.png';

    // Game Text 
    ctxBoat.font = "bold 14px verdana, sans-serif";
    ctxBoat.fillStyle = "#FFF";

    ctxBoat.fillText("Your Score: " + "0", 850, 40);

    //-------------------------------------------------Fish Images
    fishImg.type = new Image();
    fishImg.type.src = './images/1-point-fish.png';

    fishImg1.type = new Image();
    fishImg1.type.src = './images/3-point-fish.png';

    fishImg2.type = new Image();
    fishImg2.type.src = './images/5-point-fish.png';

    fishImg3.type = new Image();
    fishImg3.type.src = './images/10-point-fish.png';

    fishImg4.type = new Image();
    fishImg4.type.src = './images/shark-bonus.png';

    fishImgEel.type = new Image();
    fishImgEel.type.src = './images/eel.png';

    fishImgOctopus.type = new Image();
    fishImgOctopus.type.src = './images/octopus.png';

   

    //window Animation;
    window.requestAnimationFrame(animate);

    //-----------------------------------------mouse position on click determined

    canvasFish.addEventListener("click", function (evt) {        
        var mousePos = getMousePos(canvasFish, evt);
       
        // -------------Drawing Fishing line 

       if(mousePos.y > 65){
        ctx.beginPath();
        ctx.moveTo(713, 165);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
      
        catchFish(mousePos.x, mousePos.y);
        ctxBoat.drawImage(boat, 700, 160, 300, 150);  
       } else {
            if (mousePos.x > 810 && mousePos.x < (810 + 20) && mousePos.y > 25 && mousePos.y < (25 + 20)) { // music button ON functionality
                if(musicOnFlag){
                    pauseAudio();
                    musicOnFlag = false;
                    ctxBoat.clearRect(810, 25, 20, 20);
                    ctxBoat.drawImage(musicOffBtn, 810, 25, 20, 20);
                } else {
                    playAudio();                                       //music button OFF functionality
                    musicOnFlag = true;
                    ctxBoat.clearRect(810, 25, 20, 20);
                    ctxBoat.drawImage(musicOnBtn, 810, 25, 20, 20);
                }
                
            }
       }

        ctxBoat.clearRect(845, 20, 150, 20); //--------------------------- to clear score rectangle
        ctxBoat.font = "bold 14px verdana, sans-serif";
        ctxBoat.fillStyle = "#FFF";
        ctxBoat.fillText("Your Score: " + totalScore, 850, 40);//-------- total score
  

        setTimeout(function () {
            ctx.clearRect(0, 0, canvasFish.width, canvasFish.height);
            ctx.drawImage(bgImg, 0, 0, 748 * imgScale, 748);  // fishing hook disappearing every .5 sec
        }, 500);
    }, false);

};
//---------------------------------------------------------Animation
var animate = function () {
    frames++;
    ctxFish.clearRect(0, 0, canvas.width, canvas.height);
    
     //------------------------------------------fish movement & new fish creation---------------

     //--1-point fish
    if (frames % 40 === 0 && fishArray.length < 7) {   //--- 7 fish in an array    
        fishArray.push(new Fish(430, 540, 1)); //new fish created 
    }

    for (var i = 0; i < fishArray.length; i++) {
    if (fishArray[i].x < -115) {               // recylce fish if array length 7 reached
        fishArray[i].x = canvas.width + 115;
        }
    else {
        fishArray[i].fishDraw();
        }

        fishArray[i].x -= 4;                          // Fish speed

    }
    //-- //3-point fish array length 4

    if (frames % 40 === 0 && fishArray1.length < 4) {

        fishArray1.push(new Fish(470, 600, 3));
    }
    for (var i = 0; i < fishArray1.length; i++) {
        if (fishArray1[i].x < -115) {
            // recylce fish
            fishArray1[i].x = canvas.width + 115;
        }
        else {
            fishArray1[i].fishDraw1();
        }

        fishArray1[i].x -= 5;
    }
    //----5- point fish

    if (frames % 80 === 0 && fishArray2.length < 2) {
        fishArray2.push(new Fish(470, 600, 5));
    }
    for (var i = 0; i < fishArray2.length; i++) {
        if (fishArray2[i].x < -115) {
            // recylce fish
            fishArray2[i].x = canvas.width + 115;
        }
        else {
            fishArray2[i].fishDraw2();
        }

        fishArray2[i].x -= 7;            //fish speed
    }
    //----10 point fish

    if (frames % 180 === 0 && fishArray3.length < 3) {
        fishArray3.push(new Fish(470, 600, 10));
    }
    for (var i = 0; i < fishArray3.length; i++) {
        if (fishArray3[i].x < -115) {
            // recylce fish
            fishArray3[i].x = canvas.width + 115;//---changing here
        }
        else {
            fishArray3[i].fishDraw3();
        }

        fishArray3[i].x -= 10;          //fish speed
    }

    //---15 point shark Bonus

    if (frames % 400 === 0 && fishArray4.length < 1) {
        fishArray4.push(new Fish(650, 670, 15));
    }
    for (var i = 0; i < fishArray4.length; i++) {
        if (fishArray4[i].x < -115) {
            // recylce fish
            fishArray4[i].x = canvas.width + 115;
        }
        else {
            fishArray4[i].fishDraw4();
        }

        fishArray4[i].x -= 12; // Fish Speed
    }

    //---Eel

    if (frames % 120 === 0 && fishArrayEel.length < 4) {
        fishArrayEel.push(new Fish(470, 650, -5));
    }
    for (var i = 0; i < fishArrayEel.length; i++) {
        if (fishArrayEel[i].x < -115) {
            // recylce fish
            fishArrayEel[i].x = canvas.width + 115;
        }
        else {
            fishArrayEel[i].fishDraw5();
        }

        fishArrayEel[i].x -= 6;             //---Swimming Speed
    }

    //--octopus

    if (frames % 100 === 0 && fishArrayOctopus.length < 2) {
        fishArrayOctopus.push(new Fish(430, 670, -10));
    }
    for (var i = 0; i < fishArrayOctopus.length; i++) {
        if (fishArrayOctopus[i].x < -115) {
            // recylce fish
            fishArrayOctopus[i].x = canvas.width + 115;
        }
        else {
            fishArrayOctopus[i].fishDraw6();
        }

        fishArrayOctopus[i].x -= 8;             //Fish speed
    }
    //-------------------------------------------- repeat Animation

    window.requestAnimationFrame(animate);
}
//------------------------------------------------background music on/off 
//Play background audio
async function playAudio() {
      let bgAudio = document.getElementById("bg_audio");
      bgAudio.play();
  }

//Stop background audio
async function pauseAudio() {
    let bgAudio = document.getElementById("bg_audio");
    bgAudio.pause();
}

//-------------------------------------------Get Mouse clicked Position

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var fishPos = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
    return fishPos;
}

//--------------------------------------- Check if fish is caught
function isCaught(x, y, fish) {
    console.log("Caught coord: "+x+","+y);
    if (x > fish.x && x < (fish.x + 115) && y > fish.y && y < (fish.y + 115)) {    //caught fish determined       
        fishCaughtArray.push(fish.value);

        const reducer = (accumulator, currentValue) => accumulator + currentValue; // total points of caught fish calculated
        totalScore = fishCaughtArray.reduce(reducer);
        displayScore = totalScore;
         return true;
    }
    return false;
}

//--------------------------------- Remove Caught fish from screen,music and pop-up images

function catchFish(x, y) {
    
    fishArray.forEach(fish => {  //------------------- checking for matched co-ord with mouse click
        if(isCaught(x, y, fish)) {
            index = fishArray.findIndex(x => x == fish); //-----------index of caught fish
            fishArray.splice(index, 1); //----------------------removed caught Fish
            ctx.drawImage(pop, (x - 30), (y), 60, 60); //----------- show popping image
            fishCatchSound.play(); //------------play plop sound
        }
        return true;
    })
    fishArray1.forEach(fish1 => {
        if(isCaught(x, y, fish1)) {
            index = fishArray1.findIndex(x => x == fish1);
            fishArray1.splice(index, 1); 
            ctx.drawImage(pop, (x - 30), (y), 60, 60); //----------- show popping image
            fishCatchSound.play();
        }
        return true;
    })

    fishArray2.forEach(fish2 => {
        if(isCaught(x, y, fish2)) {
            index = fishArray2.findIndex(x => x == fish2);
            fishArray2.splice(index, 1);
            ctx.drawImage(pop, (x - 30), (y), 60, 60); //----------- show popping image
            fishCatchSound.play();
        }
        return true;
    })

    fishArray3.forEach(fish3 => {
        if(isCaught(x, y, fish3)) {
            index = fishArray3.findIndex(x => x == fish3);
            fishArray3.splice(index, 1);
            ctx.drawImage(pop, (x - 30), (y), 60, 60); //----------- show popping image
            fishCatchSound.play();
        }
        return true;
    })

    fishArray4.forEach(fish4 => {
        if(isCaught(x, y, fish4)) {
            index = fishArray4.findIndex(x => x == fish4);
            fishArray4.splice(index, 1);
            ctx.drawImage(pop, (x - 30), (y), 60, 60); //----------- show popping image
            fishCatchSound.play();
        }
        return true;
    })

    fishArrayEel.forEach(fish5 => {
  
        if(isCaught(x, y, fish5)) {
            index = fishArrayEel.findIndex(x => x == fish5);
            fishArrayEel.splice(index, 1);
            ctx.drawImage(pop1, (x - 30), (y), 60, 60); //----------- show popping image
            fishCatchSound.play();
        }
        return true;
    })

    fishArrayOctopus.forEach(fish6 => {
   
        if(isCaught(x, y, fish6)) {
            index = fishArrayOctopus.findIndex(x => x == fish6);
            fishArrayOctopus.splice(index, 1);
            ctx.drawImage(pop1, (x - 30), (y), 60, 60); //----------- show popping image
            fishCatchSound.play();
        }
        return true;
    })

}

  //----------------------------------------------------------start screen  
function showCanvas() {
    var gameScreen = document.getElementById("game-div");
    var name = document.getElementById("textbox").value;
    totalScore = 0;
    
    if (name == ""){                    // check name field is blank
        ctxBoat.fillText("Hi Guest", 30, 40);
    } else {
        ctxBoat.fillText("Hi "+name, 30, 40);
    }
    musicOnFlag = true;
    if (gameScreen.style.display == "none" || gameScreen.style.display == "") {
        
      gameScreen.style.display = "block";
      document.getElementById("splash-page").style.display = "none";
      window.setInterval(showTime, 1000);
      playAudio();
    } else {
        gameScreen.style.display = "none";
      document.getElementById("splash-page").style.display = "block";
    }
  }
//-------------------------------------------------------------show Time
 var counter = 60;
   function showTime() {    
    if (counter >=0){
       var time = counter--;
       ctxBoat.clearRect(445, 30, 100, 20);       
       ctxBoat.font = "bold 14px verdana, sans-serif";
       ctxBoat.fillStyle = "#FFF";
       ctxBoat.fillText("Time: " + time, 450, 40);
    }

    else 
        {
            document.getElementById("game-div").style.display = "none";
            document.getElementById("score-page").style.display = "block";
            document.getElementById("score").innerHTML = displayScore;
            pauseAudio();
            showScore();
            counter = 60;
            totalScore = 0;
          }
    
}
//--------------------------------------------------------------last score screen functionalities
function showScore(){

    if (totalScore <= 50){
        document.getElementById("remarks").innerHTML ='You can do better';
        document.getElementById("starimage").innerHTML = "<img src='./images/1-star.png'>";

        }
    if (totalScore > 50 && totalScore <= 100){
        
            document.getElementById("remarks").innerHTML ='Good Job !!!!';
            document.getElementById("starimage").innerHTML = "<img src='./images/2-stars.png'>";
    
        }
    if(totalScore > 100){
        
            document.getElementById("remarks").innerHTML ='Awesome. You are a Pro..';
            document.getElementById("starimage").innerHTML = "<img src='./images/3-stars.png'>";
    
        
    }

    }


       
