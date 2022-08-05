const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
   process.env.TEST_DATABASE || "./database.sqlite"
);

const getArtists = async (req, res, next) => {
   try {
      await db.all(
         `SELECT * FROM Artist WHERE is_currently_employed = 1`,
         (err, data) => {
            return err
               ? next(err)
               : !data
               ? next(err)
               : res.status(200).json({ artists: data });
         }
      );
   } catch (error) {
      res.status(500).json(error);
   }
};

const createArtists = async (req, res, next) => {
   const { artist } = req.body;

   try {
      const name = artist.name;
      const dob = artist.dateOfBirth;
      const biography = artist.biography;
      const ice = artist.isCurrentlyEmployed === 0 ? 0 : 1;

      if (!name || !dob || !biography) {
         return res.status(400).send(`invalid data`);
      }

      await db.run(
         `INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)`,
         {
            $name: name,
            $dateOfBirth: dob,
            $biography: biography,
            $isCurrentlyEmployed: ice,
         },
         async function (err, data) {
            // console.log(this.lastID);
            if (err) {
               return res.status(400).json(err);
            }
            // res.status(201).json({ artist: data });
            await db.get(
               `SELECT * FROM Artist WHERE id = ${this.lastID}`,
               (eror, result) => {
                  return res.status(201).json({ artist: result });
               }
            );
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
         { $id: id },
         (err, data) => {
            if (err || !data) {
               return res.status(404).json(err);
            } else {
               return res.status(200).json({ artist: data });
            }
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
      const name = artist.name;
      const dob = artist.dateOfBirth;
      const biography = artist.biography;
      const ice = artist.isCurrentlyEmployed === 0 ? 0 : 1;

      if (!name || !dob || !biography) {
         return res.status(400).send(`invalid Request`);
      }

      await db.run(
         `UPDATE Artist SET name = $name, date_of_birth = $dateOfBirth, biography = $biography, is_currently_employed = $isCurrentlyEmployed WHERE id = $id`,
         {
            $name: name,
            $dateOfBirth: dob,
            $biography: biography,
            $isCurrentlyEmployed: ice,
            $id: id,
         },
         async function (err, data) {
            if (err) {
               return res.status(400).json(err);
            }
            await db.get(
               `SELECT * FROM Artist WHERE id = ${id}`,
               (eror, artist) => {
                  return res.status(200).json({ artist: artist });
               }
            );
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
         async function (err, data) {
            if (err) {
               return res.status(400).json(err);
            } else {
               db.get(
                  `SELECT * FROM Artist WHERE id = ${id}`,
                  (eror, artist) => {
                     return res.status(200).json({ artist: artist });
                  }
               );
            }
         }
      );
   } catch (error) {
      res.status(404).json(error);
   }
};

module.exports = {
   getArtists,
   createArtists,
   updateArtist,
   getArtistById,
   deleteArtist,
};
