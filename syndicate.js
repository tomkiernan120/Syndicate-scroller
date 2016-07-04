;
(function($, window, document, undefined) {
	$.fn.extend({
		syndicate: function(options) {
			var running = 0;
			var defaults = {
					speed: 300,
				},
				options = $.extend(defaults, options),
				o = options; // can call options using "o" instead of "options";
			var $this = $(this),
					$children = $this.children(),
					$Cheight = 0;
					$children.each(function(i, el){
						$Cheight += $(el).height();
					});
					if($Cheight < $this.height()){
						var $cc = $children.clone();
						$this.append($cc);
					}
			$this.css({
				'overflow': 'hidden'
			});

			$this.binds($this,o);
			$this.scrollForward($this,o);
		},
		pause: function(obj){
			clearInterval(obj.scrollForward());
		},
		scrollForward: function(obj, options) {
			var $this = $(this);
			var children = obj.children();
			var height = children.first().innerHeight();
			var time = height / (options.speed / 10000);
			children.first().animate({
				marginTop: -height
			}, time, 'linear', function() {
				var first = $this.children().first();
				first.remove();
				first.removeAttr('style');
				$this.append(first);
				running = 1;
				$this.scrollForward($this, options);
			});
		},
		scrollBackward: function(obj, options) {
			var $this = $(this);
			var children = obj.children();
			var height = children.last().height();
			children.last().animate({
				marginTop: +height
			}, 1800, function() {
				var last = $this.children().last();
				last.remove();
				last.removeAttr('style');
				$this.prepend(first);
				$this.deQueue();
				setTimeout($this.scrollBackward($this, options));
			});
		},
		pause: function(obj){
			obj.children().first().clearQueue();
			obj.children().first().stop();
			running = 0;
		},
		binds: function(obj,options) {
			var $this = $(this);
			$this.on({
				mouseover: function() {
					$this.pause($this);
				},
				mouseleave: function() {
					if(running != 1){
						$this.scrollForward($this,options);
					}
				}
			})
		},
	});
})(jQuery, window, document);
