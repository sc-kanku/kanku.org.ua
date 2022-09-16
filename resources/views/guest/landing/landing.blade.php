@extends('layouts.app')

@section('full-screen-top-content')
@include('guest.landing.carousel')
@endsection


@section('content')
@include('guest.landing.last-news')
@include('guest.landing.perspective-general')
<hr class="featurette-divider">
@include('guest.landing.perspective-detailed')
@endsection
