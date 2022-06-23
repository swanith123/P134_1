object_person = [];
person_status = "";

function setup() {
  canvas = createCanvas(400, 400);
  canvas.position(425, 225);
  video = createCapture(VIDEO);
  video.size(400,400);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Object Detected";
}

function preload(){
    song = loadSound("music.mp3");
}


function modelLoaded() {
  console.log("Model Loaded!")
  person_status = true;
}


function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  else{
    console.log(results);
    object_person = results;
  }
}


function draw() {
  image(video, 0, 0, 400, 400);

      if(person_status != "")
      {
        objectDetector.detect(video, gotResult);
        red = random(255);
        green = random(255); 
        blue = random(255);

          for (i = 0; i < object_person.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          fill(red, green, blue);
          percent = floor(objects[i].confidence * 100);
          text(object_person[i].label + " " + percent + "%", object_person[i].x + 15, object_person[i].y + 15);
          noFill();
          stroke(red, green, blue);
          rect(object_person[i].x, object_person[i].y, object_person[i].width, object_person[i].height);

        if (ml5.objectDetector('person'))  
        {
            document.getElementById("person_found").innerHTML = "Person(s) Found";
            song.stop("music.mp3");
        }
        else
        {
            document.getElementById("person_found").innerHTML = "Person(s) Not Found";
            song.play("music.mp3");
        }
        }
    }

    else
    {
        document.getElementById("person_found").innerHTML = "Person(s) Not Found";
            song.play("music.mp3");
    }
}
