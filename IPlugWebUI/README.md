# IPlugWebUI
A basic volume control effect plug-in which uses a platform web view to host an HTML/CSS GUI

The UI for this example can be found in `resources/web`. On macOS and iOS, it will be copied to the bundle resources folder. On Windows, you currently need to manually package and put the files somewhere.

You need to be careful if you edit `index.html`, to make sure you are editing the right version.

You can read more about using WebViews [here](https://github.com/iPlug2/iPlug2/wiki/Using-WebViews)

## UI scale

- La GUI si apre fissa al 50% della dimensione di design.
- Il contenitore dell’host segue queste dimensioni all’apertura (250×350).
- Non sono presenti controlli per lo scaling manuale.

## FL Studio (Windows) scaling

- Imposta il wrapper a `Scaling` 100% e disattiva `Auto scaling`.
- All’apertura, il contenitore del plugin si allinea alla GUI (250×350, scala 50%).
- Se modifichi le opzioni di scaling host, chiudi e riapri l’editor.
- L’HIDPI è gestito con per-monitor awareness; evita modalità di compatibilità DPI.