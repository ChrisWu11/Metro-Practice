// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type Profile = {
  name: string;
  avatar: string; // url
};

const PROFILE_STORAGE_KEY = "metro.profile";

const readStoredProfile = (): Profile => {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return { name: "", avatar: "" };
    const parsed = JSON.parse(raw);
    return { name: parsed.name || "", avatar: parsed.avatar || "" };
  } catch {
    return { name: "", avatar: "" };
  }
};

const writeStoredProfile = (profile: Profile) => {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
};

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarOptions, setAvatarOptions] = useState<string[]>([]);

  // Dynamically collect up to 3 avatar images from assets/users; fallback to existing assets
  useEffect(() => {
    const usersGlob = import.meta.glob(
      "../assets/users/*.{png,jpg,jpeg,webp}",
      { eager: true, as: "url" }
    );
    const urls = Object.values(usersGlob) as string[];
    const fallbacksGlob = import.meta.glob("../assets/*.{png,jpg,jpeg,webp}", {
      eager: true,
      as: "url",
    });
    const fallbackUrls = Object.values(fallbacksGlob) as string[];

    const unique = Array.from(
      new Set([...(urls || []), ...(fallbackUrls || [])])
    );
    setAvatarOptions(unique.slice(0, 3));
  }, []);

  useEffect(() => {
    const existing = readStoredProfile();
    setName(existing.name || "");
    setAvatar(existing.avatar || "");
  }, []);

  const canSave = useMemo(
    () => name.trim().length > 0 && avatar,
    [name, avatar]
  );

  const handleSave = () => {
    if (!canSave) return;
    writeStoredProfile({ name: name.trim(), avatar });
    navigate(-1);
  };

  return (
    <main className="pt-3 pb-40 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#F2F3F8] rounded-xl shadow-card p-4 mb-4">
          <div className="text-3xl font-light mb-4">Choose Avatar</div>
          <div className="flex items-center gap-4">
            {avatarOptions.map((url) => (
              <button
                key={url}
                className={`rounded-full border-2 ${
                  avatar === url ? "border-[#0175CA]" : "border-transparent"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setAvatar(url);
                }}
              >
                <img
                  src={url}
                  alt="avatar"
                  className="w-20 h-20 object-cover rounded-full"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#F2F3F8] rounded-xl shadow-card p-4 mb-6">
          <div className="text-3xl font-light mb-3">Your Name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-white rounded-md px-3 py-2 text-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0175CA]"
          />
        </div>

        <button
          className={`w-full py-3 rounded-md text-white ${
            canSave ? "bg-[#0175CA]" : "bg-gray-400"
          }`}
          disabled={!canSave}
          onClick={(e) => {
            e.stopPropagation();
            handleSave();
          }}
        >
          Save
        </button>
      </div>
    </main>
  );
};

export default EditProfile;
