<a href="{{ url('/instructors', ['instructor' => $athlete ? $athlete->page_dir : '']) }}">
    @include('guest.instructors.template.full-name', ['athlete' => $athlete ])
</a>
