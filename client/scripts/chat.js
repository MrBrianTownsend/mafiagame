mafia_app.factory('ChatFactory', function($http, localStorageService) {

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

    factory.removePlayer = function(info, callback) {
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
mafia_app.controller('RouteCtrl', function($scope) {
    $scope.template = {
        "chatroom": "/partials/chatroom.html",
    };
});


mafia_app.controller('ChatController', function ($scope, ChatFactory, localStorageService) {

	$scope.roles = [];
	$scope.players = [];
	$scope.newPlayer = {};
	
	

	// ChatFactory.getPlayers(function(data) {
 //        $scope.players = data;
 //    });

	$scope.getPlayers = function (data) {
		ChatFactory.getPlayers(function (data) {
			$scope.players = data;
		});
		$scope.newPlayer = {};
	}

	$scope.addPlayer = function() {
		ChatFactory.addPlayer($scope.newPlayer, function (players, error){
			ChatFactory.getPlayers(function (data) {
				console.log(data);
				$scope.players = data;
			});
			$scope.newPlayer = {};			
		});
	}

});