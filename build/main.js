var renderer  =  new vf.renderer.WebGLRenderer({});
var stage = new vf.renderer.Container();
document.body.appendChild(renderer.view);

stage.addChild(new vf.renderer.Sprite(vf.renderer.Texture.fromImage('./assets/bg.png')));

let texture = vf.renderer.Texture.fromImage('./assets/displacement_fish1.png');
// console.log(texture);
for (var i = 0; i < 20; i++) {
	let sprite = new vf.renderer.Sprite(texture);
	// sprite.anchor.set(0.5,0.5);
	sprite.scale.set(0.2,0.4);
	sprite.x = (i % 5) * 40;
	sprite.y = Math.floor(i / 5) * 40;
	stage.addChild(sprite);
}


render();

function render()
{
	console.log('render');
	renderer.render(stage);
	setTimeout(render,1000);
}