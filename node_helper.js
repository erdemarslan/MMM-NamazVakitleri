/*
//-------------------------------------------
MMM-NamazVakitleri
Copyright (C) 2024 - Erdem Arslan
MIT License
//-------------------------------------------
*/
const NodeHelper = require('node_helper');
const {PythonShell} = require('python-shell')

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting node_helper for: " + this.name);
	},

	sunucudanVeriCek: function(location) {
	
    const self = this;
	
    //console.log("LocationID: " + location);
    
    let script = 'modules/' + this.name + '/source/main.py'
    
    //console.log(script);
    
    const python = new PythonShell(script, {mode: 'text', args: [location]})
    
    python.on('message', function(message) {
      //console.log(message);
      var sonuc = JSON.parse(message.toString());
      if (sonuc['durum'] == 'basarili') {
        console.log("[" + self.name + "] " + 'veri başarıyla alındı ve işlendi...');
        self.sendSocketNotification("NAMAZ_VAKTI_SONUC", sonuc["veri"]);
      }
    });
    
    python.end(function (err,code,signal) {
      if (err) throw err;
      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
      console.log("[" + self.name + "] " + 'finished running...');
    });
	},

	socketNotificationReceived: function(notification, payload) {
		
		console.log(this.name + " bir bilgi aldı. Bilgi: " + notification + ". Yük: " + payload);
		if(notification === 'NAMAZ_VAKTI_AL') {
			this.sunucudanVeriCek(payload);
		}
	},
});