/*
//-------------------------------------------
MMM-NamazVakitleri
version: 0.1.0
Copyright (C) 2020 - Erdem Arslan
MIT License
//-------------------------------------------
*/
Module.register('MMM-NamazVakitleri', {
	// Default module config
	// Varsayılan Değerler
	defaults: {
		locationId: 9351, // 9351 - Çan ; 9349 - Biga
		updateInterval: 60 * 60 * 1000, // 1 Hour - 1 Saat
		header: 'ÇANAKKALE-ÇAN İÇİN NAMAZ VAKİTLERİ',
		maxWidth: "300px",			// Max width wrapper
	},
	
	requiresVersion: "2.1.0",

	// Define stylesheet
	getStyles: function () {
		return ["MMM-NamazVakitleri.css"];
	},
	// Get translations
	// Dil Dosyalarını ekle
	getTranslations: function () {
		return {
			en: "translations/en.json",
			tr: "translations/tr.json",
		};
	},
	

	// Modülü başlat
	// Start Module
	start: function() {
		Log.info("Starting module: " + this.name);

		this.location = this.config.locationId;
		Log.log(this.location);
		this.NV = [];
		this.calistir();
	},

	getHeader: function() {
		if(!this.loaded) {
			return this.data.header;
		} else {
			var bilgi = this.NV;
			return bilgi["yer_adi"] + " İÇİN NAMAZ VAKİTLERİ";
		}
	},

	// Dom üzerine yaz. Buranın döneceği değer ekranda yazar...
	// Override Dom Genarator
	getDom: function() {

		var wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		wrapper.style.maxWidth = this.config.maxWidth;

		// veriler hala yüklenmemişse yükleniyor yazısı göster...
		if(!this.loaded) {
			wrapper.innerHTML = this.translate("YUKLENIYOR");
			wrapper.classList.add("bright", "light", "small");
            return wrapper;
		}

		// creating the table
		var table = document.createElement("table");
		//table.className = "small";

		var vakitler = this.NV;

		// Hicri Tarih
		var hicriRow = document.createElement("tr");
		hicriRow.className = "hicri-row";
		
		var hicriTextCell = document.createElement("td");
		hicriTextCell.setAttribute("colspan", "2");
		hicriTextCell.className = "hicri-text bright small";
		hicriTextCell.innerHTML = vakitler["vakit"]["hicri_uzun"];
		hicriRow.appendChild(hicriTextCell);
		
		table.appendChild(hicriRow);

		var vakitIsimleri = {
			'imsak' : 'IMSAK',
			'gunes' : 'GUNES',
			'ogle'	: 'OGLE',
			'ikindi': 'IKINDI',
			'aksam'	: 'AKSAM',
			'yatsi' : 'YATSI'
		};

		var hangiVakit = this.hangiVakitteyiz();

		for(let key in vakitIsimleri) {
			let row = document.createElement("tr");
			row.className = key == hangiVakit ? key + "-row vakit" : key + "-row";

			let textCell = document.createElement("td");
			textCell.className = key + "-text small";
			textCell.innerHTML = this.translate(vakitIsimleri[key]);
			row.appendChild(textCell);

			let timeCell = document.createElement("td");
			timeCell.className = key + "-time bright small";
			timeCell.innerHTML = vakitler["vakit"][key];
			row.appendChild(timeCell);

			table.appendChild(row);
		}

		return table;
	},

	hangiVakitteyiz: function() {
		let vakitler = this.NV;

		let	imsak_val	= vakitler["vakit"]["imsak"].split(":"),
			gunes_val	= vakitler["vakit"]["gunes"].split(":"),
			ogle_val	= vakitler["vakit"]["ogle"].split(":"),
			ikindi_val	= vakitler["vakit"]["ikindi"].split(":"),
			aksam_val	= vakitler["vakit"]["aksam"].split(":"),
			yatsi_val	= vakitler["vakit"]["yatsi"].split(":");

		let simdi = new Date(), simdiInt = simdi.valueOf();

		let	imsak	= new Date(simdi.getFullYear(),simdi.getMonth(),simdi.getDate(),imsak_val[0],imsak_val[1],0,0).valueOf(),
			gunes	= new Date(simdi.getFullYear(),simdi.getMonth(),simdi.getDate(),gunes_val[0],gunes_val[1],0,0).valueOf(),
			ogle	= new Date(simdi.getFullYear(),simdi.getMonth(),simdi.getDate(),ogle_val[0],ogle_val[1],0,0).valueOf(),
			ikindi	= new Date(simdi.getFullYear(),simdi.getMonth(),simdi.getDate(),ikindi_val[0],ikindi_val[1],0,0).valueOf(),
			aksam	= new Date(simdi.getFullYear(),simdi.getMonth(),simdi.getDate(),aksam_val[0],aksam_val[1],0,0).valueOf(),
			yatsi	= new Date(simdi.getFullYear(),simdi.getMonth(),simdi.getDate(),yatsi_val[0],yatsi_val[1],0,0).valueOf();

		let simdikiVakit = '';

		if(simdiInt > imsak && simdiInt <= gunes)
		{
			simdikiVakit = "imsak";
		}
		else if(simdiInt > gunes && simdiInt <= ogle)
		{
			simdikiVakit = "gunes";
		}
		else if(simdiInt > ogle && simdiInt <= ikindi)
		{
			simdikiVakit = "ogle";
		}
		else if(simdiInt > ikindi && simdiInt <= aksam)
		{
			simdikiVakit = "ikindi";
		}
		else if(simdiInt > aksam && simdiInt <= yatsi)
		{
			simdikiVakit = "aksam";
		}
		else
		{
			simdikiVakit = yatsi;
		}

		return simdikiVakit;
	},

	calistir: function() {
		setInterval(() => {
			this.namazVakitleriniAl();
		}, this.config.updateInterval);
		this.namazVakitleriniAl();
		//var self = this;
	},

	namazVaktiVerileriniIsle: function(data) {
		console.log(data);
		this.NV = data;
		this.loaded = true;
	},

	namazVakitleriniAl: function() {
		this.sendSocketNotification('NAMAZ_VAKTI_AL', this.location);
	},

	socketNotificationReceived: function (notification, payload) {
		Log.log(this.name + " bir bilgi aldı. Bilgi: " + notification + ". Yük: " + payload);
		if(notification === "NAMAZ_VAKTI_SONUC") {
			this.namazVaktiVerileriniIsle(payload);
		}
		this.updateDom();
	}

});