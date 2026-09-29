# d-MDT — Advanced Police MDT & CAD

**Djonza Development**

Advanced Police MDT & CAD system built for Qbox roleplay servers.

d-MDT combines CAD, dispatch, officer management, patrol management, citizen and vehicle records, warrants, reports, evidence, fines, licenses, police codes, announcements, audit logs and a live command center into one NUI application.

---

# Table of Contents

1. [Overview](#overview)
2. [Requirements](#requirements)
3. [Compatibility](#compatibility)
4. [Installation](#installation)
5. [Opening the MDT](#opening-the-mdt)
6. [Items and Inventory](#items-and-inventory)
7. [Integrated Badge System](#integrated-badge-system)
8. [Officer Management](#officer-management)
9. [Duty System](#duty-system)
10. [Patrol System](#patrol-system)
11. [CAD and Dispatch](#cad-and-dispatch)
12. [Citizen 911](#citizen-911)
13. [Automatic Gunshot Detection](#automatic-gunshot-detection)
14. [Fight Detection](#fight-detection)
15. [Panic Button](#panic-button)
16. [Citizens](#citizens)
17. [Vehicles](#vehicles)
18. [Warrants](#warrants)
19. [Reports](#reports)
20. [Evidence](#evidence)
21. [Fines](#fines)
22. [Police Codes](#police-codes)
23. [Licenses](#licenses)
24. [Jail Integration](#jail-integration)
25. [Command Center](#command-center)
26. [Departments](#departments)
27. [Announcements](#announcements)
28. [Administration](#administration)
29. [Permissions](#permissions)
30. [Audit Logs and Webhooks](#audit-logs-and-webhooks)
31. [Configuration](#configuration)
32. [Database](#database)
33. [Developer Integration](#developer-integration)
34. [Troubleshooting](#troubleshooting)
35. [FAQ](#faq)
36. [Support](#support)

---

# Overview

d-MDT is a complete police information and dispatch platform designed around Qbox.

It is intended to replace multiple disconnected police resources with a single interface.

## Core Features

- Advanced Police MDT
- CAD and dispatch
- Citizen 911 calls
- Automatic shooting detection
- Fight detection
- Dispatch priorities
- Dispatch acceptance
- Automatic on-scene detection
- Panic button
- Officer management
- Officer profiles
- Badge management
- Badge status management
- Duty tracking
- Duty session history
- Patrol management
- Patrol leadership
- Patrol member management
- Citizen database
- Citizen profiles
- Citizen notes
- Vehicle database
- Vehicle notes
- Warrants
- Person warrants
- Vehicle warrants
- Warrant images
- Warrant/report linking
- Warrant archive and restore
- Reports
- Report links
- Evidence management
- Fines catalog
- Multiple-fine issuing
- Nearby-player fine issuing
- Fine history
- Police codes
- License management
- License points
- License suspension
- License revocation
- License restoration
- Live Command Center
- Police GPS
- Departments
- Officer records
- Announcements
- Administration
- Permission overrides
- Audit logs
- Discord/webhook logging
- Configurable statuses
- Configurable priorities
- Configurable permissions
- Configurable commands and keys
- Qbox-native architecture

---

# Requirements

## Framework

d-MDT is built for:

- Qbox
- `qbx_core`

## Required Resources

The current resource manifest requires:

- `qbx_core`
- `ox_lib`
- `oxmysql`

The Qbox ecosystem itself uses `ox_inventory` as its inventory system. Qbox currently declares `ox_inventory` as a core dependency and its player item functions are backed by `ox_inventory`.

Recommended server stack:

```cfg
ensure oxmysql
ensure ox_lib
ensure ox_inventory
ensure qbx_core
ensure d-mdt
```

`ox_target` can be used by the surrounding police/server ecosystem, but it is not declared as a hard dependency by the current d-MDT manifest.

---

# Compatibility

## Framework Support

| Framework | Support |
|---|---|
| Qbox | Native |
| QBCore | Not a native target |
| ESX Legacy | Not a native target |
| Standalone | Not supported |

d-MDT is designed around Qbox player data, jobs, grades and Qbox-compatible database structures.

## Inventory Support

### ox_inventory

**Native / recommended**

d-MDT uses Qbox and the Qbox inventory ecosystem. The current Qbox stack requires `ox_inventory`.

The two important d-MDT items are:

```text
policemdt
policegps
```

`policemdt` is the MDT access item.

`policegps` is the GPS item used by the Command Center when GPS item verification is enabled.

### qb-inventory

**Not native in the current Qbox build.**

Qbox itself does not support running `qb-inventory` alongside `qbx_core`. A custom compatibility layer would be required and is outside the native d-MDT support target.

### qs-inventory

**Not native in the current build.**

A custom adapter would be required if a server replaces the Qbox/ox_inventory stack.

### Other inventories

Other inventory resources are not advertised as native d-MDT integrations unless an adapter is supplied by Djonza Development for that version.

Do not advertise an inventory as supported only because it can technically contain the same item names.

---

# Installation

## 1. Install Dependencies

Make sure the following resources are installed and working:

```text
qbx_core
ox_lib
oxmysql
ox_inventory
```

## 2. Install d-MDT

Place the resource in your resources folder:

```text
resources/
└── [djonza]/
    └── d-mdt/
```

The exact folder name can be changed, but the resource must be started by its resource name.

## 3. Import the SQL

Import the supplied SQL installer into your Qbox database.

The fresh installer creates the complete d-MDT schema.

> Back up your database before running a fresh-install SQL file. The supplied fresh installer is designed to remove old `d_mdt_*` tables before recreating the current schema.

## 4. Add the Resource to server.cfg

```cfg
ensure oxmysql
ensure ox_lib
ensure ox_inventory
ensure qbx_core
ensure d-mdt
```

## 5. Configure the Resource

Open:

```text
config.lua
```

Configure jobs, permissions, commands, dispatch, statuses, GPS and other settings.

## 6. Restart the Server

Restart the complete server after installing or changing inventory item definitions.

---

# Opening the MDT

Default configuration:

```text
Command: /mdt
Key: F6
```

The default configuration also requires the officer to be on duty.

Relevant settings:

```lua
Config.OpenCommand = 'mdt'
Config.OpenKey = 'F6'
Config.RequireDuty = true
```

The MDT can be restricted to configured police jobs.

Default jobs:

```lua
Config.AllowedJobs = {
    police = true,
    sheriff = true
}
```

---

# Items and Inventory

## MDT Item

Default:

```text
policemdt
```

This item can be used as the physical MDT access item.

If your server uses item-based access, make sure the item exists in your inventory resource.

## Police GPS Item

Default:

```text
policegps
```

The Command Center can require this item before showing an officer's live GPS location.

Configuration:

```lua
Config.CommandCenter = {
    GPSItem = 'policegps',
    RequireGPSItem = true
}
```

## Badge Item vs Badge Record

The d-MDT badge system is separate from the physical inventory item.

The MDT stores an officer's badge number and badge status as police personnel data.

This allows the badge to be managed, displayed and tracked without forcing the badge record itself to be the inventory item.

If a server wants a physical badge item as well, that item can be connected to the server's inventory setup.

---

# Integrated Badge System

d-MDT contains an integrated officer badge system.

An officer can have:

- Badge number
- Badge status
- Callsign
- Rank
- Department
- Officer profile
- Duty information
- Patrol membership

## Badge Statuses

Default statuses:

```text
active
suspended
revoked
lost
```

Configured with:

```lua
Config.BadgeStatuses = {
    active = true,
    suspended = true,
    revoked = true,
    lost = true
}
```

## Who Can Give a Badge?

Badge management is permission protected.

Default permission:

```lua
manageBadges = 4
```

This means a grade level of 4 or higher can manage officer badges under the default configuration.

A chief/admin officer can assign or edit:

- Badge number
- Badge status
- Officer department
- Callsign
- Officer information

The exact grade required can be changed in `Config.Permissions`.

## Badge Display

The badge information is part of the officer's MDT identity and can be displayed to other officers through officer/patrol/dispatch information.

The system is designed so other MDT users can identify an officer by:

```text
Officer Name
Badge Number
Callsign
Rank
Department
Duty Status
Patrol
```

## Badge Lifecycle

Typical workflow:

1. Officer is added/recognized by the MDT.
2. Authorized command staff opens officer management.
3. Badge number is assigned.
4. Badge status is set to `active`.
5. Officer can appear with their badge information throughout MDT systems.
6. If necessary, command can change the badge to `suspended`, `revoked` or `lost`.


---

# Officer Management

The Officers system provides a centralized list of law-enforcement personnel.

Officer records can include:

- Name
- Citizen ID
- Job
- Rank
- Grade
- Badge
- Callsign
- Department
- Badge status
- Duty status
- Patrol
- Duty time
- Officer records

## Officer Records

Authorized command staff can manage officer records such as:

- Notes
- Commendations
- Warnings
- Administrative records

Access is controlled by permissions.

---

# Duty System

d-MDT tracks officer duty status.

An officer can be:

- On duty
- Off duty

Duty sessions are stored in the database.

The system can calculate and display duty time.

This allows administration to monitor:

- Current duty status
- Total duty time
- Duty sessions
- Officer activity

## Calling Officers to Duty

Authorized users can call an officer to duty.

Default permission:

```lua
callOfficerToDuty = 1
```

---

# Patrol System

d-MDT includes a complete patrol management system.

## Patrol Features

- Create patrol
- Join patrol
- Leave patrol
- Patrol leader
- Transfer leadership
- Remove members
- Edit patrol
- Patrol status
- Patrol capacity
- Patrol vehicle
- Patrol plate
- Patrol callsign
- Patrol lock
- Patrol requests

## Default Capacity

```lua
Config.DefaultPatrolCapacity = 4
Config.MaxPatrolCapacity = 8
```

## Patrol Statuses

Default:

```text
available
patrol
call
pursuit
breaktime
```

Configured with:

```lua
Config.PatrolStatuses = {
    available = true,
    patrol = true,
    call = true,
    pursuit = true,
    breaktime = true
}
```

---

# CAD and Dispatch

The CAD system is the live incident and dispatch center.

## Dispatch Sources

Calls can originate from:

- Citizen 911
- Automatic gunshot detection
- Fight detection
- Developer/server integrations
- Other configured dispatch sources

## Dispatch Information

A CAD call can contain:

- Call number
- Call type
- Title
- Caller
- Caller phone
- Location
- Postal
- Coordinates
- Description
- Priority
- Status
- Assigned units
- Creation time
- Resolution information

## Dispatch Priorities

Default:

```text
Low
Normal
High
Urgent
```

Configured through:

```lua
Config.CADPriorities
```

## Dispatch Statuses

Default:

```text
New Call
Units Dispatched
Units Responding
On Scene
Resolved
Cancelled
```

## Accepting Dispatch

Default:

```text
Command: /acceptdispatch
Key: G
```

Officers can accept available dispatch calls.

## Automatic On-Scene Detection

The system can detect when an assigned unit reaches the configured incident distance.

Default:

```lua
Config.Dispatch.OnSceneDistance = 55.0
Config.Dispatch.OnSceneCheckInterval = 1500
```

---

# Citizen 911

Citizens can create emergency calls.

Default command:

```text
/911
```

The call is sent into the CAD system.

Default priority:

```text
high
```

Configured through:

```lua
Config.Dispatch.DefaultPriorities.citizen_911
```

A citizen call can contain the location and description needed by responding officers.

---

# Automatic Gunshot Detection

d-MDT can automatically generate CAD calls when a configured gunshot event is detected.

Default:

```lua
Config.Dispatch.AutoGunshot = true
```

Default cooldown:

```lua
Config.Dispatch.GunshotCooldown = 45000
```

Default priority:

```text
urgent
```

This prevents a large number of gunshots from producing an uncontrolled number of duplicate dispatch calls.

---

# Fight Detection

Fight detection can create a CAD incident when a configured fight/attack event is detected.

Default priority:

```text
high
```

The resulting call can be handled through the same CAD workflow as other dispatch incidents.

---

# Panic Button

Default:

```text
Command: /panic
Key: F10
```

The panic system creates an urgent police alert.

Default configuration:

```lua
Config.Panic = {
    Command = 'panic',
    Key = 'F10',
    Cooldown = 15000,
    Priority = 'urgent',
    Title = 'PANIC ALARM'
}
```

The panic event can be delivered to on-duty officers and displayed through the dispatch system.

---

# Citizens

The Citizen Database provides searchable citizen records.

## Citizen Information

Records can contain:

- Citizen ID
- First name
- Last name
- Date of birth
- Gender
- Nationality
- Phone
- Job
- Fingerprint
- Blood type
- Driver license
- Weapon license
- ID license
- Profile image
- Last seen
- Notes

## Citizen Notes

Authorized users can add notes to citizen profiles.

Notes contain:

- Content
- Officer who created it
- Creation time

---

# Vehicles

The Vehicle Database allows officers to search vehicle records.

Vehicle-related MDT information can be connected to:

- Owner
- Plate
- Vehicle model
- Vehicle state
- Warrants
- Evidence
- Notes

## Vehicle Notes

Officers can store notes against a vehicle record.

Examples:

- Suspicious vehicle
- Search history
- Officer observations
- Investigation notes

---

# Warrants

d-MDT supports both person and vehicle warrants.

## Person Warrants

A person warrant can contain:

- Target citizen
- Target name
- Reason
- Danger level
- Status
- Issuing officer
- Expiration
- Image
- Linked report

## Vehicle Warrants

Vehicle warrants support configurable types.

Default:

```text
stolen
crime
evasion
inspection
seize
```

## Warrant Danger Levels

Default:

```text
low
medium
high
armed
```

## Warrant Statuses

Default:

```text
active
served
cancelled
expired
```

## Warrant Images

Warrants can store an image URL.

This can be used for:

- Evidence images
- Search photos
- Identification images
- Other relevant warrant media

## Report Linking

A warrant can be linked to a report.

Linked reports can be opened directly from the relevant MDT record.

## Archive and Restore

Warrants can be archived instead of permanently removed.

Authorized users can restore archived warrants.

---

# Reports

Reports provide long-term documentation for police incidents and investigations.

## Report Categories

Default:

```text
General Report
Arrest
Traffic
Investigation
Evidence
Incident
```

## Report Statuses

Default:

```text
open
under_review
closed
```

## Report Information

A report can contain:

- Title
- Category
- Status
- Summary
- Description
- Location
- Incident date/time
- Author
- Linked citizen
- Linked vehicle
- Linked officer
- Linked warrant

## Report Links

Reports can be linked to:

- Citizens
- Vehicles
- Officers
- Warrants

This creates connected police records instead of isolated entries.

---

# Evidence

d-MDT includes an evidence management system.

## Evidence Types

Default:

```text
photo
weapon
item
document
biological
digital
other
```

## Evidence Statuses

Default:

```text
collected
analysis
stored
released
destroyed
```

## Evidence Information

Evidence records can include:

- Evidence number
- Title
- Type
- Status
- Description
- Location found
- Image
- Report
- Citizen
- Vehicle
- Collecting officer
- Collection time

Evidence can also be archived according to permissions.

---

# Fines

The current d-MDT build includes a complete fine catalog and fine issuing system.

This is separate from simply displaying fines.

## Fine Catalog

Authorized users can:

- Add fines
- Edit fines
- Delete fines
- Set fine code
- Set title
- Set description
- Set amount
- Set category

## Fine Categories

Categories are dynamic.

The system reads categories from the fine catalog.

Example categories included in the fresh database:

```text
Traffic
Public Order
Property
Weapons
Narcotics
Criminal
```

## Issuing Fines

An officer with the `issueFines` permission can:

1. Open Fines.
2. Select one or multiple fines.
3. Click the issue action.
4. Load nearby players.
5. Select the target player.
6. Add an optional reason.
7. Issue the selected fines.

The system calculates the combined total automatically.

## Multiple Fines

Multiple fines can be selected in one operation.

Example:

```text
Speeding
Reckless Driving
Driving Without License
```

The system creates one issued-fine record with individual fine items.

## Nearby Player Selection

The issuing officer selects the target from nearby players.

The MDT displays the player's:

- Name
- Citizen ID

## Fine History

Issued fines are stored in the MDT database.

The database separates:

```text
Fine Catalog
Issued Fine
Issued Fine Items
```

This means changing a future catalog entry does not have to rewrite the historical fine record.

---

# Police Codes

d-MDT includes a configurable police code catalog.

The fresh database contains common codes such as:

```text
10-4
10-6
10-7
10-8
10-9
10-10
10-11
10-13
10-20
10-22
10-23
10-27
10-28
10-29
10-32
10-33
10-50
10-80
10-95
Code 1
Code 2
Code 3
Code 4
```

## Code Management

Authorized command staff can manage the code catalog.

Default permissions:

```lua
viewCodes = 0
manageCodes = 4
```

---

# Licenses

d-MDT supports police license management.

Supported license types in the current database:

```text
driver
weapon
```

The citizen database also supports ID license information.

## License Statuses

```text
valid
suspended
revoked
```

## License Points

Driver licenses can contain penalty points.

Officers can record:

- Points added
- Points removed
- Suspension
- Revocation
- Restoration
- Updates

## License History

Every license action can be stored with:

- Previous status
- New status
- Point change
- Reason
- Officer
- Timestamp

---

# Jail Integration

d-MDT is designed to work as part of a larger Qbox police ecosystem where arrest, sentencing and jail/prison resources are handled by the server's chosen jail resource.

## Important Integration Rule

The MDT database is the police records system.

The jail/prison resource is responsible for physically placing the player into custody and controlling the prison gameplay.

This separation allows the MDT to remain compatible with different server jail implementations instead of hard-coding one prison resource into the CAD.

## Jail Records

A police MDT can document:

- Arrest reports
- Officer involved
- Charges
- Evidence
- Warrants
- Fines
- License actions
- Sentencing information

## Jail Resource Compatibility

A specific jail resource should only be advertised as officially supported when a matching adapter/export integration exists for the released version.

Examples of external jail resources should therefore be treated as **adapter-dependent**, not automatically native.

If your commercial build includes a dedicated jail adapter, document that adapter on the version-specific integration page rather than claiming every jail script is natively supported.

---

# Command Center

The Command Center provides live police positioning.

## GPS Requirements

Default GPS item:

```text
policegps
```

Default:

```lua
RequireDuty = true
RequireGPSItem = true
```

An officer normally needs:

- On-duty status
- Required police job
- Police GPS item

## Live Updates

Default:

```lua
UpdateInterval = 1500
StaleAfter = 6000
```

This keeps officer positions updated while removing stale GPS entries after the configured timeout.

## Command Center Data

The system can display:

- On-duty officers
- Officer identity
- Badge
- Callsign
- Department
- Patrol
- Status
- Position

The map is intended for full Los Santos / Blaine County police operations.

---

# Departments

Departments are configurable.

Default departments:

```text
Patrol Division
Traffic Division
Detectives
Special Operations
Command
```

Departments can be managed from MDT Administration when the user has:

```lua
manageDepartments = 4
```

The current database contains a dedicated department table, allowing departments to be managed without relying only on hardcoded UI data.

---

# Announcements

d-MDT includes a police announcement system.

Authorized users can create announcements for department members.

Announcements can be tracked as read/unread through the announcement read system.

Default permissions:

```lua
viewAnnouncements = 0
manageAnnouncements = 4
```

---

# Administration

Administration provides high-level control over the MDT.

Depending on permissions, command staff can manage:

- Officers
- Badges
- Departments
- Permissions
- System settings
- Officer records
- Announcements
- Codes
- Fine catalog
- Audit information

Administrative access is not automatically available to every police officer.

---

# Permission System

d-MDT uses grade-based permissions.

The default minimum grade for administration is:

```lua
Config.AdminMinGrade = 4
```

Permissions can be changed individually.

## Default Permission Levels

| Permission | Default Grade |
|---|---:|
| createPatrol | 0 |
| joinPatrol | 0 |
| leavePatrol | 0 |
| editOwnPatrol | 0 |
| removePatrolMember | 1 |
| editAllPatrols | 4 |
| manageBadges | 4 |
| viewAdministration | 4 |
| createPersonWarrant | 2 |
| createVehicleWarrant | 2 |
| editOwnWarrant | 0 |
| editAllWarrants | 4 |
| closeWarrant | 2 |
| archiveWarrant | 2 |
| restoreWarrant | 4 |
| createReport | 0 |
| editOwnReport | 0 |
| editAllReports | 4 |
| archiveReport | 2 |
| searchCitizens | 0 |
| viewCitizenProfile | 0 |
| addCitizenNote | 0 |
| editCitizenPhoto | 2 |
| searchVehicles | 0 |
| callOfficerToDuty | 1 |
| createEvidence | 0 |
| editOwnEvidence | 0 |
| editAllEvidence | 4 |
| archiveEvidence | 2 |
| viewOfficers | 4 |
| viewAuditLog | 4 |
| viewCAD | 0 |
| createCADCall | 4 |
| editCADCall | 1 |
| assignCADUnits | 1 |
| closeCADCall | 1 |
| archiveCADCall | 2 |
| panicButton | 0 |
| manageAdministration | 4 |
| managePermissions | 4 |
| manageDepartments | 4 |
| manageSystemSettings | 4 |
| viewOfficerProfiles | 4 |
| manageOfficerRecords | 4 |
| viewAnnouncements | 0 |
| manageAnnouncements | 4 |
| viewCommandCenter | 0 |
| viewLogs | 4 |
| viewCodes | 0 |
| manageCodes | 4 |
| viewFines | 0 |
| manageFineCatalog | 4 |
| issueFines | 0 |

Grade `0` means the permission is available to the lowest configured police grade.

Grade `4` means the default configuration reserves the permission for senior command staff.

---

# Permission Overrides

The current database contains:

```text
d_mdt_permission_overrides
```

This allows individual permission overrides to be stored per citizen ID.

This is useful when a server needs to give or remove a specific permission from one officer without changing the entire grade structure.

---

# Audit Logs and Webhooks

d-MDT includes audit logging.

The audit system can record:

- Actor
- Actor Citizen ID
- Action
- Target type
- Target ID
- Target name
- Previous value
- New value
- Timestamp

## Database

Audit records are stored in:

```text
d_mdt_audit_logs
```

## Discord Logging

The MDT can be integrated with Discord/webhook logging for administrative activity.

Webhook configuration should be kept server-side.

Do not expose Discord webhook URLs inside the NUI.

---

# Configuration

The main configuration file is:

```text
config.lua
```

## Main Settings

```lua
Config.OpenCommand = 'mdt'
Config.OpenKey = 'F6'
Config.RequireDuty = true
Config.AdminMinGrade = 4
Config.DefaultPatrolCapacity = 4
Config.MaxPatrolCapacity = 8
```

## Allowed Jobs

```lua
Config.AllowedJobs = {
    police = true,
    sheriff = true
}
```

## Search Limits

```lua
Config.SearchLimits = {
    citizens = 30,
    vehicles = 30,
    minimumQueryLength = 2
}
```

## Vehicle States

```lua
Config.VehicleStates = {
    [0] = 'Out of Garage',
    [1] = 'In Garage',
    [2] = 'Impounded'
}
```

## CAD Priorities

```lua
Config.CADPriorities = {
    low = 'Low',
    normal = 'Normal',
    high = 'High',
    urgent = 'Urgent'
}
```

## Dispatch

```lua
Config.Dispatch = {
    CitizenCommand = '911',
    AcceptCommand = 'acceptdispatch',
    AcceptKey = 'G',
    AlertDuration = 15000,
    RequireOnDuty = true,
    OnSceneDistance = 55.0,
    OnSceneCheckInterval = 1500,
    AutoGunshot = true,
    GunshotCooldown = 45000
}
```

## Panic

```lua
Config.Panic = {
    Command = 'panic',
    Key = 'F10',
    Cooldown = 15000,
    Priority = 'urgent',
    Title = 'PANIC ALARM'
}
```

## Command Center

```lua
Config.CommandCenter = {
    GPSItem = 'policegps',
    UpdateInterval = 1500,
    StaleAfter = 6000,
    RequireDuty = true,
    RequireGPSItem = true
}
```

---

# Database

The current d-MDT SQL schema contains the following major tables:

```text
d_mdt_officers
d_mdt_audit_logs
d_mdt_patrols
d_mdt_patrol_members
d_mdt_patrol_requests
d_mdt_warrants
d_mdt_reports
d_mdt_report_links
d_mdt_citizens
d_mdt_citizen_notes
d_mdt_evidence
d_mdt_vehicle_notes
d_mdt_cad_calls
d_mdt_cad_units
d_mdt_admin_settings
d_mdt_departments
d_mdt_permission_overrides
d_mdt_officer_records
d_mdt_announcements
d_mdt_announcement_reads
d_mdt_duty_sessions
d_mdt_codes
d_mdt_fine_catalog
d_mdt_issued_fines
d_mdt_issued_fine_items
d_mdt_citizen_licenses
d_mdt_citizen_license_history
```

## Database Architecture

The schema separates operational data from historical data.

For example:

```text
Fine Catalog
    ↓
Issued Fine
    ↓
Issued Fine Items
```

and:

```text
Report
    ↓
Report Links
    ├── Citizen
    ├── Vehicle
    ├── Officer
    └── Warrant
```

This makes the MDT easier to expand and keeps records connected.

---

# Developer Integration

d-MDT is structured as a modular Qbox resource.

## Resource Structure

```text
config.lua
shared/
    constants.lua
    utils.lua

client/
    functions.lua
    callbacks.lua
    events.lua
    nui.lua
    main.lua

server/
    functions.lua
    database.lua
    permissions.lua
    callbacks.lua
    events.lua
    main.lua

server/modules/
    officers.lua
    warrants.lua
    reports.lua
    citizens.lua
    vehicles.lua
    evidence.lua
    dashboard.lua
    cad.lua
    admin.lua
    announcements.lua
    duty.lua
    command-center.lua
    fines.lua
    codes.lua

web/
    index.html
    css/
    js/
    assets/
```

## External Resources

Developer integrations should communicate with d-MDT through the server-side integration layer.

Typical integrations include:

- Dispatch resources
- Police scripts
- Weapon/gunshot detection
- Fight detection
- Emergency scripts
- Jail/prison resources
- Evidence systems
- Other CAD/MDT resources

## Exports

Only exports that are actually exposed by the released resource should be documented as public API.

Do not create integration code based on assumed export names.

If your purchased release includes a dedicated developer API/export package, use the version-specific Developer API page supplied with that release.

---

# NUI Architecture

The NUI is a single application.

It communicates with the FiveM client through NUI callbacks.

The server handles:

- Permissions
- Database queries
- Record creation
- Record updates
- Security checks
- Administrative actions

The client handles:

- NUI communication
- Player state
- Keybinds
- Local events
- GPS updates
- Game-side detection

This keeps sensitive operations on the server.

---

# Security

Permission checks should always be performed server-side.

Never trust:

- NUI permissions
- Client-provided grades
- Client-provided Citizen IDs
- Client-provided officer identities
- Client-provided fine amounts
- Client-provided administrative access

The server should validate the player's Qbox identity and permissions before changing MDT data.

---

# Troubleshooting

## MDT Does Not Open

Check:

1. `qbx_core` is running.
2. `ox_lib` is running.
3. `oxmysql` is running.
4. The player has an allowed job.
5. The player is on duty if `Config.RequireDuty = true`.
6. The `policemdt` item exists if item-based access is enabled.
7. `/mdt` is not blocked by another resource.
8. F6 is not overridden by another keybind.

---

## GPS Does Not Appear

Check:

```lua
Config.CommandCenter.GPSItem
```

Default:

```text
policegps
```

Also check:

```lua
RequireDuty = true
RequireGPSItem = true
```

The officer must satisfy the configured requirements.

---

## Officers Cannot Manage Badges

Check:

```lua
Config.Permissions.manageBadges
```

Default:

```lua
manageBadges = 4
```

The officer's Qbox grade must meet the configured minimum.

---

## Fine Button Is Missing

Check:

```lua
Config.Permissions.issueFines
```

Default:

```lua
issueFines = 0
```

If the user has permission but the button is still missing, check that the Fines module is loaded and that the NUI receives the correct permission state.

---

## Fine Catalog Management Is Missing

Check:

```lua
Config.Permissions.manageFineCatalog
```

Default:

```lua
manageFineCatalog = 4
```

Grade 4 or higher can manage the catalog by default.

---

## No Nearby Players Appear When Issuing a Fine

Make sure:

- The target player is online.
- The target player is close enough.
- The officer is allowed to issue fines.
- The NUI is receiving the nearby-player callback response.
- There are no client/server callback errors.

---

## CAD Calls Do Not Appear

Check:

```lua
Config.Dispatch.RequireOnDuty
```

Also verify:

- Police job is allowed.
- Officer is on duty.
- CAD module is running.
- Dispatch source is correctly triggering the CAD event.
- No client/server errors are present.

---

## Automatic Gunshot Alerts Do Not Appear

Check:

```lua
Config.Dispatch.AutoGunshot = true
```

Also check:

```lua
Config.Dispatch.GunshotCooldown
```

A cooldown can prevent repeated alerts from being generated immediately.

---

## Panic Button Does Not Work

Default:

```text
/panic
F10
```

Check:

```lua
Config.Permissions.panicButton
```

and ensure the player is using an allowed police job.

---

## Database Errors

Verify:

- MariaDB/MySQL connection works.
- `oxmysql` starts before d-MDT.
- The correct database is selected.
- The supplied SQL was imported.
- Existing old d-MDT tables are not conflicting with a fresh install.

---

# FAQ

## Is d-MDT Qbox only?

The current release is designed for Qbox.

## Does d-MDT use ox_inventory?

Yes. Qbox's supported inventory stack uses `ox_inventory`.

## Does d-MDT support qb-inventory?

Not natively in the current Qbox build.

## Does d-MDT support QS inventory?

Not natively in the current build. A dedicated adapter is required.

## Can officers have badges?

Yes.

The MDT has an integrated officer badge system with badge number and badge status.

## Who can issue/manage badges?

Users with the `manageBadges` permission.

The default permission level is grade 4.

## Is the badge automatically given when the resource starts?

No. Badge management is controlled through the MDT administration/officer system.

## Can other officers see an officer's badge?

Yes. Badge information is part of the officer identity shown throughout relevant MDT officer, patrol and dispatch information.

## Does d-MDT have fines?

Yes.

The current system includes a fine catalog, permissions, multiple-fine selection, nearby-player selection, issued-fine records and individual issued-fine items.

## Can officers issue multiple fines at once?

Yes.

## Can administrators create their own fines?

Yes.

Users with `manageFineCatalog` can create, edit and delete catalog fines.

## Does d-MDT have police codes?

Yes.

Codes are stored in the database and can be managed through Administration by authorized users.

## Does d-MDT have licenses?

Yes.

Driver and weapon license records support status changes, points, suspension, revocation and history.

## Does d-MDT have a jail system?

The MDT is designed to integrate with the server's jail/prison resource while keeping police records inside the CAD.

The exact jail resource adapter is release-dependent and should only be advertised as officially supported when a dedicated adapter is included.

## Does d-MDT have a Command Center?

Yes.

It supports live officer GPS, patrol information and police positioning.

## Does the Command Center require an item?

By default:

```text
policegps
```

and:

```lua
RequireGPSItem = true
```

## Can departments be changed from the MDT?

Yes, when the user has the required department-management permission.

## Can permissions be changed per officer?

The current database contains permission override support by Citizen ID.

## Can reports link to warrants?

Yes.

Reports support linked citizens, vehicles, officers and warrants.

## Can warrants contain images?

Yes.

## Can warrants be archived?

Yes.

## Can archived warrants be restored?

Yes, with the required permission.

---

# Default Commands and Keys

| Feature | Default |
|---|---|
| Open MDT | `/mdt` |
| Open MDT key | `F6` |
| Citizen 911 | `/911` |
| Accept dispatch | `/acceptdispatch` |
| Accept dispatch key | `G` |
| Panic | `/panic` |
| Panic key | `F10` |

All command/key values should be treated as configurable rather than hard-coded.

---

# Default Items

| Item | Purpose |
|---|---|
| `policemdt` | MDT access |
| `policegps` | Live police GPS / Command Center |

---

# Default Jobs

```lua
Config.AllowedJobs = {
    police = true,
    sheriff = true
}
```

Additional jobs can be added through configuration.

---

# Version Information

Current documented source build:

```text
d-MDT 0.2.0
```

Resource:

```text
d-mdt
```

Author:

```text
Djonza Development
```

---

# Changelog

## 0.2.0

Major MDT/CAD build containing:

- Qbox architecture
- Officer management
- Badge management
- Patrol system
- Citizen database
- Vehicle database
- Warrants
- Reports
- Evidence
- CAD
- Dispatch
- Duty sessions
- Command Center
- Departments
- Announcements
- Administration
- Permission overrides
- Police codes
- Fine catalog
- Issued fines
- License management
- Audit logs
- Expanded database schema

---

# Support

For support, provide the following information:

```text
d-MDT Version:
Qbox Version:
ox_lib Version:
oxmysql Version:
ox_inventory Version:

FiveM Artifact:
Server Console Error:
Client Console Error:
Steps to Reproduce:
```

When reporting an issue, include the exact error message instead of only describing the feature as "not working".

---

# Credits

**d-MDT**

Advanced Police MDT & CAD

Created by **Djonza Development**

Built for Qbox roleplay servers.

---

# License

This resource is commercial software.

Redistribution, reselling, re-uploading, leaking or sharing the resource without permission is prohibited.

The resource is intended for use on the server(s) licensed by the purchaser.

Copyright © Djonza Development.
