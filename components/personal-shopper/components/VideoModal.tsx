import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import ClientUtils from "../utils/ClientUtils.ts";
import { UserProfile } from "deco-sites/hugo-estudos/components/personal-shopper/utils/utils.ts";

export interface Props {
  userProfile: UserProfile;
  modalOpened: boolean;
}

const VideoModal = ({ userProfile, modalOpened }: Props) => {
  const [inputUsername, setInputUsername] = useState("");
  const [localStream, setLocalStream] = useState<MediaStream>();

  const myVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  //TODO: leave call com connectionRef.current.destroy()
  // const connectionRef= useRef<any>(null)

  const clientUtils = useMemo(() => new ClientUtils(), []);

  useEffect(() => {
    if (!clientUtils) return;

    const initializeCall = async () => {
      await clientUtils.sendUsername(userProfile.Email);
      clientUtils.startCall(setLocalStream, myVideo, remoteVideo);
    };
    initializeCall();
  }, [clientUtils]);

  return (
    <div class={`${modalOpened ? "block" : "hidden"} mb-5`}>
      <div id="video-call-div" class="relative">
        <video
          ref={myVideo}
          muted
          id="local-video"
          autoPlay
          class="bg-black max-h-20 absolute rounded-full bottom-0 right-0 border-2 border-white"
        >
        </video>
        <video
          ref={remoteVideo}
          id="remote-video"
          autoPlay
          class="bg-black max-h-64 "
        >
        </video>
        <div class="call-action-div">
          <button
            onClick={() => clientUtils.closeCamera(localStream)}
          >
            Close Camera
          </button>
          <button
            onClick={() => clientUtils.muteAudio(localStream)}
          >
            Mute Audio
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
