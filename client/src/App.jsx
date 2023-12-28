import {
  Atbash,
  Autokey,
  Beaufort,
  Ceaser,
  Hill,
  Monoalphabetic,
  Playfair,
  Railfence,
  Runningkey,
  Substitution,
  Transposition,
  Vegenere,
  EncodeImage,
  DecodeImage,
  Navbar,
  Form,
} from "./components";

const App = () => {
  return (
    <div className="min-h-screen bg-dark-background flex justify-center">
      <div className="max-w-5xl w-full ">
        <Navbar />
        <div style={{ minHeight: "calc(100vh - 4rem)" }} className="flex justify-center py-8 ">
          <Form />
        </div>
        {/* <Atbash /> */}
        {/* <Autokey /> */}
        {/* <Beaufort /> */}
        {/* <Ceaser /> */}
        {/* <Hill /> */}
        {/* <Monoalphabetic /> */}
        {/* <Playfair /> */}
        {/* <Railfence /> */}
        {/* <Runningkey /> */}
        {/* <Substitution /> */}
        {/* <Transposition /> */}
        {/* <Vegenere /> */}
        {/* <EncodeImage /> */}
        {/* <DecodeImage /> */}
      </div>
    </div>
  );
};

export default App;
