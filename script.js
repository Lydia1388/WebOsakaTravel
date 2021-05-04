$(function(){
  $('.carousel-item').eq(0).addClass('active');
  var total = $('.carousel-item').length;
  var current = 0;
  $('#moveRight').on('click', function(){
    var next=current;
    current= current+1;
    setSlide(next, current);
  });
  $('#moveLeft').on('click', function(){
    var prev=current;
    current = current- 1;
    setSlide(prev, current);
  });
  function setSlide(prev, next){
    var slide= current;
    if(next>total-1){
     slide=0;
      current=0;
    }
    if(next<0){
      slide=total - 1;
      current=total - 1;
    }
           $('.carousel-item').eq(prev).removeClass('active');
           $('.carousel-item').eq(slide).addClass('active');
      setTimeout(function(){

      },800);
    

    
    console.log('current '+current);
    console.log('prev '+prev);
  }
});


//--------------- sakura------------------//
const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = false; // Auto scroll
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
  // Get current class
  const current = document.querySelector('.current');
  // Remove current class
  current.classList.remove('current');
  // Check for next slide
  if (current.nextElementSibling) {
    // Add current to next sibling
    current.nextElementSibling.classList.add('current');
  } else {
    // Add current to start
    slides[0].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
  // Get current class
  const current = document.querySelector('.current');
  // Remove current class
  current.classList.remove('current');
  // Check for prev slide
  if (current.previousElementSibling) {
    // Add current to prev sibling
    current.previousElementSibling.classList.add('current');
  } else {
    // Add current to last
    slides[slides.length - 1].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
};

// Button events
next.addEventListener('click', e => {
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener('click', e => {
  prevSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

// Auto slide
if (auto) {
  // Run next slide at interval time
  slideInterval = setInterval(nextSlide, intervalTime);
}


//----------------- usj--------------------//
Init();

$(window).resize(function(){
	Init();
});

function Init(){
	if($('#preview').length==0){
		$SlideHeight = $('#MsMmSlider').height();
		$DivNum = $('#MsMmSlider>div').length;
	}else{
		$SlideHeight = $('#items').height();
		$DivNum = $('#items>div>div').length;
	}
	$SliderHeight = $DivNum*$SlideHeight;
	$NewScrollTop = $CurrSl = 0;
	$SlNum = $DivNum-1;
	$AnimInProgress = false;

	if($('#preview').length==0){
		
		$("#MsMmSlider").wrapInner('<div id="items" class="col"><div></div></div>');
		$('<div id="preview" class="col"><div></div></div>').appendTo("#MsMmSlider");
		
		for(ct=1;ct<=$DivNum;ct++){
			Origine = $('#items').find('div>div:nth-child('+ct+')');
			ThisColor = Origine.attr('data-color');
			ThisImg = Origine.attr('data-img');
			Origine.find('strong').css('color',ThisColor);
			Origine.find('a').css('background',ThisColor);
			$( '<div class="vis"><img src="'+ThisImg+'" alt=""></div>' ).prependTo("#preview>div");
		}
	}
	
	$("#items>div").scrollTop(0);
	$("#preview>div").scrollTop($SliderHeight);
	
	var indicator = new WheelIndicator({elem:document.querySelector('#MsMmSlider'),callback: function(e){ ScrollMe(e.direction); }});
	indicator.getOption('preventMouse');	
}

function ScrollMe(Direction){
	if($AnimInProgress==false){
		if(Direction=='down' && $CurrSl<$SlNum){
			$AnimInProgress=true;$CurrSl+=1;$TranslateOrigin='100%';
		}else if(Direction=='up' && $CurrSl>0){
			$AnimInProgress=true;$CurrSl-=1;$TranslateOrigin='-100%';
		}else{
			$AnimInProgress=false;exit;
		}		
		$NewScrollTop = $CurrSl*$SlideHeight;
		$NewAltScrollTop = $SliderHeight-(($CurrSl+1)*$SlideHeight);
	
		//alert($CurrSl+1);
		$Percent = (100 / ($DivNum-1)) * ($CurrSl );
		//$('#Indic').height($Percent+"%");
		$ColorCible = $(".col:nth-child(1)>div>div:nth-child("+($CurrSl+1)+")").attr('data-color');
		TweenMax.to($("#Indic>*"),0.6,{height:$Percent+"%",backgroundColor:$ColorCible,ease:Expo.easeOut});
		$("#Indic>*>*").html(($CurrSl+1)+" &ndash; "+$DivNum).css('color',$ColorCible);
		
		TweenMax.to($(".col:nth-child(1)>div"),0.6,{scrollTo:{x:0,y:$NewScrollTop},ease:Expo.easeOut});
		TweenMax.to($(".col:nth-child(2)>div"),0.6,{scrollTo:{x:0,y:$NewAltScrollTop},ease:Expo.easeOut,onComplete:function(){
			$AnimInProgress=false;
		}});
	}
}