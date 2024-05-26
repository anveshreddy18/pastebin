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

var app = &App{}

func main() {

	// initialize db connection.
	dbConn := "postgres://root:mypass123@localhost:5432/pbin"
	db, err := sql.Open("postgres", dbConn)
	app.db = db
	if err != nil {
		fmt.Errorf("Database connection error %s", err)
	}

	// initialize paste_manager.
	initManagers(app)

	// handlers ..
	r := chi.NewRouter()
	r.Get("/{number}", GetPasteHandler)
	// r.Get("/",)
	r.Post("/submit", CreatePasteHandler)

	http.ListenAndServe(":8080", r)

}
