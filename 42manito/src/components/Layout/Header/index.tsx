import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Drawer } from "antd";
import { RootState, useAppDispatch } from "@/RTK/store";
import { signIn } from "@/RTK/Slices/Global";
import { useSelector } from "react-redux";
import DarkModeToggleButton from "../DarkModeButton";
import SearchInput from "../../Search/SearchInput";
import DrawerContent from "./components/DrawerContent";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const Owner = useSelector(
    (state: RootState) => state.rootReducers.global.uId
  );
  const dispatch = useAppDispatch();

  const showDrawer = () => {
    setVisible(!visible);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (Owner === 0) {
      const id = localStorage.getItem("uid");
      if (id !== null) {
        dispatch(signIn(Number(id)));
      }
    }
    return () => {};
  }, [Owner, dispatch]);

  return (
    <>
      <header className="text-gray-600 body-font bg-gray-100 dark:bg-gray-900 w-full md:z-[9999]">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href="/"
            className="flex title-font font-medium items-center mb-4 md:mb-0"
          >
            <span className=" text-4xl hover:scale-105 hover:text-indigo-500">
              42Manito
            </span>
          </Link>
          <div className=" my-1 flex justify-center ml-10 ">
            <SearchInput />
          </div>
          <nav className="md:ml-auto flex flex-wrap items-center justify-center mt-5 md:mt-0">
            <button className="mr-5 btn-drawer" onClick={showDrawer}>
              <svg
                width="45px"
                height="45px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 7C5 6.44772 5.44772 6 6 6H18C18.5523 6 19 6.44772 19 7C19 7.55228 18.5523 8 18 8H6C5.44772 8 5 7.55228 5 7ZM5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12ZM5 17C5 16.4477 5.44772 16 6 16H18C18.5523 16 19 16.4477 19 17C19 17.5523 18.5523 18 18 18H6C5.44772 18 5 17.5523 5 17Z"
                />
              </svg>
            </button>
            <DarkModeToggleButton />
          </nav>
          <Drawer
            className="dark:bg-slate-600 px-4 fade-in md:pt-10"
            placement="right"
            closable={false}
            onClose={onClose}
            open={visible}
          >
            <DrawerContent />
          </Drawer>
        </div>
      </header>
    </>
  );
}
