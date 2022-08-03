const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
   process.env.TEST_DATABASE || "./database.sqlite"
);

const getIssues = async (req, res, next) => {
   try {
      await db.all(`SELECT * FROM Issue`, (err, data) => {
         return err
            ? next(err)
            : !data
            ? next(err)
            : res.status(200).json(data);
      });
   } catch (error) {
      res.status(404).json(error);
   }
};

const postIssues = async (req, res, next) => {
   const { issue } = req.body;

   try {
      await db.run(
         `INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id) VALUES ($name,$issueNumber,$publicationDate,$artistId,$seriesId)`,
         {
            $name: issue.name,
            $issueNumber: issue.issueNumber,
            $publicationDate: issue.publicationDate,
            $artistId: issue.artistId,
            $seriesId: issue.seriesId,
         },
         (err, data) => {
            return err
               ? next(err)
               : !data
               ? next(err)
               : res.status(200).json(data);
         }
      );
   } catch (error) {
      res.status(404).json(error);
   }
};

const updateIssues = async (req, res, next) => {
   const { issueId } = req.params;
   const { issue } = req.body;

   try {
      await db.run(
         `UPDATE Issue SET name = $name, issue_number = $issueNumber, publication_date = $publicationDate, artist_id = $artistId, series_id = $seriesId WHERE id = ${issueId}`,
         {
            $name: issue.name,
            $issueNumber: issue.issueNumber,
            $publicationDate: issue.publicationDate,
            $artistId: issue.artistId,
            $seriesId: issue.seriesId,
         },
         (err, data) => {
            return err
               ? next(err)
               : !data
               ? next(err)
               : res.status(200).json(data);
         }
      );
   } catch (error) {
      res.status(404).json(error);
   }
};

const deleteIssues = async (req, res, next) => {
   const { issueId } = req.params;

   try {
      await db.all(`DELETE FROM Issue WHERE id = ${issueId}`, (err, data) => {
         return err
            ? next(err)
            : !data
            ? next(err)
            : res.status(204).json(data);
      });
   } catch (error) {
      res.status(404).json(error);
   }
};

module.exports = {
   getIssues,
   postIssues,
   updateIssues,
   deleteIssues,
};
