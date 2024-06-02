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
	Status  int      `json:"status"`
	Content *content `json:"content"`
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
		http.Error(rw, "Unable to retrieve the content ", http.StatusInternalServerError)
		return
	}
	response.Status = http.StatusAccepted
	response.Content = &content{text: contentText, timeAt: creationTimeStamp}
	bytearr, err := json.Marshal(response)
	if err != nil {
		http.Error(rw, "Unable to marshal the response", http.StatusInternalServerError)
		return
	}
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
	resp := respResult{Status: http.StatusAccepted}
	bytearr, err := json.Marshal(resp)
	if err != nil {
		http.Error(rw, "Unable to marshal the response", http.StatusInternalServerError)
		return
	}
	rw.Write(bytearr)
}

func DeletePasteHandler(rw http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(rw, "Could not read request body", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()
	hash := string(body)
	err = app.paste_manager.DeletePaste(hash)
	if err != nil {
		http.Error(rw, "Unable to delete the content", http.StatusInternalServerError)
		return
	}
	resp := respResult{Status: http.StatusAccepted}
	bytearr, err := json.Marshal(resp)
	if err != nil {
		http.Error(rw, "Unable to marshal the response", http.StatusInternalServerError)
		return
	}
	rw.Write(bytearr)
}
