import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  Navbar,
  TextInput,
} from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { toggleTheme } from "../Redux/Slice/themeSlice";
import { useDispatch, useSelector } from "react-redux";

function Header(props) {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentuser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  return (
    <Navbar className="border-b-2">
      <div className="flex gap-2 md:order-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-violet-600 via-fuchsia-700 to-pink-500 rounded-lg text-white">
            Blogger
          </span>
        </Link>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/blogs"} as={"div"}>
            <Link to="/blogs">Blogs</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </div>

      <div className="flex gap-2 md:order-2">
        <form>
          <TextInput
            type="text"
            placeholder="Search"
            icon={CiSearch}
            className="hidden lg:inline"
          />
        </form>
        <Button
          className="w-12 h-10 lg:hidden text-dark"
          gradientDuoTone="purpleToPink"
          outline
          pill
        >
          <CiSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button
            className="w-12 h-10 hidden sm:inline"
            gradientDuoTone="purpleToPink"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </Button>
          {currentuser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentuser.rest.profilePicture}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {currentuser.rest.username}
                </span>
              </Dropdown.Header>
              <Link to="/dashboard?tab=profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <DropdownDivider />
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/signin">
              <Button gradientDuoTone="purpleToPink">SignIn</Button>
            </Link>
          )}

          <Navbar.Toggle />
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
