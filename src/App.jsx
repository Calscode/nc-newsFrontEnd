import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Articles from "./pages/Articles";
import Home from "./pages/Home";
import ArticleDetail from "./pages/ArticleDetails";
import LoginForm from "./pages/loginForm";
import { UserProvider, useUser } from "./state/userContext";



function AppContent() {
  const {user} = useUser()

  return (
    <Router>
     {!user && <LoginForm />} 
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<ArticleDetail />} />
      </Routes>
    </Router>
  )
}

function App (){
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

export default App;
