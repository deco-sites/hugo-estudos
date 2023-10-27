/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="deno.ns" />
/// <reference lib="esnext" />

import { start } from "$fresh/server.ts";
import plugins from "https://denopkg.com/deco-sites/std@1.22.0/plugins/mod.ts";
import partytownPlugin from "partytown/mod.ts";
import manifest from "./fresh.gen.ts";
import decoManifest from "./manifest.gen.ts";

// SOCKET

import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";

const io = new Server({
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"],
  },
});

let users: any[] = [];

io.on("request", (req) => {
  const connection = req.accept();

  connection.on("message", (message: any) => {
    const data = JSON.parse(message.utf8Data);

    const user = findUser(data.username);

    switch (data.type) {
      case "store_user": {
        if (user != null) {
          return;
        }

        const newUser = {
          conn: connection,
          username: data.username,
        };

        users.push(newUser);
        console.log(newUser.username);
        break;
      }
      case "store_offer":
        if (user == null) {
          return;
        }
        user.offer = data.offer;
        break;

      case "store_candidate":
        if (user == null) {
          return;
        }
        if (user.candidates == null) {
          user.candidates = [];
        }

        user.candidates.push(data.candidate);
        break;
      case "send_answer":
        if (user == null) {
          return;
        }

        sendData({
          type: "answer",
          answer: data.answer,
        }, user.conn);
        break;
      case "send_candidate":
        if (user == null) {
          return;
        }

        sendData({
          type: "candidate",
          candidate: data.candidate,
        }, user.conn);
        break;
      case "join_call":
        if (user == null) {
          return;
        }

        sendData({
          type: "offer",
          offer: user.offer,
        }, connection);

        user.candidates.forEach((candidate:any) => {
          sendData({
            type: "candidate",
            candidate: candidate,
          }, connection);
        });

        break;
    }
  });

  connection.on("close", (reason:any, description:any) => {
    users.forEach((user) => {
      if (user.conn == connection) {
        users.splice(users.indexOf(user), 1);
        return;
      }
    });
  });
});

function sendData(data:any, conn:any) {
  conn.send(JSON.stringify(data));
}

function findUser(username:any) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username) {
      return users[i];
    }
  }
}

serve(io.handler(), {
  port: 5000,
});

// FIM SOCKET

await start(manifest, {
  plugins: [
    ...plugins({
      manifest: decoManifest,
    }),
    partytownPlugin(),
  ],
});
