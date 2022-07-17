<!-- FOOTER -->
<footer>
    <div style="clear:both"></div>
    <nav class="navbar navbar-dark bg-dark" id="bottom-nav">
        <div class="row">
            <div class="col-sm-3">
                <h6>Для Вас</h6>

                <nav class="navbar-nav flex-column">
                    <a class="nav-link" href="/dojos/">Зали</a>
                    <a class="nav-link" href="/instructors/">Інструктори</a>
                    <a class="nav-link" href="/service/karate-for-kids">Запрошуєм дітей</a>
                    <a class="nav-link" href="/service/karate-for-adults/">Запрошуєм дорослих</a>
                    <a class="nav-link" href="/service/karate-for-girls/">Запрошуєм дівчат</a>
                    <a class="nav-link" href="/contacts/">Контакти</a>
                    <!--
		  <li class="nav-item">
			<a class="nav-link social-media facebook" title="Facebook" href="https://www.facebook.com/sc.kanku.lviv/"><img src="" alt="Facebook"/></a>

			<a class="nav-link social-media instagram" title="Інстаграм" href="http://instagram.com/sc_kanku_lviv"><img src="pictures/socials/instagram.png_" alt="Інстаграм" /></a>
		  </li>
-->
                    <!--
		  <li class="nav-item">
			<a class="nav-link" href="#">УФКК</a>
		  </li>
-->
                </nav>
            </div>

            <div class="col-sm-3">
                <h6>Допомога Батькам</h6>

                <nav class="navbar-nav flex-column">
                    <a class="nav-link" href="/articles/for-parents/why-karate/">Чому карате?</a>
                    <a class="nav-link" href="/articles/for-parents/how-to-start/">Як розпочати</a>
                    <a class="nav-link" href="/articles/for-parents/teach-to-win/">Навчимо перемагати</a>
                    <a class="nav-link" href="/articles/for-parents/doesnt-work/">Не виходить?</a>
                    <a class="nav-link" href="/articles/for-parents/advice/">Поради</a>
                    <a class="nav-link" href="/articles/for-parents/faq/">Питання та відповіді</a>
                    <a class="nav-link" href="/articles/for-parents/review/">Відгуки</a>
                </nav>
            </div>

            <div class="col-sm-3">
                <h6>Матеріали</h6>

                <nav class="navbar-nav flex-column">
                    <a class="nav-link" href="/articles/theory/style-history/">Статті</a>
                    <!--a class="nav-link" href="/articles/theory/requirements/">Атестаційні вимоги</a-->
                    <a class="nav-link" href="/articles/theory/dictionary/">Словник Термінів</a>
                    <hr />
                    <a class="nav-link" href="/gallery/">Фото / Відео</a>
                    <a class="nav-link" href="/blog/">Блог / Новини</a>
                    <!--a class="nav-link" href="/calendar/lviv-open-cup/">Календар подій</a-->
                </nav>
            </div>

            <div class="col-sm-3">
                <h6>Клуб</h6>

                <nav class="navbar-nav flex-column">
                    <a class="nav-link" href="/articles/club/kanku-history/">Історія</a>
                    <a class="nav-link" href="/articles/club/wko-recognition/">Визнання WKO</a>
                    <a class="nav-link" href="/articles/club/info/">КАНКУ сьогодні</a>
                    <a class="nav-link" href="/athletes/best/">Найкращі спортсмени</a>
                    <a class="nav-link" href="/athletes/black-belts/">Чорні пояси</a>
                </nav>
                <nav>
                    <a class="fa fa-facebook" title="Facebook" href="https://www.facebook.com/sc.kanku.lviv/"></a>
                    <a class="fa fa-instagram" title="Інстаграм" href="http://instagram.com/sc_kanku_lviv/"></a>
                    <a class="fa fa-youtube" title="YouTube" href="https://www.youtube.com/channel/UCxQ6FOm_L1V0MaBXxrYUECQ"></a>
                </nav>
            </div>


        </div><!-- /.row -->
    </nav>

    <script type="text/javascript">
        function setMainNavigation() {
            var path = window.location.pathname;
            path = path.replace(/\/$/, "");
            path = decodeURIComponent(path) + "/";

            $("#bottom-nav a").each(function() {
                var href = $(this).attr('href');

                if (path.substring(0, href.length) === href) {
                    // Highlight item menu
                    $(this).addClass('active');
                    /*
                    				var parentNode = $(this).parent();

                    				// If Highlighted menu item is in submenu
                    				if (parentNode.hasClass('subnav')) {
                    					// Open parent menu so that highlightrd submenu item is visible
                    					parentNode.collapse('show');
                    				}
                    */
                }
            });
        }

        function postponeMainNavExec() {
            if (typeof $ == "undefined") {
                setTimeout(postponeMainNavExec, 1000);
            } else {
                setMainNavigation();
            }
        }

        postponeMainNavExec();
    </script>

    <!--p class="float-right"><a href="#">Back to top</a></p-->
    <p>
        2017-2022 &copy; Спортивний клуб кіокушинкай карате КАНКУ | <a href="/email/feedback/">Зворотній звязок</a>
        <!--
	&middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a>
	-->
    </p>
</footer>
