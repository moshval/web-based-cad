// Main Script File

function main(){
    initCanvas();
    this.shaderProgram = initProgram(document.getElementById("vertex").text,document.getElementById("fragment").text);
    // Create + Bind Vertex Buffer 
    var vertex_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,vertex_buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([]),this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);
    // Create + Bind index buffer
    var index_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,index_buffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array([]),this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null);
    this.gl.useProgram(this.shaderProgram);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,vertex_buffer);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,index_buffer);
    var vertexPos = this.gl.getAttribLocation(this.shaderProgram,"coordinates");
    this.gl.vertexAttribPointer(vertexPos,3,this.gl.FLOAT,false,0,0);
    this.gl.enableVertexAttribArray(vertexPos);

}

// Init Canvas - Creating Canvas
function initCanvas(){
    
    this.canvas = document.getElementById("gl-canvas");
    this.gl = this.canvas.getContext("webgl");
    this.gl.viewport(0,0,this.canvas.width,this.canvas.height);
    this.gl.clearColor(1,1,1,1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
}

// Init Shader Program
function initProgram(vSauce,fSauce){
    const vShader = loadShader(this.gl.VERTEX_SHADER,vSauce);
    const fShader = loadShader(this.gl.FRAGMENT_SHADER,fSauce);

    const shaderProgram = this.gl.createProgram();
    this.gl.attachShader(shaderProgram,vShader);
    this.gl.attachShader(shaderProgram,fShader);
    this.gl.linkProgram(shaderProgram);

    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
        alert('Init Failed :' + this.gl.getProgramInfoLog(shaderProgram));
        return ;
      }
    
    return shaderProgram;
}

// Load Shader
function loadShader(type,sauce){
    var shader = this.gl.createShader(type);
    this.gl.shaderSource(shader,sauce);
    this.gl.compileShader(shader);
    if(!this.gl.getShaderParameter(shader,this.gl.COMPILE_STATUS)){
        alert('Error');
        this.gl.deleteShader(shader);
        return ;
    }
    return shader;
}

// test draw
function testDraw(){
    var vertices = [
        -0.5,0.5,0.0,
        -0.5,-0.5,0.0,
        0.5,-0.5,0.0,
        0.5,0.5,0.0
    ];
    var indices = [3,2,1,3,1,0];

    // Create + Bind Vertex Buffer 
    var vertex_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,vertex_buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(vertices),this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);
    // Create + Bind index buffer
    var index_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,index_buffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,vertex_buffer);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,index_buffer);

    var vertexPos = this.gl.getAttribLocation(this.shaderProgram,"coordinates");
    this.gl.vertexAttribPointer(vertexPos,3,this.gl.FLOAT,false,0,0);
    this.gl.enableVertexAttribArray(vertexPos);
    
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawElements(this.gl.TRIANGLES,indices.length,this.gl.UNSIGNED_SHORT,0);

    // var buffer = this.gl.createBuffer()
    // this.gl.bindBuffer(this.gl.ARRAY_BUFFER,buffer);
    // this.gl.bufferData(this.gl.ARRAY_BUFFER,position,this.gl.STATIC_DRAW);
    // this.gl.useProgram(this.programInfo.program);
    // this.gl.enableVertexAttribArray(this.programInfo.attribLoc.vertexPos);
    // this.gl.vertexAttribPointer(this.programInfo.attribLoc.vertexPos,2,this.gl.FLOAT,false,0,0);
    // this.gl.uniform4fv(this.programInfo.uniformLoc.uColor,[1.0,1.0,0.0,1.0]);
    // this.gl.drawArrays(this.gl.TRIANGLES,0,4);
    console.log("called")
}
