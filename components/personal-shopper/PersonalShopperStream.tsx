import { useState } from "preact/hooks";
import Button from "deco-sites/hugo-estudos/components/ui/Button.tsx";
import {
  checkAuth,
  UserProfile,
} from "deco-sites/hugo-estudos/components/personal-shopper/utils/utils.ts";
import { lazy, Suspense } from "preact/compat";
import Spinner from "deco-sites/hugo-estudos/components/ui/Spinner.tsx";
import useCategorySeller from "deco-sites/hugo-estudos/components/personal-shopper/hooks/useCategorySeller.tsx";

const VideoModal = lazy(() =>
  import(
    "deco-sites/hugo-estudos/islands/VideoModal.tsx"
  )
);

export interface Props {
  category: string;
}

const PersonalShopperStream = ({ category }: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>();
  const [btnLoading, setBtnLoading] = useState(false);
  const { hasSeller } = useCategorySeller(category);

  const handleClick = async () => {
    if (modalOpened) {
      setModalOpened(false);
      return;
    }
    if (!isAuth) {
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
    }
    setModalOpened(true);
    setBtnLoading(false);
  };

  return (
    <>
      {hasSeller
        ? (
          <div class="fixed bottom-[5%] right-[5%] z-50 flex flex-col items-end">
            {isAuth && userProfile
              ? (
                <Suspense fallback={<Spinner />}>
                  <VideoModal
                    userProfile={userProfile}
                    modalOpened={modalOpened}
                  />
                </Suspense>
              )
              : <></>}
            <Button
              class={`shadow-xl w-40 ${!modalOpened ? "animate-pulse" : ""}`}
              loading={btnLoading}
              onClick={handleClick}
            >
              Video call a seller
            </Button>
          </div>
        )
        : <></>}
    </>
  );
};

export default PersonalShopperStream;
