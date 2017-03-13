define(['jquery','TweenMax','utils','scrollmagicmanager'],function($,TweenMax,utils,smm){
	var Scheme = function cinemaGraphs() {},
	proto = Scheme.prototype;

	// all events' meaning refer to - http://www.w3schools.com/tags/ref_av_dom.asp
	/*['abort','canplay','canplaythrough','durationchange','emptied','ended','error','loadeddata',
	'loadedmetadata','loadstart','pause','play','playing','progress','ratechange','seeked','seeking',
	'stalled','suspend','timeupdate','volumechange','waiting'];*/

	proto.init = function($dom,dtd){
		this.$dom = $dom;
		this.videoUrlPrefix = 'http://video1.nytimes.com/paidpost/esurance/smartchoices/';
		
		this.videoEnable = false;
		this.playerArr = [];
		var smmData = {
			"triggerDom":this.$dom,
			'triggerPlay':0.8,
			'triggerReset':0.99,
			'offset':'10px',
			'inited':false,
			'debug':false,
			'inViewport':true,
		};
		this.inViewPort = true;
		this.edgeSceneArr = smm.addEdgeDetectScrollMagic(smmData,this.$dom,this);
		this.cgContainer = this.$dom.find('.cg-container');

		this.timeoutHandle = null;

		if(this.cgContainer.length>0){
			for(var i = 0,l = this.cgContainer.length;i<l;i++){
				this.playerArr.push(this.creatVideo($(this.cgContainer[i])));
			}
		}
		var tmpH = window.innerHeight ? window.innerHeight : $window.height();
		var tmpW = window.innerWidth ? window.innerWidth : $window.width();

		this.update(tmpW,tmpH);

		dtd.resolve();
	};

	proto.afterPageLoad = function(){
		//this.playerArr
		for(var i = 0,l = this.playerArr.length;i<l;i++){
			this.playerArr[i].player[0].load();
		}
	};

	proto.creatVideo = function(videoContainer){
		var localThis = this;
		var videoDom = $('<video>').attr('preload','none').attr('loop','true').attr('muted','true').appendTo(videoContainer).addClass('cg-video');
		var video_webm_Url = videoContainer.data('cg-webm-url'),
			video_mp4_Url = videoContainer.data('cg-mp4-url');

		var mp4Source = $('<source>').attr({'src':this.videoUrlPrefix+video_mp4_Url+'.mp4','type':'video/mp4'}).appendTo(videoDom);
		var webmSource = $('<source>').attr({'src':this.videoUrlPrefix+video_webm_Url+'.webm','type':'video/webm'}).appendTo(videoDom);
		var videoObj = {
			'player':videoDom,
			'poster':videoContainer.find('img'),
			'placeholder':videoContainer,
			'ready':false
		};
		videoDom.on('loadedmetadata',function(){
			// console.log(videoUrl+'--loadedmetadata');
			videoObj.ready = true;
			videoObj.player[0].volume = 0;

			videoObj.player.css({
				'opacity':1
			});

			//localThis.resizeVideo(videoObj);
			localThis.changeVideoState();
			videoObj.player[0].play();


			var tmpH = window.innerHeight ? window.innerHeight : $window.height();
			var tmpW = window.innerWidth ? window.innerWidth : $window.width();
			localThis.update(tmpW,tmpH);
		});
		return videoObj;
	};

	proto.intoViewport = function(){
		// console.log('intoViewport');
		this.inViewPort = true;
		this.changeVideoState();
	};
	proto.outofViewport = function(){
		// console.log('outofViewport');
		this.inViewPort = false;
		this.changeVideoState();
	};

	proto.changeVideoState = function(){
		for(var i = 0,l = this.playerArr.length;i<l;i++){
			if(this.playerArr[i].ready && this.inViewPort && this.videoEnable){
				this.playerArr[i].player[0].play();
			}else{
				this.playerArr[i].player[0].pause();
			}
		}
	};
	proto.updateVideoPos = function(){
		// console.log('updateVideoPos__'+this.$dom[0].className);
		for(var i = 0,l = this.playerArr.length;i<l;i++){
			// console.log(this.playerArr[i].player.height()+'---'+this.playerArr[i].placeholder.height());
			this.playerArr[i].player.css({
				'top':(this.playerArr[i].placeholder.height() - this.playerArr[i].player.height())/2 + 'px'
			});
		}
	};

	proto.update = function(tmpW,tmpH){
		var localThis = this;
		if(tmpW>640 && !this.videoEnable){
			this.videoEnable = true;
			this.changeVideoState();
		}

		if(tmpW<=640 && this.videoEnable){
			this.videoEnable = false;
			this.changeVideoState();
		}

		if(this.timeoutHandle){
			clearTimeout(this.timeoutHandle);
		}
		this.timeoutHandle = setTimeout(function(){
			localThis.updateVideoPos();
		},100);
	};

	return Scheme;
});