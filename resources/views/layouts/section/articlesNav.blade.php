<nav class="nav flex-column theory">
	<h6 class="nav-link-heading collapsed" href="#articles" data-bs-toggle="collapse">
		Статті
		<a class="btn school-expand" role="button" href="#"></a>
	</h6>

	<div id="articles" class="subnav collapse">
		<a class="nav-link" href="/articles/theory/style-history/">Історія стилю</a>
		<a class="nav-link" href="/articles/theory/philosophy/">Філософія</a>
		<a class="nav-link" href="/articles/theory/masutatsu-oyama/">Масутацу Ояма</a>
		<a class="nav-link" href="/articles/theory/oyama-bio/">Основні дати життя Оями</a>
		<a class="nav-link" href="/articles/theory/dojo-kun/">Додзьо Кун</a>
		<a class="nav-link" href="/articles/theory/mottos/">Одинадцать девізів</a>
		<a class="nav-link" href="/articles/theory/shinkyokushinkai/">ШинКіокушинкай</a>
		<a class="nav-link" href="/articles/theory/kyokushinkai-in-ukraine/">Кіокушинкай в Україні</a>
		<a class="nav-link" href="/articles/theory/kata-principles/">Значення й принципи ката</a>
		<a class="nav-link" href="/articles/theory/kata/">Ката</a>
		<a class="nav-link" href="/articles/theory/kime-kiay/">Значення кіме й кіай</a>
		<a class="nav-link" href="/articles/theory/kyokushinkai-kanku/">Значення назви «Кіокушинкай» та емблеми
			«Канку»</a>
		<a class="nav-link" href="/articles/theory/tanden/">Танден</a>
		<a class="nav-link" href="/articles/theory/warm-up/">Розминка</a>
		<a class="nav-link" href="/articles/theory/skill-degrees/">Ступені майстерності</a>
		<a class="nav-link" href="/articles/theory/ethics/">Етикет додзьо</a>
		<a class="nav-link" href="/articles/theory/dogi-obi/">Складання кімоно й зав'язування поясу</a>
	</div>

	<a class="nav-link" href="/articles/theory/dictionary/">Словник</a>
	<!--a class="nav-link" href="/articles/theory/requirements/">Атестаційні вимоги</a-->

	<h6 class="nav-link-heading collapsed" href="#articles-for-parents" data-bs-toggle="collapse">
		Допомога Батькам
		<a class="btn school-expand" role="button" href="#"></a>
	</h6>

	<div id="articles-for-parents" class="subnav collapse">
		<a class="nav-link" href="/articles/for-parents/why-karate/">Чому карате</a>

		<a class="nav-link" href="/articles/for-parents/how-to-start/">Як розпочати</a>
		<a class="nav-link" href="/articles/for-parents/teach-to-win/">Навчимо перемагати</a>
		<a class="nav-link" href="/articles/for-parents/doesnt-work/">Не виходить?</a>
		<a class="nav-link" href="/articles/for-parents/advice/">Поради</a>
		<a class="nav-link" href="/articles/for-parents/faq/">Питання та відповіді</a>
		<a class="nav-link" href="/articles/for-parents/review/">Відгуки</a>
	</div>
</nav>

<script type="text/javascript">
	function setArticlesNavigation() {
		var path = window.location.pathname;
		path = path.replace(/\/$/, "");
		path = decodeURIComponent(path) + "/";

		$(".theory a").each(function () {
			var href = $(this).attr('href');

			if (path.substring(0, href.length) === href) {
				// Highlight item menu
				$(this).addClass('active');

				var parentNode = $(this).parent();

				// If Highlighted menu item is in submenu
				if (parentNode.hasClass('subnav')) {
					// Open parent menu so that highlightrd submenu item is visible
					parentNode.collapse('show');
				}
			}
		});
	}

	function postponeArticlesNavExec() {
		if (typeof $ == "undefined") {
			setTimeout(postponeArticlesNavExec, 1000);
		} else {
			setArticlesNavigation();
		}
	}

	postponeArticlesNavExec();
</script>