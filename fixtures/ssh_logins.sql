SELECT
    now() - rand() % 86400 AS date,
    concat('session_', toString(rand() % 10000)) AS session_id,
    concat(toString(rand() % 256), '.', toString(rand() % 256), '.', toString(rand() % 256), '.', toString(rand() % 256)) AS client_ip,
    concat('pass_', toString(rand() % 1000)) AS password,
    ['admin', 'root', 'user', 'postgres', 'ubuntu'][(rand() % 5) + 1] AS user,
    concat('SSH-2.0-OpenSSH_', toString(5 + rand() % 4), '.', toString(rand() % 10)) AS client_version,
    rand() % 2 AS success,
    ['US', 'GB', 'DE', 'FR', 'JP', 'CN', 'BR', 'AU'][(rand() % 8) + 1] AS country_code,
    ['New York', 'London', 'Berlin', 'Paris', 'Tokyo', 'Beijing', 'Sydney'][(rand() % 7) + 1] AS city,
    ['Level3', 'Comcast', 'Deutsche Telekom', 'Orange', 'NTT'][(rand() % 5) + 1] AS as_name,
    10000 + rand() % 50000 AS asn
FROM numbers(20)