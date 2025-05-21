import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { TiArrowSortedDown } from "react-icons/ti";
function Icon({ id, open }) {
  return (
    <TiArrowSortedDown
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    />
  );
}

export default function Qna() {
  const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };
  const [open, setOpen] = useState(0);
  const [alwaysOpen, setAlwaysOpen] = useState(true);

  const handleAlwaysOpen = () => setAlwaysOpen((cur) => !cur);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion
        open={alwaysOpen}
        icon={<Icon id={1} open={open} />}
        animate={CUSTOM_ANIMATION}
      >
        <AccordionHeader
          onClick={handleAlwaysOpen}
          className="text-primary hover:text-white"
        >
          What is a blog?
        </AccordionHeader>
        <AccordionBody className="text-secondary">
          A blog is a type of website or a part of a website where individuals
          or organizations regularly publish content (called blog posts) about
          topics they care about. Blogs are typically written in an informal or
          conversational style and can include text, images, videos, and links
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 2}
        icon={<Icon id={2} open={open} />}
        animate={CUSTOM_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="text-primary hover:text-white"
        >
          How does blogging improve SEO for your website?
        </AccordionHeader>
        <AccordionBody className="text-secondary">
          Blog posts targeting keywords like “best budget meals”, “low-carb diet
          tips”, or “how meal delivery works” help your site rank in Google.
          More content = more search visibility = more users.
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 3}
        icon={<Icon id={3} open={open} />}
        animate={CUSTOM_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className="text-primary hover:text-white"
        >
          What is the difference between a blog and a website?
        </AccordionHeader>
        <AccordionBody className="text-secondary">
          A blog is a type of website that focuses on regularly updated content
          organized by date or topic. A website may be static or dynamic,
          serving many purposes like business info, portfolios, or e-commerce.
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 4}
        icon={<Icon id={4} open={open} />}
        animate={CUSTOM_ANIMATION}
      >
        <AccordionHeader
          onClick={() => handleOpen(4)}
          className="text-primary hover:text-white"
        >
          What is guest blogging and why is it useful?
        </AccordionHeader>
        <AccordionBody className="text-secondary">
          Guest blogging means writing posts for other blogs or inviting others
          to write for yours. It expands your audience, builds backlinks, and
          enhances your authority.
        </AccordionBody>
      </Accordion>
    </>
  );
}
