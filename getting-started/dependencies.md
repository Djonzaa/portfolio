# Dependencies

Dependencies are resource-specific.

A dependency should be installed and started before the Djonza Development resource that requires it.

Example:

```cfg
ensure ox_lib
ensure oxmysql
ensure ox_inventory
ensure resource_name
```

Check the individual resource documentation for the exact dependency list and supported versions.
