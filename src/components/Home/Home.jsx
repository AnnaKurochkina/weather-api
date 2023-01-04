import "./Home.scss";
// import { Heading, Flex } from "@chakra-ui/react";
import { FaSun, FaMoon, FaMugHot } from "react-icons/fa";
import Weather from "../Weather/Weather";
import DateTime from "../DateTime/DateTime";


import { VStack, Text } from "@chakra-ui/react"
import AddTodo from "../AddTodo/AddTodo";
import TodoList from "../TodoList/TodoList";
import { useState } from 'react';
import { HStack } from "@chakra-ui/react";


const Home = ({ geoLongitude, geoLatitude }) => {

    const currentHour = new Date().getHours();
    let greetingImg = <FaMugHot />;
    let greetingTime = "Morning";

    if (currentHour >= 12) {
        greetingImg = <FaSun />;
        greetingTime = "Afternoon";
    }

    if (currentHour >= 18) {
        greetingImg = <FaMoon />;
        greetingTime = "Evening";
    }

	const todosList = [
		{ id: 1, text: 'Buy eggs' },
		{ id: 2, text: 'Walk the dog' },
		{ id: 3, text: 'Watch a movie' }
	];

	const [todos, setTodos] = useState(todosList);


	function deleteTodo(id) {
		const newTodos = todos.filter((item) => {
			return item.id !== id
		})
		setTodos(newTodos)
		console.log(newTodos)
	}

	function addTodo(newTodo) {
		setTodos([...todos, newTodo])
	}

	function editTodo(id, updatedTodo) {
		const updatedItem = todos.map((todo) => {
			return todo.id === id ? updatedTodo : todo;
		});
		setTodos(updatedItem)
	}


    return (
        <div className="home">
			{/* <HStack>
			<VStack p={5}>

<Text bgGradient="linear(to-l, #7928CA,#FF0080)"
	bgClip="text"
	fontSize="6xl"
	fontWeight="extrabold">
	Todo App
</Text>

<TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
<AddTodo addTodo={addTodo} />


</VStack> */}
            <DateTime />
            <div className="home__greeting">
                <h1>
                    <p>{greetingImg}</p>
                    Good {greetingTime} <br />
                    {geoLatitude !== 0 ? (
                        <Weather
                            geoLongitude={geoLongitude}
                            geoLatitude={geoLatitude}
                        />
                    ) : (
                        <div>Loading...</div>
                    )}
                </h1>
            </div>
			
			{/* </HStack> */}
        </div>
    );
};

export default Home;
