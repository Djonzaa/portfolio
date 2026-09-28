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
ensure d-mdt
```

### Do not rename the resource, otherwise it won't work

## Configuration


```lua
Config = {}

Config.RequireMDTItem = true -- require item to open MDT
Config.MDTItem = 'policemdt' -- item name if RequireMDTItem = true
Config.OpenCommand = 'mdt' -- open mdt command
Config.OpenKey = 'F6' -- Open mdt key
Config.RequireDuty = true -- Require police duty to open mdt
Config.AdminMinGrade = 4 -- Minimum grade to manage adminsitration, and officer permissions
Config.DefaultPatrolCapacity = 4 -- Default capacity for police patrol
Config.MaxPatrolCapacity = 8 -- Maximum officers allowed in a single patrol

```

```lua 
Config.AllowedJobs = { -- allowed jobs to use mdt
    police = true,
    sheriff = true
}

```

```lua 
Config.Permissions = { -- minimum grade for each 
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

```lua
Config.PatrolStatuses = { 
    available = 'Available',
    patrol = 'In Patrol',
    call = 'On Call',
    pursuit = 'In Pursuit',
    breaktime = 'On Break'
}
```

```lua 
Config.BadgeStatuses = {
    active = 'Active',
    suspended = 'Suspended',
    revoked = 'Revoked',
    lost = 'Lost'
}
```

```lua 
Config.DefaultDepartments = { -- Default police departments, manageable through ingame menu
    patrol = 'Patrol Division',
    traffic = 'Traffic Division',
    detectives = 'Detectives',
    swat = 'Special Operations',
    command = 'Command'
}
```

```lua
Config.WarrantStatuses = {
    active = true,
    served = true,
    cancelled = true,
    expired = true
}

Config.WarrantDangerLevels = {
    low = true,
    medium = true,
    high = true,
    armed = true
}

Config.VehicleWarrantTypes = {
    stolen = true,
    crime = true,
    evasion = true,
    inspection = true,
    seize = true
}
```

```lua
Config.ReportStatuses = {
    open = true,
    under_review = true,
    closed = true
}

```

```lua
Config.ReportCategories = {
    general = 'General Report',
    arrest = 'Arrest',
    traffic = 'Traffic',
    investigation = 'Investigation',
    evidence = 'Evidence',
    incident = 'Incident'
}

```

```lua
Config.SearchLimits = {
    citizens = 30,
    vehicles = 30,
    minimumQueryLength = 2
}
```

```lua
Config.VehicleStates = {
    [0] = 'Out of Garage',
    [1] = 'In Garage',
    [2] = 'Impounded'
}
```

```lua
Config.QboxPlayersTable = 'players' -- Qbox character table. Default Qbox installation uses `players`.
```

```lua
Config.EvidenceTypes = {
    photo = true, weapon = true, item = true, document = true,
    biological = true, digital = true, other = true
}
Config.EvidenceStatuses = {
    collected = true, analysis = true, stored = true,
    released = true, destroyed = true
}
```

```lua
Config.CADPriorities = {
    low = 'Low',
    normal = 'Normal',
    high = 'High',
    urgent = 'Urgent'
}

Config.CADStatuses = {
    new = 'New Call',
    dispatched = 'Units Dispatched',
    responding = 'Units Responding',
    on_scene = 'On Scene',
    resolved = 'Resolved',
    cancelled = 'Cancelled'
}


Config.Dispatch = {
    CitizenCommand = '911',
    AcceptCommand = 'acceptdispatch',
    AcceptKey = 'G',
    AlertDuration = 15000,
    RequireOnDuty = true,
    OnSceneDistance = 55.0,
    OnSceneCheckInterval = 1500,
    AutoGunshot = true,
    GunshotCooldown = 0,
    IgnorePoliceGunshots = false,
    AutoFight = true,
    FightCooldown = 0,
    ExternalEventCooldown = 1500,
    DetectionInterval = 25,
    DetectionRadius = 140.0,
    ServerDuplicateWindow = 8,
    ServerDuplicateDistance = 90.0,
    DefaultPriorities = {
        shooting = 'urgent',
        fight = 'high',
        drug_sale = 'high',
        illegal_location = 'normal',
        citizen_911 = 'high'
    }
}
```

```lua
Config.Panic = { -- Police panic button
    Command = 'panic',
    Key = 'F10',
    Cooldown = 15000,
    Priority = 'urgent',
    Title = 'PANIC ALARM',
    Description = 'An officer activated the panic alarm and requires immediate assistance.'
}
```

```lua
Config.AdminDefaults = { -- Manageable through in game menu 
    dispatchSound = true,
    dispatchDuration = 15000,
    panicSound = true,
    panicDuration = 20000
}
```

```lua
Config.CommandCenter = { -- In game command center, police gps
    GPSItem = 'policegps',
    UpdateInterval = 1500,
    StaleAfter = 6000,
    RequireDuty = true,
    RequireGPSItem = true,
    MinX = -4000.0,
    MaxX = 4500.0,
    MinY = -4500.0,
    MaxY = 8500.0
}
```
```lua
Config.UI = {
    Language = 'en',
    EnableAnimations = true,
    EnableGlowEffects = true,
    CompactMode = false,

    CommandCenter = {
        UnitMarkerSize = 24,
        CallMarkerSize = 22,
        MarkerLabelScale = 1.0,
        MarkerGlow = true,
        DefaultZoom = 0,
        MaxZoom = 4,
        MinZoom = 0,
        RefreshInterval = 1500,
        ShowUnitLabels = true,
        ShowPatrolLabels = true,
        ShowCallLabels = true
    },

    Dispatch = {
        Position = 'top-right',
        Width = 390,
        Duration = 15000,
        SoundEnabled = true,
        PanicSoundEnabled = true
    }
}
```

```lua
Config.UnitStatuses = { -- Officer status, set through in game menu
    Default = 'available',
    PersistUntilRestart = true,
    Options = {
        available = { code = '10-8', label = 'Available', description = 'Available for calls', color = 'green' },
        out_of_service = { code = '10-7', label = 'Out of Service', description = 'Unavailable for calls', color = 'gray' },
        en_route = { code = '10-76', label = 'En Route', description = 'Responding to a call', color = 'blue' },
        on_scene = { code = '10-23', label = 'On Scene', description = 'At the incident location', color = 'cyan' },
        pursuit = { code = '10-80', label = 'In Pursuit', description = 'Vehicle or foot pursuit', color = 'red' },
        busy = { code = '10-6', label = 'Busy', description = 'Busy unless urgent', color = 'orange' },
        break_status = { code = '10-42', label = 'On Break', description = 'Temporarily unavailable', color = 'purple' },
        emergency = { code = '10-33', label = 'Emergency', description = 'Emergency radio traffic', color = 'red' }
    }
}
```

```lua
Config.Webhooks = {
    Enabled = false,
    DiscordWebhooks = false,
    Username = 'd-mdt Logs',
    AvatarUrl = '',
    Color = 5793266,

    -- Leave a URL empty to disable that category.
    Default = '',
    Patrols = '',
    Officers = '',
    Reports = '',
    Warrants = '',
    Citizens = '',
    Vehicles = '',
    Evidence = '',
    CAD = '',
    Administration = '',
    Codes = '',
    Fines = '',
    Licenses = '',
    Announcements = '',
    UnitStatus = '',
    Permissions = ''
}
```

```lua
Config.Logging = {
    DatabaseAudit = true,
    DiscordWebhooks = false, -- set to true, to use Config.Webhooks.
    WebhookDebug = true,
    IncludeOldValue = true,
    IncludeNewValue = true,
    MaxWebhookFieldLength = 900
}
```

## Commands

| Command | Permission | Description |
|---|---|---|
| `Config.OpenCommand 'Config.AllowedJobs'` | Open mdt |

| manage in config.lua |

## Keybinds

Config.OpenKey = 'F6' -- open mdt

## Exports

 Server-side export

```lua
local callId = exports['d-mdt']:CreateDispatch('store_robbery', { 
    title = 'Store Robbery',
    description = 'Silent alarm triggered.',
    priority = 'urgent',
    location = '24/7 Supermarket',
    postal = '101',
    coords = vector3(25.7, -1347.3, 29.5),
    callerName = 'Alarm System',
    sourceResource = GetCurrentResourceName()
})
```

Generic server export:

```lua
exports['d-mdt']:CreateCall({
    callType = 'custom',
    title = 'Custom CAD Call',
    description = 'Description',
    priority = 'normal',
    coords = vector3(0.0, 0.0, 0.0)
})
```

## Client-side export

When `coords` are omitted, the current player position is used:

```lua
exports['d-mdt']:CreateDispatch('illegal_activity', {
    title = 'Suspicious Activity',
    description = 'Custom client-side call.',
    priority = 'high'
})
```

Available typed exports:

- `CreateShootingCall`
- `CreateFightCall`
- `CreateDrugSaleCall`
- `CreateIllegalLocationCall`
- `CreateDispatch`
- `CreateCall`


# 35. Dispatch Integration Best Practices

When integrating another resource with the MDT:

- Do not create permanent location-based deduplication.
- Pass `type`, `title`, `description` and `coords`.
- Let `d-mdt` handle dispatch delivery.
- Do not manually send the NUI alert from the external resource.
- Do not directly manipulate the MDT database unless absolutely necessary.
- Use the public exports/events instead.

This keeps CAD state, dispatch alerts and unit workflows synchronized.


## Integrations

qbx_core, ox_inventory, ox_lib -- will be compatible with more resources in another update

## Changelog

Updates info will be provided here
