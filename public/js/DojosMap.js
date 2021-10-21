var DojosMap = (function() {
	var infos = [];

	var createDojoList = function() {
		var dojos = [];

		$('.dojos li:visible').each(function(index, dojoListItemNode) {
			var dojoAddressNode = $(dojoListItemNode).find('.dojo-address');
			var dojoNameNode = $(dojoListItemNode).find('.dojo-name');

			var mapUrl = $(dojoAddressNode).find('.btn-xsm').attr('href');
			var coordsStart = "?q=";
			var coordsEnd = "&hl=";

			var coordsString = mapUrl.substring(
				// TODO:
				mapUrl.indexOf(coordsStart) + coordsStart.length + 4,
				mapUrl.indexOf(coordsEnd)
			);

			var re =/^([^,]+),(.+)$/;
			var m = coordsString.match(re);
			var coords = null;

			if (m != null) {
				coords = {
					lat: parseFloat(m[1]),
					lng: parseFloat(m[2])
				}
			}

			dojos[dojos.length] = {
				id: dojos.length,
				url: dojoNameNode.find('a').attr('href'),
				name: dojoNameNode.text(),
				address: dojoAddressNode.text(),
				coords: coords
			}
		});

		return dojos;
	};

	var render = function(dojos, mapNode) {
		var lat = 49.832668;
		var lng = 24.011879;

        var map = new google.maps.Map(mapNode, {
          zoom: 12,
		  center: {lat, lng},
          // center: new google.maps.LatLng(lat,lng),
		  mapTypeId: "terrain",
          // mapTypeId: google.maps.MapTypeId.ROADMAP
        });
	 
		for(var i = 0; i < dojos.length; i++) {
			var dojo = dojos[i];

			if (dojo.coords != null) {
				var info = new google.maps.InfoWindow({
					content: getToottipHtml(dojo),
					pixelOffset: new google.maps.Size(0, 0)
				});

				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(dojo.coords.lat, dojo.coords.lng),
					map: map,
					title: dojo.name
				});

				attachMarkerInfoEvent(marker, info);

				infos[infos.length] = info;
			}
		}
	};

	var attachMarkerInfoEvent = function(marker, info) {
		google.maps.event.addListener(marker, 'mouseover', function() {
			closeAllInfos();

			info.open(marker.get('map'), marker);
		});

	  //google.maps.event.addDomListener(window, 'load', initialize);
	};

	var closeAllInfos = function() {
		for (var j = 0 ; j < infos.length; j++) {
			infos[j].close();
		}
	};

	//===================================

	var getToottipHtml = function(dojo) {
		var html = 
		'<div class="infoWindow">' +
			'<p class ="gname">' + 
				'&laquo;' + dojo.name + '&raquo;' +
			'</p>'+

			'<p class="iw_address">' + dojo.address + '</p>' +
			
			'<div class="iw_reestr"><a href="' + dojo.url + '">Опис залу, розклад занять</a></div>' +
		'</div>';

		return html;
	};

	return {
		initialize: function() {
			infos = [];

			render(createDojoList(), document.getElementById('dojos-map'));
		}
	};
})();