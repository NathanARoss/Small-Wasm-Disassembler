const consoleOutput = document.getElementById("console-output");
document.getElementById('file-picker').addEventListener('change', handleFileSelect, false);


function print(value) {
    if (consoleOutput.childNodes.length == 0 || consoleOutput.lastChild.nodeValue.length > 512) {
        const textNode = document.createTextNode(value);
        consoleOutput.appendChild(textNode);
    } else {
        consoleOutput.lastChild.nodeValue += value;
    }
}

function clear() {
    consoleOutput.innerHTML = "";
}

function disassemble(arrayBuffer) {
    const ubytes = new Uint8Array(arrayBuffer);
    const disassembly = Wasm.getDisassembly(ubytes);
    print(disassembly);
}


function handleFileSelect(event) {
    clear();

    if (this.files.length !== 1) {
        print("Please select one file.\n")
    }
    const file = this.files[0];

    const reader = new FileReader();

    reader.onload = function(event) {
        const arrayBuffer = event.target.result;
        disassemble(arrayBuffer);
    }

    reader.readAsArrayBuffer(file);
}

print("Select a .wasm file for disassembly\n");