var renderer = new vf.renderer.WebGLRenderer({});
var stage = new vf.renderer.Container();
document.body.appendChild(renderer.view);

stage.addChild(new vf.renderer.Sprite(vf.renderer.Texture.fromImage('./assets/bg.png')));

let texture = vf.renderer.Texture.fromImage('./assets/displacement_fish1.png');
// console.log(texture);

let fishs = [];
for (var i = 0; i < 500; i++) {
	let fish = new vf.renderer.Sprite(vf.renderer.Texture.fromImage('./assets/displacement_fish'+((i % 4) + 1)+'.png'));
	fish.anchor.set(0.5,0.5);
	fish.scale.set(0.1 + Math.random() * 0.2);
	fish.alpha = 0.3 + Math.random() * 0.7;
	fish.x = Math.random() * renderer.view.offsetWidth;
	fish.y = Math.random() * renderer.view.offsetHeight;

	fish.direction = Math.random() * Math.PI * 2;
	fish.turningSpeed = Math.random() - 1;
	fish.speed = (1 + Math.random() * 2) * 4;
	fish.offset = Math.random() * 100;

	stage.addChild(fish);
	fishs.push(fish)
}

var fishBounds = new vf.renderer.Rectangle(-100, -100, renderer.view.offsetWidth+200, renderer.view.offsetHeight+200);

render();

function render() {
	// console.log('render');

	for (var i = 0; i < fishs.length; i++) {
		var fish = fishs[i];
		fish.direction += fish.turningSpeed * 0.01;
		fish.x += Math.sin(fish.direction) * (fish.speed * fish.scale.y);
		fish.y += Math.cos(fish.direction) * (fish.speed * fish.scale.y);
		fish.rotation = -fish.direction - Math.PI / 2;

		// wrap the maggots
		if (fish.x < fishBounds.x) {
			fish.x += fishBounds.width;
		} else if (fish.x > fishBounds.x + fishBounds.width) {
			fish.x -= fishBounds.width;
		}
		if (fish.y < fishBounds.y) {
			fish.y += fishBounds.height;
		} else if (fish.y > fishBounds.y + fishBounds.height) {
			fish.y -= fishBounds.height;
		}
	}

	renderer.render(stage);
	setTimeout(render, 20);
}