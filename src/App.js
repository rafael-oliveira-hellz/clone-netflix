import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import './App.css';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

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

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }  

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

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

      <footer>
        Feito com <span role="img" aria-label="coração">&#9829;</span> por Rafael Oliveira <br />
        Direitos de imagem para Netflix <br />
        Dados pegos do site TheMovieDb.org
      </footer>

      {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Netflix Loading" />
      </div>
      }
      
    </div>
  )
}