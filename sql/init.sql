SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema appointmentsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `appointmentsdb` DEFAULT CHARACTER SET utf8 ;
USE `appointmentsdb` ;

-- -----------------------------------------------------
-- Table `appointmentsdb`.`Patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appointmentsdb`.`Patient` (
  `patientID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `dateOfBirth` DATE NOT NULL,
  `phoneNumber` VARCHAR(45) NOT NULL,
  `insuranceProvider` VARCHAR(45) NULL,
  `policyNumber` VARCHAR(45) NULL,
  PRIMARY KEY (`patientID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `appointmentsdb`.`Address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appointmentsdb`.`Address` (
  `patientID` INT NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `apt` VARCHAR(45) NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `zipcode` VARCHAR(45) NOT NULL,
  INDEX `fk_Address_Patient_idx` (`patientID` ASC) VISIBLE,
  PRIMARY KEY (`patientID`),
  CONSTRAINT `fk_Address_Patient`
    FOREIGN KEY (`patientID`)
    REFERENCES `appointmentsdb`.`Patient` (`patientID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `appointmentsdb`.`Doctor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appointmentsdb`.`Doctor` (
  `doctorID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `dateofBirth` DATE NOT NULL,
  `specialty` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`doctorID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `appointmentsdb`.`Appointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appointmentsdb`.`Appointment` (
  `appointmentID` INT NOT NULL AUTO_INCREMENT,
  `doctorID` INT NOT NULL,
  `patientID` INT NULL,
  `date` DATE NOT NULL,
  `startTime` TIME NOT NULL,
  `endTime` TIME NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`appointmentID`),
  INDEX `fk_Appointment_Doctor1_idx` (`doctorID` ASC) VISIBLE,
  INDEX `fk_Appointment_Patient1_idx` (`patientID` ASC) VISIBLE,
  CONSTRAINT `fk_Appointment_Doctor1`
    FOREIGN KEY (`doctorID`)
    REFERENCES `appointmentsdb`.`Doctor` (`doctorID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Appointment_Patient1`
    FOREIGN KEY (`patientID`)
    REFERENCES `appointmentsdb`.`Patient` (`patientID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `appointmentsdb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appointmentsdb`.`User` (
  userID INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  passwordHash VARBINARY(64) NOT NULL,
  passwordSalt VARBINARY(32) NOT NULL,
  userType VARCHAR(45) NOT NULL,
  patientID INT NULL,
  PRIMARY KEY (userID),
  INDEX fk_User_Patient1_idx (patientID ASC) VISIBLE,
  CONSTRAINT fk_User_Patient1
    FOREIGN KEY (patientID)
    REFERENCES appointmentsdb.Patient (patientID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
Use appointmentsdb;


INSERT INTO Doctor(name, dateofBirth, specialty)
	VALUES
    ("Adams Thampson", "1973-03-03", "Oncologist"),
    ("Bill Gato", "1975-05-21", "Endocrinologist"),
    ("Charlie Sam", "1970-01-15", "Nephrologist"),
    ("Daniel Cruz", "1984-03-12", "Cardiologist"),
    ("David Zarner", "1978-12-02", "Neurologist"),
    ("Donald Hannoun", "1970-11-19", "Urologist"),
    ("Erik Lum", "1981-04-04", "Nephrologist"),
    ("Ernest Agatstein", "1965-02-23", "Urologist"),
    ("George Abdelsayed", "1971-07-12", "Urologist"),
    ("Gregg Fonarow", "1980-11-13", "Cardiologist"),
    ("Henry Honda", "1982-02-02", "Cardiologist"),
    ("Iman Abdalla", "1962-09-02", "Oncologist"),
    ("Jay Butler", "1970-03-20", "Nephrologist"),
    ("Jessica James", "1965-03-09", "Cardiologist"),
    ("Jose Suarez", "1977-10-07", "Cardiologist"),
    ("Linda Warner", "1969-01-03", "Oncologist"),
    ("Melina Smith", "1980-08-12", "Endocrinologist"),
    ("Michael Hyman", "1962-03-06", "Urologist"),
    ("Michelle Randolph", "1977-02-10", "Cardiologist"),
    ("Robert Dorf", "1980-01-01", "Oncologist"),
    ("Robert Siegel", "1964-06-18", "Cardiologist"),
    ("Richard Zajac", "1970-11-18", "Oncologist"),
    ("Samuel Chung", "1980-10-09", "Oncologist"),
    ("Sharon Adler", "1966-06-21", "Nephrologist"),
    ("Siamak Daneshmand", "1968-09-17", "Urologist")
;

INSERT INTO Patient(name, dateOfBirth, phoneNumber, insuranceProvider, policyNumber)
	VALUES
    ("Anna Rodriguez", "1977-07-14", "122-222-3636", "Blue Cross", "B110220"),
    ("Annie Williams", "1958-01-26", "222-235-2626", "Blue Cross", "B111111"),
    ("Anet Brown", "1960-02-12", "212-510-10100", "Cigna", "C101230"),
    ("Bob Johnson", "1990-11-30", "222-333-4444", "Cigna", "C246810"),
    ("Bruce Jackson", "1953-11-12", "111-123-3214", "Blue Cross", "B101213"),
    ("Eric Castleman", "1989-07-18", "123-555-5151", "Cigna", "C112211"),
    ("Elena Garcia", "1962-04-05", "424-444-1112", "Medical", "M202201"),
    ("Florian Rader", "1990-02-04", "122-555-5157", "Kaiser", "K155123"),
    ("Jack Smith", "1991-06-20", "424-111-1441", "Blue Cross", "B023456"),
    ("Jane Smith", "1972-05-13", "555-555-5555", "Blue Cross", "B987654"),
    ("Jeniffer Goodman", "1951-09-28", "555-848-8191", "Medical", "M812345"),
    ("Jessie Hernandez", "1987-07-17", "551-626-1010", "Cigna", "C222323"),
    ("Jhon Davis", "1968-08-22", "111-818-8152", "Kaiser", "K098915"),
    ("John Doe", "1985-01-01", "123-456-7890", "Aetna", "A123456"),
    ("Lia Muler", "1988-12-15", "123-505-5050", "Aetna", "A808915"),
    ("Lina Right", "1988-12-15", "818-222-2221", "Aetna", "A111113"),
    ("Lucy Adams", "1985-02-02", "818-212-7878", "Medical", "M125689"),
    ("Mark Urman", "1957-07-07", "424-515-5252", "Kaiser", "K012341"),
    ("Matthew Budoff", "1966-05-15", "213-213-2124", "Medical", "M111234"),
    ("Michele Hamilton", "1950-10-22", "818-919-9191", "Kaiser", "K212356"),
    ("Mehran Khorsandi", "1980-10-19", "818-111-1111", "Aetna", "A222333"),
    ("Philip Adams", "1960-01-12", "213-888-8188", "Medical", "M333123"),
    ("Richard Wright", "1955-06-16", "213-889-8447", "Blue Cross", "B221212"),
    ("Sam Williams", "1977-08-19", "424-999-9191", "Aetna", "A021222"),
    ("Steve Park", "1964-05-05", "213-717-7117", "Cigna", "C333515")  
;

INSERT INTO Address(patientID, street, apt, city, state, zipcode)
	VALUES
    (1, "123 Main St", NULL, "Anytown", "CA", "12345"),
    (2, "456 Park Ave", "Apt 101", "Smallville", "CA", "67890"),
    (3, "789 Elm St", NULL, "Big City", "CA", "54321"),
    (4, "722 West Elm St", NULL, "Glendale", "CA", "91202"),
    (5, "111 Allen Ave", NULL, "Sun Valley", "CA", "91222"),
    (6, "4500 West Adams St", "Apt 46", "Van Nuys", "CA", "91402"),
    (7, "220 Alameda Ave", NULL, "Glendale", "CA", "91206"),
    (8, "1000 West Glenoaks Blvd", NULL, "Burbank", "CA", "91808"),
    (9, "800 North Central Ave", "Apt 404", "Los Angeles", "CA", "91202"),
    (10, "502 West Woodworth Ave", "Apt 101", "Los Angeles", "CA", "91001"),
    (11, "1100 Pacific Ave", "Apt 2", "Pacadena", "CA", "91602"),
    (12, "820 North Jackson St", NULL, "Pomona", "CA", "91209"),
    (13, "924 Paradise Ave", "Apt 12", "Van Nuys", "CA", "91403"),
    (14, "9000 Alameda Ave", "Apt 1", "Los angeles", "CA", "91001"),
    (15, "1200 West Wilson Ave", NULL, "Pasadena", "CA", "91802"),
    (16, "9251 Adams St", "Apt 200", "Pomona", "CA", "91505"),
    (17, "1001 William Ave", NULL, "Burbank", "CA", "91405"),
    (18, "4560 Anthony Blvd", NULL, "Los Angeles", "CA", "91588"),
    (19, "500 West White St", "Apt 302", "Van Nuys", "CA", "91851"),
    (20, "502 Elk St", NULL, "Panorama City", "CA", "91304"),
    (21, "402 Chess St", "Apt 22", "Glendale", "CA", "91206"),
    (22, "560 Brand Blvd", NULL, "Los Angeles", "CA", "92351"),
    (23, "300 North Verdugo Ave", "Apt 405", "Panorama City", "CA", "92562"),
    (24, "1001 East California Ave", NULL, "Arcadia", "CA", "91505"),
    (25, "727 Beverly Hills Blvd", NULL, "Los Angeles", "CA", "91606")
;


INSERT INTO Appointment(doctorID, patientID, date, startTime, endTime, status)
VALUES
    (1, 1, "2023-05-09", "08:00:00", "08:30:00", "scheduled"),
    (2, 1, "2023-05-10", "08:30:00", "09:00:00", "scheduled"),
    (3, 1, "2023-05-11", "09:00:00", "09:30:00", "scheduled"),
    (1, 2, "2023-05-12", "09:30:00", "10:00:00", "scheduled"),
    (2, 2, "2023-05-13", "10:00:00", "10:30:00", "scheduled"),
    (3, 2, "2023-05-14", "10:30:00", "11:00:00", "scheduled"),
    (1, 3, "2023-05-15", "11:00:00", "11:30:00", "scheduled"),
    (2, 3, "2023-05-16", "11:30:00", "12:00:00", "scheduled"),
    (3, 3, "2023-05-17", "12:00:00", "12:30:00", "scheduled");

INSERT INTO appointmentsdb.User (email, passwordHash, passwordSalt, userType, patientID) VALUES
  ('clerk@hospital.com', 
  UNHEX('6c4f41c0f79f7d018087c335d82c9e4133d6df79531d4fece4ea4a71700148ec5425d00734959dfea70bc0b00a6bdc299340a8c6d845a7261dc34f4a3b41aba5'), 
  UNHEX('f33f81d480872fe6f0888fc0ee094d3e771365eec133476c7d2f58a769c7bbab'), 
  'clerk', 
  NULL
  ),
  ('user@hospital.com', 
  UNHEX('c571304efbf9ef7128c2297bd05ccfb20571209823555f86ed6c33be96468a940ded36521e58775b6248ecc793cdd7974ca431d9067085bc53e4a6090bcec53b'), 
  UNHEX('878c225be258f0e47bcd74e5231eb4931258cbdabb0cab0410e62fa1ad85d40e'), 
  'patient', 
  1
);

SET GLOBAL event_scheduler = ON;

DELIMITER //
CREATE EVENT update_appointments_status
ON SCHEDULE EVERY 1 MINUTE
DO
BEGIN
  UPDATE Appointment
  SET status = 'unavailable'
  WHERE status != 'unavailable'
  AND date <= CURRENT_DATE()
  AND startTime < CURRENT_TIME();
END //
DELIMITER ;

INSERT INTO Appointment(doctorID, date, startTime, endTime, status)
	VALUES
    (1, "2023-05-05","12:30:00", "13:00:00", "available")
;


-- Drop existing procedure if it exists
DROP PROCEDURE IF EXISTS generateAppointments;
DELIMITER //
CREATE PROCEDURE generateAppointments()
BEGIN
  -- Declare variables
  DECLARE baseDate DATE DEFAULT '2023-05-09'; -- Starting date
  DECLARE currentDate DATE;
  DECLARE currentDoctorID INT DEFAULT 1;
  DECLARE appointmentStartTime TIME;
  DECLARE appointmentsPerDay INT;
  DECLARE appointmentMinuteOffset INT;
  DECLARE workingDaysPerWeek INT;
  DECLARE dayOfWeek INT;

  -- Loop through each week until the end of June
  WHILE baseDate <= '2023-06-30' DO
    -- Set the current date to the base date for each doctor
    SET currentDate = baseDate;

    -- Loop through doctors with IDs from 1 to 25
    WHILE currentDoctorID <= 25 DO
      -- Reset working days per week counter for each doctor
      SET workingDaysPerWeek = 0;

      -- Loop through days of the week to ensure 5 working days per week
      WHILE workingDaysPerWeek < 5 DO
        -- Get the day of the week (1 = Sunday, 2 = Monday, ..., 7 = Saturday)
        SET dayOfWeek = DAYOFWEEK(currentDate);

        -- Check if the current day is not Saturday or Sunday
        IF dayOfWeek < 6 THEN
          -- Randomly set the number of appointments per day between 3 and 6
          SET appointmentsPerDay = FLOOR(3 + RAND() * 4);

          -- Loop to create appointments for the current day
          WHILE appointmentsPerDay > 0 DO
            -- Randomly set appointment start minute (00, 15, or 30)
            SET appointmentMinuteOffset = FLOOR(RAND() * 3) * 15;
            -- Randomly set appointment start time between 8:00 AM and 8:00 PM
            SET appointmentStartTime = MAKETIME(8 + FLOOR(RAND() * 12), appointmentMinuteOffset, 0);

            -- Check for overlapping appointments
            IF NOT EXISTS (SELECT 1 FROM Appointment WHERE doctorID = currentDoctorID AND date = currentDate AND (TIME_TO_SEC(appointmentStartTime) BETWEEN TIME_TO_SEC(startTime) AND TIME_TO_SEC(endTime) OR TIME_TO_SEC(ADDTIME(appointmentStartTime, '00:30:00')) BETWEEN TIME_TO_SEC(startTime) AND TIME_TO_SEC(endTime))) THEN
              -- Insert non-overlapping appointment into the database
              INSERT INTO Appointment(doctorID, date, startTime, endTime, status)
              VALUES
                (currentDoctorID, currentDate, appointmentStartTime, ADDTIME(appointmentStartTime, '00:30:00'), 'available');

              -- Decrease the number of appointments left to schedule for the day
              SET appointmentsPerDay = appointmentsPerDay - 1;
            END IF;
          END WHILE;

          -- Increment the working day counter for the current doctor
          SET workingDaysPerWeek = workingDaysPerWeek + 1;
        END IF;

        -- Move to the next day
        SET currentDate = DATE_ADD(currentDate, INTERVAL 1 DAY);
      END WHILE;

      -- Reset the current date to the base date and move to the next doctor
      SET currentDate = baseDate;
      SET currentDoctorID = currentDoctorID + 1;
    END WHILE;

    -- Reset doctorID and move to the next week (start of the loop)
    SET currentDoctorID = 1;
    SET baseDate = DATE_ADD(baseDate, INTERVAL 7 DAY);
  END WHILE;
END;
//
DELIMITER ;

CALL generateAppointments();
