class Food {
  constructor(){

this.foodStock=0;
    this.lastFed;
    this.image=loadImage('images/Milk.png');
  }

  updateFoodStock(foodStock){
  this.foodStock=foodStock
  }
   getFoodStock() {
     if(this.foodStock>0){
  return this.foodStock;
     }
     else {
       return 0;
     }
   }

  deductFood() {
 if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
   }  
  bedroom(){
    background(bed,550,500);  
}
garden(){
    background(garden,0,0);
    
} 
washroom(){
    background(wc,550,500); 
}
display() {

 var x=80,y=100;      
      imageMode(CENTER);
      image(this.image,220,220,50,50);
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+10;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
   }
   
