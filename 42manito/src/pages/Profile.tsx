import Enroll from "@/components/enroll/Enroll";
import Layout from "@/components/layout/Layout";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import TypeIt from "typeit-react";
import HobbyAnimation from "@/components/global/HobbyAnimation";
import DevelopAnimation from "@/components/global/DevelopAnimation";
import ProfileTypo from "@/components/Profile/ProfileTypo";
import ProfileUpdate from "@/components/Profile/ProfileUpdate";
import { useGetUserQuery } from "@/RTK/Apis/User";
import { useSelector } from "react-redux";
import { RootState } from "@/RTK/store";

const Profile = () => {
  const [isProfileUpdateOpen, setIsProfileUpdateOpen] = useState(false);
  const ownerId = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const {
    data: OwnerData,
    isError: OwnerError,
    isLoading: OwnerLoading,
    refetch,
  } = useGetUserQuery({ id: ownerId ?? 1 }); // 추후에 로그인한 유저의 id인데 GlobalSlice에 있는 id로 해야함

  const openProfileUpdate = () => {
    setIsProfileUpdateOpen(true);
  };

  const closeProfileUpdate = useCallback(() => {
    setIsProfileUpdateOpen(false);
  }, []);

  useEffect(() => {
    if (isProfileUpdateOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isProfileUpdateOpen]);

  // TODO: 로그인 상태가 아니면 로그인 페이지로 이동
  // TODO: 멘토가 아니라면  멘토 등록 알람 띄우기
  return (
    <Layout>
      {OwnerData && !OwnerLoading && (
        <div className="app-container pt-32 min-h-screen">
          {OwnerData.isMentor ? (
            <div className="">
              <div className="w-full flex justify-end ">
                <button
                  className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => openProfileUpdate()}
                >
                  수정하기
                </button>
              </div>
              <div className="flex flex-wrap w-full items-center justify-center">
                <Image
                  alt="ProfileImage"
                  src={OwnerData.profileImage}
                  width={200}
                  height={200}
                  quality={100}
                  style={{ borderRadius: "50%" }}
                />
                <div className="mx-10">
                  <div className="" id="Count">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <TypeIt
                          options={{
                            loop: false,
                            speed: 50,
                            waitUntilVisible: true,
                            cursor: false,
                          }}
                        >
                          <span className="text-3xl font-bold block uppercase tracking-wide text-slate-800 dark:text-slate-200">
                            19
                          </span>
                        </TypeIt>
                        <span className="text-xl text-slate-600 dark:text-slate-400">
                          Month.
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <TypeIt
                          options={{
                            loop: false,
                            speed: 50,
                            waitUntilVisible: true,
                            cursor: false,
                          }}
                        >
                          <span className="text-3xl font-bold block uppercase tracking-wide text-slate-800 dark:text-slate-200">
                            2345
                          </span>
                        </TypeIt>

                        <span className="text-xl text-slate-600 dark:text-slate-400">
                          Total.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl font-bold flex justify-center items-center">
                    {OwnerData.nickname}
                  </div>
                  <div className="text-2xl mt-14">
                    {OwnerData.mentorProfile.description}
                  </div>
                </div>
              </div>
              <div className="grid grid-rows-2">
                <div className="grid gird-rows-2 lg:grid-cols-2 justify-center w-full my-3 md:my-28 max-h-[40vh]">
                  <div className="flex flex-col justify-center items-center ">
                    <span className="text-3xl font-bold text-slate-800 dark:text-slate-200 h-[5vh]">
                      카테고리.
                    </span>
                    {OwnerData.mentorProfile.categories[0].name ===
                    "DEVELOP" ? (
                      <DevelopAnimation />
                    ) : (
                      <HobbyAnimation />
                    )}
                  </div>
                  <div className="flex flex-col justify-between items-center md:ml-24 w-[40vh] h-[40vh] overflow-y-auto">
                    <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                      해시태그.
                    </span>
                    <div className="flex flex-col overflow-y-auto">
                      {OwnerData.mentorProfile.hashtags.map((aTag) => (
                        <h6
                          className="m-3 p-3 rounded-md bg-sky-200 dark:bg-sky-700 "
                          key={aTag.id}
                        >
                          {aTag.name}
                        </h6>
                      ))}
                    </div>
                  </div>
                </div>
                <Enroll viewProfileTypo={OwnerData.isMentor} />
              </div>
            </div>
          ) : (
            <div>
              <Enroll viewProfileTypo={OwnerData?.isMentor} />
            </div>
          )}
        </div>
      )}
      {isProfileUpdateOpen && (
        <ProfileUpdate onClose={closeProfileUpdate} data={OwnerData} />
      )}
    </Layout>
  );
};

export default Profile;
