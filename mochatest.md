> x-press-publishing@1.0.0 test
> mocha

Server is running on http://localhost:8081

Artist Table
✔ should exist
✔ should have name, date_of_birth, biography, and is_currently_employed columns with appropriate data types (290ms)
✔ should have a required name column
✔ should have a required date_of_birth column
✔ should have a required biography column
✔ is_currently_employed should default to 1 (303ms)

Series Table
✔ should exist
✔ should have id, name, and description columns with appropriate data types (292ms)
✔ should have a required name column
✔ should have a required description column

Issue Table
✔ should exist
✔ should have id, name, issue_number, publication_date, artist_id, and series_id columns with appropriate data types (269ms)
✔ should have a required name column
✔ should have a required name column
✔ should have a required issue_number column
✔ should have a required publication_date column
✔ should have a required artist_id column
✔ should have a required series_id column

GET /api/artists
✔ should return all currently-employed artists (50ms)
✔ should return a status code of 200 (47ms)

GET /api/artists/:id
✔ should return the artist with the given ID
✔ should return a 200 status code for valid IDs
✔ should return a 404 status code for invalid IDs

POST /api/artists
✔ should create a valid artist (195ms)
✔ should return a 201 status code after artist creation (287ms)
✔ should return the newly-created artist after artist creation (120ms)
✔ should set new artists as currently-employed by default (133ms)
✔ should return a 400 status code for invalid artists

PUT /api/artists/:id
✔ should update the artist with the given ID (140ms)
✔ should return a 200 status code after artist update (139ms)
✔ should return the updated artist after artist update (165ms)
✔ should return a 400 status code for invalid artist updates

DELETE /api/artists/:id
✔ should set the artist with the given ID as not currently-employed (144ms)
✔ should return a 200 status code after artist delete (312ms)
✔ should return the deleted artist after artist delete (128ms)

GET /api/series
✔ should return all series
✔ should return a status code of 200

GET /api/series/:id
✔ should return the series with the given ID
✔ should return a 200 status code for valid IDs
✔ should return a 404 status code for invalid IDs

POST /api/series
✔ should create a valid series (194ms)
✔ should return a 201 status code after series creation (166ms)
✔ should return the newly-created series after series creation (204ms)
✔ should return a 400 status code for invalid series

PUT /api/series/:id
✔ should update the series with the given ID (154ms)
✔ should return a 200 status code after series update (163ms)
✔ should return the updated series after series update (118ms)
✔ should return a 400 status code for invalid series updates

DELETE /api/series/:id
✔ should remove the series with the specified ID from the database if that series has no related issues (163ms)
✔ should return a 204 status code after series delete (150ms)
✔ should not delete series with existing related issues
✔ should return a 400 status code if deleted series has existing related issues

GET /api/series/:seriesId/issues
✔ should return all issues of an existing series
✔ should return an empty array for existing series with no issues
✔ should return a status code of 200 for valid series
✔ should return a status code of 404 for invalid series

POST /api/series/:seriesId/issues
✔ should create a valid issue (116ms)
✔ should return a 201 status code after issue creation (146ms)
✔ should return the newly-created issue after issue creation (131ms)
✔ should return a 400 status code for invalid issues
✔ should return a 400 status code if an artist with the issue's artist ID doesn't exist

PUT /api/series/:seriesId/issues/:issueId
✔ should update the issue with the given ID (193ms)
✔ should return a 200 status code after issue update (234ms)
✔ should return the updated issue after issue update (145ms)
✔ should return a 404 status code for invalid issue IDs
✔ should return a 400 status code for invalid issue updates
✔ should return a 400 status code if an artist with the updated artist ID doesn't exist

DELETE /api/series/:seriesId/issues/:issueId
✔ should remove the issue with the specified ID from the database (207ms)
✔ should return a 204 status code after issue delete (175ms)
✔ should return a 404 status code for invalid issue IDs

70 passing (39s)
