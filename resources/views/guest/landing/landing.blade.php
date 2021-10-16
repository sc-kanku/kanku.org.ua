@extends('layouts.app')

@section('fullScreenTopContent')
@include('guest.landing.carousel')
@endsection


@section('content')
@include('guest.landing.perspective-general')
<hr class="featurette-divider">
@include('guest.landing.perspective-detailed')
@endsection