# Resource Name

> Advanced MDT/CAD system

## Overview

Advanced MDT/CAD SYSTEM, built to provide everything for police officers in one resource

### The resource is intended for a Qbox server. Job, grade, character and duty information is read through Qbox.

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
- Integrated jail system
- Much more

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


```lua
Config = {}

Config.Locale = 'en'


Config.RequireMDTItem = true
Config.MDTItem = 'policemdt'

Config.OpenCommand = 'mdt'
Config.OpenKey = 'F6'
Config.RequireDuty = true
Config.AdminMinGrade = 4
Config.DefaultPatrolCapacity = 4
Config.MaxPatrolCapacity = 8

Config.AllowedJobs = {
    police = true,
    sheriff = true
}

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
    clearArchives = 4,
    sendToJail = 2
}

Config.Jail = {
    Enabled = true,
    Resource = 'auto',
    DefaultMinutes = 30,
    MaxMinutes = 10000,
    RequireOnlineTarget = true,
    FallbackEvent = 'police:client:SendToJail',
    CompletionCheckInterval = 15000,
    XTPrisonEvent = 'police:server:JailPlayer'
}


Config.PatrolStatuses = {
    available = 'Available',
    patrol = 'In Patrol',
    call = 'On Call',
    pursuit = 'In Pursuit',
    breaktime = 'On Break'
}


Config.BadgeStatuses = {
    active = 'Active',
    suspended = 'Suspended',
    revoked = 'Revoked',
    lost = 'Lost'
}

Config.DefaultDepartments = {
    patrol = 'Patrol Division',
    traffic = 'Traffic Division',
    detectives = 'Detectives',
    swat = 'Special Operations',
    command = 'Command'
}


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


Config.ReportStatuses = {
    open = true,
    under_review = true,
    closed = true
}

Config.ReportCategories = {
    general = 'General Report',
    arrest = 'Arrest',
    traffic = 'Traffic',
    investigation = 'Investigation',
    evidence = 'Evidence',
    incident = 'Incident'
}


Config.SearchLimits = {
    citizens = 50,
    vehicles = 50,
    minimumQueryLength = 2
}

Config.VehicleStates = {
    [0] = 'Out of Garage',
    [1] = 'In Garage',
    [2] = 'Impounded'
}


-- Qbox character table. Default Qbox installation uses `players`.
Config.QboxPlayersTable = 'players'

Config.EvidenceTypes = {
    photo = true, weapon = true, item = true, document = true,
    biological = true, digital = true, other = true
}
Config.EvidenceStatuses = {
    collected = true, analysis = true, stored = true,
    released = true, destroyed = true
}

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
    GunshotCooldown = 2000,
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
        theft = 'normal',
        illegal_location = 'normal',
        citizen_911 = 'high'
    }
}


Config.Panic = {
    Command = 'panic',
    Key = 'F10',
    Cooldown = 15000,
    Priority = 'urgent',
    Title = 'PANIC ALARM',
    Description = 'An officer activated the panic alarm and requires immediate assistance.'
}

Config.AdminDefaults = {
    dispatchSound = true,
    dispatchDuration = 15000,
    panicSound = true,
    panicDuration = 20000
}


Config.CommandCenter = {
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


Config.UnitStatuses = {
    Default = 'available',
    PersistUntilRestart = true,
    Options = {
        available = { code = '10-8', label = 'Available', description = 'Available for calls', color = 'green' },
        out_of_service = { code = '10-7', label = 'Out of Service', description = 'Unavailable for calls', color = 'gray' },
        en_route = { code = '10-76', label = 'En Route', description = 'Responding to a call', color = 'blue' },
        on_scene = { code = '10-23', label = 'On Scene', description = 'At the incident location', color = 'cyan' },
        pursuit = { code = '10-80', label = 'In Pursuit', description = 'Vehicle or foot pursuit', color = 'red' },
        busy = { code = '10-6', label = 'Busy', description = 'Busy unless urgent', color = 'orange' },
        break_status = { code = '10-42', label = 'On Break', description = 'Temporarily unavailable', color = 'gray' },
        emergency = { code = '10-33', label = 'Emergency', description = 'Emergency radio traffic', color = 'red' }
    }
}


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

Config.Logging = {
    DatabaseAudit = true,
    DiscordWebhooks = false,
    WebhookDebug = true,
    IncludeOldValue = true,
    IncludeNewValue = true,
    MaxWebhookFieldLength = 900
}

Config.Integrations = {
    Core = 'qbox',
    Inventory = 'ox_inventory', -- ox_inventory, ps-inventory, qb-inventory, custom
    Identity = 'auto', -- qbx_idcard, um-idcard, dds-identification, custom, auto
    Jail = 'xt-prison', -- xt-prison, auto, custom
    Fines = 'mdt-integrated', -- mdt-integrated, qbx-police, qb_policejob, custom
    Notifications = 'ox_lib',
    Target = 'ox_target',
    Database = 'oxmysql',
    Dispatch = 'internal'
}

Config.Identity = {
    ItemNames = {
        'id_card', 'driver_license', 'weaponlicense', 'lawyerpass',
        'police_badge', 'identification_card', 'drivers_license', 'weapon_license'
    },
    Providers = { 'qbx_idcard', 'um-idcard', 'dds-identification', 'custom' },
    PreferItemMetadata = true
}

Config.Custom = {
    Identity = {
        GetMugshot = nil,
        GetCardData = nil
    },
    Inventory = {
        GetItemCount = nil
    },
    Jail = {
        SendToJail = nil
    },
    Fines = {
        GetCatalog = nil,
        SaveCatalog = nil,
        DeleteCatalog = nil,
        Issue = nil,
        GetCitizenFines = nil
    }
}

Config.Badges = {
    Enabled = true,
    Item = 'police_badge',
    ShowDistance = 2.5,
    AutoSync = false,
    RemoveItemOnSuspension = true,
    IssueRequiresChief = true
}

Config.Theme = {
    Preset = 'midnight',
    Accent = '#1789e8',
    AccentSecondary = '#32c5ff',
    Success = '#43d39e',
    Warning = '#f5b84b',
    Danger = '#ff5f72',
    Info = '#56b4ff',
    Radius = 14,
    Compact = false,
    Glass = true,
    Animations = true,
    Glow = true
}

```

## Commands

| Command | Permission | Description |
|---|---|---|
| `Config.OpenCommand'` | Open mdt | | Open police MDT |

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
