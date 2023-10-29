import { useMemo, useRef, useState } from "preact/hooks";
import ClientUtils from "../utils/ClientUtils.ts";
import { UserProfile } from "deco-sites/hugo-estudos/components/personal-shopper/utils/utils.ts";

export interface Props{
    userProfile: UserProfile
}

const VideoModal = ({userProfile}:Props) => {
  const [cameraOff, setCameraOff] = useState(false);
  const [audioOff, setAudioOff] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const [localStream, setLocalStream] = useState<MediaStream>();

  const myVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  //TODO: leave call com connectionRef.current.destroy()
  // const connectionRef= useRef<any>(null)

  const clientUtils = useMemo(() => new ClientUtils(), []);

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

export default VideoModal;
