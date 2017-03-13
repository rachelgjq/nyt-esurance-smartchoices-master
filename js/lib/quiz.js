define(['jquery','TweenMax','utils'],function($,TweenMax,utils){
	var Scheme = function quiz() {},
	proto = Scheme.prototype;
	proto.init = function($dom,dtd){
		this.$dom = $dom;
		this.setUpEvents();
		dtd.resolve();
	};
	proto.setUpEvents = function(){
		var localThis = this;

		this.quizContainer = this.$dom.find('.quiz-box');
		this.returnBtn = this.quizContainer.find('.return-btn');
		this.correctQuiz = this.quizContainer.data('answer');
		this.quizIndex = this.$dom.data('quiz-index');

		this.choiceEnable = true;
		this.choiceBtnArr = this.quizContainer.find('.choice-content li').each(function(index){
			$(this).on('click',function(){
				if(localThis.choiceEnable){
					localThis.choiceEnable = false;
					localThis.showAnswer((localThis.correctQuiz === index));

					G.track('Quiz Response', 'Click', 'Quiz Question '+localThis.quizIndex, (localThis.correctQuiz === index));
				}
			});
		});

		this.returnBtn.on('click',function(){
			localThis.choiceEnable = true;
			localThis.quizContainer.removeClass('correct').removeClass('incorrect');
			for(var i = 0,l = localThis.choiceBtnArr.length;i<l;i++){
				$(localThis.choiceBtnArr[i]).css('visibility','visible');

				TweenMax.to(localThis.choiceBtnArr[i],0.3,{opacity:1});
			}
		});
	};
	proto.showAnswer = function(correct){
		var localThis = this;
		this.quizContainer.removeClass('correct').removeClass('incorrect').addClass(correct?'correct':'incorrect');
		for(var i = 0,l = this.choiceBtnArr.length;i<l;i++){
			if(i!==localThis.correctQuiz){
				TweenMax.to(this.choiceBtnArr[i],0.3,{opacity:0,onComplete:function(){$(this.target).css('visibility','hidden');}});
			}
		}
	};
	proto.update = function(tmpW,tmpH){
	};
	return Scheme;
});