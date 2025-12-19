import StatsBar from "../components/StatsBar";
import HeroVerifyBox from "../components/HeroVerifyBox";
import ScamReportForm from "../components/ScamReportForm";
import BlogList from "../components/BlogList";
import { HeaderBar } from "../components/HeaderBar";
import FeaturesSection from "../components/FeaturesSection";


export default function Home() {
  return (
    <main className="home">
      <HeaderBar />
      <StatsBar />
      <HeroVerifyBox />
      <ScamReportForm />
      <BlogList />
      <FeaturesSection />
    </main>
  );
}
