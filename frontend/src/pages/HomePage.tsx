import { useNavigate } from "react-router-dom";
import { Layout } from "@/layouts";
import { LandingImage, AppDownloadImage } from "@/assets";
import { SearchBar } from "@/components";
import { SearchForm } from "@/components/SearchBar";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <Layout showHero>
      <div className="flex flex-col gap-12">
        <div className="md:px-32 px-5 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
          <h1 className="text-5xl font-bold tracking-tight text-orange-600">
            Tuck into a takeway today
          </h1>
          <span className="text-xl">Food is just a click away!</span>
          <SearchBar
            placeHolder="Search by City or Town"
            onSubmit={handleSearchSubmit}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <img src={LandingImage} alt="Landing Image" />
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <span className="font-bold text-3xl tracking-tighter">
              Order takeaway even faster!
            </span>
            <span>
              Download the FOODY App for faster ordering and personalised
              recommendations
            </span>
            <img src={AppDownloadImage} alt="App Download Image" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
