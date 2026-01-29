import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Glow Naturally</h1>
        <p>Premium skincare products for radiant, healthy skin</p>
        <a href="#products" className="cta-btn">Shop Now</a>
      </div>
    </section>
  );
}

export default Hero;
