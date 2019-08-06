let fs = require('fs')

let st1 = fs.readFileSync('pixelraw.bin').toString()
let width = 400, height = 400, t ='', bits = 16
console.log(st1.length)

for (let iii = 0; iii<width*height; iii+=bits ) {
	let st2 = st1.substr(iii,bits);
	let n32 = parseInt(st2, 2);
	t += n32 + ",";
}

fs.writeFileSync('pixelint.dec', Buffer.from(t, 'utf8'))