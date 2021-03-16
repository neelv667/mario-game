var score = 0;
function preload (){
  marioImage = loadImage("mario.jpg");
  cloudImage = loadImage("cloud.png");
  wallImage = loadImage("wall.png");
  coinImage = loadImage("coin.jpg");
  groundImage = loadImage("ground1.png");
  obs1Image = loadImage("obs1.png");
  obs2Image = loadImage ("obs2.png");
  obs3Image = loadImage ("obs3.png");

}

function setup (){
 createCanvas(700,300);
 mario = createSprite(50,285,20,50);
mario.addImage(marioImage)
mario.scale = 0.1;

 ground = createSprite(110,290,1400,10)
 ground.x = ground.width /2;
 ground.velocityX = -3
 ground.addImage(groundImage)
ground.scale = 1.8;


obstaclesGroup = createGroup();
cloudsGroup = createGroup();
coinsGroup = createGroup();
}

function draw (){
  background("lightblue")
  mario.collide(ground);
  textSize(15);
  text("Score :: "+ score, 500,30)
  if (ground.x < 300){
    ground.x = ground.width/2;
  }
     //jump when the space key is pressed
     if(keyDown("space")) {
      mario.velocityY = -12
  }
//add gravity
mario.velocityY = mario.velocityY + 0.8

if(obstaclesGroup.isTouching(mario)){
  text("gameover",200,200)
  ground.velocityX = 0
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  coinsGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);
   coinsGroup.setVelocityXEach(0);
   obstaclesGroup.destroyEach();
  cloudsGroup .destroyEach();
  coinsGroup .destroyEach();


}
for (var i = 0; i < coinsGroup.length; i++) {
    
  if(coinsGroup.get(i).isTouching(mario)){
  coinsGroup.get(i).remove()
  score =score+1;

  }
}

spawnClouds()

spawnCoin()

spawnObstical()
drawSprites()

}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(700,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.05;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    cloudsGroup.add(cloud);
    
  
    }
}



function spawnCoin() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
     coin = createSprite(700,95,40,10);
    coin.y = Math.round(random(100,130));
    coin.addImage(coinImage);
    coin.scale = 0.05;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 300;
    
    //adjust the depth
    coin.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    coinsGroup.add(coin);
    
  
    }

}

function spawnObstical() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
     obstical = createSprite(700,250,40,10);
    //obstical.y = Math.round(random(100,130));
    //obstical.addImage(obs1Image);
    obstical.scale = 0.09;
    obstical.velocityX = -3;
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstical.addImage(obs1Image);
               break;
       case 2: obstical.addImage(obs2Image);
               break;
       case 3: obstical.addImage(obs3Image);
               break;
      
       default: break;
     }
    
     //assign lifetime to the variable
  obstical.lifetime = 300;
    
    //adjust the depth
    obstical.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    obstaclesGroup.add(obstical);
  
    }
}