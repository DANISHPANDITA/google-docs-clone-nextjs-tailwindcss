/** @format */
import Button from "@material-tailwind/react/Button";
import Dropdown from "@material-tailwind/react/Dropdown";
import Icon from "@material-tailwind/react/Icon";
import { Avatar, Tooltip } from "@material-ui/core";
import {
  FolderOpenRounded,
  SortByAlphaRounded,
  ViewComfyRounded,
} from "@material-ui/icons";
import { signOut } from "next-auth/client";

function Header({ img }) {
  const logoURL =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BJvwmM31sH8VLt-99CPszkm9u9_itH1U2w&usqp=CAU";
  return (
    <div className="flex flex-col w-screen">
      <div className="flex flex-row items-center w-screen top-0 sticky z-50 justify-between px-8 py-2 xs:px-2 xs:py-1">
        <div className="flex flex-row items-center space-x-3">
          <Button
            color="gray"
            buttonType="outline"
            size="regular"
            rounded={true}
            block={false}
            iconOnly={true}
            ripple="dark"
            className=" !border-0 h-20 w-20 xs:hidden">
            <Icon name="menu" size="2xl" />
          </Button>
          <div className="flex flex-row items-center hover:underline hover:cursor-pointer">
            <img
              src={logoURL}
              alt="logo"
              className="h-10 w-10  bg-transparent"
            />
            <p className="text-2xl font-serif text-gray-600 font-normal md:text-xl sm:text-xl xs:text-xl">
              Docs
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center w-7/12 -400 py-1 px-2 rounded-xl border border-gray-100 xs:w-5/12 focus-within:shadow-xl">
          <Button
            color="gray"
            buttonType="outline"
            size="regular"
            rounded={true}
            block={false}
            iconOnly={true}
            ripple="dark"
            className=" border-0 h-20 w-20 ">
            <Icon name="search" size="2xl" />
          </Button>
          <input
            className="font-serif bg-transparent outline-none py-1 w-full ml-2 text-xl text-gray-600 xs:ml-1 xs:text-sm"
            placeholder="Search"
          />
        </div>
        <div className="flex flex-row items-center space-x-4">
          <Button
            color="gray"
            buttonType="outline"
            size="regular"
            rounded={true}
            block={false}
            iconOnly={true}
            ripple="dark"
            className=" border-0 h-20 w-20 xs:hidden">
            <Icon name="apps" size="2xl" />
          </Button>
          <Tooltip title="Logout">
            <Avatar
              onClick={() => signOut()}
              className="hover:cursor-pointer"
              src={img}
              alt=""
            />
          </Tooltip>
        </div>
      </div>

      <div className="mt-8 flex flex-row items-center justify-between text-base font-semibold text-gray-600 w-3/5 mx-auto sm:w-4/5 xs:w-4/5">
        <p>Earlier</p>
        <div className="flex flex-row items-center space-x-8 ml-56 sm:hidden xs:hidden">
          <Dropdown
            color="gray"
            placement="bottom-start"
            buttonText="Owned by anyone"
            buttonType="link"
            size="regular"
            rounded={false}
            block={false}
            ripple="dark"
          />

          <p>Last opened by me</p>
        </div>
        <div className="flex flex-row items-center space-x-4 sm:hidden xs:hidden">
          <ViewComfyRounded />
          <SortByAlphaRounded />
          <FolderOpenRounded />
        </div>
      </div>
    </div>
  );
}

export default Header;
