define(['jquery','TweenMax','utils','slick-carousel'],function($,TweenMax,utils,slick){
	var Scheme = function customSlick() {},
	proto = Scheme.prototype;

	proto.init = function($dom,dtd){
		this.$dom = $dom;
		// console.log('init');

		this.nowW = window.innerWidth ? window.innerWidth : $window.width();
		if(this.nowW>=641){
			this.state = 'desktop';
		}else{
			this.state = 'mobile';
		}
		
		dtd.resolve();
		this.initSlick();
	};

	proto.initSlick = function(){
		var localThis = this;
		this.slickContainer = this.$dom.find('.custom-slick').each(function(index){
			var tmpThis = $(this);
			tmpThis.on('init',function(e){
				requestAnimationFrame(function(){
					localThis.slickInstance = e.target.slick;
					localThis.setUpTracking();
				});
			});
			tmpThis.slick(tmpThis.data('slick'));
			setTimeout(function(){
				$(window).trigger('resize');
			},1500);
		});

	};

	proto.setUpTracking = function(){
		var localThis = this;
		this.trackingAction = 'Click';

		this.dotsTrackingLable = 'Breadcrumbs Nav';

		if(!platform.isDesktop){
			this.trackingAction = 'Tap';
			this.dotsTrackingLable = 'Progress dots';

			this.slickContainer.on('swipe',function(e,dir){
				nowIndex = localThis.getNowIndex(localThis.slickInstance.currentSlide);
				G.track('Cloud tech slideshow', localThis.trackingAction, 'Swipe Nav', 'Slide '+nowIndex);
			});
		}

		this.slickContainer.on('breakpoint',function(event, slick, breakpoint){
			// console.log(event,slick,breakpoint);
			localThis.slickInstance = slick;
			localThis.updateEvent();
		});

		localThis.updateEvent();
	};

	proto.updateEvent = function(){
		var localThis = this;
		var nowIndex;

		this.slickInstance.$nextArrow.on('click',function(){
			nowIndex = localThis.getNowIndex(localThis.slickInstance.currentSlide);
			G.track('Cloud tech slideshow', localThis.trackingAction, 'Arrows Nav', 'Slide '+nowIndex);
		});
		this.slickInstance.$prevArrow.on('click',function(){
			nowIndex = localThis.getNowIndex(localThis.slickInstance.currentSlide);
			G.track('Cloud tech slideshow', localThis.trackingAction, 'Arrows Nav', 'Slide '+nowIndex);
		});

		this.slickInstance.$dots.on('click',function(){
			nowIndex = localThis.getNowIndex(localThis.slickInstance.currentSlide);
			G.track('Cloud tech slideshow', localThis.trackingAction, localThis.dotsTrackingLable, 'Slide '+nowIndex);
		});
	};

	proto.getNowIndex = function(rawIndex){
		/*if(this.state === 'desktop'){
			return (rawIndex === 3)?1:rawIndex;
		}else{
			return rawIndex;
		}*/
		return rawIndex;
	};

	proto.update = function(tmpW,tmpH){
		if(tmpW<=640 && this.state === 'desktop'){
			this.state = 'mobile';
		}

		if(tmpW>640 && this.state === 'mobile'){
			this.state = 'desktop';
		}
	};


	return Scheme;
});