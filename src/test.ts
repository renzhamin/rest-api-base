import jwt from "jsonwebtoken";

function replaceCharacter(string, index, replacement) {
  return (
    string.slice(0, index) +
    replacement +
    string.slice(index + replacement.length)
  );
}

const user = {
  id: 2,
  username: "gr",
  email: "mora@g.com",
};

let accessToken = jwt.sign(user, "secret", {
  expiresIn: "0",
});

console.log(accessToken);
/* accessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJnciIsImVtYWlsIjoibW9yYUBnLmNvbSIsImlhdCI6MTY4MTU1Mzc2 MCwiZXhwIjoxNjgxNTU0MDYwfQ.SC6QJC2KAWLu4Roelvg9I9zErf6lQoShgxPeMU2UZ9w`; */
accessToken = replaceCharacter(accessToken, 3, "1");

let data: any = null;

jwt.verify(accessToken, "secret", (err, decoded) => {
  if (err) {
    console.log(err.name);
    return;
  }
  data = decoded;
});
console.log(data);

console.log(jwt.decode(accessToken));
