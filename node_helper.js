/*
//-------------------------------------------
MMM-NamazVakitleri
Copyright (C) 2020 - Erdem Arslan
MIT License
//-------------------------------------------
*/
const NodeHelper = require('node_helper');
const request = require('request');

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting node_helper for: " + this.name);
	},

	sunucudanVeriCek: function(url) {
		request({
			url: url,
			method: 'GET'}, (error, response, body) => {
				if(!error && response.statusCode == 200) {
					// gelen veriler...
					//console.log(response);
					//console.log(body);
					var sonuc = JSON.parse(body);
					if(sonuc["durum"] == "basarili") {
						console.log(sonuc["mesaj"]);
						this.sendSocketNotification("NAMAZ_VAKTI_SONUC", sonuc["veri"]);
					}
				}
			}
		);
	},

	socketNotificationReceived: function(notification, payload) {
		
		console.log(this.name + " bir bilgi aldı. Bilgi: " + notification + ". Yük: " + payload);
		if(notification === 'NAMAZ_VAKTI_AL') {
			this.sunucudanVeriCek(payload);
		}
	},
});