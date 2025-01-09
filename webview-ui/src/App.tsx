import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { messageHandler } from "@estruyf/vscode/dist/client";

export interface IAppProps { }

export const App: React.FunctionComponent<IAppProps> = ({ }: React.PropsWithChildren<IAppProps>) => {

  return (
    <>
      <div className="w-full relative min-h-screen grow">
        <div className="w-full">
        </div>
      </div>
    </>
  );
};
