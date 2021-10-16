<div class="instructor-actions-bar">
    @if ($athlete->email != '')
        <a class="btn-xsm" href="/email/{{ $athlete->id }}">
            <img src="/images/icons/mail-us-middle.gif" alt="Написати листа інструктору">
        </a>
    @endif

    @if ($athlete->facebook != '')
        <a class="btn-xsm fa fa-facebook" title="Facebook" href="{{ $athlete->facebook }}"></a>
    @endif

    @if ($athlete->instagram != '')
        <a class="btn-xsm fa fa-instagram" title="instagram" href="{{ $athlete->instagram }}"></a>
    @endif

    @if ($athlete->youtube != '')
        <a class="btn-xsm fa fa-youtube" title="YouTube" href="{{ $athlete->youtube }}"></a>
    @endif

    @if ($athlete->twitter != '')
        <a class="btn-xsm fa fa-twitter" title="Twitter" href="{{ $athlete->twitter }}"></a>
    @endif

    @if ($athlete->lj != '')
        <a class="btn-xsm fa fa-livejournal" title="LiveJournal" href="{{ $athlete->lj }}"></a>
    @endif

    @if ($athlete->ok != '')
        <a class="btn-xsm fa fa-ok" title="ok" href="{{ $athlete->ok }}"></a>
    @endif
</div>