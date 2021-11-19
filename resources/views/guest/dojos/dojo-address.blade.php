@if ($dojo->isLviv()) 
    @if ($extendedInfo == true)
        Львів, 
        @endif
@elseif ($dojo->isRegion()) 
    @if ($extendedInfo == true) 
        Львівська область, 
    @endif
    
    @if ($dojo->point != '') 
        {{ $dojo->point }}, 
    @endif
@endif

{{$dojo->address }};
