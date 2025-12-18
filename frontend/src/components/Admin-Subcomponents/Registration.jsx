import React, { useState } from "react";
import { registerStyles as styles } from "../../styles/tailwindClasses";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaBuilding,
  FaGraduationCap,
} from "react-icons/fa";
function Registration() {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    password: "",
    designation: "",
    department: "",
    qualification: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileData);
  };
  return (
    <div className="flex flex-col h-screen overflow-x-hidden items-center bg-amber-200 justify-center">
      <div className="w-screen overflow-x-hidden h-40 shadow-2xl flex space-x-230 ">
        <h1 className="text-3xl text-slate-900 p-4 pl-60 font-medium mt-5">
          Registration
        </h1>
        <div className="bg-slate-900 h-16 w-16 mt-6 ml-8 flex items-center justify-center rounded-full shadow-2xl text-2xl text-white font-bold">
          A
        </div>
      </div>
      <div className="w-screen overflow-x-hidden bg-amber-100 p-3">
        <div className=" h-40 bg-cyan-950 rounded-t-md p-10 mt-12 ml-60 mr-60 shadow-2xl border border-cyan-300">
          <h2 className="text-[23px] font-semibold text-white mt-3">
            Faculty Profile Registration
          </h2>
          <p className="text-gray-300 text-[16px] mt-3">
            Add new faculty members to the system
          </p>
        </div>
        <div className="bg-amber-100  h-180 rounded-b-md ml-60 mr-60 shadow-2xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <label className={styles.labelBase}>
              Name
              <FaUser className="absolute left-3 top-15 text-slate-500 text-[25px]" />
              <input
                className={styles.inputField}
                name="username"
                value={profileData.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </label>
            <label className={styles.labelBase}>
              Email id
              <FaEnvelope className="absolute left-3 top-15 text-slate-500  text-[25px]" />
              <input
                className={styles.inputField}
                name="email"
                value={profileData.email}
                onChange={handleChange}
                placeholder="Enter email id"
              />
            </label>
            <label className={styles.labelBase}>
              Password
              <FaLock className="absolute left-3 top-15 text-slate-500 text-[25px]" />
              <input
                className={styles.inputField}
                name="password"
                value={profileData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </label>
            <label className={styles.labelBase}>
              Designation
              <FaIdCard
                className="absolute left-3 top-15 text-slate-500 text-[25px]"
               
              />
              <input
                className={styles.inputField}
                name="designation"
                value={profileData.designation}
                onChange={handleChange}
                 placeholder="Enter designation"
              />
            </label>
            <label className={styles.labelBase}>
              Department
              <FaBuilding className="absolute left-3 top-15 text-slate-500 text-[25px]" />
              <select
                className={styles.inputField}
                name="department"
                value={profileData.department}
                onChange={handleChange}
                 placeholder="Enter department"
              >
                <option selected>Select department</option>
                <option value="CS">Computer Science Engg</option>
                <option value="EC">ELectronics & Communication Engg</option>
                <option value="MECH">Mechanical Engg</option>
                <option value="CIVIL">Civil Engg</option>
                <option value="ARCH">Architecture</option>
              </select>
            </label>
            <label className={styles.labelBase}>
              Qualification
              <FaGraduationCap className="absolute left-3 top-15 text-slate-500 text-[25px]" />
              <input
                className={styles.inputField}
                name="qualification"
                value={profileData.qualification}
                onChange={handleChange}
                placeholder="Enter qualification"
              />
            </label>
            <button
              className="w-48 h-12 bg-cyan-950 text-white rounded-2xl mt-10 block mx-auto hover:bg-cyan-900"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
