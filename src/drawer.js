// Object Drawer - Vertices and Indices / no color
function objectDrawer(shapesCoordinates){
    //TODO add coordinate per shape
    shapesCoordinates.forEach(element => {
        const { vertices, name, colors } = element;

        let vertices_list = [];
        
        vertices.forEach((vtxElement) => {
            vertices_list.push(vtxElement.X, vtxElement.Y);
        });

        let indices = [];
        for (let i = 0; i < vertices.length; ++i) {
            indices.push(i);
        }

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_list), gl.STATIC_DRAW);
    
        var index_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
        
        gl.vertexAttribPointer(vertexPos, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vertexPos);

        const colorLoc = gl.getUniformLocation(shaderProgram, "fColor");
        gl.uniform4fv(colorLoc, colors);

        gl.drawArrays(gl.POINTS, 0, vertices_list.length/2);

        if(name !== 'line') {
            gl.drawElements(gl.TRIANGLE_FAN, indices.length, gl.UNSIGNED_SHORT, 0);
        } else {
            gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);    
        }

        // if(name !== 'line') {
        //     // POLYGON
        //     vtx.forEach((vtxElement, vtxIndex) => {
        //         // vertices_list.push(vtxElement.X, vtxElement.Y, 0.0);

        //         for (let k = vtxIndex+2; k < vtx.length; k++) {
        //             indices.push(idx, idx+vtxIndex+1, idx+k);
        //         }
        //     })

        //     idx += vtx.length;

        // } else {
        //     // LINE
        //     for (let j = 0; j < 2; j++) {
        //         // vertices_list.push(vtx[j].X, vtx[j].Y, 0.0);
        //         for (let k = j+2; k < 4; k++) {
        //             indices.push(idx, idx + j + 1, idx + k);
        //         }
        //     }
        //     vertices_list.push(vtx[0].X + 0.01,vtx[0].Y,0.0);
        //     vertices_list.push(vtx[1].X,vtx[1].Y + 0.01,0.0);
        //     idx += 4;
        // }
    });

    // coordinates_list = []
    // for (let cIdx = 0; cIdx < shapesCoordinates.length; cIdx++) {
    //     coordinates_list.push(shapesCoordinates[cIdx].vertices);        
    // }

    // console.log(shapesCoordinates);
    // console.log(coordinates_list);
    // console.log(coordinates_list.length)

    // // Drawer Template
    // let vertices = []
    // let indices = []
    // let idx = 0 

    // // Iterate to get vertex location + index location of all shapes
    // for (let i = 0; i < coordinates_list.length; i++) {
    //     let vtx = coordinates_list[i];
    //     console.log(vtx)
    //     console.log(vtx.length)
    //     // Polygon
    //     if(vtx.length != 2){
    //         for (let j = 0; j < vtx.length; j++) {
    //             vertices.push(vtx[j].X,vtx[j].Y,0.0)
    //             for (let k = j+2; k < vtx.length; k++) {
    //                 indices.push(idx,idx+j+1,idx+k)
    //             }
    //         }
    //         idx += coordinates_list[i].length;
            
    //     }
    //     // Line
    //     else{
    //         for (let j = 0; j < 2; j++) {
    //             vertices.push(vtx[j].X,vtx[j].Y,0.0)
    //             for (let k = j+2; k < 4; k++) {
    //                 indices.push(idx,idx+j+1,idx+k)
    //             }
    //         }
    //         vertices.push(vtx[0].X + 0.01,vtx[0].Y,0.0);
    //         vertices.push(vtx[1].X,vtx[1].Y + 0.01,0.0)
            
    //         idx+= 4; 
    //     }

    // }
    // console.log(vertices)
    // console.log(indices)
    
    // // Create + Bind Vertex Buffer 
    // // var vertex_buffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_list), gl.STATIC_DRAW);

    // // Create + Bind index buffer
    // // var index_buffer = gl.createBuffer();
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    
    // // gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
    // // gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([vertices]),gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

    // // gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);

    // // var vertexPos = gl.getAttribLocation(shaderProgram,"vPosition");
    // // var fColorLocation = gl.getUniformLocation(shaderProgram,"fColor");

    // gl.vertexAttribPointer(vertexPos, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(vertexPos);
    
    // gl.enable(gl.DEPTH_TEST);

    // gl.drawArrays(gl.POINTS, 0, vertices_list.length / 3);
    // gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    polyVertices = [];
    showShapeData();
}

// Object Drawing but with color, assigned to vertIdx var
function renderWithColor(){
    for (let i = 0; i < shapeData.length; i++) {
        let tempc = shapeData[i].colors;
        let thecolor = vec4(tempc[0],tempc[1],tempc[2],tempc[3])
        for (let j = 0; j < shapeData[i].vertIdx.length; j++) {
            gl.bindBuffer(gl.ARRAY_BUFFER,color_buffer);
            gl.bufferSubData(gl.ARRAY_BUFFER,16*shapeData[i].vertIdx[j],flatten(thecolor));
        }
        
    }
    objectDrawer(shapeData);
}
