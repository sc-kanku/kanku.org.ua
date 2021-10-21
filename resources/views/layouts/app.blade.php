<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    
    @include('layouts.section.headerincludes')
    <link href="/css/app.css" rel="stylesheet" />
    
    @yield('header-includes')
</head>

<body>
    <header>
        <!--div id="top-nav-title" class="navbar navbar-expand-md navbar-dark fixed-top navbar-brand">
				<h1>Спортивний клуб кіокушинкай карате «КАНКУ»</h1>
			</div-->
        @include('layouts.section.headernav')
        @if(Illuminate\Support\Facades\Route::is('home'))
        @include('layouts.section.headerbiglogo')
        @else
        @include('layouts.section.headersmalllogo')
        @endif
    </header>

    @yield('fullScreenTopContent')
    
    <main class="container">
        @yield('content')
    </main>

    @include('layouts.section.footernav')
    @include('layouts.section.footerincludes')
    <script src="/js/app.js"></script>
</body>

@yield('footer-includes')

</html>