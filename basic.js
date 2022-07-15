import { dlopen, suffix, ptr } from 'bun:ffi'

const { symbols } = dlopen(`./raylib/raylib.${process.arch}.${suffix}`, {
  InitWindow: {
    args: ['i32', 'i32', 'cstring'],
    retruns: 'void'
  },

  WindowShouldClose: {
    args: [],
    returns: 'bool'
  },

  CloseWindow: {
    args: [],
    returns: 'void'
  },

  BeginDrawing: {
    args: [],
    returns: 'void'
  },

  EndDrawing: {
    args: [],
    returns: 'void'
  },

  SetTargetFPS: {
    args: ['i32'],
    returns: 'void'
  },

  ClearBackground: {
    args: ['i32'],
    returns: 'void'
  },

  DrawText: {
    args: ['cstring', 'i32', 'i32', 'i32', 'i32'],
    retruns: 'void'
  },

  DrawFPS: {
    args: ['i32', 'i32'],
    retruns: 'void'
  }
})

// convert a string into a pointer to a buffer
const cstr = s => ptr(Buffer.from((s || '\0')))

// convert a 0-255 rgba to number
const rgb = (r, g, b, a) => (r & 0xFF) | ((g & 0xFF) << 8) | ((b & 0xFF) << 16) | ((a & 0xFF) << 24)

export const LIGHTGRAY = rgb(200, 200, 200, 255) // Light Gray
export const GRAY = rgb(130, 130, 130, 255) // Gray
export const DARKGRAY = rgb(80, 80, 80, 255) // Dark Gray
export const YELLOW = rgb(253, 249, 0, 255) // Yellow
export const GOLD = rgb(255, 203, 0, 255) // Gold
export const ORANGE = rgb(255, 161, 0, 255) // Orange
export const PINK = rgb(255, 109, 194, 255) // Pink
export const RED = rgb(230, 41, 55, 255) // Red
export const MAROON = rgb(190, 33, 55, 255) // Maroon
export const GREEN = rgb(0, 228, 48, 255) // Green
export const LIME = rgb(0, 158, 47, 255) // Lime
export const DARKGREEN = rgb(0, 117, 44, 255) // Dark Green
export const SKYBLUE = rgb(102, 191, 255, 255) // Sky Blue
export const BLUE = rgb(0, 121, 241, 255) // Blue
export const DARKBLUE = rgb(0, 82, 172, 255) // Dark Blue
export const PURPLE = rgb(200, 122, 255, 255) // Purple
export const VIOLET = rgb(135, 60, 190, 255) // Violet
export const DARKPURPLE = rgb(112, 31, 126, 255) // Dark Purple
export const BEIGE = rgb(211, 176, 131, 255) // Beige
export const BROWN = rgb(127, 106, 79, 255) // Brown
export const DARKBROWN = rgb(76, 63, 47, 255) // Dark Brown
export const WHITE = rgb(255, 255, 255, 255) // White
export const BLACK = rgb(0, 0, 0, 255) // Black
export const BLANK = rgb(0, 0, 0, 0) // Blank (Transparent)
export const MAGENTA = rgb(255, 0, 255, 255) // Magenta
export const RAYWHITE = rgb(245, 245, 245, 255) // My own White (raylib logo)

// I wrap them in JS to do things like mess with struct/string/etc

export const InitWindow = (width, height, title) => symbols.InitWindow(width, height, cstr(title))
export const DrawText = (text, x, y, size, color) => symbols.DrawText(cstr(text), x, y, size, color)

// these don't need any wrapping
export const { WindowShouldClose, CloseWindow, BeginDrawing, EndDrawing, SetTargetFPS, ClearBackground, DrawFPS } = symbols

// testing
InitWindow(800, 450, 'bun!!')
SetTargetFPS(60)

while (!WindowShouldClose()) {
  BeginDrawing()
  ClearBackground(RAYWHITE)
  DrawText('Congrats! You created your first window!', 190, 200, 20, BLACK)
  DrawFPS(10, 10)
  EndDrawing()
}
CloseWindow()
