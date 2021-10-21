@extends('layouts.app')

@section('content')
<h2>{{ $dojo->name }}</h2>
<div class="row">
    <div class="col-md-9">
		<p>
			<div>
                @include('guest.dojos.dojoaddress', ['dojo' => $dojo, 'extendedInfo' => true])
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
        @include('guest.instructors.template.fullnamelink', ['athlete' => $dojo->athletes->first() ])
        @include('guest.instructors.template.instructorphoto', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructordegree', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructorsocials', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructorphone', ['phone' => $dojo->athletes->first()->phone, 'phone2' => $dojo->athletes->first()->phone2, 'inlinePhone' => false])
        @include('guest.instructors.template.instructormoreabout', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.joininstructor', ['athlete' => $dojo->athletes->first()])
    </div>
</div>
@endsection