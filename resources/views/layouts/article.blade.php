
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<link href="/css/app.css" rel="stylesheet" />
    @include('layouts.section.headerincludes')
</head>

<body>
    <header>
		@include('layouts.section.headernav')
        @include('layouts.section.headersmalllogo')
    </header>

    @yield('fullScreenTopContent')

	<div class="container">
		<div class="row">
			<aside class="col-sm-3">
				@include('layouts.section.articlesnav')
			</aside>

			<main class="col-sm-9">
				<article>
					@yield('content')
				</article>
			</main>
		</div>
	</div>

    @include('layouts.section.footernav')

	<script src="/js/app.js"></script>
    
	@include('layouts.section.footerincludes')
</body>

</html>
