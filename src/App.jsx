import React, { useRef, useEffect } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function App() {
  const zpRef = useRef(null);
  const userID = "user" + Math.floor(Math.random() * 1000);
  const userName = "App_" + userID;
  const appID = 518925826;
  const serverSecret = "f2a185bfd0c0f5cf8626173b35b64b58";

  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    null,
    userID,
    userName
  );

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });
    zpRef.current = zp;
  }, [TOKEN]);

  function invite(callType) {
    const targetUserID = prompt("Enter callee userId");
    const targetUserName = prompt("Enter callee userName");

    if (!targetUserID || !targetUserName) {
      alert("Both userID and userName are required!");
      return;
    }

    const targetUser = { userID: targetUserID, userName: targetUserName };

    if (!zpRef.current) return console.warn("ZP not initialized");

    zpRef.current.sendCallInvitation({
      callees: [targetUser],
      callType,
      timeout: 60,
    })
    .then((res) => console.warn("Success:", res))
    .catch((err) => console.warn("Error:", err));
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#1a2229] to-[black] flex items-center justify-center">
      <div className="w-[500px] h-[400px] bg-[#0d1014] border-2 border-[#313030] flex flex-col items-center justify-center gap-[20px]">
        <h2 className="text-white text-[20px]">
          <span className="text-blue-500">User Name </span>: {userName}
        </h2>
        <h2 className="text-white text-[20px]">
          <span className="text-blue-500">User Id </span>: {userID}
        </h2>

        <button
          className="w-[200px] h-[50px] bg-white text-black text-[20px] rounded-2xl"
          onClick={() => {
            invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall);
          }}
        >
          Voice Call
        </button>
        <button
          className="w-[200px] h-[50px] bg-white text-black text-[20px] rounded-2xl"
          onClick={() => {
            invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
          }}
        >
          Video Call
        </button>
      </div>
    </div>
  );
}

export default App;
