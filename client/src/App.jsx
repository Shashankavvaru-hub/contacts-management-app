import ContactPage from "./pages/ContactPage";
function App() {
  return (
    <>  
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 text-center">
          <h1 className="font-extrabold text-4xl text-gray-900">
            Contact Management Application
          </h1>
        </div>
      </header>

      <main>
        <ContactPage />
      </main>
    </>
  );
}

export default App;
