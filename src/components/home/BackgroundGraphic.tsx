import HomeCircle from "@/assets/home/home_circle.svg";
import HomeDiamond from "@/assets/home/home_diamond.svg";
import HomeFlower from "@/assets/home/home_flower.svg";

const BackgroundGraphic = () => {
  return (
    <div>
      <HomeFlower
        aria-hidden="true"
        className="animate-fade-in-left pointer-events-none absolute top-1/2 -left-55 size-120 -translate-y-1/2 md:-top-10 md:-left-95 md:h-225 md:w-205 md:translate-y-0"
      />
      <HomeDiamond
        aria-hidden="true"
        className="animate-fade-in-diagonal pointer-events-none absolute -top-20 -right-30 size-100 md:-top-25 md:-right-50 md:h-155 md:w-180"
      />
      <HomeCircle
        aria-hidden="true"
        className="animate-fade-in-bottom pointer-events-none absolute -right-20 -bottom-40 size-100 md:right-auto md:-bottom-55 md:left-3/5 md:h-122 md:w-122 md:-translate-x-1/2"
      />
    </div>
  );
};

export default BackgroundGraphic;
