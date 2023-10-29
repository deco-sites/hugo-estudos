import { useEffect, useRef, useState } from "preact/hooks";

export interface Props {}
const webSocket = new WebSocket("ws://localhost:3000/");

const PersonalShopperStream = () => {
  const [cameraOff, setCameraOff] = useState(false);
  const [audioOff, setAudioOff] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [localStream, setLocalStream] = useState<any>();

  const myVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  //TODO: leave call com connectionRef.current.destroy()
  // const connectionRef= useRef<any>(null)

  webSocket.onmessage = (event) => {
    handleSignallingData(JSON.parse(event.data));
  };

  function handleSignallingData(data: any) {
    switch (data.type) {
      case "answer":
        peerConn.setRemoteDescription(data.answer);
        break;
      case "candidate":
        peerConn.addIceCandidate(data.candidate);
    }
  }

  function sendUsername() {
    sendData({
      type: "store_user",
    });
  }

  function sendData(data: any) {
    data.username = inputUsername;
    webSocket.send(JSON.stringify(data));
  }

  let peerConn: any;
  function startCall() {
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

      peerConn = new RTCPeerConnection(configuration);
      peerConn.addStream(stream);

      // quando alguem conectar e adcionar um stream, o mesmo será exibido no video
      peerConn.onaddstream = (e: any) => {
        if (remoteVideo.current) remoteVideo.current.srcObject = e.stream;
      };

      peerConn.onicecandidate = (e: any) => {
        if (e.candidate == null) {
          return;
        }
        sendData({
          type: "store_candidate",
          candidate: e.candidate,
        });
      };

      createAndSendOffer();
    });
  }

  function createAndSendOffer() {
    // quando a oferta é criada o peerconection começa a colher icecandidates
    // esses icecandidates precisam ser enviados para o server que por sua vez enviará para a pessoa que esta tentando conectar
    peerConn.createOffer((offer: any) => {
      sendData({
        type: "store_offer",
        offer: offer,
      });

      peerConn.setLocalDescription(offer);
    }, (error: any) => {
      console.log(error);
    });
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
          id="username-input"
          value={inputUsername}
          onChange={(e) =>
            setInputUsername((e?.target as HTMLInputElement)?.value)}
        />
        <br />
        <button onClick={sendUsername}>Send</button>
        <button onClick={startCall}>Start Call</button>
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

export default PersonalShopperStream;
