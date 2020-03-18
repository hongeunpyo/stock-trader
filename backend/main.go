package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/signin", Signin)
	http.HandleFunc("/welcome", Welcome)
	http.HandleFunc("/refresh", Refresh)

	// Start the server on port :8000
	log.Println("Serving API on port :8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
