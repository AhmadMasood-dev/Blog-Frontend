import { Typography } from "@material-tailwind/react";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";
export function HeroSection() {
  return (
    <section className="items-center w-full m-10 mx-auto ">
      <div className="flex flex-col items-start justify-center object-contain w-full px-10 py-10 text-center bg-right bg-no-repeat rounded-lg h-72 bg-bg1 ">
        <Typography variant="h3" className="font-bold text-accent">
          Learn Something New Every Day
        </Typography>
        <Typography className="mt-2 mb-6 !text-base font-normal text-accent ">
          Simple breakdowns of complex topics — curated for curious minds.
        </Typography>
        <Button variant="filled" className="flex-shrink-0 ">
          <Link to="/create-post">Create Post</Link>
        </Button>
      </div>
    </section>
  );
}
export default HeroSection;
