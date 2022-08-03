const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
   process.env.TEST_DATABASE || "./database.sqlite"
);

const getSeries = async (req, res, next) => {
   try {
      await db.all("SELECT * FROM Series", (err, data) => {
         return err ? next(err) : res.status(200).json(data);
      });
   } catch (error) {
      res.status(404).json(error);
   }
};

const createSeries = async (req, res, next) => {
   const { series } = req.body;

   try {
      db.run(
         `INSERT INTO Series (name, description) VALUES ($name, $description)`,
         {
            $name: series.name,
            $description: series.description,
         },
         (err, data) => {
            err ? next(err) : res.status(201).json(data);
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
            : res.status(200).json(data);
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
      await db.get(
         `UPDATE Series SET name = $name, description = $description WHERE id = ${id}`,
         {
            $name: series.name,
            $description: series.description,
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

const deleteSeries = async (req, res, next) => {
   const { id } = req.params;

   try {
      await db.get(`DELETE FROM Series WHERE id = ${id}`, (err, data) => {
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
   getSeries,
   createSeries,
   getSeriesById,
   updateSeries,
   deleteSeries,
};
