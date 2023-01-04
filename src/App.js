import './App.scss';
import { useState, useEffect } from 'react';
import Home from './components/Home/Home';


const App = () => {
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);

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

	useEffect(() => {
		getLocation();
	}, [latitude, longitude]);

	return (
		<div className="App">
			<Home geoLongitude={longitude} geoLatitude={latitude} />

			{/* <img src={backgroundImg} alt="icon"/> */}
		</div>

	);
}

export default App;
