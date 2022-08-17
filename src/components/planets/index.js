import React, { Fragment, useState, useEffect } from "react";
import Planet from "./planet";

async function getPlanets() {
  let response = await fetch("http://localhost:3000/api/planets.json");
  let data = await response.json();
  return data;
}

const Planets = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    getPlanets().then((data) => {
      setPlanets(data["planets"]);
    });
  }, []);

  const removeLast = () => {
    let new_planets = [...planets];
    new_planets.pop();
    setPlanets(new_planets);
  };

  const duplicateLast = () => {
    let last_planet = planets[planets.length - 1];
    setPlanets([...planets, last_planet]);
  };

  return (
    <Fragment>
      <h3>Planet List</h3>
      <button onClick={removeLast}>Remover Último Planeta</button>
      <button onClick={duplicateLast}>Duplicar Último Planeta</button>
      <hr />
      {planets.map((planet, index) => (
        <Planet
          id={planet.id}
          name={planet.name}
          text={planet.text}
          img_url={planet.img_url}
          link={planet.link}
          key={index}
        />
      ))}
      <hr />
    </Fragment>
  );
};

export default Planets;
