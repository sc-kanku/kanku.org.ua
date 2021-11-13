@extends('layouts.common')

@section('header-includes')
    <link href="/css/admin.css" rel="stylesheet" />
@endsection

@section('content')
    <div id="admin-app"></div>
@endsection

@section('footer-includes')
    <script src="/js/admin.js"></script>
    {{-- <script async src="https://maps.googleapis.com/maps/api/js?language=uk&key=AIzaSyDcjZOr-j8BsLk34WNyqQihiIKTRvquU_Y&callback=geocode"></script> --}}
    <script async src="https://maps.googleapis.com/maps/api/js?language=uk&key=AIzaSyDcjZOr-j8BsLk34WNyqQihiIKTRvquU_Y&callback=geocode"></script>
@endsection
