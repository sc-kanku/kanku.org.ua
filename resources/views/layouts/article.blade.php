@extends('layouts.app')

@section('content')
	<div class="row">
		<aside class="col-sm-3">
			@include('layouts.section.articles-nav')
		</aside>

		<main class="col-sm-9">
			<article>
				@yield('article-content')
			</article>
		</main>
	</div>
@endsection
