// Polygon-related
let polyButton = document.getElementById('poly-btn');
let polyInputter = document.getElementById('poly-inputter');
let polyField = document.getElementById('poly-field');
let polySubmit = document.getElementById('poly-submit');
let vertCount = 0;
let polyVertices = [];
let drawingMode = false;

polyButton.addEventListener('click',function(){
    let drawnShape = "polygon";
    polyInputter.style.display = 'block';
});
polySubmit.addEventListener('click',function(){
    polyInputter.style.display = 'none';
    vertCount = parseInt(polyField.value);
    // let canvas = document.getElementById("gl-canvas");
    canvas.addEventListener('click',drawPolygonVertex);
    drawingMode = true
});

// Draw Polygon by locating vertex position (pointer location) in canvas
function drawPolygonVertex(e){
    // let xCoor = (e.clientX - canvas.getBoundingClientRect().left)/canvas.width*2 - 1;
    // let yCoor = (e.clientY - canvas.getBoundingClientRect().top)/canvas.height*-2 + 1;
    if (drawingMode == true){
        let xCoor = e.clientX - canvas.getBoundingClientRect().left;
        let yCoor = e.clientY - canvas.getBoundingClientRect().bottom;
        console.log(xCoor,yCoor);
        let coord = coordinateCreator(xCoor,yCoor);
        console.log(coord.X,coord.Y);
        polyVertices.push(coord);
        if(vertCount == polyVertices.length){
            drawingMode = false
            let poly = new Object;
            poly.vertices =[]
            for (let index = 0; index < polyVertices.length; index++) {
                poly.vertices.push(polyVertices[index]);            
            }
            // let shapesCoordinates = []
            // shapesCoordinates.push(poly.vertices);
            // objectDrawer(shapesCoordinates);
            shapeData.push(poly);
            objectDrawer(shapeData);
        }
    }


}