var mongoose = require('mongoose');
var Chat = mongoose.model('Chat');


module.exports = (function() {
  return {
	    show: function(req, res) {
			Chat.find({}, function(err, results) {
		    if(err) {
		      console.log(err);
		    } else {
		      res.json(results);
		    }
		  })
		},

		add: function(req, res) {
			var new_Message = new Chat({name: req.body.name, created_at: req.body.created_at});
			new_Message.save(function(err, results) {
				if(err) {
					console.log(err);
				} else {
					res.json(results);
				}
			})
		},

		destroy: function(req, res) {
			Chat.remove({_id: req.body._id}, function(err, results) {
				if (err) {
					console.log("SIX CALLERS AHEAD OF US, JIMMY!");
				} else {
					res.json(results);
				}
			})
		}
	}
})();