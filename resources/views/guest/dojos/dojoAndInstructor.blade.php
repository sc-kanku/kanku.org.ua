<div class="row">
    <div class="col-md-9">
        Район: <span class="district">{{ $dojo->district }}</span>
        {{-- 
        <?= Utils::getDojoAddressBarHtml($row, $config) ?>
        --}}
        <p>{!! $dojo->info !!}</p>

        {!! $dojo->athletes->first()->pivot->schedule !!}
    </div>

    <div class="col-md-3 col-instructor-pane">
        {{-- @include('guest.instructors.template.fullnamelink', ['athlete' => $dojo->athletes->first() ]) --}}
        @include('guest.instructors.template.instructorphoto', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructordegree', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructorsocials', ['athlete' => $dojo->athletes->first()])
        {{--  @include('guest.instructors.template.instructorphone', ['phone' => $dojo->athletes->first()->phone, 'phone2' => $dojo->athletes->first()->phone2, 'inlinePhone' => false]) --}}
        @include('guest.instructors.template.joininstructor', ['athlete' => $dojo->athletes->first()])
    </div>

</div>
