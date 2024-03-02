import { HeroImage } from "@/assets";

const Hero = () => {
  return (
    <div>
      <img src={HeroImage} className="w-full max-h-[600px] object-cover" />
    </div>
  );
};

export default Hero;
