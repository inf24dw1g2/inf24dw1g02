DROP TABLE IF EXISTS users, workouts, progress, meal_plans;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    goal VARCHAR(255)
);

INSERT INTO users (name, age, height, weight, goal) VALUES
('João Silva', 25, 175.0, 70.0, 'Gain muscle mass'),
('Maria Oliveira', 28, 160.5, 55.0, 'Lose weight'),
('Carlos Santos', 30, 180.0, 82.0, 'Improve endurance'),
('Ana Costa', 23, 165.0, 58.0, 'Muscle definition'),
('Miguel Pereira', 27, 178.0, 75.0, 'Increase strength'),
('Rafaela Lima', 26, 162.0, 52.0, 'Body toning'),
('Pedro Rocha', 29, 182.0, 78.0, 'Get in shape'),
('Beatriz Nunes', 24, 167.0, 59.0, 'Lose fat'),
('Guilherme Mendes', 31, 185.0, 85.0, 'Develop endurance'),
('Camila Fernandes', 30, 170.0, 62.0, 'Adjust body composition'),
('Rodrigo Alves', 26, 174.5, 74.0, 'Muscle gain'),
('Larissa Correia', 27, 164.0, 57.0, 'Fat loss'),
('Lucas Martins', 32, 177.0, 81.0, 'Improve performance'),
('Juliana Ribeiro', 28, 169.0, 65.0, 'Improve diet'),
('Fernando Duarte', 29, 180.0, 80.0, 'Get stronger'),
('Paula Souza', 30, 162.5, 60.0, 'Tone body'),
('Roberto Almeida', 29, 179.0, 72.0, 'Muscle mass increase'),
('Clara Pinto', 25, 168.0, 58.5, 'Body composition improvement'),
('Renato Barbosa', 28, 185.0, 85.0, 'Increase strength'),
('Fernanda Oliveira', 27, 174.0, 63.5, 'Endurance training'),
('Igor Santos', 32, 180.0, 79.5, 'Weight loss'),
('Tatiane Costa', 31, 162.0, 54.0, 'Increase muscle endurance'),
('Marcelo Lopes', 26, 173.5, 70.0, 'Improve flexibility'),
('Fabiana Almeida', 29, 160.0, 58.0, 'Fat loss'),
('Jonas Martins', 24, 178.0, 80.0, 'Strength gain'),
('Sofia Oliveira', 30, 167.0, 62.0, 'Build muscle'),
('Ricardo Pereira', 28, 180.0, 83.0, 'Endurance training'),
('Lúcia Souza', 27, 165.0, 59.5, 'Lose weight');

CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type VARCHAR(100),
    exercise VARCHAR(100),
    sets INT,
    reps INT,
    weight DECIMAL(5,2),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO workouts (user_id, type, exercise, sets, reps, weight)
SELECT id, 
    CASE FLOOR(RAND()*3) 
        WHEN 0 THEN 'Strength'
        WHEN 1 THEN 'Endurance'
        ELSE 'Hypertrophy'
    END,
    CASE FLOOR(RAND()*6)
        WHEN 0 THEN 'Bench Press'
        WHEN 1 THEN 'Squat'
        WHEN 2 THEN 'Deadlift'
        WHEN 3 THEN 'Shoulder Press'
        WHEN 4 THEN 'Bent-over Row'
        ELSE 'Bicep Curl'
    END,
    3 + FLOOR(RAND()*2),  
    8 + FLOOR(RAND()*4),  
    20 + FLOOR(RAND()*50) 
FROM users ORDER BY RAND() LIMIT 30;

CREATE TABLE progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    date DATE,
    weight DECIMAL(5,2),
    chest DECIMAL(5,2),
    arms DECIMAL(5,2),
    legs DECIMAL(5,2),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO progress (user_id, date, weight, chest, arms, legs)
SELECT id, CURDATE(), weight + FLOOR(RAND()*5), 90 + FLOOR(RAND()*6), 35 + FLOOR(RAND()*3), 60 + FLOOR(RAND()*5) 
FROM users ORDER BY RAND() LIMIT 30;

CREATE TABLE meal_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    date DATE,
    calories INT,
    protein DECIMAL(5,2),
    carbs DECIMAL(5,2),
    fats DECIMAL(5,2),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO meal_plans (user_id, date, calories, protein, carbs, fats)
SELECT id, CURDATE(),
    1800 + FLOOR(RAND()*700),  
    100 + FLOOR(RAND()*50), 
    200 + FLOOR(RAND()*70),   
    50 + FLOOR(RAND()*30)   
FROM users ORDER BY RAND() LIMIT 30;
