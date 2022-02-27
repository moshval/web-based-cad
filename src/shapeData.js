// Storage for Shapes in Canvas
let id = 0
let shapeData = [] // Array of Object
let loadFile = document.getElementById('load-file');
let loadText = document.getElementById('load-text');
let initialLength = 10;
// Attribute Info :
/* 
    id (int) : Shape id
    name (str) : Shape name (polygon, square, etc.)
    colors [r,g,b,a]  : Shape Color (ex : [0.5,1.0,0.0,1.0] ; rgb scaled to 1/255)
    vertices [{X,Y}] : Shape Vertex coordinates
    vertIdx [int] : Shape vertex index (on buffer) - coloring purposes
    length (int) : Shape length scale - default = initialLength = 10
*/

let tempCol = []; //temporary color array
let shapeTable = document.getElementById("shevTable");

loadFile.addEventListener('change',function(){ // Load from JSON file
    let files = loadFile.files;
    if(files.length==0){return;}
    let file = files[0];
    let fread = new FileReader();
    fread.addEventListener("load",function(e){
        let file = e.target.result;
        shapeData = JSON.parse(file);
        vertIndex =  getLargestVIdx() + 1;
        id=shapeData.length;
        renderWithColor(shapeData);
    })
    fread.readAsBinaryString(file);
})

function saveShapeData(){ // Save shapeData as JSON file
     let jsonShapeData = JSON.stringify(shapeData,null,"\t");
     let a = document.createElement("a");
     let file = new Blob([jsonShapeData],{type:"json"});
     a.href = URL.createObjectURL(file);
     a.download = 'shapedata.json';
     a.click();
     URL.revokeObjectURL(a.href);
}

function showShapeData(){ // show shape data in a table, refreshed every time rendering

    if(shapeData.length > 0){
        let lenn = shapeTable.rows.length;
        for (let index = lenn -1 ; index > 0; index--) { // remove all, unrender table content
            shapeTable.deleteRow(index);
        }
        for (let index = 0; index < shapeData.length; index++) { // re-render table content,Create columns for each row 
            let newRow = shapeTable.insertRow(); 
            let idColumn = newRow.insertCell(0); // ID
            let nameColumn = newRow.insertCell(1); // Type
            let vertexCount = newRow.insertCell(2); // Vertex Count
            let colorColumn = newRow.insertCell(3); // Color
            let changeColorColumn = newRow.insertCell(4); // Change Color
            let changeLengthColumn = newRow.insertCell(5); // Change Length

            idColumn.innerHTML = shapeData[index].id;
            idColumn.style.textAlign = "center"

            nameColumn.innerHTML = shapeData[index].name;
            nameColumn.style.textAlign = "center"

            vertexCount.innerHTML = shapeData[index].vertices.length;
            vertexCount.style.textAlign = "center"

            changeColorColumn.style.textAlign = "center"

            colorColumn.style.backgroundColor = toRGB(shapeData[index].colors);
            let changeColorButton = document.createElement('input');
            changeColorButton.class = "form";
            changeColorButton.type = "color";
            changeColorButton.id = "changecolor"+shapeData[index].id;
            changeColorButton.value = toHex(shapeData[index].colors);
            
            changeColorButton.addEventListener("change",function(e){ // Apply Change Color button
                let hex = e.target.value;
                let rgb_red = parseInt(hex[1]+hex[2],16)/255;
                let rgb_green = parseInt(hex[3]+hex[4],16)/255;
                let rgb_blue = parseInt(hex[5]+hex[6],16)/255;
                changeColor(shapeData[index].id,rgb_red,rgb_green,rgb_blue);
            });
            changeColorColumn.appendChild(changeColorButton);

            let changeLengthForm = document.createElement('input');
            changeLengthForm.class = "form";
            changeLengthForm.type = "number";
            changeLengthForm.id = "changelength"+shapeData[index].id;
            changeLengthForm.style.textAlign = "center";
            changeLengthForm.value = shapeData[index].length;
            changeLengthForm.min = 0;
            changeLengthForm.addEventListener("change",function(e){ // Change length input form
                let tgt = e.target.value;
                changeLength(shapeData[index].id,tgt);

            });
            changeLengthColumn.appendChild(changeLengthForm);



            
        }
    }
}


// Get Most Recent Vert Index from ShapeData
function getLargestVIdx(){
    let recentShape = shapeData[shapeData.length - 1];
    let recentShapeVIdx = recentShape.vertIdx[recentShape.vertIdx.length - 1];
    return recentShapeVIdx;
}