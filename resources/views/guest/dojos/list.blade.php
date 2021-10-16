@extends('layouts.app')

@section('fullScreenTopContent')
<header class="dojo-filter">
    <div class="form-row">
        <h1>Бажаєте записатись на тренування?</h1>
    </div>

    <div class="form-row">
        <div class="_col-xs-2 col-sm-5 col-md-4 col-lg-3">
            Оберіть зручний Вам район
        </div>

        <div class="col-xs-6 col-sm-4 _col-md-6 col-lg-3">
            <select id="dojo-filter-region" class="custom-select form-control form-control-sm col-sm-6">
                <option value="0" selected>Львів та область</option>
                <optgroup label="Львів">
                    <option value="10">Всі райони</option>
                    <option value="11">Сихівський</option>
                    <option value="12">Галицький</option>
                    <option value="13">Шевченківський</option>
                    <option value="14">Личаківський</option>
                    <option value="15">Франківський</option>
                    <option value="16">Залізничний</option>
                </optgroup>
                <optgroup label="Львівська Область">
                    <option value="100">Всі райони</option>
                    <option value="107">Кам'янка-Бузький</option>
                    <option value="110">Перемишлянський</option>
                    <option value="111">Пустомитівський</option>
                </optgroup>
            </select>
        </div>
    </div>

    <div class="form-row">
        <div class="_col-xs-2 col-sm-5 col-md-4 col-lg-3">
            та дні тренувань
        </div>

        <div class="col-xs-6 col-sm-4 _col-md-6 col-lg-3">
            <select id="dojo-filter-schedule" class="custom-select form-control form-control-sm col-sm-6">
                <option value="0" selected>Довільні дні</option>
                <option value="1">Пн, Ср, Пт</option>
                <option value="2">Вт, Чт, Сб</option>
            </select>
        </div>
    </div>

    <div class="form-row">
        <small id="dojo-filter-result" class=" form-row float-right text-muted"></small>
    </div>
</header>

@endsection

@section('content')
    <h1>Зали у Львові
        <a href="#dojos-map" class="btn btn-outline-primary btn-sm" role="button">На мапі »</a>
    </h1>

    <ol id="dojos-lviv">
        <div id="accordion" class="dojos" role="tablist" aria-multiselectable="true">
            @foreach($lvivDojos as $dojo)
                @include('guest.dojos.dojoListItem', ['dojo' => $dojo, 'index'=> $dojo->id, 'extendedInfo' => false])
            @endforeach
        </div>
    </ol>

    <h1>Зали у Львівській області
        <a href="#dojos-map" class="btn btn-outline-primary btn-sm" role="button">На мапі »</a>
    </h1>

    <ol id="dojos-region">
        <div id="accordion-obl" class="dojos" role="tablist" aria-multiselectable="true">
            @foreach($regionDojos as $dojo)
                @include('guest.dojos.dojoListItem', ['dojo' => $dojo, 'index'=> $dojo->id, 'extendedInfo' => false])
            @endforeach
        </div>
    </ol>

    <div id="dojo-filter-result-0" style="display: none">
        <h1>Залів не знайдено</h1>

        <p>Нажаль наразі у нас ще немає залів, які відповідають заданому критерію:</p>

        <p class="sub-p">
            Район: <span id="dojo-filter-result-0-region"></span><br />
            Розклад занять: <span id="dojo-filter-result-0-schedule"></span>
        </p>

        <hr />

        <p class="text-muted">Але це лише питання часу.</p>
    </div>

    <h1>Мапа залів у Львові та області</h1>
    <div id="dojos-map"></div>

    <!-- On map -->
    <noscript>
        <p style="color:red">У Вашому браузері відключений JavaScript. На жаль, ми тепер не можемо показати
            Вам
            наші
            зали на карті.</p>

        <!--a href="/spisok-zaliv/">Загальний список наших залів</a-->
    </noscript>
@endsection
