# IPlugWebUI
A basic volume control effect plug-in which uses a platform web view to host an HTML/CSS GUI

The UI for this example can be found in `resources/web`. On macOS and iOS, it will be copied to the bundle resources folder. On Windows, you currently need to manually package and put the files somewhere.

You need to be careful if you edit `index.html`, to make sure you are editing the right version.

You can read more about using WebViews [here](https://github.com/iPlug2/iPlug2/wiki/Using-WebViews)

## FL Studio (Windows) scaling

- Keep the wrapper's `Scaling` at 100% and disable `Auto scaling` for the plugin.
- The editor auto-fits to the host window; resize the wrapper window to adjust size.
- If the UI appears cropped, close and reopen once after changing FL scaling settings.
- High-DPI is handled via per-monitor awareness; avoid forcing Windows compatibility DPI modes.

## Manual UI scale (100/50/25)

- A small overlay at top-right lets you pick the UI scale: 100%, 50%, or 25%.
- Default is 50%; your choice is saved and restored automatically.
- The manual scale never exceeds the available host window (still auto-fits down if needed).
- Hosts can set it programmatically via `window.setUIScale(25|50|100)` from the WebView context.