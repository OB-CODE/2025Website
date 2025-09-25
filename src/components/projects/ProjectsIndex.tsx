import Heading2 from "../ui/Heading2";
import ProjectCards, { IprojectsToMap } from "./ProjectCards";

const ProjectsIndex = () => {
  const projectsMessage = [
    "A small collection of my projects.",
    "Click on the cards to view a larger example.",
    "Check out the githubs/live demos if you want a better idea. Better yet, get in touch and lets chat!",
  ];

  const phoneProjectsMessage = [
    "App First Design",
    "Trying my hand at a react native android/IOS app.",
    "Made for learning and personal use, not a public store."
  ]

    const projectsToMap: IprojectsToMap[] = [
      {
        name: "indigo",
        description: "The best drinks company ever? IYKYK.",
        mainImage: "/IndigoMainImage.png",
        website: "https://drinkindigo.com.au/",
        techStack: ["Liquid", "Shopify", "css3", "JavaScript"],
      },
      {
        name: "Pokemon Remastered",
        description:
          "A Pokemon battle simulator - Redo from an old project with some new features and a different stack. How quick can you catch the 151?",
        mainImage: "/PokemonRemasteredMainImage.png",
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
          "A weather / gardening application to show multi api consumption for a interactive user experience. Now get planting.",
        mainImage: "/HomeHarvestMainImage.png",
        website: "https://mitchell-home-harvest.surge.sh/",
        github: "https://github.com/OB-CODE/Home-Harvest",
        techStack: ["React", "Nodejs", "surge", "css3"],
      },
      {
        name: "Original Website",
        description: "My original website - showcasing some older projects.",
        mainImage: "/OldWebsiteMainImage.png",
        website: "https://www.old.mitch-obrien.com/",
        github: "https://github.com/OB-CODE/Personal-Website",
        techStack: ["React", "Nodejs", "AWS Amplify"],
      },
    ];

     const phoneProjectsToMap: IprojectsToMap[] = [
         {
          name: "Planner",
          description: "A simple meal / routine planner. To prove a simple task that could have been achieved with paper can be made more complicated.",
          mainImage: "/PlannerMain.jpg",
          images: ["/PlannerMain.jpg", "/PlannerCreate.jpg", "/PlannerShopping.jpg"],
          website: "",
          techStack: ["React", "Typescript", "css3", "JavaScript"],
        },
      ]

  return (
    <div
      data-testid="PortfolioHeader"
      className="flex items-start w-[80%] flex-col"
    >
      <Heading2 inputString="Portfolio" />
      <div className="flex flex-col w-[70%] gap-3 items-start">
        {projectsMessage.map((message, index) => (
          <div key={index} className={`${index != 0 ? "text-gray-400" : ""}`}>
            {message}
          </div>
        ))}
      </div>
      <div className="pt-[3vh] w-full">
        <ProjectCards projectsToMap={projectsToMap}/>
      </div>
      <div className="flex flex-col w-[100%] gap-3 items-end pt-5 pb-3">
        {phoneProjectsMessage.map((message, index) => (
          <div key={index} className={`${index != 0 ? "text-gray-400" : ""}`}>
            {message}
          </div>
        ))}
      </div>
      <div className="pt-[3vh] w-full">
        <ProjectCards projectsToMap={phoneProjectsToMap} isTallCard={true}/>
      </div>
    </div>
  );
};

export default ProjectsIndex;
