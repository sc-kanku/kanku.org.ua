<span class="lastName">
    {{ $athlete ? $athlete->lastName : ''}}
</span>

<span class="firstName-patronymic">
    {{ $athlete ? $athlete->firstName : '' }}
    {{ $athlete ? $athlete->patronymic : ''}}
</span>
