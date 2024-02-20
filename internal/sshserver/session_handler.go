package sshserver

import (
	"fmt"
	"io"
	"net"
	"strings"
	"time"

	"github.com/gliderlabs/ssh"

	"github.com/rs/zerolog/log"

	"golang.org/x/term"
)

type SessionEvent struct {
	Date        string `json:"date"`
	SessionId   string `json:"session_id"`
	Cmd         string `json:"cmd"`
	Interactive bool   `json:"interactive"`
}

func sessionHandler(session ssh.Session) {
	ourAddr, _, err := net.SplitHostPort(session.LocalAddr().String())
	if err != nil {
		log.Error().
			Err(err).
			Msg("error splitting host and port")
	}

	cmds := []string{}

	if session.RawCommand() != "" {
		cmds = append(cmds, session.RawCommand())
	} else {
		t := term.NewTerminal(
			session,
			fmt.Sprintf(
				"%s@%s %c ",
				session.User(),
				ourAddr,
				map[bool]rune{true: '#', false: '$'}[session.User() == "root"],
			),
		)

		for {
			line, err := t.ReadLine()
			if err != nil {
				if err == io.EOF {
					break
				}

				log.Error().
					Err(err).
					Msg("error reading interactive terminal line")
				break
			}

			pseudoArgv := strings.Fields(line)

			if len(pseudoArgv) > 0 {
				cmds = append(cmds, line)

				if pseudoArgv[0] == "exit" {
					break
				}
			}
		}
	}

	session.Close()

	log.Info().
		Str("sessionId", session.Context().SessionID()).
		Strs("commands", cmds).
		Bool("interactive", session.RawCommand() == "").
		Msg("session log")

	events := []any{}

	for _, cmd := range cmds {
		events = append(events, SessionEvent{
			Date:        time.Now().Format(time.RFC3339),
			SessionId:   session.Context().SessionID(),
			Cmd:         cmd,
			Interactive: session.RawCommand() == "",
		})
	}

	tb.SendEvents("ssh_cmds", events)
}
