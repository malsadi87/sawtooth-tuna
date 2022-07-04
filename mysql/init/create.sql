SET CHARSET UTF8;
DROP DATABASE IF EXISTS demo;
CREATE DATABASE demo DEFAULT CHARACTER SET utf8;

use demo;

SET CHARACTER_SET_CLIENT = utf8;
SET CHARACTER_SET_CONNECTION = utf8;

DROP TABLE IF EXISTS trip;
CREATE TABLE trip(
    TripNo INT NOT NULL,
    TripWithinYearNo INT NOT NULL,
    VesselName VARCHAR(255),
    DepartureDate DATETIME NOT NULL,
    DeparturePort VARCHAR(255) NOT NULL,
    LandingDate DATETIME NOT NULL,
    LandingPort VARCHAR(255) NOT NULL,
    PRIMARY KEY (TripNo)
);

DROP TABLE IF EXISTS haul;
CREATE TABLE haul(
    LaunchDateTime DATETIME NOT NULL,
    LaunchPosition VARCHAR(255) NOT NULL,
    LaunchLatitude DOUBLE NOT NULL,
    LaunchLongitude DOUBLE NOT NULL,
    HaulDateTime DATETIME NOT NULL,
    HaulPosition VARCHAR(255) NOT NULL,
    HaulLatitude DOUBLE NOT NULL,
    HaulLongitude DOUBLE NOT NULL,
    TripNo INT NOT NULL,
    PRIMARY KEY (LaunchDateTime),
    FOREIGN KEY (TripNo) REFERENCES trip(TripNo)
);

DROP TABLE IF EXISTS pallet;
CREATE TABLE pallet(
    PalletNum VARCHAR(255) NOT NULL,
    ProductNum INT NOT NULL,
    SupplierId VARCHAR(255) NOT NULL,
    PalletWeight DOUBLE NOT NULL,
    TripNo INT NOT NULL,
    PRIMARY KEY (PalletNum),
    FOREIGN KEY (TripNo) REFERENCES trip(TripNo)
);

DROP TABLE IF EXISTS pallet_event;
CREATE TABLE pallet_event(
    PalletNum VARCHAR(255) NOT NULL,
    EventTime DATETIME NOT NULL,
    Temperature JSON NOT NULL,
    Location JSON NOT NULL,
    Tilt JSON NOT NULL,
    Shock JSON NOT NULL,
    PRIMARY KEY (PalletNum, EventTime),
    FOREIGN KEY (PalletNum) REFERENCES pallet(PalletNum)
);

DROP TABLE IF EXISTS catch_package;
CREATE TABLE catch_package(
    CatchPackageId VARCHAR(255) NOT NULL,
    PackingDate DATETIME NOT NULL,
    PalletNum VARCHAR(255) NOT NULL,
    PRIMARY KEY (catchPackageId),
    FOREIGN KEY (PalletNum) REFERENCES pallet(PalletNum)
);

DROP TABLE IF EXISTS species_and_weight;
CREATE TABLE species_and_weight(
    SpeciesId INT NOT NULL AUTO_INCREMENT,
    Quantity INT NOT NULL,
    Species INT NOT NULL,
    CatchPackageId VARCHAR(255) NOT NULL,
    LaunchDateTime DATETIME,
    PRIMARY KEY (SpeciesId)
);

DROP TABLE IF EXISTS company ;
CREATE TABLE company(
    CompanyId INT NOT NULL,
    CompanyName VARCHAR(255) NOT NULL,
    CompanyAddress VARCHAR(255) NOT NULL,
    ContactInfo VARCHAR(255) NOT NULL,
    PRIMARY KEY (CompanyId)
);



DROP TABLE IF EXISTS custom_level_package ;
CREATE TABLE custom_level_package(
    ConsumerPackageId VARCHAR(255) NOT NULL,
    CatchPackageId VARCHAR(255) NOT NULL,
    PackingDate DATETIME NOT NULL,
    Agent INT NOT NULL,
    PRIMARY KEY (ConsumerPackageId),
    FOREIGN KEY (CatchPackageId) REFERENCES catch_package(CatchPackageId),
    FOREIGN KEY (Agent) REFERENCES company(CompanyId)
);

GRANT ALL ON demo.* TO 'user';