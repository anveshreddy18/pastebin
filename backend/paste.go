package main

import (
	"encoding/json"
	"io"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
)

type content struct {
	text   string
	timeAt time.Time
}

type respResult struct {
	status  int
	content *content
}

func GetPasteHandler(rw http.ResponseWriter, r *http.Request) {
	numberStr := chi.URLParam(r, "number")
	response := respResult{}
	contentID, err := strconv.Atoi(numberStr)
	if err != nil {
		http.Error(rw, "Invalid URL", http.StatusBadRequest)
		return
	}
	contentText, creationTimeStamp, err := app.paste_manager.GetPaste(int64(contentID))
	if err != nil {
		http.Error(rw, "Problem connecting to DB, please try again later", http.StatusInternalServerError)
		return
	}
	response.status = http.StatusAccepted
	response.content = &content{text: contentText, timeAt: creationTimeStamp}
	bytearr, err := json.Marshal(response)
	rw.Write(bytearr)
}

func CreatePasteHandler(rw http.ResponseWriter, r *http.Request) {

	// get the content from the request body
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(rw, "Could not read request body", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()
	data := string(body)

	err = app.paste_manager.PostPaste(data)
	if err != nil {
		http.Error(rw, "Unable to store the content, something's wrong", http.StatusInternalServerError)
		return
	}

}
