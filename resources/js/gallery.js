let galleryCurrentImagePointer = null;

function /*private*/ showLargPhotoForThumbNode(thumbNode) {
	let bigPhotoUrl = thumbNode.find('a').attr('href');

	$('#gallery-photo-template').find('img').attr('src', bigPhotoUrl);

	galleryCurrentImagePointer = thumbNode;
}

function galleryShow(e) {
	showLargPhotoForThumbNode($(this).closest("div"));

	$('#gallery-wrapper').show();

	e.preventDefault();

	return false;
}

function galleryPrev() {
	let prevNode = galleryCurrentImagePointer.prev();

	if (prevNode.length == 0) {
		prevNode = $('.gallery div:last-child');
	}

	showLargPhotoForThumbNode(prevNode);
}

function galleryNext() {
	let nextNode = galleryCurrentImagePointer.next();

	if (nextNode.length == 0) {
		nextNode = $('.gallery div:first-child');
	}

	showLargPhotoForThumbNode(nextNode);
}

function galleryClose() {
	$('#gallery-wrapper').hide();
	$('#gallery-photo-template').find('img').attr("src", "");
}


function setBinding() {
	$(".gallery").on("click", "img", galleryShow);

	$("#gallery-close").on("click", galleryClose);

	$("#gallery-prev").off();
	$("#gallery-next").off();

	$("#gallery-prev").on("click", galleryPrev);
	$("#gallery-next").on("click", galleryNext);

}

function postponeBindingExec() {
	if (typeof $ == "undefined") {
		setTimeout(postponeBindingExec, 1000);			 
	} else {
		setTimeout(setBinding, 2000);
	}
}

postponeBindingExec();
