/**
 * Depends on jquery, DojosMap
 */
var DojosFilter = (function(){
	var initialize = function() {
		$('#dojo-filter-region').on('change', onChange);
		$('#dojo-filter-schedule').on('change', onChange);
	};

	var onChange = function() {
		var regionNode = $('#dojo-filter-region').find(":selected");
		var scheduleNode = $('#dojo-filter-schedule').find(":selected");

		filter({
			region: { 
				text: regionNode.text(), 
				value: regionNode.val() 
			}, schedule: {
				text: scheduleNode.text(), 
				value: scheduleNode.val(), 
				days: scheduleNode.text().split(',').map(function(value) {
							return value.replace(/ /g, '');
				})
			}
		});

		// TODO: no not initialize, but rerender (ceck memory issues)
		DojosMap.initialize();
	};

	var filter = function(criterion) {
		filterDojosNodes($('.dojos .dojo-details'), criterion);

		var lvivDojosNumber = $('#dojos-lviv li:visible').length;
		var regionDojosNumber = $('#dojos-region li:visible').length;
		var allDojosNumber = regionDojosNumber + lvivDojosNumber;

		updateFilterResult($('#dojo-filter-result'), allDojosNumber);
		updateNotFoundMessage(allDojosNumber, criterion);

		updateMapVisibility($("#dojos-map"), allDojosNumber);

		updateHeadersVisibility($('#dojos-lviv').prev('h1'), lvivDojosNumber);
		updateHeadersVisibility($('#dojos-region').prev('h1'), regionDojosNumber);
		updateHeadersVisibility($("#dojos-map").prev('h1'), allDojosNumber);		
	};

	var filterDojosNodes = function(dojosNodes, criterion) {
		dojosNodes.each(function(index, dojoDetailsNode) {
			var fulfillsCriterion = 
					fulfillsRegionCriterion(dojoDetailsNode, criterion) &&
					fulfillsScheduleCriterion(dojoDetailsNode, criterion);

			updateDojoVisibility(dojoDetailsNode, fulfillsCriterion);
		});
	};

	var fulfillsRegionCriterion = function(dojoDetailsNode, criterion) {
		var nodeText = $(dojoDetailsNode).find(".district").text();
		var criterionText = criterion.region.text;
		var contains = nodeText.indexOf(criterionText) != -1;

		console.log("'" + criterionText + "' : '" + nodeText + "' = " + contains);

		return criterion.region.value == 0 ? true :
				criterion.region.value == 10 ? $(dojoDetailsNode).closest('ol').attr('id').indexOf('lviv') != -1 :
				criterion.region.value == 100 ? $(dojoDetailsNode).closest('ol').attr('id').indexOf('region') != -1 :
				$(dojoDetailsNode).find(".district").text().indexOf(criterion.region.text) != -1;

	};

	var fulfillsScheduleCriterion = function(dojoDetailsNode, criterion) {
		var fulfillsScheduleCriterion = false;

		if (criterion.schedule.value == 0) {
			fulfillsScheduleCriterion = true;
		} else {
			var scheduleNodes = $(dojoDetailsNode).find(".schedule");
			var days = criterion.schedule.days;

			for (var i = 0; i < scheduleNodes.length; i++) {
				var scheduleNodeText = $(scheduleNodes[i]).text();
				var fulfillsScheduleCriterion = true;

				for (var j = 0; j < days.length; j++) {
					fulfillsScheduleCriterion = fulfillsScheduleCriterion && scheduleNodeText.indexOf(days[i]) != -1;
				}

				if (fulfillsScheduleCriterion) {
					break;
				}
			}
		}

		return fulfillsScheduleCriterion;
	};

	var updateDojoVisibility = function(dojoDetailsNode, fulfillsCriterion) {
		var listItemNode = $(dojoDetailsNode).prev('li');

		if (fulfillsCriterion) {
			listItemNode.show();
		} else {
			$(dojoDetailsNode).collapse('hide');
			listItemNode.hide();
		}
	};

	var updateVisibility = function(node, number) {
		if (number == 0) {
			node.hide();	
		} else {
			node.show();
		}
	};

	var updateHeadersVisibility = function(headerNode, dojosNumber) {
		updateVisibility(headerNode, dojosNumber);
	};

	var updateMapVisibility = function(mapNode, dojosNumber) {
		updateVisibility(mapNode, dojosNumber);
	};

	var updateFilterResult = function(filterResultNode, dojosNumber) {
		filterResultNode.text("Знайдено залів: " + dojosNumber);
	};

	var updateNotFoundMessage = function(dojosNumber, criterion) {
		if (dojosNumber == 0) {
			$('#dojo-filter-result-0').show();
			$('#dojo-filter-result-0-region').text(criterion.region.text);
			$('#dojo-filter-result-0-schedule').text(criterion.schedule.text);
		} else {
			$('#dojo-filter-result-0').hide();
		}
	};

	return {
		initialize: initialize
	}
})();