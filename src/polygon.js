// Polygon-related
let polyButton = document.getElementById('poly-btn');
let polyInputter = document.getElementById('poly-inputter');
let polyField = document.getElementById('poly-field');
let polySubmit = document.getElementById('poly-submit');
let errMsg = document.getElementById('errmsg');
let vertCount = 0;
let polyVertices = [];
let drawingMode = false;


polyButton.addEventListener('click',function(){
    let drawnShape = "polygon";
    polyInputter.style.display = 'block';
});
polySubmit.addEventListener('click',function(){
    vertCount = parseInt(polyField.value);
    if(Number.isInteger(vertCount))
    {
        if(vertCount >= 3){
            polyInputter.style.display = 'none';
            errMsg.innerHTML = "";
            // let canvas = document.getElementById("gl-canvas");
            canvas.addEventListener('click',drawPolygonVertex);
            console.log("enabling drawing mode");
            draggingMode = false;
            drawingMode = true;
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
    // let xCoor = (e.clientX - canvas.getBoundingClientRect().left)/canvas.width*2 - 1;
    // let yCoor = (e.clientY - canvas.getBoundingClientRect().top)/canvas.height*-2 + 1;
    if (drawingMode == true && draggingMode==false){
        let xCoor = e.clientX - canvas.getBoundingClientRect().left;
        let yCoor = e.clientY - canvas.getBoundingClientRect().top;
        let poi = vec2(2*e.clientX/canvas.width-1,
            2*(canvas.height-e.clientY)/canvas.height-1);
        // gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
        // gl.bufferSubData(gl.ARRAY_BUFFER,8*iterator,flatten(poi));

        let col = vec4(red,green,blue,1.0);
        // gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
        // gl.bufferSubData(gl.ARRAY_BUFFER,16*iterator,flatten(col));
        
        tempCol.push(col);
        console.log(xCoor,yCoor);
        let coord = coordinateCreator(xCoor,yCoor);
        console.log(coord.X,coord.Y);
        polyVertices.push(coord);
        if(vertCount == polyVertices.length){
            drawingMode = false
            let poly = new Object;
            poly.id = id;
            poly.name = "polygon";
            poly.vertices =[];
            poly.colors = tempCol[polyVertices.length-1];
            poly.iter = [];
            
            for (let index = 0; index < polyVertices.length; index++) {
                gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
                gl.bufferSubData(gl.ARRAY_BUFFER,16*iterator,flatten(tempCol[polyVertices.length-1])); //only uses last color picked by a shape (bisa diubah ke per vertex kalo mau)
                poly.iter.push(iterator);
                poly.vertices.push(polyVertices[index]);
                iterator++;            
            }
            tempCol = []
            id++;
            // let shapesCoordinates = []
            // shapesCoordinates.push(poly.vertices);
            // objectDrawer(shapesCoordinates);
            shapeData.push(poly);
            objectDrawer(shapeData);
        }
    }
    }

    // function testChangeColor(){
    //     let testc = vec4(red,green,blue,1.0);
        
    //     for (let index = 0; index < shapeData[0].iter.length; index++) {
    //         gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
    //         gl.bufferSubData(gl.ARRAY_BUFFER,16*shapeData[0].iter[index],flatten(testc));     
    //     }
    //     shapeData[0].colors = testc;
    //     objectDrawer(shapeData);
    // }

    function changeColor(aidi,rr,gg,bb){
        let thecolor = vec4(rr,gg,bb,1.0);
        
        for (let index = 0; index < shapeData[aidi].iter.length; index++) {
            gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
            gl.bufferSubData(gl.ARRAY_BUFFER,16*shapeData[aidi].iter[index],flatten(thecolor));     
        }
        shapeData[aidi].colors = thecolor;
        objectDrawer(shapeData);
    }



