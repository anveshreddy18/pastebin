package paste_manager

import (
	"database/sql"
	"fmt"
	"time"
)

// TODO: Fix the error handling

// Get query.

const GetQuery = `SELECT Content,TimeAt from pbin WHERE Id = $1`
const ExecQuery = `INSERT INTO TABLE pbin (Id,Content,TimeAt) values ($1,$2,$3)`

type PasteManager struct {
	db *sql.DB
}

func (pm *PasteManager) Init(db *sql.DB) {
	pm.db = db
}

func (pm *PasteManager) GetPaste(Id int64) (string, time.Time) {
	rows, err := pm.db.Query(GetQuery, Id)

	if err != nil {
		fmt.Errorf("Unable to Retrieve rows with error %s", err)
	}

	defer rows.Close()

	var content string
	var timeAt time.Time

	for rows.Next() {
		// Declare variables to store column values

		err := rows.Scan(&content, &timeAt)

		if err != nil {
			fmt.Errorf("Unable to scan individual fields in row with error %s", err)
		}

	}

	return content, timeAt
}

func (pm *PasteManager) PostPaste(Id int64, Content string) {
	pm.db.Exec(ExecQuery)
}
