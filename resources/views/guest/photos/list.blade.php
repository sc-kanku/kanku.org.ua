@extends('layouts.app')

@section('content')
    <h2>{{ $page->title }}</h2>
    @include('guest.photos.gallery', ['gallery' => $page->galleries()->first()])
@endsection