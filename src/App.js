import './App.scss';
import { useState, useEffect } from 'react';
import Home from './components/Home/Home';


const App = () => {
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	// const [backgroundImg, setBackgroundImg] = useState();

	const showPosition = (position) => {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	}

	const getLocation = async () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			return "Geolocation is not supported by your browser.";
		}
	}

	// const getBackgroundImg = async () => {
    //     const url = `https://api.nasa.gov/planetary/apod?api_key=xNcuttatfbYyKQUtVGEo6523N29RmAcp90Q8EL7o&date=today&concept_tags=True`;
    //     const res = await fetch(url);
    //     const backgroundImg = await res.json();
    //     setBackgroundImg(backgroundImg.url);
    // };

	// console.log(backgroundImg);


	useEffect(() => {
		getLocation();
		// getBackgroundImg();
	}, [latitude, longitude]);

	return (
		<div className="App">
				<Home longitude={longitude} latitude={latitude}/>

				{/* <img src={backgroundImg} alt="icon"/> */}
			
		</div>
		
	);
}

export default App;
