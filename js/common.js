$(function() {
	var lazyLoadInstance = new LazyLoad({
		elements_selector: ".lazy",
		effect : "fadeIn"
	});
	
	// маска для телефона
	$('[type="tel"]').inputmask('+7 (999) 999-99-99',
	{ 
		"greedy": true ,
		"digits": 9
	});

	$('.messenger input').on('change', function(){
		$('.mess_icon').removeClass('active');
		if($(this).prop('checked')){
			$(this).siblings('.mess_icon').addClass('active');
		}
	})

// склонение слов	['вариант', 'варианта', 'вариантов']
function sklonenie(number, txt) {
	var cases = [2, 0, 1, 1, 1, 2];
	return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

// страница результата
// console.log('start showResult');
function showResult(){

	$('body').trigger('resize');

	$('.js-quiz--result').removeClass('quiz-result--locked').removeClass('quiz-result--locked--animated').addClass('quiz-result--unlocked');
	$('body').removeClass('result_close');
	$('.quiz__footer').show();
	$('.js-quiz--result').animate({
		top: '0px'
	},'slow', function() {

		$('.js-quiz-questions').hide();
		$('.js-quiz--result').css('position', 'relative');
		$('.quiz-bg').removeClass('quiz-bg--last-question').addClass('quiz-bg--result');

	});

	$('html, body').animate({
		scrollTop: $(".cards-wrapper").offset().top
	}, 100);

	initSocSlider();
	
}
function initSocSlider(){
	$('#social_slider').not(".slick-initialized").slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		dots: true,
		autoplay: true,
		responsive: [
		{
			breakpoint: 575,
			settings: {
				slidesToShow: 3,
			}
		}
		]
	});
}


$('.masters_slider').not(".slick-initialized").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	rows: 1,
	variableWidth: !0,
	dots: true
});

// On after slide change

$('#social_slider').on('afterChange', function(event, slick, currentSlide, nextSlide){	
	$('.slick-slide').removeClass('slick-active-first slick-active-last slick-active-center');
	$('.slick-active').eq(1).addClass('slick-active-first');
	$('.slick-active').eq(2).addClass('slick-active-center');
	$('.slick-active').eq(3).addClass('slick-active-last');
}).trigger('afterChange');

$().fancybox({
	selector : '.social_slider .slick-slide:not(.slick-cloned)',
	backFocus : false
});

$(document).on('click', '.slick-cloned', function(e) {
	var $slides = $(this)
	.parent()
	.children('.slick-slide:not(.slick-cloned)');
	$slides
	.eq( ( $(this).attr("data-slick-index") || 0) % $slides.length )
	.trigger("click.fb-start", { $trigger: $(this) });
	return false;
});

// разделитель в цене
function setPoint(){
	$('.result-podborka__price-current-price span').not('.fix').each(function() {
		var ns = (parseInt(this.textContent) * 10).toString();
		var l = ns.length;
		if(ns.length == 3){
			ns = '0'+ ns;
			l = 4 ;
		}
		var first = (l % 3 === 0) ? 3 : l % 3;
		var s = ns.substr(0, first);
		for(var i=first; i<l; i+=3) {
			s += '.' + ns.substr(i, 3);
		}
		this.textContent = s;
		$(this).addClass('fix')
	})
}

$('.f_iframe, .modal_info').fancybox({
	autoFocus:false,
	transitionEffect: "fade",
	transitionDuration: 1000
});

$('.tnt_video-js').fancybox({
	autoFocus:false,
	transitionEffect: "fade",
	transitionDuration: 700
});

$('.inputs_group input').on('change', function(){	
	let parent = $(this).closest('.inputs_group');
	let radios = parent.find('input');
	let indexCounter = 0;
	if ( radios.length > 0 ) {
		$.each(radios, function(index, val) {
			if ( $(radios[index]).prop('checked') ) {
				indexCounter++;
			}	
		});
		if(indexCounter > 0){
			parent.siblings('label').find('.fake_checkbox').addClass('checked');
		}else{
			parent.siblings('label').find('.fake_checkbox').removeClass('checked');
		}
	}
})

$('.fake_checkbox').on('click', function(){	
	let fakeParent = $(this).closest('label');
	let fakeTextarea = fakeParent.siblings('.textarea_wrap');
	let inputQ = $(this).closest('.quiz__question');
	let inputParent = $(this).closest('.input_parent');
	let allTextarea = $('.textarea_wrap').slideUp( 'slow');

	fakeTextarea.slideToggle( 'slow');	
	inputQ.find('.input_parent').removeClass('active_fake').addClass('gray');
	inputParent.addClass('active_fake').removeClass('gray');
})
$('#question-4-checkbox-1, #question-4-checkbox-31').on('click', function(){
	$('.checkbox_parent').removeClass('active_fake');
})
$('.input_parent input').on('change', function(){	

	let inputQ = $(this).closest('.quiz__question');
	let inputParent = $(this).closest('.input_parent');

	// $('.input_parent').removeClass('active_fake');
	inputQ.find('.input_parent').removeClass('active').addClass('gray');
	inputQ.find('.textarea_wrap:not(.inputs_group)').slideUp( 'slow').removeClass('visible');


	if($(this).prop('checked') == true){
		inputParent.addClass('active').removeClass('gray');
		inputParent.find('.textarea_wrap').slideDown( 'slow').addClass('visible');;
		if($(this).closest('.textarea_wrap').siblings('label').find('.fake_checkbox').length > 0){
			$(this).closest('.textarea_wrap').closest('.input_parent').removeClass('gray').addClass('active');
		}
	}

	if($(this).prop('checked') == false){
		if(!inputParent.hasClass('checkbox_parent')){
			inputParent.removeClass('active gray');
		}		
		inputParent.find('.textarea_wrap').find('input').prop('checked', false);
	}

})
$('.input_parent textarea').on('click input blur focus change', function(){
	if ( $(this).val().length > 10 ) {
		// console.log($(this).val().length);
		$(this).closest('.textarea_wrap').siblings('label').find('.fake_checkbox').addClass('checked');
		$(this).closest('.textarea_wrap').closest('.input_parent').removeClass('gray').addClass('active');
		$('.js-question-4-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--4 .bottom-menu__btn-next').removeAttr('disabled');
	}else{
		$(this).closest('.textarea_wrap').siblings('label').find('.fake_checkbox').removeClass('checked');
		$(this).closest('.textarea_wrap').closest('.input_parent').removeClass('gray').removeClass('active');
		$('.js-question-4-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--4 .bottom-menu__btn-next').attr('disabled', 'disabled');
	}
})

let presenTextBlock = $('.get-user-phone__description b');

$('.question-5-radio').on('change', function(){
	let presenText = $(this).val().toLowerCase();
	presenTextBlock.text('+ подарок ' + presenText);
	if($('#question-5-radio-4').prop('checked')){
		$('.get-user-phone__description .a').show();
	}else{
		$('.get-user-phone__description .a').hide();
	}
})



$('.arrow_right').on('click', function(){
	$('.second__header').addClass('active');
	$('.header-mobile--container').addClass('active');
})


$(window).on("load resize", function(){
	let tntSlider = $('.tnt_videos');
	let initTntSlider = $('.tnt_videos.slick-initialized');
	var width = $(document).width();
	if (width > 992) {
		if (initTntSlider.length > 0) {
			tntSlider.slick('unslick');
		}			
	}
	else {
		tntSlider.not('.slick-initialized').slick({  
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: true,
			autoplay: true,
			dots: false,
			arrows: false,
			centerMode: true,
			responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					centerMode: true,
					variableWidth: true
				}
			}
			]
		});
	}
});

// формы, кнопки, инпуты
$('form button').addClass('disabled');
$('[type="tel"]').on('click input blur focus change keyup keydown', checkPhone);
function checkPhone() {
	if ( $(this).val().length >  1 && !$(this).val().includes('_') ) {
		$('form button').removeClass('disabled');
	}
	else{
		$('form button').addClass('disabled');
	}
}
let phoneInput = $('#consult_input');
let secondInputs = $('.second_input');
let succesModal = $('#consultation_thank_you');

// формы в модальном окне
$(".modal_window form").submit(function() {
	var th = $(this);
	let secondInputs = phoneInput.val();
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: th.serialize()
	}).done(function() {
		// console.log('send');
		parent.jQuery.fancybox.getInstance().close();
		$.fancybox.open(succesModal);
		setTimeout(function () {
			// $.fancybox.close();
		}, 3e3),
		th.trigger("reset");
	});
	return false;
});

// смена номера
let succesModalChange = $('#change_number_thank_you');
$('#changeNumber').submit(function() {
	var th = $(this);
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: th.serialize()
	}).done(function() {
		// console.log('send');
		$.fancybox.open(succesModalChange);
		setTimeout(function () {
			$.fancybox.close();
		}, 3e3),
		th.trigger("reset");
	});
	return false;
});

// запись на консультацию
$("#vieszd-inzhenera").submit(function() {
	var th = $(this);
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: th.serialize()
	}).done(function() {
		// console.log('send');
		$.fancybox.open(succesModal);
		setTimeout(function () {
			// $.fancybox.close();
		}, 3e3),
		th.trigger("reset");
	});
	return false;
});

let quizPhoneInput = $('.js-question-7-phone');

function openbox(){
	let inputArr = $('.more_arr');
	$(this).toggleClass('active');
	$(this).siblings('.hidden__text-wrap').slideToggle('swim');
	return false;
}
$('.more_arr').on('click', openbox);

$(function($){

	var progressAnimationComplete = false;

	// Header

	// js-header__cta-button scroll to quiz
	$('.js-header__cta-button').click(function(event) {
		var quizStartPosition = $('.quiz').offset().top;
		$('html, body').animate({
			scrollTop: quizStartPosition
		}, 500);
	});

	// фиксированная шапка
	window.scroll_top = 0
	$(document).ready(function(){
		
		$(window).scroll(function(){
			if($(window).width() < 1024){
				window.scroll_top_now = $(this).scrollTop();

				if ($(this).scrollTop() < 300  || window.scroll_top_now > $('.quiz-bg').offset().top - 100) {
					$('body').removeClass('header-active');
				}else{
					window.scroll_top_now < window.scroll_top ? $('body').addClass('header-active') : $('body').removeClass('header-active');
				}
				window.scroll_top = window.scroll_top_now;
			}
		});
		
	})

	// нижнее  меню
	$(window).scroll(function(event) {
		var visibilityEndPosition = $('.quiz-bg').offset().top - $(window).height() + 300;
		var scroll = $(window).scrollTop();
		if(! $('.bottom-menu').hasClass('bottom-menu--open') ){
			if(scroll > visibilityEndPosition){
				$('.bottom-menu').removeClass('bottom-menu--hidden');
			}else{
				$('.bottom-menu').addClass('bottom-menu--hidden');
			}
		}
	});

	// Video

	$(document).on("click", ".video-close", function(){
		$(".video-open").removeClass("video-open");
		media = document.querySelector('#video_full');
		media.pause();
		media.currentTime = 0;
	})
	$(document).on("click", ".video-close-always", function(){
		$(".video").remove()
	})
	$(document).on("click", ".video", function(e){
		if($(e.target).is(".video-close") || $(e.target).is(".video-close-always")) return false
			var vd = $(this)
		if(!vd.hasClass("video-open")){
			vd.addClass("video-open");
			media = document.querySelector('#video_full');
			media.play();
		}
	});


	// File input

	$('body').on('change', 'input[type="file"]', function (e) {
		var file_name = this.value.replace(/\\/g, '/').replace(/.*\//, ''),
		reader = new FileReader()
		parent_file_load = $(this).parents('.form-file')
		if(file_name){
			parent_file_load.addClass("select-file")
			parent_file_load.find('.file-text').text(file_name)
		}
	});

	// Prev / Next buttons

	// Prev button
	$('.question__prev-btn, .bottom-menu__btn-back').click(function(event) {
	// Big slides
	var thisSlideSelector = '.js-quiz__question--' + $(this).data('parent');
	var prevSlideSelector = '.js-quiz__question--' + (parseInt($(this).data('parent')) - 1);
	$(thisSlideSelector).addClass('quiz__question--hidden');
	$(prevSlideSelector).show();
	$(thisSlideSelector).fadeOut('slow');
	$( ".quiz__questions" ).animate({
		height: $(prevSlideSelector).height()
	}, 'slow', function(){
		$( ".quiz__questions" ).css('height', 'auto');
	});

	// Small slides
	var thisSlideSelectorSmall = '.js-bottom-menu__slide--' + $(this).data('parent');
	var prevSlideSelectorSmall = '.js-bottom-menu__slide--' + (parseInt($(this).data('parent')) - 1);
	$(thisSlideSelectorSmall).hide();
	$(prevSlideSelectorSmall).show();

	$('html, body').animate({
		scrollTop: $(".quiz__questions").offset().top
	}, 500);

});


// Next button
let forthSlideSelector = '.js-quiz__question--4';
$('.question__next-btn, .bottom-menu__btn-next').click(function(event) {
	var thisSlideSelector = '.js-quiz__question--' + $(this).data('parent');
	
	var nextSlideSelector = '';
	var nextStep = 0;
	
	if((thisSlideSelector == '.js-quiz__question--4') && $('#quiz__question-5_1').hasClass('no_gift_choise')){
// 		console.log('no_gift_choise');
		nextStep = '6';
		nextSlideSelector = '.js-quiz__question--6';
		$('.quiz-bg').addClass('quiz-bg--last-question');
		circleAnimationStart();
		$('.bottom-menu').hide();
		$('.quiz__footer').addClass('no_magrin');
	}else{
		nextStep = parseInt($(this).data('parent')) + 1;
		nextSlideSelector = '.js-quiz__question--' + nextStep;
	}
	
	//console.log('step =' + nextStep);
	if(nextStep < 6){
	    ym(85614994,'reachGoal', 'Q' + nextStep);
	    let step = 'Q' + nextStep;
	    gtag('event', 'step', {'event_category': 'steps', 'event_label': step,'value': '','non_interaction': true});
	}
	if(nextStep == 6){
	    ym(85614994,'reachGoal', 'contacts');
	    gtag('event', 'step', {'event_category': 'steps', 'event_label': 'contacts','value': '','non_interaction': true});
	}

	$(nextSlideSelector).fadeIn('slow', function(){
		$(thisSlideSelector).hide();
		$(this).removeClass('quiz__question--hidden').addClass('active');

	});
	$( ".quiz__questions" ).animate({
		height: $(nextSlideSelector).height()
	}, 'slow', function(){
		$( ".quiz__questions" ).css('height', 'auto');
	});

	// Small slides
	var thisSlideSelectorSmall = '.js-bottom-menu__slide--' + $(this).data('parent');
	var nextSlideSelector = '.js-bottom-menu__slide--' + (parseInt($(this).data('parent')) + 1);
	$(thisSlideSelectorSmall).hide();
	$(nextSlideSelector).show();

	$('html, body').animate({
		scrollTop: $(".quiz__questions").offset().top
	}, 500);

});
$('.js-quiz-submit').addClass('disabled');
$('.js-question-7-phone').keyup(function(event) {
	var this_val = $(this).val();
	this_val = this_val.replace(/-/gi, ''); 
	this_val = this_val.replace(/_/gi, '');
	this_val = this_val.replace(/\+/gi, ''); 
	this_val = this_val.replace(/\)/gi, '');
	this_val = this_val.replace(/\(/gi, '');
	this_val = this_val.replace(/\s/g, ''); 
	if(this_val.length !== 11){
		$('.js-quiz-submit').addClass('disabled');
	}else{
		$('.js-quiz-submit').removeClass('disabled');
	}
});
$('.js-quiz-submit').on('click', function(){
	let userPhone = $('.js-question-7-phone').val();

	// передаем  значение номра телефона в остальные формы
	$('.js-change-number-phone').val(userPhone);
	$('.js-change-number-phone').val(userPhone);
	$('.second_input').val(userPhone);

	// клонируем выбранные значения в форму
	let radios = $('.quiz-bg ').find('input');
	if ( radios.length > 0 ) {
		$.each(radios, function(index, val) {
			if ( $(radios[index]).prop('checked') ) {
				$(this).clone().appendTo('#quiz');
			}
		});
	}
	let textareas = $('.quiz-bg ').find('textarea');
	if ( textareas.length > 0 ) {
		$.each(textareas, function(index, val) {
			if ( $(textareas[index]).val() > 0) {
				$(this).clone().appendTo('#quiz');
			}
		});
	}
	// send_quiz отправка результата квиза
	var quizForm = $('#quiz');
	$.ajax({
		type: "POST",
		url: "mail.php",
		data: quizForm.serialize()
	}).done(function() {
		// console.log('data =' + quizForm.serialize());
		// console.log('send_quiz');
		ym(85614994,'reachGoal','contacts_sent');
		gtag('event', 'contacts_sent', {
          'event_category': 'form_send',
          'event_label': 'contacts',
          'value': '',
          'non_interaction': true
        });
		quizForm.trigger("reset");			
	});
	showResult();
})

// Cirle progress bar

var circle = document.querySelector('circle');
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;
percent = 0;
var progress_intervalID;

var animationStart = false;
function circleAnimationStart(){
	$(window).scroll(function(event) {
		var circleVisiblePosition = $('.get-user-phone').offset().top - 100;
		if(animationStart == false){
			if( ($(window).scrollTop() + $(window).height()) >  circleVisiblePosition){
				progress_intervalID = setInterval(setProgress, 30);
				animationStart = true;
			}
		}
	});
	$(window).trigger('scroll');
}

function setProgress() {
	percent++;
	if(percent<=100){

		const offset = circumference - percent / 100 * circumference;
		if(offset>=0){
			circle.style.strokeDashoffset = offset;
		}
		$('.progress-circle__value').text(percent + "%");
	}else{
		clearInterval(progress_intervalID);
		showCompleteSign();
		$('.js-quiz--result').addClass('quiz-result--locked--animated').show();
		progressAnimationComplete = true;
		$('.quiz__footer').hide();
	}

}

function showCompleteSign(){
	$('.progress-circle__complete').show();
	$('.progress-circle__value').hide();
	$('.after-get-user-phone').css('opacity', 1);
}

$('.q3-second textarea, .q3-first textarea, #question-1-textarea-2, #question-1-textarea-1, #question-2-textarea-2').on('click input blur focus change keyup keydown', function(){
	var preg = $(this).val();
	preg = preg.replace(/[^.,\d]/g, '');
	preg = preg.replace(/,/g, ".");
	$(this).val(preg);
});

$('#question-1-textarea-2, #question-1-textarea-1').on('click input blur focus change keyup keydown', function(){
	if($(this).val() > 5){
		$(this).addClass('notvalid').siblings('.error').slideDown();
		$('.js-question-1-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--1 button').attr('disabled', 'disabled');
	}
	if( ($(this).val() > 0 ) && ( $(this).val() <= 5) ) {
		$(this).removeClass('notvalid').addClass('valid').siblings('.error').slideUp();
		$('.js-question-1-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--1 button').removeAttr('disabled');
	}
	if(!$(this).val()){
		$(this).removeClass('notvalid valid').siblings('.error').slideUp();
		$('.js-question-1-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--1 button').removeAttr('disabled');
	}
});

$('.get-user-phone__button--wrap').on('click', function(){
	$('.get-user-phone__button--wrap').prepend('<span class="p_contact--error">Чтобы увидеть результат, введите ваш номер телефона</span>');
	setTimeout(function(){ $('.get-user-phone__button--wrap .p_contact--error').fadeOut().remove(); }, 3e3)
})

// Question 1
let resultHeight = 0;
$('.question-1-radio').change(function(event) {
	if($('.question-1-radio').is(':checked')){
		$('.js-question-1-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--1 .bottom-menu__btn-next').removeAttr('disabled');
		// $('.js-question-1-next-btn').trigger('click');		
	}else{
		$('.js-question-1-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--1 .bottom-menu__btn-next').attr('disabled', 'disabled');
	}
	


});
$('.question-1-radio').on('change', function() {
    // console.log('peregorodki');
   	if($('#question-1-radio-1').prop('checked')){
		$('.peregorodki').show();
	}else{
	    $('.peregorodki').hide();
	}
});
$('.js-question-1-next-btn, .bottom-menu__btn-next').on('click', function(){
	if( !$('#question-1-textarea-1').val()	&& !$('#question-1-textarea-2').val() ){
		printText('.result_height', '2.5');
		resultHeight = '2.5';
	}else{
		if($('#question-1-textarea-1').val() > 0){
			resultHeight = $('#question-1-textarea-1').val()
		}
		if($('#question-1-textarea-2').val() > 0){
			resultHeight = $('#question-1-textarea-1').val()
		}
	}
	$('.js-bottom-menu__slide--2 .bottom-menu__btn-next').addClass('disabled');
})

// Question 2

$('#question-2-textarea-2').on('click input blur focus change', function(){

	if ( ($(this).val().length > 1) &&  $('#question-2-radio-2').is(':checked')) {
		$('.js-question-2-next-btn').removeClass('disabled');
		
		$('.js-bottom-menu__slide--2 .bottom-menu__btn-next').removeClass('disabled');
		$(this).removeClass('notvalid').addClass('valid');
	}else if(!$(this).val()){
		$(this).removeClass('valid notvalid');
	}
	else{
		$('.js-bottom-menu__slide--2 .bottom-menu__btn-next').addClass('disabled');
		$('.js-question-2-next-btn').addClass('disabled');
		$(this).removeClass('valid').addClass('notvalid');
	}
});

$('.js-question-2-next-btn--wrap, .bottom-menu__btn-next--wrap').on('click', function(){
	if($('#question-2-textarea-2').val().length < 1){
		$('#question-2-textarea-2').removeClass('valid').addClass('notvalid');
	}
})
$('.js-bottom-menu__slide--2').on('click', function(){
	if($('#question-2-textarea-2').val().length < 1){
		$('#question-2-textarea-2').removeClass('valid').addClass('notvalid');
	}
	$('.js-bottom-menu__slide--3 .bottom-menu__btn-next').addClass('disabled');
})
$('.question-2-radio').change(function(event) {
	$('.js-question-2-next-btn').removeAttr('disabled');
	if($('#question-2-radio-1').is(':checked')){
		$('.js-question-2-next-btn').removeClass('disabled');
		$('.js-bottom-menu__slide--2 .bottom-menu__btn-next').removeClass('disabled');		
		// $('.js-question-2-next-btn').trigger('click');
	}else{
		$('.js-question-2-next-btn').addClass('disabled');
		$('.js-bottom-menu__slide--2 .bottom-menu__btn-next').addClass('disabled');
	}
	if($('#question-2-radio-1').is(':checked')){
		$('.q3-second').hide();
		$('.q3-first').show();
	}
	if($('#question-2-radio-2').is(':checked')){
		$('.q3-second').show();
		$('.q3-first').hide();
	}
});

// очищаем предыдущий шаг
$('.js-question-2-prev-btn, .js-bottom-menu__slide--2 .bottom-menu__btn-back').click(function(event) {
	$('.question-1-radio').prop('checked', false);
	$('.question-2-radio').prop('checked', false);
	$('.js-question-1-next-btn').attr('disabled', 'disabled');
	$('.js-bottom-menu__slide--1 .bottom-menu__btn-next').attr('disabled', 'disabled');
	$('.printing_item param_height .printed_text').text('');
	$('.js-quiz__question--1 textarea').removeClass('valid notvalid').val('');
	$('.js-quiz__question--1 .input_parent').removeClass('active gray');
	$('.js-quiz__question--1 .textarea_wrap').slideUp();
});

// Question 3

$('.js-question-3-next-btn--wrap, .js-bottom-menu__slide--3 .bottom-menu__btn-next--wrap').on('click', function(){
	if($('#quiz__question-3_1 .visible textarea').val().length < 1){
		$('#quiz__question-3_1 textarea').removeClass('valid notvalid');
		$('#quiz__question-3_1 .visible textarea').removeClass('valid').addClass('notvalid');
	}
})

$('#quiz__question-3_1 textarea').on('click input blur focus change', function(){
	if ( ($(this).val().length > 0) &&  $('.question-3-radio').is(':checked')) {
		$('.js-question-3-next-btn').removeAttr('disabled');
		$('.js-question-3-next-btn').removeClass('disabled');
		$('.js-bottom-menu__slide--3 .bottom-menu__btn-next').removeClass('disabled');
		$('#quiz__question-3_1 textarea').removeClass('notvalid').addClass('valid');
	}else if(!$(this).val()){
		$('#quiz__question-3_1 textarea').removeClass('valid notvalid');
	}else{
		$('.js-question-3-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--3 .bottom-menu__btn-next').addClass('disabled');
		$('#quiz__question-3_1 textarea').removeClass('valid').addClass('notvalid');
	}
});

$('.question-3-radio').change(function(event) {
	if($('.question-3-radio').is(':checked') && ($('.q3-second textarea').val().length > 0)){
		
		$('.js-question-3-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--3 .bottom-menu__btn-next').removeClass('disabled');

		// $('.js-question-3-next-btn').trigger('click');
	}else{
		$('.js-question-3-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--3 .bottom-menu__btn-next').addClass('disabled');
	}

	// question-3-radio-3
	if($('#question-3-radio-3').is(':checked')){
		$('.not_for_bathroom').hide();
		$('.not_for_another').show();
	}else{
		$('.not_for_another').hide();
		$('.not_for_bathroom').show();
	}

	// проверка на подарок
	if($('#question-2-textarea-2, .quiz__question-3_1 textarea').val() < 30){
		$('#quiz__question-5_1').addClass('no_gift_choise');
		$('#question-5-radio-4').prop('checked','checked');
		// $('.quiz-buttons button').data('parent', '6');
	}else{
		$('#quiz__question-5_1').removeClass('no_gift_choise');
		$('#question-5-radio-4').removeProp('checked');
	}
});


// очищаем предыдущий шаг
$('.js-question-3-prev-btn, .js-bottom-menu__slide--3 .bottom-menu__btn-back').click(function(event) {
	$('.js-quiz__question--2 input').prop('checked', false);
	$('.js-quiz__question--3 input').prop('checked', false);
	$('.js-question-2-next-btn, .js-bottom-menu__slide--2 .bottom-menu__btn-next').addClass('disabled');
	$('.param_square_other_premises .printed_text').text('');
	$('.result_square_other_premises').text('');
	$('.js-quiz__question--2 textarea').val('').removeClass('valid notvalid');;
	$('.js-quiz__question--2 .textarea_wrap').slideUp();
	$('.js-quiz__question--2 .input_parent').removeClass('active gray');
});

// Question 4

$('.question-4-checkbox, .question-4-radio').change(function(event) {
	
	if($(this).is(':checked')){
		$('.js-question-4-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--4 .bottom-menu__btn-next').removeAttr('disabled');
		// $('.js-question-4-next-btn').trigger('click');
	}else{
		$('.js-question-4-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--4 .bottom-menu__btn-next').attr('disabled', 'disabled');
	}

});


// очищаем предыдущий шаг
$('.js-question-4-prev-btn, .js-bottom-menu__slide--4 .bottom-menu__btn-back').click(function(event) {
	$('#quiz__question-3_1 input').prop('checked', false);
	$('#quiz__question-4_1 input').prop('checked', false);
	$('.checkbox_parent').removeClass('active_fake');
	$('.fake_checkbox').removeClass('checked');
	$('.param_square_other_premises .printed_text').text('');
	$('.param_square_bathrooms .printed_text').text('');
	$('.js-question-3-next-btn').addClass('disabled');
	$('.js-bottom-menu__slide--3 .bottom-menu__btn-next').addClass('disabled');
	$('#quiz__question-3_1 .input_parent').removeClass('gray active');
	$('.result_square_other_premises').text('');
	$('.result_square_bathrooms').text('');
	$('#quiz__question-3_1 textarea').val('').removeClass('valid notvalid');
	$('#quiz__question-3_1 .textarea_wrap ').slideUp();
});

// Question 5

$('.question-5-radio').change(function(event) {
	if($('.question-5-radio').is(':checked')){
		$('.js-question-5-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--5 .bottom-menu__btn-next').removeAttr('disabled');
		// $('.js-question-5-next-btn').trigger('click');
	}else{
		$('.js-question-5-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--5 .bottom-menu__btn-next').attr('disabled', 'disabled');
	}
});


// очищаем предыдущий шаг
$('.js-question-5-prev-btn, .js-bottom-menu__slide--5 .bottom-menu__btn-back').click(function(event) {
	$('#quiz__question-4_1 input').prop('checked', false);
	$('.js-question-4-next-btn').attr('disabled', 'disabled');
	$('.js-bottom-menu__slide--4 .bottom-menu__btn-next').attr('disabled', 'disabled');
	$('#quiz__question-4_1 .input_parent').removeClass('gray active');
	$('#quiz__question-4_1 textarea').val('').removeClass('valid notvalid');
	$('#quiz__question-4_1 .textarea_wrap ').slideUp();
});

// $('.js-question-4-next-btn').on('click', function(){
// 	if($('#quiz__question-5_1').hasClass('no_gift_choise')){
// 		$('.js-question-5-next-btn').removeAttr('disabled');
// 		$('.js-bottom-menu__slide--5 .bottom-menu__btn-next').removeAttr('disabled');
// 		$('.js-question-5-next-btn').trigger('click');
// 	}
// })

// Question 6

$('.question-6-radio').change(function(event) {
	if($('.question-6-radio').is(':checked')){
		$('.js-question-6-next-btn').removeAttr('disabled');
		$('.js-bottom-menu__slide--5 .bottom-menu__btn-next').removeAttr('disabled');
		// $('.js-question-6-next-btn').trigger('click');
	}else{
		$('.js-question-6-next-btn').attr('disabled', 'disabled');
		$('.js-bottom-menu__slide--5 .bottom-menu__btn-next').attr('disabled', 'disabled');
	}
});


$('.js-question-5-next-btn, .js-bottom-menu__slide--5 .bottom-menu__btn-next').click(function(event) {
	$('.quiz-bg').addClass('quiz-bg--last-question');
	circleAnimationStart();
	$('.bottom-menu').hide();
	$('.quiz__footer').addClass('no_magrin');
});


// очищаем предыдущий шаг
$('.js-question-6-prev-btn, .js-bottom-menu__slide--6 .bottom-menu__btn-back').click(function(event) {
	$('#quiz__question-5_1 input').prop('checked', false);
	$('.js-question-5-next-btn').attr('disabled', 'disabled');
	$('.js-bottom-menu__slide--5 .bottom-menu__btn-next').attr('disabled', 'disabled');
	$('#quiz__question-5_1 .input_parent').removeClass('gray active');
	$('#quiz__question-5_1 textarea').val('').removeClass('valid notvalid').slideUp();
});

// Result
function calcResult(){
	// параметры вычислений
	// результат
	let allResult = 0;
	// общая площадь
	let allSquare = 0;
	// жилая площадь
	let zhilSquare = 0;
	// стоимость ремонта в жилых помещениях
	let zhilSquareCost = 6500;
	let zhilSquareRes = 0;
	let bathroomsSquareRes = 0;
	let bathroomsSquareCost = 50000;
	let premisesSquare = 0;
	let premisesSquareCost = 0;
	let skidka = 0;

	// площадь санузлов
	let bathroomsSquare = 0;
	let bathroomsTextarea = 	$('.q3-second textarea');
	$.each(bathroomsTextarea, function(index, val) {
		if($(bathroomsTextarea[index]).val() > 0){
			bathroomsSquare = $(bathroomsTextarea[index]).val() 
		}
	});
	
	// площадь жилых помещений (частичный ремонт)
	let premisesTextarea = 	$('.q3-first textarea:not(#question-3-textarea-3)');

	$.each(premisesTextarea, function(index, val) {
		if($(premisesTextarea[index]).val() > 0){
			premisesSquare = $(premisesTextarea[index]).val() 
		}
	});

	if(premisesSquare >= 10){
		premisesSquareCost = 7500;
	}else{
		premisesSquareCost = 12500;
	}	

	////////////////////////////////////////
	// расчет стоимости комлексный ремонт
	////////////////////////////////////////
	allSquare = $('#question-2-textarea-2').val();	

	zhilSquare += (allSquare - bathroomsSquare);
	// console.log('площадь санузлов = ' + bathroomsSquare);
	// console.log('общая площадь = ' + allSquare);
	// console.log('жилая площадь = ' + zhilSquare);

	// потолки
	if($('#question-4-checkbox-1').prop('checked')){
		zhilSquareCost += 1500;
		premisesSquareCost += 1500;
	}
	if($('#question-4-radio-2').prop('checked')){
		zhilSquareCost += 2000;
		premisesSquareCost += 2000;
	}
	if($('#question-4-radio-3').prop('checked')){
		zhilSquareCost += 1800;
		premisesSquareCost += 1800;
	}

	// стены
	if($('#question-4-checkbox-3-1').prop('checked')){
		zhilSquareCost += 2000;
		premisesSquareCost += 2000;
	}
	if($('#question-4-checkbox-3-2').prop('checked')){
		zhilSquareCost += 1200;
		premisesSquareCost += 1200;
	}
	if($('#question-4-checkbox-3-4').prop('checked')){
		zhilSquareCost += 2000;
		premisesSquareCost += 2000;
	}

	// полы
	if($('#question-4-checkbox-4-1').prop('checked')){
		zhilSquareCost += 500;
		premisesSquareCost += 500;
	}
	if($('#question-4-radio-7').prop('checked')){
		zhilSquareCost += 1000;
		premisesSquareCost += 1000;
	}
	if($('#question-4-radio-9').prop('checked')){
		zhilSquareCost += 300;
		premisesSquareCost += 300;
	}
	if($('#question-4-radio-10').prop('checked')){
		zhilSquareCost += (-200);
		premisesSquareCost += (-200);
	}
	if($('#question-4-radio-11').prop('checked')){
		zhilSquareCost += (-150);
		premisesSquareCost += (-150);
	}

	// Электрика
	if($('#question-4-radio-12').prop('checked')){
		zhilSquareCost += 1500;
		premisesSquareCost += 1500;
	}

	////////////////////////////////////////
	// расчет стоимости частичный ремонт
	////////////////////////////////////////

	let bathroomSquare = 0;
	let bathroomSquareCost = 40000;
	
	if($('#question-3-radio-3').prop('checked')){
		console.log('bathroomSquare = ' + bathroomSquare);
		bathroomSquare = $('#question-3-textarea-3').val();
	}
	
	// потолки
	if($('#question-4-radio-1').prop('checked')){
		bathroomSquareCost += 400;
	}
	if($('#question-4-radio-2').prop('checked')){
		bathroomSquareCost += (-400);
	}
	// стены
	if($('#question-4-radio-4_1s').prop('checked')){
		bathroomSquareCost += 2000;
	}
	if($('#question-4-radio-4_2s').prop('checked')){
		bathroomSquareCost += (-10000);
	}

	// Коммуникации
	if($('#question-4-radio-12').prop('checked')){
		bathroomSquareCost += 10000;
	}

	if($('#question-4-radio-2_7').prop('checked')){
		bathroomSquareCost += (-5000);
	}

	if($('#question-4-radio-14').prop('checked')){
		bathroomSquareCost += 30000;
	}
	if($('#question-4-radio-15').prop('checked')){
		bathroomSquareCost += 10000;
	}

	// Сантехника
	let santekhnikaCounter = 0;
	let santekhnikaCost = 0;
	let santekhnikaInput = 	$('.santekhnika_group input');
	$.each(santekhnikaInput, function(index, val) {
		if($(santekhnikaInput[index]).prop('checked')){
			santekhnikaCounter++;
			console.log('сантехника кол-во позиций = ' + santekhnikaCounter);
		}		
	});
	if(santekhnikaCounter > 0){
		santekhnikaCost += (santekhnikaCounter * 4000);
		console.log('стоимость сантехники = ' + santekhnikaCost);
	}
	bathroomSquareCost+= santekhnikaCost;

	if($('#question-4-checkbox-1').prop('checked')){
		if(bathroomSquare <= 3){
			bathroomSquareCost += 10000;
		}else{
			bathroomSquareCost += 20000;
		}		
	}	

	premisesSquareCost

	premisesSquareRes = (premisesSquare * premisesSquareCost);
	// console.log('площадь ж/п = ' + premisesSquare);
	// console.log('цена за метр для ж/п  = ' + premisesSquareCost);
	// console.log('стоимость ремонта ж/п  = ' + premisesSquareRes);

	bathroomSquareRes = (bathroomSquare * bathroomSquareCost);
	// console.log('площадь санузла = ' + bathroomSquare);
	// console.log('цена за метр для санузла = ' + bathroomSquareCost);
	// console.log('стоимость ремонта санузла = ' + bathroomSquareRes);


	zhilSquareRes = (zhilSquare  * zhilSquareCost);
	bathroomsSquareRes = (bathroomsSquare * bathroomsSquareCost );
	// console.log('стоимость ремонта 1 м² жилых помещений = ' + zhilSquareCost);	
	// console.log('стоимость ремонта  жилых помещений = ' + zhilSquareRes);	
	// console.log('стоимость ремонта санузлов = ' + bathroomsSquareRes);

// 	if($('#question-2-radio-2').prop('checked')){
// 		allResult += zhilSquareRes + bathroomsSquareRes;
// 		if(allResult > 0){
// 			skidka = allResult * .2;
// 			$('.first_price').text(allResult - skidka);
// 			$('.second_price').text(allResult);
// 			$("[name='Итоговая стоимость']").val((allResult - skidka) + '  -  ' +allResult);
			
// 		}
// 	}
	// ванина просьба
	if($('#question-2-radio-2').prop('checked')){
		allResult += zhilSquareRes + bathroomsSquareRes;
		if(allResult > 0){
			console.log('результат = ' + allResult);
			skidka = allResult / 1.5;
			console.log('результат /1.5 = ' + skidka);
			$('.first_price').text(Math.round(skidka));
// 			$('.second_price').text(allResult);
			$("[name='Итоговая стоимость']").val(Math.round(skidka));
			
		}
	}

// 	if($('#question-2-radio-1').prop('checked')){
// 		if($('#question-3-radio-3').prop('checked')){
// 			allResult += bathroomSquareRes;
// 		}else{
// 			allResult += premisesSquareRes;
// 		}
// 		if(allResult > 0){
// 			skidka = allResult * .2;
// 			$('.first_price').text(allResult);
// 			$('.second_price').text(allResult + skidka);
// 			$("[name='Итоговая стоимость']").val(allResult + '  -  ' + (allResult + skidka));
// 		}
		
// 	}
// ванина просьба	
	if($('#question-2-radio-1').prop('checked')){
		if($('#question-3-radio-3').prop('checked')){
			allResult += bathroomSquareRes;
		}else{
			allResult += premisesSquareRes;
		}
		if(allResult > 0){
		    console.log('результат = ' + allResult);
			skidka = allResult / 1.5;
			console.log('результат /1.5 = ' + skidka);
			$('.first_price').text(Math.round(skidka));
// 			$('.second_price').text(allResult + skidka);
			$("[name='Итоговая стоимость']").val(Math.round(skidka));
		}
		
	}
	// console.log('стоимость всего ремонта = ' + allResult);	
	

}
$('.quiz__question input').on('change', function(event) {
	calcResult();
})

//start  дата в акции
var options = {
	month: 'long',
	day: 'numeric',
};
let addDays = 45;
let date = new Date();
date.setDate(date.getDate() + addDays);
let m = date.getMonth()+1;
let d = date.getDate();
date = date.toLocaleString("ru", options)
$('.JSdate').html( date );

let addDays2 = 5;
let date2 = new Date();
date2.setDate(date2.getDate() + addDays2);
let m2 = date2.getMonth()+1;
let d2 = date2.getDate();
date2 = date2.toLocaleString("ru", options)
$('.JSdate2').html( date2 );
//end  дата в акции

});
$(document).ready(function()  {

	// вставка дефолтного изображения для ютуба
	$(".youtube").each(function() {
		$(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');
		$(this).append($('<div/>', {'class': 'play'}));
		$(document).delegate('#'+this.id, 'click', function() {
			var iframe_url = "https://www.youtube.com/embed/" + this.id + "?&autohide=1";
			if ($(this).data('params')) iframe_url+='&'+$(this).data('params')+'&rel=0';
			var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() ,'allow':'fullscreen'})
			$(this).replaceWith(iframe);
		});
	});
});
setTimeout(function(){ }, 3000);



// видео на странице контактов
$('.get-user-phone__iphone').on('click', function(){
	// console.log('click');
	$('.video_result').css('opacity', '1')
})

// отправка в амо
// $('form').submit(function() { 
// 	let th = $(this);
// 	$.ajax({
// 		type: "POST",
// 		url: "mail-a.php",
// 		data: th.serialize()
// 	}).done(function() {

// 	});
// });

	// scro_to_top
	$('.go_to').click(function() {
		var scroll_el = $(this).attr('href');
		if ($(scroll_el).length != 0) {
			$('html, body').animate({
				scrollTop: ($(scroll_el).offset().top - 50)
			}, 500)
		}
		return !1
	});

// pdf_link
let var_1 = $('#question-1-radio-1');
let var_2 = $('#question-1-radio-2');
let var_3 = $('#question-2-radio-1');
let var_4 = $('#question-2-radio-2');

var_3.on('change', function(){
	if($(this).prop('checked')){
		if(var_1.prop('checked')){
// 			console.log('Новостройка');
			$('.pdf_link').hide();
			$('.pdf_link.var_1_2').show();
		}
		if(var_2.prop('checked')){
// 			console.log('Вторичка');
			$('.pdf_link').hide();
			$('.pdf_link.var_2_2').show();
		}
	}
});
var_4.on('change', function(){
	if($(this).prop('checked')){
		if(var_1.prop('checked')){
			// console.log('Ремонт отдельных помещений');
			$('.pdf_link').hide();
			$('.pdf_link.var_1_1').show();
		}
		if(var_2.prop('checked')){
			// console.log('Ремонт всей квартиры');
			$('.pdf_link').hide();
			$('.pdf_link.var_2_1').show();
		}
	}
});
$('form button').on('click', function(){
    $(this).addClass('disabled')
})

$('#modal-1 .btn-ajax').on('click', function(){
    gtag('event', 'consultation_form', {
      'event_category': 'form_send',
      'event_label': 'consultation',
      'value': '',
      'non_interaction': true
    });
})

	$(window).scroll(function(event) {

		var scroll = $(window).scrollTop();
		if($(window).width() < 1416){
			var visibilityEndPosition = $('.js-quiz-questions').offset().top - $(window).height();
		}
		
		if(scroll > visibilityEndPosition){
			$(".video").hide();
// 			media = document.querySelector('#video_full');
// 			media.pause();
			$('.video').removeClass('video-open');
		}else{
			$(".video").show();
		}


	});
	
})
