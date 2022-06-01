song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

ScoreRightWrist = 0;
ScoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload() {
    song1 = loadSound("Song1.mp3");
    song2 = loadSound("Song2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCpature(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results + "I hope they work");
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill('#FF0000');
    stroke('#FF0000');

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWrsitY, 20);

        song2.stop();

        if (song1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Someone I used to know";
        }
    }
}