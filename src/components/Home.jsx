import React, { useEffect, useState } from 'react'

const Home = () => {
    const [tasks, setTasks] = useState()

    const getTasks = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}tasks`);
            const data = await response.json();

            if (data) setTasks(data);
            else console.error("no tasks found")

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])
    console.log(tasks)
    return (
        <div><p>Home</p></div>
    )
}

export default Home