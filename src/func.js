let draggingMode = false; // dragging mode on-off
let movingMode = false; // moving mode on-off

let mousePointer = new Object; // pointer mouse
mousePointer.X = 0;
mousePointer.Y = 0;

let isMovedYet = false; 
let movedShapeIdx = -999; // index of moved shape (in shapedata)
let movedVertexIdx = -999; // index of moved vertex (in shapedata shapes)
let shapeFound = false;

let red = 0;  //default colors 
let green = 0;
let blue = 0;

let isChangingColor = false;
let colorPicker = document.getElementById("poly-color");
// let canvcolButton = document.getElementById("canvcol-btn");
let moveBtn = document.getElementById("move-btn");

let maxNumVertices = 20000; //maximum number of vertices (buffer purposes)
let vertIndex = 0; // Shape vertex index (on buffer) - coloring purposes

let helpButton = document.getElementById('help-btn');
let helpPopup = document.getElementById('help-section');
let helpClose = document.getElementById('help-close');


// Clear Canvas
function clearCanvas(){
    document.location.reload();
    console.log('Called Clear')
}

// Create Coordinate from pointer locator in canvas
function coordinateCreator(x,y){
    let coordinate = new Object;
    coordinate.X = x /canvas.width *2 - 1;
    coordinate.Y = y / canvas.height *(-2) + 1;

    return coordinate;
}
// Create Coordinate 
function coorCreate(x,y){
    let coo = new Object;
    coo.X = x;
    coo.Y = y;
    return coo;
}

// Check Nearest Vertex from pointer loc
function checkNearestVertex(){
    if(movedShapeIdx < 0 && movedVertexIdx < 0 && (draggingMode || movingMode)){
        console.log("called nearest")
        for (let i = 0; i < shapeData.length; i++) {
            let el = shapeData[i].vertices;
            for (let j = 0; j < el.length; j++) {
                if(Math.abs(el[j].X - mousePointer.X)<=0.05 && Math.abs(el[j].Y - mousePointer.Y) <= 0.05){
                    movedShapeIdx = i;
                    movedVertexIdx = j;
                    console.log(el[j].X,mousePointer.X);
                    console.log(el[j].Y,mousePointer.Y);
                    console.log(movedShapeIdx,movedVertexIdx);
                    shapeFound = true;
                    return;
                }    
            }
            
        }
    }
}

// Start Dragging Mode - Click to Start
canvas.addEventListener("mousedown",function(e){
    if(!drawingMode && shapeData.length > 0 && !movingMode){
        draggingMode = true;
        console.log("mausdon");
        mousePointer = coordinateCreator(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        console.log(mousePointer.X,mousePointer.Y);
        // Check Nearest Vertex
        checkNearestVertex();
    }
    // Moving Mode
    if(movingMode && shapeData.length > 0 && !draggingMode && !drawingMode){
        console.log("moving mode down")
        mousePointer = coordinateCreator(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        console.log(mousePointer.X,mousePointer.Y);
        checkNearestVertex();
    }   
})

// Dragging Mode + Moving Mode
canvas.addEventListener("mousemove",function(e){
    if(draggingMode && shapeFound && !movingMode){
        console.log("mausmov");
        let movedShape = shapeData[movedShapeIdx].vertices;
        movedShape[movedVertexIdx] = coordinateCreator(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        objectDrawer(shapeData);
    }
    if(movingMode && shapeFound && !draggingMode){
        console.log("mouse move");
        let movedShape = shapeData[movedShapeIdx].vertices;
        let trans = coordinateCreator(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        let tmp = new Object;
        tmp.X =  movedShape[movedVertexIdx].X;
        tmp.Y = movedShape[movedVertexIdx].Y;
        for (let indx = 0; indx < movedShape.length; indx++) {
            movedShape[indx].X += trans.X - tmp.X;
            movedShape[indx].Y += trans.Y - tmp.Y;
        }
        objectDrawer(shapeData);
    }
})
// Stop Dragging Mode - Double Click to Stop
canvas.addEventListener("dblclick",function(){
    if(draggingMode && !movingMode){
        console.log("dobelclick");
        draggingMode = false;
        shapeFound = false;
        movedShapeIdx = -999;
        movedVertexIdx = -999;
    }
    if(movingMode && !draggingMode){
        shapeFound = false;
        movedShapeIdx = -999;
        movedVertexIdx = -999;
    }
}) 

// Color Picker 
colorPicker.addEventListener("change",function(e){
    let hex = e.target.value;
    red = parseInt(hex[1]+hex[2],16)/255;
    green = parseInt(hex[3]+hex[4],16)/255;
    blue = parseInt(hex[5]+hex[6],16)/255;
    console.log(red,green,blue);
    isChangingColor = true;
})

// Moving object mode /translation
moveBtn.addEventListener('click',function(e){
    if(movingMode == false){
        console.log("enabling moving mode");
        movingMode = true;
        draggingMode = false;
        moveBtn.textContent = "Stop Moving Object"
    }
    else{
        movingMode = false;
        moveBtn.textContent = "Start Moving Object"
    }


})

// Show help section
helpButton.addEventListener('click',function(){
    helpPopup.style.display = 'block';
});
helpClose.addEventListener('click',function(e){
    helpPopup.style.display = 'none';
})

// // CHange canvas background color
// canvcolButton.addEventListener('click',function(e){
//     gl.clearColor(red,green,blue,1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT);
//     renderWithColor(shapeData);
// })
