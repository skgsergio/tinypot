# 🤏🍯

Tinypot is a pet project that implements a very dummy honeypot for testing
purposes, it should not be considered as a production ready project.

The captured attempts are sent to [Tinybird](https://tinybird.co). A basic
dashboard showing the data can be checked at [Tinypot Dashboard](https://sconde.net/tinypot/). 

Modules:

- SSH: Capture login attempts and also has a chance of sending to the attacker a
  successful authentication to capture command execution attempts.

- HTTP: Capture requests.

## Tinybird

### Overview
This project uses Tinybird to store and analyze honeypot data from SSH login attempts, command executions, and HTTP requests. The data is processed through various endpoints to provide insights about attack patterns and sources.

### Data Sources

#### ssh_logins
Stores SSH login attempts. For succeeded authentications, check ssh_cmds to see command attempts for the session.

```bash
curl -X POST "https://api.europe-west2.gcp.tinybird.co/v0/events?name=ssh_logins" \
    -H "Authorization: Bearer $TB_ADMIN_TOKEN" \
    -d '{"date":"2025-01-31 12:00:00","session_id":"abc123","client_ip":"1.2.3.4","password":"pass123","user":"root","client_version":"SSH-2.0","success":1,"country_code":"US","city":"New York","as_name":"Example AS","asn":12345}'
```

#### ssh_cmds
Records commands attempted to run during successful SSH authentication sessions.

```bash
curl -X POST "https://api.europe-west2.gcp.tinybird.co/v0/events?name=ssh_cmds" \
    -H "Authorization: Bearer $TB_ADMIN_TOKEN" \
    -d '{"date":"2025-01-31 12:00:00","session_id":"abc123","cmd":"ls -la","interactive":1}'
```

#### http_requests
Stores HTTP requests received by the honeypot.

```bash
curl -X POST "https://api.europe-west2.gcp.tinybird.co/v0/events?name=http_requests" \
    -H "Authorization: Bearer $TB_ADMIN_TOKEN" \
    -d '{"date":"2025-01-31 12:00:00","client_ip":"1.2.3.4","host":"example.com","method":"GET","url":"/","user_agent":"Mozilla/5.0","country_code":"US","city":"New York","as_name":"Example AS","asn":12345}'
```

### Endpoints

#### http_top_ip
Shows top IPs by number of connections to the HTTP honeypot.
```bash
curl -X GET "https://api.europe-west2.gcp.tinybird.co/v0/pipes/http_top_ip.json?token=$TB_ADMIN_TOKEN&country_code=US&date_from=2025-01-01&date_to=2025-01-31"
```

#### ssh_top_credentials
Lists most commonly used credentials in SSH login attempts.
```bash
curl -X GET "https://api.europe-west2.gcp.tinybird.co/v0/pipes/ssh_top_credentials.json?token=$TB_ADMIN_TOKEN&what=user&date_from=2025-01-01&date_to=2025-01-31"
```

#### http_top_country
Shows top countries by unique IP count for HTTP requests.
```bash
curl -X GET "https://api.europe-west2.gcp.tinybird.co/v0/pipes/http_top_country.json?token=$TB_ADMIN_TOKEN&date_from=2025-01-01&date_to=2025-01-31"
```

#### ssh_top_as
Lists top Autonomous Systems by unique IP count for SSH attempts.
```bash
curl -X GET "https://api.europe-west2.gcp.tinybird.co/v0/pipes/ssh_top_as.json?token=$TB_ADMIN_TOKEN&country_code=US&date_from=2025-01-01&date_to=2025-01-31"
```

#### http_top_useragent
Shows most common User-Agents from HTTP requests.
```bash
curl -X GET "https://api.europe-west2.gcp.tinybird.co/v0/pipes/http_top_useragent.json?token=$TB_ADMIN_TOKEN&exclude_empty=true&date_from=2025-01-01&date_to=2025-01-31"
```

#### http_top_urls
Lists most requested URLs in the HTTP honeypot.
```bash
curl -X GET "https://api.europe-west2.gcp.tinybird.co/v0/pipes/http_top_urls.json?token=$TB_ADMIN_TOKEN&exclude_root=true&date_from=2025-01-01&date_to=2025-01-31"
```

#### ssh_top_cmds
Shows most commonly executed commands in SSH sessions.
```bash
curl -X GET "https://api.europe-west2.gcp.tinybird.co/v0/pipes/ssh_top_cmds.json?token=$TB_ADMIN_TOKEN&date_from=2025-01-01&date_to=2025-01-31"
```

#### ssh_top_country
Lists top countries by unique IP count for SSH login attempts.
```bash
curl -X GET "https://api.europe-west2.gcp.tinybird.co/v0/pipes/ssh_top_country.json?token=$TB_ADMIN_TOKEN&date_from=2025-01-01&date_to=2025-01-31"
```