package main

import (
	"fmt"
	"net/http"
)

func GetPasteHandler() http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(rw, "This is the request %s", r.URL)
	}
}

func CreatePasteHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// validate the inputs ...

		// data insertion ...

	}
}
