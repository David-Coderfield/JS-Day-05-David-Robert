
function ItemConstructor(id, name, price, image) {
	this.id = id;
	this.name = name;
	this.price = price;
	this.image = '<img src="' + image + '" class="itempic">';
	this.amount = 0;
}

var item0 = new ItemConstructor(0, 'Basic Item Numero Zorro', 0.01, 'https://via.placeholder.com/200x200.png?text=Item0');
var item1 = new ItemConstructor(1, 'Fancy Item Numero Uno', 9.90, 'https://via.placeholder.com/200x200.png?text=Item1');
var item2 = new ItemConstructor(2, 'Super Fancy Item Numero Duo', 19.90, 'https://via.placeholder.com/200x200.png?text=Item2');
var item3 = new ItemConstructor(3, 'Mega Fancy Item Numero Tres', 29.90, 'https://via.placeholder.com/200x200.png?text=Item3');
var item4 = new ItemConstructor(4, 'Ultra Fancy Item Numero Quattro', 39.90, 'https://via.placeholder.com/200x200.png?text=Item4');
var item5 = new ItemConstructor(5, 'Superduper Fancy Item Numero ', 49.90, 'https://via.placeholder.com/200x200.png?text=Item5');

var items = [item0, item1, item2, item3, item4, item5];

// CREATE NEW DIV AND CONTENT FOR EACH ITEM
function divCreator(item) {
	var newDiv = document.createElement("div");
	newDiv.innerHTML = eval(item).image + "<p>" + eval(item).name + "</p><p>€" + eval(item).price + "</p> <input type='button' value='Add to Cart' class='btn'>"
	newDiv.className = "item";
	document.getElementById("product-wrapper").appendChild(newDiv);
	}

// CALL divCreator and add an Event listener to each button
function inventory(array) {
	for (let i=0; i<array.length; i++) {
		divCreator(array[i]);
	}
	var buttons = document.getElementsByClassName('btn');
	for (let i=0;i<buttons.length;i++) {
		buttons[i].addEventListener('click', function() {
												addToCart(i);
													})}
}
inventory(items);



//SHOPPING CARD STUFF
var cart = [];

function addToCart(i) {
	var newItem = true;
	for (let j = 0; j < cart.length; j++) {
		if (i == cart[j].id) {
			cart[j].amount++;
			newItem = false;
		}
	}
	if (newItem) {
	cart.push(items[i]);
	cart[cart.length-1].amount++;
	}
	console.log(cart);
	Update();
}

function Update() {
	sum = 0;
	for (let j = 0; j < cart.length; j++) {
		sum+=cart[j].amount*cart[j].price;
	}

	var T = document.getElementById('shoptable');
		T.innerHTML = "";
	for (let k = 0; k < cart.length; k++) {
		T.innerHTML += "<tr><td>" + cart[k].name + "</td><td>" + cart[k].price + 
		"</td><td>" +
		"<input type='number' value='" + cart[k].amount + "' onchange='changeAmnt(" + 
		k +", this.value" + ")'>"
		+ "</td><td>" +
		"<input type='button' value='remove' onclick='Del(" + k + ")'>" + "</td></tr>";
	}


	function shippingCost() {
		var x;
		if (sum > 80) {
			x = 6;
		} else {
			x = 9;
		}
		return(x);
	}

	var shipping = shippingCost();
	
	var tax = sum * 0.22;
	sum += tax;
	sum += shipping;

	function discount() {
		var y;
		if(sum < 40) {
			y = 0;
		} else if (sum < 100) {
			y = sum*0.07;
		} else {
			y = sum*0.12;
		}
		return(y)
	}

	disc = discount();
	
	sum -= disc;
	
	document.getElementById('shipping').innerHTML = "Shipping Costs: " + shipping + "€";
	document.getElementById('tax').innerHTML = "Tax (22%): " + tax.toFixed(2) + "€";
	document.getElementById('disc').innerHTML = "Discount: -" + disc.toFixed(2) + "€";
	document.getElementById('sum').innerHTML = "<b>Total Cost: " + sum.toFixed(2) + "€</b>";
}

function Del(k) {
	cart[k].amount = 0;
	cart.splice(k,1);
	Update();
}

function changeAmnt(k, n) {
	cart[k].amount = n;
	if (cart[k].amount <= 0) {
		cart[k].amount = 0;
		cart.splice(k,1);		
	}
	Update();
}

//SHOW & HIDE THE SHOPPING CART
var hidden = true;
function showCart() {
	if(hidden){
		document.getElementById('link').innerHTML = 'Hide Cart';
		document.getElementById('shoppingCart').style.display = 'flex';
		document.getElementById('product-wrapper').style.width = '62%';
		hidden = false;
	} else {
		document.getElementById('link').innerHTML = 'Show Cart';
		document.getElementById('shoppingCart').style.display = 'none';
		document.getElementById('product-wrapper').style.width = '100%';
		hidden = true;
	}
}