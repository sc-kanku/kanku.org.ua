@extends('layouts.app')

@section('content')
<h1>Інструктори спортивного клубу кіокушинкай карате «Канку»</h1>

<div class="card-deck">
    @foreach($athletes as $athlete)
        @include('guest.instructors.template.instructor-list-item', ['athlete' => $athlete])
    @endforeach
</div>


@endsection
