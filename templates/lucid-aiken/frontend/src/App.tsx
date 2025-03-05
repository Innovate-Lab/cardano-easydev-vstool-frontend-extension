import Footer from "./components/Layout/Footer";
import WalletButton from "./components/WalletConnect/WalletButton";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen animate-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto px-4 py-8">
          <Home />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
