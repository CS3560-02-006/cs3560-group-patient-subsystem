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
  `userID` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `userType` VARCHAR(45) NOT NULL,
  `patientID` INT NULL,
  PRIMARY KEY (`userID`),
  INDEX `fk_User_Patient1_idx` (`patientID` ASC) VISIBLE,
  CONSTRAINT `fk_User_Patient1`
    FOREIGN KEY (`patientID`)
    REFERENCES `appointmentsdb`.`Patient` (`patientID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
Use appointmentsdb;


INSERT INTO Doctor(name, dateofBirth, specialty)
	VALUES
    ("Robert Dorf", "1980-01-01", "Oncologist"),
    ("Jessica James", "1965-03-09", "Cardiologist"),
    ("Bill Gato", "1975-05-21", "Endocrinologist")
;

INSERT INTO Patient(name, dateOfBirth, phoneNumber, insuranceProvider, policyNumber)
	VALUES
    ("John Doe", "1985-01-01", "123-456-7890", "Aetna", "A123456"),
    ("Jane Smith", "1972-05-13", "555-555-5555", "Blue Cross", "B987654"),
    ("Bob Johnson", "1990-11-30", "222-333-4444", "Cigna", "C246810")
;

INSERT INTO Address(patientID, street, apt, city, state, zipcode)
	VALUES
    (1, "123 Main St", NULL, "Anytown", "CA", "12345"),
    (2, "456 Park Ave", "Apt 101", "Smallville", "NY", "67890"),
    (3, "789 Elm St", NULL, "Big City", "IL", "54321")
;

INSERT INTO Appointment(doctorID, date, startTime, endTime, status)
	VALUES
    (1, "2023-05-09","12:30:00", "13:00:00", "available"),
    (1, "2023-05-10","13:30:00", "14:00:00", "available"),
    (2, "2023-05-10","11:00:00", "11:30:00", "available"),
    (2, "2023-05-11","9:30:00", "10:00:00", "available"),
    (3, "2023-05-13","15:30:00", "16:00:00", "available"),
    (3, "2023-05-12","16:00:00", "16:30:00", "available")
;