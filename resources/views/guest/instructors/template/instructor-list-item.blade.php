<div class="card instructor-info">
    <div class="card-header">
        @include('guest.instructors.template.full-name-link', ['athlete' => $athlete])

        <!-- TODO: Add switch here for schedule
        // and show hide it on pressed / released state
        -->
    </div>
    <div class="card-body">
        @include('guest.instructors.template.instructor-photo', ['athlete' => $athlete])
        @include('guest.instructors.template.instructor-degree', ['athlete' => $athlete])
        @include('guest.instructors.template.instructor-socials', ['athlete' => $athlete])
        @include('guest.instructors.template.instructor-phone', ['phone' => $athlete->phone, 'phone2' => $athlete->phone2, 'inlinePhone' => false])
        @include('guest.instructors.template.join-instructor', ['athlete' => $athlete])
        @include('guest.instructors.template.instructor-more-about', ['athlete' => $athlete])

        <div class="card-text">
            {{ $athlete->brief }}
        </div>
    </div>
</div>
