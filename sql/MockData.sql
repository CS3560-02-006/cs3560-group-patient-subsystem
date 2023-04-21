Use appointmentsdb;

TRUNCATE TABLE Doctor;
TRUNCATE TABLE Appointment;

INSERT INTO Doctor(name, dateofBirth, specialty)
	VALUES
    ("Robert Dorf", "1980-01-01", "Oncologist"),
    ("Jessica James", "1965-03-09", "Cardiologist"),
    ("Bill Gato", "1975-05-21", "Endocrinologist")
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


-- Select * from Doctor;
-- select * from Appointment;