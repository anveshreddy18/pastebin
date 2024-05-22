package main

import (
	"database/sql"
	"fmt"
	"net/http"
	paste_manager "pastebin/managers"

	"github.com/go-chi/chi/v5"
)

// create a struct and have this DB conn initialized here..

type App struct {
	db            *sql.DB
	paste_manager *paste_manager.PasteManager
}

func main() {

	app := App{}

	// initialize db connection.
	dbConn := "postgres://root:mypass123@localhost:5432/pbin"
	db, err := sql.Open("postgres", dbConn)
	if err != nil {
		fmt.Errorf("Database connection error %s", err)
	}

	// initialize paste_manager.
	pm := paste_manager.PasteManager{}
	pm.Init(db)

	// initialize app
	app.db = db
	app.paste_manager = &pm

	r := chi.NewRouter()

	http.ListenAndServe(":8080", r)

}
