package main

import (
	"flag"
	"fmt"
	"os"
	"strconv"
	"sync"
	"time"

	"github.com/skgsergio/tinypot/agent/internal/geoip"
	"github.com/skgsergio/tinypot/agent/internal/httpserver"
	"github.com/skgsergio/tinypot/agent/internal/sshserver"
	"github.com/skgsergio/tinypot/agent/internal/tinybird"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

var (
	sshListenFlag = flag.String(
		"ssh-listen",
		StrFromEnv("TP_SSH_LISTEN", ":2222"),
		"SSH listen address (env var \"TP_SSH_LISTEN\")",
	)
	httpListenFlag = flag.String(
		"http-listen",
		StrFromEnv("TP_HTTP_LISTEN", ":8080"),
		"HTTP listen address (env var \"TP_HTTP_LISTEN\")",
	)
	tbApiKeyFlag = flag.String(
		"tb-apikey",
		StrFromEnv("TP_TB_APIKEY", ""),
		"Tinybird API Key (env var \"TP_TB_APIKEY\")",
	)
	geoipCityFlag = flag.String(
		"geoip-city-db",
		StrFromEnv("TB_GEOIP_CITY", "GeoLite2-City.mmdb"),
		"GeoLite2 City MMDB file (env var \"TB_GEOIP_CITY\")",
	)
	geoipASNFlag = flag.String(
		"geoip-asn-db",
		StrFromEnv("TB_GEOIP_ASN", "GeoLite2-ASN.mmdb"),
		"GeoLite2 ASN MMDB file (env var \"TB_GEOIP_ASN\")",
	)
	debugFlag = flag.Bool(
		"debug",
		BoolFromEnv("TP_DEBUG", false),
		"enable debug log level (env var \"TP_DEBUG\")",
	)
	prettyFlag = flag.Bool(
		"pretty",
		BoolFromEnv("TP_PRETTY", false),
		"enable human-friendly logging (env var \"TP_PRETTY\")",
	)
)

func StrFromEnv(envVar string, defaultVal string) string {
	if value, ok := os.LookupEnv(envVar); ok {
		return value
	}
	return defaultVal
}

func BoolFromEnv(envVar string, defaultVal bool) bool {
	if value, ok := os.LookupEnv(envVar); ok {
		boolVal, err := strconv.ParseBool(value)
		if err != nil {
			panic(fmt.Sprintf("environment variable `%s` has invalid value `%s`", envVar, value))
		}
		return boolVal
	}

	return defaultVal
}

func main() {
	flag.Parse()

	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	zerolog.SetGlobalLevel(zerolog.InfoLevel)

	if *debugFlag {
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	}

	if *prettyFlag {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr, TimeFormat: time.RFC3339})
	}

	if *tbApiKeyFlag == "" {
		log.Fatal().Msg("missing Tinybird API Key!")
	}

	geo := geoip.New(*geoipCityFlag, *geoipASNFlag)
	tb := tinybird.New(*tbApiKeyFlag)

	wg := sync.WaitGroup{}

	wg.Add(1)
	go func() {
		sshserver.Run(*sshListenFlag, geo, tb)
		wg.Done()
	}()

	wg.Add(1)
	go func() {
		httpserver.Run(*httpListenFlag, geo, tb)
		wg.Done()
	}()

	wg.Wait()
}
