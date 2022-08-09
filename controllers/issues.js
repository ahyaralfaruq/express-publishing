const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
   process.env.TEST_DATABASE || "./database.sqlite"
);

const getIssues = async (req, res, next) => {
   // console.log(req.params);
   const { seriesId } = req.params;

   await db.all(
      `SELECT id FROM Series WHERE id = ${seriesId} AND id IS NOT NULL`,
      async function (err, data) {
         if (err) {
            return next(err);
         } else {
            if (data.length === 0 || !data) {
               return next(err);
            } else {
               await db.all(
                  `SELECT * FROM Issue WHERE series_id = ${seriesId} AND series_id IS NOT NULL`,
                  async function (err, data) {
                     return err
                        ? next(err)
                        : res.status(200).json({ issues: data });
                  }
               );
            }
         }
      }
   );
};

const postIssues = async (req, res, next) => {
   const { issue } = req.body;
   const { seriesId } = req.params;

   const name = issue.name;
   const issueNumber = issue.issueNumber;
   const publicationDate = issue.publicationDate;
   const artistId = issue.artistId;

   if (!name || !issueNumber || !publicationDate || !artistId) {
      return res.sendStatus(400);
   }

   await db.run(
      `INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id) VALUES ($name,$issueNumber,$publicationDate,$artistId,$seriesId)`,
      {
         $name: name,
         $issueNumber: issueNumber,
         $publicationDate: publicationDate,
         $artistId: artistId,
         $seriesId: seriesId,
      },
      function (err, data) {
         if (err) {
            next(err);
         } else {
            db.get(
               `SELECT * FROM Issue WHERE id = ${this.lastID}`,
               (err, data) => {
                  if (err) {
                     next(err);
                  } else {
                     res.status(201).json({ issue: data });
                  }
               }
            );
         }
      }
   );
};

const cekUpdate = async (req, res, next) => {
   const { issueId } = req.params;

   await db.get(
      `SELECT * FROM Issue WHERE id = ${issueId}`,
      async function (err, data) {
         console.log(err, data);
         if (err) {
            return next(err);
         } else {
            return res.status(200).json({ cek: data });
         }
      }
   );
};

const updateIssues = async (req, res, next) => {
   const { seriesId, issueId } = req.params;
   const { issue } = req.body;

   const name = issue.name;
   const issueNumber = issue.issueNumber;
   const publicationDate = issue.publicationDate;
   const artistId = issue.artistId;

   await db.all(
      `SELECT id FROM Issue WHERE id = ${issueId} AND id IS NOT NULL`,
      async function (err, data) {
         if (err) {
            return next(err);
         } else {
            if (data.length === 0 || !data) {
               return next(err);
            } else {
               if (!name || !issueNumber || !publicationDate || !artistId) {
                  return res.sendStatus(400);
               }

               let sql = `UPDATE Issue SET name = "${name}", issue_number = ${issueNumber}, publication_date = "${publicationDate}", artist_id = ${artistId}, series_id = ${seriesId} WHERE Issue.id = ${issueId}`;

               await db.run(sql, async function (error, data) {
                  if (error) {
                     next(error);
                  } else {
                     await db.get(
                        `SELECT * FROM Issue WHERE id = ${issueId} AND id IS NOT NULL`,
                        (error, data) => {
                           if (error) {
                              return next(error);
                           } else {
                              if (Object.keys(data).length === 0 || !data) {
                                 return next(err);
                              } else {
                                 return res.status(200).json({ issue: data });
                              }
                           }
                        }
                     );
                  }
               });
            }
         }
      }
   );
};

const deleteIssues = async (req, res, next) => {
   const { seriesId, issueId } = req.params;

   await db.all(
      `SELECT id FROM Series WHERE id = ${seriesId} AND id IS NOT NULL`,
      async function (err, data) {
         if (err) {
            return next(err);
         } else {
            if (data.length === 0 || !data) {
               return next(err);
            } else {
               await db.all(
                  `SELECT id FROM Issue WHERE id = ${issueId} AND id IS NOT NULL`,
                  async function (err, data) {
                     if (err) {
                        return next(err);
                     } else {
                        if (data.length === 0 || !data) {
                           return next(err);
                        } else {
                           await db.run(
                              `DELETE FROM Issue WHERE id = ${issueId}`,
                              (error) => {
                                 if (error) {
                                    next(error);
                                 } else {
                                    res.sendStatus(204);
                                 }
                              }
                           );
                        }
                     }
                  }
               );
            }
         }
      }
   );
};

module.exports = {
   getIssues,
   postIssues,
   cekUpdate,
   updateIssues,
   deleteIssues,
};
