// Storage for Shapes in Canvas
let id = 0
let shapeData = [] // Array of Object
let loadFile = document.getElementById('load-file');
let loadText = document.getElementById('load-text');
// Attribute Info :
/* 
    id (str) : Shape id
    name (str) : Shape name (polygon, square, etc.)
    colors [r,g,b,a]  : Shape Color (ex : [0.5,1.0,0.0,1.0] ; rgb scaled to 1/255)
    vertices [{X,Y}] : Shape Vertex coordinates
    iter [int] : Shape vertex iterator (on buffer) - coloring purposes
*/

let tempCol = [];
let shapeTable = document.getElementById("shevTable");

loadFile.addEventListener('change',function(){
    let files = loadFile.files;
    if(files.length==0){return;}
    let file = files[0];
    let fread = new FileReader();
    fread.addEventListener("load",function(e){
        let file = e.target.result;
        shapeData = JSON.parse(file);
        renderWithColor(shapeData);
    })
    fread.readAsBinaryString(file);
})

function saveShapeData(){
     let jsonShapeData = JSON.stringify(shapeData,null,"\t");
     let a = document.createElement("a");
     let file = new Blob([jsonShapeData],{type:"json"});
     a.href = URL.createObjectURL(file);
     a.download = 'shapedata.json';
     a.click();
     URL.revokeObjectURL(a.href);
}

function showShapeData(){
    if(shapeData.length > 0){
        let lenn = shapeTable.rows.length;
        for (let index = lenn -1 ; index > 0; index--) {
            shapeTable.deleteRow(index);
        }
        for (let index = 0; index < shapeData.length; index++) {
            let newRow = shapeTable.insertRow();
            let idColumn = newRow.insertCell(0);
            let nameColumn = newRow.insertCell(1);
            let vertexCount = newRow.insertCell(2);
            let colorColumn = newRow.insertCell(3);
            let changeColorColumn = newRow.insertCell(4);
            let changeLengthColumn = newRow.insertCell(5);
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
            changeColorButton.id = "changer"+shapeData[index].id;
            changeColorButton.value = toHex(shapeData[index].colors);
            
            changeColorButton.addEventListener("change",function(e){
                let hex = e.target.value;
                let rgb_red = parseInt(hex[1]+hex[2],16)/255;
                let rgb_green = parseInt(hex[3]+hex[4],16)/255;
                let rgb_blue = parseInt(hex[5]+hex[6],16)/255;
                changeColor(shapeData[index].id,rgb_red,rgb_green,rgb_blue);
            });
            changeColorColumn.appendChild(changeColorButton);

            
        }
    }
}