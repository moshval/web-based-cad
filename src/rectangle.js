let rectangleButton = document.getElementById("rectangle-btn");
let drawingRect = false;

rectangleButton.addEventListener("click", function(){
    let drawnShape = 'rectangle';
    canvas.addEventListener('click',drawRect);
    console.log("enabling line drawing mode");
    draggingMode = false;
    movingMode = false;
    moveBtn.textContent = "Start Moving Object";
    drawingMode = true;
    drawingPoly = false;
    drawingRect = true; 
    drawingSquare = false;
    drawingLine = false;
})    

function drawRect(e) {
    if (drawingMode == true && draggingMode==false && drawingRect == true && movingMode == false){
        let xCoor = e.clientX - canvas.getBoundingClientRect().left;
        let yCoor = e.clientY - canvas.getBoundingClientRect().top;

        // not needed
        // gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
        // gl.bufferSubData(gl.ARRAY_BUFFER,8*iterator,flatten(poi));

        let col = vec4(red,green,blue,1.0);

        // not needed
        // gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer); 
        // gl.bufferSubData(gl.ARRAY_BUFFER,16*iterator,flatten(col));
        
        tempCol.push(col);
        console.log(xCoor,yCoor);
        let coord = coordinateCreator(xCoor,yCoor);
        
        console.log(coord.X,coord.Y);
        polyVertices.push(coord);

        // if mouse clicking to get vertex loc is done (eq to input from rect field)
        if(polyVertices.length == 2){
            drawingMode = false;
            drawingRect = false;
            let rect = new Object;
            rect.id = id;
            rect.name = "rectangle";
            rect.vertices =[];
            let tcl = tempCol[polyVertices.length-1];
            rect.colors = tcl;
            rect.vertIdx = [];
            rect.length = initialLength;
            let coord1 = coorCreate(polyVertices[0].X,polyVertices[1].Y);
            let coord2 = coorCreate(polyVertices[1].X,polyVertices[0].Y);
            // coord1.X = polyVertices[0].X;
            // coord1.Y = polyVertices[1].Y;
            // coord2.X = polyVertices[1].X;
            // coord2.Y = polyVertices[0].Y;
            let tempPoly = polyVertices.pop();
            console.log("pop");
            polyVertices.push(coord2)
            polyVertices.push(tempPoly);
            polyVertices.push(coord1);
            // polyVertices.push(tempPoly);
            console.log(polyVertices.length)
        
            // Color included
            for (let index = 0; index < polyVertices.length; index++) {
                // gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
                // gl.bufferSubData(gl.ARRAY_BUFFER,16*vertIndex,flatten(tempCol[polyVertices.length-1])); //only uses last color picked by a shape (bisa diubah ke per vertex kalo mau)
                console.log(polyVertices[index].X,polyVertices[index].Y);
                rect.vertIdx.push(vertIndex);
                rect.vertices.push(polyVertices[index]);
                vertIndex++;            
            }
            tempCol = []
            id++;
            shapeData.push(rect);
            objectDrawer(shapeData);
        }
    }
}
