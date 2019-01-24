# Small-Wasm-Disassembler
This disassembler is displays the raw bytes of a .wasm module in HEX and displays comments to the right.

User defined sections are searched for ASCII text.

I created this tool to preserve the disassembler I removed from TouchScript as well as to provide myself
the means to inspect user defined sections of a wasm binary.  DevTools in Firefox and Chrome skip the
sections, so seeing how much space belongs to custom sections and what the data is used for is difficult.
