@if ($athlete->is_coach)
<a class="btn btn-success btn-join" href="#" role="button" data-bs-toggle="modal" data-bs-target="#modal-join-{{ $athlete->id }}">Записатись на тренування</a>

<div class="modal fade" id="modal-join-{{ $athlete->id }}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Інструкції по запису на тренування</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Щоб записатись на тренування до вибраного інструктора, будь ласка зателефонуйте по вказаному номері:
                <div style="padding-top: 2rem">
                    <h5>@include('guest.instructors.template.fullName', ['athlete' => $athlete ] )</h5>
                </div>

                @include('guest.instructors.template.instructorPhone', ['phone' => $athlete->phone, 'phone2' => $athlete->phone2, 'inlinePhone' => false])
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-outline-primary" data-bs-dismiss="modal">Ок</button>
            </div>
        </div>
    </div>
</div>
@endif