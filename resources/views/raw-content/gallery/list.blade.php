@extends('layouts.app')

@section('content')

<div class="content gallery-list">
    <header>
        <h2>Фото та відео</h2>
    </header>

    <section class="card-deck">
        <figure class="card">
            <img class="card-img-top" src="/images/thumb/traning.jpg" alt="Тренування кіокушинкай карате - зелені пояси виконують техніку джодан хіракен цукі в переміщенні.">
            <div class="card-body">
                <figcaption class="card-title">Тренування</figcaption>
                <a href="/gallery/traning/" class="card-link float-right">Переглянути</a>
            </div>
        </figure>

        <figure class="card">
            <img class="card-img-top" src="/images/thumb/competition.jpg" alt="Змагання з кіокушинкай карате - в поєдинку виконується техніка джодан йоко гері.">
            <div class="card-body">
                <figcaption class="card-title">Змагання</figcaption>
                <a href="/gallery/competition/" class="card-link float-right">Переглянути</a>
            </div>
        </figure>

        <figure class="card">
            <img class="card-img-top" src="/images/thumb/seminar.jpg" alt="На семінарі Шихан Мутін Сергій Асхатович пояснює жовтим поясам.">
            <div class="card-body">
                <figcaption class="card-title">Збори та семінари</figcaption>
                <a href="/gallery/seminar/" class="card-link float-right">Переглянути</a>
            </div>
        </figure>

        <figure class="card">
            <img class="card-img-top" src="/images/thumb/demo.jpg" alt="Показовий виступ на ярмарку спорту у Львові - Сенсей Гаврилець з учнями виконують ката Гексай-Дай.">
            <div class="card-body">
                <figcaption class="card-title">Показові виступи</figcaption>
                <a href="/gallery/demo/" class="card-link float-right">Переглянути</a>
            </div>
        </figure>

        <figure class="card">
            <img class="card-img-top" src="/images/thumb/travel.jpg" alt="Відпочинок влітку - Сенсей Мутіна Наталя Асхатівна зі своїми учнями.">
            <div class="card-body">
                <figcaption class="card-title">Поїздки</figcaption>
                <a href="/gallery/travel/" class="card-link float-right">Переглянути</a>
            </div>
        </figure>

        <figure class="card">
            <img class="card-img-top" src="/images/thumb/family.png" alt="Сім'я Фурдасів в кімоно - тато Олег, мама Галина, доньки Соломія та Ліліана.">
            <div class="card-body">
                <figcaption class="card-title">Спортивні родини</figcaption>
                <a href="/gallery/family/" class="card-link float-right">Переглянути</a>
            </div>
        </figure>

        <figure class="card">
            <img class="card-img-top" src="/images/thumb/girls-2.jpg" alt="Пришляк Анастасія усміхається в кімоно.">
            <div class="card-body">
                <figcaption class="card-title">Дівчата в карате</figcaption>
                <a href="/gallery/karate-girls/" class="card-link float-right">Переглянути</a>
            </div>
        </figure>

        <figure class="card">
            <img class="card-img-top" src="/images/thumb/rest.jpg" alt="Каратист сидить на зеленій траві">
            <div class="card-body">
                <figcaption class="card-title">Відпочинок на природі</figcaption>
                <a href="/gallery/rest/" class="card-link float-right">Переглянути</a>
            </div>
        </figure>

        <figure class="card">
            <img class="card-img-top" src="/images/thumb/video.jpg" alt="Бутенко Дмитро дає інтерв'ю місцевому телеканалу.">
            <div class="card-body">
                <figcaption class="card-title">Відео</figcaption>
                <a href="/gallery/video/" class="card-link float-right">Переглянути</a>
            </div>
        </figure>
    </section>
</div>
@endsection