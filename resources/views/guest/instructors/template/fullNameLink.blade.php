<a href="{{ url('/instructors', ['instructor' => $athlete->page_dir]) }}">
    @include('guest.instructors.template.fullName', ['athlete' => $athlete ])
</a>
