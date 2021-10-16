
@if ($photo->isPhoto()) 
    @if ($photo->getWebFullFileName() !== null)
        <div><a href="{{ $photo->getWebFullFileName() }}">
    @endif

        @if ($photo->getWebFullPreviewFileName() == null)
            No preview
        @else
            <img src="{{ $photo->getWebFullPreviewFileName() }}" alt="{{ $photo->title }}>" title="{{ $photo->title }}" />
        @endif

    @if ($photo->getWebFullFileName() !== null)
        </a>
    @endif

    @if ($photo->title)
        <p>{{ $photo->title }}</p>
    @endif

    @if ($photo->getWebFullFileName() !== null)
        </div>
    @endif    
@elseif ($photo->isDescription()) {
    {{ $photo->text }}
@endif
