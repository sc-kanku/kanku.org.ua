@extends('layouts.app')

@section('content')

<h1>{{ $post->title }}</h1>

{!! $post->full !!}

    {{-- $post->brief --}}
    {!! $post->content !!}

    @include('guest.photos.gallery', ['gallery' => $post->galleries()->first()])

@endsection