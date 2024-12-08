import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";

const NewPlatformPage = () => {
    const [usernames, setUsernames] = useState({
        Leetcode: { value: "", verified: false },
        GeeksforGeeks: { value: "", verified: false },
        Codechef: { value: "", verified: false },
        Codeforces: { value: "", verified: false },
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (platform, value) => {
        setUsernames((prevState) => ({
            ...prevState,
            [platform]: {
                ...prevState[platform],
                value: value,
            },
        }));
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const token = Cookies.get("user");
                if (!token) {
                    alert("User is not authenticated.");
                    return;
                }

                const user = jwtDecode(token);
                const response = await axios.post("http://localhost:5000/api/profile/info", {
                    email: user.email,
                });

                if (response.status === 200) {
                    const { codechef, codeforces, leetcode, geeksforgeeks } = response.data.user;
                    setUsernames((prevState) => ({
                        Leetcode: { value: leetcode || "", verified: !!leetcode },
                        GeeksforGeeks: { value: geeksforgeeks || "", verified: !!geeksforgeeks },
                        Codechef: { value: codechef || "", verified: !!codechef },
                        Codeforces: { value: codeforces || "", verified: !!codeforces },
                    }));
                } else {
                    console.error("Failed to fetch profile data");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleVerify = async (platform) => {
        let username = usernames[platform].value;
        if (!username) {
            alert(`Please enter a username for ${platform}`);
            return;
        }

        try {
            let response;
            if (platform === "Codechef") {
                response = await axios.get(`https://codechef-api.vercel.app/handle/${username}`);
            } else if (platform === "Codeforces") {
                response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
            } else if (platform === "Leetcode") {
                response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
            } else if (platform === "GeeksforGeeks") {
                alert(`Verified Username for ${platform}: ${username}`);
                setUsernames((prevState) => ({
                    ...prevState,
                    [platform]: {
                        ...prevState[platform],
                        verified: true,
                    },
                }));
                return;
            }

            if (response.status === 200) {
                alert(`Verified Username for ${platform}: ${username}`);
                setUsernames((prevState) => ({
                    ...prevState,
                    [platform]: {
                        ...prevState[platform],
                        verified: true,
                    },
                }));
            }
        } catch (error) {
            console.error("Error verifying platform:", platform, error);
            alert(`Failed to verify ${platform} for username: ${username}. Please try again.`);
        }
    };

    const handleUpdate = async () => {
        try {
            const verificationPromises = [
                axios.get(`https://codechef-api.vercel.app/handle/${usernames["Codechef"].value}`),
                axios.get(`https://codeforces.com/api/user.info?handles=${usernames["Codeforces"].value}`),
                axios.get(`https://leetcode-stats-api.herokuapp.com/${usernames["Leetcode"].value}`)
            ];

            const [response1, response2, response3] = await Promise.allSettled(verificationPromises);

            if (
                response1.status !== "fulfilled" ||
                response2.status !== "fulfilled" ||
                response3.status !== "fulfilled"
            ) {
                const failedPlatforms = [];
                if (response1.status !== "fulfilled") failedPlatforms.push("Codechef");
                if (response2.status !== "fulfilled") failedPlatforms.push("Codeforces");
                if (response3.status !== "fulfilled") failedPlatforms.push("Leetcode");

                alert(`Verification failed for: ${failedPlatforms.join(", ")}`);
                return;
            }

            const user = jwtDecode(Cookies.get('user'));
            if (!user || !user.email) {
                alert("User is not authenticated.");
                return;
            }

            const response = await axios.post('http://localhost:5000/api/profile', {
                email: user.email,
                codechef: usernames["Codechef"].value,
                codeforces: usernames["Codeforces"].value,
                leetcode: usernames["Leetcode"].value,
                geeksforgeeks: usernames["GeeksforGeeks"].value,
            });

            if (response.status === 200) {
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating your profile. Please try again.");
        }
    };

    const handleDelete = async (platform) => {
        try {
            const user = jwtDecode(Cookies.get('user'));
            if (!user || !user.email) {
                alert("User is not authenticated.");
                return;
            }

            let Lplatform = platform.toLowerCase();
            const response = await axios.post('http://localhost:5000/api/profile/delete', {
                email: user.email,
                platform: Lplatform,
            });

            if (response.status === 200) {
                setUsernames((prevState) => ({
                    ...prevState,
                    [platform]: {
                        ...prevState[platform],
                        value: "",
                        verified: false,
                    },
                }));
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred while updating your profile. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Platforms</h2>
                <p className="mb-6">You can update and verify your platform details here.</p>

                {/* Hardcoded platform sections */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl">📘</span>
                        <span className="font-medium">Leetcode</span>
                        {usernames.Leetcode.verified && <span className="text-green-500">✔️</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="border rounded px-3 py-1 w-96"
                            placeholder="Enter your Leetcode URL"
                            value={usernames.Leetcode.value}
                            onChange={(e) => handleInputChange("Leetcode", e.target.value)}
                        />
                        <button
                            onClick={() => handleVerify("Leetcode")}
                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                            Verify
                        </button>
                        <button
                            onClick={() => handleDelete("Leetcode")}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl">🟢</span>
                        <span className="font-medium">GeeksforGeeks</span>
                        {usernames.GeeksforGeeks.verified && <span className="text-green-500">✔️</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="border rounded px-3 py-1 w-96"
                            placeholder="Enter your GeeksforGeeks URL"
                            value={usernames.GeeksforGeeks.value}
                            onChange={(e) => handleInputChange("GeeksforGeeks", e.target.value)}
                        />
                        <button
                            onClick={() => handleVerify("GeeksforGeeks")}
                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                            Verify
                        </button>
                        <button
                            onClick={() => handleDelete("GeeksforGeeks")}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl">🟥</span>
                        <span className="font-medium">Codechef</span>
                        {usernames.Codechef.verified && <span className="text-green-500">✔️</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="border rounded px-3 py-1 w-96"
                            placeholder="Enter your Codechef URL"
                            value={usernames.Codechef.value}
                            onChange={(e) => handleInputChange("Codechef", e.target.value)}
                        />
                        <button
                            onClick={() => handleVerify("Codechef")}
                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                            Verify
                        </button>
                        <button
                            onClick={() => handleDelete("Codechef")}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl">⚙️</span>
                        <span className="font-medium">Codeforces</span>
                        {usernames.Codeforces.verified && <span className="text-green-500">✔️</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="border rounded px-3 py-1 w-96"
                            placeholder="Enter your Codeforces URL"
                            value={usernames.Codeforces.value}
                            onChange={(e) => handleInputChange("Codeforces", e.target.value)}
                        />
                        <button
                            onClick={() => handleVerify("Codeforces")}
                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                            Verify
                        </button>
                        <button
                            onClick={() => handleDelete("Codeforces")}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleUpdate}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default NewPlatformPage;
