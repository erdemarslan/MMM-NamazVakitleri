/*
//-------------------------------------------
MMM-NamazVakitleri
Copyright (C) 2024 - Erdem Arslan
MIT License
//-------------------------------------------
*/
const NodeHelper = require('node_helper');
const { spawn } = require('child_process');

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting node_helper for: " + this.name);
	},

	sunucudanVeriCek: function(location) {
	
    console.log("LocationID: " + location);
    var dataToSend = [];
    
    const python = spawn('sudo python', ['/home/erdemarslan/MagicMirror/modules/MMM-NamazVakitleri/source/main.py', location]);
    
    python.stdout.on('data', (data) => {
      console.log('Python scripti üzerinden veri alındı...');
      console.log(data);
      dataToSend = data.toString();
      console.log(dataToSend);
    });
    
    python.stderr.on('err', (err) => {
      console.log(err)
    });
    
    python.on('close', (code) => {
      console.log("child process close all stdio with code: " + code);
      var sonuc = JSON.parse(dataToSend);
      console.log("Sonuç: " + sonuc)
      if (sonuc['durum'] == 'basarili') {
        console.log(dataToSend);
        this.sendSocketNotification("NAMAZ_VAKTI_SONUC", sonuc["veri"]);
      }
    });
    /*
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
		*/
	},

	socketNotificationReceived: function(notification, payload) {
		
		console.log(this.name + " bir bilgi aldı. Bilgi: " + notification + ". Yük: " + payload);
		if(notification === 'NAMAZ_VAKTI_AL') {
			this.sunucudanVeriCek(payload);
		}
	},
});