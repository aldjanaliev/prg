// блок с основными параметрами
let mainParams = $('.ostalos-voprosov_main-params');

// печатающийся текст
function printText(elemClass, text){
	new TypeIt(`${elemClass}`, {
		strings: [`${text}`],
		speed: 50,
	}).go();
}

// Тип помещения
let firstStepFlag = 0;
$('.js-quiz__question--1 input').on('change', function(){
	let printingText = $(this).data('printtext');
	printText('.buiding_type-result', printingText);	
	if(firstStepFlag == 0){
		printText('.param_height span', 'Высота потолков (м) - ');
		firstStepFlag++;
	}
})

// Высота потолков
$('.js-quiz__question--1 textarea').on('click input blur focus change', function(){
	let printingText = "";
	if ( $(this).val().length > 0 ) {
		printingText = $(this).val();		
	}
	printText('.result_height', printingText);
})

// Площадь квартиры
let secondStepFlag = 0;
$('#question-2-radio-2').on('change', function(){
	if($(this).prop('checked')){
		printText('.param_square_apartments .printed_text', 'Площадь квартиры (кв.м) —');
		printText('.buiding_type-result--1', 'квартиры');
		printText('.premises_type-result', 'квартиры');
		secondStepFlag++;
	}else{
		$('.param_square_apartments .printed_text').text('');
		$('.result_square_apartments').text('');
		printText('.buiding_type-result--1', '');
		printText('.premises_type-result', '');
		secondStepFlag = 0;
	}
})

$('#question-2-radio-1').on('change', function(){
	if($(this).prop('checked')){
		$('.param_square_apartments .printed_text').text('');
		$('.result_square_apartments').text('');
		$('#question-2-textarea-2').val('');
		secondStepFlag = 0;
	}
})

$('.js-quiz__question--2 textarea').on('click input blur focus change', function(){
	let printingText = "";
	if ( $(this).val().length > 0 ) {
		printingText = $(this).val();		
	}
	printText('.result_square_apartments', printingText);
})

// какие помещения и их площадь

let stepFlag_3 = 0;
let printingSquareText = '';
$('.q3-first input').on('change', function(){

	// сброс значений площади помещений
	stepFlag_3 = 0;
	printingSquareText = '';
	
	$('.param_square_other_premises .printed_text').text('');
	$('.result_square_other_premises').text('');
	$('.q3-first textarea').val('');
	
	// получение значений площади помещений
	printingSquareText = $(this).data('printtext');
	printingPremisesText = $(this).data('premises');
	// console.log('printingPremisesText = ' +printingPremisesText);
	if($(this).prop('checked')){		
		printText('.param_square_other_premises .printed_text', printingSquareText);
		stepFlag_3++;
	}
	printText('.premises_type-result', printingPremisesText);
	printText('.buiding_type-result--1', printingPremisesText);
})

$('.q3-first textarea').on('click input blur focus change', function(){
	let printingText = "";
	if ( $(this).val().length > 0 ) {
		printingText = $(this).val();		
	}
	printText('.result_square_other_premises', printingText);
})

// сколько санузлов и их площадь

let stepFlag_bathrooms = 0;
let printingSquareBathrooms = '';
$('.q3-second input').on('change', function(){

	// сброс значений площади помещений
	stepFlag_bathrooms = 0;
	printingSquareText = '';
	$('.param_square_bathrooms .printed_text').text('');
	$('.result_square_bathrooms').text('');
	$('.q3-second textarea').val('');

	if($(this).prop('checked')){		
		printText('.param_square_bathrooms .printed_text', 'Площадь санузлов (кв.м) —');
		stepFlag_bathrooms++;
	}
	//printText('.premises_type-result', 'жилых помещений');

})

$('.q3-second textarea').on('click input blur focus change', function(){
	let printingText = "";
	if ( $(this).val().length > 0 ) {
		printingText = $(this).val();		
	}
	printText('.result_square_bathrooms', printingText);
})

// дополнительные работы
let radiosDopFlag = 0;

$('#quiz__question-4_1 input').on('change', function(){
	// console.log('prop = ' + $(this).prop);
	
	// console.log('thisParam = ' + thisParam);
	let thisParam = $(this).data('param');
	if($(this).prop('checked')){

		if(radiosDopFlag == 0){
			printText('.dop-params--title', 'Перечень работ:');
			radiosDopFlag++;
		}	
		
		setTimeout(function () {
			$(`#${thisParam}`).slideDown('slow').css('display', 'flex');
			$(`.cost_calc-secondary--list #cost_${thisParam}`).slideDown('slow').css('display', 'flex');
		}, 500);		
	}

	let radios = $('#quiz__question-4_1 input');

	$.each(radios, function(index, val) {
		if( !$(radios[index]).prop('checked') ){
			let radiosIndexParam = $(radios[index]).data('param');
			$(`#${radiosIndexParam}`).slideUp('slow')
		}
	});

})

// вывод таблиц на странице результата
let florsRadio = $('.question-1-radio');
florsRadio.on('change', function(){
	$.each(florsRadio, function(index, val) {
		if ( $(florsRadio[index]).prop('checked') ) {
			if(index < 3){
				$('.raschet-tabs__img').hide();
				$('.raschet-tabs__img').eq(index).show();
				let spanText = $('.question-1-radio').eq(index).data('accent');
				$('.raschet-tables__header-text span').text(spanText);
			}	else{
				$('.raschet-tabs__img').eq(2).show();
			}
		}

	});


});