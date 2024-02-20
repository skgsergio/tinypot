package tinybird

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"math"
	"net/http"
	"time"

	"github.com/rs/zerolog/log"
)

const (
	maxRetries = 5
	baseDelay  = 1 * time.Second
)

type TinyBird struct {
	apiKey string
}

func New(apiKey string) *TinyBird {
	return &TinyBird{
		apiKey: apiKey,
	}
}

func (tb *TinyBird) postEvents(dataSource string, payload []byte) bool {
	url := fmt.Sprintf("https://api.tinybird.co/v0/events?name=%s", dataSource)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payload))
	if err != nil {
		log.Fatal().
			Err(err).
			Msg("failed creating http request")
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", tb.apiKey))

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed posting events to Tinybird")
		return false
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		log.Error().
			Err(err).
			Msg("failed reading response body")
	}

	if res.StatusCode > 299 {
		log.Warn().
			Str("body", string(body)).
			Int("status_code", res.StatusCode).
			Msg("received non 2xx response from tinybird!")

		return false
	}

	log.Info().
		Str("body", string(body)).
		Int("status_code", res.StatusCode).
		Msg("events posted to tinybird")

	return true
}

func (tb *TinyBird) SendEvents(dataSource string, events []any) bool {
	payload := []byte{}
	for _, evt := range events {
		evtJSON, err := json.Marshal(evt)
		if err != nil {
			log.Error().
				Err(err).
				Msg("failed marshalling event to json")
			return false
		}

		payload = append(payload, evtJSON...)
		payload = append(payload, byte('\n'))
	}

	for r := 0; r < maxRetries; r++ {
		if ok := tb.postEvents(dataSource, payload); ok {
			return true
		}

		if r+1 < maxRetries {
			time.Sleep(time.Duration(math.Pow(2, float64(r))) * baseDelay)
		}
	}

	return false
}

func (tb *TinyBird) SendEvent(dataSource string, event any) bool {
	return tb.SendEvents(dataSource, []any{event})
}
