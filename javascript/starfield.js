function Star(pos, size) {

    //this.constructor = function () {

    this.pos = createVector(0, 0);
    this.pos = pos;

    this.vel = createVector(0, 0);

    this.scale = createVector(size, size);

    this.update = function () {
        this.vel.x = player.vel.x * 0.96;
        this.vel.y = player.vel.y * 0.96;

        this.pos.add(this.vel);
    }

    this.render = function () {
        if (Math.abs(this.pos.x) < world_Width / 2 && Math.abs(this.pos.y) < world_Height / 2) {
            push();
            fill(255);
            noStroke();
            ellipse(this.pos.x, this.pos.y, this.scale.x / 10, this.scale.y / 10);
            pop();
        }
    }

}

function DrawStarField() {
    for (var i = 0; i < starField.length; i++) {
        starField[i].update();
        starField[i].render();

        // if (dist(starField[i].pos.x, starField[i].pos.y, players[0].pos.x, players[0].pos.y) < windowWidth/2) {
        //     starField[i].render();
        // }
    }
}