# 🤏🍯

Tinypot is a pet project that implements a very dummy honeypot for testing
purposes, it should not be considered as a production ready project.

The captured attempts are sent to [Tinybird](https://tinybird.co).

Modules:

- SSH: Capture login attempts and also has a chance of sending to the attacker a
  successful authentication in order to capture command attempts.

- HTTP: Capture requests.
