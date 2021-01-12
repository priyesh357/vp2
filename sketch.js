//Create variables here
var dog 
var happyDog
var database
var foodS
var foodStock
var fedTime,lastFed,feed,addFood,fooObj
function preload(){
  //load images here
  
dog1=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database()
  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  dog=createSprite(250,300,150,150)
  dog.addImage(dog1)
  dog.scale=0.2
  feed=createButton("feed the dog")
  feed.position(700,90)
  feed.mousePressed(feedDog)
  addFood=createButton("add food")
  addFood.position(800,90)
  addFood.mousePressed(addFoods)
  foodObj=new food()
}



function draw() {  
background(46,139,87)
foodObj.display()
fedtime=database.ref('FeedTime')
fedtime.on("value",function(data){
lastFed=data.val();
});
  
  //add styles here
textSize(20)

fill("yellow")
text("food remaning"+foodS,170,200)
text("press up arrow to feed the dog",130,10,300,20)
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed:"+lastFed%12+"PM",350,30)
}else if (lastFed==0){
  text("Last Feed: 12AM",350,30);
}else{
  text("Last Feed:"+lastFed+"AM",350,30);
}
drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updatefoodStock(foodS)
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updatefoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




