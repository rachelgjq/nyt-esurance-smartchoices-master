define(['jquery','TweenMax','scrollmagicmanager','utils'],function($,TweenMax,smm,utils){
	var Scheme = function mask_animation() {},
	proto = Scheme.prototype;
	proto.init = function($dom,dtd){
		this.$dom = $dom;
		this.setUpSm(dtd);
	};
	proto.setUpSm = function(dtd){
		this.aniContainer = this.$dom.find('.text-area-img');
		this.topMask = this.aniContainer.find('.top-layer');
		this.topImg = this.aniContainer.find('.top-layer img');
		this.bottomLayer = this.aniContainer.find('.bottom-layer');
		this.bottomImg = this.aniContainer.find('.bottom-layer img');

		this.nowVh = window.innerHeight ? window.innerHeight : $window.height();
		this.nowVw = window.innerWidth ? window.innerWidth : $window.width();
		this.needUpdate = true;

		this.setUpTopImage();

		// set up scrollmagic scene
		this.smmScene = smm.addInViewPortDetectScrollMagic({
			'triggerDom':this.aniContainer,
			'vh': this.nowVh,
			'debug':false
		},this);
		dtd.resolve();
	};
	proto.inViewportProgress = function(progress/*,forceUpdate*/){
		// console.log(progress);
		this.renderDom(progress);
	};

	proto.setUpTopImage = function(){
		if(this.nowVw>1605){
			this.nowVw = 1605;
		}
		// basic params
		this.nowBIH = this.bottomImg.height();
		this.nowBIW = this.bottomImg.width();

		// set up mask width,height,top,left
		this.radiusPer = 2/3;
		this.nowRadius = this.nowBIH * this.radiusPer;
		this.nowMaskTop = (this.nowBIH-this.nowRadius)/3;
		this.nowMaskLeft = (this.nowVw-this.nowRadius)/2;
		
		// get now shiftX shiftY
		this.shiftX = this.nowMaskLeft*-1-1;
		this.shiftY = this.nowMaskTop*-1-1;

		// get ani duration
		this.nowAniDuration = this.nowBIW - this.nowVw;

		if(this.smmScene){
			this.renderDom(this.smmScene.progress());
		}else{
			this.renderDom(0);
		}
	};

	proto.renderDom = function(progress){
		// set top image's mask and it's width,height,shiftX,shiftY
		// update all param when first init or window resize
		var tmpTarget = progress * this.nowAniDuration * -1;

		if(this.needUpdate){
			this.needUpdate = false;
			this.topMask.css({
				'border-radius':this.nowRadius+'px',
				'width':this.nowRadius+'px',
				'height':this.nowRadius+'px',

				'top': this.nowMaskTop+'px',
				'left': this.nowMaskLeft+'px'
			});

			this.topImg.css({
				'width':this.nowBIW+'px',
				'height':this.nowBIH+'px',
				'margin-top':this.shiftY+'px',
			});
		}
		TweenMax.to(this.bottomLayer,0.3,{left:tmpTarget});
		TweenMax.to(this.topImg,0.3,{'margin-left':this.shiftX + tmpTarget +'px'});
	};
	proto.update = function(tmpW,tmpH){
		this.nowVh = window.innerHeight ? window.innerHeight : $window.height();
		this.nowVw = window.innerWidth ? window.innerWidth : $window.width();

		this.needUpdate = true;
		this.setUpTopImage();
	};
	return Scheme;
});