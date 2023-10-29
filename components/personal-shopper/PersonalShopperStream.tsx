import { useEffect, useRef, useState } from "preact/hooks";
import ClientUtils from "./utils/ClientUtils.ts";

export interface Props {}

let clientUtils: ClientUtils;

const PersonalShopperStream = () => {
  const [cameraOff, setCameraOff] = useState(false);
  const [audioOff, setAudioOff] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [localStream, setLocalStream] = useState<MediaStream>();

  const myVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  //TODO: leave call com connectionRef.current.destroy()
  // const connectionRef= useRef<any>(null)

  useEffect(() => {
    clientUtils = new ClientUtils();
  }, []);

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
        <button onClick={() => clientUtils.sendUsername(inputUsername)}>
          Send
        </button>
        <button
          onClick={() =>
            clientUtils.startCall(setLocalStream, myVideo, remoteVideo)}
        >
          Start Call
        </button>
      </div>
      <div id="video-call-div">
        <video ref={myVideo} muted id="local-video" autoPlay></video>
        <video ref={remoteVideo} id="remote-video" autoPlay></video>
        <div class="call-action-div">
          <button
            onClick={() =>
              clientUtils.closeCamera(localStream, cameraOff, setCameraOff)}
          >
            Close Camera
          </button>
          <button
            onClick={() =>
              clientUtils.muteAudio(localStream, audioOff, setAudioOff)}
          >
            Mute Audio
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalShopperStream;
