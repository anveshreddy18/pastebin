package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// create a struct and have this DB conn initialized here..

type App struct {
	db *sql.DB
}

func main() {
	dbConn := "postgres://root:mypass123@localhost:5432/pbin"
	// some how pass this db connection ...
	db, err := sql.Open("postgres", dbConn)

	if err != nil {
		fmt.Errorf("Database connection error %s", err)
	}

	app := App{}
	app.db = db

	r := chi.NewRouter()

	http.ListenAndServe(":8080", r)

}
