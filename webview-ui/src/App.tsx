import React, { useState } from "react";
import { axiosInstance } from "./api/axios";
import { CreateAccount } from "./pages/createAccount";

export interface IAppProps { }

export const App: React.FunctionComponent<IAppProps> = ({ }: React.PropsWithChildren<IAppProps>) => {
  const [privateKey, setPrivateKey] = useState<string>("");
  const [seedPhrase, setSeedPhrase] = useState<string>("");

  const handleGeneratePrivateKey = async () => {
    const resp = await axiosInstance.post("/wallet/private-key")

    const json = resp.data

    setPrivateKey(json.data.privateKey)
  }


  const handleGenerateSeedPhrase = async () => {
    const resp = await axiosInstance.post("/wallet/seed-phrase")

    const json = resp.data

    setSeedPhrase(json.data.seedPhrase)
  }

  return (

    <div className="w-full p-6 bg-black rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Cardano Easy DevTool</h1>

      <div className="flex flex-col gap-6">
        <CreateAccount handleGeneratePrivateKey={handleGeneratePrivateKey} handleGenerateSeedPhrase={handleGenerateSeedPhrase} privateKey={privateKey} seedPhrase={seedPhrase} />
      </div>
    </div>
  );
};
