const SECTION_USER_DEFINED = 0;
const SECTION_TYPE = 1;
const SECTION_IMPORT = 2;
const SECTION_FUNCTION = 3;
const SECTION_TABLE = 4;
const SECTION_MEMORY = 5;
const SECTION_GLOBAL = 6;
const SECTION_EXPORT = 7;
const SECTION_START = 8;
const SECTION_ELEMENT = 9;
const SECTION_CODE = 10;
const SECTION_DATA = 11;

const sectionNames = [
    "User-defined",
    "Type",
    "Import",
    "Function",
    "Table",
    "Memory",
    "Global",
    "Export",
    "Start",
    "Element",
    "Code",
    "Data",
]

const TYPE_I32 = 0x7F;
const TYPE_I64 = 0x7E;
const TYPE_F32 = 0x7D;
const TYPE_F64 = 0x7C;
const TYPE_ANYFUNC = 0x70;
const TYPE_FUNC = 0x60;
const TYPE_VOID = 0x40;

const typeNames = [];
typeNames[0x7F] = "i32";
typeNames[0x7E] = "i64";
typeNames[0x7D] = "f32";
typeNames[0x7C] = "f64";
typeNames[0x70] = "anyFunc";
typeNames[0x60] = "func";
typeNames[0x40] = "void";

const EXTERNAL_FUNCTION = 0;
const EXTERNAL_TABLE = 1;
const EXTERNAL_MEMORY = 2;
const EXTERNAL_GLOBAL = 3;

const externalKindNames = [
    "Function",
    "Table",
    "Memory",
    "Global",
]

const opcodeData = [
    ["unreachable"],
    ["nop"],
    ["block", decodeVaruint],
    ["loop", decodeVaruint],
    ["if", decodeVaruint],
    ["else"],
    ,
    ,
    ,
    ,
    ,
    ["end"],
    ["br", decodeVaruint],
    ["br_if", decodeVaruint],
    ["br_table", decodeBranchTable],
    ["return"],
    ["call", decodeVaruint], //0x10
    ["call_indirect", decodeVaruint, decodeVaruint],
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ["drop"],
    ["select"],
    ,
    ,
    ,
    ,
    ["get_local", decodeVaruint], //0x20
    ["set_local", decodeVaruint],
    ["tee_local", decodeVaruint],
    ["get_global", decodeVaruint],
    ["set_global", decodeVaruint],
    ,
    ,
    ,
    ["i32.load", decodeVaruint, decodeVaruint],
    ["i64.load", decodeVaruint, decodeVaruint],
    ["f32.load", decodeVaruint, decodeVaruint],
    ["f64.load", decodeVaruint, decodeVaruint],
    ["i32.load8_s", decodeVaruint, decodeVaruint],
    ["i32.load8_u", decodeVaruint, decodeVaruint],
    ["i32.load16_s", decodeVaruint, decodeVaruint],
    ["i32.load16_u", decodeVaruint, decodeVaruint],
    ["i64.load8_s", decodeVaruint, decodeVaruint], //0x30
    ["i64.load8_u", decodeVaruint, decodeVaruint],
    ["i64.load16_s", decodeVaruint, decodeVaruint],
    ["i64.load16_u", decodeVaruint, decodeVaruint],
    ["i64.load32_s", decodeVaruint, decodeVaruint],
    ["i64.load32_u", decodeVaruint, decodeVaruint],
    ["i32.store", decodeVaruint, decodeVaruint],
    ["i64.store", decodeVaruint, decodeVaruint],
    ["f32.store", decodeVaruint, decodeVaruint],
    ["f64.store", decodeVaruint, decodeVaruint],
    ["i32.store8", decodeVaruint, decodeVaruint],
    ["i32.store16", decodeVaruint, decodeVaruint],
    ["i64.store8", decodeVaruint, decodeVaruint],
    ["i64.store16", decodeVaruint, decodeVaruint],
    ["i64.store32", decodeVaruint, decodeVaruint],
    ["memory.size", decodeVaruint],
    ["memory.grow", decodeVaruint], //0x40
    ["i32.const", decodeVarint],
    ["i64.const", decodeVarint],
    ["f32.const", decodeF32],
    ["f64.const", decodeF64],
    ["i32.eqz"],
    ["i32.eq"],
    ["i32.ne"],
    ["i32.lt_s"],
    ["i32.lt_u"],
    ["i32.gt_s"],
    ["i32.gt_u"],
    ["i32.le_s"],
    ["i32.le_u"],
    ["i32.ge_s"],
    ["i32.ge_u"],
    ["i64.eqz"], //0x50
    ["i64.eq"],
    ["i64.ne"],
    ["i64.lt_s"],
    ["i64.lt_u"],
    ["i64.gt_s"],
    ["i64.gt_u"],
    ["i64.le_s"],
    ["i64.le_u"],
    ["i64.ge_s"],
    ["i64.ge_u"],
    ["f32.eq"],
    ["f32.ne"],
    ["f32.lt"],
    ["f32.gt"],
    ["f32.le"],
    ["f32.ge"], //0x60
    ["f64.eq"],
    ["f64.ne"],
    ["f64.lt"],
    ["f64.gt"],
    ["f64.le"],
    ["f64.ge"],
    ["i32.clz"],
    ["i32.ctz"],
    ["i32.popcnt"],
    ["i32.add"],
    ["i32.sub"],
    ["i32.mul"],
    ["i32.div_s"],
    ["i32.div_u"],
    ["i32.rem_s"],
    ["i32.rem_u"], //0x70
    ["i32.and"],
    ["i32.or"],
    ["i32.xor"],
    ["i32.shl"],
    ["i32.shr_s"],
    ["i32.shr_u"],
    ["i32.rotl"],
    ["i32.rotr"],
    ["i64.clz"],
    ["i64.ctz"],
    ["i64.popcnt"],
    ["i64.add"],
    ["i64.sub"],
    ["i64.mul"],
    ["i64.div_s"],
    ["i64.div_u"], //0x80
    ["i64.rem_s"],
    ["i64.rem_u"],
    ["i64.and"],
    ["i64.or"],
    ["i64.xor"],
    ["i64.shl"],
    ["i64.shr_s"],
    ["i64.shr_u"],
    ["i64.rotl"],
    ["i64.rotr"],
    ["f32.abs"],
    ["f32.neg"],
    ["f32.ceil"],
    ["f32.floor"],
    ["f32.trunc"],
    ["f32.nearest"], //0x90
    ["f32.sqrt"],
    ["f32.add"],
    ["f32.sub"],
    ["f32.mul"],
    ["f32.div"],
    ["f32.min"],
    ["f32.max"],
    ["f32.copysign"],
    ["f64.abs"],
    ["f64.neg"],
    ["f64.ceil"],
    ["f64.floor"],
    ["f64.trunc"],
    ["f64.nearest"],
    ["f64.sqrt"],
    ["f64.add"], //0xa0
    ["f64.sub"],
    ["f64.mul"],
    ["f64.div"],
    ["f64.min"],
    ["f64.max"],
    ["f64.copysign"],
    ["i32.wrap/i64"],
    ["i32.trunc_s/f32"],
    ["i32.trunc_u/f32"],
    ["i32.trunc_s/f64"],
    ["i32.trunc_u/f64"],
    ["i64.extend_s/i32"],
    ["i64.extend_u/i32"],
    ["i64.trunc_s/f32"],
    ["i64.trunc_u/f32"],
    ["i64.trunc_s/f64"], //0xb0
    ["i64.trunc_u/f64"],
    ["f32.convert_s/i32"],
    ["f32.convert_u/i32"],
    ["f32.convert_s/i64"],
    ["f32.convert_u/i64"],
    ["f32.demote/f64"],
    ["f64.convert_s/i32"],
    ["f64.convert_u/i32"],
    ["f64.convert_s/i64"],
    ["f64.convert_u/i64"],
    ["f64.promote/f32"],
    ["i32.reinterpret/f32"],
    ["i64.reinterpret/f64"],
    ["f32.reinterpret/i32"],
    ["f64.reinterpret/i64"],
];

function decodeVarint(bytes, offset) {
    let result = 0;
    let shift = 0;
    const size = 32;
    let bytesRead = 0;
    let byte;

    do {
        byte = bytes[offset + bytesRead];
        ++bytesRead;

        result |= (byte & 0x7F) << shift;
        shift += 7;
    } while((byte & 0x80) != 0);
    
    /* sign bit of byte is second high order bit (0x40) */
    if ((shift < size) && (byte & 0x40)) {
        /* sign extend */
        result |= (~0 << shift);
    }

    return [result, bytesRead];
}

function decodeVaruint(bytes, offset) {
    let result = 0;
    let shift = 0;
    let bytesRead = 0;

    while (true) {
        const byte = bytes[offset + bytesRead];
        result |= (byte & 0x7F) << shift;
        ++bytesRead;

        if ((byte & 0x80) == 0) {
            break;
        }

        shift += 7;
    }

    return [result, bytesRead];
}

function decodeBranchTable(bytes, offset) {
    const output = [];
    
    //target_count
    let [val, bytesRead] = decodeVaruint(bytes, offset);
    offset += bytesRead;
    output.push(val, bytesRead);
    
    //target_table (has target_count entries)
    for (let i = 0; i < val; ++i) {
        [val, bytesRead] = decodeVaruint(bytes, offset);
        offset += bytesRead;
        output.push(val, bytesRead);
    }

    //default_target
    output.push(...decodeVaruint(bytes, offset));

    return output;
}

//converts a string into an array of UTF-8 bytes
//the array is prepended by the size of the coded string encoded as a varuint
//TODO support full UTF-8 rather than just ASCII
function UTF8toString(ubytes) {
    return String.fromCharCode.apply(String, ubytes);
}

function decodeF32(bytes, offset) {
    return [(new Float32Array(bytes.slice(offset, offset + 4).buffer))[0], 4];
}

function decodeF64(bytes, offset) {
    return [(new Float64Array(bytes.slice(offset, offset + 8).buffer))[0], 8];
}

export default function getDisassembly(wasmArrayBuffer, maxBytesPerLine = 16) {
    const wasm = new Uint8Array(wasmArrayBuffer);
    const maxOffsetDigits = Math.ceil(Math.log2(wasm.length) / Math.log2(10));
    let offset = 0;
    let output = "";

    function printDisassembly(count, comment = "") {
        do {
            const bytesThisLine = Math.min(maxBytesPerLine, count);
            const bytes = Array.from(wasm.subarray(offset, offset + bytesThisLine));
            const byteText = bytes.map(b => b.toString(16).padStart(2, "0")).join(" ").padEnd(maxBytesPerLine * 3);
            const addressText = offset.toString().padStart(maxOffsetDigits, '0');
            output += `${byteText} @${addressText}: ${comment}\n`;
            offset += bytesThisLine;
            count -= bytesThisLine;
            comment = "";
        } while (count > 0);
    }

    function readVaruintAndPrint(beginComment = "", endComment = "") {
        const [val, bytesRead] = decodeVaruint(wasm, offset);
        printDisassembly(bytesRead, beginComment + val + endComment);
        return val;
    }

    function printExpression() {
        const data = opcodeData[wasm[offset]];
        let comment = data[0];
        let bytesRead = 1;
        
        for (const immediates of data.slice(1)) {
            const valsAndBytesRead = immediates(wasm, offset + bytesRead);
            for (let i = 0; i < valsAndBytesRead.length; i += 2) {
                comment += " " + valsAndBytesRead[i];
                bytesRead += valsAndBytesRead[i+1];
            }
        }
        
        printDisassembly(bytesRead, comment);
    }

    printDisassembly(4, 'Wasm magic number: "\\0asm"');
    printDisassembly(4, "Wasm version: 1");

    const typeDescription = [];

    while (offset < wasm.length) {
        output += '\n\n\n';

        const sectionCode = wasm[offset];
        printDisassembly(1, "section: " + sectionNames[sectionCode] + " ("+sectionCode+")");

        const payloadLength = readVaruintAndPrint("size: ", " bytes");
        const end = offset + payloadLength;

        if (sectionCode !== 0) {
            let firstItemLabel = sectionCode === SECTION_START ? "entry point: func " : "count: ";
            readVaruintAndPrint(firstItemLabel);
        }

        while (offset < end) {
            switch (sectionCode) {
                case SECTION_USER_DEFINED: {
                    const [size, LEBbytes] = decodeVaruint(wasm, offset);
                    const UTF8bytes = wasm.slice(offset + LEBbytes, offset + LEBbytes + size);
                    const str = UTF8toString(UTF8bytes);
                    const sanitizedStr = str.replace(/\n/g, "\\n").replace(/\0/g, "\\0");
                    printDisassembly(size + LEBbytes, `name: "${sanitizedStr}"`);

                    while (offset < end) {
                        //detect printable ASCII characters to display in the comments
                        const count = Math.min(maxBytesPerLine, end - offset);
                        const slice = wasm.slice(offset, offset + count);
                        const asText = UTF8toString(slice).replace(/[^ -~]/g, '.');
                        printDisassembly(count, asText);
                    }
                } break;

                case SECTION_TYPE: {
                    if (wasm[offset] === TYPE_FUNC) {
                        let bytesRead = 1;

                        let comment = "";
                        for (const prefix of ["func (", ") -> ("]) {
                            const [count, LEBbytes] = decodeVaruint(wasm, offset + bytesRead);
                            bytesRead += LEBbytes;
                            
                            comment += prefix;
                            const types = wasm.slice(offset + bytesRead, offset + bytesRead + count);
                            comment += Array.from(types).map(t => typeNames[t & 0x7F]).join(" ");
                            bytesRead += count;
                        }
                        comment += ')';

                        typeDescription.push(comment);
                        printDisassembly(bytesRead, comment);
                    } else {
                        throw "unrecognized Wasm type " + typeNames[type] || type;
                    }
                } break;
                
                case SECTION_IMPORT: {
                    output += '\n';
                    for (const description of ['module: ', 'field:  ']) {
                        const [size, LEBbytes] = decodeVaruint(wasm, offset);
                        const UTF8bytes = wasm.slice(offset + LEBbytes, offset + LEBbytes + size);
                        const str = UTF8toString(UTF8bytes);
                        const sanitizedStr = str.replace(/\n/g, "\\n").replace(/\0/g, "\\0");
                        printDisassembly(size + LEBbytes, `${description} "${sanitizedStr}"`);
                    }

                    const exportType = wasm[offset];
                    if (exportType === EXTERNAL_MEMORY) {
                        //print memory description
                        printDisassembly(1, "external memory");
                        const maxPagesSpecifiedFlag = wasm[offset];
                        printDisassembly(1, maxPagesSpecifiedFlag ? "limit" : "no limit");
                        readVaruintAndPrint("initial pages: ");

                        if (maxPagesSpecifiedFlag) {
                            readVaruintAndPrint("max allocation: ", " pages");
                        }
                    } else if (exportType === EXTERNAL_FUNCTION) {
                        //print imported function's signature
                        const [type, LEBbytes] = decodeVaruint(wasm, offset + 1);
                        const comment = "external " + typeDescription[type];
                        printDisassembly(LEBbytes + 1, comment);
                    }
                } break;
                
                case SECTION_FUNCTION: {
                    const [type, LEBbytes] = decodeVaruint(wasm, offset);
                    const comment = typeDescription[type];
                    printDisassembly(LEBbytes, comment);
                } break;

                case SECTION_TABLE: {
                    printDisassembly(1, "element type: " + typeNames[wasm[offset]]);

                    const maxSpecifiedFlag = wasm[offset];
                    printDisassembly(1, maxSpecifiedFlag ? "limit" : "no limit");
                    readVaruintAndPrint("initial count: ");

                    if (maxSpecifiedFlag) {
                            readVaruintAndPrint("maximum: ");
                    }
                } break;

                case SECTION_MEMORY: {
                    //print memory description
                    const maxPagesSpecifiedFlag = wasm[offset];
                    printDisassembly(1, maxPagesSpecifiedFlag ? "limit" : "no limit");
                    readVaruintAndPrint("initial pages: ");

                    if (maxPagesSpecifiedFlag) {
                            readVaruintAndPrint("max allocation: ", " pages");
                    }
                } break;

                case SECTION_GLOBAL: {
                    printDisassembly(1, typeNames[wasm[offset]]);
                    printDisassembly(1, wasm[offset] ? "mutable" : "immutable");
                    printExpression(); //expression of propper type
                    printExpression(); //end
                } break;

                case SECTION_EXPORT: {
                    const [size, LEBbytes] = decodeVaruint(wasm, offset);
                    const UTF8bytes = wasm.slice(offset + LEBbytes, offset + LEBbytes + size);
                    const str = UTF8toString(UTF8bytes);
                    const sanitizedStr = str.replace(/\n/g, "\\n").replace(/\0/g, "\\0");
                    printDisassembly(size + LEBbytes, `field: "${sanitizedStr}"`);

                    const exportType = wasm[offset];
                    const exportTypeName = externalKindNames[exportType];
                    printDisassembly(1, "type: " + exportTypeName);

                    readVaruintAndPrint("index: ")
                } break;
                
                case SECTION_CODE: {
                    output += '\n';
                    const bodySize = readVaruintAndPrint("func body size: ", " bytes");
                    const subEnd = offset + bodySize;

                    let [localCount, bytesRead] = decodeVaruint(wasm, offset);
                    let localVariableComment = "local vars:";
                    
                    for (let i = 0; i < localCount; ++i) {
                        const [count, LEBbytes] = decodeVaruint(wasm, offset + bytesRead);
                        bytesRead += LEBbytes;

                        const type = wasm[offset + bytesRead];
                        localVariableComment += (" " + typeNames[type]).repeat(count);
                        ++bytesRead;
                    }
                    
                    printDisassembly(bytesRead, localVariableComment);
                    
                    while (offset < subEnd) {
                        printExpression();
                    }
                } break;

                case SECTION_DATA: {
                    readVaruintAndPrint("linear memory index: ");
                    printExpression(); //expression of type i32
                    printExpression(); //end

                    const dataSize = readVaruintAndPrint("size of data: ", " bytes");
                    const subEnd = offset + dataSize;

                    while (offset < subEnd) {
                        //detect printable ASCII characters to display in the comments
                        const count = Math.min(maxBytesPerLine, subEnd - offset);
                        const slice = wasm.slice(offset, offset + count);
                        const asText = UTF8toString(slice).replace(/[^ -~]/g, '.');
                        printDisassembly(count, asText);
                    }
                } break;

                default:
                    printDisassembly(1);
            }
        }

        //resets the read position to beginning of next section
        offset = end;
    }

    return output;
}