var player
var road
var life1
var life2
var life3
var life = 3
var thirst
var water
var coin
var obstacle1
var track
var score = 0
var obstacleGroup
var PLAY = 1
var END = 0
var gameState = PLAY
var crash

function preload(){

    playerImg = loadAnimation("./assets/Runner-1.png","./assets/Runner-2.png");
    roadImg = loadImage("./assets/path.png");
    lifeImg = loadImage("./assets/heart.png");
    waterImg = loadImage("./assets/drink.png");
    coinImg = loadImage("./assets/coin.png");
    obstacleImg = loadImage("./assets/obstacle1.png");
    crash = loadSound("./assets/oof.mp3")
}

function setup(){
   canvas = createCanvas(700, 645);

    track = createSprite(400,150,500,1850)
    track.addImage(roadImg)
    track.scale = 1.5;
    track.velocityY = +4

    player = createSprite(400,500,20,20)
    player.addAnimation("player",playerImg);
    player.scale = 0.08

   obstacleGroup = new Group();

   player.setCollider("rectangle",0,0,100,100)
   player.debug = true
   
}



function draw(){
    background("black")

    text("Score: "+ score, 50,50);
  
    if(gameState === PLAY){
        score = score + Math.round(frameCount/20);
        
        if(track.y > 400){
            track.y = height/2;
        }

        player.x = World.mouseX;
        
       
        
        if(obstacleGroup.isTouching(player)){
            gameState = END
         }
         
        obstacles();
        drawSprites()
    }
   else if(gameState === END){
    track.velocityY = 0
    obstacleGroup.setVelocityYEach(0);
    obstacleGroup.destroyEach();
    textSize(30)
    fill ("red")
    text("Game Over! Your score: "+ score, 140, 320)
   
   }


    
    edges = createEdgeSprites();
    player.collide(edges);
   
   
}

function obstacles(){
    if(frameCount%120===0){
        obstacle1 = createSprite(random(250,400),1,20,20)
        obstacle1.addImage(obstacleImg)
        obstacle1.scale = 0.4
        obstacle1.velocityY = 5
        obstacleGroup.add(obstacle1)
    }
}