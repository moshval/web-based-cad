let squareButton = document.getElementById("square-btn");
let drawingSquare = false;

squareButton.addEventListener("click", function(){
    let drawnShape = 'square';
    canvas.addEventListener('click',drawSquare);
    console.log("enabling line drawing mode");
    draggingMode = false;
    movingMode = false;
    moveBtn.textContent = "Start Moving Object";
    drawingMode = true;
    drawingSquare = true;
    drawingPoly = false;
    drawingRect = false;
    drawingLine = false;
})    

function drawSquare(e) {
    if (drawingMode == true && draggingMode==false && drawingSquare == true && movingMode == false){
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
        let coord2 = coordinateCreator(xCoor + 55 ,yCoor -55);
        let coord3 = coordinateCreator(xCoor , yCoor - 55);
        let coord4 = coordinateCreator(xCoor + 55, yCoor);
        console.log(coord.X,coord.Y);
        polyVertices.push(coord, coord3, coord2, coord4);
        

        // if mouse clicking to get vertex loc is done (eq to input from rect field)
        if(polyVertices.length == 4){
            drawingMode = false;
            drawingRect = false;
            let rect = new Object;
            rect.id = id;
            rect.name = "square";
            rect.vertices =[];
            let tcl = tempCol[0];
            rect.colors = tcl;
            rect.vertIdx = [];
            rect.length = initialLength;

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
