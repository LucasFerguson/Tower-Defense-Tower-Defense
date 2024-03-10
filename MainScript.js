

var missles = [];
var antimissles = [];
var autos = [];

var targets = [];

function setup() {
    createCanvas(windowWidth - 10, windowHeight - 10);

}

var genRateA = 10000000000;
var frame = 0;
function draw() {
    background(51);
    frame++;
    //translate(width / 2, height / 2);

    if (genRateA >= 1 && 1000 >= missles.length + antimissles.length) {
        missles.push(new Missle("Missle", 2, width / 2, height - 100));
        antimissles.push(new Missle("Antimissle", 1, width / 2, 100));

        genRateA = 0;
    }
    genRateA++;

    // for (var a = 0; a < 1; a++) {
    //     missles.push(new Missle("Missle", 2, width / 2, height - 100));
    //     antimissles.push(new Missle("Antimissle", 1, width / 2, 100));
    // }

    for (var b = missles.length - 1; b >= 0; b--) {
        missles[b].update();
        missles[b].render();
    }

    for (var b = antimissles.length - 1; b >= 0; b--) {
        antimissles[b].update();
        antimissles[b].render();
    }

    for (var b = autos.length - 1; b >= 0; b--) {
        if (frame % 10 == 0) {
            autos[b].update();
        }
        autos[b].render();
    }

    for (var a = missles.length - 1; a >= 0; a--) {
        for (var b = antimissles.length - 1; b >= 0; b--) {
            if (col(missles[a], antimissles[b])) {
                missles.splice(a, 1);
                antimissles.splice(b, 1);
                break;
            }
        }
    }

    let fps = frameRate();
    fill(255);
    stroke(0);
    text("FPS: " + fps.toFixed(2), 10, height - 10);
    let length = missles.length + antimissles.length;
    text("missles: " + length, 10, height - 40);

}

function col(a, b) {

    var d = Math.sqrt(
        Math.pow(a.pos.x - b.pos.x, 2)
        +
        Math.pow(a.pos.y - b.pos.y, 2)
    );

    if (d < a.scale + b.scale) {
        return true;
    } else {
        return false;
    }
}

function mousePressed() {
    autos.push(new Auto(mouseX, mouseY, 50))
    // var r = {
    //     pos: createVector(mouseX, mouseY),
    //     scale: 100
    // }

    // for (var a = missles.length - 1; a >= 0; a--) {
    //     if (col(missles[a], r)) {

    //         var abc = createVector(mouseX, mouseY);

    //         abc.sub(missles[a].pos);
    //         abc.setMag(-2);

    //         missles[a].acc.add(abc);

    //     }
    // }

    // for (var a = antimissles.length - 1; a >= 0; a--) {
    //     if (col(antimissles[a], r)) {

    //         var abc = createVector(mouseX, mouseY);

    //         abc.sub(antimissles[a].pos);
    //         abc.setMag(-2);

    //         antimissles[a].acc.add(abc);

    //     }
    // }

    // for (var b = antimissles.length - 1; b >= 0; b--) {

    // }

    // missles.push(new Missle("Missle", 2, mouseX, mouseY));
    // antimissles.push(new Missle("Antimissle", 1, mouseX + 50, mouseY));

}

function keyPressed() {
    if (key) {
        console.log(key);
        autos = [];
    }
}

class Auto {
    constructor(_x, _y, _r) {
        this.pos = createVector(_x, _y);
        this.r = _r;
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        {

            stroke(255, 255, 0);

            strokeWeight(6);
            point(0, 0);

        }
        pop();
    }

    update() {
        var r = {
            pos: createVector(this.pos.x, this.pos.y),
            scale: 100
        }

        for (var a = missles.length - 1; a >= 0; a--) {
            if (col(missles[a], r)) {

                var abc = createVector(this.pos.x, this.pos.y);

                abc.sub(missles[a].pos);
                abc.setMag(-1);

                missles[a].acc.add(abc);

            }
        }

        for (var a = antimissles.length - 1; a >= 0; a--) {
            if (col(antimissles[a], r)) {

                var abc = createVector(this.pos.x, this.pos.y);

                abc.sub(antimissles[a].pos);
                abc.setMag(-1);

                antimissles[a].acc.add(abc);

            }
        }
    }
}

class Missle {

    constructor(name, targetA, x, y) {
        this.name = name;

        this.pos = createVector(x, y);

        this.vel = createVector(random(-1, 1), random(-1, 1));

        this.acc = createVector(0, 0);

        this.scale = 10;

        this.damage = 30;

        this.targetA = targetA;
        this.targetid = createVector(0, 0);
        this.targetpos = createVector(width / 2, height / 2);

        if (this.targetA == 1) {
            this.targetpos = createVector(width / 2, height - 100);
        } else if (this.targetA == 2) {
            this.targetpos = createVector(width / 2, 100);

        }
        this.time = 1000;
    }

    update() {
        // if (targets.length >= 1) {
        //     var targetid = createVector( targets[targets.length - 1].x, targets[targets.length - 1].y);
        // } else {
        //     var targetid = createVector(0, 0);
        // }

        // this.time++;
        // if (this.time >= 10) {
        // this.findTarget();
        //     this.time = 0;
        // }

        // var targetpos = createVector(width / 2, height / 2);

        // this.time++;
        // if (this.time >= 60) {
        // if (this.targetA == 1) {
        //     this.targetpos = createVector(width / 2, height - 100);

            // if (missles[this.targetid]) {
            //     targetpos = createVector(missles[this.targetid].pos.x, missles[this.targetid].pos.y);
            // } else {
            // targetpos = createVector(width / 2, height / 2);
            // }
        // } else if (this.targetA == 2) {
        //     this.targetpos = createVector(width / 2, 100);

            // if (antimissles[this.targetid]) {
            //     targetpos = createVector(antimissles[this.targetid].pos.x, antimissles[this.targetid].pos.y);
            // } else {
            //     // targetpos = createVector(width / 2, height / 2);
            // }
        // }
        //     this.time = 0;
        // }

        var ta = this.targetpos.copy();
        // this.targetpos = targetpos;

        ta.sub(this.pos);
        ta.setMag(0.04);
        this.acc.add(ta);

        this.vel.add(this.acc);
        this.pos.add(this.vel);


        if (this.pos.x < 0) {
            // this.pos.x = width;
            this.vel.mult(0);
        }

        if (this.pos.x > width) {
            // this.pos.x = 0;
            this.vel.mult(0);
        }

        if (this.pos.y < 0) {
            // this.pos.y = height;
            this.vel.mult(0);
        }

        if (this.pos.y > height) {
            // this.pos.y = 0;
            this.vel.mult(0);
        }

        // this.vel.mult(0.99);

        this.acc.mult(0);

    }

    findTarget() {
        var shortest = 0;
        var newD;
        var shortestD;
        if (this.targetA == 1 && missles.length >= 2 && antimissles.length >= 2) {

            for (var n = 0; n < missles.length; n++) {
                newD = dist(this.pos.x, this.pos.y, missles[n].pos.x, missles[n].pos.y)
                shortestD = dist(this.pos.x, this.pos.y, missles[shortest].pos.x, missles[shortest].pos.y)

                if (newD < shortestD) {
                    shortest = n;
                }
            }

            this.targetid = shortest;
            this.targetpos = missles[shortest].pos.copy();

        } else if (this.targetA == 2 && missles.length >= 1 && antimissles.length >= 1) {

            for (var n = 0; n < antimissles.length; n++) {
                newD = dist(this.pos.x, this.pos.y, antimissles[n].pos.x, antimissles[n].pos.y)
                shortestD = dist(this.pos.x, this.pos.y, antimissles[shortest].pos.x, antimissles[shortest].pos.y)

                if (newD < shortestD) {
                    shortest = n;
                }
            }

            this.targetid = shortest;
            this.targetpos = missles[shortest].pos.copy();

        }
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        {
            if (this.name == "Antimissle") {
                stroke(255, 0, 0);
            } else {
                stroke(0, 255, 0);
            }
            strokeWeight(6);
            point(0, 0);

            // line(0, 0, -this.vel.x * 2, -this.vel.y * 2);

            // strokeWeight(0.6);
            // if (this.targetpos) {
            //     line(0, 0, this.targetpos.x - this.pos.x, this.targetpos.y - this.pos.y);
            // }

        }
        pop();
    }

}


// // class Cat extends Missle {
// //     constructor(a, b) {

// //     }
// // }

// // var cat = new Cat("Trick", 10);

// class Rectangle {
//     constructor(height, width) {
//         this.name = 'Rectangle';
//         this.height = height;
//         this.width = width;
//     }
//     sayName() {
//         console.log('Hi, I am a ', this.name + '.');
//     }
//     get area() {
//         return this.height * this.width;
//     }
//     set area(value) {
//         this.height = this.width = Math.sqrt(value);
//     }
// }


// var bob = new Rectangle(10, 10);
// bob.set.area(10)
// console.log(bob.area  );