// Main Script File
var canvas = document.getElementById("gl-canvas");
var gl = canvas.getContext("webgl");
var shaderProgram = null;

// Main Canvas Initiator
function main(){
    initCanvas();
    shaderProgram = initProgram(document.getElementById("vertex").text,document.getElementById("fragment").text);
    // Create + Bind Vertex Buffer 
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([]),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    // Create + Bind index buffer
    var index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array([]),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);

    gl.useProgram(shaderProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);

    var vertexPos = gl.getAttribLocation(shaderProgram,"coordinates");
    gl.vertexAttribPointer(vertexPos,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(vertexPos);

}

// Init Canvas - Creating Canvas
function initCanvas(){
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clearColor(1,1,1,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

// Init Shader Program
function initProgram(vSauce,fSauce){
    const vShader = loadShader(gl.VERTEX_SHADER,vSauce);
    const fShader = loadShader(gl.FRAGMENT_SHADER,fSauce);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram,vShader);
    gl.attachShader(shaderProgram,fShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Init Failed :' + gl.getProgramInfoLog(shaderProgram));
        return ;
      }
    
    return shaderProgram;
}

// Load Shader
function loadShader(type,sauce){
    var shader = gl.createShader(type);
    gl.shaderSource(shader,sauce);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){
        alert('Error');
        gl.deleteShader(shader);
        return ;
    }
    return shader;
}

// test draw
function testDraw(){
    var obj1 = new Object;
    var obj2 = new Object;
    var obj3 = new Object;
    var obj4 = new Object;
    var shp = new Object;
    shp.vertices = []
    obj1.X = -0.5; obj1.Y = 0.5
    shp.vertices.push(obj1); 
    obj2.X = 0.5; obj2.Y = 0.5
    shp.vertices.push(obj2); 
    obj3.X = -0.5; obj3.Y = -0.5
    shp.vertices.push(obj3); 
    obj4.X = 0.5; obj4.Y = -0.5
    shp.vertices.push(obj4);
    shapeData.push(shp);
    objectDrawer(shapeData); 
    // var vertices = [
    //     -0.5,0.5,0.0,
    //     -0.5,-0.5,0.0,
    //     0.5,-0.5,0.0,
    //     0.5,0.5,0.0
    // ];
    // var indices = [0,1,2,3,2,1];

    // // Create + Bind Vertex Buffer 
    // var vertex_buffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
    // gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
    // // Create + Bind index buffer
    // var index_buffer = gl.createBuffer();
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);

    // gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);

    // var vertexPos = gl.getAttribLocation(shaderProgram,"coordinates");
    // gl.vertexAttribPointer(vertexPos,3,gl.FLOAT,false,0,0);
    // gl.enableVertexAttribArray(vertexPos);
    
    // gl.enable(gl.DEPTH_TEST);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.drawArrays(gl.POINTS, 0, vertices.length / 3);
    // gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);

    // var buffer = gl.createBuffer()
    // gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    // gl.bufferData(gl.ARRAY_BUFFER,position,gl.STATIC_DRAW);
    // gl.useProgram(this.programInfo.program);
    // gl.enableVertexAttribArray(this.programInfo.attribLoc.vertexPos);
    // gl.vertexAttribPointer(this.programInfo.attribLoc.vertexPos,2,gl.FLOAT,false,0,0);
    // gl.uniform4fv(this.programInfo.uniformLoc.uColor,[1.0,1.0,0.0,1.0]);
    // gl.drawArrays(gl.TRIANGLES,0,4);
    console.log("called")
}