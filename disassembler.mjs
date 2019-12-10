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

const wasm_end_opcode = 11;

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
    ["call", decodeFunctionIndex], //0x10
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
    } while ((byte & 0x80) != 0);

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
    const target_count = val;
    offset += bytesRead;
    output.push(val, bytesRead);

    //target_table (has target_count entries)
    for (let i = 0; i < target_count; ++i) {
        [val, bytesRead] = decodeVaruint(bytes, offset);
        offset += bytesRead;
        output.push(val, bytesRead);
    }

    //default_target
    output.push(...decodeVaruint(bytes, offset));

    return output;
}

const importedFunctionNames = [];
function decodeFunctionIndex(byte, offset) {
    const [index, bytesRead] = decodeVaruint(byte, offset);
    const output = ["", bytesRead];

    if (index < importedFunctionNames.length) {
        output[0] = importedFunctionNames[index];
    } else {
        output[0] = String(index);
    }

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
    const maxReadPosDigits = Math.ceil(Math.log2(wasm.length) / Math.log2(10));
    let readPos = 0;
    let output = "";

    function printBytes(count, comment = "") {
        do {
            const bytesThisLine = Math.min(maxBytesPerLine, count);
            const bytes = Array.from(wasm.subarray(readPos, readPos + bytesThisLine));
            const byteText = bytes.map(b => b.toString(16).padStart(2, "0")).join(" ").padEnd(maxBytesPerLine * 3);
            const addressText = readPos.toString().padStart(maxReadPosDigits, '0');
            output += `${byteText} @${addressText}: ${comment}\n`;
            readPos += bytesThisLine;
            count -= bytesThisLine;

            //if a number of bytes spans across more than 1 line, only the first line
            //displays the comment.
            comment = "";
        } while (count > 0);
    }

    function readVaruintAndPrint(beginComment = "", endComment = "") {
        const [val, bytesRead] = decodeVaruint(wasm, readPos);
        printBytes(bytesRead, beginComment + val + endComment);
        return val;
    }

    function printOpcode(nextKnownAddress) {
        const operation = wasm[readPos];
        const data = opcodeData[operation];

        if (data === undefined) {
            printBytes(1, "Unrecognized opcode");

            //if the next valid address is known, jump to that
            //otherwise, the best course of action is to halt
            readPos = nextKnownAddress || wasm.length;
            return wasm_end_opcode;
        }

        let comment = data[0];
        let bytesRead = 1;

        for (const immediateHandlers of data.slice(1)) {
            const valsAndBytesRead = immediateHandlers(wasm, readPos + bytesRead);
            for (let i = 0; i < valsAndBytesRead.length; i += 2) {
                comment += " " + valsAndBytesRead[i];
                bytesRead += valsAndBytesRead[i + 1];
            }
        }

        printBytes(bytesRead, comment);
        return operation;
    }

    printBytes(4, 'Wasm magic number: "\\0asm"');
    printBytes(4, "Wasm version: 1");

    const typeDescription = [];

    //reset this array so imported functions in previous modules don't influence future modules
    importedFunctionNames.length = 0;

    while (readPos < wasm.length) {
        output += '\n\n\n';

        const sectionCode = wasm[readPos];
        printBytes(1, "section: " + sectionNames[sectionCode] + " (" + sectionCode + ")");

        const payloadLength = readVaruintAndPrint("size: ", " bytes");
        const end = readPos + payloadLength;

        //The first varuint defined after the section ID is either the entry point function index
        //or the number of entries inside a section.
        if (sectionCode !== 0) {
            const firstItemLabel = sectionCode === SECTION_START ? "entry point: func " : "count: ";
            readVaruintAndPrint(firstItemLabel);
        }

        while (readPos < end) {
            switch (sectionCode) {
                case SECTION_USER_DEFINED: {
                    const [size, LEBbytes] = decodeVaruint(wasm, readPos);
                    const UTF8bytes = wasm.slice(readPos + LEBbytes, readPos + LEBbytes + size);
                    const str = UTF8toString(UTF8bytes);
                    const sanitizedStr = str.replace(/\n/g, "\\n").replace(/\0/g, "\\0");
                    printBytes(size + LEBbytes, `name: "${sanitizedStr}"`);

                    while (readPos < end) {
                        //detect printable ASCII characters to display in the comments
                        const count = Math.min(maxBytesPerLine, end - readPos);
                        const slice = wasm.slice(readPos, readPos + count);
                        const asText = UTF8toString(slice).replace(/[^ -~]/g, '.');
                        printBytes(count, asText);
                    }
                } break;

                case SECTION_TYPE: {
                    // if (wasm[offset] === TYPE_FUNC) {
                    let bytesRead = 1;

                    let comment = "";
                    for (const prefix of ["func (", ") -> ("]) {
                        const [count, LEBbytes] = decodeVaruint(wasm, readPos + bytesRead);
                        bytesRead += LEBbytes;

                        comment += prefix;
                        const types = wasm.slice(readPos + bytesRead, readPos + bytesRead + count);
                        comment += Array.from(types).map(t => typeNames[t & 0x7F]).join(" ");
                        bytesRead += count;
                    }
                    comment += ')';

                    typeDescription.push(comment);
                    printBytes(bytesRead, comment);
                    // }
                } break;

                case SECTION_IMPORT: {
                    output += '\n';

                    const strs = [];
                    for (const description of ['module:', 'field: ']) {
                        const [size, LEBbytes] = decodeVaruint(wasm, readPos);
                        const UTF8bytes = wasm.slice(readPos + LEBbytes, readPos + LEBbytes + size);
                        const str = UTF8toString(UTF8bytes);
                        const sanitizedStr = str.replace(/\n/g, "\\n").replace(/\0/g, "\\0");
                        strs.push(sanitizedStr);
                        printBytes(size + LEBbytes, `${description} "${sanitizedStr}"`);
                    }

                    const exportType = wasm[readPos];
                    if (exportType === EXTERNAL_MEMORY) {
                        //print memory description
                        printBytes(1, "external memory");
                        const maxPagesSpecifiedFlag = wasm[readPos];
                        printBytes(1, maxPagesSpecifiedFlag ? "limit" : "no limit");
                        readVaruintAndPrint("initial pages: ");

                        if (maxPagesSpecifiedFlag) {
                            readVaruintAndPrint("max allocation: ", " pages");
                        }
                    } else if (exportType === EXTERNAL_FUNCTION) {
                        //print imported function's signature
                        const [type, LEBbytes] = decodeVaruint(wasm, readPos + 1);
                        const comment = "external " + typeDescription[type];
                        printBytes(LEBbytes + 1, comment);

                        importedFunctionNames.push(strs.join("."));
                    }
                } break;

                case SECTION_FUNCTION: {
                    const [type, LEBbytes] = decodeVaruint(wasm, readPos);
                    const comment = typeDescription[type];
                    printBytes(LEBbytes, comment);
                } break;

                case SECTION_TABLE: {
                    printBytes(1, "element type: " + typeNames[wasm[readPos]]);

                    const maxSpecifiedFlag = wasm[readPos];
                    printBytes(1, maxSpecifiedFlag ? "limit" : "no limit");
                    readVaruintAndPrint("initial count: ");

                    if (maxSpecifiedFlag) {
                        readVaruintAndPrint("maximum: ");
                    }
                } break;

                case SECTION_MEMORY: {
                    //print memory description
                    const maxPagesSpecifiedFlag = wasm[readPos];
                    printBytes(1, maxPagesSpecifiedFlag ? "limit" : "no limit");
                    readVaruintAndPrint("initial pages: ");

                    if (maxPagesSpecifiedFlag) {
                        readVaruintAndPrint("max allocation: ", " pages");
                    }
                } break;

                case SECTION_GLOBAL: {
                    printBytes(1, typeNames[wasm[readPos]]);
                    printBytes(1, wasm[readPos] ? "mutable" : "immutable");
                    while (printOpcode() !== wasm_end_opcode);
                } break;

                case SECTION_EXPORT: {
                    const [size, LEBbytes] = decodeVaruint(wasm, readPos);
                    const UTF8bytes = wasm.slice(readPos + LEBbytes, readPos + LEBbytes + size);
                    const str = UTF8toString(UTF8bytes);
                    const sanitizedStr = str.replace(/\n/g, "\\n").replace(/\0/g, "\\0");
                    printBytes(size + LEBbytes, `field: "${sanitizedStr}"`);

                    const exportType = wasm[readPos];
                    const exportTypeName = externalKindNames[exportType];
                    printBytes(1, "type: " + exportTypeName);

                    readVaruintAndPrint("index: ")
                } break;

                case SECTION_ELEMENT: {
                    readVaruintAndPrint("table index: ");
                    while (printOpcode() !== wasm_end_opcode);
                    const elementCount = readVaruintAndPrint("element count: ");

                    for (let i = 0; i < elementCount; ++i) {
                        readVaruintAndPrint("function index: ");
                    }
                } break;

                case SECTION_CODE: {
                    output += '\n';
                    const bodySize = readVaruintAndPrint("func body size: ", " bytes");
                    const funcBodyEnd = readPos + bodySize;

                    let [localCount, bytesRead] = decodeVaruint(wasm, readPos);
                    let localVariableComment = "local vars:";

                    for (let i = 0; i < localCount; ++i) {
                        const [count, LEBbytes] = decodeVaruint(wasm, readPos + bytesRead);
                        bytesRead += LEBbytes;

                        const type = wasm[readPos + bytesRead];
                        localVariableComment += (" " + typeNames[type]).repeat(count);
                        ++bytesRead;
                    }

                    printBytes(bytesRead, localVariableComment);

                    while (readPos < funcBodyEnd) {
                        printOpcode(funcBodyEnd);
                    }

                    // Assume the function body size is correct.  If an opcode reads beyond
                    // the end of it's function body, reset the read position to the next
                    // known address (typically beginning of next function).
                    readPos = funcBodyEnd;
                } break;

                case SECTION_DATA: {
                    readVaruintAndPrint("linear memory index: ");
                    while (printOpcode() !== wasm_end_opcode);

                    const dataSize = readVaruintAndPrint("size of data: ", " bytes");
                    const subEnd = readPos + dataSize;

                    while (readPos < subEnd) {
                        //detect printable ASCII characters to display in the comments
                        const count = Math.min(maxBytesPerLine, subEnd - readPos);
                        const slice = wasm.slice(readPos, readPos + count);
                        const asText = UTF8toString(slice).replace(/[^ -~]/g, '.');
                        printBytes(count, asText);
                    }
                } break;

                default:
                    printBytes(1);
            }
        }

        //resets the read position to beginning of next section
        readPos = end;
    }

    return output;
}