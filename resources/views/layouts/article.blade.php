
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<link href="/css/app.css" rel="stylesheet" />
    @include('layouts/section/headerIncludes')
</head>

<body>
    <header>
		@include('layouts/section/headerNav')
        @include('layouts/section/headerSmallLogo')
    </header>

    @yield('fullScreenTopContent')

	<div class="container">
		<div class="row">
			<aside class="col-sm-3">
				@include('layouts/section/articlesNav')
			</aside>

			<main class="col-sm-9">
				<article>
					@yield('content')
				</article>
			</main>
		</div>
	</div>

    @include('layouts/section/footerNav')

	<script src="/js/app.js"></script>
    
	@include('layouts/section/footerIncludes')
</body>

</html>
