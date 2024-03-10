/**
 * index.js
 * - All our useful JS goes here, awesome!
 */

var world_Width;
var world_Height;

var window;


var menu;

var starField = [];

var player;
//var player2;
var asteroids = [];
var enemies = [];
var enemielasers = [];
var explosions = [];

var genRateB = 0;
var genRateM = 0;
var genRateA = 0;

var score = 0;

var powerUps = [];

function setup() {
    //createCanvas(400, 400);
    createCanvas(windowWidth, windowHeight);
    background(255, 0, 200);

    world_Width = 2000;
    world_Height = 2000;

    window = createVector(0, 0)

    menu = new menu();

    //for (var i = 0; i < player.length; i++) {
    var keybindingMode = 1;
    player = new Player2D();
    player.keybindingMode = 1;

    powerUps.push(new HealthPack());


    //player[1] = new Player2D();
    //player[1].keybindingMode = 0;
    //}

    //player = new Player2D();
    //player2 = new Player2D(100);
    DrawGrid();
    genStar();
    genAsteroidField();
}

function draw() {

    background(0, 0, 0);
    translate(width / 2, height / 2);


    //translate(-player.pos.x, -player.pos.y);

    window.x = player.pos.x;
    window.y = player.pos.y;

    translate(-window.x, -window.y);
    //menu.render();


    DrawGrid();
    DrawStarField();

    //player2.movementControls();
    //player2.render();

    if (genRateM == 500) {
        enemies.push(new EnemyMissle());
        powerUps.push(new HealthPack());
        powerUps.push(new DoubleHealth());
        genRateM = 0;
    }
    genRateM++;

    if (genRateB == 150) {
        asteroids.push(new Asteroid());
        enemies.push(new EnemyBasic());
        genRateB = 0;
    }
    genRateB++;

    if (genRateA == 60) {
        asteroids.push(new Asteroid());
        genRateA = 0;
    }
    genRateA++;

    for (var i = powerUps.length - 1; i >= 0; i--) {
        powerUps[i].update();
        powerUps[i].render();

        var destroyPower = false;
        if ( player.hits(powerUps[i]) ) {
            if (powerUps[i].name == "Health") {
                player.health += powerUps[i].heal;
                score += 10;
            }

            if (powerUps[i].name == "DoubleHealth") {
                player.health *= powerUps[i].heal;
                score += 10;
            }
            destroyPower = true
        }

        if (powerUps[i].edges() || destroyPower) {
            powerUps.splice(i, 1);
        }
    }

    for (var i = player.lasers.length - 1; i >= 0; i--) {
        var destroy = false;
        player.lasers[i].update();
        player.lasers[i].render("blue");

        for (var j = asteroids.length - 1; j >= 0; j--) {
            if (player.lasers[i].hits(asteroids[j])) {
                //var newAsteroids = asteroids[j].breakup();
                //asteroids = asteroids.concat(newAsteroids);
                //score += 100;

                //asteroids.splice(j, 1);
                if (asteroids[j].takeDamage(10)) {
                    asteroids.splice(j, 1);
                }
                score += 10;

                destroy = true;
                //break;
            }
        }

        for (var j = enemies.length - 1; j >= 0; j--) {
            if (player.lasers[i].hits(enemies[j])) {
                
                
                if (enemies[j].takeDamage(player.lasers[i].damage)) {
                    enemies.splice(j, 1);
                }

                score += 10;

                destroy = true;
                //break;
            }
        }

        if (destroy || player.lasers[i].edges()) {
            player.lasers.splice(i, 1);
        }
    }


    for (var i = 0; i < asteroids.length; i++) {

        asteroids[i].update();
        asteroids[i].render();

        if (asteroids[i].edges()) {
            asteroids.splice(i, 1);
        }

        if (player.hits(asteroids[i])) {
            score += 10;
            asteroids[i].takeDamage(10);
            if (player.takeDamage(10)) {
                player.pos = createVector(0, 0);
                reset();
            }
            break;
        }
    }

    for (var a = enemies.length - 1; a >= 0; a--) {
        enemies[a].update();
        enemies[a].render();

        enemies[a].lasorFire();
        
        var enemieDestroy = false;
        if (player.hits(enemies[a])) {
            score += 10;
            if (player.takeDamage(10)) {
                player.pos = createVector(0, 0);
                reset();
            }

            if (enemies[a].takeDamage(10)) {
                enemieDestroy = true;
            }
        }

        if (enemies[a].edges() || enemieDestroy ) {
            enemies.splice(a, 1);
        }

    }

    // enemielasers updateing //
    var destroylaser = false;

    for (var b = enemielasers.length - 1; b >= 0; b--) {
        enemielasers[b].update();

        if (enemielasers[b].name == "Missle") {
            enemielasers[b].render("purple");
        } else {
            enemielasers[b].render("red");
        }

        destroylaser = false;

        if (enemielasers[b].hits(player)) { // if (player.hits(enemielasers[b])) {
            destroylaser = true;
            if (player.takeDamage(enemielasers[b].damage)) {
                player.pos = createVector(0, 0);
                reset();
                break;
            }
        }

        for (var j = enemies.length - 1; j >= 0; j--) {
            if (enemielasers[b].hits(enemies[j])) {

                if (enemies[j].takeDamage(10)) {
                    enemies.splice(j, 1);
                }

                destroylaser = true;
                break;
            }
        }

        for (var j = asteroids.length - 1; j >= 0; j--) {
            if (enemielasers[b].hits(asteroids[j])) {

                if (asteroids[j].takeDamage(10)) {
                    asteroids.splice(j, 1);
                }

                destroylaser = true;
                //break;
            }
        }

        if (enemielasers[b].edges()) {
            destroylaser = true;
        }

        if (destroylaser) {
            enemielasers.splice(b, 1);
        }
    }

    for (var b = explosions.length - 1; b >= 0; b--) {
        explosions[b].update();
        if (this.explosions[b].particles.length < 1) {
            this.explosions.splice(b, 1);
        }
    }

    player.movementControls();
    player.update();
    player.edges();
    player.render();

    player.lasorFire();
    player.missleFire();
    player.beamFire();


    menu.render();

}

function reset() {
    player.health = player.maxHealth;
    player.lives -= 1;
    //asteroids = [];
    enemielasers = [];
    console.log("you got hit");

    genStar();

    //genAsteroidField();
}

function genStar() {
    for (var i = 0; i < 40; i++) {
        var x = random(-world_Width / 2, world_Width / 2);
        var y = random(-world_Height / 2, world_Height / 2);
        if (i < 700) {
            var size = random(10, 40);
        } else {
            var size = random(50, 80);
        }
        starField[i] = new Star(createVector(x, y), size);
    }
}

function genAsteroidField() {
    for (var i = 0; i < 40; i++) {
        var x = random(-world_Width / 2, world_Width / 2);
        var y = random(-world_Height / 2, world_Height / 2);
        asteroids.push(new Asteroid(x, y));
    }

}

function DrawGrid() {
    push();
    fill(255);
    stroke(255);
    strokeWeight(1);
    for (var i = -world_Height / 2; i <= world_Height / 2; i += 500) {
        line(-world_Width / 2, i, world_Width / 2, i);
    }
    for (var i = -world_Width / 2; i <= world_Width / 2; i += 500) {
        line(i, -world_Height / 2, i, world_Height / 2);
    }
    pop();
}