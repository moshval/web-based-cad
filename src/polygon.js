// Polygon-related
let polyButton = document.getElementById('poly-btn'); // Draw Polygon
let polyInputter = document.getElementById('poly-inputter'); // Draw Polygon Input Form
let polyField = document.getElementById('poly-field'); // Draw Polygon input field
let polySubmit = document.getElementById('poly-submit'); // Draw Polygon submit button
let errMsg = document.getElementById('errmsg'); //error msg

let vertCount = 0; // Vertex Count from poly-field
let polyVertices = []; // Coordinates from mouse location
let drawingMode = false; 
let drawingPoly = false;


polyButton.addEventListener('click',function(){
    let drawnShape = "polygon";
    polyInputter.style.display = 'block';
});

polySubmit.addEventListener('click',function(){ // parse input
    vertCount = parseInt(polyField.value);
    if(Number.isInteger(vertCount))
    {
        if(vertCount >= 3){
            polyInputter.style.display = 'none';
            errMsg.innerHTML = "";
            // let canvas = document.getElementById("gl-canvas");
            canvas.addEventListener('click',drawPolygonVertex);
            console.log("enabling polygon drawing mode");
            draggingMode = false;
            movingMode = false;
            moveBtn.textContent = "Start Moving Object";
            drawingMode = true;
            drawingPoly = true;
            drawingRect = false; 
            drawingSquare = false;
            drawingLine = false;
        }
        else{
            errMsg.innerHTML =`<text style = "color:#800000">Input Must be Larger than 2</text>`;
            
        }
    }
    else{
        errMsg.innerHTML =`<text style = "color:#800000">Input type Invalid</text>`;
        
        
    }
});

// Draw Polygon by locating vertex position (pointer location) in canvas
function drawPolygonVertex(e){
    if (drawingMode == true && draggingMode==false && drawingPoly == true && movingMode == false){
        let xCoor = e.clientX - canvas.getBoundingClientRect().left;
        let yCoor = e.clientY - canvas.getBoundingClientRect().top;
        let poi = vec2(2*e.clientX/canvas.width-1,
            2*(canvas.height-e.clientY)/canvas.height-1);

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

        // if mouse clicking to get vertex loc is done (eq to input from poly field)
        if(vertCount == polyVertices.length){
            drawingMode = false;
            drawingPoly = false;
            let poly = new Object;
            poly.id = id;
            poly.name = "polygon";
            poly.vertices =[];
            poly.colors = tempCol[polyVertices.length-1];
            poly.vertIdx = [];
            poly.length = initialLength;
            
            // Color included
            for (let index = 0; index < polyVertices.length; index++) {
                // gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
                // gl.bufferSubData(gl.ARRAY_BUFFER,16*vertIndex,flatten(tempCol[polyVertices.length-1])); //only uses last color picked by a shape (bisa diubah ke per vertex kalo mau)
                poly.vertIdx.push(vertIndex);
                poly.vertices.push(polyVertices[index]);
                vertIndex++;            
            }
            tempCol = []
            id++;
            shapeData.push(poly);
            objectDrawer(shapeData);
        }
    }
    }

    // Change Single Object/Shape Color
    function changeColor(aidi,rr,gg,bb){
        let thecolor = vec4(rr,gg,bb,1.0);
        
        // for (let index = 0; index < shapeData[aidi].vertIdx.length; index++) {
        //     gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
        //     gl.bufferSubData(gl.ARRAY_BUFFER,16*shapeData[aidi].vertIdx[index],flatten(thecolor));     
        // }
        shapeData[aidi].colors = thecolor;
        objectDrawer(shapeData);
    }
    
    // Change length; length *= value; always scales to initial length at shape/object creation
    // Value = 0 then delete shape
    function changeLength(aidi,value){
        if(value == 0){
            let tempvc = shapeData[aidi].vertIdx.length;
            shapeData.splice(aidi,1);
            if(shapeData.length > 0){
                for (let index = aidi; index < shapeData.length; index++) {
                    shapeData[index].id -=1;    
                }
                for (let i = aidi; i < shapeData.length; i++) {
                    for (let j = 0; j < shapeData[i].vertIdx.length; j++) {
                        shapeData[i].vertIdx[j] -=tempvc;
                    }       
                }
                vertIndex -= tempvc;
                id--;
                renderWithColor(shapeData);
            }
            else{ 
                clearCanvas();
            }
        }
        else{
            let oldval = shapeData[aidi].length;
            for (let index = 1; index < shapeData[aidi].vertices.length;index++) {
                let distX = shapeData[aidi].vertices[index].X - shapeData[aidi].vertices[0].X;
                let distY = shapeData[aidi].vertices[index].Y - shapeData[aidi].vertices[0].Y;

                // (shapeData[aidi].vertices[indexold].X - shapeData[aidi].vertices[0].X) * oldval/value = shapeData[aidi].vertices[index].X - shapeData[aidi].vertices[0].X
                // (shapeData[aidi].vertices[indexold].X = (shapeData[aidi].vertices[index].X - shapeData[aidi].vertices[0].X) * value/oldval + shapeData[aidi].vertices[0].X
               
                shapeData[aidi].vertices[index].X = shapeData[aidi].vertices[0].X + (distX * value/oldval);
                shapeData[aidi].vertices[index].Y = shapeData[aidi].vertices[0].Y + (distY * value/oldval);
                

            }
            shapeData[aidi].length = value;
            objectDrawer(shapeData);
        }
    }


