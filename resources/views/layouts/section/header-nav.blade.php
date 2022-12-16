<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="top-nav">
    <div>
        <!-- Бутерброд -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <a class="navbar-brand" href="/">КАНКУ</a>
    </div>

    <div class="collapse navbar-collapse" id="navbarCollapse">
        <nav class="authorized-nav navbar-nav mr-auto">
            <a class="nav-link" href="/dojos/">Зали</a>
            <a class="nav-link" href="/instructors/">Інструктори</a>

            <a class="nav-link" href="/contacts/">Контакти</a>
            <a class="nav-link" href="/blog/">Блог</a>

            <span class="top-socials">
                <a class="nav-link btn-xsm" target="_blank" href="https://www.facebook.com/sc.kanku.lviv/" aria-label="facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>

                <a class="nav-link btn-xsm" target="_blank" href="https://instagram.com/sc_kanku_lviv/" aria-label="instagram">
                    <i class="fab fa-instagram"></i>
                </a>
            </span>


            <ul class="navbar-nav navbar-nav justify-content-end">
                @if(auth()->user() && false)
                <li class="nav-item dropdown" id="logged-in-nav-support">
                    <a class="nav-link dropdown-toggle nav-item dropdown dropdown-toggle" href="#" id="logged-in-nav-admin" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Адміністрація</a>

                    <nav class="dropdown-menu" aria-labelledby="logged-in-nav-admin">
                        <!--a class="dropdown-item" href="/school/index.php">Інфо</a-->
                        {{-- <a class="dropdown-item" href="{{ route('admin.dashboard') }}">Інфо</a> --}}
                        <a class="dropdown-item" href="/admin/dashboard">Інфо</a>

                        <hr style="margin-top: 0.1rem;margin-bottom: 0.1rem;">

                        <!--a class="dropdown-item" href="/school/news.php">Новини</a-->
                        {{--<a class="dropdown-item" href="{{ route('admin.news') }}">Новини</a> --}}
                        <a class="dropdown-item" href="/admin/post/list">Новини</a>

                        <!--a class="dropdown-item" href="/school/athletes.php">Спортсмени</a-->
                        {{--<a class="dropdown-item" href="{{ route('admin.instructors') }}">Спортсмени</a> --}}
                        <a class="dropdown-item" href="/admin/athlete/list">Спортсмени</a>

                        <!--a class="dropdown-item" href="/school/gymnasiums.php">Зали</a-->
                        {{--<a class="dropdown-item" href="{{ route('admin.dojos') }}">Зали</a> --}}
                        <a class="dropdown-item" href="/admin/dojo/list">Зали</a>

                        <hr style="margin-top: 0.1rem;margin-bottom: 0.1rem;">
                        {{--
                        <a class="dropdown-item" href="/school/gallery.php">Список галерей</a>
                        <a class="dropdown-item" href="/school/video.php">Видеогалерея</a>
                        <a class="dropdown-item" href="/school/photo.php">Робота з фото</a>
                        <a class="dropdown-item" href="/school/upload_img.php">Завантажити фото</a>
                        <hr style="margin-top: 0.1rem;margin-bottom: 0.1rem;">
                        <a class="dropdown-item" href="/school/attn.php" id="logged-in-nav-broadcast">Розсилки
                            Тренерам</a>

                        <hr style="margin-top: 0.1rem;margin-bottom: 0.1rem;">

                        <%--a class="dropdown-item" href="/school/refresh.php">Оновити сайт</a--%>
--}}
                        <a class="dropdown-item" href="/admin/refresh">Оновити сайт</a>
                        {{--<a class="dropdown-item" href="{{ route('admin.refresh') }}">Оновити сайт</a> --}}
                    </nav>
                </li>


                <li class="nav-item dropdown" id="logged-in-nav-support">
                    <a class="nav-link dropdown-toggle" href="#" id="dropdown-support" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Рекламна Кампанія</a>

                    <nav class="dropdown-menu" aria-labelledby="dropdown-support">
                        <a class="dropdown-item" href="/school/customers.php" id="logged-in-nav-ads">Заявки</a>
                        <a class="dropdown-item" href="/school/customerDistricts.php" id="logged-in-nav-districts">Райони</a>
                    </nav>
                </li>

                <li class="nav-item dropdown" id="logged-in-nav-instructor">
                    <a class="nav-link dropdown-toggle" href="#" id="logged-user" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ auth()->user()->firstName }}
                    </a>

                    <nav class="dropdown-menu" aria-labelledby="logged-user">
                        <a class="dropdown-item" href="/user/info/">Загальна інфо</a>
                        <a class="dropdown-item" href="/user/dojos/" id="logged-in-nav-my-dojos">Мої Зали</a>
                        <a class="dropdown-item" href="/user/schedule/" id="logged-in-nav-my-schedule">Мій
                            Розклад</a>
                    </nav>
                </li>
                @endif
                @if(auth()->user())
                    @if(auth()->user()->hasRole('admin'))
                    <li class="nav-item pl-2" id="logged-in-nav-support">
                        <a class="nav-link" href="\admin"><i class="fas fa-tools"></i></a>
                    </li>
                    @endif

                <li class="nav-item" id="logged-in-nav-logout">
                    <form method="post" action='/logout' class="pt-2">
                        <b class="text-light pl-3">{{ auth()->user()->firstName }}</b>
                        <button type="submit" id="logout-btn" class="nav-link" href="{{ route('logout')}}" style="background-color: inherit;border: 0; display:inline; padding: 0 1em">
                            Вихід
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </form>
                </li>
                @endif
            </ul>
            @if(!auth()->user())
            <!--a class="nav-link" href="/lviv-open-cup/">Lviv Open Cup 2018</a-->
            <a class="nav-link" href="/login/" data-bs-toggle="modal" data-bs-target="#login-dialog">
                <i class="fas fa-sign-in-alt"></i>
            </a>
            @endif
        </nav>
    </div>


    <!--
	<form class="form-inline mt-2 mt-md-0">
	  <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
	  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
	</form>
  -->


    <ul class="navbar-nav consultations">
        <li class="phone-us">
            <!--Є запитання? Телефонуйте нам-->
            <a class="btn-xsm phone-number" href="tel:+380638610351">
                <i class="fas fa-phone"></i> (063) 861 03 51
            </a>
            <a class="btn-xsm phone-number" href="tel:+380687532353">
                <i class="fas fa-phone"></i> (068) 753 23 53
            </a>
        </li>

        <li class="chat-us" style="font-size: 1.3em;">
            <a class="btn-xsm phone-number" target="_blank" href="viber://chat/?number=%2B380638610351" aria-label="viber">
                <i class="fab fa-viber"></i>
            </a>

            <a class="btn-xsm phone-number" target="_blank" href="tg://msg?to=+380638610351" aria-label="telegram">
                <i class="fab fa-telegram-plane"></i>
            </a>

            <a class="btn-xsm phone-number" target="_blank" href="whatsapp://send?abid=+380638610351" aria-label="whatsapp">
                <i class="fab fa-whatsapp"></i>
            </a>
        </li>
    </ul>
</nav>

<div id="login-dialog" style="display: none" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="myModalLabel">Вхід</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="signin-form">
                    <div class="container">
                        @include('auth.login-form')
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                <!--button id="do-login-btn" type="button" class="btn btn-primary">Вперед</button-->
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    function setTopNavigation() {
        var path = window.location.pathname;
        path = path.replace(/\/$/, "");
        path = decodeURIComponent(path) + "/";

        $("#top-nav a").each(function() {
            var href = $(this).attr('href');

            if ((href.length > 1) && (path.substring(0, href.length) === href)) {
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

    function postponeTopNavExec() {
        if (typeof $ == "undefined") {
            setTimeout(postponeTopNavExec, 1000);
        } else {
            setTopNavigation();
        }
    }

    postponeTopNavExec();
</script>
