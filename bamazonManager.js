var mysql= require('mysql');
var inquirer=require('inquirer');

var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	user:'root',
	password:'root',
	database:'bamazon',
});

connection.connect(function(err){
	if(err){
		return console.log(err);
	}
	prompt();
});

function displayAll(){
	connection.query('SELECT * FROM products',function(err,res){
		for(var i=0;i<res.length;i++){
			console.log(res[i].item_id+" "+res[i].product_name+" : "+res[i].price+" ("+res[i].stock_quantity+" available)");
			console.log("------------------");
		}
		prompt();
	});
	
}

function displayLow(){
	connection.query('SELECT * FROM products WHERE stock_quantity < 5',function(err,res){
		for(var i=0;i<res.length;i++){
			console.log(res[i].item_id+" "+res[i].product_name+" : "+res[i].price+" ("+res[i].stock_quantity+" available)");
		}
		prompt();
	});
}

function addInventory(){
	inquirer.prompt([{
		name:"id",
		message:"Product ID: "		
	},{
		name:"stock",
		message:"New Stock Quantity: "
	}]).then(function(answer){
		var id=parseInt(answer.id);
		var stock=parseInt(answer.stock);
		console.log(id,stock)
		connection.query('UPDATE products SET stock_quantity=+'+stock+' WHERE item_id='+id,function(err,res){
		if(err){
			console.log(err);
		}
		else{
			console.log("Updated successfully");
		}
		prompt();
	});
	});
}

function addProduct(){
	inquirer.prompt([{
		name:"product_name",
		message:"Product Name: "
	},{
		name:"dept_name",
		message:"Department Name: "
	},{
		name:"price",
		message:"Price: "
	},{
		name:"stock_quantity",
		message:"Stock Quantity: "
	}]).then(function(answer){
		var stock=parseInt(answer.stock_quantity);
		connection.query('INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("'+answer.product_name+'","'+answer.dept_name+'",'+answer.price+","+stock+")",function(err,res){
		if(err){
			console.log(err);
		}
		else{
			console.log("Added successfully");
		}
		prompt();
	});
	});
}

function prompt(){
	inquirer.prompt({
		name:"option",
		message:"What would you like to do?",
		choices:[{name:"View products for sale",value:1},
		{name:"View low inventory",value:2},
		{name:"Add to inventory",value:3},
		{name:"Add new product",value:4},
		{name:"Quit",value:5}],
		type:"list"
	}).then(function(answer){
		console.log(answer);
		switch(answer.option){
			case 1:displayAll();
				break;
			case 2:displayLow();
				break;
			case 3:addInventory();
				break;
			case 4:addProduct();
				break;
			case 5:console.log("Goodbye!");
				break;
		}
	})
}

// function check(id,quantity){
// 	quantity=parseInt(quantity);
// 	connection.query("SELECT * FROM products WHERE item_id ="+ id,function(err,res){
// 		if(err){
// 			return console.log(err);
// 		}
// 		console.log(res);
// 		if(res[0].stock_quantity<quantity){
// 			console.log("Insufficient quantity! Available quantity: "+res.quantity+"Try entering the value again");
// 			prompt();
// 		}
// 		else{
// 			//console.log(typeof res.stock_quantity);
// 			total+=quantity*res[0].price;
// 			res[0].stock_quantity-=quantity;
// 			connection.query("UPDATE products SET stock_quantity="+res[0].stock_quantity+" WHERE item_id="+res[0].item_id,function(err,res){
// 				if(err){
// 					return console.log("error");
// 				}
// 				else{
// 					console.log("Total Cost: "+total);
// 					prompt();
// 				}
// 			})
// 		}
// 	})
// }