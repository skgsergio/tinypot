package geoip

import (
	"net"

	"github.com/oschwald/geoip2-golang"

	"github.com/rs/zerolog/log"
)

type GeoIP struct {
	dbCity *geoip2.Reader
	dbASN  *geoip2.Reader
}

type GeoIPResult struct {
	City string

	CountryName string
	CountryISO  string

	ASName   string
	ASNumber uint
}

func New(cityPath string, asnPath string) *GeoIP {
	dbCity, err := geoip2.Open(cityPath)
	if err != nil {
		log.Fatal().
			Err(err).
			Msg("error opening City DB")
	}

	dbASN, err := geoip2.Open(asnPath)
	if err != nil {
		log.Fatal().
			Err(err).
			Msg("error opening ASN DB")
	}

	return &GeoIP{
		dbCity: dbCity,
		dbASN:  dbASN,
	}
}

func (g *GeoIP) Query(ip net.IP) *GeoIPResult {
	cityRes, err := g.dbCity.City(ip)
	if err != nil {
		log.Fatal().
			Err(err).
			Msg("error querying City DB")
	}

	city := cityRes.City.Names["en"]
	for _, sub := range cityRes.Subdivisions {
		city += ", " + sub.Names["en"]
	}

	asnRes, err := g.dbASN.ASN(ip)
	if err != nil {
		log.Fatal().
			Err(err).
			Msg("error querying ASN DB")
	}

	return &GeoIPResult{
		City:        city,
		CountryName: cityRes.Country.Names["en"],
		CountryISO:  cityRes.Country.IsoCode,
		ASName:      asnRes.AutonomousSystemOrganization,
		ASNumber:    asnRes.AutonomousSystemNumber,
	}
}
