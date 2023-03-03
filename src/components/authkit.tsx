import {
  SafeAuthKit,
  SafeAuthProviderType,
  SafeAuthSignInData,
} from "@safe-global/auth-kit";
import { useEffect, useState } from "react";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { AuthkitBar } from "./authkitBar";

export default function AuthKit() {
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
    useState<SafeAuthSignInData | null>(null);
  const [safeAuth, setSafeAuth] = useState<SafeAuthKit>();
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  useEffect(() => {
    (async () => {
      setSafeAuth(
        await SafeAuthKit.init(SafeAuthProviderType.Web3Auth, {
          chainId: "0x5",
          authProviderConfig: {
            rpcTarget:
              "https://polygon-mumbai.infura.io/v3/08d4d04dfa414956830e2cea15a0f88f" ||
              "",
            clientId:
              "BE8x_Lworc5JG3zmCwizwQ7NTp_GKxz84ip8jhC-ZjdHy34y6filfe6q7WqCxNzhYdGx8btVuc4kZgujS6dMEM4" ||
              "",
            network: "testnet",
            theme: "dark",
          },
        })
      );
    })();
  }, []);

  const login = async () => {
    if (!safeAuth) return;

    const response = await safeAuth.signIn();
    console.log("SIGN IN RESPONSE: ", response);

    setSafeAuthSignInResponse(response);
    setProvider(safeAuth.getProvider() as SafeEventEmitterProvider);
  };

  const logout = async () => {
    if (!safeAuth) return;

    await safeAuth.signOut();

    setProvider(null);
    setSafeAuthSignInResponse(null);
  };

  return (
    <>
      <AuthkitBar onLogin={login} onLogout={logout} isLoggedIn={!!provider} />
    </>
  );
}
