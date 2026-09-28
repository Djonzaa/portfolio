# Resource Name

> Premium Djonza Development resource.

## Overview

Describe the resource here.

## Features

- Dashboard
- Citizens interaction
- Vehicles interaction
- Create a report
- Evidence storage system
- Integrated dispatch system
- Licence management
- Officer permissions
- Patrol status
- Badge status
- Intergrated badge system
- Police panic button
- Control center
- Integrated GPS system
- Integrated fines system
- In-game logs
- Discord logs
- 

## Requirements

| Requirement | Version |
|---|---|
| FiveM | Latest recommended |
| Framework | Qbox / compatible |
| Dependency | ox_lib |

## Installation

### 1. Download

Download the resource from the official Djonza Development store.

### 2. Install

Place the resource inside your server resources folder.

### 3. Database

Add required SQL files, if applicable.

### 4. Start the resource

Add the resource to your `server.cfg`:

```cfg
ensure resource_name
```

## Configuration

Explain the available configuration options.

```lua
Config = {}

Config.RequireMDTItem = true
Config.MDTItem = 'policemdt'
Config.OpenCommand = 'mdt'
Config.OpenKey = 'F6'
Config.RequireDuty = true
Config.AdminMinGrade = 4
Config.DefaultPatrolCapacity = 4
Config.MaxPatrolCapacity = 8

```

```lua 
Config.AllowedJobs = {
    police = true,
    sheriff = true
}

```

```lua 
Config.Permissions = {
    createPatrol = 0,
    joinPatrol = 0,
    leavePatrol = 0,
    editOwnPatrol = 0,
    removePatrolMember = 1,
    editAllPatrols = 4,
    manageBadges = 4,
    manageOfficerDepartments = 3,
    viewAdministration = 4,
    createPersonWarrant = 2,
    createVehicleWarrant = 2,
    editOwnWarrant = 0,
    editAllWarrants = 4,
    closeWarrant = 2,
    archiveWarrant = 2,
    restoreWarrant = 4,
    createReport = 0,
    editOwnReport = 0,
    editAllReports = 4,
    archiveReport = 2,
    searchCitizens = 0,
    viewCitizenProfile = 0,
    addCitizenNote = 0,
    editCitizenPhoto = 2,
    searchVehicles = 0,
    callOfficerToDuty = 1,
    createEvidence = 0,
    editOwnEvidence = 0,
    editAllEvidence = 4,
    archiveEvidence = 2,
    viewOfficers = 4,
    viewAuditLog = 4,
    viewCAD = 0,
    createCADCall = 4,
    editCADCall = 1,
    assignCADUnits = 1,
    closeCADCall = 1,
    archiveCADCall = 2,
    panicButton = 0,
    manageAdministration = 4,
    managePermissions = 4,
    manageDepartments = 4,
    manageSystemSettings = 4,
    viewOfficerProfiles = 4,
    manageOfficerRecords = 4,
    viewAnnouncements = 0,
    manageAnnouncements = 4,
    viewCommandCenter = 0,
    viewLogs = 4,
    viewCodes = 0,
    manageCodes = 4,
    viewFines = 0,
    manageFineCatalog = 4,
    issueFines = 0,
    viewCitizenLicenses = 0,
    manageCitizenLicenses = 2,
    clearArchives = 4
}
```

## Permissions

Document permissions and grade requirements here.

## Commands

| Command | Permission | Description |
|---|---|---|
| `/example` | Everyone | Example command |

## Keybinds

Document configurable keybinds here.

## Exports

Document client and server exports here.

## Events

Document public events here.

## Integrations

Document framework, inventory, target, notification and other integrations.

## Troubleshooting

### Problem

Describe the problem and solution.

## FAQ

### Question

Answer.

## Changelog

See the product changelog for version history.
