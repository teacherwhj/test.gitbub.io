var balloon,db,position;
var bgimg,balloon1img,balloon2img,balloon3img;
var balloonPos;
function preload(){
  bgimg = loadImage("Hot Air Ballon-01.png");
  balloon1img = loadImage("Hot Air Ballon-02.png");
  balloon2img = loadImage("Hot Air Ballon-03.png");
  balloon3img = loadImage("Hot Air Ballon-04.png");
}
function setup() {
  createCanvas(1500,700);
  db = firebase.database();
  balloon = createSprite(150, 350, 150, 150);
  balloon.addImage(balloon1img);
  balloon.scale = 0.5;

  var balloonPos = db.ref('balloon/position');
  balloonPos.on("value",readPosition,showError);

}

function draw() {
  background(bgimg);  

  if(keyDown(LEFT_ARROW)){
    
    updatePosition(-10,0);
    balloon.scale = balloon.scale - 0.001;
    balloon.addImage(balloon3img);
  }
 else if(keyDown(RIGHT_ARROW)){
    
    updatePosition(10,0);
    balloon.scale = balloon.scale + 0.001;
    balloon.addImage(balloon1img);
  }
  else if(keyDown(UP_ARROW)){
    
    updatePosition(0,-10);
    balloon.scale = balloon.scale - 0.001;
    balloon.addImage(balloon2img);
  }
  else if(keyDown(DOWN_ARROW)){
   
    updatePosition(0,10);
    balloon.scale = balloon.scale + 0.001;
    balloon.addImage(balloon1img);
  }

  textSize(20);
  fill("black");
  text("Use arrow keys to move hot air balloon",100,40);
  drawSprites();
}

function readPosition(data){
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
}

function showError(){
  console.log("Error occurred");
}

function updatePosition(x,y){
db.ref('balloon/position').set({
  x : position.x + x,
  y : position.y + y,
 
})
}