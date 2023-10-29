import { StateUpdater } from "https://esm.sh/v128/preact@10.15.1/hooks/src/index.js";

export default abstract class BaseUtils {
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

  protected abstract _handleSignallingData(data: any): void;

  protected _sendData(data: any) {
    data.username = this.userName;
    this.webSocket.send(JSON.stringify(data));
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
