@extends('layouts.app')

@section('content')

<h2>@include('guest.instructors.template.fullname', ['athlete' => $athlete])</h2>
<div class="container"
<div class="row">
    <div class="col-2" style="width:10%">
        @include('guest.instructors.template.instructorphoto', ['athlete' => $athlete])
    </div>
    <div class="col-5" style="width:90%">
        @include('guest.instructors.template.instructordegree', ['athlete' => $athlete])
        @include('guest.instructors.template.instructorsocials', ['athlete' => $athlete])
        @include('guest.instructors.template.instructorphone', ['phone' => $athlete->phone, 'phone2' => $athlete->phone2, 'inlinePhone' => false])
        @include('guest.instructors.template.joininstructor', ['athlete' => $athlete])
        <br /><br />
        <div class="card-text">
            {!! $athlete->full !!}
        </div>
        <br />
        @foreach($athlete->dojos as $dojo)
            <h3><a href="/dojos/{{$dojo->url}}/">
                {{$dojo->name}}
            </a></h3>

            {!! $dojo->pivot->schedule !!}
            <br />
        @endforeach

        @include('guest.photos.gallery', ['gallery' => $athlete->galleries()->first()])
    </div>
</div>
</div>
@endsection
