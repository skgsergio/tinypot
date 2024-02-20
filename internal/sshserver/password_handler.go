package sshserver

import (
	"math/rand"
	"net"
	"time"

	"github.com/gliderlabs/ssh"

	"github.com/rs/zerolog/log"
)

type LoginEvent struct {
	Date          string `json:"date"`
	SessionId     string `json:"session_id"`
	ClientIP      string `json:"client_ip"`
	User          string `json:"user"`
	Password      string `json:"password"`
	ClientVersion string `json:"client_version"`
	Success       bool   `json:"success"`
	CountryCode   string `json:"country_code"`
	City          string `json:"city"`
	ASName        string `json:"as_name"`
	ASNumber      uint   `json:"asn"`
}

func passwordHandler(ctx ssh.Context, password string) bool {
	remoteAddr, _, err := net.SplitHostPort(ctx.RemoteAddr().String())
	if err != nil {
		log.Error().
			Err(err).
			Msg("error splitting host and port")
	}

	geoRes := geo.Query(net.ParseIP(remoteAddr))

	success := rand.Float32() <= successRatio

	log.Info().
		Str("sessionId", ctx.SessionID()).
		Str("clientIp", remoteAddr).
		Str("user", ctx.User()).
		Str("password", password).
		Str("clientVersion", ctx.ClientVersion()).
		Bool("success", success).
		Interface("geo", geoRes).
		Msg("login attempt")

	city := geoRes.City
	if geoRes.City != "" && geoRes.CountryName != "" {
		city += ", "
	}
	city += geoRes.CountryName

	tb.SendEvent(
		"ssh_logins",
		LoginEvent{
			Date:          time.Now().Format(time.RFC3339),
			SessionId:     ctx.SessionID(),
			ClientIP:      remoteAddr,
			User:          ctx.User(),
			Password:      password,
			ClientVersion: ctx.ClientVersion(),
			Success:       success,
			CountryCode:   geoRes.CountryISO,
			City:          city,
			ASName:        geoRes.ASName,
			ASNumber:      geoRes.ASNumber,
		},
	)

	return success
}
