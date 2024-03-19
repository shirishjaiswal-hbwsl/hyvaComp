(function(){
    console.log("hello123");

        "use strict";
        const supportTouch = (
            ('ontouchstart' in document) ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
            (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0) || //IE 10
            (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0) || //IE >=11
            false
        );

        const supportAnimation = (function() {

            const animationEnd = (function() {
            
                const element = document.body || document.documentElement,
                    animEndEventNames = {
                        WebkitAnimation : 'webkitAnimationEnd',
                        MozAnimation    : 'animationend',
                        OAnimation      : ['oAnimationEnd','oanimationend'],
                        animation       : 'animationend'
                    };
    
                for (const name in animEndEventNames) {
                    if (element.style[name] !== undefined) return animEndEventNames[name];
                }
            }());
    
            return animationEnd && { end: animationEnd };
        })();

        const onEvent = function(events,target,callback,options){
            (events instanceof Array ? events : [events]).forEach(event=>{
                target.addEventListener(event,callback,options);
            })
        }

        const debounce = function(func, wait, immediate) {
            let timeout;
            return function() {
                const context = this, args = arguments;
                let later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };

        const Animations = {
    
            'none': function() {
                // var d = UI.$.Deferred();
                // d.resolve();
                // return d.promise();
                return new Promise(resolve=>resolve());
            },
    
            'scroll': function(current, next, dir) {
    
                // var d = UI.$.Deferred();
                return new Promise(resolve=>{
                    // current.css('animation-duration', this.options.duration+'ms');
                    current.style.animationDuration = this.options.duration+'ms';

                    // next.css('animation-duration', this.options.duration+'ms');
                    next.style.animationDuration = this.options.duration+'ms';

                    // next.one(UI.support.animation.end, function() {
                        //     current.css('opacity', 0).removeClass(dir == -1 ? 'uk-slideshow-scroll-backward-out' : 'uk-slideshow-scroll-forward-out');
                        //     next.removeClass(dir == -1 ? 'uk-slideshow-scroll-backward-in' : 'uk-slideshow-scroll-forward-in');
                        //     d.resolve();
                        // }.bind(this));
                    next.style.opacity=1;
                    onEvent(supportAnimation.end,next,()=>{
                        current.style.opacity = 0;
                        current.classList.remove(dir == -1 ? 'uk-slideshow-scroll-backward-out' : 'uk-slideshow-scroll-forward-out');
                        next.classList.remove(dir == -1 ? 'uk-slideshow-scroll-backward-in' : 'uk-slideshow-scroll-forward-in');
                        resolve();
                    },{once:true})

                    current.classList.add(dir == -1 ? 'uk-slideshow-scroll-backward-out' : 'uk-slideshow-scroll-forward-out');
                    next.classList.add(dir == -1 ? 'uk-slideshow-scroll-backward-in' : 'uk-slideshow-scroll-forward-in');
                    next.getBoundingClientRect().width; // force redraw
                })
    
            },
    
            // 'swipe': function(current, next, dir) {
    
            //     var d = UI.$.Deferred();
    
            //     current.css('animation-duration', this.options.duration+'ms');
            //     next.css('animation-duration', this.options.duration+'ms');
    
            //     next.css('opacity', 1).one(UI.support.animation.end, function() {
    
            //         current.css('opacity', 0).removeClass(dir === -1 ? 'uk-slideshow-swipe-backward-out' : 'uk-slideshow-swipe-forward-out');
            //         next.removeClass(dir === -1 ? 'uk-slideshow-swipe-backward-in' : 'uk-slideshow-swipe-forward-in');
            //         d.resolve();
    
            //     }.bind(this));
    
            //     current.addClass(dir == -1 ? 'uk-slideshow-swipe-backward-out' : 'uk-slideshow-swipe-forward-out');
            //     next.addClass(dir == -1 ? 'uk-slideshow-swipe-backward-in' : 'uk-slideshow-swipe-forward-in');
            //     next.width(); // force redraw
    
            //     return d.promise();
            // },
            'swipe': function(current, next, dir) {
                return new Promise(resolve=>{
                    current.style.animationDuration =  this.options.duration+'ms';
                    next.style.animationDuration =  this.options.duration+'ms';
        
                    next.style.opacity = 1;
                    onEvent(supportAnimation.end,next,() => {
                        current.style.opacity = 0;
                        current.classList.remove(dir === -1 ? 'uk-slideshow-swipe-backward-out' : 'uk-slideshow-swipe-forward-out');
                        next.classList.remove(dir === -1 ? 'uk-slideshow-swipe-backward-in' : 'uk-slideshow-swipe-forward-in');
                        resolve();
        
                    },{once:true});
        
                    current.classList.add(dir == -1 ? 'uk-slideshow-swipe-backward-out' : 'uk-slideshow-swipe-forward-out');
                    next.classList.add(dir == -1 ? 'uk-slideshow-swipe-backward-in' : 'uk-slideshow-swipe-forward-in');
                    next.getBoundingClientRect().width; // force redraw
                })
            },
    
            // 'scale': function(current, next, dir) {
    
            //     var d = UI.$.Deferred();
    
            //     current.css('animation-duration', this.options.duration+'ms');
            //     next.css('animation-duration', this.options.duration+'ms');
    
            //     next.css('opacity', 1);
    
            //     current.one(UI.support.animation.end, function() {
    
            //         current.css('opacity', 0).removeClass('uk-slideshow-scale-out');
            //         d.resolve();
    
            //     }.bind(this));
    
            //     current.addClass('uk-slideshow-scale-out');
            //     current.width(); // force redraw
    
            //     return d.promise();
            // },
            'scale': function(current, next, dir) {
                return new Promise(resolve=>{
                    current.style.animationDuration =  this.options.duration+'ms';
                    next.style.animationDuration = this.options.duration+'ms';
        
                    next.style.opacity =  1;
                    
                    onEvent(supportAnimation.end,current,()=> {
                        current.style.opacity = 0;
                        current.classList.remove('uk-slideshow-scale-out');
                        resolve();
                    },{once:true})       
        
                    current.classList.add('uk-slideshow-scale-out');
                    current.getBoundingClientRect().width; // force redraw
                })
            },
    
            // 'fade': function(current, next, dir) {
    
            //     var d = UI.$.Deferred();
    
            //     current.css('animation-duration', this.options.duration+'ms');
            //     next.css('animation-duration', this.options.duration+'ms');
    
            //     next.css('opacity', 1);
    
            //     // for plain text content slides - looks smoother
            //     if (!(next.data('cover') || next.data('placeholder'))) {
    
            //         next.css('opacity', 1).one(UI.support.animation.end, function() {
            //             next.removeClass('uk-slideshow-fade-in');
            //         }).addClass('uk-slideshow-fade-in');
            //     }
    
            //     current.one(UI.support.animation.end, function() {
    
            //         current.css('opacity', 0).removeClass('uk-slideshow-fade-out');
            //         d.resolve();
    
            //     }.bind(this));
    
            //     current.addClass('uk-slideshow-fade-out');
            //     current.width(); // force redraw
    
            //     return d.promise();
            // }
            'fade': function(current, next, dir) {
                
                return new Promise(resolve => {
                    current.style.animationDuration = this.options.duration+'ms';
                    next.style.animationDuration = this.options.duration+'ms';
        
                    next.style.opacity = 1;
        
                    // for plain text content slides - looks smoother
                    if (!(next._data && (next._data.cover || next._data.placeholder))) {
        
                        next.style.opacity = 1;
                        onEvent(supportAnimation.end,next,() => {
                            next.classList.remove('uk-slideshow-fade-in');
                        },{once:true});
                        next.classList.add('uk-slideshow-fade-in');
                    }
                    
                    onEvent(supportAnimation.end,current,() => {
                        current.style.opacity = 0;
                        current.classList.remove('uk-slideshow-fade-out');
                        resolve();
        
                    },{once:true});
        
                    current.classList.add('uk-slideshow-fade-out');
                    current.getBoundingClientRect().width; // force redraw
                });
            }
        };

        const checkDisplay = function(context, initanimation) {

            let elements = Array.from((context || document).querySelectorAll('[data-uk-margin], [data-uk-grid-match], [data-uk-grid-margin], [data-uk-check-display]'));
    
            if (context && !elements.length) {
                elements = [context];
            }
    
            // elements.trigger('display.uk.check');
            elements.map(element => {
                element.dispatchEvent(new CustomEvent('display.uk.check'))
            })
    
            // fix firefox / IE animations
            if (initanimation) {
    
                if (typeof(initanimation)!='string') {
                    initanimation = '[class*="uk-animation-"]';
                }
    
                // elements.find(initanimation).each(function(){
    
                //     var ele  = UI.$(this),
                //         cls  = ele.attr('class'),
                //         anim = cls.match(/uk-animation-(.+)/);
    
                //     ele.removeClass(anim[0]).width();
    
                //     ele.addClass(anim[0]);
                // });
                elements.map(element=>{
                    Array.from(element.querySelectorAll(initanimation)).map(ele=>{
                        const cls = ele.getAttribute('class'),
                        anim = cls.match(/uk-animation-(.+)/);

                        ele.classList.remove(anim[0]);
                        ele.getBoundingClientRect().width;
                        ele.classList.add(anim[0]);
                    })
                })
            }
    
            return elements;
        };

        

        const Cover = function(element){

            const cover =  {
        
                options: {
                    automute : true
                },
                element:element,
        
                init() {
        
                    this.parent = this.element.parent();
                    
                    // UI.$win.on('load resize orientationchange', debounce(()=>this.check(), 100));
                    const callback = debounce(()=>this.check(), 100);
                    window.addEventListener('load',callback);
                    window.addEventListener('resize',callback);
                    window.addEventListener('orientationchange',callback);
        
                    // this.on("display.uk.check", function(e) {
                    //     if(this.element.is(":visible")) this.check();
                    // }.bind(this));
                    this.element.addEventListener('display.uk.check',()=>{
                        if(this.element.matches(":visible")) this.check();
                    })
        
                    this.check();
        
                    if (this.element.matches('iframe') && this.options.automute) {
        
                        const src = this.element.src;
                        this.element.src='';
                        // this.element.on('load', function(){
                        //     this.contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}', '*');
                        // }).attr('src', [src, (src.indexOf('?') > -1 ? '&':'?'), 'enablejsapi=1&api=1'].join(''));
                        this.element.addEventListener('load',()=>{
                            this.element.contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}', '*');
                        });
                        this.element.setAttribute('src',[src, (src.indexOf('?') > -1 ? '&':'?'), 'enablejsapi=1&api=1'].join(''));
                    }
                },
        
                check() {
        
                    // this.element.css({
                    //     width  : '',
                    //     height : ''
                    // });
                    this.element.style.width = '';
                    this.element.style.height = '';


                    this.dimension = {
                        w: this.element.getBoundingClientRect().width, 
                        h: this.element.getBoundingClientRect().height};
        
                    if (this.element.width && !isNaN(this.element.width)) {
                        this.dimension.w = this.element.width;
                    }
        
                    if (this.element.height && !isNaN(this.element.height)) {
                        this.dimension.h = this.element.height;
                    }
        
                    this.ratio     = this.dimension.w / this.dimension.h;
        
                    let w = this.parent.getBoundingClientRect().width, 
                        h = this.parent.getBoundingClientRect().height, 
                        width, 
                        height;
        
                    // if element height < parent height (gap underneath)
                    if ((w / this.ratio) < h) {
        
                        width  = Math.ceil(h * this.ratio);
                        height = h;
        
                    // element width < parent width (gap to right)
                    } else {
        
                        width  = w;
                        height = Math.ceil(w / this.ratio);
                    }
        
                    // this.element.css({
                    //     'width'  : width,
                    //     'height' : height
                    // });
                    this.element.style.width = Math.ceil(width)+'px';
                    this.element.style.height = Math.ceil(height)+'px';
                }
            };
            
            cover.init();
            return cover;
        }

         // Listen for messages from the vimeo player
         window.addEventListener('message', function onMessageReceived(e) {
        
            let data = e.data, iframe;

            if (typeof(data) == 'string') {

                try {
                    data = JSON.parse(data);
                } catch(err) {
                    data = {};
                }
            }

            if (e.origin && e.origin.indexOf('vimeo') > -1 && data.event == 'ready' && data.player_id) {
                // iframe = UI.$('[data-player-id="'+ data.player_id+'"]');
                iframe = document.querySelector('[data-player-id="'+ data.player_id+'"]');

                if (iframe) {
                    iframe._data.slideshow.mutemedia(iframe);
                }
            }
        }, false);   
        
        
//     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

(function(){
    let touch = {},
      touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
      longTapDelay = 750,
      gesture,
      down, up, move,
      eventMap;
  
    function swipeDirection(x1, x2, y1, y2) {
      return Math.abs(x1 - x2) >=
        Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    }
  
    function longTap() {
      longTapTimeout = null
      if (touch.last) {
        touch.el.dispatchEvent(new CustomEvent('longTap',{bubbles:true}))
        touch = {}
      }
    }
  
    function cancelLongTap() {
      if (longTapTimeout) clearTimeout(longTapTimeout)
      longTapTimeout = null
    }
  
    function cancelAll() {
      if (touchTimeout) clearTimeout(touchTimeout)
      if (tapTimeout) clearTimeout(tapTimeout)
      if (swipeTimeout) clearTimeout(swipeTimeout)
      if (longTapTimeout) clearTimeout(longTapTimeout)
      touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
      touch = {}
    }
  
    function isPrimaryTouch(event){
      return (event.pointerType == 'touch' ||
        event.pointerType == event.MSPOINTER_TYPE_TOUCH)
        && event.isPrimary
    }
  
    function isPointerEventType(e, type){
      return (e.type == 'pointer'+type ||
        e.type.toLowerCase() == 'mspointer'+type)
    }
  
    // helper function for tests, so they check for different APIs
    // function unregisterTouchEvents(){
    //   if (!initialized) return
    //   $(document).off(eventMap.down, down)
    //     .off(eventMap.up, up)
    //     .off(eventMap.move, move)
    //     .off(eventMap.cancel, cancelAll)
    //   $(window).off('scroll', cancelAll)
    //   cancelAll()
    //   initialized = false
    // }
  
    (function setup(__eventMap){
      let now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType
  
      //   unregisterTouchEvents()
  
      eventMap = (__eventMap && ('down' in __eventMap)) ? __eventMap :
        ('ontouchstart' in document ?
        { 'down': 'touchstart', 'up': 'touchend',
          'move': 'touchmove', 'cancel': 'touchcancel' } :
        'onpointerdown' in document ?
        { 'down': 'pointerdown', 'up': 'pointerup',
          'move': 'pointermove', 'cancel': 'pointercancel' } :
         'onmspointerdown' in document ?
        { 'down': 'MSPointerDown', 'up': 'MSPointerUp',
          'move': 'MSPointerMove', 'cancel': 'MSPointerCancel' } : false)
  
      // No API availables for touch events
      if (!eventMap) return
  
      if ('MSGesture' in window) {
        gesture = new MSGesture()
        gesture.target = document.body
  
        document.addEventListener('MSGestureEnd', function(e){
            const swipeDirectionFromVelocity =
              e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null
            if (swipeDirectionFromVelocity) {
              touch.el.dispatchEvent(new CustomEvent('swipe',{bubbles:true}))
              touch.el.dispatchEvent(new CustomEvent('swipe'+ swipeDirectionFromVelocity,{bubbles:true}))
            }
          })
      }
  
      down = function(e){
        if((_isPointerType = isPointerEventType(e, 'down')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        if (e.touches && e.touches.length === 1 && touch.x2) {
          // Clear out touch movement data if we have it sticking around
          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
          touch.x2 = undefined
          touch.y2 = undefined
        }
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = 'tagName' in firstTouch.target ?
          firstTouch.target : firstTouch.target.parentNode
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = firstTouch.pageX
        touch.y1 = firstTouch.pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
        // adds the current touch contact for IE gesture recognition
        if (gesture && _isPointerType) gesture.addPointer(e.pointerId)
      }
  
      move = function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY
  
        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)
      }
  
      up = function(e){
        console.log("up");
        if((_isPointerType = isPointerEventType(e, 'up')) &&
          !isPrimaryTouch(e)) return
        cancelLongTap()
  
        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))
  
          swipeTimeout = setTimeout(function() {
            if (touch.el){
            //   console.log("Swipe: " + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
              touch.el.dispatchEvent(new CustomEvent('swipe',{bubbles:true}))
              touch.el.dispatchEvent(new CustomEvent('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)),{bubbles:true}))
            }
            touch = {}
          }, 0)
  
        // normal tap
        else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {
  
              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              const event = new CustomEvent('tap')
              event.cancelTouch = cancelAll
              // [by paper] fix -> "TypeError: 'undefined' is not an object (evaluating 'touch.el.trigger'), when double tap
              if (touch.el) touch.el.dispatchEvent(new CustomEvent(event,{bubbles:true}))
  
              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.dispatchEvent(new CustomEvent('doubleTap',{bubbles:true}))
                touch = {}
              }
  
              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null
                  if (touch.el) touch.el.dispatchEvent(new CustomEvent('singleTap',{bubbles:true}))
                  touch = {}
                }, 250)
              }
            }, 0)
          } else {
            touch = {}
          }
          deltaX = deltaY = 0
      }
  
        //   $(document).on(eventMap.up, up)
        //     .on(eventMap.down, down)
        //     .on(eventMap.move, move)
        document.addEventListener(eventMap.up,up);
        document.addEventListener(eventMap.down,down);
        document.addEventListener(eventMap.move,move);
    
        // when the browser window loses focus,
        // for example when a modal dialog is shown,
        // cancel all ongoing events
        //  $(document).on(eventMap.cancel, cancelAll)
        document.addEventListener(eventMap.cancel,cancelAll);
    
        // scrolling the window indicates intention of the user
        // to scroll, not tap or swipe, so cancel all ongoing events
            //   $(window).on('scroll', cancelAll)
        window.addEventListener('scroll', cancelAll)
    
        initialized = true;
    })();


  })();


    

    window.awRbslider = function(element, config) {
        let  playerId = 0;
        const slideshow =  {
    
            options: Object.assign({
                animation          : "fade",
                duration           : 500,
                height             : "auto",
                start              : 0,
                autoplay           : false,
                autoplayInterval   : 7000,
                videoautoplay      : true,
                videomute          : true,
                slices             : 15,
                pauseOnHover       : true,
                kenburns           : false,
                kenburnsanimations : [
                    'uk-animation-middle-left',
                    'uk-animation-top-right',
                    'uk-animation-bottom-left',
                    'uk-animation-top-center',
                    '', // middle-center
                    'uk-animation-bottom-right'
                ]
            },config || {}),
    
            current  : false,
            interval : null,
            hovering : false,
            element : element,
            
    
            init() {
                this.container = this.element.classList.contains('uk-slideshow') ? 
                this.element : 
                this.element.querySelectorAll('.uk-slideshow')[0];
                
                this.current       = this.options.start;
                this.animating     = false;
    
                this.fixFullscreen = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && this.container.classList.contains('uk-slideshow-fullscreen'); // viewport unit fix for height:100vh - should be fixed in iOS 8
    
                if (this.options.kenburns) {
    
                    this.kbanimduration = this.options.kenburns === true ? '15s': this.options.kenburns;
    
                    if (!String(this.kbanimduration).match(/(ms|s)$/)) {
                        this.kbanimduration += 'ms';
                    }
    
                    if (typeof(this.options.kenburnsanimations) == 'string') {
                        this.options.kenburnsanimations = this.options.kenburnsanimations.split(',');
                    }
                }

                this.slides =  Array.from(this.container.children);
                
                
                // this.triggers = this.find('[data-uk-slideshow-item]');
                this.triggers = Array.from(this.element.querySelectorAll('[data-uk-slideshow-item]'));

    
                this.update();

                Array.from(this.element.querySelectorAll('[data-uk-slideshow-item]')).map(item=>{
                    item.addEventListener('click.uk.slideshow', (e) => {
    
                        e.preventDefault();
                        
                        // var slide = UI.$(this).attr('data-uk-slideshow-item');
                        const slideIndex = item.getAttribute('data-uk-slideshow-item');
        
                        if (this.current == slideIndex) return;
        
                        switch(slideIndex) {
                            case 'next':
                                this.next();
                                break;
                            case 'previous':
                                // this[slide=='next' ? 'next':'previous']();
                                this.previous();
                                break;
                            default:
                                this.show(parseInt(slideIndex, 10));
                        }
        
                        this.stop();
                    })
                })



                // this.on("click.uk.slideshow", '[data-uk-slideshow-item]', function(e) {
    
                //     e.preventDefault();
    
                //     var slide = UI.$(this).attr('data-uk-slideshow-item');
    
                //     if ($this.current == slide) return;
    
                //     switch(slide) {
                //         case 'next':
                //         case 'previous':
                //             $this[slide=='next' ? 'next':'previous']();
                //             break;
                //         default:
                //             $this.show(parseInt(slide, 10));
                //     }
    
                //     $this.stop();
                // });
    

                const resizeCallback = debounce(() => {
                    this.resize();
                    if(this.fixFullscreen){
                        this.container.style.height = window.innerHeight+'px';
                        this.slides.style.height = window.innerHeight+'px';
                    }
                },100);

                window.addEventListener('resize',resizeCallback);
                window.addEventListener('load',resizeCallback);


                // UI.$win.on("resize load", UI.Utils.debounce(function() {
                //     $this.resize();
    
                //     if ($this.fixFullscreen) {
                //         $this.container.css('height', window.innerHeight);
                //         $this.slides.css('height', window.innerHeight);
                //     }
                // }, 100));
    


                // chrome image load fix
                setTimeout(() => this.resize(), 80);
    


                // Set autoplay
                if (this.options.autoplay) {
                    this.start();
                }
    
                if (this.options.videoautoplay && this.slides[this.current]._data && this.slides[this.current]._data['media']) {
                    this.playmedia(this.slides[this.current]._data['media']);
                }
    
                if (this.options.kenburns) {
                    this.applyKenBurns(this.slides[this.current]);
                }
                

                // this.container.on({
                //     mouseenter: function() { if ($this.options.pauseOnHover) $this.hovering = true;  },
                //     mouseleave: function() { $this.hovering = false; }
                // });
                this.container.addEventListener('mouseenter',() =>  this.options.pauseOnHover && (this.hovering = true));
                this.container.addEventListener('mouseleave',() =>  this.hovering = false);

    

                // this.on('swipeRight swipeLeft', function(e) {
                //     $this[e.type=='swipeLeft' ? 'next' : 'previous']();
                // });
                this.element.addEventListener('swipeRight',() => this.previous());
                this.element.addEventListener('swipeLeft',() => this.next());


    
                // this.on('display.uk.check', function(){
                //     if ($this.element.is(":visible")) {
    
                //         $this.resize();
    
                //         if ($this.fixFullscreen) {
                //             $this.container.css('height', window.innerHeight);
                //             $this.slides.css('height', window.innerHeight);
                //         }
                //     }
                // });
                this.element.addEventListener('display.uk.check',()=>{
                    if (!this.element.hidden) {
    
                        this.resize();
    
                        if(this.fixFullscreen){
                            this.container.style.height = window.innerHeight+'px';
                            this.slides.style.height = window.innerHeight+'px';
                        }
                    }
                })

                if(this.element._data && this.element._data.observer){
                    const observer  = new MutationObserver(debounce(()=>{
                        if(Array.from(this.container.children).filter(child=>child.matches(':not([data-slide])')).length){
                            this.update(true);
                        }

                        this.element._data = Object.assign(this.element._data || {},{observer});
                        observer.observe(this.element,{childList:true,subtree:true});
                    },50))
                };
    
                // UI.domObserve(this.element, function(e) {
                //     if ($this.container.children(':not([data-slide])').length) {
                //         $this.update(true);
                //     }
                // });
            },
   
            
            update(resize) {

                let canvas, processed = 0;
                this.slidesCount   = this.slides.length;
    
                if (!this.slides[this.current]) {
                    this.current = 0;
                }
    
                this.slides.forEach((slide,index) => {
    
                    // if (slide.data('processed')) {
                    //     return;
                    // }
                    if (slide.dataset.processed) {
                        return;
                    }
    
                    let media = Array.from(slide.children).filter(child=>child.matches('img,video,iframe'))[0];
                    let type = 'html';
    
                    // slide.data('media', media);
                    // slide.data('sizer', media);
                    slide._data = Object.assign(slide._data || {}, {media:media,sizer:media});
                    
                    if (media) {
    
                        let placeholder;
    
                        type = media.nodeName.toLowerCase();
    
                        switch(media.nodeName) {
                            case 'IMG':
    
                                // let cover = UI.$('<div class="uk-cover-background uk-position-cover"></div>').css({'background-image':'url('+ media.attr('src') + ')'});
                                let cover = document.createElement('div');
                                cover.classList.add('uk-cover-background','uk-position-cover');
                                cover.style.backgroundImage = 'url('+ media.src + ')';

                                if (media.width && media.height) {
                                    // placeholder = UI.$('<canvas></canvas>').attr({width:media.attr('width'), height:media.attr('height')});
                                    placeholder = document.createElement('canvas');
                                    placeholder.setAttribute('width',media.width);
                                    placeholder.setAttribute('height',media.height);
                                    
                                    // media.replaceWith(placeholder);
                                    media.outerHTML = placeholder.outerHTML;
                                    media = placeholder;
                                    placeholder = undefined;
                                }
    
                                // media.css({width: '100%',height: 'auto', opacity:0});
                                media.style.width = '100%';
                                media.style.height = 'auto';
                                media.style.opacity = '0';
                                // slide.prepend(cover).data('cover', cover);
                                slide.prepend(cover);
                                slide._data.cover = cover;
                                break;
    
                            case 'IFRAME':
    
                                const src = media.src, iframeId = 'sw-'+(++playerId);

                                media.src = '';
                                // media.on('load', function(){
                                //         if (index !== $this.current || (index == $this.current && !$this.options.videoautoplay)) {
                                //             $this.pausemedia(media);
                                //         }
                                //         if ($this.options.videomute) {
                                //             $this.mutemedia(media);
                                //             var inv = setInterval((function(ic) {
                                //                 return function() {
                                //                     $this.mutemedia(media);
                                //                     if (++ic >= 4) clearInterval(inv);
                                //                 }
                                //             })(0), 250);
                                //         }
                                //     })
                                    media.addEventListener('load',()=>{
    
                                        if (index !== this.current || (index == this.current && !this.options.videoautoplay)) {
                                            this.pausemedia(media);
                                        }
    
                                        if (this.options.videomute) {
    
                                            this.mutemedia(media);
    
                                            const inv = setInterval(((ic) => {
                                                return () => {
                                                    this.mutemedia(media);
                                                    if (++ic >= 4) clearInterval(inv);
                                                }
                                            })(0), 250);
                                        }
    
                                    })
                                    // .data('slideshow', this)  // add self-reference for the vimeo-ready listener
                                    media._data =  Object.assign(media._data || {}, {slideshow:this});
                                    // media.attr('data-player-id', iframeId)  // add frameId for the vimeo-ready listener
                                    media.setAttribute('data-player-id',iframeId);
                                    // media.attr('src', [src, (src.indexOf('?') > -1 ? '&':'?'), 'enablejsapi=1&api=1&player_id='+iframeId].join(''))
                                    media.setAttribute('src',[src, (src.indexOf('?') > -1 ? '&':'?'), 'enablejsapi=1&api=1&player_id='+iframeId].join(''));
                                    // media.addClass('uk-position-absolute');
                                    media.classList.add('uk-position-absolute');


                                // disable pointer events
                                // if(!UI.support.touch) media.css('pointer-events', 'none');
                                if(!supportTouch) media.style.pointerEvents = 'none';
                                placeholder = true;
                                
                                // if (UI.cover) {
                                //     UI.cover(media);
                                //     media.attr('data-uk-cover', '{}');
                                // }
                                Cover(media);
                                media.setAttribute('data-uk-cover', '{}');
                                
                                break;
    
                            case 'VIDEO':
                                // media.addClass('uk-cover-object uk-position-absolute');
                                media.classList.add('uk-cover-object','uk-position-absolute');
                                placeholder = true;
    
                                if (this.options.videomute) this.mutemedia(media);
                        }
    
                        if (placeholder) {
    
                            // canvas  = UI.$('<canvas></canvas>').attr({'width': media[0].width, 'height': media[0].height});
                            canvas = document.createElement('canvas');
                            canvas.setAttribute('width',media.width);
                            canvas.setAttribute('height',media.height);

                            // var img = UI.$('<img style="width:100%;height:auto;">').attr('src', canvas[0].toDataURL());
                            let img = document.createElement('img');
                            img.style.width = '100%';
                            img.style.height='auto';
                            img.src = canvas.toDataURL();

                            slide.prepend(img);
                            slide._data.sizer =  img;
                        }
    
                    } else {
                        slide._data.sizer = slide;
                    }
    
                    if (this.hasKenBurns(slide)) {
                        // slide.data('cover').css({
                        //     '-webkit-animation-duration': $this.kbanimduration,
                        //     'animation-duration': $this.kbanimduration
                        // });
                        slide._data.cover.style['-webkit-animation-duration'] = this.kbanimduration;
                        slide._data.cover.style['animation-duration'] = this.kbanimduration;
                    }
    
                    // slide.data('processed', ++processed);
                    slide.dataset.processed = ++processed;

                    // slide.attr('data-slide', type);
                    slide.dataset.slide = type;
                });
    
                if (processed) {

                    // Set start slide
                    // this.slides.attr('aria-hidden', 'true').removeClass('uk-active').eq(this.current).addClass('uk-active').attr('aria-hidden', 'false');
                    this.slides.map(slide=>{
                        slide.setAttribute('aria-hidden', 'true');
                        slide.classList.remove('uk-active');

                        slide.setAttribute('aria-hidden', 'false');
                        slide.classList.add('uk-active');
                    });


                    // this.triggers.filter('[data-uk-slideshow-item="'+this.current+'"]').addClass('uk-active');
                    this.triggers.map(trigger=>{
                        if(trigger.matches('[data-uk-slideshow-item="'+this.current+'"]')){
                            trigger.classList.add('uk-active');
                        }
                    });
                }
    
                if (resize && processed) {
                    this.resize();
                }
            },
    
            resize() {
    
                // if (this.container.hasClass('uk-slideshow-fullscreen')) return;
                if (this.container.classList.contains('uk-slideshow-fullscreen')) return;
    
    
                let height = this.options.height;
    
                if (this.options.height === 'auto') {
    
                    // this.slides.css('height', '').each(function() {
                    //     height = Math.max(height, UI.$(this).height());
                    // });
                    height = this.slides.length === 0 ? 0 : Math.max.apply(this,this.slides.map(slide=>{
                        slide.style.height = '';
                        return slide.getBoundingClientRect().height;
                    }))
                }
    
                // this.container.css('height', height);
                this.container.style.height = height+'px';

                // this.slides.css('height', height);
                this.slides.map(slide=>slide.style.height = height+'px');
            },
    
            show(index, direction) {
    
                if (this.animating || this.current == index) return;
    
                this.animating = true;
    
                const current      = this.slides[this.current],
                      next         = this.slides[index],
                      dir          = direction ? direction : this.current < index ? 1 : -1,
                      currentmedia = current._data && current._data.media,
                      animation    = Animations[this.options.animation] ? this.options.animation : 'fade',
                      nextmedia    = next._data && next._data.media,
                      finalize     = () => {
    
                        if (!this.animating) return;
    
                        if (currentmedia && currentmedia.matches('video,iframe')) {
                            this.pausemedia(currentmedia);
                        }
    
                        if (nextmedia && nextmedia.matches('video,iframe')) {
                            this.playmedia(nextmedia);
                        }
    
                        // next.addClass("uk-active").attr('aria-hidden', 'false');
                        next.classList.add('uk-active');
                        next.setAttribute('aria-hidden', 'false');


                        // current.removeClass("uk-active").attr('aria-hidden', 'true');
                        current.classList.remove('uk-active');
                        next.setAttribute('aria-hidden', 'true');


                        this.animating = false;
                        this.current   = index;
    
                        checkDisplay(next, '[class*="uk-animation-"]:not(.uk-cover-background.uk-position-cover)');
    
                        // this.trigger('show.uk.slideshow', [next, current, this]);
                        this.element.dispatchEvent(new CustomEvent('show.uk.slideshow', {detail: [next, current, this]}));
                    };
    
                this.applyKenBurns(next);
    
                // animation fallback
                if (!supportAnimation) {
                    animation = 'none';
                }
    
                // current = UI.$(current);
                // next    = UI.$(next);
    
                // this.trigger('beforeshow.uk.slideshow', [next, current, this]);
                this.element.dispatchEvent(new CustomEvent('beforeshow.uk.slideshow', {detail:[next, current, this]}))

                Animations[animation].apply(this, [current, next, dir]).then(finalize);
    
                // this.triggers.removeClass('uk-active');
                // this.triggers.filter('[data-uk-slideshow-item="'+index+'"]').addClass('uk-active');
                this.triggers.map(trigger => {
                    trigger.classList.remove('uk-active')
                    if(trigger.matches('[data-uk-slideshow-item="'+index+'"]')){
                        trigger.classList.add('uk-active');
                    }
                });
            },
    
            applyKenBurns(slide) {
    
                if (!this.hasKenBurns(slide)) {
                    return;
                }
    
                const animations = this.options.kenburnsanimations,
                    index      = this.kbindex || 0;
    
    
                slide._data.cover.setAttribute('class', 'uk-cover-background uk-position-cover');
                slide.getBoundingClientRect().width;
                slide._data.cover.classList.add('uk-animation-scale', 'uk-animation-reverse', animations[index]);
    
                this.kbindex = animations[index + 1] ? (index+1):0;
            },
    
            hasKenBurns(slide) {
                return (this.options.kenburns && slide._data && slide._data.cover);
            },
    
            next() {
                this.show(this.slides[this.current + 1] ? (this.current + 1) : 0, 1);
            },
    
            previous() {
                this.show(this.slides[this.current - 1] ? (this.current - 1) : (this.slides.length - 1), -1);
            },
    
            start() {
    
                this.stop();
    
                // var this = this;
    
                this.interval = setInterval(() => {
                    if (!this.hovering) this.next();
                }, this.options.autoplayInterval);
    
            },
    
            stop() {
                if (this.interval) clearInterval(this.interval);
            },
    
            playmedia(media) {
    
                if (!media) return;
    
                switch(media.nodeName) {
                    case 'VIDEO':
    
                        if (!this.options.videomute) {
                            media.muted = false;
                        }
    
                        media.play();
                        break;
                    case 'IFRAME':
    
                        if (!this.options.videomute) {
                            media.contentWindow.postMessage('{ "event": "command", "func": "unmute", "method":"setVolume", "value":1}', '*');
                        }
    
                        media.contentWindow.postMessage('{ "event": "command", "func": "playVideo", "method":"play"}', '*');
                        break;
                }
            },
    
            pausemedia(media) {
                switch(media.nodeName) {
                    case 'VIDEO':
                        media.pause();
                        break;
                    case 'IFRAME':
                        media.contentWindow.postMessage('{ "event": "command", "func": "pauseVideo", "method":"pause"}', '*');
                        break;
                }
            },
    
            mutemedia(media) {
    
                switch(media.nodeName) {
                    case 'VIDEO':
                        media.muted = true;
                        break;
                    case 'IFRAME':
                        media.contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}', '*');
                        break;
                }
            }
            };
            

        slideshow.init();

        return slideshow;   
    }
})(); 

