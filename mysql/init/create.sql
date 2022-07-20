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
    EventTime DATETIME NOT NULL,
    PalletNum VARCHAR(255) NOT NULL,
    Temperature JSON NOT NULL,
    Location JSON NOT NULL,
    Tilt JSON NOT NULL,
    Shock JSON NOT NULL,
    PRIMARY KEY (EventTime),
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

CREATE TABLE IF NOT EXISTS Roles (
  Id VARCHAR(450) NOT NULL,
  Name VARCHAR(256) NULL,
  NormalizedName VARCHAR(256) NULL,
  ConcurrencyStamp NVARCHAR(4000) NULL,
  PRIMARY KEY (Id),
  UNIQUE INDEX RoleNameIndex (NormalizedName)
);

CREATE TABLE IF NOT EXISTS Users (
  Id VARCHAR(450) NOT NULL,
  FullName NVARCHAR(2000) NULL,
  IsActive BOOLEAN NOT NULL,
  CreatedDate DATETIME NOT NULL,
  CreatedBy NVARCHAR(2000) NULL,
  UpdatedDate DATETIME NOT NULL,
  UpdatedBy NVARCHAR(2000) NULL,
  UserName VARCHAR(256) NULL,
  NormalizedUserName VARCHAR(256) NULL,
  Email VARCHAR(256) NULL,
  NormalizedEmail VARCHAR(256) NULL,
  EmailConfirmed BOOLEAN NOT NULL,
  PasswordHash NVARCHAR(2000) NULL,
  SecurityStamp NVARCHAR(2000) NULL,
  ConcurrencyStamp NVARCHAR(2000) NULL,
  PhoneNumber NVARCHAR(2000) NULL,
  PhoneNumberConfirmed BOOLEAN NOT NULL,
  TwoFactorEnabled BOOLEAN NOT NULL,
  LockoutEnd DATETIME NULL,
  LockoutEnabled BOOLEAN NOT NULL,
  AccessFailedCount INT NOT NULL,
  PRIMARY KEY (Id),
  INDEX `EmailIndex` (NormalizedEmail),
  UNIQUE INDEX `UserNameIndex` (NormalizedUserName)
);

CREATE TABLE IF NOT EXISTS DeviceCodes (
  UserCode VARCHAR(200) NOT NULL,
  DeviceCode VARCHAR(200) NULL,
  SubjectId VARCHAR(200) NULL,
  SessionId VARCHAR(100) NULL,
  ClientId VARCHAR(200)  NULL,
  Description VARCHAR(200) NULL,
  CreationTime DATETIME NOT NULL,
  Expiration DATETIME NOT NULL,
  Data NVARCHAR(4000) NULL,
  PRIMARY KEY (UserCode),
  UNIQUE INDEX `IX_DeviceCodes_DeviceCode` (DeviceCode),
  INDEX `IX_DeviceCodes_Expiration` (Expiration)
);

CREATE TABLE IF NOT EXISTS PersistedGrants (
  `Key` VARCHAR(256) NOT NULL,
  Type VARCHAR(50) NULL,
  SubjectId VARCHAR(200) NULL,
  SessionId VARCHAR(100) NULL,
  ClientId VARCHAR(200) NULL,
  Description VARCHAR(200) NULL,
  CreationTime DATETIME NOT NULL,
  Expiration DATETIME NULL,
  ConsumedTime DATETIME NULL,
  Data NVARCHAR(4000) NULL,
  PRIMARY KEY (`Key`),
  INDEX `IX_PersistedGrants_Expiration` (Expiration),
  INDEX `IX_PersistedGrants_SubjectId_ClientId_Type` (SubjectId ASC, ClientId ASC, Type ASC),
  INDEX `IX_PersistedGrants_SubjectId_SessionId_Type` (SubjectId ASC, SessionId ASC, Type ASC)
);

CREATE TABLE IF NOT EXISTS RoleClaims (
  Id INT NOT NULL,
  RoleId VARCHAR(450) NULL,
  ClaimType VARCHAR(256) NULL,
  ClaimValue VARCHAR(512) NULL,
  PRIMARY KEY (Id),
  INDEX `IX_AspNetRoleClaims_RoleId` (RoleId ASC),
  FOREIGN KEY (RoleId) REFERENCES Roles(Id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS UserClaims (
  Id INT NOT NULL,
  UserId VARCHAR(450) NULL,
  ClaimType VARCHAR(4000) NULL,
  ClaimValue VARCHAR(4000) NULL,
  PRIMARY KEY (Id),
  INDEX `IX_AspNetUserClaims_UserId` (UserId ASC),
  FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS UserLogins (
  LoginProvider VARCHAR(128) NOT NULL,
  ProviderKey VARCHAR(128) NOT NULL,
  ProviderDisplayName VARCHAR(512) NULL,
  UserId VARCHAR(450) NULL,
  PRIMARY KEY (LoginProvider, ProviderKey),
  INDEX `IX_AspNetUserLogins_UserId` (UserId ASC),
  FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS UserRoles (
  UserId VARCHAR(450) NOT NULL,
  RoleId VARCHAR(450) NOT NULL,
  PRIMARY KEY (UserId, RoleId),
  INDEX `IX_AspNetUserRoles_RoleId` (RoleId ASC),
  FOREIGN KEY (RoleId) REFERENCES Roles(Id) ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS UserTokens (
  UserId VARCHAR(450) NOT NULL,
  LoginProvider VARCHAR(128) NOT NULL,
  `Name` VARCHAR(128) NOT NULL,
  `Value` VARCHAR(512) NULL,
  PRIMARY KEY (UserId, LoginProvider, `Name`),
  FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS ExternalAPIDetails (
  Id BIGINT NOT NULL,
  UserName VARCHAR(512) NULL,
  `Password` VARCHAR(4000) NULL,
  `Provider` SMALLINT NOT NULL,
  TokenUrl VARCHAR(512) NULL,
  AccessToken VARCHAR(512) NULL,
  RefreshToken VARCHAR(1000) NULL,
  IssueAt DATETIME NOT NULL,
  ExpiresAt DATETIME NOT NULL,
  Created DATETIME NOT NULL,
  CreatedBy VARCHAR(512) NULL,
  LastModified DATETIME NULL,
  LastModifiedBy VARCHAR(512) NULL,
  PRIMARY KEY (Id)
);

CREATE TABLE IF NOT EXISTS ExternalAPISettings (
  Id BIGINT NOT NULL,
  ClientId VARCHAR(512) NULL,
  ClientSecret VARCHAR(512) NULL,
  OAuthAuthorizationURL VARCHAR(512) NULL,
  OAuthTokenURL VARCHAR(512) NULL,
  RedirectionURL VARCHAR(512) NULL,
  `Provider` SMALLINT NOT NULL,
  Created DATETIME NOT NULL,
  CreatedBy VARCHAR(512) NULL,
  LastModified DATETIME NULL,
  LastModifiedBy VARCHAR(512) NULL,
  PRIMARY KEY (Id)
);


GRANT ALL ON demo.* TO 'user';