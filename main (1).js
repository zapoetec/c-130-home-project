var music1="";
var music2="";
function preload(){
music1=loadSound("music.mp3");
music2=loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    song1staus=music1.isPlaying();
    fill("red");
    stroke("green");
    if(scoreleftwrist>0.2){
        circle(leftWristX,leftWristY,20);
        music2.stop();
    }
        if(song1staus="false"){
music1.play();
document.getElementById("heading1").innerHTML="Song 1";
        }
        song2staus=music2.isPlaying();
        if(scorerightwrist>0.2){
            circle(rightWristX,rightWristY,20);
            music1.stop();
        }
            if(song2staus="false"){
    music2.play();
    document.getElementById("heading1").innerHTML="Song 2";
            }
}
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1staus="";
function modelLoaded(){
console.log('Posenet is Initialized');
}
scoreleftwrist=0;
scorerightwrist=0;
function gotPoses(results)
{
    if(results.length>0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);
        scoreleftwrist=results[0].pose.keypoints[9].score;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
    scorerightwrist=results[0].pose.keypoints[10].score;
    }
}
