//empty

// Clear Canvas
function clearCanvas(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    shapeData = []
    console.log('Called Clear')
}

// Create Coordinate from pointer locator in canvas
function coordinateCreator(x,y){
    let coordinate = new Object;
    let widthDivisor = canvas.width/2;
    let heightDivisor = canvas.height/2;

    coordinate.X = (Math.round(x) - widthDivisor)/widthDivisor;
    coordinate.Y = (-1*Math.round(y)-heightDivisor)/heightDivisor;

    return coordinate;
}