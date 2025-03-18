SELECT
    now() - rand() % 86400 AS date,
    concat(toString(rand() % 256), '.', toString(rand() % 256), '.', toString(rand() % 256), '.', toString(rand() % 256)) AS client_ip,
    ['example.com', 'api.example.com', 'blog.example.com', 'shop.example.com'][rand() % 4 + 1] AS host,
    ['GET', 'POST', 'PUT', 'DELETE'][rand() % 4 + 1] AS method,
    concat('/', ['api', 'users', 'products', 'orders', 'posts'][rand() % 5 + 1], '/', toString(rand() % 1000)) AS url,
    concat(['Mozilla', 'Chrome', 'Safari', 'Firefox'][rand() % 4 + 1], '/', toString(rand() % 100), '.0') AS user_agent,
    ['US', 'GB', 'DE', 'FR', 'ES', 'IT'][rand() % 6 + 1] AS country_code,
    ['New York', 'London', 'Berlin', 'Paris', 'Madrid', 'Rome'][rand() % 6 + 1] AS city,
    concat(['Comcast', 'Verizon', 'AT&T', 'Deutsche Telekom', 'Orange'][rand() % 5 + 1], ' Communications') AS as_name,
    rand() % 1000000 AS asn
FROM numbers(20)