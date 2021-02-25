$(function () {
	let introH = $('#intro').innerHeight()
	let header = $('#header')
	let scrollOffset = $(window).scrollTop()

	//Fixed Header =================================================================================================
	checkScroll(scrollOffset)

	$(window).on('scroll', function () {
		scrollOffset = $(this).scrollTop()
		checkScroll(scrollOffset)
	})



	function checkScroll(scrollOffset) {
		if (scrollOffset >= introH) {
			header.addClass('fixed')
		}
		else {
			header.removeClass('fixed')
		}
	}


	//Smooth Scroll =================================================================================================
	$('[data-scroll]').on('click', function (event) {
		event.preventDefault
		let $this = $(this)
		let elementId = $this.data('scroll')
		let elementOffset = $(elementId).offset().top

		$('#nav1 a').removeClass('active')

		$this.addClass('active')

		$('html, body').animate({
			scrollTop: elementOffset
		}, 500)
	})

	//menuNavToggle ==================================================================================================
	$('#nav-toggle').on('click', function (event) {
		event.preventDefault()
		let $burger = $(this)
		let elementBurger = $burger.toggleClass('active')
		$('#nav1').toggleClass('active')
	})

	//Collapse =======================================================================================================
	$('[data-collapse]').on('click', function (event) {
		event.preventDefault()
		let $this = $(this),
			blockId = $this.data('collapse')
		$(blockId).slideToggle()
	})

	//Slider ============================================================================================================
	$('[data-slider]').slick({
		infinite: true,
		fade: false,
		slidesToShow: 1,
		slidesToScroll: 1
	})

})
