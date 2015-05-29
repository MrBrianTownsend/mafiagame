var mongoose = require('mongoose');
var Mafia = mongoose.model('Mafia');
// this is our Customers.js file located at /server/controllers/Customers.js
// note the immediate function and the object that is returned
module.exports = (function() {
  return {
	    show: function(req, res) {
			Mafia.find({}, function(err, results) {
		    if(err) {
		      console.log(err);
		    } else {
		      res.json(results);
		    }
		  })
		},

		add: function(req, res) {
			var new_player = new Mafia({name: req.body.name, created_at: req.body.created_at});
			new_player.save(function(err, results) {
				if(err) {
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},

		destroy: function(req, res) {
			Mafia.remove({_id: req.body._id}, function(err, results) {
				if (err) {
					console.log("SIX CALLERS AHEAD OF US, JIMMY!");
				} else {
					res.json(results);
				}
			})
		}
	}
})();