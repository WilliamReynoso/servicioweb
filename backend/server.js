import express from "express";
import sql from "mssql";

const app = express();
const port = 3000;
// SQL Server configuration
const config = {
  user: "pruebas", // Database username
  password: "12345",
  server: "localhost", // Server IP address
  database: "sissatest", // Database name
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", `*`);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// Define route for fetching data from SQL Server
app.get("/", async (request, response) => {
  // Execute a SELECT query
  // new sql.Request().query(
  //   "SELECT * FROM Alumnos where Nombres='Juan'",
  //   (err, result) => {
  //     if (err) {
  //       console.error("Error executing query:", err);
  //     } else {
  //       response.send(result.recordset); // Send query result as response
  //       console.dir(result.recordset);
  //     }
  //   }
  // );
  try {
    await sql.connect(config);
    const result = await sql.query(
      "SELECT * FROM Alumnos where Nombres='Juan'"
    );
    // console.dir(result.recordset);
    response.send(result.recordset[0]);
    // console.log("SISAS");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
});

// Connect to SQL Server
sql.connect(config, (err) => {
  if (err) {
    throw err;
  }
  console.log("Connection Successful!");
});

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
