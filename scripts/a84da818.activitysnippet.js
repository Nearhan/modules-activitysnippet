this.ActivitySnippet=this.ActivitySnippet||{},this.ActivitySnippet.ActivitySnippetTemplates=this.ActivitySnippet.ActivitySnippetTemplates||{},this.ActivitySnippet.ActivitySnippetTemplates["app/scripts/templates/favorited.handlebars"]=Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,a.helpers),e=e||{};var f,g="",h="function",i=this.escapeExpression;return g+='<span class="activitysocial-item">\n    <a href="#"><i class="activitysocial-icon fa fa-heart"></i></a><span>'+i((f=b&&b.object,f=null==f||f===!1?f:f.counts,f=null==f||f===!1?f:f.favorites,typeof f===h?f.apply(b):f))+" Oh My God</span>\n</span>\n"}),function(){"use strict";var a,b,c=[].slice,d={}.hasOwnProperty;b="undefined"!=typeof exports&&null!==exports?exports:this,b.ActivitySnippet="undefined"!=typeof ActivitySnippet&&null!==ActivitySnippet?ActivitySnippet:{},a=function(){function a(){}var b;return a.prototype.ready=function(a,b){var c,d;return d=function(){return utils.ready.fired||(utils.ready.fired=!0),a.apply(b)},"complete"===document.readyState?d():document.addEventListener?(document.addEventListener("DOMContentLoaded",d,!1),window.addEventListener("load",d,!1)):document.attachEvent&&(c=function(){var a;try{document.documentElement.doScroll("left")}catch(b){return a=b,void setTimeout(c,1)}return d()},document.attachEvent("onreadystatechange",d),window.attachEvent("onload",d),document.documentElement&&document.documentElement.doScroll&&!window.frameElement)?c():void 0},b=function(a,b){var c,d;4===this.readyState&&(this.status>=200&&this.status<400?(c=JSON.parse(this.responseText),a(c)):(d=this.status+" "+this.statusText,b(d)))},a.prototype.getJSON=function(a,c,d){var e;return e=new XMLHttpRequest,e.open("GET",a,!0),e.onreadystatechange=function(){return b.call(this,c,d)},e.send(),e=null},a.prototype.post=function(a,c,d,e){var f;return f=new XMLHttpRequest,f.open("POST",a,!0),f.onreadystatechange=function(){return b.call(this,d,e)},f.send(c),f=null},a.prototype.extend=function(){var a,b,e,f,g;if(a=1<=arguments.length?c.call(arguments,0):[],!a[0])return{};for(b in a){g=a[b];for(e in g)if(d.call(g,e))if(f=g[e],null==a[0][e]&&"object"!=typeof f)a[0][e]=f;else{if(null!=a[0][e]&&"object"!=typeof f)continue;null==a[0][e]&&(a[0][e]={}),a[0][e]=this.extend(a[0][e],f)}}return a[0]},a.prototype.del=function(a,c,d,e){var f;return f=new XMLHttpRequest,f.open("DEL",a(!0)),f.onreadystatechange=function(){return b.call(this,success,e)},f.send(c),f=null},a.prototype.logger=function(a){return console.log("------------"),console.log(JSON.stringify(a)),console.log("------------")},a}(),ActivitySnippet.utils=new a}.call(this),function(){"use strict";var a;a="undefined"!=typeof exports&&null!==exports?exports:this,a.ActivitySnippet="undefined"!=typeof ActivitySnippet&&null!==ActivitySnippet?ActivitySnippet:{},ActivitySnippet.ActivityStreamSnippet=function(){function a(a,b,c,d){var e;this.service=b.ActivityStreamAPI,this.active=null!=(e=b.active)?e:!0,this.el=a,this.id=a.getAttribute("data-id"),this.actor=null!=d?d:null,this.verb=a.getAttribute("data-verb"),this.object={id:a.getAttribute("data-object-id"),type:a.getAttribute("data-object-type"),api:a.getAttribute("data-object-api")},this.count=0,this.view=c["app/scripts/templates/"+this.verb+".handlebars"],this.render()}return a.prototype.save=function(){var a;return a=[this.service,this.object.type,this.object.id,this.verb].join("/"),utils.getJSON(a,function(a){return a},function(a){return a})},a.prototype.toggleState=function(){return this.active=!this.active,this.render()},a.prototype.render=function(){var a;return this.activity={actor:this.actor,verb:this.verb,object:this.object},a={activity:this.activity,active:this.active},this.el.innerHTML=this.view(a)},a.prototype.setActor=function(a){return this.actor!==a?this.actor=null!=a?a:this.actor:void 0},a}()}.call(this),function(){"use strict";var a;a="undefined"!=typeof exports&&null!==exports?exports:this,a.ActivitySnippet="undefined"!=typeof ActivitySnippet&&null!==ActivitySnippet?ActivitySnippet:{},ActivitySnippet.ActivityStreamSnippetFactory=function(){function a(a){var c,d;if(this.settings=ActivitySnippet.utils.extend({},a,b),!this.settings.ActivityStreamAPI)throw new Error("SnippetFactory:: Must pass in ActivityStreamAPI");this.count=0,this.actor=null!=(c=this.settings.actor)?c:null,this.templates=ActivitySnippet.ActivitySnippetTemplates,this.snippets=this.initActivityStreamSnippets(this.settings,this.templates),this.active=null!=(d=this.settings.active)?d:!0}var b;return b={debug:!1,snippetClass:".activitysnippet"},a.prototype.initActivityStreamSnippets=function(a,b){var c,d,e,f;e=document.querySelectorAll(a.snippetClass),f=[];for(d in e)if(e.hasOwnProperty(d)&&"length"!==d&&null==e[d].getAttribute("data-id")){e[d].setAttribute("data-id","as"+this.count);try{f.push(new ActivitySnippet.ActivityStreamSnippet(e[d],a,b,this.actor))}catch(g){c=g,console.log(c.stack)}this.count++}return f},a.prototype.fetch=function(){var a;return a=[this.settings.ActivityStreamAPI,this.actor.type,this.actor.id,"activities"].join("/"),ActivitySnippet.utils.getJSON(a,function(a){return a},function(a){return a})},a.prototype.refresh=function(){var a,b;return a=this.count,this.snippets.push.apply(this.snippets,this.initActivityStreamSnippets(this.settings,this.templates)),this.count!==a&&0!==this.count?b=this.fetch():void 0},a.prototype.toggleState=function(){var a,b;this.active=!this.active,b=[];for(a in this.snippets)b.push(this.snippets[a].toggleState());return b},a.prototype.setActor=function(a){var b;if(this.actor!==a){this.actor=a;for(b in this.snippets)this.snippets[b].setActor(this.actor);return this.fetch()}},a}()}.call(this);