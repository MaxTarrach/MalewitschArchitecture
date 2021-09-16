function setup() {
  // Create the canvas
  createCanvas(1080, 720, WEBGL);
  
  let fr = 30;

  //cam = createCamera();
  frameRate(fr);
  
  //cam.move(540, 500, 0);

   // variables 
   let nPoints = 150;
   let radius = 150;
   centerX = 0;
   centerY = 0;

   // points 2-dimensional array 
  points = samplePoint(nPoints, radius);

  // Collection of triangles
  delauny = triangulatePoints(points);


}

function draw(){

  background(10);

  camera(0 , 300, 200, 0, 0, 50);

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;

  ambientLight(30, 30, 30);
  directionalLight(80, 80, 80, 1, 1, -1);

  // Set colors
  fill(162, 160, 165);
  stroke(0, 0, 0);

  // Array with all centroid positions
  centroids = [];

  for (let i = 0; i < delauny.length; i++) {

    centroid = centroidTriangle(delauny[i][0], delauny[i][1], delauny[i][2]);

    centroids.push(centroid)

  }

  //console.log(centroids);

  heights = [];

  for (let i=0; i < delauny.length; i++){

    height = euclideanDistance(centroids[i][0], centroids[i][1], centerX, centerY);

    height = 150 - height;

    heights.push(height);
    
  }

  console.log(heights);


  for (let i = 0; i < delauny.length; i++){

    triangle(delauny[i][0][0], delauny[i][0][1], delauny[i][1][0], delauny[i][1][1], delauny[i][2][0], delauny[i][2][1]);

   }


  for (let i = 0; i < delauny.length; i++) {

    push();
    
    rotateX(0);
    rotateY(0);
    rotateZ(millis() / 10000);
    drawShape(delauny[i][0], delauny[i][1], delauny[i][2], heights[i]);
    pop();
  
  }

}

// (0,0,0) (100,0,0) (50,50,0)
function drawShape(coordinate0, coordinate1, coordinate2, height){

  specularMaterial(250);
  shininess(15);
  

  // Bottom Triangle
  beginShape();

  vertex(coordinate0[0], coordinate0[1], 0);
  vertex(coordinate1[0], coordinate1[1], 0);
  vertex(coordinate2[0], coordinate2[1], 0);
    
  endShape(CLOSE);

  // Top Triangle
  beginShape();

  vertex(coordinate1[0], coordinate1[1], height);
  vertex(coordinate0[0], coordinate0[1], height);
  vertex(coordinate2[0], coordinate2[1], height);

  endShape(CLOSE);

  beginShape();

  vertex(coordinate0[0], coordinate0[1], 0);
  vertex(coordinate2[0], coordinate2[1], 0);
  vertex(coordinate2[0], coordinate2[1], height);
  vertex(coordinate0[0], coordinate0[1], height);
  
  endShape(CLOSE);

  beginShape();

  vertex(coordinate1[0], coordinate1[1], 0);
  vertex(coordinate1[0], coordinate1[1], height);
  vertex(coordinate0[0], coordinate0[1], height);
  vertex(coordinate0[0], coordinate0[1], 0);

  endShape(CLOSE);

  beginShape();

  vertex(coordinate1[0], coordinate1[1], height);
  vertex(coordinate2[0], coordinate2[1], height);
  vertex(coordinate2[0], coordinate2[1], 0);
  vertex(coordinate1[0], coordinate1[1], 0);

  endShape(CLOSE);



}


function samplePoint(nPoints, radius){

var points = [[]];


 for (let i = 0; i < nPoints; i++){

    var1 = radius * Math.sqrt(Math.random());
    var2 = 2 * Math.PI * Math.random();

    x = (var1 * Math.cos(var2));
    y = (var1 * Math.sin(var2));

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
 function euclideanDistance(triangleX, triangleY, centerX, centerY){

  const euclideanDistance = Math.sqrt((triangleX - centerX) ** 2 + (triangleY - centerY) ** 2);

  return euclideanDistance; 
 }
