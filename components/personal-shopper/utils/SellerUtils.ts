import { Ref } from "https://esm.sh/v128/preact@10.15.1/hooks/src/index.js";
import { StateUpdater } from "https://esm.sh/v128/preact@10.15.1/hooks/src/index.js";

export default class SellerUtils {
  userName: string | null = null;
  peerConn: RTCPeerConnection;
  webSocket: WebSocket;

  constructor() {
    const configuration: RTCConfiguration = {
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

    this.peerConn = new RTCPeerConnection(configuration);
    this.webSocket = new WebSocket("ws://localhost:3000/");
    this.webSocket.onmessage = (event) => {
      this._handleSignallingData(JSON.parse(event.data));
    };
  }

  private _handleSignallingData(data: any) {
    switch (data.type) {
      case "offer":
        this.peerConn.setRemoteDescription(data.offer);
        this._createAndSendAnswer();
        break;
      case "candidate":
        this.peerConn.addIceCandidate(data.candidate);
    }
  }

  private _sendData(data: any) {
    data.username = this.userName;
    this.webSocket.send(JSON.stringify(data));
  }

  setUsername(userName: string) {
    this.userName = userName;
  }

  private _createAndSendAnswer() {
    this.peerConn.createAnswer((answer: any) => {
      this.peerConn.setLocalDescription(answer);
      this._sendData({
        type: "send_answer",
        answer: answer,
      });
    }, (error: any) => {
      console.log(error);
    });
  }

  joinCall(
    setLocalStream: StateUpdater<MediaStream | undefined>,
    myVideo: Ref<HTMLVideoElement>,
    remoteVideo: Ref<HTMLVideoElement>,
  ) {
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
      stream.getTracks().forEach((track) => {
        this.peerConn.addTrack(track, stream);
      });

      this.peerConn.onicecandidate = (e: any) => {
        if (e.candidate == null) {
          return;
        }

        this._sendData({
          type: "send_candidate",
          candidate: e.candidate,
        });
      };

      this._sendData({
        type: "join_call",
      });
    });
    // quando alguem conectar e adcionar um stream, o mesmo será exibido no video
    this.peerConn.ontrack = (e) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = e.streams[0];
      }
    };
  }

  muteAudio(
    localStream: MediaStream | undefined,
    audioOff: boolean,
    setAudioOff: StateUpdater<boolean>,
  ) {
    if (!localStream) return;
    localStream.getAudioTracks()[0].enabled = !audioOff;
    setAudioOff((prev) => !prev);
  }

  closeCamera(
    localStream: MediaStream | undefined,
    cameraOff: boolean,
    setCameraOff: StateUpdater<boolean>,
  ) {
    if (!localStream) return;
    localStream.getAudioTracks()[0].enabled = !cameraOff;
    setCameraOff((prev) => !prev);
  }
}
