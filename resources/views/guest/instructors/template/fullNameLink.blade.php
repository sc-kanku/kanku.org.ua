<a href="{{ url('/instructors', ['instructor' => $athlete->page_dir]) }}">
    @include('guest.instructors.template.fullname', ['athlete' => $athlete ])
</a>
