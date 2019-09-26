var items = [];
var prices = [];
var amount = [];

function Shop(item, price) {
	var newItem = true;
	for (i = 0; i < items.length; i++) {
		if (item == items[i]) {
			amount[i]++;
			newItem = false;
		}
	}
	if (newItem) {
	items.push(item);
	prices.push(price);
	amount.push(1);
	}
	Update();
}


function Update() {
	var sum = 0;
	for (j = 0; j < items.length; j++) {
		sum+=amount[j]*prices[j];
	}

	var T = document.getElementById('shoptable');
		T.innerHTML = "";
	for (k = 0; k < items.length; k++) {
		T.innerHTML += "<tr><td>" + items[k] + "</td><td>" + prices[k] + "</td><td>" + amount[k] + "</td><td>" +
		"<input type='button' value='remove' onclick='Del(" + k + ")'>" + "</td></tr>";
	}

	document.getElementById('sum').innerHTML = "The sum is €" + sum.toFixed(2);
}

function Del(k) {
	if (amount[k] > 1) {
		amount[k]--;
	}
	else {
	items.splice(k,1);
	prices.splice(k,1);
	amount.splice(k,1);
	}
	Update();
}