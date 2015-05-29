//var today = new Date();

var mafia_app = angular.module('mafia_app', ['ngRoute','LocalStorageModule']);
mafia_app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});


mafia_app.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/main.html'
	})
	.when('/howto', {
		templateUrl: 'partials/howto.html'
	})
	.when('/narrator', {
		templateUrl: 'partials/narrator.html'
	})
	.when('/roles', {
		templateUrl: 'partials/roles.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

mafia_app.factory('MafiaFactory', function($http, localStorageService) {

	var factory = {};

	var players = [];

	factory.getPlayers = function(callback) {
        // Where do we get access to $http?
        $http.get('/players').success(function(output) {
          console.log(output);
          players = output;
          callback(players);
        }) 
      }

    factory.addPlayer = function(info, callback) {
    	$http.post('/players', info).success(function (output) {
    		console.log(info);
    		callback(players);
    	})
    }

    factory.removeCustomer = function(info, callback) {
    	$http.post('/customers/removeCustomer', info).success(function (output) {
    		console.log(info);
    		callback(customers);
    	})
    }

	return factory;
});

// store_app.factory('OrderFactory', function($http) {

// 	var customers = []

// 	var items = [];

// 	var orders = [];

// 	var factory = {};

// 	factory.getItems = function(callback) {
// 		$http.get('/items').success(function (output) {
// 			items = output;
// 			callback(items, output);
// 		})
// 	}

// 	factory.getCustomers = function(callback) {
// 		$http.get('/customers').success(function (output) {
// 			console.log("Customers got");
// 			customers = output;
// 			callback(customers, output);
// 		})
// 	}

// 	factory.getOrders = function(callback) {
// 		$http.get('/orders').success(function (output) {
// 			console.log("Orders got");
// 			orders = output;
// 			callback(orders, output);
// 		})
// 	}

// 	factory.addOrder = function (info, callback) {
// 		$http.post('/orders', info).success(function (output) {
// 			console.log("Added order output: ", output);
// 			callback(orders, output);
// 		})
// 	}

// 	factory.removeOrder = function (info, callback) {
// 		console.log("Sending", info);
// 		$http.post('/orders/removeOrder', info).success(function (output) {
// 			callback(orders, output);
// 		})
// 	}

// 	factory.addItem = function (info, callback) {
// 		$http.post('/items', info).success(function (output) {
// 			console.log("Added item", output);
// 			callback(items, output);
// 		})
// 	}

// 	factory.removeItem = function (info, callback) {
// 		$http.post('/items/remove', info).success(function (output) {
// 			console.log("Removed ", output);
// 			callback(items, output);
// 		})
// 	}
// 	return factory;

// });

mafia_app.controller('MafiaController', function ($scope, MafiaFactory, localStorageService) {


	$scope.roles = [];
	$scope.players = [];
	$scope.newPlayer = {};
	
  


	$scope.getNumber = function(num) {
		console.log("new number is: ", num);
        return new Array(num);   
    };
    $scope.names = {};
    $scope.nameList = [];
    // $scope.showNames = function () {
    // 	return $scope.nameList;
    // };
    $scope.setNames = function () {
    	console.log("Adding names to list.", $scope.names);
    	$scope.nameList = [];
    	for (i in $scope.names) {
    		if ($scope.names[i].length > 0) {
		    	console.log($scope.names[i]," added to game.");
    			$scope.nameList.push($scope.names[i]);
    		}
    	}
    	console.log($scope.nameList, " is the list of players.");
    	$scope.names = [];
    	return $scope.nameList;
    };
    $scope.submitNames = function () {

    };
    // $scope.quantitySet = function(index, quantity) {
    // 	console.log("Ran quantitySet on ", index, " index with ", quantity);
    // 	console.log($scope.roles[index].qty);
    // 	$scope.totalPlayers();
    // 	return $scope.roles[index].qty = quantity;
    // };
    //   $scope.updateRole = function(able, index) {
   //   	console.log(able, " made it through");
   //   	var quantity = able.qty;
   //   	console.log(quantity);
    		// return $scope.quantitySet(index, quantity);
  //   }
    $scope.total;
    $scope.totalPlayers = function () {
    	$scope.total = 0;
    	for (var i in $scope.roles) {
    		$scope.total += $scope.roles[i].qty;
    	}
    	return $scope.total;
    };
  

    var Person = {
    	isAlive: true,
    };
    $scope.setup = "classic";

    //var godfather = new Person;

    $scope.suggestRoles = function (num) {
    	//if ($scope.setup == "classic") {
	    	if (num == 9) {
	    		$scope.statement = "Classic";
	    		return $scope.roles = ["Godfather", "Mafioso", "Mafioso", "Sheriff", "Sheriff", "Doctor", "Townsperson", "Townsperson", "Townsperson"];
	    	} else if (num == 10) {
	    		$scope.statement = "Classic";
	      		return $scope.roles = ["Godfather", "Mafioso", "Mafioso", "Sheriff", "Sheriff", "Doctor", "Doctor", "Townsperson", "Townsperson", "Townsperson"];
	    	} else if (num == 11) {
	    		$scope.statement = "Classic";
	    		return $scope.roles = ["Godfather", "Mafioso", "Mafioso", "Sheriff", "Sheriff", "Doctor", "Doctor", "Townsperson", "Townsperson", "Townsperson", "Townsperson"];
	    	} else if (num == 12) {
	    		$scope.statement = "Classic";
	    		return $scope.roles = ["Godfather", "Mafioso", "Mafioso", "Sheriff", "Sheriff", "Doctor", "Doctor", "Townsperson", "Townsperson", "Townsperson", "Townsperson", "Townsperson"];
	    	} else if (num == 13) {
	    		$scope.statement = "Classic";
	    		return $scope.roles = ["Godfather", "Mafioso", "Mafioso", "Mafioso", "Sheriff", "Sheriff", "Doctor", "Doctor", "Townsperson", "Townsperson", "Townsperson", "Townsperson", "Townsperson"];
	    	} else if (num == 14) {
	    		$scope.statement = "Classic";
	    		return $scope.roles = ["Godfather", "Mafioso", "Mafioso", "Mafioso", "Sheriff", "Sheriff", "Doctor", "Doctor", "Townsperson", "Townsperson", "Townsperson", "Townsperson", "Townsperson", "Townsperson"];
	    	} else if (num == 15) {
	    		$scope.statement = "Classic";
	    		return $scope.roles = ["Godfather", "Mafioso", "Mafioso", "Mafioso", "Sheriff", "Sheriff", "Doctor", "Doctor", "Townsperson", "Townsperson", "Townsperson", "Townsperson", "Townsperson", "Townsperson", "Townsperson"];
	    	} else if (num == 16) {
	    		$scope.statement = "Classic";
	    		return $scope.roles = ["Godfather", "Mafioso", "Mafioso", "Mafioso", "Sheriff", "Sheriff", "Doctor", "Doctor", "Townsperson", "Townsperson", "Townsperson", "Townsperson", "Townsperson", "Townsperson", "Townsperson", "Townsperson"];
	    	} else {
	    		$scope.statement = "Classic";
	    		return $scope.roles = [];
	    	}
	    // } else if ($scope.setup == "custom") {
	    // 	$scope.statement = "Custom";
	    // 	return $scope.roles = [ {title:"Godfather", qty: 1}, {title: "Mafioso", qty: 2}, { title: "Hooker", qty: 1 }, { title: "Escort", qty: 1}, { title: "Sheriff", qty: 2}, { title: "Doctor", qty: 2} , {title: "Townsperson", qty: 4 } , { title:"Serial Killer", qty: 1 } ];
	    // } else {
	    // 	$scope.statement = "Advanced";
	    // }
    };
	// MafiaFactory.getPlayers(function(data) {
 //        $scope.players = data;
 //    });

	// $scope.getPlayers = function (data) {
	// 	MafiaFactory.getPlayers(function (data) {
	// 		$scope.players = data;
	// 	});
	// 	$scope.newPlayer = {};
	// }

	// $scope.addPlayer = function() {
	// 	MafiaFactory.addPlayer($scope.newPlayer, function (players, error){
	// 		MafiaFactory.getPlayers(function (data) {
	// 			console.log(data);
	// 			$scope.players = data;
	// 		});
	// 		$scope.newPlayer = {};			
	// 	});
	// }

});