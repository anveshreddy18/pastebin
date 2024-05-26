package main

import paste_manager "pastebin/managers"

func initManagers(app *App) {
	// init paste manager...
	pm := paste_manager.PasteManager{}
	pm.Init(app.db)

	// initialize app with paste manager
	app.paste_manager = &pm
}
