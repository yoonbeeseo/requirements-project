import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import Project from "./pages/Project/Project";
import RequirementPage from "./pages/Requirement/RequirementPage";
import RDetailPage from "./pages/RDetail/RDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="signin" Component={AuthPage} />
        <Route path="project">
          <Route index Component={Project} />
          <Route path=":projectId">
            <Route index Component={RequirementPage} />
            <Route path=":rid" Component={RDetailPage} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
