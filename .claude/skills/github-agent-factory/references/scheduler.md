# Scheduler config template

Generates the launchd plist (macOS) or crontab line (Linux) that fires the runner. The runner's locks make an extra fire harmless, so a simple schedule is enough.

Placeholders:

- `{{LAUNCHD_LABEL}}`: reverse-DNS label, from the repo slug (for example `com.example.myrepo-triage`).
- `{{RUNNER_PATH}}`: absolute path of the generated runner script.
- `{{ERR_LOG_PATH}}`: absolute stderr path, outside the repo tree.
- `{{HOUR_N}}` / `{{MINUTE}}`: the fire times from the interview. Recommend a few times inside working hours, on an odd minute so runs do not collide with on-the-hour CI crowds.

## launchd (macOS)

Generate to `~/Library/LaunchAgents/{{LAUNCHD_LABEL}}.plist`. Loading it is a manual step listed in WIRING.md; the factory never loads it.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>{{LAUNCHD_LABEL}}</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>{{RUNNER_PATH}}</string>
  </array>
  <key>StartCalendarInterval</key>
  <array>
    <dict>
      <key>Hour</key><integer>{{HOUR_1}}</integer>
      <key>Minute</key><integer>{{MINUTE}}</integer>
    </dict>
  </array>
  <key>StandardErrorPath</key><string>{{ERR_LOG_PATH}}</string>
</dict>
</plist>
```

No secrets in the plist: the runner reads them from the secret store itself, so the plist stays committable documentation of when things run, nothing more.

## cron (Linux)

```
{{MINUTE}} {{HOUR_1}},{{HOUR_2}} * * *  /bin/bash {{RUNNER_PATH}}
```

Same rule: the crontab line carries no environment secrets.
