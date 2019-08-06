
var cvs = {
	minw: 400,
	minh: 560,
	maxw: 1400,
	maxh: 1000, 
	width: function (a) {
		if (window.innerWidth >= this.minw && window.innerWidth <= this.maxw) {
			return window.innerWidth;
		} else if (window.innerWidth < this.minw) {
			return this.minw;
		} else if (window.innerWidth > this.maxw) {
			return this.maxw;
		}
	},
	height: function (a) {
		if (window.innerHeight >= this.minh && window.innerHeight <= this.maxh) {
			return window.innerHeight;
		} else if (window.innerHeight < this.minh) {
			return this.minh;
		} else if (window.innerHeight > this.maxh) {
			return this.maxh;
		}
	}
};

// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
var main_canvas, main_ctx, bar_alpha, bar_y, iv, st, ws;

/**/
var cc = 0, dd = 0, e = 0, f = 0, g = 0, h = 0;

var x, y;
var len, len99;
var noise = {
	t: [],
	u: [],
	v: [],
	c: [],
	y: []
};
var t, bx, by, cx, cy, d;
/**/

var audio = new Audio();
audio.src = 'Music.mp3';
// audio.volume = 1.0;
audio.controls = false;
audio.loop = false;
audio.autoplay = false;
// audio.oncanplaythrough = function () {
audio.onlodeddata = function () {
	console.log("Audio loaded");
	// playAnimation();
	// init();
};

window.addEventListener('load', init, false);

window.addEventListener('resize', resizer, false);

function resizer() {
	// console.log("resized");
	var wd = cvs.width();
	var ht = cvs.height();
	// console.log(window.innerWidth);
	canvas.width = wd;
	canvas.height = ht;
	main_canvas.width = wd;
	main_canvas.height = ht;
	// canvdiv.style.width = wd;
	// canvdiv.style.height = ht;
	// document.body.width = wd;
	big_p.l = Math.floor((canvas.width/2) - (big_p.w/2));
	big_p.t = Math.floor((canvas.height/2) - (big_p.h/2));
	ctx.rotate(180*Math.PI/180);
	ctx.translate(-canvas.width, -canvas.height);

}

function limit (n,lim,inc) {
	if (inc && lim > n) {
		return n;
	} else if (inc && lim <= n) {
		return lim;
	} else if (!inc && lim < n) {
		return n;
	} else if (!inc && lim >= n) {
		return lim;
	}
}

function ease (t, b, c, d) {
	if (t >= d) {
		return b+c;
	} else {
		// t /= d / 2;
		// if (t < 1) return c / 2 * t * t + b;
		// t--;
		// return -c / 2 * (t * (t - 2) - 1) + b;
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	}
}

function frameLooper(){
	// window.requestAnimationFrame(frameLooper);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	f = (f+5)%255;
	// var ff = f%255;
	// ctx.fillStyle = 'rgba(0,0,'+f+',1)'; // Color of the bars
	dd = 0;
	cc = 0;
	
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	// ctx.fillStyle = '#00CCFF'; // Color of the bars
	ctx.fillStyle = '#000'; // Color of the bars
	bars = 700;
	var tmpx = [], tmpy = [];
	var tmpx2 = [], tmpy2 = [];
	var jj = 0;

	// render bars
	if (canvas.width < bars) {
		for (var i = 0; i < canvas.width; i++) {
			bar_x = i * 1;
			bar_width = 1;
			bar_height = -Math.floor(fbc_array[i] / 2);
			bar_y = canvas.height;//-(fbc_array[i] / 1);
			//  fillRect( x, y, width, height ) // Explanation of the parameters below
			ctx.globalAlpha = .3 + 1/.3*fbc_array[i] / 1023;
			// bar_alpha = .5 + fbc_array[i] / 510;
			// ctx.fillStyle = 'rgba(0,0,'+f+','+bar_alpha+')';
			// ctx.fillStyle = '#'+fbc_array[i].toString();
			ctx.fillRect(bar_x, bar_y, bar_width, bar_height);
			// ctx.fillRect(bar_x, bar_y, 1, 9);
			if (jj < 10) {
				var x1 = Math.floor(0 + Math.random() * 400)+big_p.l;
				var x2 = Math.floor(30 + Math.random() * (canvas.width-30*2));
				var y1 = Math.floor(canvas.height-Math.floor(fbc_array[x1] / 2)-big_p.t);
				var y2 = Math.floor(canvas.height-Math.floor(fbc_array[x2] / 2));
				if (canvas.height-y1-big_p.t > 1 && canvas.height-y2 > 1) {
					tmpx[i] = x1;
					tmpx[i+10] = x2;
					tmpy[i] = y1;
					tmpy[i+10] = y2;
					jj++;
				}
				tmpx2[i] = x1;
				tmpx2[i+10] = x2;
				tmpy2[i] = y1;
				tmpy2[i+10] = y2;
			}
		}
	} else {
		// var dec = 0;
		for (var i = 0; i < bars; i++) {
			bar_x = i * 1;
			bar_width = 1;
			bar_height = -Math.floor(fbc_array[i] / 2);
			bar_y = canvas.height;//-(fbc_array[i] / 1);
			ctx.globalAlpha = .3 + 1/.3*fbc_array[i] / 1023;
			ctx.fillRect(bar_x, bar_y, bar_width, bar_height);
			if (i < canvas.width-bars) {
				ctx.globalAlpha = 1;
				ctx.globalAlpha = .3 + 1/.3*fbc_array[700-i] / 1023;
				// ctx.fillRect(cvs.maxw-1-bar_x, bar_y, bar_width, bar_height);
				ctx.fillRect(bar_x+700, bar_y, bar_width, -Math.floor(fbc_array[700-i] / 2));
				ctx.globalAlpha = 1;
			}
			
			if (jj < 10) {
				var x1 = Math.floor(0 + Math.random() * 400)+big_p.l;
				var x2 = Math.floor(30 + Math.random() * (canvas.width-30*2));
				var y1 = Math.floor(canvas.height-Math.floor(fbc_array[(x1<700)?x1:(700-(x1%700))] / 2)-big_p.t);
				var y2 = Math.floor(canvas.height-Math.floor(fbc_array[(x2<700)?x2:(700-(x2%700))] / 2));
				if (canvas.height-y1-big_p.t > 1 && canvas.height-y2 > 1) {
					tmpx[i] = x1;
					tmpx[i+10] = x2;
					tmpy[i] = y1;
					tmpy[i+10] = y2;
					jj++;
				}
				tmpx2[i] = x1;
				tmpx2[i+10] = x2;
				tmpy2[i] = y1;
				tmpy2[i+10] = y2;
			}
		}
	}
	ctx.globalAlpha = 1;

	if (e > len99) {
		for(var i=0; i<len; i++) {
			if (big_p.z[i] === 0 && tmpx[dd] === tmpx2[dd] && tmpy[dd] === tmpy2[dd]) { //} && tmpx[dd+7] === tmpx2[dd+7] && tmpy[dd+7] === tmpy2[dd+7]) {
				big_p.z[i] = 1;
				big_p.u[i] = tmpx[dd];
				big_p.v[i] = tmpy[dd];
				big_p.chx[i] = tmpx[dd]-big_p.x[i];
				big_p.chy[i] = tmpy[dd]-big_p.y[i];
				dd++;
				e++;
			}
			if(dd >= 10) {
				break;
			}
		}
		// still, makes noises
		for(var j=0; j<10; j++){
			noise.u.push(tmpx[j+10]);//-Math.floor(Math.random() * 15));
			noise.v.push(tmpy[j+10]);
			noise.t.push(0);
			noise.c.push(canvas.height + Math.floor(Math.random() * 400));
			if (noise.c.length > 1200) {
				noise.u.shift();
				noise.v.shift();
				noise.t.shift();
				noise.c.shift();
			}
		}
	} else {
		for(var i=0; i<len; i++) {
			// if(big_p.z[i] === 0) {
				var rnd = Math.floor(Math.random() * len);
				if (big_p.z[rnd] === 0 && tmpx[dd] === tmpx2[dd] && tmpy[dd] === tmpy2[dd]) { //}) && tmpx[dd+7] === tmpx2[dd+7] && tmpy[dd+7] === tmpy2[dd+7]) {
					big_p.z[rnd] = 1;
					big_p.u[rnd] = tmpx[dd];
					big_p.v[rnd] = tmpy[dd];
					big_p.chx[rnd] = tmpx[dd]-big_p.x[rnd];
					big_p.chy[rnd] = tmpy[dd]-big_p.y[rnd];
					dd++;
					e++;
					noise.u.push(tmpx[dd+10]);//-Math.floor(Math.random() * 15));
					noise.v.push(tmpy[dd+10]);
					noise.t.push(0);
					noise.c.push(canvas.height + Math.floor(Math.random() * 400));
					if (noise.c.length > 1200) {
						noise.u.shift();
						noise.v.shift();
						noise.t.shift();
						noise.c.shift();
					}
				}
			// }
			if(dd >= 10) {
				break;
			}
		}
	}
	/*big_p.z.length <= e && */
	if (audio.currentTime >= audio.duration-23 && !dn) {
		console.log("done!",e,audio.currentTime,audio.duration);
		// clearTimeout(ws);
		ws = setTimeout(function () {
			theEnd();
		}, 2500);
		e=0;
	}

	// render image pixels
	for(var i=0; i<len; i++) {
		// ctx.fillPixel(x[i],Math.easeInOutQuad(limit(c,50,true),y[i],200,50));
		if (big_p.z[i] === 1) {
			big_p.tym[i] = 1 + big_p.tym[i];
			t=big_p.tym[i]; 
			bx=big_p.u[i]; by=big_p.v[i]+big_p.t;
			cx=-big_p.chx[i]+big_p.l; cy=-big_p.chy[i]; 
			d=big_p.dur[i];
			ctx.fillPixel(ease(t,bx,cx,d),ease(t,by,cy,d));
			// ctx.fillPixel(big_p.x[i],big_p.y[i]);
		}
		
		// ctx.fillPixel(x[i],Math.easeInOutQuad(t,b,c,d));
		// ctx.fillStyle = 'rgba(0,0,255,1)'; 
		// ctx.fillPixel(x[i],b+c);
	}


	// render noise
	for(var i=0; i<noise.u.length; i++) {
		noise.t[i] = 1 + noise.t[i];
		t=noise.t[i]; 
		bx=noise.u[i]; by=noise.v[i];
		cx=(noise.u[i] > canvas.width/2)?6:-6; 
		cy=-noise.c[i]; 
		d=200;
		ctx.fillPixel(ease(t,bx,cx,d),ease(t,by,cy,d));
		if (noise.t[i] >= d) {
			noise.u.shift();
			noise.v.shift();
			noise.t.shift();
			noise.c.shift();
		}
	}

	// render progressbar
	ctx.globalAlpha = .7;
	ctx.fillRect(canvas.width, 0, -Math.floor(audio.currentTime/audio.duration*cvs.width()), 2);
	ctx.globalAlpha = 1;

	main_ctx.clearRect(0, 0, main_canvas.width, main_canvas.height);
	main_ctx.drawImage(canvas, 0,0,canvas.width, canvas.height);

	// g++;
	// if(g >= 20) {
	// 	g = 0;
	// 	console.log(++h);
	// }
}


function playAnimation () {
	big_p.init(0,0);
	big_p.l = Math.floor((canvas.width/2) - (big_p.w/2));
	big_p.t = Math.floor((canvas.height/2) - (big_p.h/2));
	/**/
	cc = 0; dd = 0; e = 0; f = 0; g = 0; h = 0;

	x = big_p.x; y = big_p.y;
	len = x.length; len99 = Math.floor(len*99/100);
	noise = {
		t: [],
		u: [],
		v: [],
		c: [],
		y: []
	};
	/**/
	
	theStart();
	audio.currentTime = 0;
	audio.play();
	clearInterval(iv);
	iv = setInterval(frameLooper,50);
}

function init() {
	console.log("init!");
	canvas = document.createElement("canvas");
	canvas.width = cvs.width();
	canvas.height = cvs.height();
	ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	ctx.resetTransform();
	ctx.fillStyle = '#f0f';
	ctx.strokeStyle = '#0f0';
	ctx.lineWidth = 4;
	ctx.rotate(180*Math.PI/180);
	ctx.translate(-canvas.width, -canvas.height);
	
	/*ctx.pixelData = [0,0,0,1];
	ctx.pixelColor = function (r,g,b,a) {
		var id = this.createImageData(1,1);
		id.data[0] = r;
		id.data[1] = g;
		id.data[2] = b;
		id.data[3] = a;
		this.pixelData = id;
	};
	ctx.putPixel = function (x,y) {
		this.putImageData(this.pixelData,x,y);
	};*/
	ctx.fillPixel = function (x,y) {
		this.fillRect(x,y,1,1);
	};

	
	main_canvas = document.getElementById('cvs');
	main_canvas.width = cvs.width();
	main_canvas.height = cvs.height();
	main_ctx = main_canvas.getContext('2d');
	main_ctx.imageSmoothingEnabled = false;
	main_ctx.resetTransform();

	// document.getElementById('audio_box').appendChild(audio);
	context = new AudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	source = context.createMediaElementSource(audio); 
	source.connect(analyser);
	analyser.connect(context.destination);

	// clearTimeout(st);
	// st = setTimeout(function () {
	// 	playAnimation();
	// },2000);

	var playing = false;
	document.body.onclick = function(e) {
		if(playing) return;
		playing = true;
		document.querySelector('#clicker').remove()
		playAnimation();
	}
}
