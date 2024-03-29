import { Link, useHistory } from "react-router-dom";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import styled from "styled-components";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import routes from "../../routes";
import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, isLoggedInVar, logUserOut } from "../../apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Wrapper = styled.div`
  padding: 12px 0;
  max-width: ${(props) => props.theme.maxW};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.light};
`;

const Left = styled.div`
  width: 110px;
`;

const Right = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 900;
  margin-right: 25px;
  cursor: pointer;
`;

const Search = styled.div`
  width: 100%;
`;

const Input = styled.div`
  position: relative;
  display: flex;
  justify-content: right;
  margin-right: 25px;
  input {
    padding: 1px 20px 1px 36px;
    display: flex;
    color: black;
    font-size: 15px;
    font-weight: 800;
    background-color: white;
    border: 1px soild ${(props) => props.theme.borderColor};
    width: 250px;
    min-width: 250px;
    height: 30px;
    border-radius: 15px;
  }
  span {
    color: ${(props) => props.theme.dark};
    position: absolute;
    font-size: 18px;
    top: 6px;
    right: 280px;
  }
`;

function Header() {
  const history = useHistory();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDark = useReactiveVar(darkModeVar);
  const { data } = useUser();
  const navVariants = {
    top: {
      backgroundColor: "rgba(0,0,0,0)",
    },
    scroll: {
      backgroundColor: isDark ? "rgba(1, 1, 1, 1)" : "#B55E28",
    },
    toggleDarkMode: {
      backgroundColor: isDark ? "rgba(1, 1, 1, 1)" : "#B55E28",
    },
  };
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 20) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
    if (scrollY.get() > 20) {
      navAnimation.start("toggleDarkMode");
    }
  }, [scrollY, navAnimation, isDark]);
  const { register, handleSubmit } = useForm();
  const onSubmitValid = (data) => {
    const { search } = data;
    if (search.match(/^#[ㄱ-ㅎ|가-힣|a-z|A-Z|]+/g)) {
      history.push(`/categories/${search.split("#")[1]}`);
    } else {
      history.push(`/search/shop?keyword=${search}`);
    }
  };
  return (
    <Container
      variants={navVariants}
      animate={navAnimation}
      transition={{ duration: 0.05 }}
    >
      <Wrapper>
        <Left>
          <Link to={routes.home}>
            <Logo />
          </Link>
        </Left>
        <Right>
          <Search>
            <form onSubmit={handleSubmit(onSubmitValid)}>
              <Input>
                <span>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input
                  {...register("search")}
                  type="text"
                  placeholder="카페 이름, #카테고리 검색"
                />
              </Input>
            </form>
          </Search>
          <RightMenu>
            <Link to={`/categories`}>
              <span>Category</span>
            </Link>
          </RightMenu>
          <RightMenu>
            {isLoggedIn ? (
              <Link to={`/profile/${data?.me?.username}`}>
                <span>Profile</span>
              </Link>
            ) : (
              <Link to={routes.login}>
                <span>Login</span>
              </Link>
            )}
          </RightMenu>
          {isLoggedIn ? (
            <RightMenu onClick={logUserOut}>
              <span>Logout</span>
            </RightMenu>
          ) : null}
          <DarkMode />
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Header;
