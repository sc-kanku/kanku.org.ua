<span class="degree" style="background-image: url(/images/degrees/dan-{{ $athlete ? $athlete->degree : -10 }}.gif)">
    {{$athlete ? $athlete->getDegreeLabel() : '10кю'}}
</span>
