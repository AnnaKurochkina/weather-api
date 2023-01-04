import "./Home.scss";
// import { Heading, Flex } from "@chakra-ui/react";
// import { FaSun } from "react-icons/fa";
import { FaSun, FaMoon, FaMugHot } from "react-icons/fa";
import Weather from "../Weather/Weather";
import DateTime from "../DateTime/DateTime";

const Home = ({longitude, latitude}) => {

	// const user = {
	// 	firstName: "Anna",
	//   };
	
	  const currentHour = new Date().getHours();
	  let greetingImg = <FaMugHot/>;
	  let greetingTime = "Morning,";
	
	  if (currentHour >= 12) {
		greetingImg = <FaSun/>;
		greetingTime = "Afternoon,";
	  }
	
	  if (currentHour >= 18) {
		greetingImg = <FaMoon/>;
		greetingTime = "Evening,";
	  }
    return (
		<div className="home">
			< DateTime/>
			<div className="home__greeting">
				<h1>
					<p>{greetingImg}</p>
					Good {greetingTime} <br /> 
					{/* {user.firstName} */}
					{(latitude !== 0) ?
                (<Weather longitude={longitude} latitude={latitude}/>)
                : <div>Loading...</div>}
				</h1>
			</div>
		</div>



    );
};

export default Home;