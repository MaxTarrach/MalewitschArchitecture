function setup() {
  // Create the canvas
  createCanvas(1080, 720, WEBGL);
  
  //cam = createCamera();

  //cam.move(540, 500, 0);

   // variables 
   let nPoints = 150;
   let radius = 100;
   centerX = 540;
   centerY = 360;

   // points 2-dimensional array 
  points = samplePoint(nPoints, radius);

  // Collection of triangles
  delauny = triangulatePoints(points);


}

function draw(){

  background(100);

  camera(540, 100 , 500, 540, 360, 150, 1, 1, 0);

  // Set colors
  fill(204, 101, 192, 127);
  stroke(127, 63, 120);

  //drawShape();

  // Ein Dreieck an Stelle 3 
  console.log(delauny[3]);

  console.log(delauny.length);
  
  // Alle 3 x/y Koordinatenpaare des Dreiecks an stelle 3
  console.log(delauny[3][0]);
  console.log(delauny[3][1]);
  console.log(delauny[3][2]);

  // Array with all centroid positions
  centroids = [];

  for (let i = 0; i < delauny.length; i++) {

    centroid = centroidTriangle(delauny[i][0], delauny[i][1], delauny[i][2])

    centroids.push(centroid)

  }

  console.log(centroids);


  for (let i = 0; i < delauny.length; i++){

    triangle(delauny[i][0][0], delauny[i][0][1], delauny[i][1][0], delauny[i][1][1], delauny[i][2][0], delauny[i][2][1]);

   }


  for (let i = 0; i < delauny; i++){

    push();
    
    
    pop();




  }



}

function drawShape(){

  fill("#555555");
  beginShape();

  vertex(0, 0, 0);
  vertex(1, 0, 0);
  vertex(0.5, 1, 0);
  vertex(0, 0, 100);
  vertex(1, 0, 100);
  vertex(0.5, 1, 100);
  
  endShape(CLOSE);

}


function samplePoint(nPoints, radius){

var points = [[]];


 for (let i = 0; i < nPoints; i++){

    var1 = radius * Math.sqrt(Math.random());
    var2 = 2 * Math.PI * Math.random();

    x = (var1 * Math.cos(var2)) + 1080/2;
    y = (var1 * Math.sin(var2)) + 720/2;

    point(x, y);

    points.push([x,y])

 }

return points; 

}


// triangulate Points with delaunator
 function triangulatePoints(points){

  delaunay = Delaunator.from(points);
  
  let coordinates = [];

  for (let i = 0; i < delaunay.triangles.length; i += 3) {
    coordinates.push([
        points[delaunay.triangles[i]],
        points[delaunay.triangles[i + 1]],
        points[delaunay.triangles[i + 2]]
    ]);
  }

  return coordinates;

 }

 // Calculate center coordinate of triangle
 function centroidTriangle(firstCornerTriangle, secondCornerTriangle, thirdCornerTriangle){

  x = (firstCornerTriangle[0] + secondCornerTriangle[0] + thirdCornerTriangle[0]) / 3;
  y = (firstCornerTriangle[1] + secondCornerTriangle[1] + thirdCornerTriangle[1]) / 3;

  coordinate = [x, y]

  return coordinate;
 };

 // calculate euclidean distance between triangle center and image center
 function euclideanDistance(x1, x2, y1, y2){

  const euclideanDistance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

  return euclideanDistance; 
 }
