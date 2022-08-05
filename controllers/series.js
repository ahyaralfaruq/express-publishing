const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
   process.env.TEST_DATABASE || "./database.sqlite"
);

const getSeries = async (req, res, next) => {
   try {
      await db.all("SELECT * FROM Series", (err, data) => {
         return err ? next(err) : res.status(200).json({ series: data });
      });
   } catch (error) {
      res.status(404).json(error);
   }
};

const createSeries = async (req, res, next) => {
   const { series } = req.body;

   try {
      const name = series.name;
      const desc = series.description;

      if (!name || !desc) {
         return res.status(400).send(`Invalid Request`);
      }

      await db.run(
         `INSERT INTO Series (name, description) VALUES ($name, $description)`,
         {
            $name: name,
            $description: desc,
         },
         async function (err, data) {
            if (err) {
               return res.status(400).json(err);
            } else {
               await db.get(
                  `SELECT * FROM Series WHERE id = ${this.lastID}`,
                  (eror, series) => {
                     return res.status(201).json({ series: series });
                  }
               );
            }
         }
      );
   } catch (error) {
      res.status(400).json(error);
   }
};

const getSeriesById = async (req, res, next) => {
   const { id } = req.params;

   try {
      await db.get(`SELECT * FROM Series WHERE id = ${id}`, (err, data) => {
         // return err ? next(err) : res.status(200).json(data);
         return err
            ? next(err)
            : !data
            ? next(err)
            : res.status(200).json({ series: data });
      });
   } catch (error) {
      // res.status(404).json(error);
      console.log(error);
      throw error;
   }
};

const updateSeries = async (req, res, next) => {
   const { id } = req.params;
   const { series } = req.body;

   try {
      const name = series.name;
      const desc = series.description;

      if (!name || !desc) {
         return res.status(400).send(`Invalid Request`);
      }

      await db.get(
         `UPDATE Series SET name = $name, description = $description WHERE id = ${id}`,
         {
            $name: series.name,
            $description: series.description,
         },
         async function (err, data) {
            if (err) {
               return res.status(400).json(err);
            } else {
               await db.get(
                  `SELECT * FROM Series WHERE id = ${id}`,
                  (eror, series) => {
                     return res.status(200).json({ series: series });
                  }
               );
            }
         }
      );
   } catch (error) {
      res.status(404).json(error);
   }
};

const deleteSeries = async (req, res, next) => {
   const { id } = req.params;

   try {
      await db.get(
         `SELECT * FROM Issue WHERE series_id = ${id}`,
         (err, data) => {
            if (err) {
               res.status(400).json(err);
            } else {
               if (data) {
                  res.status(400).json(data);
               } else {
                  db.run(`DELETE FROM Series WHERE id = ${id}`, (eror) => {
                     if (eror) {
                        res.status(400).json(eror);
                     } else {
                        res.sendStatus(204);
                     }
                  });
               }
            }
         }
      );
   } catch (error) {
      res.status(404).json(error);
   }
};

module.exports = {
   getSeries,
   createSeries,
   getSeriesById,
   updateSeries,
   deleteSeries,
};
