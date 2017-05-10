;(function($,window,document,undefined){var adafruit_domain=window.location.hostname.split(".").slice(-(2)).join(".");var Search=function(elem,options){this.elem=elem;this.$elem=$(elem);this.options=options;this.metadata=this.$elem.data('plugin-options');this._init=false;this.mobile=false;};Search.prototype={defaults:{message:'Search Enabled'},templates:{search:"<img class='tt-image' src='{{img}}' alt='{{value}}' />"+"<div class='tt-product'>"+"<a class='tt-name'>{{value}}"+"<span class='tt-price'>{{price}}</span>"+"</a>"+"</div>"+"<div class='clear'></div>",footer:"<div class='tt-footer-link tt-suggestion'><a href='http://www."+ adafruit_domain+"/search?q=%QUERY'>Search the Shop for <span class='tt-footer-link-value'></span></a></div>"+"<div class='tt-footer-link tt-suggestion'><a href='http://learn."+ adafruit_domain+"/search?q=%QUERY'>Search the Learning System for <span class='tt-footer-link-value'></span></a></div>"+"<div class='tt-footer-link tt-suggestion'><a href='http://blog."+ adafruit_domain+"/?s=%QUERY'>Search the Blog for <span class='tt-footer-link-value'></span></a></div>"+"<div class='tt-footer-link tt-suggestion'><a href='http://forums."+ adafruit_domain+"/search.php?keywords=%QUERY'>Search the Support Forums for <span class='tt-footer-link-value'></span></a></div>"},init:function(){if(this._init){return;}
this._init=true;this.config=$.extend({},this.defaults,this.options,this.metadata);if(this.config.mobile){this.mobile=this.config.mobile;}
this.enable_search(this.$elem);this.watch_focus(this.$elem);return this;},watch_focus:function($elem){var $wrapper=$elem.parents('#search-wrapper');var $magnifier=$('#search-wrapper i');var enable_listener=function(){$magnifier.one("click",function(){$wrapper.addClass('focused');$elem.trigger("focus");});}
$(window).blur(function(){$dropdown.addClass('held-open');}).focus(function(){$dropdown.removeClass('held-open');});enable_listener();$elem.blur(function(e){setTimeout(function(){if(document.hasFocus()){$wrapper.removeClass('focused');setTimeout(enable_listener,200);}},200);});},enable_search:function($elem){var that=this;var search_template=Hogan.compile(this.templates.search);$elem.typeahead({name:'global-search',limit:3,remote:{url:('https:'==document.location.protocol?'https://www.':'http://www.')+ adafruit_domain+'/api/adasearch.php?limit=3&q=%QUERY'},template:search_template.render.bind(search_template)}).on('typeahead:selected',function(event,data,dataset){event.preventDefault();if(data.footer){query=$elem.val();window.location.href=data.url.replace('%QUERY',query);}else{window.location.href=data.url;}});$('span.tt-dropdown-menu').on('typeahead:rendered',function(event,data){var query=$elem.val();if($(".tt-suggestions .tt-footer-link").length===0){$(".tt-suggestions").append(that.templates.footer);}
$('.tt-footer-link-value').text(query);$('.tt-footer-link').each(function(){var mock_suggestion={value:query,datum:{url:$(this).children(":first").attr('href'),footer:true}};$(this).data({suggestion:mock_suggestion});});$('.tt-footer-link a').each(function(){$(this).on('click',function(event){event.preventDefault();});});});},};Search.defaults=Search.prototype.defaults;$.fn.adafruit_search=function(options){return new Search(this,options).init();};})(jQuery,window,document);