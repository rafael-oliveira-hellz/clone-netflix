import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import './App.css';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista completa de filmes

      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Filmes em Destaque

      let originals = list.filter(i => i.slug === 'originals');
      let randomMovie = Math.floor(Math.random() * (originals[0].items.results.length));
      let chosenMovie = originals[0].items.results[randomMovie];
      let chosenMovieInfo = await Tmdb.getMovieInfo(chosenMovie.id, 'tv');

      setFeaturedData(chosenMovieInfo);
    }

    loadAll();

  }, []);

  return (
    <div className="page">

      {featuredData && 
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <div key={key}>
            <MovieRow key={key} title={item.title} items={item.items} />
          </div>
        ))}
      </section>
    </div>
  )
}