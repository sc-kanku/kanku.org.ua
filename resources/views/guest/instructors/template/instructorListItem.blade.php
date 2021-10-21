<div class="card instructor-info">
    <div class="card-header">
        @include('guest.instructors.template.fullnamelink', ['athlete' => $athlete])

        <!-- TODO: Add switch here for schedule
        // and show hide it on pressed / released state
        -->
    </div>
    <div class="card-body">
        @include('guest.instructors.template.instructorphoto', ['athlete' => $athlete])
        @include('guest.instructors.template.instructordegree', ['athlete' => $athlete])
        @include('guest.instructors.template.instructorsocials', ['athlete' => $athlete])
        @include('guest.instructors.template.instructorphone', ['phone' => $athlete->phone, 'phone2' => $athlete->phone2, 'inlinePhone' => false])
        @include('guest.instructors.template.joininstructor', ['athlete' => $athlete])
        @include('guest.instructors.template.instructormoreabout', ['athlete' => $athlete])
        
        <div class="card-text">
            {{ $athlete->brief }}
        </div>
    </div>
</div>