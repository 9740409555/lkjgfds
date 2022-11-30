video = "";
objects = [];
object_name = "";




function preload() {
video = createVideo('video.mp4');
video.hide();
}


function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidance * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15,  objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name)
            {
                video.stop();
                document.getElementById("status").innerHTML = "Status : Object is found"
        
            }
        }
    }

}

function start() {
    objectDetector = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects";
    object_name = document.getElementById("virat").value;
}

function ModelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);

}

function gotResults(error, results)
{
    if (error) {
console.log(error);
    }
    console.log(results);
    objects = results;
}
