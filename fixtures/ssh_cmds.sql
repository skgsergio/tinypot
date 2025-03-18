SELECT
    now() - rand() % 86400 AS date,
    concat('sess_', lower(hex(randomString(8)))) AS session_id,
    ['ls -la', 'cat /etc/passwd', 'whoami', 'pwd', 'ps aux', 'netstat -an', 'df -h', 'top', 'id', 'uname -a'][(rand() % 10) + 1] AS cmd,
    rand() % 2 AS interactive
FROM numbers(20)