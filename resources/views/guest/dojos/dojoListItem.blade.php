<li>
    <div class="row">
        <div class="col-sm">
            <span class="dojo-address">
                <a 
                    id='heading-{{ $index }}' 
                    class='mb-0 collapsed" href="#collapse-{{ $index }}'
                    data-bs-toggle="collapse" 
                    data-bs-parent="#accordion" aria-expanded="false" 
                    aria-controls='collapse-{{ $index }}'
                >
                    @include('guest.dojos.dojoAddress', ['dojo' => $dojo, 'index'=> $dojo->id, 'extendedInfo' => true])
                </a>

                <a class="btn-xsm" href="https://maps.google.com.ua/maps?q=' . {{ $dojo->coords }} . '&hl=uk&num=1&t=m&z=17"
                    ><img src="/images/icons/show-on-map.png" alt="Показати на мапі" />
                </a>
            </span>

            <span class="dojo-name">
                <a href="/dojos/{{$dojo->url}}/" title="Сторінка залу">{{ $dojo->name }}</a>
            </span>
            
            <a class="btn dojo-expand mb-0 collapsed" 
                id="heading-2-{{ $index }}" 
                href="#collapse-{{ $index }}" 
                data-bs-toggle="collapse" 
                data-bs-parent="#accordion" aria-expanded="false" 
                aria-controls="collapse-{{ $index }}"
                role="button">
            </a>
        </div>


        <div class="col-sm">
            <span class="dojo-instructor">@include('guest.instructors.template.fullNameLink', ['athlete' => $dojo->athletes->first()])</span>
            <span class="dojo-instructor-phone">
                @include('guest.instructors.template.instructorPhone', ['phone' => $dojo->athletes->first()->phone, 'phone2' => $dojo->athletes->first()->phone2, 'inlinePhone' => true])
            </span>
        </div>
    </div>
</li>

<div id='collapse-{{ $index }}' class="dojo-details collapse show_" role="tabpanel" aria-labelledby="heading-{{ $index }}"
    >@include('guest.dojos.dojoAndInstructor', ['showAddress' => false, 'showProfileIcon' => true,'showJoinButton' => true])
</div>


        