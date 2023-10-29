import { useState } from "preact/hooks";
import Button from "deco-sites/hugo-estudos/components/ui/Button.tsx";
import {
  checkAuth,
  UserProfile,
} from "deco-sites/hugo-estudos/components/personal-shopper/utils/utils.ts";
import { lazy, Suspense } from "preact/compat";
import Spinner from "deco-sites/hugo-estudos/components/ui/Spinner.tsx";

const VideoModal = lazy(() =>
  import(
    "deco-sites/hugo-estudos/components/personal-shopper/components/VideoModal.tsx"
  )
);

export interface Props {}

const PersonalShopperStream = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>();
  const [btnLoading, setBtnLoading] = useState(false);

  const handleClick = async () => {
    setBtnLoading(true);
    const { auth, profileData } = await checkAuth() as {
      auth: boolean;
      profileData: UserProfile;
    };

    if (!auth) {
      window.location.pathname = "/login";
    }

    setIsAuth(auth);
    setUserProfile(profileData);
    setBtnLoading(false);
  };

  return (
    <div>
      <Button loading={btnLoading} onClick={handleClick}>
        Video call a seller
      </Button>
      {isAuth && userProfile
        ? (
          <Suspense fallback={<Spinner />}>
            <VideoModal userProfile={userProfile} />
          </Suspense>
        )
        : <></>}
    </div>
  );
};

export default PersonalShopperStream;
