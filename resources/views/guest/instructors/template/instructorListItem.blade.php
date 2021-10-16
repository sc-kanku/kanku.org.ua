<div class="card instructor-info">
    <div class="card-header">
        @include('guest.instructors.template.fullNameLink', ['athlete' => $athlete])

        <!-- TODO: Add switch here for schedule
        // and show hide it on pressed / released state
        -->
    </div>
    <div class="card-body">
        @include('guest.instructors.template.instructorPhoto', ['athlete' => $athlete])
        @include('guest.instructors.template.instructorDegree', ['athlete' => $athlete])
        @include('guest.instructors.template.instructorSocials', ['athlete' => $athlete])
        @include('guest.instructors.template.instructorPhone', ['phone' => $athlete->phone, 'phone2' => $athlete->phone2, 'inlinePhone' => false])
        @include('guest.instructors.template.joinInstructor', ['athlete' => $athlete])
        @include('guest.instructors.template.instructorMoreAbout', ['athlete' => $athlete])
        
        <div class="card-text">
            {{ $athlete->brief }}
        </div>
    </div>
</div>