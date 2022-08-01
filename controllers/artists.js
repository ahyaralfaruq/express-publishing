const sqlite3 = require("sqlite3");
const db = new sqlite3.Database(
   process.env.TEST_DATABASE || "./database.sqlite"
);

const getAllArtists = async (req, res) => {
   await db.all(`SELECT * FROM Artist`, (err, data) => {
      err ? res.status(404).send("404 Not Found") : res.status(200).json(data);
   });
};

const createNewArtists = async (req, res) => {
   const { artist } = req.body;

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
};

module.exports = {
   getAllArtists,
   createNewArtists,
};
