<div class="row">
    <div class="col-md-9">
        {{-- 
        <?= Utils::getDojoAddressBarHtml($row, $config) ?>
        --}}
        <p>{!! $dojo->info !!}</p>

        {!! $dojo->athletes->first()->pivot->schedule !!}
    </div>

    <div class="col-md-3 col-instructor-pane">
        {{-- @include('guest.instructors.template.fullNameLink', ['athlete' => $dojo->athletes->first() ]) --}}
        @include('guest.instructors.template.instructorPhoto', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructorDegree', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructorSocials', ['athlete' => $dojo->athletes->first()])
        {{--  @include('guest.instructors.template.instructorPhone', ['phone' => $dojo->athletes->first()->phone, 'phone2' => $dojo->athletes->first()->phone2, 'inlinePhone' => false]) --}}
        @include('guest.instructors.template.joinInstructor', ['athlete' => $dojo->athletes->first()])
    </div>

</div>
