# Registration
curl --request POST \
  --url http://localhost:5000/api/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	"username" : "gr523",
	"email" : "gr523@gmail.com",
	"password" : "Pass82G9"
}'

# Login
# The cookie will be saved in cookie.txt
curl --request POST \
  --url http://localhost:5000/api/auth/login \
  --header 'Content-Type: application/json' \
  --cookie-jar "cookie.txt" \
  --data '{
	"username" : "gr523",
	"password" : "Pass82G9"
}'

# Protected
curl --request GET \
  --url http://localhost:5000/api/api/users \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNjY2Q2ZjNhLWQxMzItNDQzZi05NWM0LTRmMDJjYmU3ZDRlMSIsInVzZXJuYW1lIjoiZ3I1MjMiLCJlbWFpbCI6ImdyNTIzQGdtYWlsLmNvbSIsImlhdCI6MTY4MTkyOTYyNywiZXhwIjoxNjgxOTI5OTI3fQ.qbfKNvMk2W9JojB7O9CAtshOKoPQ1n2whLWrP4lzEJo'

# Refresh
curl --request GET \
  --url http://localhost:5000/api/auth/refresh \
  --cookie refreshToken="$(sed -En '/refreshToken/s/.*refreshToken\s*(.*)/\1/p' cookie.txt)"
