import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DBCONECTIONCARDS });

db.query(`CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    catagory VARCHAR(20),
    cardName VARCHAR(20),
    cardImage TEXT,
    value int
    );
    
    INSERT INTO cards (catagory, cardName, cardImage, value) VALUES
    ('Planets', 'Mercury', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/290px-Mercury_in_true_color.jpg', 1),
    ('Planets', 'Venus', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Venus_-_December_23_2016.png/600px-Venus_-_December_23_2016.png', 2),
    ('Planets', 'Mars', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Mars_Valles_Marineris.jpeg/220px-Mars_Valles_Marineris.jpeg', 3),
    ('Planets', 'Jupiter', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Jupiter_New_Horizons.jpg/290px-Jupiter_New_Horizons.jpg', 4),
    ('Planets', 'Saturn', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/300px-Saturn_during_Equinox.jpg', 5),
    ('Planets', 'Uranus', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Uranus_clouds.jpg/170px-Uranus_clouds.jpg', 6)
    

    CREATE TABLE IF NOT EXISTS leaderboard (
        id SERIAL PRIMARY KEY,
        userName VARCHAR(3),
        timeMin INT,
        timeSec INT NOT NULL
      );
      
      INSERT INTO leaderboard (userName, timeMin, timeSec) VALUES
      ('JMS', '0', '30'),
      ('KS', '1', '00'),
      ('JW', '1', '05'),
      ('JMK', '2', '35')`);
