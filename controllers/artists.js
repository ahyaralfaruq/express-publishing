const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
   process.env.TEST_DATABASE || "./database.sqlite"
);

const getAllArtists = async (req, res, next) => {
   try {
      await db.all(`SELECT * FROM Artist`, (err, data) => {
         return err
            ? next(err)
            : !data
            ? next(err)
            : res.status(204).json(data);
      });
   } catch (error) {
      res.status(500).json(error);
   }
};

const createNewArtists = async (req, res, next) => {
   const { artist } = req.body;

   try {
      // console.log(data);
      await db.run(
         `INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)`,
         {
            $name: artist.name,
            $dateOfBirth: artist.dateOfBirth,
            $biography: artist.biography,
            $isCurrentlyEmployed: artist.isCurrentlyEmployed,
         },
         (err, data) => {
            return err
               ? next(err)
               : !data
               ? next(err)
               : res.status(204).json(data);
         }
      );
   } catch (error) {
      res.status(400).json(error);
   }
};

const getArtistById = async (req, res, next) => {
   const { id } = req.params;

   try {
      await db.get(
         `SELECT * FROM Artist WHERE id = $id`,
         {
            $id: id,
         },
         (err, data) => {
            return err
               ? next(err)
               : !data
               ? next(err)
               : res.status(204).json(data);
         }
      );
   } catch (error) {
      res.status(500).json(error);
   }
};

const updateArtist = async (req, res, next) => {
   const { id } = req.params;
   const { artist } = req.body;

   try {
      await db.run(
         `UPDATE Artist SET name = "$name", date_of_birth = "$dateOfBirth",  = "$biography", is_currently_employed = "$isCurrentlyEmployed" WHERE id = "$id"`,
         {
            $name: artist.name,
            $dateOfBirth: artist.dateOfBirth,
            $biography: artist.biography,
            $isCurrentlyEmployed: artist.isCurrentlyEmployed,
            $id: id,
         },
         (err, data) => {
            return err
               ? next(err)
               : !data
               ? next(err)
               : res.status(204).json(data);
         }
      );
   } catch (error) {
      res.status(400).json(error);
   }
};

const deleteArtist = async (req, res, next) => {
   const { id } = req.params;

   try {
      db.run(
         `UPDATE Artist SET is_currently_employed = 0 WHERE id = $id`,
         {
            $id: id,
         },
         (err, data) => {
            return err
               ? next(err)
               : !data
               ? next(err)
               : res.status(204).json(data);
         }
      );
   } catch (error) {
      res.status(404).json(error);
   }
};

module.exports = {
   getAllArtists,
   createNewArtists,
   updateArtist,
   getArtistById,
   deleteArtist,
};
