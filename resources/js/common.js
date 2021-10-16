var ImageTransition = (function() {
	var image;
	var interval = 5000;
	var counter = 0;
	var transitionTime = 500;

	var initialize = function() {
		image = $('.image-transit');

		if (image.length > 0) {
			tratsitImage();
		}

		jQuery.validator.addMethod("phone", 
			function (phone_number, element) {
        		phone_number = phone_number.replace(/\s+/g, "");
        		phone_number = phone_number.replace(/\(+/g, "");
        		phone_number = phone_number.replace(/\)+/g, "");
        		phone_number = phone_number.replace(/\-+/g, "");

        		return this.optional(element) || phone_number.length > 9 &&
              phone_number.match(/^\(?[\d\s]{3}[\d\s]{3}[\d\s]{4}$/);
    		}, "Invalid phone number");
	};

	var tratsitImage = function() {
		 $(image[counter]).fadeOut(transitionTime, function() {
		 	$(image[counter]).css("display", "none");
		 	counter = ++counter % 6;
		 	$(image[counter]).fadeIn(transitionTime, function() {
		 		setTimeout(tratsitImage, interval);
		 	});
		 });

	}

	return {
		initialize: initialize
	}
})();


var CustomerValidator = (function() {
	var initialize = function() {
		$(document).ready(function(){
			$("#customer-data").validate({
				rules: {
					'customer-name': {
						required: true
					},
					'customer-phone': {
						required: true,
						phone: true
					},
					agree: {
    					required: true
    				}
				},
				messages: {
					'customer-name': {
						required: "Будь ласка введіть Ваше ім'я"
					},
					'customer-phone': "Будь ласка введіть Ваш телефон",
					agree: 'Будь ласка дайте згоду на обробку Ваших персональних даних'
				}
				// submitHandler: submitForm 
			});  
		});
		/* validation */
	}
	return {
		initialize: initialize
	}
})();


var Initializer = (function (){
	var initializationAttempts = 0;

	var initialize = function() {
		initializationAttempts++;

		if (initializationAttempts < 100) {
			if (typeof $ == "undefined") {
				setTimeout(initialize, 1000);
			} else {
				if (typeof Shedule != "undefined") {
					Shedule.initialize();
				}
				
				if (typeof LoginDialog != "undefined") {
					LoginDialog.initialize();
				}

				if (typeof EditCustomerDialog != "undefined") {
					EditCustomerDialog.initialize();
				}

				if (typeof DistrictInfo != "undefined") {
					DistrictInfo.initialize();
				}

				if (typeof ImageTransition != "undefined") {
					ImageTransition.initialize();
				}
				if (typeof CustomerValidator != "undefined") {
					CustomerValidator.initialize();
				}

			}	
		}
	};

	return {
		initialize: initialize
	}
})();

Initializer.initialize();
