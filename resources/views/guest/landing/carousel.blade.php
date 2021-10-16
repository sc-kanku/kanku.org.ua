<div id="myCarousel" class="carousel slide" data-bs-ride="carousel_" data-bs-interval="5000" data-bs-wrap="true">
    <div class="carousel-inner">
        <!--div class="carousel-item active">
			<img class="first-slide header-image" src="/images/carousel/new-year-2018.jpg" alt="">
		</div-->

        <div class="carousel-item active">
            <!--img class="first-slide header-image" src="/images/carousel/KMtBgds-7jI.jpg" alt=""-->


            <video style="  
			 	width: 100%    !important;
  				height: auto   !important;" controls currentTime="3" poster="/video/promo-poster.jpg">
                <source src="/video/promo.mp4" type="video/mp4">

            </video>

            <!--
			<div style="
	position: relative;
	padding-bottom: 56.25%; /* 16:9 */
	height: 0;">


<iframe style ="
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
" src="https://www.youtube-nocookie.com/embed/q3NmbxqGK8A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>
			-->


            <div class="container">
                <!--
				<div class="row highlight">
					<div class="col-3" id="slogan">
						<p class=" d-none d-md-block">26 років Шляху. </br> Приєднуйтесь!</p>
					</div>

					<div class="col-3" id="brief">
						<div class="d-none d-lg-block text-left carousel-caption" >
							<p><span>✓</span> 45 залів у Львові та області.</p>
							<p><span>✓</span> 30 інструкторів.</p>
							<p><span>✓</span> Понад 2000 спортсменів.</p>
						</div>
					</div>
				</div>-->
            </div>
        </div>
    </div>

</div>

<span id="more" /></span>

<script type="text/javascript">
    function goToByScroll(id) {
        // Scroll
        $('html,body').animate({
                scrollTop: $(id).offset().top
            },
            'slow');
    }

    function bind() {
        $("#myCarousel a[href='#more']").click(function(e) {
            // Prevent a page reload when a link is pressed
            e.preventDefault();
            // Call the scroll function
            goToByScroll($(this).attr("href"));
            return false;
        });
    }

    function postponeBinding() {
        if (typeof $ == "undefined") {
            setTimeout(postponeBinding, 1000);
        } else {
            bind();
        }
    }

    postponeBinding();
</script>