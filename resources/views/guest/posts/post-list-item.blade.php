<div class="row">
    <div class="col">
        @if ($post->getPhotoAndPreviewFileNames()['photo'] != '')
            <a href='{{ url('/images/posts', ['post_id' => $post->id, 'fileName' => $post->getPhotoAndPreviewFileNames()["photo"]]) }}'>


        @endif

        @if ($post->getPhotoAndPreviewFileNames()['preview'] != '')
            <img class="mainphoto" src="/images/posts/{{ $post->id }}/{{ $post->getPhotoAndPreviewFileNames()['preview'] }}" alt="{{$post->title}}" />
        @endif

        @if ($post->getPhotoAndPreviewFileNames()['photo'] != '')
            </a>
        @endif

        <p class="date">{{ $post->dateAt }}</p>
        <h2 class="caption">{{ $post->title }}</h2>
        <div class="brief">{!! $post->brief !!}</div>

        <p>
            <a href="/blog/{{ $post->page_dir }}">Прочитати повністю
{{--
                <?php
                if ($vars["photosCount"] > 0) {
                ?>
                    (<?= $vars["photosCount"] ?> фото)
                <?php
                }
                ?>
--}}
            </a>
        </p>
    </div>
</div>
