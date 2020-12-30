var sword, swordImage, score, fruitsGroup, enemyGroup, fruit1, fruit2, fruit3, fruit4,monsterImage,gameOverImage,monster;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  swordImage = loadImage("sword.png");
  fruit1= loadImage("fruit1.png");
  fruit2= loadImage("fruit2.png");
  fruit3= loadImage("fruit3.png");
  fruit4= loadImage("fruit4.png");
  gameOverImage= loadImage("gameover.png");
  monsterImage= loadAnimation("alien1.png");
}

function setup(){
  createCanvas(600,600);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale= 0.5;
  
  fruitsGroup = new Group();
  enemyGroup = new Group();
  
  score = 0;
  
}

function draw(){
  background("skyblue");
  
  text("Score:"+score,400,30);
  
  if(gameState===PLAY){
    sword.x=mouseX;
    sword.y=mouseY;
    
    fruits();
    Enemy(); 
  }
  
  if(fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
    score= score+2;
  }
  
  if(sword.isTouching(enemyGroup)){
    gameState=END;
  }
  
  
  if(gameState===END){
    sword.addImage(gameOverImage);
    sword.scale= 2;
    sword.x=250;
    sword.y=200;
    fruitsGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitsGroup.velocityX=0;
    enemyGroup.velocityX=0;
  }
  
   drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale= 0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
  if(r===1){
    fruit.addImage(fruit1);
  } else if (r===2){
    fruit.addImage(fruit2);
  } else if (r===3){
    fruit.addImage(fruit3);
  } else if (r===4){
    fruit.addImage(fruit4);
  }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX= -7;
    fruit.setLifetime= 100;
    
    fruitsGroup.add(fruit);
    
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX= -8;
    monster.setLifetime= 50;
    
    enemyGroup.add(monster);
  }
}