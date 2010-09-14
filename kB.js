// Element
$=function(e){return e.style?e:document.getElementById(e)}

var kb={
b:function()
{
	return document.body;
},
// Element
toggle:function(e)
{
	e.style.display=(e.style.display!='none')?'none':''
},
// Element
yellowFade:function(e)
{
	var b=155;function f(){e.style.backgroundColor='rgb(255,255,'+(b+=4)+')';if(b<255)setTimeout(f,50);};f()
},
// Element, Event, Finish Callback
on:function(e,t,f,r)
{
	if(e.attachEvent?(r?e.detachEvent('on'+t,e[t+f]):1):(r?e.removeEventListener(t,f,0):e.addEventListener(t,f,0))){e['e'+t+f]=f;e[t+f]=function(){e['e'+t+f](window.event)};e.attachEvent('on'+t,e[t+f])}
},
// Finish Callback
ready:function(f)
{
	"\v"=="v"?setTimeout(f,0):kb.on(document,'DOMContentLoaded',f)
},
// URL, Finish Callback, POST data
ajax:function(u,f,d,x)
{
	x=new(window.ActiveXObject||XMLHttpRequest)('Microsoft.XMLHTTP');x.open(d?'POST':'GET',u,1);x.setRequestHeader('X-Requested-With','XMLHttpRequest');x.setRequestHeader('Content-type','application/x-www-form-urlencoded');x.onreadystatechange=function(){x.readyState>3&&f&&f(x.responseText,x)};x.send(d)
},
// Form, AJAX Callback
ajaxForm:function(f,c)
{
	kb.on((f=$(f)),'submit',function(e){kb.ajax(f.action,c,kb.serialize(f));kb.stop(e)});
},
// Element
serialize:function(f)
{
	function g(n){return f.getElementsByTagName(n)};var nv=function(e){if(e.name)return encodeURIComponent(e.name)+'='+encodeURIComponent(e.value)};var i=kb.collect(g('input'),function(i){if((i.type!='radio'&&i.type!='checkbox')||i.checked)return nv(i)});var s=kb.collect(g('select'),nv);var t=kb.collect(g('textarea'),nv);return i.concat(s).concat(t).join('&')
},
collect:function(a,f)
{
	var n=[];for(var i=0;i<a.length;i++){var v=f(a[i]);if(v!=null)n.push(v)}return n
},
// Element, New Element
insertAfter:function(e,newNode)
{
	e.parentNode.insertBefore(newNode,e.nextSibling)
},
// Value
jsonDecode:function(j)
{
	return eval('('+j+')');
},
// Value
jsonEncode:function(j,t)
{
	if(!j)return j+'';t=[];if(j.pop){for(x in j)t.push(json_encode(j[x]));j='['+t.join(',')+']'}else if(typeof j=='object'){for(x in j)t.push(x+':'+json_encode(j[x]));j='{'+t.join(',')+'}'}else if(j.split)j="'"+j.replace(/\'/g,"\\'")+"'";return j
},
// Frames, Interval, Callback, FinishCallback
fx:function(v,n,c,f,u,y)
{
	u=0;(y=function(){u++<v&&c(u/v)!==0?setTimeout(y,n):(f?f():0)})()
},
// Element, X-Offset, Y-Offset
move:function(e,x,y)
{
	e.style.left=parseInt(e.style.left)+x+"px";e.style.top=parseInt(e.style.top)+y+"px"
},
// Direction in/out, Element, Finish Callback, Frames, Interval
fade:function(d,h,e,f,i)
{
	d=d=='in';kb.fx(f?f:15,i?i:50,function(a){a=(d?0:1)+(d?1:-1)*a;h.style.opacity=a;h.style.filter='alpha(opacity='+100*a+')'},e)
},
// Direction, Element, Finish Callback, Frames, Interval
slide:function(d,e,o,f,i,q)
{
	if(d){e.style.height='';e.style.display='';}q=q?q:kb.pos(e).h;kb.fx(f?f:20,i?i:20,function(a){a=(d?0:1)+(d?1:-1)*a;e.style.height=(a*q)+'px';},function(){if(!d)e.style.display='none';if(o)o();});
},
// Element
pos:function(e,a)
{
	a={l:0,t:0,w:e.offsetWidth,h:e.offsetHeight};do{a.l+=e.offsetLeft;a.t+=e.offsetTop}while(e=e.offsetParent)return a
},
// Element, Frames, Interval, Offset
scrollTo:function(e,f,i,o,p)
{
	o=o?o:50;p=kb.pos(e),w=kb.windowPos();kb.moveWindow((p.l-w.x-o)/f,(p.t-w.y-o)/f,f,i)
},
// X-Offset, Y-Offset, Frames, Interval
moveWindow:function(x,y,f,i)
{
	if(f){window.scrollBy(x,y);setTimeout(function(){kb.moveWindow(x,y,f-1,i);},i?i:40);}
},
windowPos:function()
{
	var w=window,d=document,de=d.documentElement;return{x:(w.pageXOffset||d.body.scrollLeft||de.scrollLeft),y:(w.pageYOffset||d.body.scrollTop||de.scrollTop)}
},
// Event
stop:function(e)
{
	e.preventDefault?e.preventDefault():e.returnValue=0
},
// Element/HTML, Width, Height, Callback, not-closable?, Frames
modal:function(e,w,h,c,x,f,m,o)
{
	o=document.createElement('div');o.id='modal_overlay';kb.b().appendChild(o);if(!x){kb.on(o,'click',function(){kb.closeModal();});}m=document.createElement('div');m.id='modal';e.style?m.appendChild(e):m.innerHTML=e;setTimeout(function(p){kb.b().appendChild(m);if(!w||!h){o=kb.pos(m);w=o.w;h=o.h;}m.style.width=w+'px';m.style.height=h+'px';m.style.marginLeft=-w/2+'px';m.style.marginTop=-h/2+'px';kb.fade('in',m,c,f?f:10);if(e=$('modal_close')){kb.on(e,'click',function(e){kb.closeModal();return kb.stop(e);});}},100);
},
closeModal:function()
{
	kb.remove($('modal'));kb.remove($('modal_overlay'));
},
// Class
lightbox:function(c,e)
{
	if(e=kb.getByClassName(c?c:'lightbox'))for(k in e){kb.on(e[k],'click',function(e){kb.modal('<img src="'+this.href+'" />');return kb.stop(e);});}
},
// Element
remove:function(e)
{
	e.parentNode.removeChild(e);
},
// Value, Array, useless var
index:function(v,a,i)
{
	for(i=a.length;i--&&a[i]!=v;);return i
},
// Class, Document
getByClassName:function(n,d,y,k,h)
{
	y=(d?d:document).getElementsByTagName("*");h=[];for(k=y.length;k--;)kb.index(n,y[k].className.split(" "))>-1&&h.push(y[k]);return h
}
}