function objectDrawer(shapesCoordinates){
    //TODO add coordinate per shape
    coordinates_list = []
    for (let cIdx = 0; cIdx < shapesCoordinates.length; cIdx++) {
        coordinates_list.push(shapesCoordinates[cIdx].vertices);        
    }
    console.log(coordinates_list);
    console.log(coordinates_list.length)

    // Drawer Template
    let vertices = []
    let indices = []
    let idx = 0 

    for (let i = 0; i < coordinates_list.length; i++) {
        let vtx = coordinates_list[i];
        console.log(vtx)
        console.log(vtx.length)
        for (let j = 0; j < vtx.length; j++) {
            vertices.push(vtx[j].X,vtx[j].Y,0.0)
            for (let k = j+2; k < vtx.length; k++) {
                indices.push(idx,idx+j+1,idx+k)
            }
        }
        idx += coordinates_list[i].length;
    }
    console.log(vertices)
    console.log(indices)
    
    // Create + Bind Vertex Buffer 
    // var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
    // Create + Bind index buffer
    // var index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);

    
    // gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
    // gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([vertices]),gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
    // gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);


    // var vertexPos = gl.getAttribLocation(shaderProgram,"vPosition");
    // var fColorLocation = gl.getUniformLocation(shaderProgram,"fColor");
    gl.vertexAttribPointer(vertexPos,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(vertexPos);
    
    gl.enable(gl.DEPTH_TEST);
    // gl.uniform4f(vColor,red,green,blue,1.0);
    gl.drawArrays(gl.POINTS, 0, vertices.length / 3);
    gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);

    // BATAS
  

    // BATS
    polyVertices = []

}

// function objectDrawer2(shapesCoordinates){
//     //TODO add coordinate per shape
//     coordinates_list = []
//     for (let cIdx = 0; cIdx < shapesCoordinates.length; cIdx++) {
//         coordinates_list.push(shapesCoordinates[cIdx].vertices);        
//     }
//     console.log(coordinates_list);
//     console.log(coordinates_list.length)

//     // Drawer Template
//     let vertices = []
//     let indices = []
//     let idx = 0 

//     for (let i = 0; i < coordinates_list.length; i++) {
//         let vtx = coordinates_list[i];
//         console.log(vtx)
//         console.log(vtx.length)
//         for (let j = 0; j < vtx.length; j++) {
//             vertices.push(vtx[j].X,vtx[j].Y,0.0)
//             for (let k = j+2; k < vtx.length; k++) {
//                 indices.push(idx,idx+j+1,idx+k)
//             }
//         }
//         idx += coordinates_list[i].length;
//     }
//     console.log(vertices)
//     console.log(indices)
    
//     // Create + Bind Vertex Buffer 
//     var vertex_buffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
//     gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
//     // Create + Bind index buffer
//     var index_buffer = gl.createBuffer();
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
//     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);

//     gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);

//     var vertexPos = gl.getAttribLocation(shaderProgram,"vPosition");
//     var fColorLocation = gl.getUniformLocation(shaderProgram,"fColor");
//     gl.vertexAttribPointer(vertexPos,3,gl.FLOAT,false,0,0);
//     gl.enableVertexAttribArray(vertexPos);
    
//     gl.enable(gl.DEPTH_TEST);
//     gl.uniform4f(fColorLocation,red,green,blue,1.0);
//     gl.drawArrays(gl.POINTS, 0, vertices.length / 3);
//     gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);

//     // BATAS

//     // BATS
//     polyVertices = []

// }