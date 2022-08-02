const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
   process.env.TEST_DATABASE || "./database.sqlite"
);

const getAllArtists = async (req, res) => {
   try {
      await db.all(`SELECT * FROM Artist`, (err, data) => {
         err
            ? res.status(404).send("404 Not Found")
            : res.status(200).json(data);
      });
   } catch (error) {
      res.status(500).send(error);
   }
};

const createNewArtists = async (req, res) => {
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
            err
               ? res.status(400).send("Input field is not valid")
               : res.status(201).json(data);
         }
      );
   } catch (error) {
      res.status(400).json(error);
   }
};

const getArtistById = async (req, res) => {
   const { id } = req.params;

   try {
      await db.get(
         `SELECT * FROM Artist WHERE id = $id`,
         {
            $id: id,
         },
         (err, data) => {
            err
               ? res.status(404).send(`Artist with ID : ${id} 404 Not Found`)
               : res.status(200).json(data);
         }
      );
   } catch (error) {
      res.status(500).json(error);
   }
};

const updateArtist = async (req, res) => {
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
            err
               ? res.status(400).send("Update field")
               : res.status(200).json(data);
         }
      );
   } catch (error) {
      res.status(400).json(error);
   }
};

const deleteArtist = async (req, res) => {
   const { id } = req.params;

   try {
      db.run(
         `DELETE FROM Artist WHERE id = $id`,
         {
            $id: id,
         },
         (err, data) => {
            err
               ? res.status(404).send(`Artist with ID : ${id} not found`)
               : res
                    .status(200)
                    .send(`Delete artist with ID : ${id} successfully !`);
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
