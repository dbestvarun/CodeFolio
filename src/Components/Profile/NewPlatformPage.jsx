import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const NewPlatformPage = () => {
    const [usernames, setUsernames] = useState({
        Leetcode: "",
        GeeksforGeeks: "",
        Codechef: "",
        Codeforces: "",
    });

    const handleInputChange = (platform, value) => {
        setUsernames((prevState) => ({
            ...prevState,
            [platform]: value,
        }));
    };

    const handleVerify = async (platform) => {
        let username = "";
        username += usernames[platform];
        console.log(platform)
        console.log(username)
        let response;

        try {
            if (platform === "Codechef") {
                response = await axios.get(`https://codechef-api.vercel.app/handle/${username}`);
            }
            if (platform === "Codeforces") {
                response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
            }
            if (platform === "Leetcode") {

                response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
            }
            if (platform === "GeeksforGeeks") {
                alert(`Verified Username for ${platform}: ${username}`);
                return;
            }

            console.log(response);

            if (response.status === 200) {
                alert(`Verified Username for ${platform}: ${username}`);
            }
        } catch (error) {
            console.error("Error verifying platform:", platform, error);

            alert(`Failed to verify ${platform} for username: ${username}. Please try again.`);
        }
    };

    const handleUpdate = async () => {
        try {
            console.log("Codechef:", usernames["Codechef"]);
            console.log("Codeforces:", usernames["Codeforces"]);
            console.log("Leetcode:", usernames["Leetcode"]);

            const verificationPromises = [
                axios.get(`https://codechef-api.vercel.app/handle/${usernames["Codechef"]}`),
                axios.get(`https://codeforces.com/api/user.info?handles=${usernames["Codeforces"]}`),
                axios.get(`https://leetcode-stats-api.herokuapp.com/${usernames["Leetcode"]}`)
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
            console.log("Authenticated user email:", user.email);

            const response = await axios.post('http://localhost:5000/api/profile', {
                email: user.email,
                codechef: usernames["Codechef"],
                codeforces: usernames["Codeforces"],
                leetcode: usernames["Leetcode"],
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
            console.log("Authenticated user email:", user.email);
            platform = platform.toLowerCase();
            const response = await axios.post('http://localhost:5000/api/profile/delete', {
                email: user.email,
                platform: platform,
            });
            handleInputChange(platform, "")
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



    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
                <h2 className="text-2xl font-bold mb-4">Platforms</h2>
                <p className="mb-6">You can update and verify your platform details here.</p>

                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl">📘</span>
                        <span className="font-medium">Leetcode</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="border rounded px-3 py-1 w-96"
                            placeholder="Enter your Leetcode URL"
                            value={usernames.Leetcode}
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
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="border rounded px-3 py-1 w-96"
                            placeholder="Enter your GeeksforGeeks URL"
                            value={usernames.GeeksforGeeks}
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
                        <span className="text-2xl">🧑‍🍳</span>
                        <span className="font-medium">Codechef</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="border rounded px-3 py-1 w-96"
                            placeholder="Enter your Codechef URL"
                            value={usernames.Codechef}
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

                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="flex items-center space-x-4">
                        <span className="text-2xl">⚡</span>
                        <span className="font-medium">Codeforces</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            className="border rounded px-3 py-1 w-96"
                            placeholder="Enter your Codeforces URL"
                            value={usernames.Codeforces}
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

                <div className="mt-6">
                    <button
                        onClick={() => handleUpdate()}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPlatformPage;
