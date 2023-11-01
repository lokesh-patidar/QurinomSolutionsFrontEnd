import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../Pages/Dashboard";
import { Box } from "@chakra-ui/react";
import { SideBar } from "../Components/Sidebar";
import { LoginPage } from "../Pages/Login";
import { RegisterPage } from "../Pages/Register";
import { ProductPage } from "../Pages/Product";

const AllRoute = () => {

  return (
    <Routes>
      <Route path={`/`} element={
        <Box width='100%'>
          <Box className='MainContainer'>
            <LoginPage />
          </Box>
        </Box>
      } />
      <Route path={`/register`} element={
        <Box width='100%'>
          <Box className='MainContainer'>
            <RegisterPage />
          </Box>
        </Box>
      } />
      <Route path={`/dashboard`} element={
        <Box width='100%'>
          <Box className='MainContainer'>
            <SideBar />
            <Dashboard />
          </Box>
        </Box>
      } />
      <Route path={`/products`} element={
        <Box width='100%'>
          <Box className='MainContainer'>
            <SideBar />
            <ProductPage />
          </Box>
        </Box>
      } />
    </Routes>
  );
};

export { AllRoute };