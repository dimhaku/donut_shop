function donutShop(shopLocation, minCustomers, maxCustomers, avgDonuts, hoursOpen) {

  this.shopLocation = shopLocation;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgDonuts =  avgDonuts;
  this.hoursOpen = hoursOpen;
  this.totalSales = 0;
  this.shopArray = [];
}

donutShop.prototype.generateRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

donutShop.prototype.calcSales = function() {
  for (var i = 0; i<this.hoursOpen; i++) {
    this.shopArray[i] = Math.ceil(this.generateRandom(this.minCustomers, this.maxCustomers) * this.avgDonuts);
    this.totalSales += this.shopArray[i];
  }
  this.shopArray.push(this.totalSales);
};

donutShop.prototype.renderShop = function(){
  var rowNode = document.createElement('tr');
  rowNode.id = this.shopLocation;
  rowNode.innerHTML = '<th>' + this.shopLocation + '</th>';

  for (var i = 0; i < this.shopArray.length; i++) {
    var elNode = document.createElement('td');
    var elText = document.createTextNode(this.shopArray[i]);
    elNode.appendChild(elText);
    rowNode.appendChild(elNode);
  }

  var table = document.getElementById('one');
  table.appendChild(rowNode);
};

donutShop.prototype.start = function(){
  this.calcSales();
  this.renderShop();
};

var hoursOpen = 11;
var shopArray = [];

shopArray.push(downtown = new donutShop("Downtown", 8, 43, 4.5, hoursOpen));
shopArray.push(capHill = new donutShop("Capitol Hill", 4, 37, 2, hoursOpen));
shopArray.push(southLake = new donutShop("South Lake Union", 9, 23, 6.33, hoursOpen));
shopArray.push(wedgewood = new donutShop("Wedgewood", 2, 28, 1.25, hoursOpen));
shopArray.push(ballard = new donutShop("Ballard", 8, 58, 3.75, hoursOpen));

downtown.start();
capHill.start();
southLake.start();
wedgewood.start();
ballard.start();

var ifTrue = 0;
var indexLocation = 0;
var checkStores = function(shopName){
  ifTrue = 0;
  var indexLocation = 0;
  for (var i = 0; i < shopArray.length; i++){
    if (shopArray[i].shopLocation == shopName){
      ifTrue = ifTrue + 1;
      indexLocation = i;
    }
  }
return ifTrue;
};

var theForm = document.getElementById('shopForm');
var handleShopFormSubmit = function(){
  event.preventDefault();
  var shopName = event.target.shopName.value;
  var newShop = new donutShop(shopName, event.target.minCustomers.value, event.target.maxCustomers.value, event.target.avgDonuts.value, hoursOpen);

  if (checkStores(shopName)) {
    newShop.calcSales();
    shopArray[indexLocation] = newShop;
    var replacementNodes = document.getElementById(shopName).childNodes;
    for (var i=0; i < newShop.salesArray.length; i++){
      replacementNodes[i+1].innerHTML = newShop.salesArray[i];
    }
  } else {
    shopArray.push(newShop);
    newShop.start();
    console.log(shopArray);
  }
}

theForm.addEventListener('submit', handleShopFormSubmit);
