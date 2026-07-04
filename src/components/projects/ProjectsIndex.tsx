import Heading2 from "../ui/Heading2";
import ProjectCards, { IprojectsToMap } from "./ProjectCards";

const ProjectsIndex = () => {
  const projectsMessage = [
    "A small collection of my projects.",
    "Click on the cards to view a larger example.",
    "Check out the GitHubs/live demos if you want a better idea. Better yet, get in touch and let's chat!",
  ];

  const phoneProjectsMessage = [
    "App First Design",
    "Trying my hand at a React Native Android/iOS app.",
    "Made for learning and personal use, not a public store."
  ]

    const projectsToMap: IprojectsToMap[] = [
      {
        name: "indigo",
        description: "The best drinks company ever? IYKYK.",
        mainImage: "/IndigoMainImage.webp",
        website: "https://drinkindigo.com.au/",
        techStack: ["Liquid", "Shopify", "css3", "JavaScript"],
      },
      {
        name: "Pokemon Remastered",
        description:
          "A Pokemon battle simulator - Redo from an old project with some new features and a different stack. How quick can you catch the 151?",
        mainImage: "/PokemonRemasteredMainImage.webp",
        website: "https://poke-battles-remastered.vercel.app/",
        github: "https://github.com/OB-CODE/PokeBattlesRemastered",
        techStack: [
          "React",
          "Nodejs",
          "Nextjs",
          "TypeScript",
          "TailwindCSS",
          "DynamoDB",
        ],
      },
      {
        name: "Home Harvest",
        description:
          "A weather / gardening application to show multi API consumption for an interactive user experience. Now get planting.",
        mainImage: "/HomeHarvestMainImage.webp",
        website: "https://mitchell-home-harvest.surge.sh/",
        github: "https://github.com/OB-CODE/Home-Harvest",
        techStack: ["React", "Nodejs", "surge", "css3"],
      },
      {
        name: "Original Website",
        description: "My original website - showcasing some older projects.",
        mainImage: "/OldWebsiteMainImage.webp",
        website: "https://www.old.mitch-obrien.com/",
        github: "https://github.com/OB-CODE/Personal-Website",
        techStack: ["React", "Nodejs", "AWS Amplify"],
      },
    ];

     const phoneProjectsToMap: IprojectsToMap[] = [
         {
          name: "Planner",
          description: "A simple meal / routine planner. To prove a simple task that could have been achieved with paper can be made more complicated.",
          mainImage: "/PlannerMain.webp",
          images: ["/PlannerMain.webp", "/PlannerCreate.webp", "/PlannerShopping.webp"],
          website: "",
          techStack: ["React", "TypeScript", "css3", "JavaScript"],
        },
      ]

  return (
    <div
      data-testid="PortfolioHeader"
      className="mx-auto flex w-full max-w-5xl flex-col px-6"
    >
      <Heading2 inputString="Portfolio" />
      <div className="mt-4 flex flex-col gap-1">
        {projectsMessage.map((message, index) => (
          <p
            key={index}
            className={`text-sm ${index !== 0 ? "text-zinc-400" : "text-zinc-200"}`}
          >
            {message}
          </p>
        ))}
      </div>
      <div className="mt-10 w-full">
        <ProjectCards projectsToMap={projectsToMap} />
      </div>
      <div className="mt-16 flex flex-col gap-1">
        {phoneProjectsMessage.map((message, index) => (
          <p
            key={index}
            className={`text-sm ${index !== 0 ? "text-zinc-400" : "text-zinc-200 font-medium"}`}
          >
            {message}
          </p>
        ))}
      </div>
      <div className="mt-10 w-full">
        <ProjectCards projectsToMap={phoneProjectsToMap} isTallCard={true} />
      </div>
    </div>
  );
};

export default ProjectsIndex;
