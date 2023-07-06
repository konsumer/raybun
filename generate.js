// this will generate the JSON for a bun FFI wrapper for raylib

import { writeFile } from 'fs/promises'

const { defines, structs, aliases, enums, callbacks, functions } = await fetch('https://raw.githubusercontent.com/raysan5/raylib/master/parser/output/raylib_api.json').then(r => r.json())


// map C type to FFI type
function mapType (a) {
  if (a.endsWith('*')) {
    if (a === 'const char *') {
      return 'cstring'
    }
    return 'ptr'
  }
  a = a.replace(/^const /, '')
  
  if (a === 'int') {
    return 'i32'
  }
  if (a === 'void') {
    return 'void'
  }
  if (a === 'bool') {
    return 'bool'
  }
  if (a === 'float') {
    return 'f32'
  }
  if (a === 'unsigned int') {
    return 'u32'
  }
  if (a === 'char') {
    return 'char'
  }
  if (a === 'double') {
    return 'f64'
  }

  return 'ptr'
}


const api = {}
for (const f of functions) {
  if (f.returnType === '...') {

  }
  api[f.name] = {
    args: (f?.params || []).map(t => mapType(t.type)),
    returns: mapType(f.returnType)
  }
}

await writeFile('raylib/ffi.json', JSON.stringify(api, null, 2))
