@extends('layouts.app')

@section('content')
<h2>{{ $dojo->name }}</h2>
<div class="row">
    <div class="col-md-9">
		<p>
			<div>
                @include('guest.dojos.dojo-address', ['dojo' => $dojo, 'extendedInfo' => true])
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
        @include('guest.instructors.template.full-name-link', ['athlete' => $dojo->athletes->first() ])
        @include('guest.instructors.template.instructor-photo', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructor-degree', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructor-socials', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructor-phone', ['phone' => $dojo->athletes->first()->phone, 'phone2' => $dojo->athletes->first()->phone2, 'inlinePhone' => false])
        @include('guest.instructors.template.instructor-more-about', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.join-instructor', ['athlete' => $dojo->athletes->first()])
    </div>
</div>
@endsection
