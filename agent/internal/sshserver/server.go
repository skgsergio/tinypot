package sshserver

import (
	"time"

	"github.com/skgsergio/tinypot/agent/internal/geoip"
	"github.com/skgsergio/tinypot/agent/internal/tinybird"

	"github.com/gliderlabs/ssh"

	"github.com/rs/zerolog/log"
)

const (
	sshVersion     = "SSH-2.0-OpenSSH_9.3p1 Ubuntu-1ubuntu3.2"
	idleTimeout    = 60 * time.Second
	sessionTimeout = 300 * time.Second
	successRatio   = 0.30
)

var (
	geo *geoip.GeoIP
	tb  *tinybird.TinyBird
)

func Run(listenAddr string, geoipClient *geoip.GeoIP, tinybirdClient *tinybird.TinyBird) {
	geo = geoipClient
	tb = tinybirdClient

	server := &ssh.Server{
		Addr:            listenAddr,
		Version:         sshVersion,
		IdleTimeout:     idleTimeout,
		MaxTimeout:      sessionTimeout,
		PasswordHandler: passwordHandler,
		Handler:         sessionHandler,
	}

	log.Info().
		Str("listenAddr", listenAddr).
		Msg("starting ssh server")

	err := server.ListenAndServe()
	if err != nil {
		log.Fatal().Err(err).Msg("ssh server listen fail")
	}
}
