<div class="row">
    <div class="col-md-9">
        Район: <span class="district">{{ $dojo->district }}</span>
        {{--
        <?= Utils::getDojoAddressBarHtml($row, $config) ?>
        --}}
        <p>{!! $dojo->info !!}</p>

        <?php $athl = $dojo->athletes->first() ?>
        {!! $athl ? $athl->pivot->schedule : ''!!}
    </div>

    <div class="col-md-3 col-instructor-pane">
        {{-- @include('guest.instructors.template.full-name-link', ['athlete' => $dojo->athletes->first() ]) --}}
        @include('guest.instructors.template.instructor-photo', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructor-degree', ['athlete' => $dojo->athletes->first()])
        @include('guest.instructors.template.instructor-socials', ['athlete' => $dojo->athletes->first()])
        {{--  @include('guest.instructors.template.instructor-phone', ['phone' => $dojo->athletes->first()->phone, 'phone2' => $dojo->athletes->first()->phone2, 'inlinePhone' => false]) --}}
        @include('guest.instructors.template.join-instructor', ['athlete' => $dojo->athletes->first()])
    </div>

</div>
