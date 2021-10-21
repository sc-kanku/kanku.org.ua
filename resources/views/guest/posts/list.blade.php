@extends('layouts.app')

@section('content')

<h1>Події та новини</h1>

{{ $posts->onEachSide(0)->links() }}
<hr class="featurette-divider" />

@foreach($posts as $post)
    @include('guest.posts.postlistitem', ['post' => $post])
    <hr class="featurette-divider" />
@endforeach

{{ $posts->onEachSide(0)->links() }}

@endsection
