CREATE DATABASE cityhub;
USE cityhub;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE vendors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150),
    type VARCHAR(50),
    rating DECIMAL(2,1),
    phone VARCHAR(15),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    vendor_id INT,
    booking_date DATETIME,
    status VARCHAR(50) DEFAULT 'pending',

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);
select * from users;