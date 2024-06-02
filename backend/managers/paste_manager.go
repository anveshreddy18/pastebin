package managers

import (
	"database/sql"
	"fmt"
	"time"
)

// TODO: Fix the error handling

// Get query.

const GetQuery = `SELECT Content,TimeAt from pbin WHERE Id = $1`
const ExecQuery = `INSERT INTO TABLE pbin (Id,Content,TimeAt) values ($1,$2,$3)`
const DeleteQuery = `DELETE FROM pbin WHERE HashId = $1`

type PasteManager struct {
	db *sql.DB
}

func (pm *PasteManager) Init(db *sql.DB) {
	pm.db = db
}

func (pm *PasteManager) GetPaste(Id int64) (string, time.Time, error) {

	rows, err := pm.db.Query(GetQuery, Id)
	if err != nil {
		return "", time.Time{}, fmt.Errorf("unable to Retrieve rows with error %s", err)
	}
	defer rows.Close()

	var id int64
	var content string
	var timeAt time.Time
	var hashId string

	for rows.Next() {
		err := rows.Scan(&id, &content, &timeAt, &hashId)
		if err != nil {
			fmt.Errorf("unable to scan individual fields in row with error %s", err)
		}
	}
	return content, timeAt, nil
}

func (pm *PasteManager) PostPaste(Content string) error {
	_, err := pm.db.Exec(ExecQuery, Content, time.Now())
	if err != nil {
		return fmt.Errorf("unable to insert content into the DB, with err %v", err)
	}
	return nil
}

func (pm *PasteManager) DeletePaste(hash string) error {
	_, err := pm.db.Exec(DeleteQuery, hash)
	if err != nil {
		return fmt.Errorf("unable to delete the content from the DB, with err %v", err)
	}
	return nil
}
