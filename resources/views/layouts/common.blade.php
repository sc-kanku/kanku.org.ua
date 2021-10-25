{{--
Layouts (/resources/views/layouts) inheritance scheme.

                            c o m m m o n 
                          (abstract template)
                          |                 |
                         app              admin
           +-----------(with             (with
           |            app.js/          admin.js/
           |            app.css)         admin.css)
           |               |                 |
           |            article              |
           |           (with side nav        |
           |           for articles)         |
           |               |                 |
        guest user       articles           admin 
         pages            pages           react SPA

--}}<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @include('layouts.section.header-includes')
    @yield('header-includes')
</head>

<body>
    <header>
        @include('layouts.section.header-nav')
        @if(Illuminate\Support\Facades\Route::is('home'))
        @include('layouts.section.header-big-logo')
        @else
        @include('layouts.section.header-small-logo')
        @endif
    </header>

    @yield('full-screen-top-content')
    
    <main class="container">
        @yield('content')
    </main>

    @include('layouts.section.footer-nav')
    @include('layouts.section.footer-includes')
</body>

@yield('footer-includes')

</html>
