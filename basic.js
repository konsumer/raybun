// this uses pure FFI in bun to use raylib DLL

import * as r from './raylib/index.js'

r.InitWindow(800, 450, 'bun!!')
r.SetTargetFPS(60)

while (!r.WindowShouldClose()) {
  r.BeginDrawing()
  r.ClearBackground(r.RAYWHITE)
  r.DrawText('Congrats! You created your first window!', 190, 200, 20, r.BLACK)
  r.DrawFPS(10, 10)
  r.EndDrawing()
}

r.CloseWindow()
