	var entries;
	function getAgencies() {

		$.getJSON("Agencies.json", function(agenciesJson) {

			agencies = agenciesJson;
			console.log(agencies);

			// zipCodeGeometries.forEach(function(zipCodeGeometry) {

			//     areas.forEach(function(area) {

			// 		if(area["ZipCode"] == zipCodeGeometry["properties"]["ZIP"]) {
			// 			addGeometryToMapForArea(area, zipCodeGeometry);
			// 		}
			// 	});
			// });
		});

		// agencies = []
		// $.get("Agencies.csv", function (data) {
	 //        var csvdata = Papa.parse(data, {header:true,dynamicTyping:true});
	 //        entries = csvdata["data"]
	 //        entries.forEach(function(entry) {

	 //        	if(isZipCodeOfInterest(entry["ZipCode"])) {

		//         	if(!agencyExists([entry["Agency"]])) {

		//         		var agency = {};
		//         		copyKeysFromEntryToAgency(entry,agency);
		//         		agency["FocusAreas"] = getFocusAreasForAgency(agency);
		//         		agency["Services"] = getServices(agency);

		// 				latLons.forEach(function(latlon) {
		// 					let latLonAddress = latlon["Full Address"]
		// 					if (entry["Full Address"] == latLonAddress) {
		// 						agency["Lat"] = latlon["Lat"];
		// 						agency["Lon"] = latlon["Lon"];
 	// 						}
		// 				});

		//         		agencies.push(agency);
		//         	}

		//         }

	 //        })

	        //done
	        console.log(agencies);

	    // });

	}

	var latLons;
	function getLatLon() {
		$.get("LatLon.csv", function (data) {
	        var csvdata = Papa.parse(data, {header:true,dynamicTyping:true});
	        latLons = csvdata["data"]
	        getAgencies();
	    });
	}

	function isZipCodeOfInterest(zipCode) {
		let ofInterest = false;
		areas.forEach(function(area) {
			if(area["ZipCode"] == zipCode) {
				ofInterest = true
			}
		});
		return ofInterest;
	}

	function getFocusAreasForAgency(agencyToFind) {

		var focusAreas = []

		entries.forEach(function(entry) {
			
			if(entry["Agency"] == agencyToFind["Agency"]) {

				focusAreas.push(entry["FocusArea"]);
			}

		});

		return focusAreas.getUnique()
	}

	function getServices(agency) {

		var services = []

		entries.forEach(function(entry) {
			
			if(entry["Agency"] == agency["Agency"]) {

				services.push(entry["Service"]);
			}

		});

		return services
	}

	function copyKeysFromEntryToAgency(entry,agency) {
		keys = ["Agency", "ZipCode", "County", "Address", "City"];
		keys.forEach(function(key) {
			agency[key] = entry[key];
		});
	}

	function agencyExists(agencyToFind) {
		var exists = false
		agencies.forEach(function(agency) {
			if (agency["Agency"] == agencyToFind) {
				exists = true;
			} 
		});
		return exists;
	}