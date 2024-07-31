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
    ('Planets', 'Mercury', 'https://pixabay.com/get/gec3a47317064c36ad4482defa69b41b898aa66943a74cadd5c57edf73f9758021b9f8f6d73ae8440d12db5358620a0551e9bf19c8ccc207741f8ea81a2b2578da1437e8fea4f8dbdbf756adb0a230c8d_640.jpg', 1),
    ('Planets', 'Venus', 'https://pixabay.com/get/g02110e74f46585935cbd289e08f2c89862d129647fbb7a71dca569c15ba6c59f44103d174e6210263a8c812b1903eaedbe94745ca9cce77773c367abcc518f8a1203dc196e9c049e7eb406e410926c81_640.jpg', 2),
    ('Planets', 'Mars', 'https://pixabay.com/get/g75082e8dca6d780c6f17fd51c1073d0227677b376f2602c4759115adc5ac8db1ee80124a96ffdeb6dc1914c5118d79b1bd86f6aea265b94a877fb872ad804c6779915eb192a61e76f77d3a1d95d2320c_640.jpg', 3),
    ('Planets', 'Jupiter', 'https://pixabay.com/get/g6c036239b8b820a2ede6c634d411a612242b548f206b9935524347c33c120949dcb8dc2f6257db95f5311ff1c32518d761ef37b2a1d0203f2cadd01833ffa3d70ad82a27bd162e61505c2641206fa62e_640.jpg', 4),
    ('Planets', 'Saturn', 'https://pixabay.com/get/gbaba72e81465ec9e520bb0e5f376a0638fc3868bc1cc5ada1471015793fbc41427c53c68189bcddda20c89f2a56f4264cc96d7ee410c0d36de7dd5ea5eb116a86dcdd5a651b815e6fefec982d1d480e7_640.jpg', 5),
    ('Planets', 'Uranus', 'https://pixabay.com/get/g27dde473659d510f91f56fe97e51bf0b241787dc4effe0aa825487e9507018e265778592d567c1c3a3d483f18d805d24eafe9242fcc9a39c108316e7f29dae0f5e5d15be5dada186870cc26ab166f47d_640.jpg', 6)
    

    CREATE TABLE IF NOT EXISTS leaderboard (
        id SERIAL PRIMARY KEY,
        userName VARCHAR(3),
        timeMin INT,
        timeSec INT
      );
      
      INSERT INTO leaderboard (userName, timeMin, timeSec) VALUES
      ('JMS', '0', '30'),
      ('KS', '1', '00'),
      ('JW', '1', '05'),
      ('JMK', '2', '35')`);
