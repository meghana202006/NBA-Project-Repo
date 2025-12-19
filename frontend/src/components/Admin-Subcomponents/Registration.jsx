import React, { useState } from "react";
import { registerStyles as styles , selectStyles} from "../../styles/tailwindClasses";
import axios from "axios"

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
    qualification: [],
  });
  const branchOptions = {
    'B.Tech': ["CSE","ECE","MECH","ARCH","IT","CIVIL"],
    'M.Tech':["CSE","ECE","MECH","ARCH","IT","CIVIL"],
    'PhD':["CSE","ECE","MECH","ARCH","IT","CIVIL"]

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleQualificationChange = (degree) => {
  setProfileData((prevData) => {
    const exists = prevData.qualification.find(
      (q) => q.degree === degree
    );

    if (exists) {
      return {
        ...prevData,
        qualification: prevData.qualification.filter(
          (q) => q.degree !== degree
        ),
      };
    } else {
      return {
        ...prevData,
        qualification: [
          ...prevData.qualification,
          { degree, branch: "" },
        ],
      };
    }
  });
};
  const handleBranchChange = (degree, branch) => {
  setProfileData((prev) => ({
    ...prev,
    qualification: prev.qualification.map((q) =>
      q.degree === degree ? { ...q, branch } : q
    ),
  }));
};

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res =  await axios.post("http://localhost:5000/api/users/register",
        profileData);

      alert(res.json)
  }catch(err){
      alert(err)
  }
}
    
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
        <div className="bg-amber-100  h-220 rounded-b-md ml-60 mr-60 shadow-2xl p-12">
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
          
            <div className="flex flex-col gap-6 pl-8 w-125 h-80 bg-amber-50 border-2 border-gray-400 rounded-md">
                <label className={selectStyles.labelBase}>
                <FaGraduationCap className="absolute text-slate-500 text-[20px] left-0 top-3"/>
              Qualification
              </label>
               {["B.Tech", "M.Tech", "PhD"].map((degree) => {
                  const selected = profileData.qualification.find(
                  (q) => q.degree === degree
                  );

                return (
                        <div key={degree} className="flex gap-2">
                            {/* Checkbox */}
                          <label className="flex items-center gap-3 text-[18px] text-slate-700">
                                <input
                                 type="checkbox"
                                 checked={!!selected}
                                 onChange={() => handleQualificationChange(degree)}
                                 className="w-4 h-4"
                                />
                            <span className="font-medium">{degree}</span>
                          </label>
                  
        {/* Branch dropdown (only if checked) */}
        
        {selected && (
          
          <select
            className={selectStyles.inputField}
            value={selected.branch}
            onChange={(e) =>
              handleBranchChange(degree, e.target.value)
            }
          >
            <option value="">Select branch</option>
            {branchOptions[degree].map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        )}
        
      </div>
    );
  })}
</div>
</div>

            
            <button
              className="w-48 h-12 bg-cyan-950 text-white rounded-2xl mt-10 block mx-auto hover:bg-cyan-900"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </div>
      </div>
  
  );

}
export default Registration;
