// Line Related

let lineButton = document.getElementById('line-btn');
let drawingLine = false;
lineButton.addEventListener('click',function(){
    let drawnShape = 'line';
    canvas.addEventListener('click',drawLine);
    console.log("enabling line drawing mode");
    draggingMode = false;
    drawingMode = true;
    drawingLine = true;
})

function drawLine(e){ // Draw Line by locating vertex position
    if(drawingMode == true && draggingMode ==false && drawingLine == true){
        let xCoor = e.clientX - canvas.getBoundingClientRect().left;
        let yCoor = e.clientY - canvas.getBoundingClientRect().top;
        let col = vec4(red,green,blue,1.0);
        tempCol.push(col);
        console.log(xCoor,yCoor);
        let coord = coordinateCreator(xCoor,yCoor);
        console.log(coord.X,coord.Y);
        polyVertices.push(coord);
        
        // If clicked line points == 2
        if(polyVertices.length == 2){
            drawingMode = false;
            drawingLine = false;
            let line = new Object;
            line.id = id;
            line.name = "line";
            line.vertices = [];
            line.colors = tempCol[polyVertices.length - 1];
            line.vertIdx = [];
            line.length = 1;
            
            // Color included
            for (let index = 0; index < polyVertices.length; index++) {
                gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
                gl.bufferSubData(gl.ARRAY_BUFFER,16*vertIndex,flatten(tempCol[polyVertices.length-1])); //only uses last color picked by a shape (bisa diubah ke per vertex kalo mau)
                line.vertIdx.push(vertIndex);
                line.vertices.push(polyVertices[index]);
                vertIndex++;    
            }
            vertIndex++;
            vertIndex++;
            tempCol = [];
            id++;
            shapeData.push(line);
            objectDrawer(shapeData);

        }

    }
}