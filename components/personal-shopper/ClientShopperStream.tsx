import { useEffect, useRef, useState } from "preact/hooks";

const configuration = {
  iceServers: [
    {
      "urls": [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
      ],
    },
  ],
};

let peerConn: any;
let webSocket: WebSocket;

export interface Props {}
const ClientShopperStream = () => {
  const [cameraOff, setCameraOff] = useState(false);
  const [audioOff, setAudioOff] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [localStream, setLocalStream] = useState<any>();

  const myVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  //TODO: leave call com connectionRef.current.destroy()
  // const connectionRef= useRef<any>(null)

  useEffect(() => {
    peerConn = new RTCPeerConnection(configuration);
    webSocket = new WebSocket("ws://localhost:3000");
    webSocket.onmessage = (event) => {
      handleSignallingData(JSON.parse(event.data));
    };
  }, []);

  function handleSignallingData(data: any) {
    switch (data.type) {
      case "offer":
        console.log("inputUsername", inputUsername);
        peerConn.setRemoteDescription(data.offer);
        createAndSendAnswer();
        break;
      case "candidate":
        peerConn.addIceCandidate(data.candidate);
    }
  }

  function createAndSendAnswer() {
    console.log("create:", inputUsername);
    peerConn.createAnswer((answer: any) => {
      peerConn.setLocalDescription(answer);
      sendData({
        type: "send_answer",
        answer: answer,
      });
    }, (error: any) => {
      console.log(error);
    });
  }

  // let peerConn: any;
  function joinCall() {
    navigator.mediaDevices.getUserMedia({
      video: {
        frameRate: 24,
        width: {
          min: 480,
          ideal: 720,
          max: 1280,
        },
        aspectRatio: 1.33333,
      },
      audio: true,
    }).then((stream) => {
      setLocalStream(stream);
      if (myVideo.current) myVideo.current.srcObject = stream;

      // peerConn.addStream(localStream);
      peerConn.addStream(stream);

      peerConn.onaddstream = (e: any) => {
        if (remoteVideo.current) remoteVideo.current.srcObject = e.stream;
      };

      peerConn.onicecandidate = (e: any) => {
        if (e.candidate == null) {
          return;
        }

        sendData({
          type: "send_candidate",
          candidate: e.candidate,
        });
      };

      sendData({
        type: "join_call",
      });
    });
  }

  function sendData(data: any) {
    data.username = data.type === "send_answer"
      ? refInput?.current?.value
      : inputUsername;
    console.log("DATA", data);
    webSocket.send(JSON.stringify(data));
  }

  function muteAudio() {
    localStream.getAudioTracks()[0].enabled = !audioOff;
    setAudioOff((prev) => !prev);
  }

  function closeCamera() {
    localStream.getVideoTracks()[0].enabled = !cameraOff;
    setCameraOff((prev) => !prev);
  }
  return (
    <div>
      <div>
        <input
          placeholder="Enter username..."
          type="text"
          ref={refInput}
          id="username-input"
          value={inputUsername}
          onChange={(e) =>
            setInputUsername((e?.target as HTMLInputElement)?.value)}
        />
        <br />
        <button onClick={joinCall}>Join Call</button>
      </div>
      <div id="video-call-div">
        <video ref={myVideo} muted id="local-video" autoPlay></video>
        <video ref={remoteVideo} id="remote-video" autoPlay></video>
        <div class="call-action-div">
          <button onClick={closeCamera}>Close Camera</button>
          <button onClick={muteAudio}>Mute Audio</button>
        </div>
      </div>
    </div>
  );
};

export default ClientShopperStream;
