const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

let hero = { x: 50, y: 300, width: 50, height: 50, dy: 0, gravity: 0.8, jumpPower: -12, onGround: true };
let obstacles = [];
let score = 0;
let gameSpeed = 4;

function jump() {
    if(hero.onGround) {
        hero.dy = hero.jumpPower;
        hero.onGround = false;
    }
}

document.addEventListener('keydown', e => { if(e.code === 'Space') jump(); });

function spawnObstacle() {
    obstacles.push({ x: canvas.width, y: 350, width: 50, height: 50 });
}

setInterval(spawnObstacle, 2000);

function update() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Hero physics
    hero.dy += hero.gravity;
    hero.y += hero.dy;
    if(hero.y >= 300) {
        hero.y = 300;
        hero.dy = 0;
        hero.onGround = true;
    }

    // Draw hero
    ctx.fillStyle = "#00C853";
    ctx.fillRect(hero.x, hero.y, hero.width, hero.height);

    // Update obstacles
    obstacles.forEach((ob, idx) => {
        ob.x -= gameSpeed;
        ctx.fillStyle = "#FF5252";
        ctx.fillRect(ob.x, ob.y, ob.width, ob.height);

        // Collision
        if(hero.x < ob.x + ob.width && hero.x + hero.width > ob.x &&
           hero.y < ob.y + ob.height && hero.y + hero.height > ob.y) {
               alert('Game Over! Score: ' + score);
               document.location.reload();
           }

        // Remove off-screen
        if(ob.x + ob.width < 0) {
            obstacles.splice(idx,1);
            score++;
        }
    });

    // Score
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    requestAnimationFrame(update);
}

update();
