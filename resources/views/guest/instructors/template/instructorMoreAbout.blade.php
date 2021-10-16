@if ($athlete->is_coach)
<div class="show-more-profile-bar">
    <a class="btn-xsm" href="{{url('/instructors', ['instructor' => $athlete->page_dir])}}">
        <img src="/images/icons/profile-details-info-thick.gif" alt="Більше про інструктора">
        Більше про інструктора
    </a>
</div>
@endif