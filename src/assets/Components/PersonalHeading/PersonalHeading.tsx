import { personalDetails } from "./personal-info";
const PersonalHeading = () => {
  return (
    <div>
      <h1>
        {personalDetails.firstName} {personalDetails.lastName}
      </h1>
      <h1>{personalDetails.jobTitle}</h1>
    </div>
  );
};

export default PersonalHeading;
