song = '';
scoreLeftWrist = 0;
leftWristX = 0;
leftWristY = 0;

scoreRightWrist = 0;
rightWristX = 0;
rightWristY = 0;


function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#ff0000");
    stroke("#ff0000");
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals / 500;
        document.getElementById("Volume").innerHTML = volume;
        song.setVolume(volume);
    }
    circle(rightWristX, rightWristY, 20);
    if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("Speed").innerHTML = "0.5x";
        song.rate(0.5);
    } else if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("Speed").innerHTML = "1x";
        song.rate(1);
    } else if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("Speed").innerHTML = "1.5x";
        song.rate(1.5);
    } else if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("Speed").innerHTML = "2x";
        song.rate(2);
    } else if (rightWristY > 400 && rightWristY <= 500) {
        document.getElementById("Speed").innerHTML = "2.5x";
        song.rate(2.5);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left Wrist X = " + leftWristX);
        console.log("Left Wrist Y = " + leftWristY);

        console.log("Right Wrist X = " + rightWristX);
        console.log("Right Wrist Y = " + rightWristY);
    }
}