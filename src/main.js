// Main Script File

function main(){
    this.canvas = document.getElementById("gl-canvas");
    this.gl = this.canvas.getContext("webgl");
    initCanvas();
    const shaderProgram = initProgram(document.getElementById("vertex").text,document.getElementById("fragment").text);
    this.programInfo = {
    program : shaderProgram,
    attribLoc : {
        vertexPos : this.gl.getAttribLocation(shaderProgram,'aVertexPosition'),
    },
    uniformLoc:{
        projMat : this.gl.getUniformLocation(shaderProgram,'uProjectionMatrix'),
        mvMat: this.gl.getUniformLocation(shaderProgram,'uModelViewMatrix'),
        uColor : this.gl.getUniformLocation(shaderProgram,'uColor'),
    },
    };
}

// Init Canvas
function initCanvas(){
    this.gl.viewport(0,0,this.canvas.width,this.canvas.height);
    this.gl.clearColor(1,1,1,1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
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

// test draw
function testDraw(){
    const position = new Float32Array([
        1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
        -1.0, -1.0
    ]);
    var buffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER,buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER,position,this.gl.STATIC_DRAW);
    this.gl.useProgram(this.programInfo.program);
    this.gl.enableVertexAttribArray(this.programInfo.attribLoc.vertexPos);
    this.gl.vertexAttribPointer(this.programInfo.attribLoc.vertexPos,2,this.gl.FLOAT,false,0,0);
    this.gl.uniform4fv(this.programInfo.uniformLoc.uColor,[1.0,1.0,0.0,1.0]);
    this.gl.drawArrays(this.gl.TRIANGLE_FAN,0,4);
    console.log("called")
}
