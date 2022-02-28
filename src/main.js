// Main Script File
var canvas = document.getElementById("gl-canvas");
var gl = canvas.getContext("webgl");
var shaderProgram = null;

var vertex_buffer = gl.createBuffer();
var index_buffer = gl.createBuffer();
var color_buffer = gl.createBuffer();

var vertexPos = null;
var vColor = null;

// Main Canvas Initiator
function main(){
    initCanvas();
    shaderProgram = initProgram(document.getElementById("vertex").text,document.getElementById("fragment").text);
    gl.useProgram(shaderProgram);

    // Create + Bind Vertex Buffer 
    gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER,8*maxNumVertices,gl.STATIC_DRAW);
    vertexPos = gl.getAttribLocation(shaderProgram,"vPosition");
    gl.vertexAttribPointer(vertexPos,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(vertexPos);

    // // Create + Bind index buffer - not needed now
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,8*20000,gl.STATIC_DRAW);
    
    //Create + Bind Color Buffer
    gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER,16*maxNumVertices,gl.STATIC_DRAW);

    // not needed now
    // gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
    // gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);

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