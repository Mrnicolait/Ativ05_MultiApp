// Importa hooks e componentes do React e bibliotecas externas.
import { useState, useEffect } from "react";
import {
  Route, Routes, Navigate, useNavigate, Link,
} from "react-router-dom";
import { Suspense, lazy } from 'react';
import Loading from './components/Pages/Loading';
import { useAuth } from './components/Contexts/AuthContext';
import styled from "styled-components";
import {
  FaQrcode,
  FaSearch,
  FaTasks,
  FaRegQuestionCircle,
  FaGlobeAmericas,
  FaNetworkWired,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";



import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Lazy loading dos componentes
const QRCodeGenerator = lazy(() => import("./components/Pages/QRCodeGenerator")); 
const IPAddressFinder = lazy(() => import('./components/Pages/IPAddressFinder'));
const MovieSearchEngine = lazy(() => import('./components/Pages/MovieSearchEngine'));
const TodoApp = lazy(() => import('./components/Pages/TodoApp'));
const QuizApp = lazy(() => import('./components/Pages/QuizApp'));
const LanguageTranslator = lazy(() => import('./components/Pages/LanguageTranslator'));
const LoginComponent = lazy(() => import('./components/Pages/Login'));
const Carrousell = lazy(() => import('./components/Pages/Carrousel'));

// Estiliza o contêiner principal do aplicativo.
const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
`;

// Estiliza o conteúdo principal do aplicativo.
const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// Estiliza a barra de navegação.
const NavBar = styled.div`
  width: 240px;
  background-color: #001EFF;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 3px 0 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  }
`;

// Estiliza o botão de alternância da barra de navegação.
const NavBarToggle = styled.div`
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Estiliza os links na barra de navegação.
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #34495e;
    color: #ecf0f1;
  }
`;

// Estiliza o rodapé do aplicativo.
const Footer = styled.div`
  width: 100%;
  background-color: #001EFF;
  color: white;
  text-align: center;
  padding: 10px 0;
  position: absolute;
  bottom: 0;

  @media (max-width: 768px) {
    padding: 5px 0;
    font-size: 12px;
  }
`;

// Estiliza o botão de retorno.
const ReturnButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Define o componente principal do aplicativo.
const App = () => {
  const { isAuth, logout } = useAuth(); // context de auth do usuario!
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsAuthenticated(isAuth);
  }, [isAuth]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleNavBar = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <AppContainer>
      {isAuthenticated && <>
      <NavBarToggle onClick={toggleNavBar}>
        <FaBars size={24} color="#2C3E50" />
      </NavBarToggle>
      <NavBar isOpen={isNavBarOpen}>
      <NavBarToggle onClick={toggleNavBar}>
        <FaBars size={24} color="#ffffff" style={{marginRight:'2.4em'}}/>
      </NavBarToggle>
            <StyledLink to="/qrcodegen">
          <FaQrcode /> QR Code Generator
        </StyledLink>
        <StyledLink to="/ipaddress">
          <FaNetworkWired /> IP Address Finder
        </StyledLink>
        <StyledLink to="/moviesearch">
          <FaSearch /> Movie Search
        </StyledLink>
        <StyledLink to="/todoapp">
          <FaTasks /> To Do App
        </StyledLink>
        <StyledLink to="/quizapp">
          <FaRegQuestionCircle /> Quiz App
        </StyledLink>
        <StyledLink to="/langtradutor">
          <FaGlobeAmericas /> Translator
        </StyledLink>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            color: "white",
            backgroundColor: "transparent",
            border: "none",
            textAlign:"start",
          }}
        >
          Logout
        </button>
      </NavBar>
      </>}
      <Suspense fallback={<Loading />}>
      <MainContent>  
        <Routes>
          <Route path="/" element={isAuthenticated ? <Carrousell /> : <Navigate to="/login" />} />
          <Route path="/qrcodegen" element={isAuthenticated ? <QRCodeGenerator /> : <Navigate to="/login" />} />
          <Route path="/quizapp" element={isAuthenticated ? <QuizApp /> : <Navigate to="/login" />} />
          <Route path="/langtradutor" element={isAuthenticated ? <LanguageTranslator /> : <Navigate to="/login" />} />
          <Route path="/moviesearch" element={isAuthenticated ? <MovieSearchEngine /> : <Navigate to="/login" />} />
          <Route path="/ipaddress" element={isAuthenticated ? <IPAddressFinder /> : <Navigate to="/login" />} />
          <Route path="/todoapp" element={isAuthenticated ? <TodoApp /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isAuthenticated ? <LoginComponent onLogin={() => setIsAuthenticated(true)} /> : 
    <Navigate to="/" />
  } 
/>
        </Routes>
        {isAuthenticated && <><ReturnButton onClick={handleReturn}><FaArrowLeft /> Return</ReturnButton></>}
        {isAuthenticated && <Footer>Developed by Marcelo Nicolait</Footer>}
      </MainContent>
      </Suspense>
    </AppContainer>
  );
}; 

// Exporta o componente App para ser utilizado em outras partes da aplicação.
export default App;
