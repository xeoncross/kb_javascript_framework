// Textarea element, epen string, close string, callback function
function wrap_selection(e,o,c,f)
{
	// Code for IE
	if (document.selection) 
	{
		e.focus();
		var t = document.selection.createRange();
		t.text = o + ( f ? f(t.text) : t.text) + c;
		return;
	}
	
	// Code for Webkit/Firefox
	var len = e.value.length;
	var start = e.selectionStart;
	var end = e.selectionEnd;
	
	var scrollTop = e.scrollTop;
	var scrollLeft = e.scrollLeft;
	
	var t = e.value.substring(start, end);
	e.value =  e.value.substring(0,start) + o + ( f ? f(t) : t) + c + e.value.substring(end,len);
	
	e.scrollTop = scrollTop;
	e.scrollLeft = scrollLeft;
}

// Textarea element, menu element, menu items
function create_menu_item(p,m,f)
{
	// Create a new menu item
	var b = document.createElement('button');
	b.id = p.id + f.id;
	b.className = f.id;
	b.title = f.label;
	
	// Add it to the menu bar
	m.appendChild(b);
	
	// Register the callback
	kb.on(b,'click',function(e){ wrap_selection(p,f.open,f.close,f.callback); });
}

// Element, menu items, tabs
function createTextEditor(el,f,t,p)
{
	// Activate preview field (if found)
	if(p=$(el.id+'preview'))
	{
		// Local preview function
		var update_preview = function()
		{
			// @todo: This needs work to show ALL HTML elements inside <code> blocks!
			p.innerHTML = el.value.replace(/<(\/?)script/g, '&lt;$1script').replace(/\n\n+/g,"\n\n\n").replace(/([^>])\n/g,'$1\n<br>');
		}
		
		// Each time they type something update it
		kb.on(el,'keyup',function(e){ update_preview(); });
		
		// Update preview as soon as loaded
		update_preview();
	}

	if(t)
	{
		// Also allow tabbing
		kb.on(el,'keydown',function(e)
		{
			if (e && e.keyCode == 9)// && (e.altKey || e.metaKey || e.ctrlKey)) if you want a combo...
			{
				kb.stop(e);
				wrap_selection(el, "\t", '', function(t) { return t.replace(/\n/g,"\n\t") });
			}
		});
	}
	
	// Create a new menu DOM element
	var m = document.createElement('div');

	// Create menu class
	m.className = "texteditormenu";
	
	// Add the menu to the top of the textarea
	el.parentNode.insertBefore(m,el);
	
	// Create the buttons
	for (var i=0;i<f.length;i++){ create_menu_item(el,m,f[i]); }
}