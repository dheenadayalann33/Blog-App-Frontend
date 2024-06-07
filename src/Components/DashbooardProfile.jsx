import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import { Alert, Button, TextInput } from "flowbite-react";
  import React, { useEffect, useRef, useState } from "react";
  import { useSelector } from "react-redux";
  import { app } from "../firebase";
  import { CircularProgressbar } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  import { HiInformationCircle } from "react-icons/hi";
  
  const DashboardProfile = () => {
    const { currentuser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    };
  
    useEffect(() => {
      if (imageFile) {
        uploadImage();
      }
    }, [imageFile]);
  
    //firbase image upload and storage part
    const uploadImage = async () => {
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0)); //10.6794764
        },
        (error) => {
          setImageFileUploadError(
            "Could not upload the image (File size must be less than 2MB"
          );
          setImageFileUrl(null);
          setImageFileUploadProgress(null);
          setImageFile(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
          });
        }
      );
    };
    return (
      <div className="max-w-lg mx-auto p-4 w-full">
        <h1 className="my-7 text-center font-semibold text-4xl">Profile</h1>
        <form className="flex flex-col gap-5">
          <input
            type="file"
            accept="image/*"
            ref={filePickerRef}
            onChange={handleImageChange}
            hidden
          />
          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62,152,190,${imageFileUploadProgress / 100})`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentuser.rest.profilePicture}
              alt="user"
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-60"
              }`}
            />
          </div>
          {imageFileUploadError && (
            <Alert color="failure" icon={HiInformationCircle} className="mt-5">
              <span className="font-medium me-2">🥴OOPS!</span>
              {imageFileUploadError}
            </Alert>
          )}
          <TextInput
            type="text"
            id="username"
            placeholder="UserName"
            defaultValue={currentuser.rest.username}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentuser.rest.email}
          />
          <TextInput type="password" id="password" placeholder="********" />
          <Button type="submit" gradientDuoTone="purpleToPink">
            Update
          </Button>
        </form>
        <div className="text-red-600 flex justify-between mt-5">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </div>
    );
  };
  
  export default DashboardProfile;