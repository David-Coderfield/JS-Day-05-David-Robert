//CREATE OBJECT UPON PASSED PARAMETERS
function ItemConstructor(id, name, price, image) {
	this.id = id;
	this.name = name;
	this.price = price;
	this.image = '<img src="' + image + '" class="itempic">';
	this.amount = 0;
}

//USUALLY GET THESE FROM BACKEND
var item0 = new ItemConstructor(0, 'Basic Item Numero Zorro', 0.00, 'https://via.placeholder.com/200x200.png?text=Item0');
var item1 = new ItemConstructor(1, 'Fancy Item Numero Uno', 9.90, 'https://via.placeholder.com/200x200.png?text=Item1');
var item2 = new ItemConstructor(2, 'Super Fancy Item Numero Duo', 19.90, 'https://via.placeholder.com/200x200.png?text=Item2');
var item3 = new ItemConstructor(3, 'Mega Fancy Item Numero Tres', 29.90, 'https://via.placeholder.com/200x200.png?text=Item3');
var item4 = new ItemConstructor(4, 'Ultra Fancy Item Numero Quattro', 39.90, 'https://via.placeholder.com/200x200.png?text=Item4');
var item5 = new ItemConstructor(5, 'High Five Machine', 49.90, 'https://via.placeholder.com/200x200.png?text=Item5');
var item6 = new ItemConstructor(6, 'Sexy Item', 59.90, 'https://via.placeholder.com/200x200.png?text=Item6');
var item7 = new ItemConstructor(7, 'Lucky Number "you want this"', 70, 'https://via.placeholder.com/200x200.png?text=Item7');
var item8 = new ItemConstructor(8, "2 l8 good n8 don't f8", 80, 'https://via.placeholder.com/200x200.png?text=Item8');
var item9 = new ItemConstructor(9, 'Buy this when September ends', 90, 'https://via.placeholder.com/200x200.png?text=Item9');
var item10 = new ItemConstructor(10, "NOW THAT'S AN ITEM", 1000, 'https://via.placeholder.com/200x200.png?text=Item10');

//PUT THEM IN AN ARRAY
var items = [item0, item1, item2, item3, item4, item5, item6, item7, item8, item9, item10];

// CREATE NEW DIV AND CONTENT FOR EACH ITEM
function divCreator(item) {
	var newDiv = document.createElement("div");
	newDiv.innerHTML = eval(item).image + "<p>" + eval(item).name + "</p><p>" + eval(item).price + "€</p> <input type='button' value='Add to Cart' class='btn'>"
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

//WHEN USER CLICKS A BUTTON: CHECK IF ITEM IS ALREADY IN CART. ELSE: PUSH IT
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

//UPDATE CART IN HTML TABLE
function Update() {
	var T = document.getElementById('shoptable');
		T.innerHTML = "";
	for (let k = 0; k < cart.length; k++) {
		T.innerHTML += "<tr><td>" + cart[k].name + "</td><td>" + cart[k].price + 
		"€</td><td>" +
		"<input type='number' value='" + cart[k].amount + "' onchange='changeAmnt(" + 
		k +", this.value" + ")'>"
		+ "</td><td>" +
		"<input type='button' value='remove' onclick='Del(" + k + ")'>" + "</td></tr>";
	}

	//RAW SUM OF ALL PRODUCTS (prices*amounts)
	$rawSum = 0;
	for (let j = 0; j < cart.length; j++) {
		$rawSum+=cart[j].amount*cart[j].price;
	}

	var $totalSum = $rawSum;

	//@ #Dennis & All: Pls checkout "ternary operators" for the next part. It's much simpler than if-statements ;)
	var shipping = ($rawSum < 80) ? 9 : 6;
	var tax = $rawSum * 0.22;
	$totalSum+=shipping+tax;

	var discount = ($totalSum >= 100) ? $totalSum*0.12 : ($totalSum >= 40) ? $totalSum*0.07 : 0;

	$totalSum-=discount;
	
	document.getElementById('rawsum').innerHTML = "Raw sum: " + $rawSum.toFixed(2) + "€";
	document.getElementById('tax').innerHTML = "With tax (22%): " + ($rawSum+tax).toFixed(2) + "€ (+" + tax.toFixed(2) + "€)" ;
	document.getElementById('shipping').innerHTML = "Shipping: " + shipping + "€";
	document.getElementById('disc').innerHTML = (discount > 0) ? "Discount: -" + discount.toFixed(2) + "€" : "";
	document.getElementById('sum').innerHTML = "<b>Total Amount: " + $totalSum.toFixed(2) + "€</b>";
}

//GET RID OF ITEM
function Del(k) {
	cart[k].amount = 0;
	cart.splice(k,1);
	Update();
}

//IF USER USES NUMBER INPUT FIELD
function changeAmnt(k, n) {
	cart[k].amount = n;
	if (cart[k].amount <= 0) {
		cart[k].amount = 0;
		cart.splice(k,1);		
	}
	Update();
}

//SHOW & HIDE THE SHOPPING CART
var hidden = true; //global var to show status of hiding
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