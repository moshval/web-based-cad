// Object Drawer - Vertices and Indices / no color
function objectDrawer(shapesCoordinates){
    //TODO add coordinate per shape
    shapesCoordinates.forEach(element => {
        const { vertices, name, colors } = element;

        // Create vertices list from coordinates
        let vertices_list = [];
        
        vertices.forEach((vtxElement) => {
            vertices_list.push(vtxElement.X, vtxElement.Y);
        });

        // Index of each vertices to draw in buffer
        let indices = [];
        for (let i = 0; i < vertices.length; ++i) {
            indices.push(i);
        }

        // Create + Bind buffer - vertex, index, color
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

    });

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
