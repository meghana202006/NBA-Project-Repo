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
      console.log(res.data.message)
      alert(res.data.message)
  }catch(err){
       alert(err.response.data.message);
  }
}
    
  return (
    <>
      <div className="flex h-48 bg-amber-200 shadow-2xl justify-between items-center">
        <h1 className="text-[35px] font-medium text-slate-900 p-4 pl-10">
          Registration
        </h1>
        <div className="bg-slate-900 h-16 w-16 mr-8 flex items-center justify-center rounded-full shadow-2xl text-2xl text-white font-bold">
          A
        </div>
      </div>
      <div className="overflow-x-hidden bg-amber-100 p-2">
        <div className=" h-40 bg-cyan-950 rounded-t-md p-10 w-full mt-12 max-w-6xl mx-auto shadow-2xl border border-cyan-300">
          <h2 className="text-[23px] font-semibold text-white mt-3">
            Faculty Profile Registration
          </h2>
          <p className="text-gray-300 text-[16px] mt-3">
            Add new faculty members to the system
          </p>
        </div>
        <div className="bg-amber-100  min-h-screen max-w-6xl rounded-b-md mx-auto shadow-2xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-12 p-6">
            
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
              <select className={styles.inputField} name='designation' value={profileData.designation} onChange={handleChange}>
                <option selected >Select designation</option>
                <option value="Principal">Principal</option>
                <option value="HOD">HOD</option>
                <option value="Faculty">Faculty</option>
                <option value="Admin">Admin</option>
              </select>
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
            <div className="flex flex-col max-w-3xl max-h-3xl">
            <div className="flex items-center">
              
              <label className={selectStyles.labelBase}>
                
              Qualification
              </label>
          
            </div>
            <div className="flex flex-col mt-3 gap-6 p-6 w-full h-full bg-amber-50 border-2 border-gray-400 rounded-md">
                <FaGraduationCap className=" text-slate-500 text-[20px]"/>
               {["B.Tech", "M.Tech", "PhD"].map((degree) => {
                  const selected = profileData.qualification.find(
                  (q) => q.degree === degree
                  );

                return (
                        <div key={degree} className="grid grid-cols-[140px_1fr] gap-4 items-center ">
                          <label className="flex items-center gap-3 text-[17px] text-slate-700 font-medium">
                            <input
                              type="checkbox"
                              checked={!!selected}
                              onChange={() => handleQualificationChange(degree)}
                              className="w-5 h-5 accent-cyan-600"
                            />
                            <span>{degree}</span>
                          </label>

                          {selected && (
                            <select
                              className="h-10 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-cyan-500 text-slate-700 bg-white"
                              value={selected.branch}
                              onChange={(e) => handleBranchChange(degree, e.target.value)}
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
</div>

            
            <button
              className="w-48 h-12 bg-cyan-950 text-white rounded-2xl mt-15 block mx-auto hover:bg-cyan-900"
              onClick={handleSubmit}
            >
              Register
            </button>
          
          </div>
        </div>
     
  </>
  );

}
export default Registration;
