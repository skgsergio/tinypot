package httpserver

import (
	"net"
	"net/http"
	"time"

	"github.com/skgsergio/tinypot/agent/internal/geoip"
	"github.com/skgsergio/tinypot/agent/internal/tinybird"

	"github.com/rs/zerolog/log"
)

var (
	geo *geoip.GeoIP
	tb  *tinybird.TinyBird
)

type HTTPEvent struct {
	Date        string `json:"date"`
	ClientIP    string `json:"client_ip"`
	Host        string `json:"host"`
	Method      string `json:"method"`
	URL         string `json:"url"`
	UserAgent   string `json:"user_agent"`
	CountryCode string `json:"country_code"`
	City        string `json:"city"`
	ASName      string `json:"as_name"`
	ASNumber    uint   `json:"asn"`
}

func Run(listenAddr string, geoipClient *geoip.GeoIP, tinybirdClient *tinybird.TinyBird) {
	geo = geoipClient
	tb = tinybirdClient

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.NotFound(w, r)

		remoteAddr, _, err := net.SplitHostPort(r.RemoteAddr)
		if err != nil {
			log.Error().
				Err(err).
				Msg("error splitting host and port")
		}

		geoRes := geo.Query(net.ParseIP(remoteAddr))

		log.Info().
			Str("clientIp", remoteAddr).
			Str("host", r.Host).
			Str("method", r.Method).
			Str("url", r.URL.Path).
			Str("userAgent", r.UserAgent()).
			Interface("geo", geoRes).
			Msg("http request")

		city := geoRes.City
		if geoRes.City != "" && geoRes.CountryName != "" {
			city += ", "
		}
		city += geoRes.CountryName

		go tb.SendEvent(
			"http_requests",
			HTTPEvent{
				Date:        time.Now().Format(time.RFC3339),
				ClientIP:    remoteAddr,
				Host:        r.Host,
				Method:      r.Method,
				URL:         r.URL.Path,
				UserAgent:   r.UserAgent(),
				CountryCode: geoRes.CountryISO,
				City:        city,
				ASName:      geoRes.ASName,
				ASNumber:    geoRes.ASNumber,
			},
		)
	})

	log.Info().
		Str("listenAddr", listenAddr).
		Msg("starting http server")

	err := http.ListenAndServe(listenAddr, nil)
	if err != nil {
		log.Fatal().Err(err).Msg("http server listen fail")
	}
}
