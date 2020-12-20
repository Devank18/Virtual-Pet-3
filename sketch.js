var dog, happyDog, database, foodS, foodStock,bg , FeedDog , FeedDog,bed,wc,garden;
var fedTime, lastFed ;
var foodObj;
var dogImage;
var gst,gsread;

function preload(){
  dogImage=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
  bg=loadImage("images/room.jpg");
  bed = loadImage("pics/Bed Room.png")
  wc = loadImage("pics/Wash Room.png")
  garden = loadImage("pics/Garden.png");
}

function setup(){
  database=firebase.database();
	createCanvas(1000, 500);
  
	foodObj=new Food();
   fill("blue");
	
  FeedDog=createButton("FeedDog");
  FeedDog.position(1200,50);
  
   AddMilk=createButton("AddMilk");
  AddMilk.position(1200,95);

  gsread=database.ref('gameState');
  gsread.on("value",function (data){

gameState=data.val();

  });
  dog=createSprite(750,400,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;
}
function draw(){  
background(bg);
	
foodS=foodObj.getFoodStock();
AddMilk.mousePressed(()=>{
foodS++;
database.ref('/').update({
Food:foodS
  })
    
});
FeedDog.mousePressed(()=>{
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })  

});

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
currentTime=hour()
              if(currentTime==(lastFed+1)){
                        update("playing");
                        foodObj.garden();
                        
            }else if(currentTime==(lastFed+2)){
                          update("sleeping");
                          foodObj.bedroom();
            }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
                          update("bathing");
                          foodObj.washroom();
            }else{
                          update("hungry")
                          foodObj.display();
                 }
   fill("black");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 200,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 200,30);
   }
 if(gameState!=="hungry"){
   FeedDog.hide();
   AddMilk.hide();
   dog.visible=false ;
 }
else{
  FeedDog.show();
  AddMilk.show();
  dog.addImage(dogImage);
 }
foodStock=database.ref('Food');
foodStock.on("value",readStock);
	
  drawSprites();
  fill("red");
  stroke("red");
  strokeWeight(1);
  text("FOOD LEFT : "+ foodStock , 230,175);
 

}

function readStock(data){
  foodStock=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
 if(x<=0){
   x=0
 }else{
   x-=0.25;
 }

	database.ref('/').update({
    Food:x
  }) 
}

function update(state) {
  database.ref('/').update({
    gameState:state
  });
}


