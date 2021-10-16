<div class="phones-bar">
    @if ($phone != '')

        <a class="btn-xsm phone-number" href="tel:{{ $phone }}">
            <img src="/images/icons/phone-us.jpg" alt="Зателефонувати інструктору" />
            {{ $phone }}
        </a>
 
 
        @if ($phone2 != '')
            <a class="btn-xsm phone-number @if ($inlinePhone == false) phone-number-2 @endif" href="tel:{{ $phone2 }}">{{ $phone2 }}</a>
        @endif
    @endif


</div>