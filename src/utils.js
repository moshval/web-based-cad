// Utility Function

// Argument to Array
function _argumentsToArray( args )
{
    return [].concat.apply( [], Array.prototype.slice.apply(args) );
}

// Convert array[2] to vec2
function vec2()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    }

    return result.splice( 0, 2 );
}
//Convert array[4] to vec4
function vec4()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    case 3: result.push( 1.0 );
    }

    return result.splice( 0, 4 );
}

// flatten, used for bufferSubData
function flatten( v )
{
    if ( v.matrix === true ) {
        v = transpose( v );
    }

    var n = v.length;
    var elemsAreArrays = false;

    if ( Array.isArray(v[0]) ) {
        elemsAreArrays = true;
        n *= v[0].length;
    }

    var floats = new Float32Array( n );

    if ( elemsAreArrays ) {
        var idx = 0;
        for ( var i = 0; i < v.length; ++i ) {
            for ( var j = 0; j < v[i].length; ++j ) {
                floats[idx++] = v[i][j];
            }
        }
    }
    else {
        for ( var i = 0; i < v.length; ++i ) {
            floats[i] = v[i];
        }
    }

    return floats;
}


// Color Converter from rgb 1/255 to RGB object
function toRGB(colour){
    let rr = parseInt(colour[0]*255);
    let gg = parseInt(colour[1]*255);
    let bb = parseInt(colour[2]*255);
    return `rgb(${rr},${gg},${bb})`;
}

// Convert each color (r,g,b) to hex
function ColorToHex(clr) {
    var hexadecimal = clr.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }
  
// Convert rgb 1/255 to Hex
function toHex(colour) {
    let rr = parseInt(colour[0]*255);
    let gg = parseInt(colour[1]*255);
    let bb = parseInt(colour[2]*255);
    return "#" + ColorToHex(rr) + ColorToHex(gg) + ColorToHex(bb);
}