@if ($gallery != null && $gallery->photos()->count() > 0)
    @if ($isPreviousPhoto = false)@endif

    @foreach ($gallery->photos as $photo)
        @if ($photo->isPhoto() && !$isPreviousPhoto)
            <div class=@if ($gallery->pivot->is_titles) "gallery titles" @else "gallery" @endif>
        @elseif ($photo->isDescription() && $isPreviousPhoto)
            </div>
        @endif

        @if ($photo->isPhoto())
            @include('guest.photos.photo', ['photo' => $photo])
        @elseif ($photo->isDescription())
            $photo->txt
        @endif

        @if ($isPreviousPhoto = $photo->isPhoto())@endif
    @endforeach

    @if (($gallery->photos->count() > 0) && $isPreviousPhoto)
        </div>
    @endif
@endif
