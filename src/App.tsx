import { BrowserRouter, Route, Routes } from "react-router";

import { PageLayout } from "./components/layout/PageLayout/PageLayout";
import { ChallengeDetail } from "./pages/Challenges/ChallengeDetail";
import { Challenges } from "./pages/Challenges/Challenges";
import { Guilds } from "./pages/Guilds/Guilds";
import { Home } from "./pages/Home/Home";
import { Mentorship } from "./pages/Mentorship/Mentorship";
import { PathwayDetail } from "./pages/Pathways/PathwayDetail";
import { Pathways } from "./pages/Pathways/Pathways";
import { PathwayStep } from "./pages/Pathways/PathwayStep";
import { Profile } from "./pages/Profile/Profile";
import { Resources } from "./pages/Resources/Resources";

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pathways" element={<Pathways />} />
          <Route path="/pathways/:id" element={<PathwayDetail />} />
          <Route path="/pathways/:pathwayId/step/:stepId" element={<PathwayStep />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenges/:id" element={<ChallengeDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/guilds" element={<Guilds />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
