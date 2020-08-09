/** @format */

// Register module/require aliases
import "module-alias/register";
//[*] import variables de entorno
import * as dotenv from "dotenv";

import app from "./app";

//[*] load port from env
dotenv.config();

const { PORT } = process.env;
app.listen(PORT, () => console.info("Server listening on port ", PORT));

//[*] ejemplo socket io
// let io = require("socket.io")(server);

// io.on("connection", (socket) => {
//   console.log("new client connectes");
//   socket.emit("FromAPI", { info: "wordkhjhjhhgfg" });
//   socket.on("disconnect", function () {
//     console.log("Cliente desconectado");
//   });
// });
