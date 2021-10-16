var LoginDialog = (function () {
	var initialize = function () {
		// If 'Access denied' then redirect to root // show login dialog
		if ($('body').text().indexOf('Access denied') !== -1) {
			// $("#login-dialog").modal("show");
			location.replace('/');
		}

		// showUserMenu();

		$("#login-form").validate({
			rules: {
				password: {
					required: true,
				},
				user_email: {
					required: true,
					email: true
				},
			},
			messages: {
				password: {
					required: "Будь ласка введіть пароль"
				},
				user_email: "Будь ласка введіть адресу своєї електронної пошти",
			},
			submitHandler: submitForm
		});
		/* validation */
		/*
				$("#logout-btn").on("click", function (event) {
					event.preventDefault();
		
					$.ajax({
						type: 'POST',
						url: '/content-static/user/logout.php',
						success: function (response) {
							if (response == "ok") {
								Cookies.set("userId", 0);
								Cookies.set("userName", "");
								Cookies.set("userRoles", "");
								Cookies.remove("userId");
								Cookies.remove("userName");
								Cookies.remove("userRoles");
		
		
								if (location.pathname.indexOf("/school/") !== -1 ||
									location.pathname.indexOf("/user/") !== -1) {
		
									location.replace('/');
								} else {
									hideUserMenu();
								}
							}
						}
					});
				})*/
	};

	function submitForm() {
		$("#login-form").submit();
	}

	/* login submit */
	function submitFormAjax() {
		var data = $("#login-form").serialize();

		$("#btn-login").html('<img src="btn-ajax-loader.gif" /> &nbsp; Signing In ...');

		$.ajax({
			type: 'POST',
			url: '/user/login',
			data: data,

			beforeSend: function () {
				$("#error").fadeOut();
				$("#btn-login").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; Перевірка користувача ...');
			},

			success: function (response, status, xhr) {
				// TODO: Do it nicely.
				// if (location.pathname.indexOf("school") !== -1) {
				// 	location.reload();
				// }

				if ($('body').text().indexOf('Access denied') !== -1) {
					location.reload();
				}

				$("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Увійти');

				if (response.indexOf("ok") !== -1) {
					///if (response.indexOf("ok") == 0) {

					// $("#error").html('');
					// setTimeout(' window.location.href = "home.php"; ',4000);
					var index = response.lastIndexOf(",");

					showUserMenu({
						userName: response.substring(index + 1, response.length),
						userRoles: response.substring(3, index)
					});

					$("#login-dialog").modal("hide");
				} else {
					$("#error").fadeIn(1000, function () {
						$("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; ' + response + ' !</div>');
					});
				}
			}
		});

		return false;
	}


	function checkRole(roleToCheck, userRoles) {
		/// console.log("roleToCheck: " + roleToCheck);
		/// console.log("userRoles: " + userRoles);
		/// console.log("userRoles.length: " + userRoles.length);

		for (var i = 0; i < userRoles.length; i++) {
			/// console.log("i: " + i);
			/// console.log("userRoles[" + i + "]: " + userRoles[i]);

			/// console.log("roleToCheck == userRoles[i]: " + (roleToCheck == userRoles[i]));

			if (roleToCheck == userRoles[i]) {
				/// console.log("return true ");

				return true;
			}
		}
		/// console.log("return false ");

		return false;
	}

	/* login submit */
	function showUserMenu(config) {
		var ROLE_VISITOR = 1;
		var ROLE_ATHLET = 2;
		var ROLE_INSTRUCTOR = 3;
		var ROLE_ADMIN = 4;
		var ROLE_SUPER_ADMIN = 5;
		var ROLE_ADS_ADMIN = 6;

		config = typeof config == "undefined" ? {} : config;

		var authUserMark = $("#markAuthUser").html();

		// TODO: move to menu initialyzer.
		var userRoles = typeof config.userRoles != "undefined" ? config.userRoles : /*markAuthUser.substring(0, 1); //*/ Cookies.get("userRoles");
		var userName = typeof config.userName != "undefined" ? config.userName : /*markAuthUser.substring(1, markAuthUser.length); //*/Cookies.get("userName");

		if (typeof userRoles == "undefined") {
			userRoles = "";
		}

		if (userRoles.indexOf(',') == -1) {
			userRoles = [userRoles];
		} else {
			userRoles = userRoles.split(',');
		}

		// console.log("userRoles: " + userRoles);

		hideAllAdditionalMenu();

		var isAdmin = checkRole(ROLE_SUPER_ADMIN, userRoles)
			|| checkRole(ROLE_ADMIN, userRoles);

		if (isAdmin) {
			$("#logged-in-nav-admin").show();
			$("#logged-in-nav-support").show();
			$("#logged-in-nav-districts").show();
		}

		var isInstructor = checkRole(ROLE_INSTRUCTOR, userRoles);

		if (isInstructor) {
			$("#logged-in-nav-instructor").show();
			$("#logged-in-nav-my-dojos").show();
			$("#logged-in-nav-my-schedule").show();
		}

		var isAthlet = checkRole(ROLE_ATHLET, userRoles);

		if (isAthlet) {
			$("#logged-in-nav-instructor").show();
		}

		var isAdsAdmin = checkRole(ROLE_ADS_ADMIN, userRoles);

		if (isAdsAdmin) {
			$("#logged-in-nav-support").show();
			$("#logged-in-nav-ads").show();
		}

		if (isAdmin || isInstructor || isAthlet || isAdsAdmin) {
			$("#logged-in-nav-logout").show();
			$("#logged-user").html(userName);
		} else {
			$("#log-in-nav").show();
		}
	}

	function hideUserMenu() {
		hideAllAdditionalMenu();

		$("#log-in-nav").show();
	}

	function hideAllAdditionalMenu() {
		$("#log-in-nav").hide();
		$("#logged-in-nav-logout").hide();
		$("#logged-in-nav-admin").hide();
		$("#logged-in-nav-support").hide();
		$("#logged-in-nav-ads").hide();
		$("#logged-in-nav-districts").hide();
		$("#logged-in-nav-instructor").hide();
		$("#logged-in-nav-my-dojos").hide();
		$("#logged-in-nav-my-schedule").hide();
		$("#logged-user").html("");
	}


	return {
		initialize: initialize
	};
	// });
})();
