<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    
    @include('layouts/section/headerIncludes')
    <link href="/css/app.css" rel="stylesheet" />
    
    @yield('header-includes')
</head>

<body>
    <header>
        <!--div id="top-nav-title" class="navbar navbar-expand-md navbar-dark fixed-top navbar-brand">
				<h1>Спортивний клуб кіокушинкай карате «КАНКУ»</h1>
			</div-->
        @include('layouts/section/headerNav')
        @if(Illuminate\Support\Facades\Route::is('home'))
        @include('layouts/section/headerBigLogo')
        @else
        @include('layouts/section/headerSmallLogo')
        @endif
    </header>

    @yield('fullScreenTopContent')
    
    <main class="container">
        @yield('content')
    </main>

    @include('layouts/section/footerNav')
    @include('layouts/section/footerIncludes')
    <script src="/js/app.js"></script>
</body>

@yield('footer-includes')

</html>