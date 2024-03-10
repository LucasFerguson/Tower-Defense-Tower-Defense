//windowWidth, windowHeight
function menu() {

    this.slot1 = createVector();
    this.slot2 = createVector();
    this.slot3 = createVector();
    this.slot4 = createVector();

    this.render = function () {

        push();


        translate(window.x, window.y);

        fill(40,40,40,60);
        noStroke();
        rect(-(windowWidth / 2), (windowHeight / 2), windowWidth, -50);

        translate(0, windowHeight / 2);

        fill(255);
        stroke(0);
        // Draw FPS (rounded to 2 decimal places) 
        // at the bottom of the screen
        var fps = frameRate();
        text("FPS: " + fps.toFixed(2), 200, -20);
        // and score //
        textSize(30);
        text("Score: " + score, -50, -20);
        text("Lives: " + player.lives, -200, -20);
        text("Health: " + player.health, -400, -20);

        pop();
    };
}