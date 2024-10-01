import { useState } from "react";

const voices = [
  { name: "Voice 1", audio: "audio1" },
  { name: "Voice 2", audio: "audio2" },
  { name: "Voice 3", audio: "audio3" },
  { name: "Voice 4", audio: "audio4" },
  { name: "Voice 5", audio: "audio5" },
  { name: "Voice 6", audio: "audio6" },
];

export default function VoiceSettings() {
  const [activeVoice, setActiveVoice] = useState<(typeof voices)[0]>();

  return (
    <div className="h-full overflow-y-auto text-black overflow-x-hidden w-full relative px-4 sm:px-6 flex">
      <div className="mx-auto max-w-xs w-full mt-14">
        <h3 className="text-lg font-oracle text-center text-gpt-green-dark/80">
          Choose a voice for TalkHealthAI
        </h3>

        <div className="w-full mt-8 grid grid-cols-1 gap-y-4">
          {voices.map((voice) => {
            return (
              <VoiceSettingButton
                key={voice.name}
                onClick={() => setActiveVoice(voice)}
                isActive={voice.name === activeVoice?.name}
              >
                {voice.name}
              </VoiceSettingButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VoiceSettingButton({
  isActive,
  children,
  onClick,
}: {
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border py-3 px-6 text-lg font-oracle w-full text-gpt-green-dark/80 duration-500 transition-colors ${
        isActive
          ? "bg-black/10 border-transparent"
          : "bg-transparent hover:bg-gpt-green-dark/5 border-gpt-green-dark/10"
      }`}
    >
      {children}
    </button>
  );
}
