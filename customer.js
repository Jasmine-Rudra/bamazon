var mysql= require('mysql');
var inquirer=require('inquirer');

var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	user:'root',
	password:'root',
	database:'bamazon',
});

var list=[];
var total=0;

connection.connect(function(err){
	if(err){
		return console.log(err);
	}
	displayAll();
});

function displayAll(){
	connection.query('SELECT * FROM products',function(err,res){
		for(var i=0;i<res.length;i++){
			console.log(res[i].item_id+" "+res[i].product_name+" : "+res[i].price);
			console.log("------------------");
			list.push(res[i].item_id);
		}
		prompt();
	});
	
}

function prompt(){
	inquirer.prompt({
		name:"option",
		message:"What would you like to do?",
		choices:[{name:"Purchase a product",value:1},
		{name:"Quit",value:2}],
		type:"list"
	}).then(function(answer){
		if(answer.option==1){
			inquirer.prompt([
			{
				name:"id",
				message:"ID of the product you want to buy:"
			},
			{
				name:"quantity",
				message:"Quantity of the product you want to buy:"
			}
			]).then(function(answer){
				//console.log(answer.id,list.indexOf(parseInt(answer.id)));
				if(isNaN(answer.id)){
					console.log("Enter valid id");
				}
				else if(isNaN(answer.quantity)){
					console.log("Enter a valid quantity number");
				}
				else if(list.indexOf(parseInt(answer.id)) == -1){
					console.log("Product does not exist. Please enter valid product ID");
				}
				else{
					check(answer.id,answer.quantity);
				}

			})
		}
		else{
			console.log("Your total price is: $"+total);
		}
	})
}

function check(id,quantity){
	quantity=parseInt(quantity);
	connection.query("SELECT * FROM products WHERE item_id ="+ id,function(err,res){
		if(err){
			return console.log(err);
		}
		console.log(res);
		if(res[0].stock_quantity<quantity){
			console.log("Insufficient quantity! Available quantity: "+res.quantity+"Try entering the value again");
			prompt();
		}
		else{
			//console.log(typeof res.stock_quantity);
			total+=quantity*res[0].price;
			res[0].stock_quantity-=quantity;
			connection.query("UPDATE products SET stock_quantity="+res[0].stock_quantity+" WHERE item_id="+res[0].item_id,function(err,res){
				if(err){
					return console.log("error");
				}
				else{
					console.log("Total Cost: "+total);
					prompt();
				}
			})
		}
	})
}