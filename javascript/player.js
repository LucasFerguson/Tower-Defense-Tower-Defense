function Player2D() {
    this.pos = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.acc = createVector(99, 99);
    
    this.maxVel = 5;
    
    this.lives = 3;
    this.health = 100;
    this.maxHealth = 100;

    this.width = 20;
    this.height = 20;

    this.scale = 20;

    this.lasers = [];
    this.rechargeLasor = 0;
    this.rechargeMissle = 0;
    this.rechargeBeam = 0;


    this.keybindingMode = 1;
    this.keybindings = [
        {
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            shoot: 16
        }, {
            up: 87,
            down: 83,
            left: 65,
            right: 68,
            shoot: 71,
            shoot2: 72,
            shoot3: 74
        }
    ];

    this.update = function () {
        //this.pos.x = lerp(-this.pos.x, asteroids[0].pos.x, -0.05);
        //this.pos.y = lerp(-this.pos.y, asteroids[0].pos.y + 35, -0.05);

        this.vel.add(this.acc);

        this.pos.add(this.vel);

        if (Math.abs(this.vel.x) > 0.1 || Math.abs(this.vel.y) > 0.1) {
            this.vel.mult(0.99);
        } else {
            this.vel.mult(0);
        }

        if (this.vel.x > this.maxVel) {
            this.vel.x = this.maxVel;
        }

        if (this.vel.x < -this.maxVel) {
            this.vel.x = -this.maxVel;
        }

        if (this.vel.y > this.maxVel) {
            this.vel.y = this.maxVel;
        }

        if (this.vel.y < -this.maxVel) {
            this.vel.y = -this.maxVel;
        }

    };


    this.lasorFire = function () {
        if (!keyIsDown(this.keybindings[this.keybindingMode].shoot)) {
            this.rechargeLasor += 50;
        }

        if (this.rechargeLasor > 7 && keyIsDown(this.keybindings[this.keybindingMode].shoot)) {
            this.lasers.push(new Laser(this.pos, createVector(0, -8)));
            this.rechargeLasor = 0;
        }
        this.rechargeLasor++;
        //console.log(fire);
    };

    this.missleFire = function () {
        if (!keyIsDown(this.keybindings[this.keybindingMode].shoot2)) {
            this.rechargeMissle += 50;
        }

        if (this.rechargeMissle > 7 && keyIsDown(this.keybindings[this.keybindingMode].shoot2)) {
            this.lasers.push(new Missle(createVector(this.pos.x, this.pos.y), this.vel, "enemy"));
            this.rechargeMissle = 0;
        }
        this.rechargeMissle++;
        //console.log(fire);
    };
    
    this.beamFire = function () {
        if (!keyIsDown(this.keybindings[this.keybindingMode].shoot3)) {
            this.rechargeBeam += 10000;
        }

        if (this.rechargeBeam > 10 && keyIsDown(this.keybindings[this.keybindingMode].shoot3)) {
            this.lasers.push(new Beam(createVector(this.pos.x, this.pos.y)));
            this.rechargeBeam = 0;
        }
        this.rechargeBeam++;
        //console.log(fire);
    };


    this.render = function () {
        push();
        noFill();
        stroke(0, 255, 0);
        ellipse(this.pos.x, this.pos.y, this.width, this.height);

        fill(0, 255, 0);
        text("x " + this.pos.x + "  y " + this.pos.y, this.pos.x, this.pos.y - 30);
        
        stroke(255, 0, 0);
        line(this.pos.x, this.pos.y - 20, this.pos.x + this.maxHealth, this.pos.y- 20);
        stroke(0, 255, 0);

        // var healthRows = this.health / 200;

        // for (var i = 1; i <= healthRows; i++) {
        //     line(this.pos.x, (this.pos.y - 20) + (i * 2), this.pos.x + 200, (this.pos.y - 20) + (i * 2));
        // }

        // line(this.pos.x, (this.pos.y - 20) + healthRows * 2, ((200 * healthRows) - this.health) + this.pos.x , (this.pos.y - 20) + healthRows * 2);

        line(this.pos.x, (this.pos.y - 20), this.pos.x + this.health, (this.pos.y - 20) );

        pop();
    };

    this.hits = function (asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < (asteroid.scale / 2) + (this.scale / 2)) {
            return true;
        } else {
            return false;
        }

        // if (this.health <= 0) {
        //     return true;
        // } else {
        //     return false;
        // }

    };

    this.takeDamage = function (damage) {
        this.health -= damage;

        if (this.health <= 0) {
            return true;
        } else {
            return false;
        }
    }


    this.movementControls = function () {

        if (keyIsDown(this.keybindings[this.keybindingMode].left)) {
            this.acc.x = -0.5;
        }
        if (keyIsDown(this.keybindings[this.keybindingMode].right)) {
            this.acc.x = 0.5;
        }
        if (!keyIsDown(this.keybindings[this.keybindingMode].right) && !keyIsDown(this.keybindings[this.keybindingMode].left)) {
            this.acc.x = 0;
        }

        if (keyIsDown(this.keybindings[this.keybindingMode].up)) {
            this.acc.y = -0.5;
        }
        if (keyIsDown(this.keybindings[this.keybindingMode].down)) {
            this.acc.y = 0.5;
        }
        if (!keyIsDown(this.keybindings[this.keybindingMode].up) && !keyIsDown(this.keybindings[this.keybindingMode].down)) {
            this.acc.y = 0;
        }
    };

    this.edges = function() {

        if (this.pos.x > world_Width / 2 ) {
            this.vel.x = -5;
        } else if (this.pos.x < -(world_Width / 2 )) {
            this.vel.x = 5;
        }

        if (this.pos.y > world_Height / 2 ) {
            this.vel.y = -5;
        } else if (this.pos.y < -(world_Height / 2 )) {
            this.vel.y = 5;
        }

    };




}