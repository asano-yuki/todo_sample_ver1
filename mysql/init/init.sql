CREATE DATABASE IF NOT EXISTS Todo_Sample_Ver1;
USE Todo_Sample_Ver1;
CREATE TABLE IF NOT EXISTS Todos (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20) NOT NULL);
TRUNCATE TABLE Todos;
INSERT INTO Todos (name) VALUES ('Todo1'), ('Todo2'), ('Todo3');