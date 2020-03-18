package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte("my_secret_key")

// Credentials - struct to read username and password from POST body
type Credentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

// Claims - struct to encode to JWT
// Add jwt.StandardClaims as embedded type to provide fields like expiry time
type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// test users to hit endpoint with.
var testUsers = map[string]string{
	"user1": "password1",
	"user2": "password2",
}

func addCorsHeader(res http.ResponseWriter) {
    headers := res.Header()
    headers.Add("Access-Control-Allow-Origin", "*")
    headers.Add("Vary", "Origin")
    headers.Add("Vary", "Access-Control-Request-Method")
    headers.Add("Vary", "Access-Control-Request-Headers")
    headers.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, token")
    headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
}

// Signin handles login requests
func Signin(w http.ResponseWriter, r *http.Request) {
	log.Println("Sign In Request")
	addCorsHeader(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	var creds Credentials
	// Decode JSON body
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	expectedPassword, ok := testUsers[creds.Username]

	// If password exists for user && password continue
	// otherwise return unauthorized status
	if !ok || expectedPassword != creds.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// expiration time of token
	authTime := 5 * time.Minute
	expirationTime := time.Now().Add(authTime)

	claims := &Claims{
		Username: creds.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// Declare the token with the signing algorithim, and the claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Println(r)
	log.Println(w)
	log.Println("Set cookie")
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
}

// Welcome authenticates user for subsequent requests
func Welcome(w http.ResponseWriter, r *http.Request) {
	// Session token is retrieved from request cookie
	log.Println("Welcome Request")
	log.Println(r)
	
	addCorsHeader(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	c, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return unauthorized
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// Any other error return bad request
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// get token string from cookie
	tokenStr := c.Value

	claims := &Claims{}

	// Parse JWT string, store result in claims
	tkn, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	w.Write([]byte(fmt.Sprintf("Welcome %s!", claims.Username)))
}

// Refresh extends the duration of a user's token
func Refresh(w http.ResponseWriter, r *http.Request) {
	log.Println("Refresh request")

	addCorsHeader(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	// Session token is retrieved from request cookie
	c, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return unauthorized
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// Any other error return bad request
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// get token string from cookie
	tokenStr := c.Value

	claims := &Claims{}

	// Parse JWT string, store result in claims
	tkn, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Create new token to 'refresh' old token expiration
	authTime := 5 * time.Minute
	expirationTime := time.Now().Add(authTime)
	claims.ExpiresAt = expirationTime.Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
}
