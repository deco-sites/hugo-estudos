import { useEffect, useRef } from "preact/hooks";

const PersonalShopperStream = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const setupWebRTC = async () => {
      const configuration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const peerConnection = new RTCPeerConnection(configuration);
        peerConnectionRef.current = peerConnection;

        stream.getTracks().forEach((track) =>
          peerConnection.addTrack(track, stream)
        );

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            // Transmita os dados de sinalização para o primeiro par
            console.log("Local peer candidate:", event.candidate);
          }
        };

        peerConnection.onnegotiationneeded = async () => {
          try {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            // Transmita a oferta (offer) para o primeiro par
            console.log("Local peer offer:", offer);
          } catch (error) {
            console.error("Erro na negociação:", error);
          }
        };

        peerConnection.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };
      } catch (error) {
        console.error("Erro ao obter acesso à câmera:", error);
      }
    };

    setupWebRTC();

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h2>WebRTC Exemplo</h2>
      <div>
        <h3>Local</h3>
        <video ref={localVideoRef} autoPlay playsInline></video>
      </div>
      <div>
        <h3>Remoto</h3>
        <video ref={remoteVideoRef} autoPlay playsInline></video>
      </div>
    </div>
  );
};

export default PersonalShopperStream;

// import { useEffect, useRef, useState } from "preact/hooks";
// import * as ws from "socket-io";
// //ts-ignore
// // import Peer from "npm:simple-peer";
// // import * as CopyToClipboard from "npm:react-copy-to-clipboard";

// export interface Props {}

// const PersonalShopperStream = () => {
//   const [me, setMe] = useState("");
//   const [stream, setStream] = useState<MediaStream>();
//   const [receivingCall, setReceivingCall] = useState(false);
//   const [caller, setCaller] = useState("");
//   const [callerSignal, setCallerSignal] = useState();
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [idToCall, setIdToCall] = useState("");
//   const [name, setName] = useState("");

//   const myVideo = useRef<HTMLVideoElement>(null);
//   const userVideo = useRef<HTMLVideoElement>(null);
//   const connectionRef = useRef<any>(null);

//   console.log("WINDOW", typeof window);
//   if (typeof window === "undefined") {
//     return null;
//   }
//   let socket: any;
//   useEffect(() => {
//     socket = ws.io.connect("http://localhost:5000");
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         console.log("PersonalShopperStream.tsx -> stream", stream);
//         setStream(stream);
//         if (myVideo?.current) myVideo.current.srcObject = stream;
//       });

//     socket.on("me", (id: string) => {
//       console.log("PersonalShopperStream.tsx -> id", id);

//       setMe(id);
//     });

//     socket.on("callUser", (data: any) => {
//       console.log("PersonalShopperStream.tsx -> data", data);

//       setReceivingCall(true);
//       setCaller(data.from);
//       setName(data.name);
//       setCallerSignal(data.signal);
//     });
//   }, []);

//   const callUser = (id: string) => {
//     console.log("App.js -> callUser -> id", id);

//     // const peer = new Peer({
//     //   initiator: true,
//     //   trickle: false,
//     //   stream: stream,
//     // });
//     // peer.on("signal", (data: any) => {
//     //   console.log("App.js -> callUser -> data", data);

//     //   socket.emit("callUser", {
//     //     userToCall: id,
//     //     signalData: data,
//     //     from: me,
//     //     name: name,
//     //   });
//     // });
//     // peer.on("stream", (stream: MediaProvider) => {
//     //   if (userVideo?.current) userVideo.current.srcObject = stream;
//     // });
//     socket.on("callAccepted", (signal: any) => {
//       setCallAccepted(true);
//       // peer.signal(signal);
//     });

//     // connectionRef.current = peer;
//   };

//   const answerCall = () => {
//     setCallAccepted(true);
//     // const peer = new Peer({
//     //   initiator: false,
//     //   trickle: false,
//     //   stream: stream,
//     // });
//     // peer.on("signal", (data: any) => {
//     //   socket.emit("answerCall", { signal: data, to: caller });
//     // });
//     // peer.on("stream", (stream: MediaProvider) => {
//     //   if (userVideo?.current) userVideo.current.srcObject = stream;
//     // });

//     // peer.signal(callerSignal);
//     // connectionRef.current = peer;
//   };

//   const leaveCall = () => {
//     setCallEnded(true);
//     connectionRef.current.destroy();
//   };

//   return (
//     <>
//       <h1 style={{ textAlign: "center", color: "#fff" }}>Zoomish</h1>
//       <div className="container">
//         <div className="video-container">
//           <div className="video">
//             {stream && (
//               <video
//                 playsInline
//                 muted
//                 ref={myVideo}
//                 autoPlay
//                 style={{ width: "300px" }}
//               />
//             )}
//           </div>
//           <div className="video">
//             {callAccepted && !callEnded
//               ? (
//                 <video
//                   playsInline
//                   ref={userVideo}
//                   autoPlay
//                   style={{ width: "300px" }}
//                 />
//               )
//               : null}
//           </div>
//         </div>
//         <div className="myId">
//           <input
//             id="filled-basic"
//             label="Name"
//             value={name}
//             onChange={(e) => setName((e?.target as HTMLInputElement).value)}
//             style={{ marginBottom: "20px" }}
//           />

//           <input value={me} />

//           <input
//             id="filled-basic"
//             label="ID to call"
//             value={idToCall}
//             onChange={(e) => setIdToCall((e?.target as HTMLInputElement).value)}
//           />
//           <div className="call-button">
//             {callAccepted && !callEnded
//               ? (
//                 <button onClick={leaveCall}>
//                   End Call
//                 </button>
//               )
//               : <button>Call</button>}
//             {idToCall}
//           </div>
//         </div>
//         <div>
//           {receivingCall && !callAccepted
//             ? (
//               <div className="caller">
//                 <h1>{name} is calling...</h1>
//                 <button onClick={answerCall}>
//                   Answer
//                 </button>
//               </div>
//             )
//             : null}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PersonalShopperStream;
