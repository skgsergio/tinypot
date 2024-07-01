# 🤏🍯

Tinypot is a pet project that implements a very dummy honeypot for testing
purposes, it should not be considered as a production ready project.

The captured attempts are sent to [Tinybird](https://tinybird.co). A basic
dashboard showing the data can be checked at [Tinypot Dashboard](https://sconde.net/tinypot/). 

Modules:

- SSH: Capture login attempts and also has a chance of sending to the attacker a
  successful authentication to capture command execution attempts.

- HTTP: Capture requests.
