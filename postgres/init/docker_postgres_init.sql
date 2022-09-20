CREATE TABLE IF NOT EXISTS "Product" (
    "ProductId" INT PRIMARY KEY,
    "ProductName" VARCHAR(255),
    "ProductDescription" VARCHAR(255),
    "ProductNum" INT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Trip" (
    "TripNo" INT PRIMARY KEY,
    "TripWithinYearNo" INT NOT NULL,
    "VesselName" VARCHAR(255),
    "DepartureDate" TIMESTAMP NOT NULL,
    "DeparturePort" VARCHAR(255) NOT NULL,
    "LandingDate" TIMESTAMP NOT NULL,
    "LandingPort" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Haul" (
    "HaulId" SERIAL PRIMARY KEY,
    "LaunchDateTime" TIMESTAMP NOT NULL,
    "LaunchPosition" VARCHAR(255) NOT NULL,
    "LaunchLatitude" NUMERIC(20, 18) NOT NULL,
    "LaunchLongitude" NUMERIC(20, 18) NOT NULL,
    "HaulDateTime" TIMESTAMP NOT NULL,
    "HaulPosition" VARCHAR(255) NOT NULL,
    "HaulLatitude" NUMERIC(20, 18) NOT NULL,
    "HaulLongitude" NUMERIC(20, 18) NOT NULL,
    "TripNo" INT NOT NULL,
    FOREIGN KEY ("TripNo") REFERENCES "Trip"("TripNo") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Pallet" (
    "PalletNum" VARCHAR(255) PRIMARY KEY,
    "ProductNum" INT NOT NULL,
    "SupplierId" VARCHAR(255) NOT NULL,
    "PalletWeight" NUMERIC(9, 4) NOT NULL,
    "TripNo" INT NOT NULL,
    FOREIGN KEY ("TripNo") REFERENCES "Trip"("TripNo") ON DELETE SET DEFAULT
);

CREATE TABLE IF NOT EXISTS "PalletEvent" (
    "EventTime" TIMESTAMP PRIMARY KEY,
    "PalletNum" VARCHAR(255) NOT NULL,
    "Temperature" JSON NOT NULL,
    "Location" JSON NOT NULL,
    "Tilt" JSON NOT NULL,
    "Shock" JSON NOT NULL,
    FOREIGN KEY ("PalletNum") REFERENCES "Pallet"("PalletNum") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "CatchPackage" (
    "CatchPackageId" VARCHAR(255) PRIMARY KEY,
    "PackingDate" TIMESTAMP NOT NULL,
    "PalletNum" VARCHAR(255) NOT NULL,
    FOREIGN KEY ("PalletNum") REFERENCES "Pallet"("PalletNum") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "SpeciesAndWeight" (
    "SpeciesId" SERIAL PRIMARY KEY,
    "Quantity" INT NOT NULL,
    "Species" INT NOT NULL,
    "CatchPackageId" VARCHAR(255) NOT NULL,
    "LaunchDateTime" TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Company" (
    "CompanyId" SERIAL PRIMARY KEY,
    "CompanyName" VARCHAR(255) NOT NULL,
    "CompanyAddress" VARCHAR(255) NOT NULL,
    "ContactInfo" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "CustomLevelPackage" (
    "ConsumerPackageId" VARCHAR(255) PRIMARY KEY,
    "CatchPackageId" VARCHAR(255) NOT NULL,
    "PackingDate" TIMESTAMP NOT NULL,
    "Agent" INT NOT NULL,
    FOREIGN KEY ("CatchPackageId") REFERENCES "CatchPackage"("CatchPackageId") ON DELETE SET DEFAULT,
    FOREIGN KEY ("Agent") REFERENCES "Company"("CompanyId") ON DELETE SET NULL
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "Users" (
  "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "FullName" VARCHAR(2000) NULL,
  "IsActive" BOOLEAN NOT NULL,
  "CreatedDate" TIMESTAMP NOT NULL,
  "CreatedBy" VARCHAR(2000) NULL,
  "UpdatedDate" TIMESTAMP NOT NULL,
  "UpdatedBy" VARCHAR(2000) NULL,
  "UserName" VARCHAR(256) NULL,
  "NormalizedUserName" VARCHAR(256) NULL UNIQUE,
  "Email" VARCHAR(256) NOT NULL UNIQUE,
  "NormalizedEmail" VARCHAR(256) NULL,
  "EmailConfirmed" BOOLEAN NOT NULL,
  "PasswordHash" VARCHAR(2000) NOT NULL,
  "SecurityStamp" VARCHAR(2000) NULL,
  "ConcurrencyStamp" VARCHAR(2000) NULL,
  "PhoneNumber" VARCHAR(2000) NULL,
  "PhoneNumberConfirmed" BOOLEAN NOT NULL,
  "TwoFactorEnabled" BOOLEAN NOT NULL,
  "LockoutEnd" TIMESTAMP NULL,
  "LockoutEnabled" BOOLEAN NOT NULL,
  "AccessFailedCount" INT NOT NULL,
  "BlockchainInfoId" UUID NULL UNIQUE
);
CREATE INDEX "EmailIndex" ON "Users"("NormalizedEmail");

CREATE TABLE IF NOT EXISTS "UsersBlockchainInfo" (
  "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "UserId" UUID NOT NULL UNIQUE,
  "PublicKey" VARCHAR(1000) NOT NULL,
  "PrivateKey" VARCHAR(1000) NOT NULL,
  "CreatedDate" TIMESTAMP NOT NULL,
  "CreatedBy" UUID NOT NULL,
  "UpdatedDate" TIMESTAMP NOT NULL,
  "UpdatedBy" UUID NULL,
  "IsActive" BOOLEAN NOT NULL
);

ALTER TABLE "Users" ADD FOREIGN KEY ("BlockchainInfoId") REFERENCES "UsersBlockchainInfo"("Id") ON DELETE CASCADE ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE "UsersBlockchainInfo" ADD FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION DEFERRABLE INITIALLY DEFERRED;

CREATE TABLE IF NOT EXISTS "Roles" (
  "Id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "Name" VARCHAR(256) NULL,
  "NormalizedName" VARCHAR(256) NULL,
  "ConcurrencyStamp" VARCHAR(4000) NULL,
  UNIQUE ("NormalizedName")
);

CREATE TABLE IF NOT EXISTS "DeviceCodes" (
  "UserCode" VARCHAR(200) PRIMARY KEY,
  "DeviceCode" VARCHAR(200) NULL,
  "SubjectId" VARCHAR(200) NULL,
  "SessionId" VARCHAR(100) NULL,
  "ClientId" VARCHAR(200)  NULL,
  "Description" VARCHAR(200) NULL,
  "CreationTime" TIMESTAMP NOT NULL,
  "Expiration" TIMESTAMP NOT NULL,
  "Data" VARCHAR(4000) NULL,
  UNIQUE ("DeviceCode")
);
CREATE INDEX "IX_DeviceCodes_Expiration" ON "DeviceCodes"("Expiration");

CREATE TABLE IF NOT EXISTS "PersistedGrants" (
  "Key" VARCHAR(256) PRIMARY KEY,
  "Type" VARCHAR(50) NULL,
  "SubjectId" VARCHAR(200) NULL,
  "SessionId" VARCHAR(100) NULL,
  "ClientId" VARCHAR(200) NULL,
  "Description" VARCHAR(200) NULL,
  "CreationTime" TIMESTAMP NOT NULL,
  "Expiration" TIMESTAMP NULL,
  "ConsumedTime" TIMESTAMP NULL,
  "Data" VARCHAR(4000) NULL
);
CREATE INDEX "IX_PersistedGrants_Expiration" ON "PersistedGrants"("Expiration");
CREATE INDEX "IX_PersistedGrants_SubjectId_ClientId_Type" ON "PersistedGrants"("SubjectId" ASC, "ClientId" ASC, "Type" ASC);
CREATE INDEX "IX_PersistedGrants_SubjectId_SessionId_Type" ON "PersistedGrants"("SubjectId" ASC, "SessionId" ASC, "Type" ASC);

CREATE TABLE IF NOT EXISTS "RoleClaims" (
  "Id" SERIAL PRIMARY KEY,
  "RoleId" UUID NULL,
  "ClaimType" VARCHAR(256) NULL,
  "ClaimValue" VARCHAR(512) NULL,
  FOREIGN KEY ("RoleId") REFERENCES "Roles"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
);
CREATE INDEX "IX_AspNetRoleClaims_RoleId" ON "RoleClaims"("RoleId" ASC);

CREATE TABLE IF NOT EXISTS "UserClaims" (
  "Id" SERIAL PRIMARY KEY,
  "UserId" UUID NULL,
  "ClaimType" VARCHAR(4000) NULL,
  "ClaimValue" VARCHAR(4000) NULL,
  FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
);
CREATE INDEX "IX_AspNetUserClaims_UserId" ON "UserClaims"("UserId" ASC);

CREATE TABLE IF NOT EXISTS "UserLogins" (
  "LoginProvider" VARCHAR(128) NOT NULL,
  "ProviderKey" VARCHAR(128) NOT NULL,
  "ProviderDisplayName" VARCHAR(512) NULL,
  "UserId" UUID NULL,
  PRIMARY KEY ("LoginProvider", "ProviderKey"),
  FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
);
CREATE INDEX "IX_AspNetUserLogins_UserId" ON "UserLogins"("UserId" ASC);

CREATE TABLE IF NOT EXISTS "UserRoles" (
  "UserId" UUID NOT NULL,
  "RoleId" UUID NOT NULL,
  PRIMARY KEY ("UserId", "RoleId"),
  FOREIGN KEY ("RoleId") REFERENCES "Roles"("Id") ON DELETE CASCADE ON UPDATE NO ACTION,
  FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
);
CREATE INDEX "IX_AspNetUserRoles_RoleId" ON "UserRoles"("RoleId" ASC);

CREATE TABLE IF NOT EXISTS "UserTokens" (
  "UserId" UUID NOT NULL,
  "LoginProvider" VARCHAR(128) NOT NULL,
  "Name" VARCHAR(128) NOT NULL,
  "Value" VARCHAR(512) NULL,
  PRIMARY KEY ("UserId", "LoginProvider", "Name"),
  FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS "ExternalAPIDetails" (
  "Id" SERIAL PRIMARY KEY,
  "UserName" VARCHAR(512) NULL,
  "Password" VARCHAR(4000) NULL,
  "Provider" SMALLINT NOT NULL,
  "TokenUrl" VARCHAR(512) NULL,
  "AccessToken" VARCHAR(512) NULL,
  "RefreshToken" VARCHAR(1000) NULL,
  "IssueAt" TIMESTAMP NOT NULL,
  "ExpiresAt" TIMESTAMP NOT NULL,
  "Created" TIMESTAMP NOT NULL,
  "CreatedBy" VARCHAR(512) NULL,
  "LastModified" TIMESTAMP NULL,
  "LastModifiedBy" VARCHAR(512) NULL
);

CREATE TABLE IF NOT EXISTS "ExternalAPISettings" (
  "Id" SERIAL PRIMARY KEY,
  "ClientId" VARCHAR(512) NULL,
  "ClientSecret" VARCHAR(512) NULL,
  "OAuthAuthorizationURL" VARCHAR(512) NULL,
  "OAuthTokenURL" VARCHAR(512) NULL,
  "RedirectionURL" VARCHAR(512) NULL,
  "Provider" SMALLINT NOT NULL,
  "Created" TIMESTAMP NOT NULL,
  "CreatedBy" VARCHAR(512) NULL,
  "LastModified" TIMESTAMP NULL,
  "LastModifiedBy" VARCHAR(512) NULL
);
