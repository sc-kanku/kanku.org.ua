@extends('layouts.app')

@section('content')
<h2>{{ $dojo->name }}</h2>
<div class="row">
    <div class="col-md-9">
		<p>
			<div>
                @include('guest.dojos.dojoAddress', ['dojo' => $dojo, 'extendedInfo' => true])
				{{--  Utils::getShowOnMapHtml($row) --}}
			</div>
		
		    <div class="district">
                @if ($dojo->district) {
                    Район: {{ $dojo->district }}
                @endif
		    </div>		
		</p>

        <p>{!! $dojo->info !!}</p>

        <h3>Розклад тренувань</h3>
        <br />
        {!! $dojo->athletes->first()->pivot->schedule !!}
    </div>

    <div class="col-md-3 col-instructor-pane">
        <h3>Iнструктор</h3>
        @include('guest.instructors.template.fullNameLink', ['athlete' => $dojo->athletes->first() ])
        @include('guest.instructors.template.instructorPhoto', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructorDegree', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructorSocials', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructorPhone', ['phone' => $dojo->athletes->first()->phone, 'phone2' => $dojo->athletes->first()->phone2, 'inlinePhone' => false])
        @include('guest.instructors.template.instructorMoreAbout', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.joinInstructor', ['athlete' => $dojo->athletes->first()])
    </div>
</div>
@endsection